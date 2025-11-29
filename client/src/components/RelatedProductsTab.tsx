import { products } from "@/lib/data";
import ProductCard from "./ProductCard";
import { Card, CardContent } from "@/components/ui/card";

interface RelatedProductsTabProps {
  currentProductId: number;
  category: string;
}

export default function RelatedProductsTab({ currentProductId, category }: RelatedProductsTabProps) {
  const relatedProducts = products
    .filter((p) => p.category === category && p.id !== currentProductId)
    .slice(0, 3);

  if (relatedProducts.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">No related products available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {relatedProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
