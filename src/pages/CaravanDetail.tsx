"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ImageGallery } from "@/components/gallery/ImageGallery";
import { FinanceCalculator } from "@/components/finance/FinanceCalculator";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, Star, Check, Phone, Calendar } from "lucide-react";
import { Caravan } from "@/types/caravan";
import { Skeleton } from "@/components/ui/skeleton";

export default function CaravanDetail() {
  const params = useParams();
  const id = params?.id as string;

  const [caravan, setCaravan] = useState<Caravan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchCaravan = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "caravans", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCaravan({
            id: docSnap.id,
            ...docSnap.data(),
          } as Caravan);
        } else {
          setCaravan(null);
        }
      } catch (error) {
        console.error("Error fetching caravan:", error);
        setCaravan(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCaravan();
  }, [id]);

  // Reviews are still static for now — you can migrate later
  // For now, we'll show placeholder if needed
  const reviews: any[] = []; // Replace with real fetch if you migrate reviews
  const rating = 4.8; // Replace with real average when migrated

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12">
          <Skeleton className="h-96 w-full rounded-2xl" />
          <div className="space-y-6">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!caravan) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="font-heading text-3xl font-bold mb-4">Caravan Not Found</h1>
        <p className="text-muted-foreground mb-8">
          Sorry, we couldn't find the caravan you're looking for.
        </p>
        <Link href="/caravans">
          <Button>
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Caravans
          </Button>
        </Link>
      </div>
    );
  }

  const galleryImages = caravan.images.length > 0
    ? caravan.images
    : ["/images/hero-caravan.jpg", "/images/caravan-interior.jpg", "/images/caravan-lifestyle-1.jpg"];

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-secondary/30 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/caravans"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Our Caravans
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Gallery */}
            <div>
              <ImageGallery images={galleryImages} alt={caravan.name} />
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <span className="badge-sage mb-2 inline-block">{caravan.series} Series</span>
                <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-2">
                  {caravan.name}
                </h1>
                <p className="text-muted-foreground mt-2">{caravan.tagline}</p>
              </div>

              {rating > 0 && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(rating) ? "fill-yellow-500 text-yellow-500" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="text-muted-foreground">
                    {rating.toFixed(1)} ({reviews.length} reviews)
                  </span>
                </div>
              )}

              <div className="flex flex-wrap gap-6 py-4 border-y border-border">
                <div>
                  <p className="text-sm text-muted-foreground">Length</p>
                  <p className="font-semibold">{caravan.length}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Berth</p>
                  <p className="font-semibold">{caravan.berth} People</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tare</p>
                  <p className="font-semibold">{caravan.tare}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">ATM</p>
                  <p className="font-semibold">{caravan.atm}</p>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed">{caravan.description}</p>

              {/* Features */}
              <div>
                <h3 className="font-heading font-semibold mb-3">Key Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {caravan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-accent shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & CTA */}
              <div className="bg-secondary/50 rounded-2xl p-6 space-y-4">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Starting from</p>
                    <p className="font-heading text-4xl font-bold text-foreground">
                      ${caravan.price.toLocaleString()}
                    </p>
                    {caravan.variants.length > 1 && (
                      <p className="text-sm text-muted-foreground mt-1">
                        + optional upgrades available
                      </p>
                    )}
                  </div>
                  {!caravan.available && (
                    <span className="badge-gold px-4 py-2 rounded-full bg-yellow-100 text-yellow-800 font-medium">
                      Coming Soon
                    </span>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/contact" className="flex-1">
                    <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" size="lg" disabled={!caravan.available}>
                      <Calendar className="w-4 h-4 mr-2" />
                      Book a Viewing
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Us
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="specs" className="space-y-8">
            <TabsList className="w-full justify-start border-b rounded-none bg-transparent p-0 gap-8">
              <TabsTrigger value="specs">Specifications</TabsTrigger>
              <TabsTrigger value="variants">Variants ({caravan.variants.length})</TabsTrigger>
              <TabsTrigger value="finance">Finance Calculator</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="specs" className="space-y-8">
              {caravan.specs.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {caravan.specs.map((specGroup) => (
                    <div key={specGroup.category} className="bg-card rounded-2xl p-6 shadow-sm border">
                      <h3 className="font-heading font-semibold mb-4 text-lg">{specGroup.category}</h3>
                      <dl className="space-y-3">
                        {specGroup.items.map((item) => (
                          <div key={item.label} className="flex justify-between text-sm">
                            <dt className="text-muted-foreground">{item.label}</dt>
                            <dd className="font-medium">{item.value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">No specifications available.</p>
              )}
            </TabsContent>

            <TabsContent value="variants" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {caravan.variants.map((variant) => (
                  <div key={variant.name} className="bg-card rounded-2xl p-6 shadow-sm border">
                    <h3 className="font-heading font-semibold text-lg">{variant.name}</h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      {variant.priceModifier === 0
                        ? "Standard"
                        : `+$${variant.priceModifier.toLocaleString()}`}
                    </p>
                    <p className="font-heading text-3xl font-bold text-foreground mt-4">
                      ${(caravan.price + variant.priceModifier).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="finance">
              <div className="max-w-2xl mx-auto">
                <FinanceCalculator defaultPrice={caravan.price} />
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-6">
              {reviews.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} showCaravanLink={false} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-secondary/30 rounded-2xl">
                  <p className="text-xl text-muted-foreground">
                    No customer reviews yet for this model.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Be the first to share your experience!
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}