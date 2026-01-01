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
      className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
    >
      <h3 className="font-heading text-xl font-bold text-foreground mb-4">
        {dealer.name}
      </h3>
      
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-accent mt-0.5 shrink-0" />
          <p className="text-muted-foreground text-sm">{dealer.address}</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Phone className="w-5 h-5 text-accent shrink-0" />
          <a
            href={`tel:${dealer.phone}`}
            className="text-foreground hover:text-accent transition-colors text-sm"
          >
            {dealer.phone}
          </a>
        </div>
        
        <div className="flex items-center gap-3">
          <Mail className="w-5 h-5 text-accent shrink-0" />
          <a
            href={`mailto:${dealer.email}`}
            className="text-foreground hover:text-accent transition-colors text-sm"
          >
            {dealer.email}
          </a>
        </div>
      </div>
    </motion.div>
  );
};
