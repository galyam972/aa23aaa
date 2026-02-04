-- purchases: רק service role יכול לגשת (webhook)
-- נוסיף policy ריק שמונע גישה מלקוחות רגילים
CREATE POLICY "No public access to purchases" 
  ON public.purchases FOR SELECT 
  USING (false);

CREATE POLICY "No public insert to purchases" 
  ON public.purchases FOR INSERT 
  WITH CHECK (false);

CREATE POLICY "No public update to purchases" 
  ON public.purchases FOR UPDATE 
  USING (false);