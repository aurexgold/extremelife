import React, { createContext, useState, ReactNode } from "react";

interface AdminContextType {
  isAuthenticated: boolean;
  adminName: string;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

export const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminName, setAdminName] = useState("");

  const login = (username: string, password: string) => {
    // Mock authentication - in real app, this would be backend
    if (username === "admin" && password === "extreme2024") {
      setIsAuthenticated(true);
      setAdminName(username);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAdminName("");
  };

  return (
    <AdminContext.Provider value={{ isAuthenticated, adminName, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = React.useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within AdminProvider");
  }
  return context;
}
