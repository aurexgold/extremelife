import React, { createContext, useState, ReactNode } from "react";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  loyaltyTier: "bronze" | "silver" | "gold" | "platinum";
  loyaltyPoints: number;
  createdAt: string;
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
      loyaltyTier: "gold",
      loyaltyPoints: 2340,
      createdAt: "2024-06-15",
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
      loyaltyTier: "bronze",
      loyaltyPoints: 0,
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
