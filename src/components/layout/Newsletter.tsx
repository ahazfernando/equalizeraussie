"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion"; // Optional: add framer-motion for animations

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate subscription (replace with real API call)
    console.log("Subscribing email:", email);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <section className="relative overflow-hidden rounded-3xl mx-4 mb-40 mt-20 bg-background shadow-2xl">
      {/* Subtle animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-background via-transparent to-card" />

      <div className="container mx-auto px-6 py-12 lg:py-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text & Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Get the Latest <span className="bg-accent bg-clip-text text-transparent">Flavors First</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl">
                Exclusive drops, secret recipes, and behind-the-scenes stories delivered straight to your inbox.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="max-w-2xl">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1 group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-accent transition-colors group-focus-within:text-accent z-10" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full h-14 pl-14 pr-6 rounded-full  bg-card backdrop-blur-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent transition-all shadow-lg"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-14 px-10 rounded-full bg-accent hover:bg-accent/90 text-white font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-70"
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe Now"}
                </Button>
              </div>

              <p className="text-muted-foreground text-sm mt-4">
                No spam. Unsubscribe anytime. We respect your privacy.
              </p>
            </form>
          </motion.div>

          {/* Right: Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-lg lg:max-w-none">
              {/* Glow effect behind image */}
              <div className="absolute inset-0 bg-red-400/30 blur-3xl scale-105 -z-10 animate-pulse" />

              <Image
                src="/footer/RebelEqualizerD1V2.png"
                alt="Rebel Equalizer RV - Latest Flavor Drop"
                width={900}
                height={900}
                className="w-full h-auto object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;