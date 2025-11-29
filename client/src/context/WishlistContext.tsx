import React, { createContext, useState, ReactNode } from "react";

interface WishlistContextType {
  wishlist: number[];
  addToWishlist: (productId: number) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  clearWishlist: () => void;
}

export const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<number[]>(() => {
    // Load from localStorage on init
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("wishlist");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const addToWishlist = (productId: number) => {
    setWishlist((prev) => {
      if (!prev.includes(productId)) {
        const updated = [...prev, productId];
        localStorage.setItem("wishlist", JSON.stringify(updated));
        return updated;
      }
      return prev;
    });
  };

  const removeFromWishlist = (productId: number) => {
    setWishlist((prev) => {
      const updated = prev.filter((id) => id !== productId);
      localStorage.setItem("wishlist", JSON.stringify(updated));
      return updated;
    });
  };

  const isInWishlist = (productId: number) => {
    return wishlist.includes(productId);
  };

  const clearWishlist = () => {
    setWishlist([]);
    localStorage.removeItem("wishlist");
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = React.useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }
  return context;
}
