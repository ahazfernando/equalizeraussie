import { Star, Quote, MapPin } from "lucide-react";
import { Review } from "@/data/reviews";
import Link from "next/link";

interface ReviewCardProps {
  review: Review;
  showCaravanLink?: boolean;
}

export function ReviewCard({ review, showCaravanLink = true }: ReviewCardProps) {
  return (
    <div className="card-premium p-6 space-y-4">
      <div className="flex items-start justify-between">
        <Quote className="w-8 h-8 text-accent/30" />
        {review.verified && (
          <span className="badge-sage text-xs">Verified Purchase</span>
        )}
      </div>

      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < review.rating ? "fill-gold text-gold" : "text-border"
            }`}
          />
        ))}
      </div>

      <h4 className="font-heading font-semibold text-foreground">
        {review.title}
      </h4>

      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-4">
        {review.content}
      </p>

      {review.tripHighlight && (
        <div className="flex items-center gap-2 text-sm text-accent">
          <MapPin className="w-4 h-4" />
          <span>{review.tripHighlight}</span>
        </div>
      )}

      <div className="pt-4 border-t border-border flex items-center justify-between">
        <div>
          <p className="font-medium text-foreground text-sm">{review.author}</p>
          <p className="text-muted-foreground text-xs">{review.location}</p>
        </div>
        {showCaravanLink && (
          <Link
            href={`/caravans/${review.caravanId}`}
            className="text-sm text-accent hover:underline"
          >
            {review.caravanModel}
          </Link>
        )}
      </div>
    </div>
  );
}
