import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { crypto } from "https://deno.land/std@0.168.0/crypto/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-morning-signature, x-signature',
};

type PlanType = 'basic' | 'pro' | 'business';

// Determine plan type based on signatures quantity
function determinePlanType(signaturesQuantity: number): PlanType {
  if (signaturesQuantity >= 3) return 'business';
  if (signaturesQuantity === 2) return 'pro';
  return 'basic';
}

// Calculate price based on quantity
function calculatePrice(quantity: number): number {
  if (quantity === 1) return 39;
  if (quantity === 2) return 69;
  if (quantity === 3) return 99;
  // 3+ signatures: 99 + 19 per extra
  return 99 + (quantity - 3) * 19;
}

// Verify HMAC SHA256 signature
async function verifySignature(payload: string, signature: string, secret: string): Promise<boolean> {
  try {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    
    const signatureBytes = await crypto.subtle.sign(
      "HMAC",
      key,
      encoder.encode(payload)
    );
    
    const expectedSignature = Array.from(new Uint8Array(signatureBytes))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    
    // Compare signatures (case-insensitive)
    return signature.toLowerCase() === expectedSignature.toLowerCase();
  } catch (error) {
    console.error('Signature verification error:', error);
    return false;
  }
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const MORNING_WEBHOOK_SECRET = Deno.env.get('MORNING_WEBHOOK_SECRET');

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Supabase credentials not configured');
    }

    // 1. Read raw body as-is
    const rawBody = await req.text();
    console.log('Webhook received, body length:', rawBody.length);

    // 2. Verify signature (check multiple possible header names)
    if (MORNING_WEBHOOK_SECRET) {
      const signature = 
        req.headers.get('x-morning-signature') || 
        req.headers.get('x-signature') || 
        req.headers.get('signature') || 
        '';
      
      console.log('Signature header received:', signature ? 'present' : 'missing');
      
      // 3. Calculate HMAC SHA256 and compare
      const isValid = await verifySignature(rawBody, signature, MORNING_WEBHOOK_SECRET);
      
      // 4. Return 401 if signature doesn't match
      if (!isValid) {
        console.error('Invalid webhook signature');
        return new Response(
          JSON.stringify({ ok: false, error: 'Invalid signature' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
        );
      }
      console.log('Signature verified successfully');
    } else {
      console.warn('MORNING_WEBHOOK_SECRET not configured - skipping verification');
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Parse payload
    const payload = JSON.parse(rawBody);
    console.log('Parsed payload:', JSON.stringify(payload, null, 2));
    
    // Extract Morning webhook data
    const { 
      pluginId,
      status, 
      id: morningTransactionId, 
      invoiceId,
      payer,
      total,
      transactions,
      items
    } = payload;

    // 6. Get gateway_transaction_id for duplicate prevention
    const gatewayTransactionId = transactions?.[0]?.gatewayTransactionId || morningTransactionId;
    const payerEmail = payer?.email?.toLowerCase()?.trim();
    const payerName = payer?.name;

    if (!payerEmail) {
      console.error('Missing payer email in payload');
      return new Response(
        JSON.stringify({ ok: false, error: 'Missing payer email' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // 6. Check for duplicate transaction
    if (gatewayTransactionId) {
      const { data: existingPurchase } = await supabase
        .from('purchases')
        .select('id')
        .eq('gateway_transaction_id', gatewayTransactionId)
        .maybeSingle();

      if (existingPurchase) {
        console.log(`Duplicate transaction detected: ${gatewayTransactionId}`);
        return new Response(
          JSON.stringify({ ok: true, message: 'Transaction already processed' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
        );
      }
    }

    // Determine signatures quantity from items or pluginId lookup
    let signaturesQuantity = 1;
    
    // Try to get from items (product quantity)
    if (items && items.length > 0) {
      signaturesQuantity = items.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0);
    }
    
    // Or lookup original purchase by pluginId
    if (pluginId) {
      const { data: originalPurchase } = await supabase
        .from('purchases')
        .select('signatures_quantity')
        .eq('id', pluginId)
        .maybeSingle();
      
      if (originalPurchase?.signatures_quantity) {
        signaturesQuantity = originalPurchase.signatures_quantity;
      }
    }

    // Determine plan and status
    const planType = determinePlanType(signaturesQuantity);
    
    // Morning status: 0=pending, 1=success, 2=failed, 3=cancelled
    let paymentStatus: 'pending' | 'paid' | 'failed' = 'pending';
    if (status === 1) paymentStatus = 'paid';
    else if (status === 2 || status === 3) paymentStatus = 'failed';

    console.log(`Processing: email=${payerEmail}, status=${paymentStatus}, plan=${planType}, signatures=${signaturesQuantity}`);

    // 5. Create purchase record
    const { data: newPurchase, error: purchaseError } = await supabase
      .from('purchases')
      .insert({
        email: payerEmail,
        status: paymentStatus,
        morning_transaction_id: morningTransactionId,
        morning_invoice_id: invoiceId || null,
        gateway_transaction_id: gatewayTransactionId,
        gateway: 'morning',
        plan_type: planType,
        signatures_purchased: signaturesQuantity,
        signatures_quantity: signaturesQuantity,
        base_plan: signaturesQuantity,
        total_amount: total || calculatePrice(signaturesQuantity),
        amount_paid: total || null,
        currency: 'ILS',
        raw_payload: payload,
      })
      .select('id')
      .single();

    if (purchaseError) {
      console.error('Purchase insert error:', purchaseError);
      throw new Error('Failed to create purchase record');
    }

    console.log(`Purchase created: ${newPurchase.id}`);

    // 5. If payment successful, update user_subscription
    if (paymentStatus === 'paid') {
      // Find subscription by email (not user_id)
      const { data: existingSubscription } = await supabase
        .from('user_subscriptions')
        .select('*')
        .eq('email', payerEmail)
        .maybeSingle();

      if (existingSubscription) {
        // Update existing: add credits and upgrade plan if better
        const planRank = { guest: 0, basic: 1, pro: 2, business: 3 };
        const currentRank = planRank[existingSubscription.plan_type as keyof typeof planRank] || 0;
        const newRank = planRank[planType];
        const finalPlan = newRank > currentRank ? planType : existingSubscription.plan_type;
        
        const { error: updateError } = await supabase
          .from('user_subscriptions')
          .update({
            signature_credits: existingSubscription.signature_credits + signaturesQuantity,
            plan_type: finalPlan,
            payer_name: payerName || existingSubscription.payer_name,
          })
          .eq('id', existingSubscription.id);

        if (updateError) {
          console.error('Subscription update error:', updateError);
          throw new Error('Failed to update subscription');
        }

        console.log(`Updated subscription: ${payerEmail}, +${signaturesQuantity} credits, plan: ${finalPlan}`);
      } else {
        // Create new subscription with user_id = null
        const { error: insertError } = await supabase
          .from('user_subscriptions')
          .insert({
            user_id: null,  // Will be updated on first login
            email: payerEmail,
            plan_type: planType,
            signature_credits: signaturesQuantity,
            payer_name: payerName,
          });

        if (insertError) {
          console.error('Subscription insert error:', insertError);
          throw new Error('Failed to create subscription');
        }

        console.log(`Created subscription: ${payerEmail}, ${signaturesQuantity} credits, plan: ${planType}`);
      }
    }

    // Return success
    return new Response(
      JSON.stringify({ 
        ok: true,
        status: paymentStatus,
        plan_type: planType,
        signatures: signaturesQuantity,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );

  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(
      JSON.stringify({
        ok: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
