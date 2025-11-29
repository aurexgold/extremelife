import React, { createContext, useState, useMemo, ReactNode } from "react";
import { products } from "@/lib/data";

export interface FilterState {
  searchQuery: string;
  selectedCategory: string | null;
  priceRange: [number, number];
  sortBy: "newest" | "price-low" | "price-high" | "rating";
}

interface FilterContextType {
  filters: FilterState;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string | null) => void;
  setPriceRange: (range: [number, number]) => void;
  setSortBy: (sort: "newest" | "price-low" | "price-high" | "rating") => void;
  resetFilters: () => void;
  filteredProducts: typeof products;
  categories: string[];
  priceRange: { min: number; max: number };
  searchSuggestions: string[];
}

export const FilterContext = createContext<FilterContextType | undefined>(undefined);

const INITIAL_FILTERS: FilterState = {
  searchQuery: "",
  selectedCategory: null,
  priceRange: [0, 10000],
  sortBy: "newest",
};

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);

  const categories = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.category))).sort();
  }, []);

  const priceRange = useMemo(() => {
    const prices = products.map((p) => p.price);
    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices)),
    };
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (filters.selectedCategory) {
      result = result.filter((p) => p.category === filters.selectedCategory);
    }

    // Price filter
    result = result.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Sort
    if (filters.sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === "rating") {
      // In a real app, would use actual ratings from ReviewsContext
      result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [filters]);

  const searchSuggestions = useMemo(() => {
    if (!filters.searchQuery || filters.searchQuery.length < 2) return [];
    const query = filters.searchQuery.toLowerCase();
    const suggestions = new Set<string>();

    products.forEach((p) => {
      if (p.name.toLowerCase().includes(query)) {
        suggestions.add(p.name);
      }
      if (p.category.toLowerCase().includes(query)) {
        suggestions.add(p.category);
      }
    });

    return Array.from(suggestions).slice(0, 5);
  }, [filters.searchQuery]);

  const setSearchQuery = (query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  };

  const setSelectedCategory = (category: string | null) => {
    setFilters((prev) => ({ ...prev, selectedCategory: category }));
  };

  const setPriceRange = (range: [number, number]) => {
    setFilters((prev) => ({ ...prev, priceRange: range }));
  };

  const setSortBy = (sort: "newest" | "price-low" | "price-high" | "rating") => {
    setFilters((prev) => ({ ...prev, sortBy: sort }));
  };

  const resetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  return (
    <FilterContext.Provider
      value={{
        filters,
        setSearchQuery,
        setSelectedCategory,
        setPriceRange,
        setSortBy,
        resetFilters,
        filteredProducts,
        categories,
        priceRange,
        searchSuggestions,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const context = React.useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilter must be used within FilterProvider");
  }
  return context;
}
