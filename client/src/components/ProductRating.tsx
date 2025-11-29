import { Star } from "lucide-react";
import { useReviews } from "@/context/ReviewsContext";

interface ProductRatingProps {
  productId: number;
  showCount?: boolean;
}

export default function ProductRating({ productId, showCount = true }: ProductRatingProps) {
  const { getAverageRating, getReviewCount } = useReviews();
  const rating = getAverageRating(productId);
  const count = getReviewCount(productId);

  if (rating === 0) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">No reviews yet</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < Math.round(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
      <span className="text-sm font-semibold">{rating.toFixed(1)}</span>
      {showCount && <span className="text-xs text-muted-foreground">({count})</span>}
    </div>
  );
}
