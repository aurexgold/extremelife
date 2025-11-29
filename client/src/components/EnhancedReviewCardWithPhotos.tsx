import { Review } from "@/context/ReviewsContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import StarRating from "@/components/StarRating";
import { ThumbsUp, ShieldCheck, ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";

interface EnhancedReviewCardWithPhotosProps {
  review: Review;
  isVerified?: boolean;
  onMarkHelpful?: () => void;
}

export default function EnhancedReviewCardWithPhotos({
  review,
  isVerified = false,
  onMarkHelpful,
}: EnhancedReviewCardWithPhotosProps) {
  const [isHelpful, setIsHelpful] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

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

  const hasPhotos = review.images && review.images.length > 0;

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
          <h4 className="font-semibold text-sm mb-2" data-testid={`text-review-title-${review.id}`}>
            {review.title}
          </h4>
          <p className="text-sm text-foreground/80 leading-relaxed" data-testid={`text-review-comment-${review.id}`}>
            {review.comment}
          </p>
        </div>

        {/* Photo Gallery */}
        {hasPhotos && (
          <div className="space-y-3">
            <div className="relative group">
              <img
                src={review.images![photoIndex]}
                alt={`Review photo ${photoIndex + 1}`}
                className="w-full h-64 object-cover rounded-lg border border-border bg-muted"
                data-testid={`img-review-photo-${photoIndex}`}
              />
              {review.images!.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setPhotoIndex(
                        photoIndex === 0 ? review.images!.length - 1 : photoIndex - 1
                      )
                    }
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    data-testid="button-prev-photo"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() =>
                      setPhotoIndex(
                        photoIndex === review.images!.length - 1 ? 0 : photoIndex + 1
                      )
                    }
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    data-testid="button-next-photo"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {review.images!.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setPhotoIndex(idx)}
                  className={`flex-shrink-0 w-12 h-12 rounded border-2 transition-colors ${
                    photoIndex === idx ? "border-primary" : "border-border"
                  }`}
                  data-testid={`button-thumb-${idx}`}
                >
                  <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover rounded" />
                </button>
              ))}
            </div>

            <p className="text-xs text-muted-foreground">
              Photo {photoIndex + 1} of {review.images!.length}
            </p>
          </div>
        )}

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
