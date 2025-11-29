import React, { createContext, useState, ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  loyaltyTier: "bronze" | "silver" | "gold" | "platinum";
  loyaltyPoints: number;
  createdAt: string;
}

interface UserContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  getLoyaltyDiscount: () => number;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

// Mock current user - in real app, this would come from auth
const MOCK_USER: User = {
  id: "user123",
  name: "Maria Santos",
  email: "maria@email.com",
  loyaltyTier: "gold",
  loyaltyPoints: 2340,
  createdAt: "2024-06-15",
};

export function UserProvider({ children }: { children: ReactNode }) {
  const [currentUser] = useState<User | null>(MOCK_USER);

  const getLoyaltyDiscount = () => {
    if (!currentUser) return 0;
    const discounts: Record<string, number> = {
      bronze: 0.02,
      silver: 0.05,
      gold: 0.1,
      platinum: 0.15,
    };
    return discounts[currentUser.loyaltyTier] || 0;
  };

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser: () => {}, getLoyaltyDiscount }}>
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
