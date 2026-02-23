"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Shield, Wrench, Award, MapPin, Star, ChevronRight, Check, Sparkles, Heart, ChevronLeft, Zap, Grid, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CaravanCard } from "@/components/caravans/CaravanCard";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { ModelSelector } from "@/components/models/ModelSelector";
import { HeroHeader } from "@/components/home/HeroHeader";
import { RecentBlogs } from "@/components/home/RecentBlogs";
import { collection, getDocs, query, where, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Caravan } from "@/types/caravan";
import { reviews } from "@/data/reviews";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

const trustPillars = [
  {
    icon: Wrench,
    title: "Australian Made",
    description: "Designed and built right here in Australia for our unique conditions.",
  },
  {
    icon: Award,
    title: "Friendly Staff",
    description: "Friendly staff who welcome you with care, and genuine support every step",
  },
  {
    icon: MapPin,
    title: "Nationwide Service",
    description: "Network of authorised service centres across the country.",
  },
];

const pillarVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const lifestyleTextVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const lifestyleImageVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
  },
};

export default function Home() {
  const [featuredCaravans, setFeaturedCaravans] = useState<Caravan[]>([]);
  const [loading, setLoading] = useState(true);
  const featuredReviews = reviews.slice(0, 3);
  const destinationsScrollRef = useRef<HTMLDivElement>(null);

  // Drag to scroll refs
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const fetchFeatured = async () => {
      setLoading(true);
      try {
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


      {/* Lifestyle Split Section */}
      <section className="py-0">
        <div className="grid lg:grid-cols-2 min-h-[600px]">
          <div className="relative h-[400px] lg:h-auto overflow-hidden">
            <Image
              src="/caravan/_DSC1431.jpg"
              alt="Luxury RV Interior"
              fill
              className="object-cover"
            />
            {/* Gradient overlay to blend with background */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent from-70% via-black/40 via-90% to-black" />
          </div>
          <div className="bg-black flex items-center p-12 lg:p-20">
            <div className="max-w-lg">
              <span className="text-primary font-semibold tracking-widest text-sm">CONSTRUCTION</span>
              <div className="flex items-center mb-16 mt-4 gap-6">
                <div className="relative w-[180px] h-16">
                  <Image
                    src="/mainlogo/PT.png"
                    alt="Polly Tech"
                    fill
                    className="object-contain object-left"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="text-4xl font-bold text-white leading-none">Makes Your</h3>
                  <h3 className="text-4xl font-bold text-white leading-none">Caravan Timber-Free</h3>
                </div>
              </div>
              <div className="space-y-8 mb-10">
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-300">
                    <Zap className="w-6 h-6 text-primary group-hover:text-black transition-colors duration-300" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-2xl mb-1 tracking-wider text-white uppercase group-hover:text-primary transition-colors duration-300">New Tech (Polytech)</h4>
                    <p className="text-gray-400 leading-relaxed">Advanced 100% timber-free construction ensuring zero rot and maximum longevity.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-300">
                    <Grid className="w-6 h-6 text-primary group-hover:text-black transition-colors duration-300" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-2xl mb-1 tracking-wider text-white uppercase group-hover:text-primary transition-colors duration-300">Honeycomb Floor</h4>
                    <p className="text-gray-400 leading-relaxed">One-piece lightweight flooring system that delivers exceptional strength without the weight.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-300">
                    <Layers className="w-6 h-6 text-primary group-hover:text-black transition-colors duration-300" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-2xl mb-1 tracking-wider text-white uppercase group-hover:text-primary transition-colors duration-300">Sandwich Panelling</h4>
                    <p className="text-gray-400 leading-relaxed">Superior thermal insulation and structural rigidity to keep you comfortable in any climate.</p>
                  </div>
                </div>
              </div>
              <Link href="/caravans">
                <Button variant="outline" size="lg" className="group">
                  Start Your Journey
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section with Image Background */}
      <section className="relative min-h-[800px] lg:min-h-screen flex items-center overflow-hidden bg-black">
        {/* Image Background */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/home/d47fc3a603bcf4cc7e3da404f012fbec.jpg"
            alt="Benefits Background"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-black/20" />

        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Glassmorphic Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-white/28 border border-white/24 backdrop-blur-[35px] rounded-3xl p-6 md:p-8 lg:p-10 shadow-2xl flex flex-col my-8"
            >
              {/* Header Section */}
              <div className="mb-6">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 mb-3"
                >
                  <Sparkles className="w-4 h-4 text-accent" />
                  <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                    Why Choose Us
                  </span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight tracking-wider"
                >
                  Benefits of Equalizer RV
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="text-sm md:text-base text-white/80 leading-relaxed max-w-xl"
                >
                  Equalizer RV caravans are built with premium materials and engineering excellence,
                  designed to handle Australia&apos;s diverse terrain and climate.
                </motion.p>
              </div>

              {/* Divider */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mb-6"
              />

              {/* Enhanced Bullet Points */}
              <ul className="space-y-4 flex-grow">
                {[
                  {
                    title: "Superior Quality & Durability",
                    description: "Built to last with superior craftsmanship and materials",
                    icon: Shield
                  },
                  {
                    title: "Australian Made & Tested",
                    description: "Designed specifically for Australian conditions",
                    icon: Award
                  },
                  {
                    title: " 2 Years Manufacturer's Warranty",
                    description: "Industry-leading coverage for complete peace of mind",
                    icon: Heart
                  }
                ].map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <motion.li
                      key={benefit.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                      className="group"
                    >
                      <div className="flex items-start gap-3 p-2 rounded-xl hover:bg-white/5 transition-all duration-300">
                        <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center shadow-lg shadow-accent/30 group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-base md:text-lg font-bold text-white mb-1 group-hover:text-accent transition-colors tracking-wider">
                            {benefit.title}
                          </h3>
                          <p className="text-xs md:text-sm text-white/70 leading-relaxed">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    </motion.li>
                  );
                })}
              </ul>

              {/* Footer CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.0 }}
                className="mt-6 pt-4 border-t border-white/10"
              >
                <Link href="/caravans">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-white font-semibold rounded-full px-8 py-6 shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40 transition-all duration-300"
                  >
                    Explore Our Models
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Side - Empty for now, video shows through */}
            <div className="hidden lg:block" />
          </div>
        </div>
      </section>

      {/* Connect with Experts Section */}
      <section className="relative min-h-[90vh] lg:min-h-[95vh] pt-8 lg:pt-12 pb-20 lg:pb-32 bg-black overflow-x-hidden overflow-y-visible">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative">
            {/* Left Side - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8 z-10"
            >
              {/* Top CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Link href="/dealers">
                  <Button
                    variant="outline"
                    className="border-0 p-0 bg-transparent hover:bg-white/10 text-white rounded-full font-medium transition-all duration-300"
                  >
                    Start your journey
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </motion.div>

              {/* Main Heading */}
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight tracking-wider"
              >
                Connect with our dealers <br />and Find Your Perfect Caravan
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-white/80 text-base md:text-lg leading-relaxed max-w-xl -mt-3"
              >
                Join hands with adventurers across Australia who are discovering their dream caravans with guidance from our authorized dealers.
              </motion.p>

              {/* Bottom CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="pt-4"
              >
                <Link href="/dealers">
                  <Button
                    size="lg"
                    className="bg-white hover:bg-white/90 text-black rounded-full px-8 py-6 font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    Find a Dealer
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Side - Caravan Image - Extended beyond container */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="relative lg:absolute lg:-right-[12vw] xl:-right-[18vw] lg:top-0 lg:-translate-y-[95%] w-full lg:w-[70vw] xl:w-[65vw] flex items-center justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-none lg:max-w-[1400px] flex items-center">
                <Image
                  src="/newmodels/eq.png"
                  alt="Equalizer RV Caravan"
                  width={1600}
                  height={1200}
                  className="w-full h-auto object-contain drop-shadow-2xl scale-110 lg:scale-100"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Premium Split Layout Section */}
      <section className="py-20 lg:py-32 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title Section - Above both columns */}
          <div className="mb-12 lg:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-block mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/80 text-xs font-semibold uppercase tracking-widest border border-white/20">
                OUR STORY
              </span>
            </motion.div>
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.4] tracking-wider"
              >
                Where Adventure Meets<br />
                <span className="bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">
                  luxury and Comfort
                </span>
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="space-y-4"
              >
                <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light">
                  Adventure ready strength meets refined family comfort in every Equalizer RV. Thoughtfully built, down to the finest detail.
                </p>
              </motion.div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            {/* Left Column - Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="relative overflow-hidden rounded-3xl group cursor-pointer w-full h-full shadow-2xl hover:shadow-accent/20 transition-all duration-500"
              >
                {/* Background Image */}
                <Image
                  src="/caravan/COnture.png"
                  alt="Premium caravan lifestyle"
                  fill
                  className="object-cover object-bottom transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 px-8 pb-10 pt-0 z-10">
                  <h2 className="font-sans text-3xl md:text-4xl font-bold text-white leading-tight">
                    Unwind, Build, and<br />
                    Perfect Your Journey
                  </h2>
                  <p className="text-white/70 text-lg mb-4 max-w-md">
                    A construction experience unlike any other. Where strength meets precision in every weld.
                  </p>
                  <Link href="/about">
                    <Button className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-white/90 transition-colors">
                      Discover {/*To About Us*/}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Image aligned to top + Text + Button */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="flex flex-col"
            >
              {/* Image Card - Aligned to top with left image */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="relative group rounded-3xl overflow-hidden shadow-2xl hover:shadow-accent/20 transition-all duration-500 mb-8"
              >
                <div className="relative aspect-[16/9] overflow-hidden rounded-3xl">
                  <Image
                    src="/images/1e20ef54f236dbbb0ef0a201e1426adb.jpg"
                    alt="Luxury caravan experience"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 rounded-3xl"
                  />

                  {/* Subtle Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-3xl" />
                </div>
              </motion.div>

              {/* Text Content Below Image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="space-y-6"
              >
                <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light max-w-xl">
                  Discover the perfect blend of rugged capability and refined comfort.
                  Every Equalizer RV is crafted with meticulous attention to detail.
                </p>

                {/* CTA Button */}
                <div className="pt-4">
                  <Link href="/caravans">
                    <Button
                      size="lg"
                      className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold rounded-full px-8 py-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/10 mb-6"
                    >
                      Explore More
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Destinations Gallery */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-12 gap-0">
            {/* Left side - aligned with 12 grid column */}
            <div className="col-span-12 lg:col-span-5 xl:col-span-4">
              {/* Arrows at the top */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex gap-2 mb-6"
              >
                <button
                  onClick={() => {
                    if (destinationsScrollRef.current) {
                      destinationsScrollRef.current.scrollBy({ left: -400, behavior: 'smooth' });
                    }
                  }}
                  className="p-3 rounded-full border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => {
                    if (destinationsScrollRef.current) {
                      destinationsScrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
                    }
                  }}
                  className="p-3 rounded-full border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-accent font-medium tracking-wider text-sm mb-2">
                  ADVENTURE AWAITS
                </p>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold text-white tracking-wider mb-6"
              >
                WHERE WILL YOU GO?
              </motion.h2>

              {/* Description and Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-6"
              >
                <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-lg mb-4">
                  Discover breathtaking destinations across Australia. From the iconic red center to pristine coastal escapes, your next adventure awaits.
                </p>
                <Link href="/contact" className="inline-block">
                  <Button
                    size="lg"
                    className="bg-accent hover:bg-accent/90 text-white font-semibold rounded-full px-8 py-6 shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40 transition-all duration-300 mb-4"
                  >
                    Become an Ambassador {/* To Contact Page */}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Right side - extends to the very end of viewport, breaking out of grid */}
            <div className="col-span-12 lg:col-span-7 xl:col-span-8 lg:col-start-5 xl:col-start-5 relative">
              <div
                ref={destinationsScrollRef}
                className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide pl-4 sm:pl-6 lg:pl-8 cursor-grab active:cursor-grabbing"
                style={{
                  marginRight: 'calc((100vw - 100%) / -2)',
                  paddingRight: 'calc((100vw - 100%) / 2)'
                }}
                onMouseDown={(e) => {
                  isDragging.current = true;
                  startX.current = e.pageX - (destinationsScrollRef.current?.offsetLeft || 0);
                  scrollLeft.current = destinationsScrollRef.current?.scrollLeft || 0;
                }}
                onMouseLeave={() => {
                  isDragging.current = false;
                }}
                onMouseUp={() => {
                  isDragging.current = false;
                }}
                onMouseMove={(e) => {
                  if (!isDragging.current) return;
                  e.preventDefault();
                  const x = e.pageX - (destinationsScrollRef.current?.offsetLeft || 0);
                  const walk = (x - startX.current) * 2;
                  if (destinationsScrollRef.current) {
                    destinationsScrollRef.current.scrollLeft = scrollLeft.current - walk;
                  }
                }}
              >
                {[
                  { id: 1, image: '/locations/GreatOcean.jpg', distance: '900 km FROM MELBOURNE', title: 'GREAT OCEAN ROAD' },
                  { id: 2, image: '/locations/Blue mountains.jpg.webp', distance: '1,200 km FROM BRISBANE', title: 'BLUE MOUNTAINS' },
                  { id: 3, image: '/locations/kimberley.jpg', distance: '3,500 km FROM BRISBANE', title: 'KIMBERLEY' },
                  { id: 4, image: '/locations/Daly Waters.jpg', distance: '3,100 km FROM BRISBANE', title: 'DALY WATERS' },
                ].map((dest, index) => (
                  <motion.div
                    key={dest.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    className="flex-shrink-0 w-80 group cursor-pointer"
                  >
                    <div className="relative h-96 rounded-2xl overflow-hidden">
                      <Image
                        src={dest.image}
                        alt={dest.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        draggable={false}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                      {/* Content inside the card */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 pb-8">
                        <p className="text-accent text-sm font-medium tracking-wider mb-2">
                          {dest.distance}
                        </p>
                        <h3 className="text-white text-4xl lg:text-5xl font-black tracking-wide leading-tight mt-1">
                          {dest.title}
                        </h3>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Pillars */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16 xl:px-24 max-w-[1400px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trustPillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <div
                  className={`
                    group
                    flex flex-col
                    p-6 rounded-2xl
                    bg-card
                    border-2 border-border
                    transition-all duration-300 ease-out
                    hover:scale-105
                    hover:border-accent/50
                    hover:shadow-lg
                    hover:bg-accent/10
                    cursor-pointer
                  `}
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 transition-colors group-hover:bg-accent/20">
                      <pillar.icon className="w-6 h-6 text-accent transition-colors" />
                    </div>
                    <h3 className="font-sans font-bold text-foreground transition-colors group-hover:text-accent text-lg">
                      {pillar.title}
                    </h3>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Blogs Section */}
      <RecentBlogs />
    </>
  );
}