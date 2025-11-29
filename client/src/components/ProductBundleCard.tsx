import { ProductBundle } from "@/context/ProductBundleContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, TrendingUp, Gift } from "lucide-react";

interface ProductBundleCardProps {
  bundle: ProductBundle;
  onAddToCart?: () => void;
}

export default function ProductBundleCard({ bundle, onAddToCart }: ProductBundleCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      <CardContent className="p-4 space-y-4 flex flex-col flex-1">
        {/* Header */}
        <div>
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-bold text-sm line-clamp-2">{bundle.name}</h3>
            <Badge className="bg-green-100 text-green-800 flex-shrink-0">
              Save ₱{bundle.savings}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">{bundle.description}</p>
        </div>

        {/* Products Grid */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">Includes:</p>
          <div className="grid grid-cols-1 gap-2">
            {bundle.products.map((product, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2 rounded bg-muted/50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-8 w-8 rounded object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium line-clamp-1">{product.name}</p>
                  <p className="text-xs text-muted-foreground">x{product.quantity}</p>
                </div>
                <p className="text-xs font-semibold flex-shrink-0">₱{product.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="border-t pt-3 space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Regular Price:</span>
            <span className="line-through text-muted-foreground">₱{bundle.regularPrice.toLocaleString('en-PH')}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold">Bundle Price:</span>
            <div className="text-right">
              <p className="text-lg font-bold text-green-600">₱{bundle.bundlePrice.toLocaleString('en-PH')}</p>
              <p className="text-xs text-green-600 font-medium">{bundle.discount}% OFF</p>
            </div>
          </div>
        </div>

        {/* Popularity & Action */}
        <div className="space-y-3 pt-2 flex-1 flex flex-col justify-end">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 text-orange-600">
              <TrendingUp className="h-3 w-3" />
              {bundle.popularity}% popular
            </div>
          </div>
          <Button
            className="w-full gap-2"
            onClick={onAddToCart}
            data-testid={`button-add-bundle-${bundle.id}`}
          >
            <ShoppingCart className="h-4 w-4" />
            Add Bundle to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
