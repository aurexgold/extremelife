import { Review } from "@/context/ReviewsContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import StarRating from "@/components/StarRating";
import { ThumbsUp, ShieldCheck } from "lucide-react";
import { useState } from "react";

interface EnhancedReviewCardProps {
  review: Review;
  isVerified?: boolean;
  onMarkHelpful?: () => void;
}

export default function EnhancedReviewCard({ review, isVerified = false, onMarkHelpful }: EnhancedReviewCardProps) {
  const [isHelpful, setIsHelpful] = useState(false);

  const handleHelpful = () => {
    if (!isHelpful) {
      setIsHelpful(true);
      onMarkHelpful?.();
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-PH", { year: "numeric", month: "short", day: "numeric" });
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-foreground">{review.author}</h3>
              {isVerified && (
                <Badge className="gap-1 bg-green-100 text-green-800">
                  <ShieldCheck className="h-3 w-3" />
                  Verified
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{formatDate(review.date)}</p>
          </div>
          <StarRating rating={review.rating} size="sm" />
        </div>

        {/* Title & Comment */}
        <div>
          <h4 className="font-semibold text-sm mb-2" data-testid={`text-review-title-${review.id}`}>{review.title}</h4>
          <p className="text-sm text-foreground/80 leading-relaxed" data-testid={`text-review-comment-${review.id}`}>{review.comment}</p>
        </div>

        {/* Helpful Counter */}
        <div className="flex items-center gap-2 pt-2 border-t">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2"
            onClick={handleHelpful}
            disabled={isHelpful}
            data-testid={`button-helpful-${review.id}`}
          >
            <ThumbsUp className={`h-4 w-4 ${isHelpful ? "fill-current" : ""}`} />
            <span className="text-xs">{review.helpful + (isHelpful ? 1 : 0)} helpful</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
