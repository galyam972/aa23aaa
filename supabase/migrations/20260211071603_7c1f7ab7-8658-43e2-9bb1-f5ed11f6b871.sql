
-- 1. profiles: Add restrictive DELETE policy (own profile only)
CREATE POLICY "Users can delete own profile"
ON public.profiles
FOR DELETE
USING (auth.uid() = user_id);

-- 2. profiles: Add WITH CHECK to UPDATE policy to prevent user_id hijacking
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
ON public.profiles
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 3. user_subscriptions: Add WITH CHECK to UPDATE policy to prevent privilege escalation
DROP POLICY IF EXISTS "Users can update own subscription" ON public.user_subscriptions;
CREATE POLICY "Users can update own subscription"
ON public.user_subscriptions
FOR UPDATE
USING ((auth.uid() = user_id) OR (user_id IS NULL AND email = auth.email()))
WITH CHECK ((auth.uid() = user_id) OR (user_id IS NULL AND email = auth.email()));

-- 4. user_signatures: Add WITH CHECK to UPDATE policy to prevent ownership changes
DROP POLICY IF EXISTS "Users can update own signatures" ON public.user_signatures;
CREATE POLICY "Users can update own signatures"
ON public.user_signatures
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
