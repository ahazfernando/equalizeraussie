"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";

const galleryImages = [
  { src: "/images/hero-caravan.jpg", alt: "Equalizer RV caravan coastal view", category: "Exterior" },
  { src: "/images/caravan-interior.jpg", alt: "Luxury caravan interior", category: "Interior" },
  { src: "/images/caravan-lifestyle-1.jpg", alt: "Caravan adventure outback", category: "Lifestyle" },
  { src: "/images/caravan-lifestyle-2.jpg", alt: "Sunset camping by the beach", category: "Lifestyle" },
  { src: "/images/hero-caravan.jpg", alt: "Premium caravan design", category: "Exterior" },
  { src: "/images/caravan-interior.jpg", alt: "Modern kitchen interior", category: "Interior" },
  { src: "/images/caravan-lifestyle-1.jpg", alt: "Red centre adventure", category: "Lifestyle" },
  { src: "/images/caravan-lifestyle-2.jpg", alt: "Coastal camping experience", category: "Lifestyle" },
];

const categories = ["All", "Exterior", "Interior", "Lifestyle"];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredImages = activeCategory === "All"
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section className="bg-secondary/30 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-accent font-medium mb-2">Media Gallery</p>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-4">
              See the Equalizer Difference
            </h1>
            <p className="text-muted-foreground text-lg">
              Explore our collection of images showcasing our caravans in action, 
              premium interiors, and the Australian adventures they enable.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 border-b border-border sticky top-20 bg-background/95 backdrop-blur-md z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  activeCategory === category
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredImages.map((image, index) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <button
                    className="relative aspect-[4/3] rounded-xl overflow-hidden group animate-fade-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors" />
                    <span className="absolute bottom-3 left-3 badge-sage opacity-0 group-hover:opacity-100 transition-opacity">
                      {image.category}
                    </span>
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-5xl p-0 overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={1200}
                    height={800}
                    className="w-full h-auto"
                  />
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
