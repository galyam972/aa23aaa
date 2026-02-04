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

    // Get the first active allocation with remaining signatures
    const { data: signatures, error: fetchError } = await supabase
      .from('user_signatures')
      .select('*')
      .eq('email', email)
      .eq('is_active', true)
      .gte('expires_at', new Date().toISOString())
      .order('expires_at', { ascending: true });

    if (fetchError) {
      console.error('Signatures fetch error:', fetchError);
      throw new Error('Failed to fetch signatures');
    }

    // Find an allocation with remaining signatures
    let allocationToUse = null;
    for (const sig of signatures || []) {
      if (sig.used_signatures < sig.max_signatures) {
        allocationToUse = sig;
        break;
      }
    }

    if (!allocationToUse) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'No remaining signatures available',
          has_access: false,
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 403,
        }
      );
    }

    // Increment used signatures
    const { error: updateError } = await supabase
      .from('user_signatures')
      .update({ used_signatures: allocationToUse.used_signatures + 1 })
      .eq('id', allocationToUse.id);

    if (updateError) {
      console.error('Update error:', updateError);
      throw new Error('Failed to use signature');
    }

    const remainingAfterUse = allocationToUse.max_signatures - allocationToUse.used_signatures - 1;

    return new Response(
      JSON.stringify({
        success: true,
        remaining_signatures: remainingAfterUse,
        message: 'Signature used successfully',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Use signature error:', error);
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