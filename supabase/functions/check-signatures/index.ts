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

    const { email } = await req.json();

    if (!email) {
      throw new Error('Missing required field: email');
    }

    // Get all active signature allocations for the email
    const { data: signatures, error } = await supabase
      .from('user_signatures')
      .select('*')
      .eq('email', email)
      .eq('is_active', true)
      .gte('expires_at', new Date().toISOString())
      .order('expires_at', { ascending: false });

    if (error) {
      console.error('Signatures fetch error:', error);
      throw new Error('Failed to fetch signatures');
    }

    // Calculate totals
    let totalMaxSignatures = 0;
    let totalUsedSignatures = 0;

    for (const sig of signatures || []) {
      totalMaxSignatures += sig.max_signatures;
      totalUsedSignatures += sig.used_signatures;
    }

    const remainingSignatures = totalMaxSignatures - totalUsedSignatures;
    const hasActiveSubscription = signatures && signatures.length > 0;

    return new Response(
      JSON.stringify({
        success: true,
        has_access: hasActiveSubscription && remainingSignatures > 0,
        total_signatures: totalMaxSignatures,
        used_signatures: totalUsedSignatures,
        remaining_signatures: remainingSignatures,
        allocations: signatures || [],
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Check signatures error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        has_access: false,
        remaining_signatures: 0,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});