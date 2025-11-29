import { useState } from "react";
import { useReviews } from "@/context/ReviewsContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import StarRating from "@/components/StarRating";
import { MessageSquare, Check, X, Trash2, AlertCircle, ChevronRight } from "lucide-react";

export default function AdminReviews() {
  const { getAllReviews, approveReview, rejectReview, deleteReview } = useReviews();
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedReview, setExpandedReview] = useState<string | null>(null);

  const allReviews = getAllReviews();
  const pendingReviews = allReviews.filter(r => !r.isApproved);
  const approvedReviews = allReviews.filter(r => r.isApproved && !r.isFlagged);
  const flaggedReviews = allReviews.filter(r => r.isFlagged);

  const filteredReviews = (reviews: typeof allReviews) => {
    return reviews.filter(r =>
      r.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.comment.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const ReviewRow = ({ review }: { review: any }) => (
    <div className="space-y-2">
      <div
        className="flex items-center justify-between p-3 border rounded hover:bg-muted/50 cursor-pointer transition-colors"
        onClick={() => setExpandedReview(expandedReview === review.id ? null : review.id)}
        data-testid={`row-review-${review.id}`}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-sm truncate">{review.title}</h4>
            <StarRating rating={review.rating} size="sm" />
          </div>
          <p className="text-xs text-muted-foreground">
            {review.author} • {review.date}
          </p>
        </div>
        <ChevronRight
          className={`h-4 w-4 text-muted-foreground transition-transform ${
            expandedReview === review.id ? "rotate-90" : ""
          }`}
        />
      </div>

      {/* Expanded View */}
      {expandedReview === review.id && (
        <Card className="bg-muted/30 border-l-4 border-blue-500">
          <CardContent className="p-4 space-y-4">
            {/* Review Details */}
            <div>
              <p className="text-sm text-foreground/80 mb-2">{review.comment}</p>
              <p className="text-xs text-muted-foreground">Email: {review.email}</p>
            </div>

            {/* Photos */}
            {review.images && review.images.length > 0 && (
              <div>
                <p className="text-xs font-medium mb-2">Photos ({review.images.length})</p>
                <div className="grid grid-cols-6 gap-2">
                  {review.images.map((img: string, idx: number) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Review photo ${idx + 1}`}
                      className="w-full h-16 object-cover rounded border border-border"
                      data-testid={`img-admin-review-${review.id}-${idx}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2 pt-4 border-t">
              {!review.isApproved && (
                <>
                  <Button
                    size="sm"
                    className="gap-1 bg-green-600 hover:bg-green-700"
                    onClick={() => approveReview(review.id)}
                    data-testid={`button-approve-${review.id}`}
                  >
                    <Check className="h-3 w-3" />
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-1"
                    onClick={() => rejectReview(review.id)}
                    data-testid={`button-reject-${review.id}`}
                  >
                    <X className="h-3 w-3" />
                    Reject
                  </Button>
                </>
              )}
              <Button
                size="sm"
                variant="destructive"
                className="gap-1 ml-auto"
                onClick={() => deleteReview(review.id)}
                data-testid={`button-delete-${review.id}`}
              >
                <Trash2 className="h-3 w-3" />
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background">
        <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Review Moderation</h1>
            <p className="text-sm text-muted-foreground">Manage customer reviews and photos</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Review</p>
                  <p className="text-3xl font-bold mt-2 text-orange-600">{pendingReviews.length}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-orange-600 opacity-30" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Approved</p>
                  <p className="text-3xl font-bold mt-2 text-green-600">{approvedReviews.length}</p>
                </div>
                <Check className="h-8 w-8 text-green-600 opacity-30" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Reviews</p>
                  <p className="text-3xl font-bold mt-2 text-blue-600">{allReviews.length}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-blue-600 opacity-30" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <Input
              placeholder="Search by author, title, or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              data-testid="input-search-reviews"
            />
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending" className="gap-2">
              <AlertCircle className="h-4 w-4" />
              Pending ({pendingReviews.length})
            </TabsTrigger>
            <TabsTrigger value="approved" className="gap-2">
              <Check className="h-4 w-4" />
              Approved ({approvedReviews.length})
            </TabsTrigger>
            <TabsTrigger value="flagged" className="gap-2">
              <AlertCircle className="h-4 w-4" />
              Flagged ({flaggedReviews.length})
            </TabsTrigger>
          </TabsList>

          {/* Pending Tab */}
          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Pending Review Approval</CardTitle>
                <CardDescription>These reviews need approval before appearing on products</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {filteredReviews(pendingReviews).length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No pending reviews</p>
                ) : (
                  filteredReviews(pendingReviews).map(review => (
                    <ReviewRow key={review.id} review={review} />
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Approved Tab */}
          <TabsContent value="approved">
            <Card>
              <CardHeader>
                <CardTitle>Approved Reviews</CardTitle>
                <CardDescription>Reviews currently visible on products</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {filteredReviews(approvedReviews).length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No approved reviews</p>
                ) : (
                  filteredReviews(approvedReviews).map(review => (
                    <ReviewRow key={review.id} review={review} />
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Flagged Tab */}
          <TabsContent value="flagged">
            <Card>
              <CardHeader>
                <CardTitle>Flagged Reviews</CardTitle>
                <CardDescription>Reviews flagged for review policy violations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {filteredReviews(flaggedReviews).length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No flagged reviews</p>
                ) : (
                  filteredReviews(flaggedReviews).map(review => (
                    <ReviewRow key={review.id} review={review} />
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
