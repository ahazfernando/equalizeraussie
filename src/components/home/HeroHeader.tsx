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
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-background/60 dark:bg-background/70" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8 text-center lg:text-left"
          >
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block"
            >
              <span className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-accent/15 to-accent/5 border border-accent/30 backdrop-blur-sm shadow-lg shadow-accent/10 text-red-500 dark:text-red-400 text-sm sm:text-base font-semibold">
                <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
                Premium Australian Caravans
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="space-y-4"
            >
              <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-6xl font-semibold leading-tight">
                <span className="block text-foreground tracking-wider">Your Home on Wheels.</span>
                <span className="bg-gradient-to-r from-accent via-accent to-accent/80 bg-clip-text text-transparent relative inline-block tracking-wider">
                  It&apos;s Your World on Wheels.
                  <span className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-accent/20 via-accent/40 to-accent/20 blur-xl" />
                </span>
              </h1>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 font-light">
                Experience the freedom of the open road with our adventurous
                Australian-built caravans. Quality, comfort, and adventure awaits.
              </p>
            </motion.div>

            {/* Model Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7 }}
              className="space-y-4"
            >
              <p className="text-sm font-semibold text-foreground tracking-wider uppercase">
                See Our Categories
              </p>
              <div className="flex items-center justify-center lg:justify-start gap-4 sm:gap-6 flex-wrap">
                {models.map((model, index) => (
                  <motion.div
                    key={model.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + index * 0.2, duration: 0.5 }}
                    className="cursor-pointer"
                  >
                    <Image
                      src={model.logo}
                      alt={model.name}
                      width={180}
                      height={126}
                      className="object-contain w-32 h-auto sm:w-44 sm:h-auto"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link href="/caravans">
                <Button
                  size="lg"
                  className="w-full sm:w-auto rounded-full px-8 py-6 text-foreground text-base font-bold shadow-2xl shadow-accent/30 bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent border-2 border-accent"
                >
                  Explore Models
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto rounded-full px-8 py-6 text-base text-white font-semibold border border-white/24 bg-white/12 backdrop-blur-[35px] hover:bg-white/20 hover:border-white/30 transition-all duration-300"
                >
                  Book a Viewing
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}