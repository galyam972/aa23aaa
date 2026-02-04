-- Add restrictive DELETE policy to purchases table (append-only for audit/compliance)
CREATE POLICY "No one can delete purchases" 
ON public.purchases 
FOR DELETE 
USING (false);