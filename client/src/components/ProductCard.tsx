import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, Badge } from "lucide-react";
import WishlistButton from "./WishlistButton";

interface ProductProps {
  product: {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    category: string;
    image: string;
    description: string;
    shopee?: boolean;
    lazada?: boolean;
    fcf?: boolean;
  };
}

export default function ProductCard({ product }: ProductProps) {
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

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
        {discount > 0 && (
          <div className="absolute top-3 left-3 rounded bg-red-600 text-white px-2 py-1 text-xs font-bold shadow-sm">
            -{discount}%
          </div>
        )}
      </div>
      <CardContent className="p-5">
        <div className="flex items-center gap-1 text-yellow-500 mb-2">
          <Star className="h-3.5 w-3.5 fill-current" />
          <Star className="h-3.5 w-3.5 fill-current" />
          <Star className="h-3.5 w-3.5 fill-current" />
          <Star className="h-3.5 w-3.5 fill-current" />
          <Star className="h-3.5 w-3.5 fill-current" />
          <span className="text-xs text-muted-foreground ml-1">(124)</span>
        </div>
        <h3 className="font-serif text-lg font-bold leading-tight text-foreground mb-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {product.description}
        </p>
        
        {/* Price Section */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-2xl font-bold text-primary">
              ₱{product.price.toLocaleString('en-PH', {minimumFractionDigits: 2})}
            </span>
            {product.originalPrice && (
              <span className="ml-2 text-sm text-muted-foreground line-through">
                ₱{product.originalPrice.toLocaleString('en-PH', {minimumFractionDigits: 2})}
              </span>
            )}
          </div>
        </div>

        {/* Platform Badges */}
        <div className="flex gap-1 mb-4 flex-wrap">
          {product.shopee && (
            <span className="inline-flex items-center rounded-full bg-orange-100 text-orange-800 px-2 py-0.5 text-xs font-semibold">
              Shopee
            </span>
          )}
          {product.lazada && (
            <span className="inline-flex items-center rounded-full bg-blue-100 text-blue-800 px-2 py-0.5 text-xs font-semibold">
              Lazada
            </span>
          )}
          {product.fcf && (
            <span className="inline-flex items-center rounded-full bg-purple-100 text-purple-800 px-2 py-0.5 text-xs font-semibold">
              Flash Sale
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-5 pt-0 gap-2">
        <Button className="flex-1 rounded-full gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors" variant="outline">
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
        <WishlistButton productId={product.id} productName={product.name} size="default" showText={false} />
      </CardFooter>
    </Card>
  );
}
