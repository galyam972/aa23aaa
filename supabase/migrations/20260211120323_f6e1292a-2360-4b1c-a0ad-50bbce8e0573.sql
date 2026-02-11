
CREATE OR REPLACE FUNCTION public.decrement_signature_credit(p_user_id uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  updated_count INTEGER;
BEGIN
  -- Authorization check: only allow users to decrement their own credits
  IF auth.uid() IS NULL OR auth.uid() != p_user_id THEN
    RAISE EXCEPTION 'Unauthorized: can only decrement own credits';
  END IF;

  UPDATE public.user_subscriptions
  SET signature_credits = signature_credits - 1,
      updated_at = now()
  WHERE user_id = p_user_id
    AND signature_credits > 0;
  
  GET DIAGNOSTICS updated_count = ROW_COUNT;
  
  RETURN updated_count > 0;
END;
$function$;
