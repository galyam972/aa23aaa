-- תיקון RLS policies על purchases - הסרת policies ישנים עם USING(true)
DROP POLICY IF EXISTS "Anyone can check purchase by email" ON public.purchases;
DROP POLICY IF EXISTS "Service role can insert purchases" ON public.purchases;
DROP POLICY IF EXISTS "Service role can update purchases" ON public.purchases;

-- הוספת search_path לפונקציית update_updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql
SET search_path = public;