import { useReviews } from "@/context/ReviewsContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EnhancedReviewCard from "@/components/EnhancedReviewCard";
import StarRating from "@/components/StarRating";
import { MessageSquare, Filter } from "lucide-react";
import { useState } from "react";

interface ProductReviewsSectionProps {
  productId: number;
}

export default function ProductReviewsSection({ productId }: ProductReviewsSectionProps) {
  const { getProductReviews, getAverageRating, getReviewCount, markHelpful } = useReviews();
  const [filterRating, setFilterRating] = useState<number | null>(null);

  const reviews = getProductReviews(productId);
  const filteredReviews = filterRating 
    ? reviews.filter(r => r.rating === filterRating)
    : reviews;
  
  const avgRating = getAverageRating(productId);
  const reviewCount = getReviewCount(productId);

  // Rating distribution
  const ratingCounts = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: reviewCount > 0 ? (reviews.filter(r => r.rating === rating).length / reviewCount) * 100 : 0
  }));

  if (reviewCount === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Customer Reviews
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Overall Rating */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-6 border-b">
            <div className="flex flex-col items-center justify-center">
              <div className="text-4xl font-bold text-foreground mb-2">{avgRating}</div>
              <StarRating rating={avgRating} size="lg" />
              <p className="text-sm text-muted-foreground mt-2">{reviewCount} reviews</p>
            </div>

            {/* Rating Distribution */}
            <div className="md:col-span-2 space-y-3">
              {ratingCounts.map(({ rating, count, percentage }) => (
                <div key={rating} className="flex items-center gap-3">
                  <Button
                    variant={filterRating === rating ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setFilterRating(filterRating === rating ? null : rating)}
                    className="gap-1"
                    data-testid={`button-filter-rating-${rating}`}
                  >
                    <span className="text-xs">{rating} ★</span>
                  </Button>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-8 text-right">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Active Filter Info */}
          {filterRating && (
            <div className="flex items-center justify-between py-3 px-3 bg-muted rounded">
              <span className="text-sm font-medium">
                Showing {filteredReviews.length} {filterRating}-star review{filteredReviews.length !== 1 ? 's' : ''}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFilterRating(null)}
                data-testid="button-clear-filter"
              >
                Clear filter
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Reviews ({filteredReviews.length})
        </h3>
        
        {filteredReviews.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">No {filterRating}-star reviews found</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {filteredReviews.map(review => (
              <EnhancedReviewCard
                key={review.id}
                review={review}
                isVerified={true}
                onMarkHelpful={() => markHelpful(review.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
