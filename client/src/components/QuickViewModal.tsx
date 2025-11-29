import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, X } from "lucide-react";
import ProductRating from "./ProductRating";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "sonner";

interface QuickViewModalProps {
  product: {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    category: string;
    image: string;
    description: string;
    stock?: number;
    rating?: number;
    reviews?: number;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const isInWishlist = wishlist.includes(product.id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    if (product.stock === 0) {
      toast.error("This product is out of stock");
      return;
    }
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    setIsAdded(true);
    toast.success(`${product.name} added to cart!`);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1500);
  };

  const handleWishlist = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id);
      toast.success("Removed from wishlist");
    } else {
      addToWishlist(product.id);
      toast.success("Added to wishlist!");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Quick View</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6">
          {/* Image */}
          <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            {discount > 0 && (
              <div className="absolute top-3 left-3 rounded bg-red-600 text-white px-2 py-1 text-sm font-bold">
                -{discount}%
              </div>
            )}
            {product.stock !== undefined && (
              <div
                className={`absolute bottom-3 left-3 rounded px-2 py-1 text-xs font-bold ${
                  product.stock === 0
                    ? "bg-red-600 text-white"
                    : product.stock < 10
                      ? "bg-orange-600 text-white"
                      : "bg-green-600 text-white"
                }`}
              >
                {product.stock === 0 ? "Out of Stock" : product.stock < 10 ? `${product.stock} left` : "In Stock"}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between">
            <div>
              <span className="inline-block bg-secondary/20 text-secondary-foreground px-2 py-1 rounded-full text-xs font-semibold mb-3">
                {product.category}
              </span>

              <h2 className="text-2xl font-bold font-serif mb-3">{product.name}</h2>

              {/* Rating */}
              <div className="mb-4">
                <ProductRating productId={product.id} showCount={true} />
              </div>

              {/* Price */}
              <div className="mb-4">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-primary">
                    ₱{product.price.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ₱{product.originalPrice.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{product.description}</p>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 gap-2 rounded-full"
              >
                <ShoppingCart className="h-4 w-4" />
                {isAdded ? "Added!" : "Add to Cart"}
              </Button>
              <Button
                onClick={handleWishlist}
                variant={isInWishlist ? "default" : "outline"}
                size="icon"
                className="rounded-full"
              >
                <Heart className={`h-4 w-4 ${isInWishlist ? "fill-current" : ""}`} />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
