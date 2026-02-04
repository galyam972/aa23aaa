-- Create purchases table to track all payments
CREATE TABLE public.purchases (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  signatures_quantity INTEGER NOT NULL,
  base_plan INTEGER NOT NULL CHECK (base_plan IN (1, 2, 3)),
  extra_signatures INTEGER NOT NULL DEFAULT 0 CHECK (extra_signatures >= 0),
  total_amount INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'ILS',
  morning_transaction_id TEXT,
  morning_invoice_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + INTERVAL '3 months')
);

-- Create user_signatures table to track signature usage
CREATE TABLE public.user_signatures (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  purchase_id UUID NOT NULL REFERENCES public.purchases(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  max_signatures INTEGER NOT NULL,
  used_signatures INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + INTERVAL '3 months')
);

-- Create index for faster lookups
CREATE INDEX idx_purchases_email ON public.purchases(email);
CREATE INDEX idx_purchases_status ON public.purchases(status);
CREATE INDEX idx_user_signatures_email ON public.user_signatures(email);
CREATE INDEX idx_user_signatures_active ON public.user_signatures(is_active);

-- Enable Row Level Security
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_signatures ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (for checking purchase status)
CREATE POLICY "Anyone can check purchase by email" 
ON public.purchases 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can check signatures by email" 
ON public.user_signatures 
FOR SELECT 
USING (true);

-- Create policies for service role insert/update (via edge functions)
CREATE POLICY "Service role can insert purchases" 
ON public.purchases 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Service role can update purchases" 
ON public.purchases 
FOR UPDATE 
USING (true);

CREATE POLICY "Service role can insert user_signatures" 
ON public.user_signatures 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Service role can update user_signatures" 
ON public.user_signatures 
FOR UPDATE 
USING (true);