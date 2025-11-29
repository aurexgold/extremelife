import teaImg from "@assets/generated_images/herbal_tea_product.png";
import oilImg from "@assets/generated_images/essential_oil_product.png";
import capsulesImg from "@assets/generated_images/herbal_capsules_product.png";
import soapImg from "@assets/generated_images/organic_soap_product.png";

export const companyInfo = {
  name: "Extreme Life Herbal Products",
  tagline: "Natural Wellness Solutions para sa Buong Pamilya",
  description: "Premium organic herbal products handpicked and crafted for the Filipino market. Supporting local wellness since 2018.",
  locations: ["Manila", "Cebu", "Davao"],
  contact: "Follow us on Lazada & Shopee"
};

export const products = [
  {
    id: 1,
    name: "Organic Detox Tea Blend",
    price: 649.99,
    originalPrice: 799.99,
    category: "Tea",
    image: teaImg,
    description: "A soothing blend of dandelion, milk thistle, and ginger to support natural detoxification.",
    shopee: true,
    lazada: true,
    fcf: true,
    stock: 45,
    rating: 4.8,
    reviews: 127
  },
  {
    id: 2,
    name: "Pure Lavender Essential Oil",
    price: 485.00,
    originalPrice: 599.99,
    category: "Essential Oils",
    image: oilImg,
    description: "100% pure therapeutic grade lavender oil for relaxation and sleep support.",
    shopee: true,
    lazada: true,
    fcf: true,
    stock: 8,
    rating: 4.9,
    reviews: 243
  },
  {
    id: 3,
    name: "Vitality Immunity Capsules",
    price: 849.99,
    originalPrice: 999.99,
    category: "Supplements",
    image: capsulesImg,
    description: "Boost your immune system with our potent blend of Vitamin C, Zinc, and Elderberry.",
    shopee: true,
    lazada: true,
    fcf: true,
    stock: 32,
    rating: 4.7,
    reviews: 89
  },
  {
    id: 4,
    name: "Herbal Exfoliating Soap",
    price: 319.99,
    originalPrice: 399.99,
    category: "Body Care",
    image: soapImg,
    description: "Gentle exfoliation with ground oats and honey for soft, glowing skin.",
    shopee: true,
    lazada: true,
    fcf: true,
    stock: 0,
    rating: 4.6,
    reviews: 156
  },
  {
    id: 5,
    name: "Sleep Well Night Time Tea",
    price: 599.99,
    originalPrice: 749.99,
    category: "Tea",
    image: teaImg,
    description: "Calming chamomile and valerian root blend to help you drift off naturally.",
    shopee: true,
    lazada: true,
    fcf: false,
    stock: 23,
    rating: 4.9,
    reviews: 198
  },
  {
    id: 6,
    name: "Focus & Clarity Oil Blend",
    price: 549.99,
    originalPrice: 649.99,
    category: "Essential Oils",
    image: oilImg,
    description: "Sharpen your mind with peppermint, rosemary, and lemon essential oils.",
    shopee: true,
    lazada: true,
    fcf: true,
    stock: 15,
    rating: 4.8,
    reviews: 67
  }
];

export const shippingOptions = [
  {
    id: 1,
    name: "Lalamove Express",
    region: "Metro Manila",
    time: "Same Day",
    cost: 150
  },
  {
    id: 2,
    name: "J&T Express",
    region: "Nationwide",
    time: "2-3 Days",
    cost: 89
  },
  {
    id: 3,
    name: "LBC Express",
    region: "Nationwide",
    time: "2-3 Days",
    cost: 99
  },
  {
    id: 4,
    name: "2GO Express",
    region: "Nationwide",
    time: "3-5 Days",
    cost: 79
  }
];

export const paymentMethods = [
  { id: 1, name: "GCash", icon: "💳" },
  { id: 2, name: "PayMaya", icon: "💳" },
  { id: 3, name: "Debit/Credit Card", icon: "💳" },
  { id: 4, name: "Bank Transfer", icon: "🏦" },
  { id: 5, name: "Cash on Delivery (COD)", icon: "💵" }
];

export const chatMessages = [
  { id: 1, user: "Maria S.", message: "Available pa ba sa Shopee?" },
  { id: 2, user: "Juan T.", message: "Nagorder na kami, gaano katagal delivery?" },
  { id: 3, user: "Admin", message: "Available sa Shopee at Lazada! J&T delivery 2-3 days nationwide." },
  { id: 4, user: "Rosa R.", message: "GCash payment ba pwede?" },
  { id: 5, user: "Admin", message: "Yes! GCash, PayMaya, debit card, bank transfer, at COD available kami." },
];
