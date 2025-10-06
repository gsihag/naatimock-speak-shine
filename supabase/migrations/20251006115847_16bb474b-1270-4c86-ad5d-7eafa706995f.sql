-- Create stripe_subscriptions table for storing subscription information
CREATE TABLE IF NOT EXISTS public.stripe_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_customer_id TEXT NOT NULL,
  stripe_subscription_id TEXT UNIQUE,
  price_id TEXT,
  subscription_status TEXT NOT NULL DEFAULT 'not_started',
  current_period_start BIGINT,
  current_period_end BIGINT,
  cancel_at_period_end BOOLEAN DEFAULT false,
  payment_method_brand TEXT,
  payment_method_last4 TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id)
);

-- Create stripe_orders table for one-time payments
CREATE TABLE IF NOT EXISTS public.stripe_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_customer_id TEXT NOT NULL,
  stripe_session_id TEXT UNIQUE NOT NULL,
  price_id TEXT NOT NULL,
  amount_total BIGINT NOT NULL,
  currency TEXT NOT NULL,
  payment_status TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on both tables
ALTER TABLE public.stripe_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stripe_orders ENABLE ROW LEVEL SECURITY;

-- RLS policies for stripe_subscriptions
CREATE POLICY "Users can view their own subscription"
  ON public.stripe_subscriptions
  FOR SELECT
  USING (auth.uid() = user_id);

-- RLS policies for stripe_orders
CREATE POLICY "Users can view their own orders"
  ON public.stripe_orders
  FOR SELECT
  USING (auth.uid() = user_id);

-- Create view for easy subscription access
CREATE OR REPLACE VIEW public.stripe_user_subscriptions AS
SELECT 
  user_id,
  subscription_status,
  price_id,
  current_period_end,
  cancel_at_period_end
FROM public.stripe_subscriptions;

-- Grant access to the view
GRANT SELECT ON public.stripe_user_subscriptions TO authenticated;

-- Add updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.stripe_subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();