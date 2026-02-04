import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Morning API base URL
const MORNING_API_URL = 'https://api.greeninvoice.co.il/api/v1';

// Pricing configuration
const PRICING = {
  plans: {
    1: { signatures: 1, price: 39 },
    2: { signatures: 2, price: 69 },
    3: { signatures: 3, price: 99 },
  },
  extraSignaturePrice: 19,
  minSignaturesForExtras: 3,
};

function calculatePrice(quantity: number): { basePlan: number; extraSignatures: number; totalAmount: number } {
  if (quantity <= 0) throw new Error('Invalid quantity');
  
  if (quantity === 1) return { basePlan: 1, extraSignatures: 0, totalAmount: 39 };
  if (quantity === 2) return { basePlan: 2, extraSignatures: 0, totalAmount: 69 };
  if (quantity >= 3) {
    const extraSignatures = quantity - 3;
    const totalAmount = 99 + (extraSignatures * 19);
    return { basePlan: 3, extraSignatures, totalAmount };
  }
  
  throw new Error('Invalid quantity');
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const MORNING_API_KEY = Deno.env.get('MORNING_API_KEY');
    const MORNING_API_SECRET = Deno.env.get('MORNING_API_SECRET');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!MORNING_API_KEY || !MORNING_API_SECRET) {
      throw new Error('Morning API credentials not configured');
    }

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Supabase credentials not configured');
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { email, signatures_quantity, success_url, cancel_url } = await req.json();

    if (!email || !signatures_quantity) {
      throw new Error('Missing required fields: email, signatures_quantity');
    }

    // Calculate pricing
    const { basePlan, extraSignatures, totalAmount } = calculatePrice(signatures_quantity);

    // Create purchase record
    const { data: purchase, error: purchaseError } = await supabase
      .from('purchases')
      .insert({
        email,
        signatures_quantity,
        base_plan: basePlan,
        extra_signatures: extraSignatures,
        total_amount: totalAmount,
        currency: 'ILS',
        status: 'pending',
      })
      .select()
      .single();

    if (purchaseError) {
      console.error('Purchase creation error:', purchaseError);
      throw new Error('Failed to create purchase record');
    }

    // Get Morning API token
    console.log('Attempting to get Morning API token...');
    const tokenResponse = await fetch(`${MORNING_API_URL}/account/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: MORNING_API_KEY,
        secret: MORNING_API_SECRET,
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('Morning token error status:', tokenResponse.status);
      console.error('Morning token error body:', errorText);
      throw new Error(`Morning auth failed: ${tokenResponse.status} - ${errorText}`);
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.token;
    console.log('Got Morning API token successfully');

    // Create payment form in Morning
    const paymentFormBody = {
      description: `רכישת ${signatures_quantity} חתימות מייל - SignaturePro`,
      type: 320, // Payment form type for payment page
      lang: 'he',
      currency: 'ILS',
      vatType: 1, // Include VAT
      amount: totalAmount,
      maxPayments: 1,
      pluginId: purchase.id,
      client: {
        emails: [email],
      },
      successUrl: success_url || `${req.headers.get('origin')}/payment-success?purchase_id=${purchase.id}`,
      failureUrl: cancel_url || `${req.headers.get('origin')}/payment-cancel?purchase_id=${purchase.id}`,
      notifyUrl: `${SUPABASE_URL}/functions/v1/payment-webhook`,
      income: [
        {
          catalogNum: 'SIG-001',
          description: signatures_quantity <= 3 
            ? `מסלול ${basePlan} - ${signatures_quantity} חתימות`
            : `מסלול 3 + ${extraSignatures} חתימות נוספות`,
          quantity: 1,
          price: totalAmount,
          currency: 'ILS',
          vatType: 1,
        },
      ],
    };

    console.log('Creating payment form with body:', JSON.stringify(paymentFormBody));

    const paymentFormResponse = await fetch(`${MORNING_API_URL}/payments/form`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(paymentFormBody),
    });

    const responseText = await paymentFormResponse.text();
    console.log('Payment form response status:', paymentFormResponse.status);
    console.log('Payment form response body:', responseText);

    if (!paymentFormResponse.ok) {
      throw new Error(`Morning payment form failed: ${paymentFormResponse.status} - ${responseText}`);
    }

    const paymentFormData = JSON.parse(responseText);

    // Update purchase with Morning transaction ID
    await supabase
      .from('purchases')
      .update({ morning_transaction_id: paymentFormData.id })
      .eq('id', purchase.id);

    return new Response(
      JSON.stringify({
        success: true,
        payment_url: paymentFormData.url,
        purchase_id: purchase.id,
        amount: totalAmount,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Payment creation error:', error);
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