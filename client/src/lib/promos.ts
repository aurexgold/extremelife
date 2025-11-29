export interface Promo {
  code: string;
  discount: number; // percentage
  minAmount: number; // minimum order amount
  expiryDate: string;
  maxUses: number;
  currentUses: number;
  active: boolean;
}

export const AVAILABLE_PROMOS: Promo[] = [
  {
    code: "WELCOME10",
    discount: 10,
    minAmount: 500,
    expiryDate: "2024-12-31",
    maxUses: 100,
    currentUses: 45,
    active: true,
  },
  {
    code: "HOLIDAY20",
    discount: 20,
    minAmount: 2000,
    expiryDate: "2024-12-25",
    maxUses: 50,
    currentUses: 32,
    active: true,
  },
  {
    code: "LOYAL15",
    discount: 15,
    minAmount: 1000,
    expiryDate: "2024-12-31",
    maxUses: 200,
    currentUses: 87,
    active: true,
  },
  {
    code: "EXTREME5",
    discount: 5,
    minAmount: 300,
    expiryDate: "2025-01-31",
    maxUses: 500,
    currentUses: 234,
    active: true,
  },
];

export function validatePromoCode(code: string, orderAmount: number): { valid: boolean; discount: number; message: string } {
  const promo = AVAILABLE_PROMOS.find((p) => p.code.toUpperCase() === code.toUpperCase());

  if (!promo) {
    return { valid: false, discount: 0, message: "Promo code not found" };
  }

  if (!promo.active) {
    return { valid: false, discount: 0, message: "This promo code is no longer active" };
  }

  const today = new Date();
  const expiryDate = new Date(promo.expiryDate);
  if (today > expiryDate) {
    return { valid: false, discount: 0, message: "This promo code has expired" };
  }

  if (promo.currentUses >= promo.maxUses) {
    return { valid: false, discount: 0, message: "This promo code has reached its usage limit" };
  }

  if (orderAmount < promo.minAmount) {
    return { valid: false, discount: 0, message: `Minimum order amount is ₱${promo.minAmount.toLocaleString()}` };
  }

  return { valid: true, discount: promo.discount, message: "Promo code applied!" };
}
