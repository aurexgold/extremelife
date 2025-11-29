import ProductCard from "./ProductCard";
import { useFilter } from "@/context/FilterContext";

export default function ProductGrid() {
  const { filteredProducts } = useFilter();

  if (filteredProducts.length === 0) {
    return (
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-foreground mb-2">No products found</h2>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-foreground md:text-foreground">
              <span className="text-foreground">Browse</span> <span className="italic text-primary">Our Products</span>
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Quality herbal products available on Shopee & Lazada with nationwide delivery. Use filters to find what you need.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
