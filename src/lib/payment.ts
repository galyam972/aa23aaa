import { supabase } from "@/integrations/supabase/client";

export interface PricingPlan {
  id: number;
  signatures: number;
  price: number;
  pricePerSignature: number;
  popular?: boolean;
}

export const PRICING_PLANS: PricingPlan[] = [
  { id: 1, signatures: 1, price: 39, pricePerSignature: 39 },
  { id: 2, signatures: 2, price: 69, pricePerSignature: 34.5, popular: true },
  { id: 3, signatures: 3, price: 99, pricePerSignature: 33 },
];

export const EXTRA_SIGNATURE_PRICE = 19;
export const MIN_SIGNATURES_FOR_EXTRAS = 3;

export function calculatePrice(quantity: number): { basePlan: number; extraSignatures: number; totalAmount: number } {
  if (quantity <= 0) throw new Error('Invalid quantity');
  
  if (quantity === 1) return { basePlan: 1, extraSignatures: 0, totalAmount: 39 };
  if (quantity === 2) return { basePlan: 2, extraSignatures: 0, totalAmount: 69 };
  if (quantity >= 3) {
    const extraSignatures = quantity - 3;
    const totalAmount = 99 + (extraSignatures * EXTRA_SIGNATURE_PRICE);
    return { basePlan: 3, extraSignatures, totalAmount };
  }
  
  throw new Error('Invalid quantity');
}

export async function createPayment(email: string, signaturesQuantity: number): Promise<{ success: boolean; paymentUrl?: string; error?: string }> {
  try {
    const { data, error } = await supabase.functions.invoke('create-payment', {
      body: {
        email,
        signatures_quantity: signaturesQuantity,
        success_url: `${window.location.origin}/payment-success`,
        cancel_url: `${window.location.origin}/payment-cancel`,
      },
    });

    if (error) {
      console.error('Payment creation error:', error);
      return { success: false, error: error.message };
    }

    if (!data.success) {
      return { success: false, error: data.error };
    }

    return { success: true, paymentUrl: data.payment_url };
  } catch (error) {
    console.error('Payment error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function checkSignatures(email: string): Promise<{
  hasAccess: boolean;
  totalSignatures: number;
  usedSignatures: number;
  remainingSignatures: number;
}> {
  try {
    const { data, error } = await supabase.functions.invoke('check-signatures', {
      body: { email },
    });

    if (error || !data.success) {
      return { hasAccess: false, totalSignatures: 0, usedSignatures: 0, remainingSignatures: 0 };
    }

    return {
      hasAccess: data.has_access,
      totalSignatures: data.total_signatures,
      usedSignatures: data.used_signatures,
      remainingSignatures: data.remaining_signatures,
    };
  } catch {
    return { hasAccess: false, totalSignatures: 0, usedSignatures: 0, remainingSignatures: 0 };
  }
}

export async function useSignature(email: string): Promise<{ success: boolean; remainingSignatures?: number; error?: string }> {
  try {
    const { data, error } = await supabase.functions.invoke('use-signature', {
      body: { email },
    });

    if (error) {
      return { success: false, error: error.message };
    }

    if (!data.success) {
      return { success: false, error: data.error };
    }

    return { success: true, remainingSignatures: data.remaining_signatures };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}