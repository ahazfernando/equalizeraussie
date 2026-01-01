"use client";

import Link from "next/link";
import Image from "next/image";
import { Check } from "lucide-react";
import { SpecificationTabs } from "@/components/models/SpecificationTabs";
import { getCaravanModelById } from "@/data/caravanModels";
import { PlansCoupleTabs } from "@/components/models/PlansCouple";
import { PlansFamiliyTabs } from "@/components/models/PlansFamily";

interface ModelPageProps {
  modelId: string;
}

export default function ModelPage({ modelId }: ModelPageProps) {
  const model = getCaravanModelById(modelId || "");

  if (!model) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="font-heading text-3xl font-bold mb-4">Model Not Found</h1>
        <Link href="/" className="text-accent hover:underline">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section with Overlay Card */}
      <section className="relative min-h-[85vh] flex items-end">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/home/thumbnailimg8067.jpg"
            alt={`${model.name} Caravan Background`}
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        </div>

        {/* Content Card Overlay - Positioned on bottom half */}
        <div className="relative w-full z-10 mt-auto">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-8 lg:pb-12">
            <div className="bg-card rounded-3xl p-8 md:p-10 lg:p-12 shadow-2xl max-w-6xl mx-auto">
              <div className="grid md:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-start">
                {/* Left Content */}
                <div className="space-y-4 md:space-y-6">
                  {/* Tagline */}
                  <p className="text-accent font-medium text-sm md:text-base">
                    {model.tagline}
                  </p>

                  {/* Model Name */}
                  <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight">
                    {model.name}
                  </h1>

                  {/* Description */}
                  <p className="text-foreground text-sm md:text-base leading-relaxed max-w-2xl">
                    {model.description}
                  </p>
                </div>

                {/* Right Content - Pricing */}
                <div className="flex flex-col items-start md:items-end border-t md:border-t-0 md:border-l border-border/30 pt-6 md:pt-0 md:pl-8 md:min-w-[200px]">
                  <p className="text-xs md:text-sm text-muted-foreground mb-1">Starting from</p>
                  <p className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-1">
                    {model.price}
                  </p>
                  <p className="text-xs text-muted-foreground">*Drive away pricing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="py-8 md:py-12 bg-background -mt-4 relative z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {model.features.map((feature, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-5 md:p-6 border border-border/50 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-accent" />
                  </div>
                  <p className="text-foreground font-medium text-sm md:text-base leading-relaxed">
                    {feature}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-accent font-medium mb-2">DETAILED SPECIFICATIONS</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
              Every Detail Matters
            </h2>
          </div>

          <SpecificationTabs specifications={model.specifications} />

          <p className="mt-10 font-md text-left max-w-6xl text-gray-500 italic">Disclaimer: Equalizer RV reserves the right to discontinue or change the models, features, specifications, materials or designs of the RV’s and any terms or offers referred to herein, at their discretion and without prior notice. Some photos may depict optional extras.</p>
          <div className="my-8">
            <p className="text-accent font-medium mb-2">FLOOR PLANS</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
              For Couples
            </h2>
          </div>
          <PlansCoupleTabs planscouples={model.planscouples} />

          <p className="mt-10 font-md text-left max-w-6xl text-gray-500 italic">*Floor plans are for illustrative purposes only & are not to scale. Components shown may be different to actual caravans.</p>
          <div className="my-8">
            <p className="text-accent font-medium mb-2">FLOOR PLANS</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
              For Families
            </h2>
          </div>
          <PlansFamiliyTabs plansfamily={model.plansfamily} />
        </div>
      </section>
    </>
  );
}

