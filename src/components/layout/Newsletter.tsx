"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import Image from "next/image";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription here
    console.log("Subscribing email:", email);
    setEmail("");
  };

  return (
    <section className="relative overflow-hidden rounded-3xl mx-4 mt-4 mb-4" style={{ backgroundColor: '#C9184A' }}>
      {/* Pattern Background - Cardgroovy.png above pink background, below content */}
      <div className="absolute inset-0 z-[1]">
        <Image
          src="/footer/Cardgroovy.png"
          alt="Pattern Background"
          fill
          className="object-cover opacity-10"
          priority
        />
      </div>
      
      <div className="container mx-auto px-4 py-8 md:py-10 lg:py-12 relative z-[2]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center relative">
          {/* Left Side - Text and Form */}
          <div className="relative z-[3] text-white space-y-3">
            <h2 className="text-2xl font-semibold leading-tight">
              Subscribe to our Newsletter for
              <br />
              Latest updates on a range of new Flavors
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-2">
              {/* Combined capsule-shaped container */}
              <div className="flex items-center bg-white rounded-[32px] h-[52px] overflow-hidden p-1">
                {/* Email input section */}
                <div className="relative flex-1 flex items-center h-full">
                  <Mail className="absolute left-4 w-5 h-5 text-black z-10" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-full pl-11 pr-4 bg-transparent border-0 outline-none text-black placeholder:text-black/60 focus:outline-none"
                    required
                  />
                </div>
                {/* Subscribe button inside the container */}
                <Button
                  type="submit"
                  className="h-[44px] bg-black text-white hover:bg-gray-800 rounded-[24px] px-6 sm:px-8 whitespace-nowrap flex-shrink-0"
                >
                  Subscribe
                </Button>
              </div>
            </form>
            
            <p className="text-white/90 text-sm">
              Stay ahead with the latest updates, insights, and events
            </p>
          </div>
          
          {/* Right Side - Image */}
          <div className="relative lg:absolute lg:-right-40 lg:-top-50 w-full lg:w-[40%] xl:w-[65%] 2xl:w-[70%] overflow-visible order-first lg:order-last">
            <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[200px] xl:h-[200px] 2xl:h-[200px]">
              <Image
                src="/footer/RebelEqualizerD1V2.png"
                alt="Equalizer RV"
                className="w-full h-full object-contain relative z-[3]"
                width={1000}
                height={1000}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;

