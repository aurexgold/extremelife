import React, { createContext, useState, useEffect, ReactNode } from "react";
import { useCart } from "./CartContext";
import { useAuth } from "./AuthContext";

export interface AbandonedCart {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  cartItems: any[];
  cartValue: number;
  abandonedAt: string;
  recoveryToken: string;
  recoveryDiscount: number;
  status: "abandoned" | "recovered" | "converted";
  recoveredAt?: string;
  convertedAt?: string;
}

interface AbandonedCartContextType {
  abandonedCarts: AbandonedCart[];
  checkAbandonedCart: () => void;
  recoverCart: (token: string) => boolean;
  getAbandonedCartStats: () => {
    totalAbandoned: number;
    recovered: number;
    converted: number;
    totalValue: number;
    recoveryRate: number;
  };
}

export const AbandonedCartContext = createContext<AbandonedCartContextType | undefined>(undefined);

const INITIAL_ABANDONED_CARTS: AbandonedCart[] = [
  {
    id: "ac1",
    userId: "user456",
    userName: "Juan Dela Cruz",
    userEmail: "juan@email.com",
    cartItems: [
      { id: 1, name: "Lavender Oil", price: 799, quantity: 2 },
      { id: 2, name: "Peppermint Soap", price: 549, quantity: 1 },
    ],
    cartValue: 2147,
    abandonedAt: "2024-11-28T18:30:00",
    recoveryToken: "rec_abc123xyz",
    recoveryDiscount: 10,
    status: "abandoned",
  },
  {
    id: "ac2",
    userId: "user789",
    userName: "Rosa Santos",
    userEmail: "rosa@email.com",
    cartItems: [
      { id: 4, name: "Ginger Tea", price: 499, quantity: 3 },
    ],
    cartValue: 1497,
    abandonedAt: "2024-11-27T14:15:00",
    recoveryToken: "rec_def456uvw",
    recoveryDiscount: 15,
    status: "abandoned",
  },
  {
    id: "ac3",
    userId: "user321",
    userName: "Maria Gonzales",
    userEmail: "maria.g@email.com",
    cartItems: [
      { id: 2, name: "Peppermint Soap", price: 549, quantity: 2 },
      { id: 5, name: "Eucalyptus Oil", price: 899, quantity: 1 },
    ],
    cartValue: 2447,
    abandonedAt: "2024-11-26T10:45:00",
    recoveryToken: "rec_ghi789pqr",
    recoveryDiscount: 15,
    status: "recovered",
    recoveredAt: "2024-11-27T09:20:00",
  },
  {
    id: "ac4",
    userId: "user654",
    userName: "Pedro Santos",
    userEmail: "pedro@email.com",
    cartItems: [
      { id: 1, name: "Lavender Oil", price: 799, quantity: 1 },
      { id: 3, name: "Herbal Tea Mix", price: 599, quantity: 2 },
    ],
    cartValue: 1997,
    abandonedAt: "2024-11-25T16:00:00",
    recoveryToken: "rec_jkl012stu",
    recoveryDiscount: 10,
    status: "converted",
    recoveredAt: "2024-11-26T11:30:00",
    convertedAt: "2024-11-26T14:45:00",
  },
];

const ABANDON_TIMEOUT_MINUTES = 30; // Cart abandoned after 30 mins of inactivity

export function AbandonedCartProvider({ children }: { children: ReactNode }) {
  const [abandonedCarts, setAbandonedCarts] = useState<AbandonedCart[]>(INITIAL_ABANDONED_CARTS);
  const { cart: cartItems, getCartTotal } = useCart();
  const { user } = useAuth();

  const checkAbandonedCart = () => {
    if (!user || cartItems.length === 0) return;

    const lastActivityTime = localStorage.getItem("lastCartActivity");
    const now = Date.now();

    if (lastActivityTime) {
      const timeSinceActivity = (now - parseInt(lastActivityTime)) / (1000 * 60); // minutes

      if (timeSinceActivity > ABANDON_TIMEOUT_MINUTES) {
        // Mark cart as abandoned
        const existingCart = abandonedCarts.find(
          c => c.userId === user.id && c.status === "abandoned"
        );

        if (!existingCart && cartItems.length > 0) {
          const newAbandonedCart: AbandonedCart = {
            id: `ac${Date.now()}`,
            userId: user.id,
            userName: user.name,
            userEmail: user.email,
            cartItems,
            cartValue: getCartTotal(),
            abandonedAt: new Date().toISOString(),
            recoveryToken: `rec_${Math.random().toString(36).substring(2, 11)}`,
            recoveryDiscount: 10,
            status: "abandoned",
          };

          setAbandonedCarts([...abandonedCarts, newAbandonedCart]);
        }
      }
    }

    localStorage.setItem("lastCartActivity", now.toString());
  };

  const recoverCart = (token: string): boolean => {
    const cart = abandonedCarts.find(c => c.recoveryToken === token);
    if (cart) {
      setAbandonedCarts(
        abandonedCarts.map(c =>
          c.id === cart.id ? { ...c, status: "recovered", recoveredAt: new Date().toISOString() } : c
        )
      );
      return true;
    }
    return false;
  };

  const getAbandonedCartStats = () => {
    const totalAbandoned = abandonedCarts.filter(c => c.status === "abandoned").length;
    const recovered = abandonedCarts.filter(c => c.status === "recovered").length;
    const converted = abandonedCarts.filter(c => c.status === "converted").length;
    const totalValue = abandonedCarts.reduce((sum, c) => sum + c.cartValue, 0);
    const recoveryRate = totalAbandoned > 0 ? ((recovered + converted) / totalAbandoned) * 100 : 0;

    return {
      totalAbandoned,
      recovered,
      converted,
      totalValue,
      recoveryRate,
    };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      checkAbandonedCart();
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [cartItems, user]);

  return (
    <AbandonedCartContext.Provider
      value={{
        abandonedCarts,
        checkAbandonedCart,
        recoverCart,
        getAbandonedCartStats,
      }}
    >
      {children}
    </AbandonedCartContext.Provider>
  );
}

export function useAbandonedCart() {
  const context = React.useContext(AbandonedCartContext);
  if (context === undefined) {
    throw new Error("useAbandonedCart must be used within AbandonedCartProvider");
  }
  return context;
}
