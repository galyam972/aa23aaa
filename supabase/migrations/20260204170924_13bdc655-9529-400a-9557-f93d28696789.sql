-- 1. טבלת משתמשים/מנויים (user_id NOT NULL, UNIQUE על user_id, לא על email)
CREATE TABLE public.user_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  email TEXT NOT NULL,
  plan_type TEXT NOT NULL DEFAULT 'guest' 
    CHECK (plan_type IN ('guest', 'basic', 'pro', 'business')),
  signature_credits INTEGER NOT NULL DEFAULT 0,
  payer_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. עדכון purchases עם כל השדות הנדרשים
ALTER TABLE public.purchases
  ADD COLUMN IF NOT EXISTS gateway TEXT DEFAULT 'morning',
  ADD COLUMN IF NOT EXISTS gateway_transaction_id TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS plan_type TEXT CHECK (plan_type IN ('basic', 'pro', 'business')),
  ADD COLUMN IF NOT EXISTS signatures_purchased INTEGER NOT NULL DEFAULT 1,
  ADD COLUMN IF NOT EXISTS amount_paid INTEGER,
  ADD COLUMN IF NOT EXISTS raw_payload JSONB;

-- עדכון status constraint
ALTER TABLE public.purchases 
  DROP CONSTRAINT IF EXISTS purchases_status_check;
ALTER TABLE public.purchases 
  ADD CONSTRAINT purchases_status_check 
  CHECK (status IN ('pending', 'paid', 'failed', 'refunded'));

CREATE INDEX IF NOT EXISTS idx_purchases_gateway_tx ON public.purchases(gateway_transaction_id);

-- 3. טבלת חתימות שנשמרו (user_id NOT NULL)
DROP TABLE IF EXISTS public.user_signatures;

CREATE TABLE public.user_signatures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  signature_name TEXT,
  template_id TEXT,
  signature_data JSONB NOT NULL DEFAULT '{}',
  html TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS: user_subscriptions
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own subscription" 
  ON public.user_subscriptions FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own subscription" 
  ON public.user_subscriptions FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own subscription" 
  ON public.user_subscriptions FOR UPDATE 
  USING (auth.uid() = user_id);

-- RLS: user_signatures
ALTER TABLE public.user_signatures ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own signatures" 
  ON public.user_signatures FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own signatures" 
  ON public.user_signatures FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own signatures" 
  ON public.user_signatures FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own signatures" 
  ON public.user_signatures FOR DELETE 
  USING (auth.uid() = user_id);

-- Trigger לעדכון updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_subscriptions_updated_at
  BEFORE UPDATE ON public.user_subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_user_signatures_updated_at
  BEFORE UPDATE ON public.user_signatures
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- פונקציה אטומית להורדת קרדיט (מונע credits שלילי)
CREATE OR REPLACE FUNCTION public.decrement_signature_credit(p_user_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  updated_count INTEGER;
BEGIN
  UPDATE public.user_subscriptions
  SET signature_credits = signature_credits - 1,
      updated_at = now()
  WHERE user_id = p_user_id
    AND signature_credits > 0;
  
  GET DIAGNOSTICS updated_count = ROW_COUNT;
  
  RETURN updated_count > 0;
END;
$$;