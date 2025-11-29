import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";

interface ProductProps {
  product: {
    id: number;
    name: string;
    price: number;
    category: string;
    image: string;
    description: string;
  };
}

export default function ProductCard({ product }: ProductProps) {
  return (
    <Card className="group overflow-hidden border-border/60 bg-card transition-all hover:shadow-lg hover:-translate-y-1">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 rounded-full bg-background/80 backdrop-blur px-2 py-1 text-xs font-bold text-primary shadow-sm">
          {product.category}
        </div>
      </div>
      <CardContent className="p-5">
        <div className="flex items-center gap-1 text-yellow-500 mb-2">
          <Star className="h-3.5 w-3.5 fill-current" />
          <Star className="h-3.5 w-3.5 fill-current" />
          <Star className="h-3.5 w-3.5 fill-current" />
          <Star className="h-3.5 w-3.5 fill-current" />
          <Star className="h-3.5 w-3.5 fill-current" />
          <span className="text-xs text-muted-foreground ml-1">(24)</span>
        </div>
        <h3 className="font-serif text-lg font-bold leading-tight text-foreground mb-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-5 pt-0">
        <Button className="w-full rounded-full gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors" variant="outline">
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
