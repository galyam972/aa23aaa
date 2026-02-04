import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { crypto } from "https://deno.land/std@0.168.0/crypto/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-morning-signature',
};

// Plan types and their permissions
type PlanType = 'basic' | 'pro' | 'business';

interface PlanPermissions {
  can_save: boolean;
  can_export_html: boolean;
  can_copy_clipboard: boolean;
  can_upload_logo: boolean;
  can_use_all_templates: boolean;
  can_use_advanced_design: boolean;
  can_manage_multiple_signatures: boolean;
  can_use_future_extensions: boolean;
}

const PLAN_PERMISSIONS: Record<PlanType, PlanPermissions> = {
  basic: {
    can_save: true,
    can_export_html: true,
    can_copy_clipboard: true,
    can_upload_logo: false,
    can_use_all_templates: false,
    can_use_advanced_design: false,
    can_manage_multiple_signatures: false,
    can_use_future_extensions: false,
  },
  pro: {
    can_save: true,
    can_export_html: true,
    can_copy_clipboard: true,
    can_upload_logo: true,
    can_use_all_templates: true,
    can_use_advanced_design: true,
    can_manage_multiple_signatures: false,
    can_use_future_extensions: false,
  },
  business: {
    can_save: true,
    can_export_html: true,
    can_copy_clipboard: true,
    can_upload_logo: true,
    can_use_all_templates: true,
    can_use_advanced_design: true,
    can_manage_multiple_signatures: true,
    can_use_future_extensions: true,
  },
};

// Determine plan type based on signatures quantity and total amount
function determinePlanType(signaturesQuantity: number, totalAmount: number): PlanType {
  // Business: 3+ signatures
  if (signaturesQuantity >= 3) {
    return 'business';
  }
  // Pro: 2 signatures (69 ILS)
  if (signaturesQuantity === 2) {
    return 'pro';
  }
  // Basic: 1 signature (39 ILS)
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
        throw new Error('Invalid webhook signature');
      }
      console.log('Webhook signature verified successfully');
    } else {
      console.warn('MORNING_WEBHOOK_SECRET not configured - skipping signature verification');
    }

    // Parse the payload
    const payload = JSON.parse(rawBody);
    
    // Extract Morning webhook data
    // Morning sends: pluginId, status, id (transactionId), invoiceId, payer, total, transactions
    const { 
      pluginId, 
      status, 
      id: transactionId, 
      invoiceId,
      payer,
      total,
      transactions
    } = payload;

    // Get gatewayTransactionId for duplicate prevention
    const gatewayTransactionId = transactions?.[0]?.gatewayTransactionId || transactionId;

    if (!pluginId) {
      throw new Error('Missing pluginId (purchase_id)');
    }

    // Check for duplicate transaction
    if (gatewayTransactionId) {
      const { data: existingTx } = await supabase
        .from('purchases')
        .select('id')
        .eq('gateway_transaction_id', gatewayTransactionId)
        .single();

      if (existingTx) {
        console.log(`Duplicate transaction detected: ${gatewayTransactionId}`);
        return new Response(
          JSON.stringify({ success: true, message: 'Transaction already processed' }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          }
        );
      }
    }

    // Get the purchase record
    const { data: purchase, error: fetchError } = await supabase
      .from('purchases')
      .select('*')
      .eq('id', pluginId)
      .single();

    if (fetchError || !purchase) {
      console.error('Purchase fetch error:', fetchError);
      throw new Error('Purchase not found');
    }

    // Check payment status from Morning
    // Status codes: 0 = pending, 1 = success, 2 = failed, 3 = cancelled
    let newStatus: 'pending' | 'completed' | 'failed' = 'pending';
    
    if (status === 1) {
      newStatus = 'completed';
    } else if (status === 2 || status === 3) {
      newStatus = 'failed';
    }

    // Determine plan type
    const planType = determinePlanType(purchase.signatures_quantity, purchase.total_amount);
    const permissions = PLAN_PERMISSIONS[planType];

    console.log(`Payment status: ${newStatus}, Plan type: ${planType}`);

    // Update purchase status with gateway transaction ID
    const { error: updateError } = await supabase
      .from('purchases')
      .update({
        status: newStatus,
        morning_transaction_id: transactionId || purchase.morning_transaction_id,
        morning_invoice_id: invoiceId || null,
        gateway_transaction_id: gatewayTransactionId || null,
        plan_type: planType,
      })
      .eq('id', pluginId);

    if (updateError) {
      console.error('Purchase update error:', updateError);
      throw new Error('Failed to update purchase');
    }

    // If payment completed, create user signature allocation
    if (newStatus === 'completed') {
      // Check if signature allocation already exists for this purchase
      const { data: existingSignature } = await supabase
        .from('user_signatures')
        .select('id')
        .eq('purchase_id', pluginId)
        .single();

      if (!existingSignature) {
        const expiresAt = new Date();
        expiresAt.setMonth(expiresAt.getMonth() + 3);

        // Use payer email if available, otherwise use purchase email
        const userEmail = payer?.email || purchase.email;
        const userName = payer?.name || null;

        const { error: signatureError } = await supabase
          .from('user_signatures')
          .insert({
            purchase_id: pluginId,
            email: userEmail,
            max_signatures: purchase.signatures_quantity,
            used_signatures: 0,
            is_active: true,
            expires_at: expiresAt.toISOString(),
            plan_type: planType,
            permissions: permissions,
            payer_name: userName,
          });

        if (signatureError) {
          console.error('Signature allocation error:', signatureError);
          throw new Error('Failed to allocate signatures');
        }

        console.log(`Allocated ${purchase.signatures_quantity} ${planType} signatures for ${userEmail}`);
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        status: newStatus,
        plan_type: planType,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});