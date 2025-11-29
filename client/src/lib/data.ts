import teaImg from "@assets/generated_images/herbal_tea_product.png";
import oilImg from "@assets/generated_images/essential_oil_product.png";
import capsulesImg from "@assets/generated_images/herbal_capsules_product.png";
import soapImg from "@assets/generated_images/organic_soap_product.png";

export const products = [
  {
    id: 1,
    name: "Organic Detox Tea Blend",
    price: 24.99,
    category: "Tea",
    image: teaImg,
    description: "A soothing blend of dandelion, milk thistle, and ginger to support natural detoxification."
  },
  {
    id: 2,
    name: "Pure Lavender Essential Oil",
    price: 18.50,
    category: "Essential Oils",
    image: oilImg,
    description: "100% pure therapeutic grade lavender oil for relaxation and sleep support."
  },
  {
    id: 3,
    name: "Vitality Immunity Capsules",
    price: 32.00,
    category: "Supplements",
    image: capsulesImg,
    description: "Boost your immune system with our potent blend of Vitamin C, Zinc, and Elderberry."
  },
  {
    id: 4,
    name: "Herbal Exfoliating Soap",
    price: 12.00,
    category: "Body Care",
    image: soapImg,
    description: "Gentle exfoliation with ground oats and honey for soft, glowing skin."
  },
  {
    id: 5,
    name: "Sleep Well Night Time Tea",
    price: 22.99,
    category: "Tea",
    image: teaImg,
    description: "Calming chamomile and valerian root blend to help you drift off naturally."
  },
  {
    id: 6,
    name: "Focus & Clarity Oil Blend",
    price: 21.00,
    category: "Essential Oils",
    image: oilImg,
    description: "Sharpen your mind with peppermint, rosemary, and lemon essential oils."
  }
];

export const chatMessages = [
  { id: 1, user: "Sarah J.", message: "Does the tea help with bloating?" },
  { id: 2, user: "Mike T.", message: "Just ordered the soap! Can't wait." },
  { id: 3, user: "Admin", message: "Yes Sarah, the ginger helps soothe digestion!" },
  { id: 4, user: "Emily R.", message: "Is the shipping free?" },
  { id: 5, user: "Admin", message: "Free shipping on orders over $50 today!" },
];
