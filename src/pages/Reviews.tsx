"use client";

import { ReviewCard } from "@/components/reviews/ReviewCard";
import { reviews } from "@/data/reviews";
import { Star, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

export default function Reviews() {
  const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden py-24 -mt-24 pt-24">
        {/* Video Background with Parallax effect */}
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/videos/reviews-hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-background" />
        </motion.div>

        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            {/* Modern Badge */}
            <div className="inline-block mb-6">
              <span className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-white/15 to-white/5 border border-white/30 backdrop-blur-sm shadow-lg text-white text-base font-semibold">
                <span className="w-3 h-3 rounded-full bg-white animate-ping" />
                Verified Owner Stories
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-[1.05] tracking-tight">
              What Our Owners Say
            </h1>

            <p className="text-xl text-white/80 font-light max-w-2xl mb-10 leading-relaxed">
              Real experiences from real Equalizer RV owners exploring the vast landscapes of Australia.
            </p>

            {/* Rating Summary Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="inline-flex flex-wrap items-center gap-6 p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl"
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 ${i < Math.floor(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-white/20"}`}
                    />
                  ))}
                </div>
                <p className="text-white/60 text-sm">Overall Satisfaction</p>
              </div>

              <div className="h-12 w-[1px] bg-white/20 hidden sm:block" />

              <div className="flex flex-col">
                <span className="text-4xl font-black text-white leading-none">
                  {averageRating.toFixed(1)}
                </span>
                <span className="text-white/60 text-sm">{reviews.length} reviews</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {reviews.map((review) => (
              <motion.div key={review.id}>
                <ReviewCard review={review} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}