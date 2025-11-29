import React, { createContext, ReactNode } from "react";
import { useAuth } from "./AuthContext";

interface UserContextType {
  getCurrentUser: () => any | null;
  getLoyaltyDiscount: () => number;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  const getCurrentUser = () => user;

  const getLoyaltyDiscount = () => {
    if (!user) return 0;
    const discounts: Record<string, number> = {
      bronze: 0.02,
      silver: 0.05,
      gold: 0.1,
      platinum: 0.15,
    };
    return discounts[user.loyaltyTier] || 0;
  };

  return (
    <UserContext.Provider value={{ getCurrentUser, getLoyaltyDiscount }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
}
