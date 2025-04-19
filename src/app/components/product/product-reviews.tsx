"use client";

import { useState, useEffect } from "react";
import { Star, User } from "lucide-react";
import Button from "@/app/components/ui/button";
import { Textarea } from "@/app/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface Review {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export default function ProductReviews({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRating, setUserRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    async function loadReviews() {
      try {
        const { getProductReviews } = await import("@/app/lib/actions");
        const data = await getProductReviews(productId);
        if (data.success && Array.isArray(data.reviews)) {
          setReviews(data.reviews);
        } else {
          console.error("Invalid reviews data:", data);
          toast({
            title: "Error",
            description: "Failed to load reviews. Please try again later.",
          });
        }
      } catch (error) {
        console.error("Failed to load reviews:", error);
        toast({
          title: "Error",
          description: "Failed to load reviews. Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    }

    loadReviews();
  }, [productId]);

  const handleSubmitReview = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append("productId", productId);
    formData.append("rating", userRating.toString());

    try {
      const { submitReview } = await import("@/app/lib/actions");
      const result = await submitReview(formData);

      if (result.success) {
        toast({
          title: "Review submitted",
          description: "Thank you for your feedback!",
        });

        if (result.review) {
          setReviews([result.review, ...reviews]);
        }
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to submit review",
        });
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
        <form onSubmit={handleSubmitReview}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Your Rating</label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  className="p-1"
                  onMouseEnter={() => setHoveredRating(rating)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setUserRating(rating)}
                >
                  <Star
                    className={`h-6 w-6 ${
                      rating <= (hoveredRating || userRating)
                        ? "text-[#524334] fill-[#3d2f1f]"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="comment" className="block text-sm font-medium mb-2">
              Your Review
            </label>
            <Textarea
              id="comment"
              name="comment"
              rows={4}
              required
            />
          </div>

          <Button type="submit" label="Submit Review">
            Submit Review
          </Button>
        </form>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>

        {loading ? (
          <div className="text-center py-8">Loading reviews...</div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No reviews yet. Be the first to review this product!
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review._id} className="border-b pb-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-primary/10 rounded-full p-2">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium">{review.name}</span>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? "text-[#443627] fill-[#443627]"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <p className="text-sm">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
