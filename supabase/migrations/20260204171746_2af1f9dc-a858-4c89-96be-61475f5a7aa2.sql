-- 1. הפוך user_id ל-nullable
ALTER TABLE public.user_subscriptions
  ALTER COLUMN user_id DROP NOT NULL;

-- 2. הסר את ה-UNIQUE constraint מ-user_id (אם קיים)
ALTER TABLE public.user_subscriptions
  DROP CONSTRAINT IF EXISTS user_subscriptions_user_id_key;

-- 3. הוסף unique index על email
CREATE UNIQUE INDEX IF NOT EXISTS idx_user_subscriptions_email
  ON public.user_subscriptions(email);

-- 4. עדכן RLS policies לתמוך ב-user_id nullable
DROP POLICY IF EXISTS "Users can read own subscription" ON public.user_subscriptions;
DROP POLICY IF EXISTS "Users can insert own subscription" ON public.user_subscriptions;
DROP POLICY IF EXISTS "Users can update own subscription" ON public.user_subscriptions;

-- SELECT: משתמש יכול לקרוא את שלו (לפי user_id או email)
CREATE POLICY "Users can read own subscription" 
  ON public.user_subscriptions FOR SELECT 
  USING (
    auth.uid() = user_id 
    OR (user_id IS NULL AND email = auth.email())
  );

-- INSERT: רק service role (webhook) יכול להכניס
-- משתמשים רגילים לא צריכים להכניס ישירות
CREATE POLICY "Service role can insert subscriptions" 
  ON public.user_subscriptions FOR INSERT 
  WITH CHECK (false);

-- UPDATE: משתמש יכול לעדכן את שלו
CREATE POLICY "Users can update own subscription" 
  ON public.user_subscriptions FOR UPDATE 
  USING (
    auth.uid() = user_id 
    OR (user_id IS NULL AND email = auth.email())
  );