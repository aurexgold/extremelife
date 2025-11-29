import { useFilter } from "@/context/FilterContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";

export default function FilterPanel() {
  const {
    filters,
    setSelectedCategory,
    setPriceRange,
    setSortBy,
    resetFilters,
    categories,
    priceRange,
    filteredProducts,
  } = useFilter();

  const activeFilterCount = [
    filters.searchQuery ? 1 : 0,
    filters.selectedCategory ? 1 : 0,
    filters.priceRange[0] > priceRange.min || filters.priceRange[1] < priceRange.max ? 1 : 0,
    filters.sortBy !== "newest" ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Filters</CardTitle>
            {activeFilterCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                className="text-xs text-primary hover:bg-primary/10"
              >
                Reset ({activeFilterCount})
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Sort */}
          <div>
            <h3 className="font-bold text-sm mb-3">Sort By</h3>
            <div className="space-y-2">
              {(["newest", "price-low", "price-high", "rating"] as const).map((sort) => (
                <label key={sort} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="sort"
                    checked={filters.sortBy === sort}
                    onChange={() => setSortBy(sort)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">
                    {sort === "newest"
                      ? "Newest"
                      : sort === "price-low"
                        ? "Price: Low to High"
                        : sort === "price-high"
                          ? "Price: High to Low"
                          : "Highest Rated"}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold text-sm mb-3">Category</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  checked={!filters.selectedCategory}
                  onChange={() => setSelectedCategory(null)}
                  className="w-4 h-4"
                />
                <span className="text-sm">All Categories</span>
              </label>
              {categories.map((cat) => (
                <label key={cat} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    checked={filters.selectedCategory === cat}
                    onChange={() => setSelectedCategory(cat)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="font-bold text-sm mb-3">Price Range</h3>
            <div className="space-y-3">
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="text-xs text-muted-foreground mb-1 block">Min</label>
                  <input
                    type="number"
                    value={filters.priceRange[0]}
                    onChange={(e) =>
                      setPriceRange([parseInt(e.target.value), filters.priceRange[1]])
                    }
                    min={priceRange.min}
                    max={priceRange.max}
                    className="w-full px-2 py-1 border border-input rounded text-sm"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-muted-foreground mb-1 block">Max</label>
                  <input
                    type="number"
                    value={filters.priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([filters.priceRange[0], parseInt(e.target.value)])
                    }
                    min={priceRange.min}
                    max={priceRange.max}
                    className="w-full px-2 py-1 border border-input rounded text-sm"
                  />
                </div>
              </div>
              <input
                type="range"
                min={priceRange.min}
                max={priceRange.max}
                value={filters.priceRange[0]}
                onChange={(e) =>
                  setPriceRange([parseInt(e.target.value), filters.priceRange[1]])
                }
                className="w-full"
              />
              <input
                type="range"
                min={priceRange.min}
                max={priceRange.max}
                value={filters.priceRange[1]}
                onChange={(e) =>
                  setPriceRange([filters.priceRange[0], parseInt(e.target.value)])
                }
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                ₱{filters.priceRange[0].toLocaleString()} - ₱
                {filters.priceRange[1].toLocaleString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Info */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-4">
          <p className="text-sm text-foreground">
            <span className="font-bold">{filteredProducts.length}</span> product
            {filteredProducts.length !== 1 ? "s" : ""} found
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
