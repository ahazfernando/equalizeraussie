"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Users, Ruler, Weight, Shield, Maximize2, Check, ChevronDown, ChevronLeft, ChevronRight, Layout, Mountain, Sun, ChefHat, Car, Zap, Home, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SpecificationTabs } from "@/components/models/SpecificationTabs";
import { PlansCoupleTabs } from "@/components/models/PlansCouple";
import { PlansFamiliyTabs } from "@/components/models/PlansFamily";
import EnquiryDrawer from "@/components/EnquiryDrawer";
import { getCaravanModelById, CaravanModel } from "@/data/caravanModels";
import { motion, easeOut, AnimatePresence } from "framer-motion";

interface RVDetailProps {
  modelId: string;
}

export default function RVDetail({ modelId }: RVDetailProps) {
  const model = getCaravanModelById(modelId);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<'couples' | 'families'>('couples');
  const [similarModelIndex, setSimilarModelIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

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

  // Get logo path based on model name
  const getLogoPath = () => {
    if (model.name === "Cruzer") return "/newlogos/C white.png";
    if (model.name === "Rebel") return "/newlogos/R.png";
    if (model.name === "Rogue") return "/newlogos/RO white.png";
    return `/caravanlogos/${model.name}Logo.png`;
  };

  // Get caravan image path based on model name
  const getCaravanImagePath = () => {
    if (model.name === "Cruzer") return "/caravan/CruzerCaravan.png";
    if (model.name === "Rebel") return "/caravan/RebelCaravan.png";
    if (model.name === "Rogue") return "/caravan/RogueCaravan.png";
    return `/caravan/${model.name}Caravan.png`;
  };

  // Prepare images array - start with main caravan image
  const caravanImage = getCaravanImagePath();
  let images = [caravanImage];

  // Specific images for Cruzer model
  if (model.name === "Cruzer") {
    images = [
      "/actualmodels/cruzer-3.jpeg",
      "/actualmodels/cruzer-2.jpeg",
      "/actualmodels/cruzer-1.jpeg"
    ];
  } else if (model.name === "Rogue") {
    images = [
      "/roguemodel/rogue-1.jpeg",
      "/roguemodel/rogue-2.jpeg",
      "/roguemodel/rogue-3.jpeg"
    ];
  } else if (model.name === "Rebel") {
    images = [
      "/rebelmodel/rebel-1.jpeg",
      "/rebelmodel/rebel-2.jpeg",
      "/rebelmodel/rebel-3.jpeg"
    ];
  }

  // Extract key specs
  const extractNumber = (str: string): number => {
    return parseInt(str.replace(/[^0-9]/g, "")) || 0;
  };

  // Extract solar power from electrical specifications
  const extractSolarPower = (): string => {
    const solarSpec = model.specifications.electrical.find(spec =>
      spec.toLowerCase().includes('solar') || spec.toLowerCase().includes('w of solar')
    );
    if (solarSpec) {
      const match = solarSpec.match(/(\d+)W/);
      return match ? `${match[1]}W` : "200W";
    }
    return "200W"; // Default fallback
  };

  // Extract water capacity from plumbing specifications
  const extractWaterCapacity = (): string => {
    const waterSpec = model.specifications.plumbing.find(spec =>
      spec.toLowerCase().includes('water capacity') || spec.toLowerCase().includes('l of drinking')
    );
    if (waterSpec) {
      const match = waterSpec.match(/(\d+)L/);
      return match ? `${match[1]}L` : "190L";
    }
    return "190L"; // Default fallback
  };

  // Extract length from chassis specifications or use default
  const extractLength = (): string => {
    // Try to find length info in chassis specs, or use model-specific defaults
    const lengthMap: Record<string, string> = {
      "cruzer": "17-21ft",
      "rebel": "19-23ft",
      "rogue": "20-24ft"
    };
    return lengthMap[model.id] || "17-24ft";
  };

  const keySpecs = [
    { label: "Sleeps", value: "4", icon: Users },
    { label: "Length", value: extractLength(), icon: Ruler },
    { label: "Solar", value: extractSolarPower(), icon: Weight },
    { label: "Warranty", value: "5 Years", icon: Shield },
  ];

  // Get similar models (exclude current model)
  const allModels = [
    { id: "cruzer", name: "Cruzer", image: "/caravan/CruzerCaravan.png", logo: "/newlogos/C white.png", price: 89990, description: "Perfect On Road Model" },
    { id: "rebel", name: "Rebel", image: "/caravan/RebelCaravan.png", logo: "/newlogos/R.png", price: 119990, description: "Semi Offroad Model" },
    { id: "rogue", name: "Rogue", image: "/caravan/RogueCaravan.png", logo: "/newlogos/RO white.png", price: 159990, description: "Off Road Model" },
  ];
  const similarModels = allModels.filter(m => m.id !== modelId);

  const activeSimilarModel = similarModels[similarModelIndex];
  const prevSimilarModel = similarModels[similarModelIndex > 0 ? similarModelIndex - 1 : similarModels.length - 1];
  const nextSimilarModel = similarModels[similarModelIndex < similarModels.length - 1 ? similarModelIndex + 1 : 0];

  const goToNextSimilar = () => {
    if (isTransitioning || similarModels.length <= 1) return;
    setIsTransitioning(true);
    setSimilarModelIndex((prev) => (prev + 1) % similarModels.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToPrevSimilar = () => {
    if (isTransitioning || similarModels.length <= 1) return;
    setIsTransitioning(true);
    setSimilarModelIndex((prev) => (prev - 1 + similarModels.length) % similarModels.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Extract key specifications for the header section
  const extractSpecValue = (specs: string[], keyword: string): string => {
    const found = specs.find(spec => spec.toLowerCase().includes(keyword.toLowerCase()));
    if (!found) return "";

    // Extract numbers and units
    if (keyword === "battery") {
      const match = found.match(/(\d+)\s*Ah/i);
      if (match) return `${match[1]}AH LITHIUM`;
      return found;
    }
    if (keyword === "inverter") {
      const match = found.match(/(\d+)\s*W\s*inverter/i);
      if (match) return `${match[1]}W`;
      const multiMatch = found.match(/(\d+)\s*x\s*(\d+)\s*W/i);
      if (multiMatch) return `${multiMatch[1]} X ${multiMatch[2]}W`;
      return found;
    }
    if (keyword === "suspension") {
      // Try to extract a shorter version
      const shortMatch = found.match(/([^,]+(?:suspension|shock|spring)[^,]*)/i);
      if (shortMatch) return shortMatch[1].trim();
      // If too long, take first part
      if (found.length > 50) {
        return found.split(',')[0].trim() + "...";
      }
      return found;
    }
    return found;
  };

  const getSpecifications = () => {
    const solar = extractSolarPower();
    const battery = extractSpecValue(model.specifications.electrical, "battery") || "Not Specified";
    const water = extractWaterCapacity();
    const inverter = extractSpecValue(model.specifications.electrical, "inverter") || "Not Specified";
    const suspension = extractSpecValue(model.specifications.chassis, "suspension") || "Not Specified";

    // Get custom features (first 5 features)
    const customs = model.features.slice(0, 5).map(f => f.title);

    return { solar, battery, water, inverter, suspension, customs };
  };

  const specs = getSpecifications();

  return (
    <div className="mx-auto w-full">
      {/* Back Navigation */}
      <div className="-mt-24 pt-24 pb-8 bg-background-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <Link href="/models" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors -mb-6 mt-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Models
          </Link>
          {/* Model Logo */}
          <div className="relative w-64 h-24 md:w-80 md:h-32 lg:w-96 lg:h-40 -mt-8">
            <Image
              src={getLogoPath()}
              alt={`${model.name} Logo`}
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <section className="pb-12 bg-gradient-to-b from-background-secondary to-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Image */}
            <div className="lg:col-span-8">
              <div className="relative rounded-2xl overflow-hidden group">
                <div className="aspect-[16/10] relative">
                  <Image
                    src={images[activeImage] || caravanImage}
                    alt={`${model.name} Caravan`}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                </div>
                <Button
                  variant="glass"
                  size="icon"
                  className="absolute top-4 right-4 rounded-full"
                >
                  <Maximize2 className="w-5 h-5" />
                </Button>
                <div className="absolute bottom-4 right-4">
                  <Button variant="glass" className="opacity-50 cursor-not-allowed">
                    360° View
                  </Button>
                </div>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all relative ${activeImage === index ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                    >
                      <Image src={img} alt="" fill className="object-cover" sizes="96px" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Info */}
            <div className="lg:col-span-4">
              <div className="glass p-6 rounded-2xl lg:sticky lg:top-28">
                <span className="text-primary text-sm font-medium tracking-wider uppercase">{model.tagline}</span>
                <h1 className="font-heading text-4xl mt-2 text-foreground">{model.name}</h1>
                <p className="text-muted-foreground mt-2">{model.description}</p>

                <div className="my-6 py-6 border-y border-border/50">
                  <p className="text-lg font-semibold text-foreground mb-2">
                    Custom Pricing Available
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Contact us for a personalized quote tailored to your needs and specifications.
                  </p>
                </div>

                {/* Quick Specs */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {keySpecs.map((spec, index) => {
                    const Icon = spec.icon;
                    return (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">{spec.label}</p>
                          <p className="font-medium text-foreground">{spec.value}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-3">
                  <EnquiryDrawer />
                  <Button variant="outline" className="w-full" size="lg" asChild>
                    <Link href="/quote">Request Quote</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Specifications Section */}
      <section className="py-8 border-y border-border/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {/* Solar */}
            <div className="flex flex-col items-start text-left border-r border-border/30 pr-4 md:pr-6">
              <h3 className="text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                SOLAR
              </h3>
              <p className="text-lg md:text-xl lg:text-2xl font-bold text-foreground">
                {specs.solar}
              </p>
            </div>

            {/* Battery */}
            <div className="flex flex-col items-start text-left border-r border-border/30 pr-4 md:pr-6">
              <h3 className="text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                BATTERY
              </h3>
              <p className="text-base md:text-lg lg:text-xl font-bold text-foreground">
                {specs.battery}
              </p>
            </div>

            {/* Water */}
            <div className="flex flex-col items-start text-left border-r border-border/30 pr-4 md:pr-6">
              <h3 className="text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                WATER
              </h3>
              <p className="text-lg md:text-xl lg:text-2xl font-bold text-foreground">
                {specs.water}
              </p>
            </div>

            {/* Inverter */}
            <div className="flex flex-col items-start text-left border-r border-border/30 pr-4 md:pr-6">
              <h3 className="text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                INVERTER
              </h3>
              <p className="text-base md:text-lg lg:text-xl font-bold text-foreground">
                {specs.inverter}
              </p>
            </div>

            {/* Suspension */}
            <div className="flex flex-col items-start text-left border-r border-border/30 pr-4 md:pr-6">
              <h3 className="text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                SUSPENSION
              </h3>
              <p className="text-xs md:text-sm lg:text-base font-bold text-foreground leading-tight">
                {specs.suspension}
              </p>
            </div>

            {/* Customs/Features */}
            <div className="flex flex-col items-start text-left">
              <h3 className="text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                KEY FEATURES
              </h3>
              <ul className="space-y-1 text-left w-full">
                {specs.customs.map((custom, index) => (
                  <li key={index} className="text-xs md:text-sm text-foreground">
                    • {custom}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-12">
              {/* Overview */}
              <div className="mb-16">
                <h2 className="font-heading text-3xl text-foreground mb-6">Overview</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-muted-foreground leading-relaxed mb-4">{model.description}</p>
                </div>
              </div>

              {/* Highlights */}
              {model.features && model.features.length > 0 && (
                <div className="mb-16">
                  <h2 className="font-heading text-3xl text-foreground mb-6">Highlights</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {model.features.map((feature, index) => {
                      // Map feature labels to appropriate icons
                      const getFeatureIcon = (label: string) => {
                        const lowerLabel = label.toLowerCase();
                        if (lowerLabel.includes('compact') || lowerLabel.includes('spacious') || lowerLabel.includes('layout') || lowerLabel.includes('space')) {
                          return Layout;
                        }
                        if (lowerLabel.includes('off-road') || lowerLabel.includes('suspension') || lowerLabel.includes('terrain') || lowerLabel.includes('chassis')) {
                          return Mountain;
                        }
                        if (lowerLabel.includes('solar') || lowerLabel.includes('power') || lowerLabel.includes('battery') || lowerLabel.includes('energy')) {
                          return Sun;
                        }
                        if (lowerLabel.includes('kitchen') || lowerLabel.includes('cooking') || lowerLabel.includes('appliance')) {
                          return ChefHat;
                        }
                        if (lowerLabel.includes('outdoor') || lowerLabel.includes('adventure')) {
                          return Car;
                        }
                        // Default icon
                        return Check;
                      };

                      const IconComponent = getFeatureIcon(feature.title);

                      return (
                        <div key={index} className="flex items-start gap-4 p-4 glass rounded-xl">
                          <div className="w-12 h-12 rounded-lg bg-primary/20 border-2 border-primary/30 flex items-center justify-center shrink-0">
                            <IconComponent className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground">{feature.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Specifications - Every Detail Matters Section */}
              <div className="mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: easeOut }}
                  className="mb-8 items-center text-center"
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
                    className="font-heading text-3xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] tracking-wider"
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
              </div>

              {/* Floor Plans - Find the Perfect Layout Section */}
              <div className="mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: easeOut }}
                  className="mb-8 items-center text-center"
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
                    className="font-heading text-3xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] tracking-wider"
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

              {/* Delivery & Warranty */}
              <div>
                <h2 className="font-heading text-3xl text-foreground mb-6">Delivery & Warranty</h2>
                <Accordion type="single" collapsible className="glass rounded-2xl overflow-hidden">
                  <AccordionItem value="delivery" className="border-border/50">
                    <AccordionTrigger className="px-6 text-foreground hover:no-underline tracking-wider">
                      Free Australia-Wide Delivery
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 text-muted-foreground">
                      We offer complimentary delivery to all capital cities and major regional centres across Australia. Our team will coordinate the delivery to ensure your new caravan arrives safely and on schedule.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="warranty" className="border-border/50">
                    <AccordionTrigger className="px-6 text-foreground hover:no-underline tracking-wider">
                      5-Year Comprehensive Warranty
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 text-muted-foreground">
                      Every Equalizer RV comes with our industry-leading 5-year comprehensive warranty. This covers all structural components, appliances, and workmanship. Extended warranty options are available.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="service" className="border-0">
                    <AccordionTrigger className="px-6 text-foreground hover:no-underline tracking-wider">
                      Nationwide Service Network
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 text-muted-foreground">
                      Access our network of authorised service centres across Australia. Whether you need routine maintenance or warranty repairs, help is never far away.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Models - Carousel */}
      {similarModels.length > 0 && (
        <section className="relative py-16 bg-background-secondary overflow-hidden">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-12">
                <h2 className="font-heading text-3xl text-foreground mb-12 text-center">Similar Models</h2>

                {/* Carousel Container */}
                <div className="relative w-full">
                  {/* Navigation Arrows */}
                  {similarModels.length > 1 && (
                    <>
                      <button
                        onClick={goToPrevSimilar}
                        className="absolute left-4 md:left-8 z-30 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/80 hover:bg-background border border-border/50 transition-all duration-300 hover:scale-110 shadow-lg backdrop-blur-sm"
                        aria-label="Previous model"
                      >
                        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
                      </button>

                      <button
                        onClick={goToNextSimilar}
                        className="absolute right-4 md:right-8 z-30 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/80 hover:bg-background border border-border/50 transition-all duration-300 hover:scale-110 shadow-lg backdrop-blur-sm"
                        aria-label="Next model"
                      >
                        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
                      </button>
                    </>
                  )}

                  {/* Carousel Content */}
                  <div className="relative w-full max-w-5xl mx-auto">
                    <div className="relative flex items-center justify-center min-h-[500px] md:min-h-[550px]">
                      {/* Previous Model Visual (Left side) */}
                      {similarModels.length > 1 && (
                        <div className="absolute left-0 z-10 pointer-events-none hidden lg:block opacity-30 scale-75 blur-[2px] -translate-x-1/2">
                          <img
                            src={prevSimilarModel.image}
                            alt={prevSimilarModel.name}
                            className="w-[300px] h-[250px] object-contain"
                          />
                        </div>
                      )}

                      {/* Active Model (Center) */}
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeSimilarModel.id}
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
                            className="relative w-48 md:w-64 lg:w-80 h-24 md:h-32 lg:h-40 mb-4"
                          >
                            <Image
                              src={activeSimilarModel.logo}
                              alt={`${activeSimilarModel.name} Logo`}
                              fill
                              className="object-contain"
                              priority
                            />
                          </motion.div>

                          {/* Tagline */}
                          <motion.h3
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-lg md:text-xl lg:text-2xl font-bold text-foreground uppercase tracking-widest text-center px-4 mb-6"
                          >
                            {activeSimilarModel.description}
                          </motion.h3>

                          {/* Main Model Image */}
                          <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, type: "spring", stiffness: 50 }}
                            className="relative w-full max-w-3xl xl:max-w-4xl h-[300px] md:h-[350px] lg:h-[400px]"
                          >
                            <Image
                              src={activeSimilarModel.image}
                              alt={activeSimilarModel.name}
                              fill
                              className="object-contain"
                              priority
                            />
                          </motion.div>
                        </motion.div>
                      </AnimatePresence>

                      {/* Next Model Visual (Right side) */}
                      {similarModels.length > 1 && (
                        <div className="absolute right-0 z-10 pointer-events-none hidden lg:block opacity-30 scale-75 blur-[2px] translate-x-1/2">
                          <img
                            src={nextSimilarModel.image}
                            alt={nextSimilarModel.name}
                            className="w-[300px] h-[250px] object-contain"
                          />
                        </div>
                      )}
                    </div>

                    {/* CTA Button */}
                    <motion.div
                      key={`btn-${activeSimilarModel.id}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="flex justify-center mt-8"
                    >
                      <Button
                        asChild
                        className="bg-accent hover:bg-accent/90 text-foreground px-8 py-6 text-base font-bold rounded-full min-w-[200px] transition-transform"
                      >
                        <Link href={`/models/${activeSimilarModel.id}`}>
                          Explore The {activeSimilarModel.name}
                          <ChevronRight className="w-5 h-5 ml-2" />
                        </Link>
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
