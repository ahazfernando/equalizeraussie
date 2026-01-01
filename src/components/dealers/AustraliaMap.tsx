"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface AustraliaMapProps {
  selectedRegion: string | null;
  onRegionClick: (regionId: string) => void;
}

export const AustraliaMap = ({ selectedRegion, onRegionClick }: AustraliaMapProps) => {
  const regions = [
    { id: "sa", name: "South Australia", x: 50, y: 60 },
    { id: "vic", name: "Victoria", x: 60, y: 75 },
    { id: "nsw", name: "New South Wales", x: 70, y: 50 },
    { id: "qld", name: "Queensland", x: 75, y: 30 },
    { id: "wa", name: "Western Australia", x: 20, y: 50 },
    { id: "tas", name: "Tasmania", x: 60, y: 90 },
    { id: "nt", name: "Northern Territory", x: 45, y: 25 },
    { id: "act", name: "Australian Capital Territory", x: 65, y: 55 },
  ];

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <svg
        viewBox="0 0 200 120"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Simplified Australia outline */}
        <path
          d="M 30 40 L 80 35 L 120 25 L 150 30 L 160 50 L 155 70 L 140 85 L 100 90 L 60 85 L 35 70 Z"
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
