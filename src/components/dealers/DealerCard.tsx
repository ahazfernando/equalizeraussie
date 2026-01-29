"use client";

import { Dealer } from "@/data/dealers";
import { MapPin, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";

interface DealerCardProps {
  dealer: Dealer;
  index: number;
}

export const DealerCard = ({ dealer, index }: DealerCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex flex-col md:flex-row md:items-center gap-6 group"
    >
      {/* Dealer Name (Left Side) - Now clearly visible outside the card */}
      <div className="md:w-1/3 text-left">
        <h3 className="font-heading text-4xl sm:text-5xl font-black uppercase tracking-wider leading-none">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-red-600 group-hover:to-red-500 transition-all duration-300">
            {dealer.name}
          </span>
        </h3>
      </div>

      {/* Dealer Info Card (Right Side) */}
      <div className="md:w-2/3 bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all hover:border-accent/30 relative overflow-hidden group-hover:bg-accent/5">
        <div className="absolute top-0 right-0 w-20 h-20 bg-accent/5 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-150" />

        <div className="space-y-4 relative z-10">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0 text-accent">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm font-medium uppercase tracking-wider text-xs mb-1">Address</p>
              <p className="text-foreground text-sm leading-relaxed">{dealer.address}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0 text-accent">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm font-medium uppercase tracking-wider text-xs mb-1">Phone</p>
                <a
                  href={`tel:${dealer.phone}`}
                  className="text-foreground hover:text-accent transition-colors text-sm font-semibold"
                >
                  {dealer.phone}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0 text-accent">
                <Mail className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <p className="text-muted-foreground text-sm font-medium uppercase tracking-wider text-xs mb-1">Email</p>
                <a
                  href={`mailto:${dealer.email}`}
                  className="text-foreground hover:text-accent transition-colors text-sm font-semibold truncate block"
                >
                  {dealer.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
