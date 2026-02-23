"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const models = [
  {
    id: "cruzer",
    name: "Cruzer",
    logo: "/header/cruzerlogo.png",
  },
  {
    id: "rebel",
    name: "Rebel",
    logo: "/header/rebelloogo.png",
  },
  {
    id: "rogue",
    name: "Rogue",
    logo: "/header/rogurelogo.png",
  },
];

export function HeroHeader() {
  return (
    <section className="relative min-h-screen lg:min-h-[120vh] flex items-center overflow-hidden -mt-24 pt-24">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/header/nighttimervfeealing.png"
          alt="Header Background"
          fill
          className="object-cover scale-105 animate-[zoom_20s_ease-in-out_infinite_alternate]"
          priority
          sizes="100vw"
        />
        {/* Enhanced Gradient Overlay for better depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/60" />
        {/* Vignette effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-40" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-10 text-center lg:text-left"
          >
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block"
            >
              <span className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-gradient-to-r from-accent/20 to-accent/10 border-2 border-accent/40 backdrop-blur-md shadow-2xl shadow-accent/20 text-white text-sm sm:text-base font-bold hover:scale-105 transition-transform duration-300">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-accent shadow-lg shadow-accent/50"></span>
                </span>
                Premium Australian Caravans
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight">
                <span className="block text-white mb-3 drop-shadow-2xl">Your Home on Wheels.</span>
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-accent via-red-400 to-accent bg-clip-text text-transparent drop-shadow-2xl font-black tracking-tight">
                    It&apos;s Your World on Wheels.
                  </span>
                  {/* Multiple glow layers for stronger effect */}
                  <span className="absolute -bottom-4 left-0 right-0 h-6 bg-gradient-to-r from-accent/30 via-accent/60 to-accent/30 blur-3xl" />
                  <span className="absolute -bottom-2 left-0 right-0 h-4 bg-gradient-to-r from-accent/40 via-accent/70 to-accent/40 blur-2xl" />
                </span>
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-gray-200 text-lg sm:text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light drop-shadow-lg"
              >
                Experience the freedom of the open road with our adventurous
                Australian-built caravans. <span className="text-white font-medium">Quality, comfort, and adventure awaits.</span>
              </motion.p>
            </motion.div>

            {/* Model Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7 }}
              className="space-y-6 pt-4"
            >
              <p className="text-sm font-bold text-white/90 tracking-widest uppercase drop-shadow-md">
                See Our Categories
              </p>
              <div className="flex items-center justify-center lg:justify-start gap-6 sm:gap-8 flex-wrap">
                {models.map((model, index) => (
                  <motion.div
                    key={model.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + index * 0.15, duration: 0.5 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="cursor-pointer transition-all duration-300"
                  >
                    <Image
                      src={model.logo}
                      alt={model.name}
                      width={180}
                      height={126}
                      className="object-contain w-36 h-auto sm:w-48 sm:h-auto drop-shadow-lg"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.7 }}
              className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start pt-6"
            >
              <Link href="/caravans">
                <Button
                  size="lg"
                  className="group w-full sm:w-auto rounded-full px-10 py-7 text-white text-lg font-black shadow-2xl shadow-accent/40 bg-gradient-to-r from-accent via-red-500 to-accent/90 hover:from-accent/90 hover:via-red-400 hover:to-accent border-2 border-white/20 hover:border-white/40 hover:scale-105 transition-all duration-300 hover:shadow-accent/60"
                >
                  Explore Models
                  <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="group w-full sm:w-auto rounded-full px-10 py-7 text-lg text-white font-bold border-2 border-white/30 bg-white/15 backdrop-blur-md hover:bg-white/25 hover:border-white/50 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl"
                >
                  Book a Viewing
                  <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes zoom {
          0%, 100% { transform: scale(1.05); }
          50% { transform: scale(1.1); }
        }
      `}</style>
    </section>
  );
}