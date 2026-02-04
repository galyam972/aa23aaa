import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Supabase credentials not configured');
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Parse webhook payload from Morning
    const payload = await req.json();
    console.log('Webhook received:', JSON.stringify(payload));

    const { pluginId, status, id: transactionId, invoiceId } = payload;

    if (!pluginId) {
      throw new Error('Missing pluginId (purchase_id)');
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

    // Update purchase status
    const { error: updateError } = await supabase
      .from('purchases')
      .update({
        status: newStatus,
        morning_transaction_id: transactionId || purchase.morning_transaction_id,
        morning_invoice_id: invoiceId || null,
      })
      .eq('id', pluginId);

    if (updateError) {
      console.error('Purchase update error:', updateError);
      throw new Error('Failed to update purchase');
    }

    // If payment completed, create user signature allocation
    if (newStatus === 'completed') {
      // Check if signature allocation already exists
      const { data: existingSignature } = await supabase
        .from('user_signatures')
        .select('id')
        .eq('purchase_id', pluginId)
        .single();

      if (!existingSignature) {
        const expiresAt = new Date();
        expiresAt.setMonth(expiresAt.getMonth() + 3);

        const { error: signatureError } = await supabase
          .from('user_signatures')
          .insert({
            purchase_id: pluginId,
            email: purchase.email,
            max_signatures: purchase.signatures_quantity,
            used_signatures: 0,
            is_active: true,
            expires_at: expiresAt.toISOString(),
          });

        if (signatureError) {
          console.error('Signature allocation error:', signatureError);
          throw new Error('Failed to allocate signatures');
        }

        console.log(`Allocated ${purchase.signatures_quantity} signatures for ${purchase.email}`);
      }
    }

    return new Response(
      JSON.stringify({ success: true, status: newStatus }),
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