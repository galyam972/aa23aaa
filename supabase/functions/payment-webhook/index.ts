import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { crypto } from "https://deno.land/std@0.168.0/crypto/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-morning-signature',
};

// Plan types
type PlanType = 'basic' | 'pro' | 'business';

// Determine plan type based on signatures quantity
function determinePlanType(signaturesQuantity: number): PlanType {
  if (signaturesQuantity >= 3) return 'business';
  if (signaturesQuantity === 2) return 'pro';
  return 'basic';
}

// Verify webhook signature from Morning
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
    
    return signature === expectedSignature;
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

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Get raw body for signature verification
    const rawBody = await req.text();
    console.log('Webhook received:', rawBody);

    // Verify webhook signature if secret is configured
    if (MORNING_WEBHOOK_SECRET) {
      const signature = req.headers.get('x-morning-signature') || '';
      const isValid = await verifySignature(rawBody, signature, MORNING_WEBHOOK_SECRET);
      
      if (!isValid) {
        console.error('Invalid webhook signature');
        return new Response(
          JSON.stringify({ success: false, error: 'Invalid webhook signature' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
        );
      }
      console.log('Webhook signature verified');
    } else {
      console.warn('MORNING_WEBHOOK_SECRET not configured - skipping signature verification');
    }

    // Parse the payload
    const payload = JSON.parse(rawBody);
    
    // Extract Morning webhook data
    const { 
      pluginId,  // Our purchase ID
      status, 
      id: morningTransactionId, 
      invoiceId,
      payer,
      total,
      transactions
    } = payload;

    const gatewayTransactionId = transactions?.[0]?.gatewayTransactionId || morningTransactionId;
    const payerEmail = payer?.email;
    const payerName = payer?.name;

    if (!payerEmail) {
      throw new Error('Missing payer email');
    }

    // Check for duplicate transaction
    if (gatewayTransactionId) {
      const { data: existingPurchase } = await supabase
        .from('purchases')
        .select('id')
        .eq('gateway_transaction_id', gatewayTransactionId)
        .maybeSingle();

      if (existingPurchase) {
        console.log(`Duplicate transaction: ${gatewayTransactionId}`);
        return new Response(
          JSON.stringify({ success: true, message: 'Transaction already processed' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
        );
      }
    }

    // Determine payment status (Morning: 0=pending, 1=success, 2=failed, 3=cancelled)
    let paymentStatus: 'pending' | 'paid' | 'failed' = 'pending';
    if (status === 1) paymentStatus = 'paid';
    else if (status === 2 || status === 3) paymentStatus = 'failed';

    // Get original purchase if pluginId provided
    let signaturesQuantity = 1;
    let originalPurchase = null;

    if (pluginId) {
      const { data: purchase } = await supabase
        .from('purchases')
        .select('*')
        .eq('id', pluginId)
        .maybeSingle();
      
      if (purchase) {
        originalPurchase = purchase;
        signaturesQuantity = purchase.signatures_quantity || 1;
      }
    }

    // Determine plan type
    const planType = determinePlanType(signaturesQuantity);

    console.log(`Payment: ${paymentStatus}, Plan: ${planType}, Signatures: ${signaturesQuantity}`);

    // Update or create purchase record
    const purchaseData = {
      email: payerEmail,
      status: paymentStatus,
      morning_transaction_id: morningTransactionId,
      morning_invoice_id: invoiceId || null,
      gateway_transaction_id: gatewayTransactionId,
      gateway: 'morning',
      plan_type: planType,
      signatures_purchased: signaturesQuantity,
      amount_paid: total || null,
      raw_payload: payload,
    };

    if (originalPurchase) {
      // Update existing purchase
      await supabase
        .from('purchases')
        .update(purchaseData)
        .eq('id', pluginId);
    } else {
      // Create new purchase
      await supabase
        .from('purchases')
        .insert({
          ...purchaseData,
          signatures_quantity: signaturesQuantity,
          base_plan: signaturesQuantity,
          total_amount: total || 0,
          currency: 'ILS',
        });
    }

    // If payment successful, update user subscription
    if (paymentStatus === 'paid') {
      // Check if user subscription exists (by email)
      const { data: existingSubscription } = await supabase
        .from('user_subscriptions')
        .select('*')
        .eq('email', payerEmail)
        .maybeSingle();

      if (existingSubscription) {
        // Update: add credits and upgrade plan if better
        const currentPlanRank = { guest: 0, basic: 1, pro: 2, business: 3 };
        const newPlanRank = currentPlanRank[planType];
        const existingPlanRank = currentPlanRank[existingSubscription.plan_type as keyof typeof currentPlanRank] || 0;
        
        const upgradedPlan = newPlanRank > existingPlanRank ? planType : existingSubscription.plan_type;
        
        await supabase
          .from('user_subscriptions')
          .update({
            signature_credits: existingSubscription.signature_credits + signaturesQuantity,
            plan_type: upgradedPlan,
            payer_name: payerName || existingSubscription.payer_name,
          })
          .eq('id', existingSubscription.id);

        console.log(`Updated subscription for ${payerEmail}: +${signaturesQuantity} credits, plan: ${upgradedPlan}`);
      } else {
        // Note: Cannot create user_subscription without user_id (FK constraint)
        // The subscription will be created when user signs up/logs in with this email
        console.log(`Payment received for ${payerEmail}, subscription will be created on first login`);
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
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
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    );
  }
});
