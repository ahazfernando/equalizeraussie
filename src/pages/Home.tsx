"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Shield, Wrench, Award, MapPin, Star, ChevronRight, Check, Sparkles, Heart } from "lucide-react";
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

      {/* Social Proof Banner */}
      <section className="py-16 bg-background border-y border-border/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Avatars + Text */}
            <div className="flex items-center gap-6">
              <div className="flex -space-x-3">
                {['JT', 'MK', 'SR', 'LC', 'PW'].map((initials, i) => (
                  <div 
                    key={i} 
                    className="w-12 h-12 rounded-full bg-primary/80 border-2 border-background flex items-center justify-center text-primary-foreground text-sm font-medium"
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-lg font-bold tracking-wide">JOIN 1,200+ ADVENTURERS</p>
                <p className="text-muted-foreground">Who chose Equalizer RV for their journey</p>
              </div>
            </div>
            
            {/* Stats */}
            <div className="flex items-center gap-8 lg:gap-12">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-2xl font-bold text-primary">
                  4.9<Star className="w-5 h-5 fill-primary" />
                </div>
                <p className="text-sm text-muted-foreground">Google Reviews</p>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="text-center">
                <p className="text-2xl font-bold">15+</p>
                <p className="text-sm text-muted-foreground">Years in Business</p>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="text-center">
                <p className="text-2xl font-bold">50M+</p>
                <p className="text-sm text-muted-foreground">Km Travelled</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lifestyle Split Section */}
      <section className="py-0">
        <div className="grid lg:grid-cols-2 min-h-[600px]">
          <div className="relative h-[400px] lg:h-auto overflow-hidden">
            <Image 
              src="/images/caravan-interior.jpg" 
              alt="Luxury RV Interior" 
              fill
              className="object-cover"
            />
            {/* Gradient overlay to blend with background */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/40 to-background" />
          </div>
          <div className="bg-background flex items-center p-12 lg:p-20">
            <div className="max-w-lg">
              <span className="text-primary font-semibold tracking-widest text-sm">LIFESTYLE</span>
              <h2 className="text-4xl lg:text-5xl font-bold mt-4 mb-8 leading-tight">
                MORE THAN<br />A CARAVAN
              </h2>
              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-lg mb-1">FREEDOM</h4>
                    <p className="text-muted-foreground">Wake up wherever you choose. No bookings, no schedules.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-lg mb-1">CONNECTION</h4>
                    <p className="text-muted-foreground">Quality time with family, away from the daily grind.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-lg mb-1">ADVENTURE</h4>
                    <p className="text-muted-foreground">Explore hidden gems that hotels will never show you.</p>
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

      {/* Benefits Section with Video Background */}
      <section className="relative min-h-[800px] lg:min-h-screen flex items-center overflow-hidden bg-black">
        {/* Video Background */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
        >
          <source src="/videos/contact-hero.mp4" type="video/mp4" />
        </video>
        
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
                  className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight"
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
                    title: "Premium Quality & Durability",
                    description: "Built to last with superior craftsmanship and materials",
                    icon: Shield
                  },
                  {
                    title: "Australian Made & Tested",
                    description: "Designed specifically for Australian conditions",
                    icon: Award
                  },
                  {
                    title: "Comprehensive Warranty",
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
                          <h3 className="text-base md:text-lg font-bold text-white mb-1 group-hover:text-accent transition-colors">
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
      <section className="relative py-20 lg:py-32 bg-black overflow-hidden">
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
                    className="border-2 border-white/20 bg-transparent hover:bg-white/10 text-white rounded-full px-6 py-3 font-medium transition-all duration-300"
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
                className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight"
              >
                Connect with Experts <br />and Find Your Perfect Caravan
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-white/80 text-base md:text-lg leading-relaxed max-w-xl"
              >
                Join thousands of adventurers across Australia who are discovering their dream caravans with guidance from our authorized dealer.
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
                    Explore our Options
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
              className="relative lg:absolute lg:-right-[12vw] xl:-right-[18vw] lg:top-[5%] lg:-translate-y-1/2 w-full lg:w-[70vw] xl:w-[65vw] flex items-center justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-none lg:max-w-[1400px] flex items-center">
                <Image
                  src="/images/taskcaravanv.png"
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
                className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.4] tracking-tight"
              >
                Where Adventure Meets<br />
                <span className="bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">
                  luxury and Exotic Comfort
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
                  Adventure-ready strength meets refined family comfort in every Equalizer RV. Thoughtfully built, down to the finest detail.
                </p>
                <Link href="/caravans" className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors font-medium">
                  View more
                  <ArrowRight className="w-4 h-4" />
                </Link>
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
                  src="/images/caravan-lifestyle-3.jpg"
                  alt="Premium caravan lifestyle"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                    Unwind, Build, and<br />
                    Perfect Your Journey
                  </h2>
                  <p className="text-white/70 text-lg mb-6 max-w-md">
                    A construction experience unlike any other. Where strength meets precision in every weld.
                  </p>
                  <Link href="/caravans">
                    <Button className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-white/90 transition-colors">
                      Discover
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

      {/* Trust Pillars */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                    <h3 className="font-heading font-semibold text-foreground transition-colors group-hover:text-accent">
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

      {/* Lifestyle Section – Enhanced with Framer Motion & Responsive Improvements */}
      <section className="py-20 bg-black overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Text Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="space-y-8 order-2 lg:order-1"
            >
              <div>
                <div className="inline-block mb-6">
                  <span className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-accent/15 to-accent/5 border border-accent/30 backdrop-blur-sm shadow-lg shadow-accent/10 group text-red-500 dark:text-red-400 text-base font-semibold cursor-pointer">
                    <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
                    The Equalizer Difference
                  </span>
                </div>
                <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight">
                  Built for Australia.<br />
                  Designed for You.
                </h2>
              </div>

              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                Every Equalizer RV is engineered from the ground up to handle
                Australia&apos;s diverse terrain and climate. From the red dust of the
                outback to the salt spray of coastal highways, our caravans are
                built to go wherever your adventure takes you.
              </p>

              <ul className="space-y-5">
                {[
                  "Heavy-duty chassis and suspension systems",
                  "Premium Australian-sourced materials",
                  "Comprehensive off-grid capability",
                  "Thoughtful, practical layouts",
                ].map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, duration: 0.5 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
                      <ChevronRight className="w-5 h-5 text-foreground" />
                    </div>
                    <span className="text-foreground text-base sm:text-lg">{item}</span>
                  </motion.li>
                ))}
              </ul>

              <Link href="/about" className="inline-block mt-8">
                <Button
                  size="lg"
                  className="border-accent bg-accent border-2 text-foreground hover:bg-accent/90 rounded-full shadow-lg"
                >
                  Learn Our Story
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>

            {/* Image Collage – Mobile-first stacking */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="relative order-1 lg:order-2"
            >
              <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
                {/* Mobile: full width stacked, Tablet/Desktop: side-by-side */}
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  >
                    <Image
                      src="/images/caravan-lifestyle-1.jpg"
                      alt="Caravan tackling the Australian outback"
                      width={600}
                      height={800}
                      className="rounded-3xl w-full object-cover shadow-2xl hover:scale-105 transition-transform duration-500"
                      priority
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <Image
                      src="/images/caravan-lifestyle-2.jpg"
                      alt="Couple relaxing by their caravan at sunset"
                      width={600}
                      height={600}
                      className="rounded-3xl w-full object-cover shadow-2xl hover:scale-105 transition-transform duration-500"
                    />
                  </motion.div>
                </div>

                <div className="space-y-6 sm:pt-12">
                  <motion.div
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    <Image
                      src="/images/caravan-lifestyle-2.jpg"
                      alt="Interior or off-road adventure with Equalizer caravan"
                      width={600}
                      height={700}
                      className="rounded-3xl w-full object-cover shadow-2xl hover:scale-105 transition-transform duration-500"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    <Image
                      src="/images/caravan-lifestyle-1.jpg"
                      alt="Family enjoying campsite with Equalizer caravan"
                      width={600}
                      height={500}
                      className="rounded-3xl w-full object-cover shadow-2xl hover:scale-105 transition-transform duration-500"
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Recent Blogs Section */}
      <RecentBlogs />
    </>
  );
}