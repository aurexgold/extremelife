import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useReviews } from "@/context/ReviewsContext";
import { Star, Send, Upload, X } from "lucide-react";
import { toast } from "sonner";

interface EnhancedReviewFormProps {
  productId: number;
  onSubmit?: () => void;
}

export default function EnhancedReviewForm({ productId, onSubmit }: EnhancedReviewFormProps) {
  const { addReview } = useReviews();
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [author, setAuthor] = useState("");
  const [email, setEmail] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (images.length >= 5) {
        toast.error("Maximum 5 images allowed");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setImages((prev) => [...prev, base64]);
        toast.success("Image added");
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!author.trim() || !email.trim() || !title.trim() || !comment.trim()) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      addReview({
        productId,
        author,
        email,
        rating,
        title,
        comment,
        helpful: 0,
        images: images.length > 0 ? images : undefined,
      });

      // Reset form
      setRating(5);
      setTitle("");
      setComment("");
      setAuthor("");
      setEmail("");
      setImages([]);
      setIsSubmitting(false);
      toast.success("Review submitted for approval!");
      onSubmit?.();
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="border border-border rounded-lg p-6 bg-card space-y-6">
      <h3 className="font-bold text-lg">Share Your Experience</h3>

      {/* Rating */}
      <div>
        <label className="block text-sm font-medium mb-2">Rating *</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(star)}
              className="transition-transform hover:scale-110"
              data-testid={`button-star-${star}`}
            >
              <Star
                className={`h-8 w-8 ${
                  star <= (hoverRating || rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Author Name */}
      <div>
        <label className="block text-sm font-medium mb-1">Your Name *</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter your name"
          data-testid="input-author"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium mb-1">Email *</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="your@email.com"
          data-testid="input-email"
        />
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium mb-1">Review Title *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="e.g., Amazing product!"
          data-testid="input-title"
        />
      </div>

      {/* Comment */}
      <div>
        <label className="block text-sm font-medium mb-1">Your Review *</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          rows={4}
          className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Share your experience with this product..."
          data-testid="textarea-comment"
        />
      </div>

      {/* Photo Upload */}
      <div>
        <label className="block text-sm font-medium mb-2">Add Photos (Optional)</label>
        <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary/50 transition-colors">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            disabled={images.length >= 5}
            className="hidden"
            id="photo-upload"
            data-testid="input-photos"
          />
          <label htmlFor="photo-upload" className="cursor-pointer flex flex-col items-center gap-2">
            <Upload className="h-6 w-6 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Click to upload photos (Max 5, up to 5MB each)
            </span>
          </label>
        </div>

        {/* Photo Preview */}
        {images.length > 0 && (
          <div className="grid grid-cols-5 gap-2 mt-3">
            {images.map((img, idx) => (
              <div key={idx} className="relative group">
                <img
                  src={img}
                  alt={`Preview ${idx + 1}`}
                  className="w-full h-16 object-cover rounded border border-border"
                  data-testid={`img-preview-${idx}`}
                />
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  data-testid={`button-remove-photo-${idx}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
        <p className="text-xs text-muted-foreground mt-2">{images.length}/5 photos uploaded</p>
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full gap-2" disabled={isSubmitting} data-testid="button-submit-review">
        <Send className="h-4 w-4" />
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </Button>
      
      <p className="text-xs text-muted-foreground">
        ℹ️ Your review will be approved by our team before appearing on the product page
      </p>
    </form>
  );
}
