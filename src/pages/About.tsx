'use client';

import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Users, Wrench, MapPin, Briefcase, Trophy, Calendar, Drill } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
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
  return (
    <>
      {/* Hero Section - Modern Professional Design */}
      <section className="relative min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden -mt-24 pt-24">
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

      {/* Story Section */}
      <section className="relative py-20 bg-black overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16 items-center">

            {/* Left Column: Visual Storytelling */}
            <motion.div className="lg:col-span-6 relative order-2 lg:order-1">
              <div className="relative group">
                {/* Main Video Container */}
                <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl border border-white/10">
                  <video
                    autoPlay loop muted playsInline
                    className="absolute inset-0 w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                  >
                    <source src="/videos/about-story.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-transparent" />
                </div>

                {/* Floating Detail Image (Parallax Effect) */}
                <motion.div
                  className="absolute -bottom-10 -right-6 lg:-right-12 w-1/2 aspect-square rounded-2xl overflow-hidden border-8 border-background shadow-2xl hidden lg:block"
                >
                  <Image
                    src="/images/caravan-lifestyle-1.jpg"
                    alt="Artisan craftsmanship"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Right Column: Narrative */}
            <div className="lg:col-span-6 space-y-8 order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-accent/15 to-accent/5 border border-accent/30 backdrop-blur-sm shadow-lg shadow-accent/10 group text-red-500 dark:text-red-400 text-base font-semibold cursor-pointer">
                    <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
                    Our Story
                  </span>

                </div>

                <h2 className="text-3xl md:text-7xl font-bold tracking-tight leading-[0.95] mb-10">
                  Born From <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-accent"> True Passion.</span>
                </h2>

                <div className="space-y-6">
                  <p className="text-xl text-foreground font-medium leading-relaxed">
                    Equalizer RV started with a simple question: why choose between rugged capability and luxury?
                  </p>

                  <p className="text-muted-foreground font-light leading-relaxed text-lg">
                    From our Melbourne manufacturing facility, we combine traditional craftsmanship with modern engineering. Every caravan is hand-finished by skilled artisans who share our passion for quality.
                  </p>

                  <div className="pt-8 grid grid-cols-2 gap-8 border-t border-border">
                    <div className="border border-border p-4 rounded-2xl hover:border-accent/50 cursor-pointer">
                      <span className="block md:text-3xl font-bold">100%</span>
                      <span className="md:text-sm text-xs text-muted-foreground tracking-widest">Hand Finished</span>
                    </div>
                    <div className="border border-border p-4 rounded-2xl hover:border-accent/50 cursor-pointer">
                      <span className="block md:text-3xl font-bold">Local</span>
                      <span className="md:text-sm text-xs text-muted-foreground tracking-widest">Melbourne Made</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-0 bg-black">
        <div className="container mx-auto">
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
                Our Values
              </span>
            </motion.div>
            <motion.h2 className="font-heading text-5xl sm:text-6xl lg:text-6xl font-semibold leading-[1.1] mb-8">
              What We Stand For
            </motion.h2>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {values.map((pillar, index) => (
              <motion.div
                key={pillar.title}

                whileHover={{ scale: 1.05, y: -10 }}
                className="group flex flex-col p-6 rounded-2xl bg-card border-2 border-border transition-all duration-300 ease-out hover:border-accent/50 hover:shadow-lg hover:bg-accent/10 cursor-pointer"
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
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Manufacturing */}
      <section className="relative py-20 bg-black overflow-hidden">
        {/* Background Decorative Text */}
        <div className="hidden md:block absolute -bottom-10 right-12 text-[16rem] font-bold text-white/10 select-none pointer-events-none uppercase tracking-tighter">
          Melbourne
        </div>

        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16 items-center">

            {/* Left Column: Bento Grid Visuals */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4 order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="col-span-2 relative h-80 rounded-3xl overflow-hidden group shadow-2xl"
              >
                <video
                  autoPlay loop muted playsInline
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                >
                  <source src="/videos/about-manu.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-80">
                    <MapPin className="w-3 h-3" /> Melbourne Facility
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative h-60 rounded-3xl overflow-hidden shadow-xl"
              >
                <Image
                  src="/images/aboutFactory.jpg"
                  alt="Detail"
                  fill
                  className="object-cover"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="bg-accent rounded-3xl p-8 flex flex-col justify-between text-white shadow-xl"
              >
                <Drill className="w-10 md:w-20 h-10 md:h-20 stroke-1" />
                <div>
                  <h3 className="text-xl md:text-3xl font-bold">Precision</h3>
                  <p className="text-sm opacity-80 uppercase tracking-tight">Engineering</p>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Text Content */}
            <motion.div
              className="lg:col-span-6 space-y-8 order-1 lg:order-2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div>
                <span className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-accent/15 to-accent/5 border border-accent/30 backdrop-blur-sm shadow-lg shadow-accent/10 group text-red-500 dark:text-red-400 text-base font-semibold cursor-pointer">
                  <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
                  Our Manufacturer
                </span>

                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-none my-8 tracking-tighter">
                  Crafted in<span className="text-accent"> Melbourne.</span>
                </h2>

                <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-xl">
                  Our state-of-the-art manufacturing facility in Melbourne{"'"}s south-east is where the magic happens. We blend <span className="text-foreground font-medium">traditional joinery</span> with <span className="text-foreground font-medium">aerospace engineering</span>.
                </p>
              </div>

              {/* Feature List */}
              <ul className="space-y-4 border-l-2 border-border pl-6">
                {[
                  "Locally-milled Australian timbers",
                  "European high-performance appliances",
                  "Precision-cut chassis engineering"
                ].map((text, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + (i * 0.1) }}
                    className="flex items-center gap-3 text-sm font-medium"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {text}
                  </motion.li>
                ))}
              </ul>

              <div className="pt-4">
                <Link href="/caravans">
                  <Button className="group h-16 px-10 bg-accent hover:bg-accent/90 rounded-full text-foreground transition-transform duration-300">
                    <span className="text-base font-semibold">Visit Our Showroom</span>
                    <div className="ml-4 p-2 bg-white/20 rounded-full group-hover:translate-x-1 transition-transform">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </Button>
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
}