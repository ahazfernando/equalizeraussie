"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Sparkles, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const models = [
  { 
    id: "cruzer", 
    name: "Cruzer", 
    logo: "/caravanlogos/CruzerLogo.png", 
    color: "bg-blue-500",
    bgColor: "bg-white",
    description: "Perfect on-road luxury"
  },
  { 
    id: "rebel", 
    name: "Rebel", 
    logo: "/caravanlogos/RebelLogo.png", 
    color: "bg-yellow-500",
    bgColor: "bg-white",
    description: "Semi-offroad adventure"
  },
  { 
    id: "rogue", 
    name: "Rogue", 
    logo: "/caravanlogos/RogueLogo.png", 
    color: "bg-green-500",
    bgColor: "bg-white",
    description: "Ultimate off-road"
  },
];

const stats = [
  { label: "Happy Customers", value: "500+", icon: Star },
  { label: "Years Experience", value: "15+", icon: TrendingUp },
  { label: "Award Winning", value: "10+", icon: Sparkles },
];

export function HeroHeader() {
  const [selectedModel, setSelectedModel] = useState("rogue");

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-background via-background to-muted/20 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-accent/10 via-accent/5 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-gradient-to-tr from-accent/8 via-accent/3 to-transparent rounded-full blur-3xl" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />
        
        {/* Shimmer Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-10 animate-fade-up">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-accent/15 to-accent/5 border border-accent/30 backdrop-blur-sm shadow-lg shadow-accent/10 group hover:scale-105 transition-transform duration-300">
              <div className="relative">
                <span className="absolute inset-0 w-3 h-3 rounded-full bg-accent animate-ping opacity-75" />
                <span className="relative w-2.5 h-2.5 rounded-full bg-accent" />
              </div>
              <span className="text-accent font-semibold text-sm tracking-wide">
                Premium Australian Caravans
              </span>
            </div>

            {/* Main Heading with Gradient */}
            <div className="space-y-6">
              <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-[1.1]">
                <span className="block text-foreground">Having Luxury</span>
                <span className="block text-foreground">Caravan</span>
                <span className="block bg-gradient-to-r from-accent via-accent to-accent/80 bg-clip-text text-transparent relative inline-block">
                  For Every Journey!
                  <span className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-accent/20 via-accent/40 to-accent/20 blur-xl" />
                </span>
              </h1>
              <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed max-w-xl font-medium">
                Experience the freedom of the open road with our premium range of 
                Australian-built caravans. Quality, comfort, and adventure await.
              </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="group relative overflow-hidden rounded-xl bg-card/60 backdrop-blur-sm border border-border/50 p-4 hover:border-accent/30 hover:bg-card/80 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <stat.icon className="w-5 h-5 text-accent mb-2" />
                  <div className="font-heading text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Model Selector - Enhanced */}
            <div className="space-y-4 pt-2">
              <p className="text-sm font-semibold text-foreground uppercase tracking-wider">See Category</p>
              <div className="flex items-center gap-3 flex-wrap">
                {models.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => setSelectedModel(model.id)}
                    className={`group relative flex flex-col items-center gap-2 px-6 py-4 rounded-2xl transition-all duration-500 overflow-hidden ${
                      selectedModel === model.id
                        ? `bg-gradient-to-br ${model.color} text-black shadow-2xl shadow-${model.bgColor}/30 hover:scale-110`
                        : `bg-muted/60 hover:bg-muted text-${model.color} hover:text-${model.color} border-2 border-transparent hover:scale-110 hover:border-border`
                    }`}
                  >
                    {/* Background gradient on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${model.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                    
                    <div className={`relative w-14 h-14 rounded-full ${model.bgColor} flex items-center justify-center overflow-hidden shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                      <Image
                        src={model.logo}
                        alt={model.name}
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                    <div className="relative z-10 text-center">
                      <span className="font-bold text-sm sm:text-base block">{model.name}</span>
                      {selectedModel === model.id && (
                        <CheckCircle2 className="w-4 h-4 mx-auto mt-1" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Buttons - Enhanced */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link href="/caravans" className="group">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent text-accent-foreground px-10 h-16 text-lg font-bold shadow-2xl shadow-accent/30 hover:shadow-accent/40 hover:scale-105 transition-all duration-300"
                >
                  Explore Models
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/contact" className="group">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full sm:w-auto border-2 border-foreground/20 hover:border-accent/90 hover:bg-accent/5 hover:text-accent/90 px-10 h-16 text-lg font-semibold backdrop-blur-sm hover:scale-105 transition-all duration-300"
                >
                  Book a Viewing
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Image - Enhanced */}
          <div className="relative lg:min-h-[700px] flex items-center justify-center">
            {/* Floating info bubble - Enhanced */}
            <div className="absolute top-5 right-5 lg:top-20 lg:right-20 z-30 animate-fade-up">
              <div className="relative group">
                <div className="absolute inset-0 bg-accent/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative bg-gradient-to-br from-accent to-accent/90 backdrop-blur-md text-accent-foreground px-6 py-5 rounded-2xl shadow-2xl lg:max-w-[300px] border border-accent-foreground/20">
                  <div className="absolute -bottom-2 left-10 w-4 h-4 bg-accent rotate-45 border-r border-b border-accent-foreground/20" />
                  <p className="text-sm font-semibold leading-relaxed">
                    Affordable, Reliable, And Available At Your Fingertips!
                  </p>
                  {/* Connecting line */}
                  <div className="absolute -bottom-4 left-12 w-0.5 h-12 bg-gradient-to-b from-accent/50 to-transparent" />
                  <div className="absolute -bottom-14 left-12 w-3 h-3 rounded-full bg-accent shadow-lg animate-pulse" />
                </div>
              </div>
            </div>

            {/* Main Caravan Image - Enhanced */}
            <div className="relative w-full h-full max-w-3xl">
              <div className="relative aspect-[4/3] lg:aspect-square">
                {/* Glow rings */}
                <div className="absolute inset-0 rounded-full border-4 border-accent/10 blur-2xl scale-150" />
                <div className="absolute inset-0 rounded-full border-2 border-accent/20 blur-xl scale-125" />
                
                {/* Image container with 3D effect */}
                <div className="relative w-full h-full transform perspective-1000 group">
                  <div className="relative w-full h-full transform transition-transform duration-700 group-hover:scale-105 group-hover:rotate-1">
                    <Image
                      src="/home/caravanheader.png"
                      alt="Premium Equalizer RV Caravan"
                      fill
                      className="object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  
                  {/* Multiple glow effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-transparent to-transparent blur-3xl opacity-60" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent" />
                  
                  {/* Shine overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

