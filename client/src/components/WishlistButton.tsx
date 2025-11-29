import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/context/WishlistContext";
import { useState } from "react";

interface WishlistButtonProps {
  productId: number;
  productName: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  showText?: boolean;
}

export default function WishlistButton({
  productId,
  productName,
  variant = "outline",
  size = "default",
  showText = true,
}: WishlistButtonProps) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [isAdded, setIsAdded] = useState(isInWishlist(productId));

  const handleClick = () => {
    if (isAdded) {
      removeFromWishlist(productId);
      setIsAdded(false);
    } else {
      addToWishlist(productId);
      setIsAdded(true);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      className={`gap-2 transition-colors ${
        isAdded
          ? "border-red-500 text-red-500 hover:bg-red-50"
          : "border-border hover:border-red-500 hover:text-red-500"
      }`}
      title={isAdded ? `Remove "${productName}" from wishlist` : `Add "${productName}" to wishlist`}
    >
      <Heart className={`h-4 w-4 ${isAdded ? "fill-current" : ""}`} />
      {showText && (isAdded ? "Saved" : "Save")}
    </Button>
  );
}
