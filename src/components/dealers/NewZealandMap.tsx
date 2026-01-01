"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface NewZealandMapProps {
  selectedRegion: string | null;
  onRegionClick: (regionId: string) => void;
}

export const NewZealandMap = ({ selectedRegion, onRegionClick }: NewZealandMapProps) => {
  const regions = [
    { id: "north", name: "North Island", x: 50, y: 40 },
    { id: "south", name: "South Island", x: 50, y: 70 },
  ];

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <svg
        viewBox="0 0 200 120"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Simplified New Zealand outline */}
        <path
          d="M 40 20 L 60 15 L 80 20 L 90 35 L 85 50 L 70 60 L 50 65 L 30 60 L 20 45 L 25 30 Z"
          fill="hsl(var(--secondary))"
          stroke="hsl(var(--border))"
          strokeWidth="1"
          className="transition-colors"
        />
        <path
          d="M 40 70 L 60 65 L 80 70 L 90 85 L 85 100 L 70 110 L 50 115 L 30 110 L 20 95 L 25 80 Z"
          fill="hsl(var(--secondary))"
          stroke="hsl(var(--border))"
          strokeWidth="1"
          className="transition-colors"
        />
        
        {/* Region markers */}
        {regions.map((region) => (
          <g key={region.id}>
            <circle
              cx={region.x}
              cy={region.y}
              r={selectedRegion === region.id ? 6 : 4}
              fill={selectedRegion === region.id ? "hsl(var(--accent))" : "hsl(var(--accent) / 0.6)"}
              stroke="hsl(var(--background))"
              strokeWidth="2"
              className="cursor-pointer transition-all hover:scale-125"
              onClick={() => onRegionClick(region.id)}
            />
            {selectedRegion === region.id && (
              <motion.text
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                x={region.x}
                y={region.y - 12}
                textAnchor="middle"
                className="text-xs font-semibold fill-foreground"
              >
                {region.name}
              </motion.text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
};
