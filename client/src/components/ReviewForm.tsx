import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useReviews } from "@/context/ReviewsContext";
import { Star, Send } from "lucide-react";

interface ReviewFormProps {
  productId: number;
  onSubmit?: () => void;
}

export default function ReviewForm({ productId, onSubmit }: ReviewFormProps) {
  const { addReview } = useReviews();
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [author, setAuthor] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      });

      // Reset form
      setRating(5);
      setTitle("");
      setComment("");
      setAuthor("");
      setEmail("");
      setIsSubmitting(false);
      onSubmit?.();
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="border border-border rounded-lg p-6 bg-card">
      <h3 className="font-bold text-lg mb-4">Share Your Experience</h3>

      {/* Rating */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Rating</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(star)}
              className="transition-transform hover:scale-110"
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
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Your Name *</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter your name"
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Email *</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="your@email.com"
        />
      </div>

      {/* Title */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Review Title *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="e.g., Amazing product!"
        />
      </div>

      {/* Comment */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Your Review *</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          rows={4}
          className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Share your experience with this product..."
        />
      </div>

      <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
        <Send className="h-4 w-4" />
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
}
