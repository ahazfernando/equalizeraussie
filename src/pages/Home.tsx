"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Shield, Wrench, Award, MapPin, Star, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CaravanCard } from "@/components/caravans/CaravanCard";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { ModelSelector } from "@/components/models/ModelSelector";
import { HeroHeader } from "@/components/home/HeroHeader";
import { RecentBlogs } from "@/components/home/RecentBlogs";
import { collection, getDocs, query, where, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Caravan } from "@/types/caravan";
import { reviews } from "@/data/reviews"; // Keep static reviews for now (or migrate later)
import { Skeleton } from "@/components/ui/skeleton";

const trustPillars = [
  {
    icon: Shield,
    title: "5-Year Warranty",
    description: "Industry-leading coverage for complete peace of mind on the road.",
  },
  {
    icon: Wrench,
    title: "Australian Made",
    description: "Designed and built right here in Australia for our unique conditions.",
  },
  {
    icon: Award,
    title: "Award Winning",
    description: "Recognised for excellence in design, quality and innovation.",
  },
  {
    icon: MapPin,
    title: "Nationwide Service",
    description: "Network of authorised service centres across the country.",
  },
];

export default function Home() {
  const [featuredCaravans, setFeaturedCaravans] = useState<Caravan[]>([]);
  const [loading, setLoading] = useState(true);
  const featuredReviews = reviews.slice(0, 3);

  useEffect(() => {
    const fetchFeatured = async () => {
      setLoading(true);
      try {
        // Fetch only featured + available caravans, limit to 6 for homepage
        const q = query(
          collection(db, "caravans"),
          where("featured", "==", true),
          where("available", "==", true),
          limit(6)
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Caravan[];

        setFeaturedCaravans(data);
      } catch (error) {
        console.error("Error fetching featured caravans:", error);
        setFeaturedCaravans([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <>
      {/* Hero Header Section */}
      <HeroHeader />

      {/* Model Selector */}
      <ModelSelector />

      {/* Trust Pillars */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustPillars.map((pillar, index) => (
              <div
                key={pillar.title}
                className="trust-badge animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <pillar.icon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground">{pillar.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{pillar.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Caravans */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-center items-center text-center gap-4 mb-12">
            <div>
              <p className="text-accent font-medium mb-2">Our Range</p>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
                Featured Caravans
              </h2>
              <p className="text-muted-foreground mt-2 max-w-lg">
                Discover our most popular models, each designed for different adventures
                and lifestyles.
              </p>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-96 w-full rounded-xl" />
              ))}
            </div>
          ) : featuredCaravans.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCaravans.map((caravan, index) => (
                <div
                  key={caravan.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CaravanCard caravan={caravan} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">No featured caravans available at the moment.</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/caravans">
              <Button variant="outline" size="lg">
                View All Models
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Lifestyle Section */}
      <section className="py-20 bg-primary text-primary-foreground overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <p className="text-accent font-medium mb-2">The Equalizer Difference</p>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold leading-tight">
                  Built for Australia.<br />
                  Designed for You.
                </h2>
              </div>

              <p className="text-primary-foreground/80 leading-relaxed">
                Every Equalizer RV is engineered from the ground up to handle
                Australia&apos;s diverse terrain and climate. From the red dust of the
                outback to the salt spray of coastal highways, our caravans are
                built to go wherever your adventure takes you.
              </p>

              <ul className="space-y-4">
                {[
                  "Heavy-duty chassis and suspension systems",
                  "Premium Australian-sourced materials",
                  "Comprehensive off-grid capability",
                  "Thoughtful, practical layouts",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center shrink-0">
                      <ChevronRight className="w-4 h-4 text-accent-foreground" />
                    </div>
                    <span className="text-primary-foreground/90">{item}</span>
                  </li>
                ))}
              </ul>

              <Link href="/about" className="inline-block mt-6">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Learn Our Story
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <Image
                    src="/images/caravan-lifestyle-1.jpg"
                    alt="Caravan adventure in Australian outback"
                    width={400}
                    height={533}
                    className="rounded-2xl w-full aspect-[3/4] object-cover"
                  />
                </div>
                <div className="space-y-4 pt-8">
                  <Image
                    src="/images/caravan-lifestyle-2.jpg"
                    alt="Couple relaxing by their caravan at sunset"
                    width={400}
                    height={533}
                    className="rounded-2xl w-full aspect-[3/4] object-cover"
                  />
                </div>
              </div>
              {/* Floating Stats */}
              <div className="absolute -bottom-14 lg:-bottom-6 lg:-left-6 bg-card rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="font-heading text-3xl font-bold text-accent">500+</p>
                    <p className="text-sm text-muted-foreground">Happy Owners</p>
                  </div>
                  <div className="w-px h-12 bg-border" />
                  <div className="text-center">
                    <p className="font-heading text-3xl font-bold text-foreground">15+</p>
                    <p className="text-sm text-muted-foreground">Years Experience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Preview */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-accent font-medium mb-2">Customer Stories</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
              What Our Owners Say
            </h2>
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                ))}
              </div>
              <span className="text-muted-foreground">4.9 average from 50+ reviews</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredReviews.map((review, index) => (
              <div
                key={review.id}
                className="animate-fade-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <ReviewCard review={review} />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/reviews">
              <Button variant="outline" size="lg">
                Read All Reviews
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Blogs Section */}
      <RecentBlogs />
    </>
  );
}