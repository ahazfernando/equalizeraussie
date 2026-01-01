"use client";

import { useState, useEffect } from "react";
import { Review } from "@/data/reviews";
import { 
  getReviews, 
  createReview, 
  updateReview, 
  deleteReview,
  getCaravans 
} from "@/lib/firebase/firestore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Star, CheckCircle, XCircle, Trash2, Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Caravan {
  id: string;
  name: string;
}

export default function AdminReviews() {
  const [searchTerm, setSearchTerm] = useState("");
  const [reviewList, setReviewList] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingReviewId, setDeletingReviewId] = useState<string | null>(null);
  const [caravans, setCaravans] = useState<Caravan[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const [reviewForm, setReviewForm] = useState({
    author: "",
    location: "",
    caravanId: "",
    caravanModel: "",
    rating: 5,
    title: "",
    content: "",
    date: new Date().toISOString().split("T")[0],
    verified: false,
    tripHighlight: "",
  });

  // Helper to convert Firestore Timestamp to date string
  const toDateString = (value: any): string => {
    if (!value) return new Date().toISOString().split("T")[0];
    if (value.toDate && typeof value.toDate === 'function') {
      return value.toDate().toISOString().split("T")[0];
    }
    if (typeof value === 'string') {
      return value.split("T")[0];
    }
    return new Date().toISOString().split("T")[0];
  };

  const loadReviews = async () => {
    setLoading(true);
    try {
      const reviewsData = await getReviews();
      
      // Convert Firestore data to Review format
      const formattedReviews = reviewsData.map((review: any) => ({
        id: review.id,
        author: review.author || "",
        location: review.location || "",
        caravanModel: review.caravanModel || "",
        caravanId: review.caravanId || "",
        rating: review.rating || 5,
        title: review.title || "",
        content: review.content || "",
        date: toDateString(review.date),
        verified: review.verified || false,
        tripHighlight: review.tripHighlight || "",
      })) as Review[];

      setReviewList(formattedReviews);
    } catch (error) {
      console.error('Error loading reviews:', error);
      toast.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  const loadCaravans = async () => {
    try {
      const caravansData = await getCaravans();
      setCaravans(caravansData.map((c: any) => ({
        id: c.id,
        name: c.name || c.id,
      })));
    } catch (error) {
      console.error('Error loading caravans:', error);
      toast.error("Failed to load caravans");
    }
  };

  useEffect(() => {
    loadReviews();
    loadCaravans();
  }, []);

  const filteredReviews = reviewList.filter(
    (review) =>
      review.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.caravanModel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenDialog = () => {
    setReviewForm({
      author: "",
      location: "",
      caravanId: "",
      caravanModel: "",
      rating: 5,
      title: "",
      content: "",
      date: new Date().toISOString().split("T")[0],
      verified: false,
      tripHighlight: "",
    });
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setReviewForm({
      author: "",
      location: "",
      caravanId: "",
      caravanModel: "",
      rating: 5,
      title: "",
      content: "",
      date: new Date().toISOString().split("T")[0],
      verified: false,
      tripHighlight: "",
    });
  };

  const handleCaravanChange = (caravanId: string) => {
    const caravan = caravans.find(c => c.id === caravanId);
    setReviewForm({
      ...reviewForm,
      caravanId: caravanId,
      caravanModel: caravan?.name || "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reviewForm.author || !reviewForm.title || !reviewForm.content || !reviewForm.caravanId) {
      toast.error("Please fill in all required fields");
      return;
    }

    setSubmitting(true);
    try {
      await createReview({
        author: reviewForm.author,
        location: reviewForm.location,
        caravanId: reviewForm.caravanId,
        caravanModel: reviewForm.caravanModel,
        rating: reviewForm.rating,
        title: reviewForm.title,
        content: reviewForm.content,
        date: reviewForm.date,
        verified: reviewForm.verified,
        tripHighlight: reviewForm.tripHighlight || undefined,
      });

      toast.success("Review created successfully");
      handleCloseDialog();
      loadReviews();
    } catch (error) {
      console.error('Error creating review:', error);
      toast.error("Failed to create review");
    } finally {
      setSubmitting(false);
    }
  };

  const toggleVerified = async (id: string) => {
    const review = reviewList.find(r => r.id === id);
    if (!review) return;

    try {
      await updateReview(id, {
        verified: !review.verified,
      });
      toast.success(`Review ${!review.verified ? 'verified' : 'unverified'}`);
      loadReviews();
    } catch (error) {
      console.error('Error updating review:', error);
      toast.error("Failed to update review");
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeletingReviewId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingReviewId) return;

    try {
      await deleteReview(deletingReviewId);
      toast.success("Review deleted successfully");
      setIsDeleteDialogOpen(false);
      setDeletingReviewId(null);
      loadReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
      toast.error("Failed to delete review");
    }
  };

  const averageRating =
    reviewList.length > 0
      ? (
          reviewList.reduce((sum, r) => sum + r.rating, 0) / reviewList.length
        ).toFixed(1)
      : "0.0";

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-2xl font-bold">Review Management</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Manage customer reviews and ratings
          </p>
        </div>
        <Button onClick={handleOpenDialog}>
          <Plus className="w-4 h-4 mr-2" />
          Add Review
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="admin-card p-4">
          <p className="text-sm text-muted-foreground">Total Reviews</p>
          <p className="text-2xl font-bold mt-1">{reviewList.length}</p>
        </div>
        <div className="admin-card p-4">
          <div className="flex items-center gap-2 mb-1">
            <Star className="w-4 h-4 text-gold fill-gold" />
            <p className="text-sm text-muted-foreground">Average Rating</p>
          </div>
          <p className="text-2xl font-bold">{averageRating}</p>
        </div>
        <div className="admin-card p-4">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="w-4 h-4 text-accent" />
            <p className="text-sm text-muted-foreground">Verified</p>
          </div>
          <p className="text-2xl font-bold">
            {reviewList.filter((r) => r.verified).length}
          </p>
        </div>
        <div className="admin-card p-4">
          <div className="flex items-center gap-2 mb-1">
            <XCircle className="w-4 h-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Unverified</p>
          </div>
          <p className="text-2xl font-bold">
            {reviewList.filter((r) => !r.verified).length}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search reviews by author, model, or title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <div key={review.id} className="admin-card p-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold">{review.author}</p>
                      {review.verified && (
                        <Badge className="bg-accent/20 text-accent border-accent/30 text-xs">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {review.location} • {review.caravanModel}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? "fill-gold text-gold"
                            : "text-border"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <h3 className="font-semibold mb-2">{review.title}</h3>
                <p className="text-muted-foreground text-sm mb-3">
                  {review.content}
                </p>
                {review.tripHighlight && (
                  <p className="text-xs text-muted-foreground">
                    Trip highlight: {review.tripHighlight}
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-2">
                  {new Date(review.date).toLocaleDateString()}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toggleVerified(review.id)}
                  className="w-full sm:w-auto"
                >
                  {review.verified ? (
                    <>
                      <XCircle className="w-4 h-4 mr-2" />
                      Unverify
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Verify
                    </>
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full sm:w-auto text-destructive"
                  onClick={() => handleDeleteClick(review.id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredReviews.length === 0 && (
        <div className="admin-card text-center py-12 text-muted-foreground">
          No reviews found matching your search.
        </div>
      )}

      {/* Add/Edit Review Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Review</DialogTitle>
            <DialogDescription>
              Enter customer review details. All fields marked with * are required.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="author">
                  Reviewer Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="author"
                  value={reviewForm.author}
                  onChange={(e) =>
                    setReviewForm({ ...reviewForm, author: e.target.value })
                  }
                  placeholder="e.g., The Mitchell Family"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={reviewForm.location}
                  onChange={(e) =>
                    setReviewForm({ ...reviewForm, location: e.target.value })
                  }
                  placeholder="e.g., Melbourne, VIC"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="caravan">
                Caravan Model <span className="text-destructive">*</span>
              </Label>
              <Select
                value={reviewForm.caravanId}
                onValueChange={handleCaravanChange}
                required
              >
                <SelectTrigger id="caravan">
                  <SelectValue placeholder="Select a caravan" />
                </SelectTrigger>
                <SelectContent>
                  {caravans.map((caravan) => (
                    <SelectItem key={caravan.id} value={caravan.id}>
                      {caravan.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rating">
                  Rating <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={reviewForm.rating.toString()}
                  onValueChange={(value) =>
                    setReviewForm({ ...reviewForm, rating: parseInt(value) })
                  }
                  required
                >
                  <SelectTrigger id="rating">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <SelectItem key={rating} value={rating.toString()}>
                        {rating} {rating === 1 ? 'Star' : 'Stars'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Review Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={reviewForm.date}
                  onChange={(e) =>
                    setReviewForm({ ...reviewForm, date: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">
                Review Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                value={reviewForm.title}
                onChange={(e) =>
                  setReviewForm({ ...reviewForm, title: e.target.value })
                }
                placeholder="e.g., Our kids call it their adventure home"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">
                Review Content <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="content"
                value={reviewForm.content}
                onChange={(e) =>
                  setReviewForm({ ...reviewForm, content: e.target.value })
                }
                placeholder="Enter the full review text..."
                rows={6}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tripHighlight">Trip Highlight (Location)</Label>
              <Input
                id="tripHighlight"
                value={reviewForm.tripHighlight}
                onChange={(e) =>
                  setReviewForm({ ...reviewForm, tripHighlight: e.target.value })
                }
                placeholder="e.g., Cape York, QLD"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="verified"
                checked={reviewForm.verified}
                onChange={(e) =>
                  setReviewForm({ ...reviewForm, verified: e.target.checked })
                }
                className="rounded border-gray-300"
              />
              <Label htmlFor="verified" className="cursor-pointer">
                Verified Purchase
              </Label>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseDialog}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Review"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the review.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeletingReviewId(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
