import { useReviews } from "@/context/ReviewsContext";
import { Star, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReviewsListProps {
  productId: number;
}

export default function ReviewsList({ productId }: ReviewsListProps) {
  const { getProductReviews, markHelpful } = useReviews();
  const reviews = getProductReviews(productId);

  if (reviews.length === 0) {
    return (
      <div className="text-center py-12 border border-border rounded-lg bg-muted/30">
        <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-lg">Customer Reviews ({reviews.length})</h3>
      {reviews.map((review) => (
        <div key={review.id} className="border border-border rounded-lg p-5 hover:bg-muted/30 transition">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h4 className="font-bold text-foreground">{review.title}</h4>
              <p className="text-sm text-muted-foreground">by {review.author} • {review.date}</p>
            </div>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          <p className="text-sm text-foreground mb-4">{review.comment}</p>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="gap-1 text-xs"
              onClick={() => markHelpful(review.id)}
            >
              <ThumbsUp className="h-3 w-3" />
              Helpful ({review.helpful})
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
