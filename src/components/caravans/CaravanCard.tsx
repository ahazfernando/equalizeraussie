import Link from "next/link";
import Image from "next/image";
import { Star, ArrowRight } from "lucide-react";
import { Caravan } from "@/types/caravan"; // ← Updated import
import { getAverageRating, getReviewsByCaravan } from "@/data/reviews";

interface CaravanCardProps {
  caravan: Caravan;
}

export function CaravanCard({ caravan }: CaravanCardProps) {
  const rating = getAverageRating(caravan.id);
  const reviewCount = getReviewsByCaravan(caravan.id).length;

  return (
    <div className="rv-card">
      <div className="relative overflow-hidden aspect-[4/3]">
        {/* Show first image, fallback to placeholder */}
        <Image
          src={caravan.images[0] || "/images/caravan-interior.jpg"}
          alt={caravan.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {caravan.featured && (
          <span className="absolute top-4 left-4 badge-gold bg-yellow-100 text-yellow-800 px-3 py-1 text-xs font-medium rounded-full">
            Featured
          </span>
        )}
        {!caravan.available && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="bg-background px-6 py-3 rounded-lg font-semibold text-lg">
              Coming Soon
            </span>
          </div>
        )}
      </div>

      <div className="p-6 space-y-4">
        <div>
          <p className="text-sm text-accent font-medium mb-1">{caravan.series} Series</p>
          <h3 className="font-heading text-3xl font-black uppercase text-foreground">
            {caravan.name}
          </h3>
          <p className="text-muted-foreground text-sm mt-1">{caravan.tagline}</p>
        </div>

        {rating > 0 && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(rating)
                    ? "fill-yellow-500 text-yellow-500"
                    : "text-gray-300"
                    }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {rating.toFixed(1)} ({reviewCount} reviews)
            </span>
          </div>
        )}

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>{caravan.length}</span>
          <span>•</span>
          <span>{caravan.berth} Berth</span>
          <span>•</span>
          <span>{caravan.tare} Tare</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {caravan.features.slice(0, caravan.id === 'cruzer' ? 2 : 3).map((feature) => (
            <span key={feature} className="badge-sage text-xs px-3 py-1 rounded-full bg-green-100 text-green-800">
              {feature}
            </span>
          ))}
          {caravan.features.length > (caravan.id === 'cruzer' ? 2 : 3) && (
            <span className="text-xs text-muted-foreground">
              +{caravan.features.length - (caravan.id === 'cruzer' ? 2 : 3)} more
            </span>
          )}
        </div>

        <div className="pt-4 border-t border-border flex items-center justify-end">
          <Link
            href={`/models/${caravan.id}`}
            className="inline-flex items-center gap-2 text-accent font-medium hover:gap-3 transition-all"
          >
            View Details
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}