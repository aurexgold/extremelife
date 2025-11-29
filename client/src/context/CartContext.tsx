import React, { createContext, useState, ReactNode } from "react";

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  shippingMethod: string;
  paymentMethod: string;
  status: "completed" | "processing" | "failed";
}

interface CartContextType {
  cart: CartItem[];
  orders: Order[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  placeOrder: (order: Omit<Order, "id" | "date">) => Order;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

const MOCK_ORDERS: Order[] = [
  {
    id: "ORD001",
    date: "2024-11-15",
    items: [
      { productId: 1, name: "Detox Tea Blend", price: 499, image: "https://images.unsplash.com/photo-1597318972592-f050c5c8c1ba?w=400", quantity: 2 },
    ],
    subtotal: 998,
    shipping: 100,
    tax: 130,
    total: 1228,
    customerName: "Maria Santos",
    customerEmail: "maria@email.com",
    shippingAddress: "123 Main St, Manila, 1000",
    shippingMethod: "J&T Express",
    paymentMethod: "GCash",
    status: "completed",
  },
  {
    id: "ORD002",
    date: "2024-11-10",
    items: [
      { productId: 3, name: "Vitality Immunity Capsules", price: 1299, image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde0f?w=400", quantity: 1 },
    ],
    subtotal: 1299,
    shipping: 75,
    tax: 170,
    total: 1544,
    customerName: "Maria Santos",
    customerEmail: "maria@email.com",
    shippingAddress: "123 Main St, Manila, 1000",
    shippingMethod: "LBC",
    paymentMethod: "PayMaya",
    status: "completed",
  },
];

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("orders");
      return saved ? JSON.parse(saved) : MOCK_ORDERS;
    }
    return MOCK_ORDERS;
  });

  const addToCart = (item: CartItem) => {
    const existingItem = cart.find((i) => i.productId === item.productId);
    let updated;
    if (existingItem) {
      updated = cart.map((i) =>
        i.productId === item.productId ? { ...i, quantity: i.quantity + item.quantity } : i
      );
    } else {
      updated = [...cart, item];
    }
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeFromCart = (productId: number) => {
    const updated = cart.filter((i) => i.productId !== productId);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const updated = cart.map((i) =>
      i.productId === productId ? { ...i, quantity } : i
    );
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.setItem("cart", JSON.stringify([]));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const placeOrder = (orderData: Omit<Order, "id" | "date">) => {
    const order: Order = {
      ...orderData,
      id: "ORD" + String(orders.length + 1).padStart(3, "0"),
      date: new Date().toISOString().split("T")[0],
    };
    const updated = [order, ...orders];
    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
    clearCart();
    return order;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        orders,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        placeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = React.useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
