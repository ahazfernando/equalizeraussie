"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const models = [
  {
    id: "cruzer",
    name: "Cruzer",
    route: "/models/cruzer",
    image: "/newnew/NewCruzer.png",
    logo: "/newlogos/C white.png",
    description: "Perfect On Road Model",
  },
  {
    id: "rebel",
    name: "Rebel",
    route: "/models/rebel",
    image: "/newnew/NewRogue.png",
    logo: "/newlogos/R.png",
    description: "Semi Offroad Model",
  },
  {
    id: "rogue",
    name: "Rogue",
    route: "/models/rogue",
    image: "/newnew/NewRebel.png",
    logo: "/newlogos/RO white.png",
    description: "Off Road Model",
  },
];

export function ModelSelector() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const activeModel = models[activeIndex];
  const prevModel = models[activeIndex > 0 ? activeIndex - 1 : models.length - 1];
  const nextModel = models[activeIndex < models.length - 1 ? activeIndex + 1 : 0];

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex((prev) => (prev + 1) % models.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToPrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex((prev) => (prev - 1 + models.length) % models.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  return (
    <section className="relative w-full bg-black min-h-screen flex flex-col overflow-hidden -mt-24 pt-24">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center">
          <div className="inline-block mb-6">
            <span className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-red-600/10 border border-red-600/30 text-red-500 text-base font-semibold">
              <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
              Explore Our Models
            </span>
          </div>
          <h2 className="font-heading text-5xl sm:text-6xl -mb-10 font-semibold tracking-wider">
            Choose Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
              Caravan
            </span>
          </h2>
        </div>
      </div>

      {/* Background model images overlay for ambient effect */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-20 left-0 w-1/3 h-1/3 relative">
          <Image
            src={activeModel.image}
            alt=""
            fill
            className="object-cover blur-3xl"
          />
        </div>
        <div className="absolute top-40 right-0 w-1/4 h-1/4 relative">
          <Image
            src={activeModel.image}
            alt=""
            fill
            className="object-cover blur-3xl"
          />
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-12 mt-8">
        {/* Left Column - Portrait Widget */}
        <div className="w-full lg:w-auto lg:flex-shrink-0">
          <div className="relative w-full max-w-md h-[700px] rounded-3xl overflow-hidden group">
            {/* Background Image */}
            <Image
              src="/header/nighttie.jpg"
              alt="Construction"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8 pb-10">
              <h2 className="text-4xl md:text-5xl font-black italic text-white leading-tight mb-4">
                Unwind, Build, and Perfect Your Journey
              </h2>

              <p className="text-white/70 text-base mb-8">
                A construction experience unlike any other. Where strength meets precision in every weld.
              </p>

              <Link href="/about">
                <button className="px-8 py-3 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-colors">
                  Discover
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column - Hero Carousel Container */}
        <div className="relative flex-1 flex items-center justify-center pt-2 pb-20 z-10">
          {/* Navigation Arrows */}
          <button
            onClick={goToPrev}
            className="absolute left-4 md:left-8 z-30 p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-all duration-300 hover:scale-110 shadow-lg backdrop-blur-sm"
            aria-label="Previous model"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 md:right-8 z-30 p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-all duration-300 hover:scale-110 shadow-lg backdrop-blur-sm"
            aria-label="Next model"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </button>

          {/* Carousel Content */}
          <div className="relative w-full max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-12">
            <div className="relative flex items-center justify-center min-h-[500px] md:min-h-[550px] lg:min-h-[600px]">

              {/* Previous Model Visual (Left side) */}
              <div className="absolute left-0 z-10 pointer-events-none hidden lg:block opacity-30 scale-75 blur-[2px] -translate-x-1/2">
                <Image
                  src={prevModel.image}
                  alt={prevModel.name}
                  width={400}
                  height={300}
                  className="object-contain"
                />
              </div>

              {/* Active Model (Center) */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeModel.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.5, ease: "circOut" }}
                  className="relative z-20 flex flex-col items-center w-full"
                >
                  {/* Model Logo */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="relative w-40 md:w-56 lg:w-72 xl:w-80 h-20 md:h-28 lg:h-36 xl:h-40"
                  >
                    <Image
                      src={activeModel.logo}
                      alt={`${activeModel.name} Logo`}
                      fill
                      className="object-contain"
                      priority
                    />
                  </motion.div>

                  {/* Tagline */}
                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-lg md:text-xl lg:text-4xl font-bold text-white uppercase tracking-widest text-center px-4 -mt-8"
                  >
                    {activeModel.description}
                  </motion.h2>

                  {/* Main Model Image */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 50 }}
                    className="relative w-full max-w-4xl xl:max-w-5xl h-[320px] md:h-[380px] lg:h-[400px] xl:h-[400px] mt-4"
                  >
                    <Image
                      src={activeModel.image}
                      alt={activeModel.name}
                      fill
                      className="object-contain"
                    />
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              {/* Next Model Visual (Right side) */}
              <div className="absolute right-0 z-10 pointer-events-none hidden lg:block opacity-30 scale-75 blur-[2px] translate-x-1/2">
                <Image
                  src={nextModel.image}
                  alt={nextModel.name}
                  width={400}
                  height={300}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Actions */}
      <div className="absolute bottom-12 md:bottom-16 lg:bottom-20 left-0 right-0 z-30 flex justify-center items-center px-4">
        <motion.div
          key={`btn-${activeModel.id}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            asChild
            className="bg-accent hover:bg-accent/90 text-foreground px-8 py-6 text-base font-bold rounded-full min-w-[200px] transition-transform"
          >
            <Link href={activeModel.route}>
              Explore The {activeModel.name}
              <ChevronRight className="w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section >
  );
}