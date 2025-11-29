import { useEffect, useState } from "react";
import { products } from "@/lib/data";
import ProductCard from "./ProductCard";
import { Card, CardContent } from "@/components/ui/card";

export default function RecentlyViewed() {
  const [viewedIds, setViewedIds] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("recentlyViewed");
    if (saved) {
      setViewedIds(JSON.parse(saved).slice(0, 6));
    }
  }, []);

  const viewedProducts = viewedIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  if (viewedProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-3xl font-bold font-serif mb-8 text-foreground">Recently Viewed</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {viewedProducts.map((product) => (
            <ProductCard key={product?.id} product={product!} />
          ))}
        </div>
      </div>
    </section>
  );
}
