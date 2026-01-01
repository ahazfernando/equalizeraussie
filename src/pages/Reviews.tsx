import { ReviewCard } from "@/components/reviews/ReviewCard";
import { reviews } from "@/data/reviews";
import { Star } from "lucide-react";

export default function Reviews() {
  const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <>
      {/* Hero */}
      <section className="bg-secondary/30 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-accent font-medium mb-2">Customer Stories</p>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-4">
              What Our Owners Say
            </h1>
            <p className="text-muted-foreground text-lg mb-6">
              Real experiences from real Equalizer RV owners across Australia.
            </p>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < Math.floor(averageRating) ? "fill-gold text-gold" : "text-border"
                    }`}
                  />
                ))}
              </div>
              <div>
                <span className="font-heading text-2xl font-bold">{averageRating.toFixed(1)}</span>
                <span className="text-muted-foreground ml-2">from {reviews.length} reviews</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <div
                key={review.id}
                className="animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ReviewCard review={review} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
