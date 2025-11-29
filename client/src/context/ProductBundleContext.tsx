import React, { createContext, useState, ReactNode } from "react";

export interface ProductBundle {
  id: string;
  name: string;
  description: string;
  products: {
    productId: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  regularPrice: number;
  bundlePrice: number;
  discount: number;
  savings: number;
  popularity: number;
  category: "frequently_bought" | "value_pack" | "wellness_combo" | "starter_kit";
  isActive: boolean;
  createdAt: string;
}

interface ProductBundleContextType {
  bundles: ProductBundle[];
  addBundle: (bundle: ProductBundle) => void;
  updateBundle: (id: string, bundle: Partial<ProductBundle>) => void;
  deleteBundle: (id: string) => void;
  getBundlesByCategory: (category: string) => ProductBundle[];
  getPopularBundles: (limit: number) => ProductBundle[];
  getBundleSavings: (id: string) => number;
}

export const ProductBundleContext = createContext<ProductBundleContextType | undefined>(undefined);

const INITIAL_BUNDLES: ProductBundle[] = [
  {
    id: "bundle_001",
    name: "Ultimate Wellness Starter Kit",
    description: "Perfect for beginners. Everything you need to start your wellness journey.",
    products: [
      { productId: 1, name: "Lavender Oil", price: 799, quantity: 1, image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=200" },
      { productId: 2, name: "Peppermint Soap", price: 549, quantity: 2, image: "https://images.unsplash.com/photo-1600857062241-98e5dba7214f?w=200" },
      { productId: 3, name: "Herbal Tea Mix", price: 599, quantity: 1, image: "https://images.unsplash.com/photo-1597318972592-f050c5c8c1ba?w=200" },
    ],
    regularPrice: 2546,
    bundlePrice: 1999,
    discount: 22,
    savings: 547,
    popularity: 94,
    category: "starter_kit",
    isActive: true,
    createdAt: "2024-10-15T08:00:00"
  },
  {
    id: "bundle_002",
    name: "Aromatherapy Bliss Bundle",
    description: "Complete aromatherapy collection with our best-selling essential oils.",
    products: [
      { productId: 1, name: "Lavender Oil", price: 799, quantity: 1, image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=200" },
      { productId: 5, name: "Eucalyptus Oil", price: 899, quantity: 1, image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=200" },
      { productId: 4, name: "Ginger Tea", price: 499, quantity: 2, image: "https://images.unsplash.com/photo-1597318972592-f050c5c8c1ba?w=200" },
    ],
    regularPrice: 3196,
    bundlePrice: 2299,
    discount: 28,
    savings: 897,
    popularity: 87,
    category: "wellness_combo",
    isActive: true,
    createdAt: "2024-10-18T10:30:00"
  },
  {
    id: "bundle_003",
    name: "Frequently Bought Together",
    description: "Top 3 best-sellers in one amazing package.",
    products: [
      { productId: 1, name: "Lavender Oil", price: 799, quantity: 1, image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=200" },
      { productId: 2, name: "Peppermint Soap", price: 549, quantity: 1, image: "https://images.unsplash.com/photo-1600857062241-98e5dba7214f?w=200" },
      { productId: 5, name: "Eucalyptus Oil", price: 899, quantity: 1, image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=200" },
    ],
    regularPrice: 2247,
    bundlePrice: 1799,
    discount: 20,
    savings: 448,
    popularity: 92,
    category: "frequently_bought",
    isActive: true,
    createdAt: "2024-10-20T14:15:00"
  },
  {
    id: "bundle_004",
    name: "Luxury Herbal Collection",
    description: "Premium selection for the discerning wellness enthusiast.",
    products: [
      { productId: 5, name: "Eucalyptus Oil", price: 899, quantity: 1, image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=200" },
      { productId: 3, name: "Herbal Tea Mix", price: 599, quantity: 2, image: "https://images.unsplash.com/photo-1597318972592-f050c5c8c1ba?w=200" },
      { productId: 2, name: "Peppermint Soap", price: 549, quantity: 3, image: "https://images.unsplash.com/photo-1600857062241-98e5dba7214f?w=200" },
    ],
    regularPrice: 4295,
    bundlePrice: 2999,
    discount: 30,
    savings: 1296,
    popularity: 78,
    category: "value_pack",
    isActive: true,
    createdAt: "2024-10-22T09:45:00"
  },
  {
    id: "bundle_005",
    name: "Daily Essentials Combo",
    description: "Everything for your daily wellness routine.",
    products: [
      { productId: 2, name: "Peppermint Soap", price: 549, quantity: 2, image: "https://images.unsplash.com/photo-1600857062241-98e5dba7214f?w=200" },
      { productId: 4, name: "Ginger Tea", price: 499, quantity: 1, image: "https://images.unsplash.com/photo-1597318972592-f050c5c8c1ba?w=200" },
    ],
    regularPrice: 1547,
    bundlePrice: 1149,
    discount: 26,
    savings: 398,
    popularity: 85,
    category: "frequently_bought",
    isActive: true,
    createdAt: "2024-10-25T11:20:00"
  }
];

export function ProductBundleProvider({ children }: { children: ReactNode }) {
  const [bundles, setBundles] = useState<ProductBundle[]>(INITIAL_BUNDLES);

  const addBundle = (bundle: ProductBundle) => {
    setBundles([...bundles, bundle]);
  };

  const updateBundle = (id: string, updates: Partial<ProductBundle>) => {
    setBundles(
      bundles.map(b => (b.id === id ? { ...b, ...updates } : b))
    );
  };

  const deleteBundle = (id: string) => {
    setBundles(bundles.filter(b => b.id !== id));
  };

  const getBundlesByCategory = (category: string) => {
    return bundles.filter(b => b.category === category && b.isActive);
  };

  const getPopularBundles = (limit: number) => {
    return bundles
      .filter(b => b.isActive)
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, limit);
  };

  const getBundleSavings = (id: string) => {
    const bundle = bundles.find(b => b.id === id);
    return bundle ? bundle.savings : 0;
  };

  return (
    <ProductBundleContext.Provider
      value={{
        bundles,
        addBundle,
        updateBundle,
        deleteBundle,
        getBundlesByCategory,
        getPopularBundles,
        getBundleSavings,
      }}
    >
      {children}
    </ProductBundleContext.Provider>
  );
}

export function useProductBundle() {
  const context = React.useContext(ProductBundleContext);
  if (context === undefined) {
    throw new Error("useProductBundle must be used within ProductBundleProvider");
  }
  return context;
}
