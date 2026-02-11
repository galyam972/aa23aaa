import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const MORNING_API_URL = 'https://api.greeninvoice.co.il/api/v1';

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 255;
}

function isValidUrl(url: string, allowedOrigins: string[]): boolean {
  try {
    const parsed = new URL(url);
    return allowedOrigins.some(origin => url.startsWith(origin)) && parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

function calculatePrice(quantity: number): { basePlan: number; extraSignatures: number; totalAmount: number } {
  if (quantity <= 0 || !Number.isInteger(quantity) || quantity > 100) throw new Error('Invalid quantity');
  
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
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const MORNING_API_KEY = Deno.env.get('MORNING_API_KEY');
    const MORNING_API_SECRET = Deno.env.get('MORNING_API_SECRET');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY');

    if (!MORNING_API_KEY || !MORNING_API_SECRET) {
      throw new Error('Morning API credentials not configured');
    }
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !SUPABASE_ANON_KEY) {
      throw new Error('Supabase credentials not configured');
    }

    // Authenticate the request
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ success: false, error: 'Unauthorized' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    const anonClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: authHeader } }
    });
    const { data: claimsData, error: claimsError } = await anonClient.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid token' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      );
    }

    // Use email from JWT claims
    const email = claimsData.claims.email as string;
    if (!email || !isValidEmail(email)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid email in token' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const body = await req.json();
    const signatures_quantity = body.signatures_quantity;
    const success_url = body.success_url;
    const cancel_url = body.cancel_url;

    // Validate signatures_quantity
    if (typeof signatures_quantity !== 'number' || !Number.isInteger(signatures_quantity) || signatures_quantity < 1 || signatures_quantity > 100) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid signatures_quantity: must be integer 1-100' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Validate URLs if provided - must match the request origin
    const origin = req.headers.get('origin') || '';
    const allowedOrigins = [origin, 'https://aa23aaa.lovable.app'].filter(Boolean);

    if (success_url && typeof success_url === 'string' && !isValidUrl(success_url, allowedOrigins)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid success_url' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }
    if (cancel_url && typeof cancel_url === 'string' && !isValidUrl(cancel_url, allowedOrigins)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid cancel_url' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    const { basePlan, extraSignatures, totalAmount } = calculatePrice(signatures_quantity);

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
    const tokenResponse = await fetch(`${MORNING_API_URL}/account/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: MORNING_API_KEY, secret: MORNING_API_SECRET }),
    });

    if (!tokenResponse.ok) {
      throw new Error(`Morning auth failed: ${tokenResponse.status}`);
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.token;

    const paymentFormBody = {
      description: `רכישת ${signatures_quantity} חתימות מייל - SignaturePro`,
      type: 320,
      lang: 'he',
      currency: 'ILS',
      vatType: 1,
      amount: totalAmount,
      maxPayments: 1,
      pluginId: purchase.id,
      client: { emails: [email] },
      successUrl: success_url || `${origin}/payment-success?purchase_id=${purchase.id}`,
      failureUrl: cancel_url || `${origin}/payment-cancel?purchase_id=${purchase.id}`,
      notifyUrl: `${SUPABASE_URL}/functions/v1/payment-webhook`,
      income: [{
        catalogNum: 'SIG-001',
        description: signatures_quantity <= 3
          ? `מסלול ${basePlan} - ${signatures_quantity} חתימות`
          : `מסלול 3 + ${extraSignatures} חתימות נוספות`,
        quantity: 1,
        price: totalAmount,
        currency: 'ILS',
        vatType: 1,
      }],
    };

    const paymentFormResponse = await fetch(`${MORNING_API_URL}/payments/form`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(paymentFormBody),
    });

    const responseText = await paymentFormResponse.text();
    if (!paymentFormResponse.ok) {
      throw new Error(`Morning payment form failed: ${paymentFormResponse.status}`);
    }

    const paymentFormData = JSON.parse(responseText);

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
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error) {
    console.error('Payment creation error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'An error occurred while processing payment',
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    );
  }
});
