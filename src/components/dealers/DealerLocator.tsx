"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { AustraliaMap } from "./AustraliaMap";
import { DealerCard } from "./DealerCard";
import { regions, getDealersByRegion, Dealer } from "@/data/dealers";

export const DealerLocator = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>("sa");
  const [dealers, setDealers] = useState<Dealer[]>(getDealersByRegion("sa"));

  const handleRegionClick = (regionId: string) => {
    // Only allow South Australia
    if (regionId === "sa") {
      setSelectedRegion(regionId);
      setDealers(getDealersByRegion(regionId));
    }
  };

  const selectedRegionName = regions.find((r) => r.id === selectedRegion)?.name;

  return (
    <section className="min-h-screen px-4 sm:px-6 lg:px-8">
      <div>
        <div>
          <div className="flex flex-col items-center justify-center">
            {/* Dealers Panel - Always visible */}
            <div className="w-full max-w-5xl">
              {/* Panel Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-accent" />
                    {selectedRegionName}
                  </h2>
                </div>
              </div>

              {/* Dealer Cards */}
              <div className="space-y-4">
                {dealers.map((dealer, index) => (
                  <DealerCard key={dealer.id} dealer={dealer} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: hsl(var(--secondary));
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: hsl(var(--muted-foreground) / 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: hsl(var(--muted-foreground) / 0.5);
        }
      `}</style>
    </section>
  );
};

