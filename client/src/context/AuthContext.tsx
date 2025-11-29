import React, { createContext, useState, ReactNode } from "react";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "customer" | "streamer" | "admin";
  loyaltyTier: "bronze" | "silver" | "gold" | "platinum";
  loyaltyPoints: number;
  userGroupId: string;
  createdAt: string;
  streamerStats?: {
    totalEarnings: number;
    totalSales: number;
    commissionRate: number;
  };
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  register: (email: string, password: string, name: string, phone: string) => boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user database
const MOCK_USERS: Record<string, { password: string; user: AuthUser }> = {
  "maria@email.com": {
    password: "demo2024",
    user: {
      id: "user123",
      name: "Maria Santos",
      email: "maria@email.com",
      phone: "09123456789",
      role: "customer",
      loyaltyTier: "gold",
      loyaltyPoints: 2340,
      userGroupId: "group3",
      createdAt: "2024-06-15",
    },
  },
  "sarah.streamer@email.com": {
    password: "demo2024",
    user: {
      id: "streamer001",
      name: "Sarah Wellness Expert",
      email: "sarah.streamer@email.com",
      phone: "09198765432",
      role: "streamer",
      loyaltyTier: "platinum",
      loyaltyPoints: 5000,
      userGroupId: "group5",
      createdAt: "2024-01-15",
      streamerStats: {
        totalEarnings: 28500,
        totalSales: 285000,
        commissionRate: 10,
      },
    },
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("currentUser");
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  });

  const login = (email: string, password: string): boolean => {
    const userData = MOCK_USERS[email];
    if (userData && userData.password === password) {
      setUser(userData.user);
      localStorage.setItem("currentUser", JSON.stringify(userData.user));
      return true;
    }
    return false;
  };

  const register = (email: string, password: string, name: string, phone: string): boolean => {
    // Check if user already exists
    if (MOCK_USERS[email]) {
      return false;
    }

    // Create new user
    const newUser: AuthUser = {
      id: `user${Date.now()}`,
      name,
      email,
      phone,
      role: "customer",
      loyaltyTier: "bronze",
      loyaltyPoints: 0,
      userGroupId: "group1",
      createdAt: new Date().toISOString().split("T")[0],
    };

    MOCK_USERS[email] = { password, user: newUser };
    setUser(newUser);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
