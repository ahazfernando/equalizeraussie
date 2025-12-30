'use client';

import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Users, Wrench, MapPin, Briefcase, Trophy, Calendar, Drill, Sparkles, Target, Heart, Zap, Shield } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { LucideIcon } from 'lucide-react';

interface Stat {
  label: string;
  value: number;
  suffix?: string;
  icon: LucideIcon;
}

function CountUp({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000; // 2 seconds
    const increment = end / (duration / 16); // ~60fps

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

  return <span>{count}{suffix}</span>;
}

const stats: Stat[] = [
  { label: 'Happy Clients', value: 500, suffix: '+', icon: Users },
  { label: 'Projects Completed', value: 1200, suffix: '+', icon: Briefcase },
  { label: 'Awards Won', value: 45, icon: Trophy },
  { label: 'Years Experience', value: 15, suffix: '+', icon: Calendar },
];

const values = [
  {
    icon: Award,
    title: "Quality First",
    description: "We never compromise on materials or craftsmanship. Every caravan is built to last generations.",
  },
  {
    icon: Users,
    title: "Customer Focus",
    description: "Your journey is our priority. We listen, adapt, and deliver caravans that exceed expectations.",
  },
  {
    icon: Wrench,
    title: "Innovation",
    description: "Constantly pushing boundaries with new designs, materials, and cutting-edge technologies.",
  },
  {
    icon: MapPin,
    title: "Australian Spirit",
    description: "Born from the Australian love of adventure and designed for our unique conditions.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: "easeOut" } },
};


export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <>
      {/* Hero Section - Modern Professional Design */}
      <section className="relative min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden -mt-24 pt-24 pb-0">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden="true"
          >
            <source src="/videos/about-hero.mp4" type="video/mp4" />
          </video>
          
          {/* Sophisticated Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/40 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
          
          {/* Subtle Animated Gradient Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5"
            animate={{
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Content Container */}
        <div className="container mx-auto px-4 sm:px-6 lg:pl-0 lg:pr-8 relative z-10">
          <div className="max-w-7xl">
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={containerVariants}
            >
              {/* Left Column: Content starting from column 0 */}
              <div className="lg:col-start-1 lg:col-span-7 space-y-8">
                {/* Main Heading with Enhanced Typography */}
                <motion.div variants={itemVariants} className="space-y-6">
                  <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[0.95] text-white">
                    <span className="block">Australian</span>
                    <span className="block bg-gradient-to-r from-white via-white to-white/90 bg-clip-text text-transparent">
                      Engineered.
                    </span>
                    <span className="block text-white/70 mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold">
                      Adventure Approved.
                    </span>
                  </h1>
                </motion.div>

                {/* Description with Better Typography */}
                <motion.div variants={itemVariants} className="space-y-6 max-w-2xl">
                  {/* Feature Cards - Modern Design */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    <motion.div
                      whileHover={{ scale: 1.02, y: -4 }}
                      className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-accent/50 transition-all duration-300 cursor-pointer overflow-hidden"
                    >
                      {/* Shimmer Effect */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                      
                      <div className="relative">
                        <h4 className="font-heading font-bold text-white mb-2 text-lg">100% Aussie Made</h4>
                        <p className="text-sm text-white/70 leading-relaxed">
                          Constructed with the finest materials to withstand the rugged beauty of our country.
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02, y: -4 }}
                      className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-accent/50 transition-all duration-300 cursor-pointer overflow-hidden"
                    >
                      {/* Shimmer Effect */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                      
                      <div className="relative">
                        <h4 className="font-heading font-bold text-white mb-2 text-lg">Every Terrain</h4>
                        <p className="text-sm text-white/70 leading-relaxed">
                          From on-road touring models to full off-road beasts designed for the ultimate adventure.
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  <p className="text-base sm:text-lg text-white/80 leading-relaxed font-light pt-2">
                    Discover the joy of the open road with Equalizer RV—where your adventure begins, and memories are made.
                  </p>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  variants={itemVariants}
                  className="flex flex-col sm:flex-row gap-4 pt-4"
                >
                  <Link href="/caravans">
                    <Button
                      size="lg"
                      className="group w-full sm:w-auto h-14 px-8 rounded-full bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent text-white font-semibold shadow-2xl shadow-accent/30 hover:shadow-accent/50 transition-all duration-300 border-2 border-accent/50"
                    >
                      Explore Our Models
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full sm:w-auto h-14 px-8 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-md hover:bg-white/20 hover:border-white/40 text-white font-semibold transition-all duration-300"
                    >
                      Get in Touch
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden lg:block"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-white/60"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* 
      <section className="py-20 bg-background overflow-hidden">
        <div className="container mx-auto px-0">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <motion.div className="inline-block mb-6">
              <span className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-accent/15 to-accent/5 border border-accent/30 backdrop-blur-sm shadow-lg shadow-accent/10 group text-red-500 dark:text-red-400 text-base font-semibold cursor-pointer">
                <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
                Our Achievements
              </span>
            </motion.div>
            <motion.h2 className="font-heading text-5xl sm:text-6xl lg:text-6xl font-extrabold leading-[1.1] mb-8">
              We’re proud of the impact we’ve made
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;

              return (
                <motion.div
                  key={stat.label}
                
                  className="w-full text-center md:text-left"
                >
                  <motion.div
                    className="w-full p-6 rounded-2xl bg-primary-foreground/5 backdrop-blur-sm border border-accent/20 
                     group hover:scale-105 hover:shadow-2xl hover:shadow-accent/30 cursor-pointer
                     transition-all duration-500 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
                    whileHover={{ y: -8 }}
                  >
                    <div className="order-1 md:order-2">
                      <p className="font-heading text-2xl md:text-3xl font-extrabold text-accent">
                        <CountUp end={stat.value} suffix={stat.suffix ?? ''} />
                      </p>
                    </div>

                    <div className="flex items-center gap-4 order-2 md:order-1">
                      <div className="p-3 rounded-full border-2 border-accent/40 bg-accent/10">
                        <Icon className="w-8 h-8 text-accent" />
                      </div>
                      <p className="text-md font-medium transition-colors duration-300">
                        {stat.label}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      */}

      {/* Story Section - Modern Timeline Design */}
      <section ref={sectionRef} className="relative pt-16 lg:pt-24 pb-24 lg:pb-32 overflow-hidden">
        {/* Parallax Background Image */}
        <motion.div
          style={{ y: backgroundY }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="/quote/31e88bd802b9df4f18ec8e4549bf2f4f.jpg"
            alt="Background"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/70 to-black/90" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />
        </motion.div>

        {/* Background Pattern Overlay */}
        <div className="absolute inset-0 z-[1] opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <motion.div
            className="text-center mb-8 lg:mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <motion.div className="inline-block mb-4">
              <span className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-accent/20 via-accent/10 to-accent/5 border border-accent/40 backdrop-blur-md shadow-2xl shadow-accent/20 text-red-500 dark:text-red-400 text-sm sm:text-base font-semibold">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
                </span>
                Our Journey
              </span>
            </motion.div>
            <motion.h2 
              variants={fadeInUp}
              className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95] text-white mb-4"
            >
              Born From <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-accent to-white">True Passion</span>
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed"
            >
              Equalizer RV started with a simple question: why choose between rugged capability and luxury?
            </motion.p>
          </motion.div>

          {/* Timeline */}
          <div className="max-w-5xl mx-auto relative pt-8">
            {/* Timeline Line */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-accent/50 via-accent/30 to-transparent" 
              style={{ top: '2rem', bottom: '0' }} />

            {/* Timeline Items */}
            <div className="space-y-16 lg:space-y-24 relative">
              {[
                {
                  year: "2008",
                  title: "The Vision",
                  description: "Founded with a dream to create caravans that combine rugged Australian capability with uncompromising luxury.",
                  icon: Target,
                  side: "left",
                  image: "/images/caravan-lifestyle-1.jpg"
                },
                {
                  year: "2012",
                  title: "First Production",
                  description: "Launched our first model, setting new standards in Australian caravan manufacturing with hand-finished quality.",
                  icon: Zap,
                  side: "right",
                  image: "/images/caravan-lifestyle-2.jpg"
                },
                {
                  year: "2018",
                  title: "Expansion",
                  description: "Opened our state-of-the-art Melbourne facility, combining traditional craftsmanship with aerospace engineering.",
                  icon: Award,
                  side: "left",
                  image: "/images/caravan-lifestyle-3.jpg"
                },
                {
                  year: "2024",
                  title: "Innovation Leader",
                  description: "Recognized as Australia's premier caravan manufacturer, with thousands of happy adventurers exploring the country.",
                  icon: Sparkles,
                  side: "right",
                  image: "/images/caravan-lifestyle-4.jfif"
                }
              ].map((milestone, index) => {
                const Icon = milestone.icon;
                const isLeft = milestone.side === "left";
                
                return (
                  <motion.div
                    key={milestone.year}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={{
                      hidden: { opacity: 0, y: 50 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.8, delay: index * 0.2 }
                      }
                    }}
                    className={`relative flex flex-col lg:flex-row items-center gap-8 ${
                      isLeft ? 'lg:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Timeline Node */}
                    <div className="relative z-10 flex-shrink-0">
                      <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center shadow-2xl shadow-accent/30 border-4 border-black">
                        <Icon className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                      </div>
                      <div className="absolute inset-0 rounded-full bg-accent/20 blur-xl -z-10 animate-pulse" />
                    </div>

                    {/* Content Card */}
                    <div className={`flex-1 w-full lg:max-w-md ${isLeft ? 'lg:text-right' : ''}`}>
                      <motion.div
                        whileHover={{ scale: 1.02, y: -4 }}
                        className="group relative p-8 lg:p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-accent/50 transition-all duration-500 overflow-hidden"
                      >
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        
                        <div className="relative">
                          <div className={`flex items-center gap-4 mb-4 ${isLeft ? 'lg:justify-end' : ''}`}>
                            <span className="text-accent font-bold text-2xl lg:text-3xl tracking-tight">{milestone.year}</span>
                            <div className="h-px flex-1 bg-gradient-to-r from-accent/50 to-transparent" 
                              style={isLeft ? { background: 'linear-gradient(to left, rgba(239, 68, 68, 0.5), transparent)' } : {}} />
                          </div>
                          
                          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                            {milestone.title}
                          </h3>
                          
                          <p className="text-white/70 leading-relaxed text-base lg:text-lg">
                            {milestone.description}
                          </p>
                        </div>
                      </motion.div>
                    </div>

                    {/* Image */}
                    <div className={`hidden lg:block flex-1 max-w-sm ${isLeft ? 'lg:order-first' : ''}`}>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 + 0.3, duration: 0.6 }}
                        className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl border border-white/10 group"
                      >
                        <Image
                          src={milestone.image}
                          alt={milestone.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Stats */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="mt-20 lg:mt-32 grid grid-cols-2 gap-6 lg:gap-8"
            >
              {[
                { value: "100%", label: "Hand Finished" },
                { value: "Local", label: "Melbourne Made" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-accent/50 transition-all duration-300 cursor-pointer group"
                >
                  <div className="text-4xl lg:text-5xl font-bold text-white mb-2 group-hover:text-accent transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-sm lg:text-base text-white/60 uppercase tracking-widest">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section - Interactive Asymmetric Layout */}
      <section className="relative py-24 lg:py-32 bg-black overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
            animate={{
              x: [0, -100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <motion.div
            className="text-center mb-16 lg:mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <motion.div className="inline-block mb-6">
              <span className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-accent/20 via-accent/10 to-accent/5 border border-accent/40 backdrop-blur-md shadow-2xl shadow-accent/20 text-red-500 dark:text-red-400 text-sm sm:text-base font-semibold">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
                </span>
                Our Values
              </span>
            </motion.div>
            <motion.h2 
              variants={fadeInUp}
              className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95] text-white mb-6"
            >
              What We <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-accent to-white">Stand For</span>
            </motion.h2>
          </motion.div>

          {/* Asymmetric Grid Layout */}
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
              {/* Large Featured Value (Top Left) */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.8 }
                  }
                }}
                whileHover={{ scale: 1.02, y: -8 }}
                className="lg:col-span-7 lg:row-span-2 group relative"
              >
                <div className="h-full p-8 lg:p-12 rounded-3xl bg-gradient-to-br from-accent/20 via-accent/10 to-accent/5 backdrop-blur-xl border border-accent/30 hover:border-accent/50 transition-all duration-500 overflow-hidden">
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                      backgroundSize: '30px 30px'
                    }} />
                  </div>
                  
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div>
                      <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Award className="w-8 h-8 text-accent" />
                      </div>
                      <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                        {values[0].title}
                      </h3>
                      <p className="text-white/80 text-lg lg:text-xl leading-relaxed">
                        {values[0].description}
                      </p>
                    </div>
                    <div className="mt-8 pt-8 border-t border-white/10">
                      <div className="flex items-center gap-2 text-accent">
                        <span className="text-sm font-semibold uppercase tracking-wider">Core Principle</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Medium Value Cards */}
              {values.slice(1, 3).map((value, index) => (
                <motion.div
                  key={value.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.8, delay: (index + 1) * 0.2 }
                    }
                  }}
                  whileHover={{ scale: 1.03, y: -6 }}
                  className={`lg:col-span-5 group relative ${index === 1 ? 'lg:row-span-2' : ''}`}
                >
                  <div className="h-full p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-accent/50 transition-all duration-500 overflow-hidden">
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    
                    <div className="relative z-10 h-full flex flex-col">
                      <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                        <value.icon className="w-7 h-7 text-accent" />
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                        {value.title}
                      </h3>
                      <p className="text-white/70 text-base lg:text-lg leading-relaxed flex-grow">
                        {value.description}
                      </p>
                      {index === 1 && (
                        <div className="mt-6 pt-6 border-t border-white/10">
                          <div className="flex items-center gap-2 text-accent/80">
                            <Heart className="w-5 h-5" />
                            <span className="text-sm font-medium">Customer First</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Bottom Value Card (Full Width) */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.8, delay: 0.6 }
                  }
                }}
                whileHover={{ scale: 1.01, y: -4 }}
                className="lg:col-span-12 group relative"
              >
                <div className="p-8 lg:p-12 rounded-3xl bg-gradient-to-r from-white/5 via-white/5 to-accent/5 backdrop-blur-xl border border-white/10 hover:border-accent/50 transition-all duration-500 overflow-hidden">
                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-8">
                    <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      {(() => {
                        const Icon = values[3].icon;
                        return <Icon className="w-8 h-8 text-accent" />;
                      })()}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl lg:text-4xl font-bold text-white mb-4">
                        {values[3].title}
                      </h3>
                      <p className="text-white/70 text-lg lg:text-xl leading-relaxed max-w-3xl">
                        {values[3].description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-accent">
                      <MapPin className="w-6 h-6" />
                      <span className="text-sm font-semibold uppercase tracking-wider">Australian Made</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Manufacturing Section - Process Flow Design */}
      <section className="relative py-24 lg:py-32 bg-gradient-to-b from-black via-black to-black/95 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/5 to-transparent" />
          <div className="hidden lg:block absolute -bottom-20 right-12 text-[20rem] font-bold text-white/5 select-none pointer-events-none uppercase tracking-tighter">
            Melbourne
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <motion.div
            className="text-center mb-16 lg:mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <motion.div className="inline-block mb-6">
              <span className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-accent/20 via-accent/10 to-accent/5 border border-accent/40 backdrop-blur-md shadow-2xl shadow-accent/20 text-red-500 dark:text-red-400 text-sm sm:text-base font-semibold">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
                </span>
                Our Manufacturing
              </span>
            </motion.div>
            <motion.h2 
              variants={fadeInUp}
              className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95] text-white mb-6"
            >
              Crafted in <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-accent to-white">Melbourne</span>
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed"
            >
              Our state-of-the-art manufacturing facility in Melbourne's south-east is where the magic happens. We blend traditional joinery with aerospace engineering.
            </motion.p>
          </motion.div>

          {/* Process Flow */}
          <div className="max-w-6xl mx-auto">
            {/* Process Steps */}
            <div className="space-y-8 lg:space-y-12">
              {[
                {
                  step: "01",
                  title: "Design & Engineering",
                  description: "Every caravan begins with meticulous design and precision engineering, combining traditional craftsmanship with modern technology.",
                  icon: Target,
                  color: "from-blue-500/20 to-blue-500/5",
                  borderColor: "border-blue-500/30"
                },
                {
                  step: "02",
                  title: "Material Selection",
                  description: "We source only the finest materials - locally-milled Australian timbers, European high-performance appliances, and precision-cut chassis components.",
                  icon: Award,
                  color: "from-accent/20 to-accent/5",
                  borderColor: "border-accent/30"
                },
                {
                  step: "03",
                  title: "Hand Craftsmanship",
                  description: "Skilled artisans hand-finish every detail, ensuring quality that lasts generations. Every caravan is 100% hand-finished in our Melbourne facility.",
                  icon: Wrench,
                  color: "from-purple-500/20 to-purple-500/5",
                  borderColor: "border-purple-500/30"
                },
                {
                  step: "04",
                  title: "Quality Assurance",
                  description: "Rigorous testing and quality checks ensure every Equalizer RV meets our exacting standards before it leaves our facility.",
                  icon: Shield,
                  color: "from-green-500/20 to-green-500/5",
                  borderColor: "border-green-500/30"
                }
              ].map((process, index) => {
                const Icon = process.icon;
                const isEven = index % 2 === 0;
                
                return (
                  <motion.div
                    key={process.step}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={{
                      hidden: { opacity: 0, x: isEven ? -50 : 50 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: { duration: 0.8, delay: index * 0.2 }
                      }
                    }}
                    whileHover={{ scale: 1.02, y: -4 }}
                    className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12 ${
                      isEven ? '' : 'lg:flex-row-reverse'
                    }`}
                  >
                    {/* Step Number & Icon */}
                    <div className="flex-shrink-0 relative">
                      <div className={`w-24 h-24 lg:w-32 lg:h-32 rounded-3xl bg-gradient-to-br ${process.color} backdrop-blur-xl border-2 ${process.borderColor} flex items-center justify-center shadow-2xl relative group`}>
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative z-10 text-center">
                          <div className="text-2xl lg:text-3xl font-bold text-white mb-1">{process.step}</div>
                          <Icon className="w-6 h-6 lg:w-8 lg:h-8 text-white/80 mx-auto" />
                        </div>
                      </div>
                      {/* Connecting Line (Desktop) */}
                      {index < 3 && (
                        <div className={`hidden lg:block absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 h-12 bg-gradient-to-b ${process.color.replace('from-', 'from-').replace('to-', 'to-')}`} />
                      )}
                    </div>

                    {/* Content Card */}
                    <div className="flex-1 w-full">
                      <div className={`p-8 lg:p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-accent/50 transition-all duration-500 group overflow-hidden`}>
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        
                        <div className="relative z-10">
                          <h3 className="text-2xl lg:text-4xl font-bold text-white mb-4">
                            {process.title}
                          </h3>
                          <p className="text-white/70 text-base lg:text-lg leading-relaxed">
                            {process.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Visual Element (Alternating) */}
                    {index === 0 && (
                      <div className="hidden lg:block flex-shrink-0 w-64">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 }}
                          className="relative rounded-2xl overflow-hidden aspect-square shadow-2xl border border-white/10 group"
                        >
                          <video
                            autoPlay loop muted playsInline
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          >
                            <source src="/videos/about-manu.mp4" type="video/mp4" />
                          </video>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4">
                            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white opacity-80">
                              <MapPin className="w-3 h-3" /> Melbourne Facility
                            </p>
                          </div>
                        </motion.div>
                      </div>
                    )}
                    {index === 1 && (
                      <div className="hidden lg:block flex-shrink-0 w-64">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 }}
                          className="relative rounded-2xl overflow-hidden aspect-square shadow-2xl border border-white/10 group"
                        >
                          <Image
                            src="/images/aboutFactory.jpg"
                            alt="Manufacturing"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        </motion.div>
                      </div>
                    )}
                    {index === 2 && (
                      <div className="hidden lg:block flex-shrink-0 w-64">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 }}
                          className={`relative rounded-2xl overflow-hidden aspect-square shadow-2xl border-2 ${process.borderColor} bg-gradient-to-br ${process.color} p-8 flex flex-col justify-between`}
                        >
                          <Drill className="w-16 h-16 text-white/80" />
                          <div>
                            <h4 className="text-2xl font-bold text-white mb-1">Precision</h4>
                            <p className="text-sm text-white/70 uppercase tracking-tight">Engineering</p>
                          </div>
                        </motion.div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Feature Highlights */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="mt-20 lg:mt-32 grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {[
                "Locally-milled Australian timbers",
                "European high-performance appliances",
                "Precision-cut chassis engineering"
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-accent/50 transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-accent group-hover:scale-150 transition-transform" />
                    <p className="text-white/80 font-medium">{feature}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="mt-16 text-center"
            >
              <Link href="/caravans">
                <Button className="group h-16 px-12 bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent rounded-full text-white font-semibold shadow-2xl shadow-accent/30 hover:shadow-accent/50 transition-all duration-300 border-2 border-accent/50">
                  <span className="text-base lg:text-lg">Visit Our Showroom</span>
                  <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}