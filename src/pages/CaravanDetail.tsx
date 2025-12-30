"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { ImageGallery } from "@/components/gallery/ImageGallery";
import { FinanceCalculator } from "@/components/finance/FinanceCalculator";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, Star, Check, Phone, Calendar, ArrowRight } from "lucide-react";
import { Caravan } from "@/types/caravan";
import { getCaravanById } from "@/data/caravans";
import { getAverageRating, getReviewsByCaravan } from "@/data/reviews";

export default function CaravanDetail() {
  const params = useParams();
  const id = params?.id as string;
  const caravan = useMemo(() => getCaravanById(id), [id]);

  if (!caravan) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-6">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-foreground">Caravan Not Found</h1>
          <p className="text-muted-foreground">
            We couldn&apos;t find the caravan you&apos;re looking for.
          </p>
          <Link href="/caravans">
            <Button size="lg" className="bg-accent hover:bg-accent/90">
              <ChevronLeft className="w-5 h-5 mr-2" />
              Back to Caravans
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const reviews = getReviewsByCaravan(caravan.id);
  const rating = getAverageRating(caravan.id);
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  const galleryImages = caravan.images.length > 0
    ? caravan.images
    : ["/images/hero-caravan.jpg", "/images/caravan-interior.jpg", "/images/caravan-lifestyle-1.jpg"];

  return (
    <>
      {/* Hero Section with Gallery & Floating CTA */}
      <section className="relative min-h-screen bg-background py-20 -mt-24 pt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          {/* Breadcrumb */}
          <Link
            href="/caravans"
            className="inline-flex items-center gap-2 text-sm text-foreground hover:text-accent transition-colors mb-8"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Caravans
          </Link>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Gallery - Left */}
            <div className="order-2 lg:order-1">
              <ImageGallery images={galleryImages} alt={caravan.name} />
            </div>

            {/* Details & Floating Price Card - Right */}
            <div className="order-1 lg:order-2 space-y-8">
              {/* Series Badge */}
              <div className="inline-block">
                <span className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-accent/15 to-accent/5 border border-accent/30 backdrop-blur-sm shadow-lg shadow-accent/10 group text-red-500 dark:text-red-400 text-base font-semibold cursor-pointer">
                  <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
                  {caravan.series} Series
                </span>
              </div>

              {/* Title & Tagline */}
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  {caravan.name}
                </h1>
                <p className="text-xl text-muted-foreground mt-4 max-w-lg">{caravan.tagline}</p>
              </div>

              {/* Rating */}
              {rating > 0 && (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-6 h-6 ${i < fullStars
                          ? "fill-amber-500 text-amber-500"
                          : i === fullStars && hasHalfStar
                            ? "fill-amber-500/50 text-amber-500"
                            : "text-gray-300"
                          }`}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-medium text-foreground">
                    {rating.toFixed(1)} <span className="text-muted-foreground">({reviews.length} reviews)</span>
                  </span>
                </div>
              )}

              {/* Quick Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-8 border-y-2 border-border">
                {[
                  { label: "Length", value: caravan.length },
                  { label: "Berth", value: `${caravan.berth} People` },
                  { label: "Tare", value: caravan.tare },
                  { label: "ATM", value: caravan.atm },
                ].map((spec) => (
                  <div key={spec.label} className="text-center">
                    <p className="text-sm text-muted-foreground uppercase tracking-wide">{spec.label}</p>
                    <p className="text-xl font-bold text-foreground mt-1">{spec.value}</p>
                  </div>
                ))}
              </div>

              {/* Floating Price & CTA Card (Sticky on Desktop) */}
              <div className="bottom-0 left-0 right-0 bg-background backdrop-blur-lg py-2 shadow-2xl static z-50 w-full">
                <div className="w-full px-6 lg:px-0">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground">Starting Price</p>
                      <p className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
                        ${caravan.price.toLocaleString()}
                      </p>
                      {caravan.variants.length > 1 && (
                        <p className="text-sm text-muted-foreground mt-1">+ optional upgrades</p>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                      <Link href="/contact" className="flex-1 sm:flex-initial">
                        <Button
                          size="lg"
                          className="w-full bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent text-foreground shadow-lg hover:shadow-xl transition-all"
                          disabled={!caravan.available}
                        >
                          <Calendar className="w-5 h-5 mr-2" />
                          Book a Viewing
                        </Button>
                      </Link>
                      <Button size="lg" variant="outline" className="w-full sm:w-auto border-2">
                        <Phone className="w-5 h-5 mr-2" />
                        Call Now
                      </Button>
                    </div>
                  </div>

                  {!caravan.available && (
                    <div className="mt-4 text-center">
                      <span className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-accent/10 to-accent/20 text-foreground font-semibold">
                        Coming Soon – Register Interest
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <p className="text-lg text-muted-foreground leading-relaxed mt-10">{caravan.description}</p>

          {/* Key Features */}
          <div>
            <h3 className="text-2xl font-bold text-foreground my-10">Key Features</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {caravan.features.map((feature) => (
                <div key={feature} className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center transition-colors">
                    <Check className="w-5 h-5 text-accent" />
                  </div>
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section - Clean & Modern */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="specs" className="w-full">
            <TabsList className="inline-flex h-14 items-center justify-start rounded-xl bg-card backdrop-blur-md p-1 shadow-inner border border-border mb-12">
              <TabsTrigger value="specs" className="px-8 py-3 text-lg font-medium data-[state=active]:bg-accent data-[state=active]:text-foreground rounded-lg transition-all">
                Specifications
              </TabsTrigger>
              <TabsTrigger value="variants" className="px-8 py-3 text-lg font-medium data-[state=active]:bg-accent data-[state=active]:text-foreground rounded-lg transition-all">
                Variants ({caravan.variants.length})
              </TabsTrigger>
              <TabsTrigger value="finance" className="px-8 py-3 text-lg font-medium data-[state=active]:bg-accent data-[state=active]:text-foreground rounded-lg transition-all">
                Finance Options
              </TabsTrigger>
              <TabsTrigger value="reviews" className="px-8 py-3 text-lg font-medium data-[state=active]:bg-accent data-[state=active]:text-foreground rounded-lg transition-all">
                Reviews ({reviews.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="specs" className="mt-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {caravan.specs.map((specGroup) => (
                  <div key={specGroup.category} className="bg-card rounded-2xl p-8 shadow-lg border-2 border-border hover:shadow-xl transition-shadow">
                    <h3 className="text-2xl font-bold text-foreground mb-6">{specGroup.category}</h3>
                    <dl className="space-y-4">
                      {specGroup.items.map((item) => (
                        <div key={item.label} className="flex justify-between py-3 border-b border-border last:border-0">
                          <dt className="text-muted-foreground">{item.label}</dt>
                          <dd className="font-semibold text-foreground">{item.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="variants">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {caravan.variants.map((variant) => (
                  <div key={variant.name} className="bg-card rounded-2xl p-8 shadow-lg border-2 border-border hover:shadow-2xl hover:-translate-y-2 transition-all">
                    <h3 className="text-2xl font-bold text-foreground">{variant.name}</h3>
                    <p className="text-muted-foreground mt-2">
                      {variant.priceModifier === 0 ? "Standard Model" : `+$${variant.priceModifier.toLocaleString()}`}
                    </p>
                    <div className="mt-6 pt-6 border-t border-border">
                      <p className="text-4xl font-bold text-accent">
                        ${(caravan.price + variant.priceModifier).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="finance">
              <div className="bg-card rounded-3xl p-10 shadow-xl border-2 border-border">
                <FinanceCalculator defaultPrice={caravan.price} />
              </div>
            </TabsContent>

            <TabsContent value="reviews">
              {reviews.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-8">
                  {reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} showCaravanLink={false} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-card rounded-3xl">
                  <p className="text-2xl text-muted-foreground">No reviews yet</p>
                  <p className="text-muted-foreground mt-4">
                    Be the first to share your adventure with the {caravan.name}!
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