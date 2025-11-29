import ProductCard from "./ProductCard";
import { products } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function ProductGrid() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-foreground md:text-foreground">
              <span className="text-foreground">Best Selling</span> <span className="italic text-primary">Essentials</span>
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Hand-picked favorites loved by our community for their purity and effectiveness.
            </p>
          </div>
          <Button variant="ghost" className="gap-2 text-primary hover:text-primary/80">
            View All Products <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
