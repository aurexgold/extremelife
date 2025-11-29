// Shipping options for Philippines
export const SHIPPING_OPTIONS = [
  { id: "jnt", name: "J&T Express", fee: 75, days: "2-3 days" },
  { id: "lbc", name: "LBC Express", fee: 75, days: "3-5 days" },
  { id: "2go", name: "2GO Express", fee: 75, days: "2-4 days" },
  { id: "lalamove", name: "Lalamove (Metro Manila)", fee: 200, days: "Same day" },
];

// Payment options
export const PAYMENT_OPTIONS = [
  { id: "gcash", name: "GCash", logo: "💳", description: "Mobile wallet" },
  { id: "paymaya", name: "PayMaya", logo: "💳", description: "Debit/prepaid card" },
  { id: "cod", name: "Cash on Delivery", logo: "💵", description: "Pay when delivered" },
];

// Form validation rules
export const VALIDATION_RULES = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 100,
    pattern: /^[a-zA-Z\s\-'\.]+$/,
    errorMessage: "Name must be 2-100 characters and contain only letters, spaces, hyphens, apostrophes, or periods",
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    errorMessage: "Please enter a valid email address",
  },
  phone: {
    required: true,
    pattern: /^(\+63|0)?[0-9]{10}$/,
    errorMessage: "Please enter a valid Philippine phone number (10 digits)",
  },
  address: {
    required: true,
    minLength: 5,
    maxLength: 200,
    errorMessage: "Address must be 5-200 characters",
  },
  city: {
    required: true,
    minLength: 2,
    maxLength: 100,
    errorMessage: "City must be 2-100 characters",
  },
  postalCode: {
    required: false,
    pattern: /^[0-9]{4}$/,
    errorMessage: "Postal code must be 4 digits",
  },
};

// Tax rate for Philippines (VAT)
export const TAX_RATE = 0.13;

// Loyalty tier discount mapping
export const LOYALTY_DISCOUNTS = {
  bronze: 0.02,    // 2%
  silver: 0.05,    // 5%
  gold: 0.10,      // 10%
  platinum: 0.15,  // 15%
};

// Free shipping threshold
export const FREE_SHIPPING_THRESHOLD = 2500;
