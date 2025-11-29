import React, { createContext, useState, ReactNode } from "react";

export interface Review {
  id: string;
  productId: number;
  author: string;
  email: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  helpful: number;
  images?: string[];
  isApproved?: boolean;
  isFlagged?: boolean;
}

interface ReviewsContextType {
  reviews: Review[];
  addReview: (review: Omit<Review, "id" | "date" | "isApproved" | "isFlagged">) => void;
  getProductReviews: (productId: number) => Review[];
  getAverageRating: (productId: number) => number;
  getReviewCount: (productId: number) => number;
  markHelpful: (reviewId: string) => void;
  approveReview: (reviewId: string) => void;
  rejectReview: (reviewId: string) => void;
  deleteReview: (reviewId: string) => void;
  getAllReviews: () => Review[];
}

export const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined);

const MOCK_REVIEWS: Review[] = [
  {
    id: "1",
    productId: 1,
    author: "Maria S.",
    email: "maria@email.com",
    rating: 5,
    title: "Amazing Detox Tea!",
    comment: "This tea really helped me feel energized. Great quality and fast shipping!",
    date: "2024-11-25",
    helpful: 12,
    isApproved: true,
    isFlagged: false,
  },
  {
    id: "2",
    productId: 1,
    author: "Juan D.",
    email: "juan@email.com",
    rating: 4,
    title: "Good taste, great results",
    comment: "Tastes good and I noticed positive effects after 2 weeks. Would recommend!",
    date: "2024-11-20",
    helpful: 8,
    isApproved: true,
    isFlagged: false,
  },
  {
    id: "3",
    productId: 2,
    author: "Rosa G.",
    email: "rosa@email.com",
    rating: 5,
    title: "Best Lavender Oil!",
    comment: "Pure quality. I use it every night and sleep so much better. Worth every peso!",
    date: "2024-11-18",
    helpful: 15,
    isApproved: true,
    isFlagged: false,
  },
  {
    id: "4",
    productId: 3,
    author: "Carlos R.",
    email: "carlos@email.com",
    rating: 4,
    title: "Strong immune booster",
    comment: "I've been taking this for a month and I feel healthier. Highly recommended.",
    date: "2024-11-15",
    helpful: 10,
    isApproved: true,
    isFlagged: false,
  },
];

export function ReviewsProvider({ children }: { children: ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("reviews");
      return saved ? JSON.parse(saved) : MOCK_REVIEWS;
    }
    return MOCK_REVIEWS;
  });

  const addReview = (newReview: Omit<Review, "id" | "date" | "isApproved" | "isFlagged">) => {
    const review: Review = {
      ...newReview,
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      isApproved: false,
      isFlagged: false,
    };
    const updated = [review, ...reviews];
    setReviews(updated);
    localStorage.setItem("reviews", JSON.stringify(updated));
  };

  const getProductReviews = (productId: number) => {
    return reviews.filter((r) => r.productId === productId && r.isApproved);
  };

  const getAllReviews = () => {
    return reviews;
  };

  const getAverageRating = (productId: number) => {
    const productReviews = getProductReviews(productId);
    if (productReviews.length === 0) return 0;
    const sum = productReviews.reduce((acc, r) => acc + r.rating, 0);
    return parseFloat((sum / productReviews.length).toFixed(1));
  };

  const getReviewCount = (productId: number) => {
    return getProductReviews(productId).length;
  };

  const markHelpful = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, helpful: r.helpful + 1 } : r))
    );
    localStorage.setItem("reviews", JSON.stringify(reviews));
  };

  const approveReview = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, isApproved: true, isFlagged: false } : r))
    );
    localStorage.setItem("reviews", JSON.stringify(reviews));
  };

  const rejectReview = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, isApproved: false } : r))
    );
    localStorage.setItem("reviews", JSON.stringify(reviews));
  };

  const deleteReview = (reviewId: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== reviewId));
    localStorage.setItem("reviews", JSON.stringify(reviews));
  };

  return (
    <ReviewsContext.Provider
      value={{
        reviews,
        addReview,
        getProductReviews,
        getAverageRating,
        getReviewCount,
        markHelpful,
        approveReview,
        rejectReview,
        deleteReview,
        getAllReviews,
      }}
    >
      {children}
    </ReviewsContext.Provider>
  );
}

export function useReviews() {
  const context = React.useContext(ReviewsContext);
  if (context === undefined) {
    throw new Error("useReviews must be used within ReviewsProvider");
  }
  return context;
}
