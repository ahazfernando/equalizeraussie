"use client";
import { useMemo } from "react";
import { caravans } from "@/data/caravans";
import { CaravanCard } from "@/components/caravans/CaravanCard";
import Image from "next/image";

export default function Caravans() {
  // Use static data instead of fetching from Firebase
  const displayCaravans = useMemo(() => caravans.filter((c) => c.available !== false), []);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-background py-24 -mt-24 pt-32 min-h-[60vh] flex items-center">
        {/* Image Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/header/Image_fx-3.png"
            alt="Find Your Perfect Caravan"
            fill
            className="object-cover"
            priority
          />
          {/* Gradient Overlays for Fade Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-block mb-6">
              <span className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-white/15 to-white/5 border border-white/30 backdrop-blur-sm shadow-lg shadow-accent/10 group text-white text-base font-semibold cursor-pointer">
                <span className="w-3 h-3 rounded-full bg-foreground animate-ping" />
                Our Ranges
              </span>
            </div>
            <h2 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-8 text-white">
              Find Your Perfect Caravan
            </h2>
            <p className="text-white/80 text-md sm:text-lg leading-relaxed max-w-4xl font-light mb-5">
              From compact tourers to luxury family vans, discover the Equalizer RV that matches your adventure style.
            </p>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="section-padding pt-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayCaravans.map((caravan, index) => (
              <div
                key={caravan.id}
                className="animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CaravanCard caravan={caravan} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}