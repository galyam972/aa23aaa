-- Create newsletter_subscribers table for free template users
CREATE TABLE public.newsletter_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  source TEXT DEFAULT 'free_template'
);

-- Enable Row Level Security
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow public inserts for newsletter signup (no auth required)
CREATE POLICY "Anyone can subscribe to newsletter" 
ON public.newsletter_subscribers 
FOR INSERT 
WITH CHECK (true);

-- No public SELECT - only service role can read
CREATE POLICY "No public read access" 
ON public.newsletter_subscribers 
FOR SELECT 
USING (false);

-- No public UPDATE
CREATE POLICY "No public update access" 
ON public.newsletter_subscribers 
FOR UPDATE 
USING (false);

-- No public DELETE
CREATE POLICY "No public delete access" 
ON public.newsletter_subscribers 
FOR DELETE 
USING (false);