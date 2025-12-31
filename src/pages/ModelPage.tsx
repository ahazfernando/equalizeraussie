"use client";

import Link from "next/link";
import Image from "next/image";
import { Check, DollarSign, Droplets, Ruler, SolarPanel } from "lucide-react";
import { motion, easeInOut, easeOut } from "framer-motion";
import { SpecificationTabs } from "@/components/models/SpecificationTabs";
import { PlansCoupleTabs } from "@/components/models/PlansCouple";
import { PlansFamiliyTabs } from "@/components/models/PlansFamily";
import { getCaravanModelById } from "@/data/caravanModels";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ModelPageProps {
  modelId: string;
}

// CountUp Component - expects only number for 'end'
function CountUp({
  end,
  suffix = "",
  prefix = ""
}: {
  end: number;
  suffix?: string;
  prefix?: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (end === 0) {
      setCount(0);
      return;
    }

    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start > end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end]);

  // Format number with commas: 159990 → "159,990"
  const formattedCount = count.toLocaleString("en-US");

  return <span>{prefix}{formattedCount}{suffix}</span>;
}

export default function ModelPage({ modelId }: ModelPageProps) {
  const model = getCaravanModelById(modelId || "");
  const [activeTab, setActiveTab] = useState<'couples' | 'families'>('couples');

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

  // Helper function to extract number from strings like "15ft", "200W", "190L"
  const extractNumber = (str: string): number => {
    return parseInt(str.replace(/[^0-9]/g, "")) || 0;
  };

  // Key specifications derived from model.variants - now all values are numbers
  const keySpecs = [
    {
      label: "Length",
      value: extractNumber(model.variants.length),
      suffix: "ft",
      icon: Ruler,
    },
    {
      label: "Solar Power",
      value: extractNumber(model.variants.solar),
      suffix: "W",
      icon: SolarPanel,
    },
    {
      label: "Water Capacity",
      value: extractNumber(model.variants.water),
      suffix: "L",
      icon: Droplets,
    },
    {
      label: "Price Starting",
      value: extractNumber(model.variants.price),
      suffix: "$",
      icon: DollarSign,
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } },
  };

  const floatVariants = {
    float: {
      y: [0, -20, 0],
      transition: { duration: 6, repeat: Infinity, ease: easeInOut },
    },
  };

  // Get logo path based on model name
  const getLogoPath = () => {
    if (model.name === "Cruzer") return "/header/cruzerlogo.png";
    if (model.name === "Rebel") return "/header/rebelloogo.png";
    if (model.name === "Rogue") return "/header/rogurelogo.png";
    return `/caravanlogos/${model.name}Logo.png`;
  };

  return (
    <div className="mx-auto w-full">
      {/* Hero Section: Model Image Background with Logo Overlay */}
      <section className="relative min-h-[70vh] lg:h-[85vh] w-full overflow-hidden -mt-24 pt-24">
        {/* Background Image - Model Caravan */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        >
          <Image
            src={`/caravan/${model.name}Caravan.png`}
            alt={`${model.name} Caravan`}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        </motion.div>

        {/* Content Overlay */}
        <div className="container relative z-10 h-full flex items-center justify-center lg:justify-start">
          <div className="max-w-5xl w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: easeOut }}
              viewport={{ once: true }}
              className="text-center lg:text-left"
            >
              {/* Tagline Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8, ease: easeOut }}
                viewport={{ once: true }}
                className="inline-block mb-6"
              >
                <span className="inline-flex items-center gap-3 px-5 py-2.5 lg:px-6 lg:py-3 rounded-full bg-gradient-to-r from-accent/20 via-accent/10 to-accent/5 border border-accent/40 backdrop-blur-md shadow-2xl shadow-accent/20 text-red-500 dark:text-red-400 text-sm lg:text-base font-semibold">
                  <span className="w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full bg-red-500 animate-ping" />
                  {model.tagline}
                </span>
              </motion.div>

              {/* Logo - Centered on mobile, left-aligned on desktop */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.8, ease: easeOut }}
                viewport={{ once: true }}
                className="relative w-64 h-24 md:w-80 md:h-32 lg:w-96 lg:h-40 mx-auto lg:mx-0"
              >
                <Image
                  src={getLogoPath()}
                  alt={`${model.name} Logo`}
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Performance Highlights */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <span className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-accent/15 to-accent/5 border border-accent/30 backdrop-blur-sm shadow-lg shadow-accent/10 text-red-500 dark:text-red-400 text-base font-semibold">
                <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
                Key Specifications
              </span>
            </div>
            <h2 className="font-heading text-3xl md:text-6xl lg:text-7xl font-semibold leading-[1.1]">
              Performance Highlights
            </h2>
          </div>

          {/* Two-column layout: Cards Left, Image Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mx-auto">

            {/* Left: Specification Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {keySpecs.map((spec, index) => {
                const Icon = spec.icon;
                return (
                  <motion.div
                    key={spec.label}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15, duration: 0.8 }}
                    className="text-center"
                  >
                    <motion.div
                      className="p-8 rounded-2xl bg-card backdrop-blur-sm border-2 border-border transition-all hover:border-accent duration-500 cursor-pointer"
                    >
                      <div className="flex items-center justify-center gap-4">
                        <div className="p-3 rounded-full border-2 border-accent/40 bg-accent/10">
                          <Icon className="w-8 h-8 text-accent" />
                        </div>
                        <p className="text-lg font-medium text-foreground">{spec.label}</p>
                      </div>
                      <p className="font-heading text-4xl font-extrabold text-foreground mt-6">
                        {spec.label.toLowerCase().includes("price") ? (
                          <CountUp end={spec.value} prefix="$" />
                        ) : (
                          <CountUp end={spec.value} suffix={spec.suffix} />
                        )}
                      </p>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            {/* Right: Caravan Image */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: easeOut }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-2xl h-96 lg:h-[28rem]">
                <Image
                  src={`/caravan/${model.name}Caravan.png`}
                  alt={`${model.name} Caravan - Side View`}
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: easeOut }}
            className="mb-20 items-center text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, ease: easeOut }}
              className="inline-block mb-6"
            >
              <span className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-accent/15 to-accent/5 border border-accent/30 backdrop-blur-sm shadow-lg shadow-accent/10 text-red-500 dark:text-red-400 text-base font-semibold">
                <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
                Key Features
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8, ease: easeOut }}
              className="font-heading text-3xl md:text-6xl lg:text-7xl font-semibold leading-[1.1]"
            >
              Explore What Makes <span className="text-accent">{model.name} Unique</span>
            </motion.h2>
          </motion.div>
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            navigation
            autoplay={{ delay: 4000 }}
            // Responsive breakpoints
            breakpoints={{
              // Mobile (1 card)
              320: { slidesPerView: 1 },
              // Tablet (2 cards)
              768: { slidesPerView: 1 },
              // Desktop (2 cards as requested, or increase to 3 if preferred)
              1024: { slidesPerView: 2 },
            }}
            className="rounded-xl overflow-hidden"
          >
            {model.features.map((feature, index) => (
              <SwiperSlide key={index}>
                <div className="relative aspect-[4/5] lg:aspect-[16/10] w-full rounded-xl overflow-hidden group">
                  {/* Background Image */}
                  <img
                    src={feature.image[0]}
                    alt={feature.label[0]}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Gradient Overlay (mimics the image provided) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-black/40 to-transparent" />

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 p-8 w-full text-foreground">
                    <h3 className="text-3xl font-heading font-bold mb-4">
                      {feature.label[0]}
                    </h3>
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-2xl">
                      {feature.description[0]}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Custom Styles for Swiper Buttons */}
        <style jsx global>{`
        .swiper-button-next, .swiper-button-prev {
          color: white !important;
          width: 20px !important;
          height: 20px !important;
          border-radius: 50%;
        }
        .swiper-button-next:after, .swiper-button-prev:after {
          font-size: 20px !important;
        }
        .swiper-pagination-bullet {
          background: white !important;
        }
        .swiper-pagination-bullet-active {
          background: #your-accent-color !important;
        }
      `}</style>
      </section>

      {/* Specifications & Floor Plans */}
      <section className="py-20">
        <div className="container px-2 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: easeOut }}
            className="mb-20 items-center text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, ease: easeOut }}
              className="inline-block mb-6"
            >
              <span className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-accent/15 to-accent/5 border border-accent/30 backdrop-blur-sm shadow-lg shadow-accent/10 text-red-500 dark:text-red-400 text-base font-semibold">
                <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
                Detailed Specifications
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8, ease: easeOut }}
              className="font-heading text-3xl md:text-6xl lg:text-7xl font-semibold leading-[1.1]"
            >
              Every Detail Matters
            </motion.h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 1, ease: easeOut }}
          >
            <SpecificationTabs specifications={model.specifications} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: easeOut }}
            className="mt-40 mb-20 items-center text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, ease: easeOut }}
              className="inline-block mb-6"
            >
              <span className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-accent/15 to-accent/5 border border-accent/30 backdrop-blur-sm shadow-lg shadow-accent/10 text-red-500 dark:text-red-400 text-base font-semibold">
                <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
                Floor Plans
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8, ease: easeOut }}
              className="font-heading text-3xl md:text-6xl lg:text-7xl font-semibold leading-[1.1]"
            >
              Find the Perfect Layout
            </motion.h2>
          </motion.div>

          {/* Tabs Section */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: easeOut }}
            className=""
          >
            {/* Tab Buttons */}
            <div className="flex justify-center mb-12">
              <div className="inline-flex rounded-full bg-card p-1">
                <button
                  onClick={() => setActiveTab('couples')}
                  className={`px-8 py-3 rounded-full font-semibold text-md transition-all ${activeTab === 'couples'
                      ? 'bg-accent text-foreground shadow-md'
                      : 'text-muted-foreground hover:text-foreground'
                    }`}
                >
                  For Couples
                </button>
                <button
                  onClick={() => setActiveTab('families')}
                  className={`px-8 py-3 rounded-full font-semibold text-md transition-all ${activeTab === 'families'
                      ? 'bg-accent text-foreground shadow-md'
                      : 'text-muted-foreground hover:text-foreground'
                    }`}
                >
                  For Families
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeOut }}
            >
              {activeTab === 'couples' ? (
                <PlansCoupleTabs planscouples={model.planscouples} />
              ) : (
                <PlansFamiliyTabs plansfamily={model.plansfamily} />
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}