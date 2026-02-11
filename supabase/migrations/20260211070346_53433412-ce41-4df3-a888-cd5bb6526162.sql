
-- Create DELETE policy for users on their own subscription records
CREATE POLICY "Users can delete their own subscriptions"
ON public.user_subscriptions
FOR DELETE
USING (
  (auth.uid() = user_id)
  OR
  (user_id IS NULL AND email = auth.email())
);
