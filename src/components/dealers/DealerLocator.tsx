"use client";

import { useState } from "react";
import { AustraliaMap } from "./AustraliaMap";
import { NewZealandMap } from "./NewZealandMap";
import { DealerCard } from "./DealerCard";
import { regions, getDealersByRegion, Dealer } from "@/data/dealers";
import { X, MapPin } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export const DealerLocator = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>("sa");
  const [dealers, setDealers] = useState<Dealer[]>(getDealersByRegion("sa"));
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("australia");

  const handleRegionClick = (regionId: string) => {
    if (regionId === selectedRegion) {
      setIsAnimating(true);
      setTimeout(() => {
        setSelectedRegion(null);
        setDealers([]);
        setIsAnimating(false);
      }, 300);
    } else {
      setSelectedRegion(regionId);
      setDealers(getDealersByRegion(regionId));
    }
  };

  const handleClose = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedRegion(null);
      setDealers([]);
      setIsAnimating(false);
    }, 300);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === "australia") {
      // Reset to South Australia when switching back to Australia tab
      setSelectedRegion("sa");
      setDealers(getDealersByRegion("sa"));
    } else {
      setSelectedRegion(null);
      setDealers([]);
    }
  };

  const selectedRegionName = regions.find((r) => r.id === selectedRegion)?.name;

  return (
    <section className="min-h-screen px-4 sm:px-6 lg:px-8">
      <div>
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-card backdrop-blur-sm rounded-full border-2 border-border p-4">
              <TabsTrigger value="australia">Australia</TabsTrigger>
              <TabsTrigger value="newzealand">New Zealand</TabsTrigger>
            </TabsList>
          </div>

          {!selectedRegion && (
            <div className="my-10 px-5 md:px-20 flex items-center gap-2 mx-auto w-fit text-muted-foreground text-xs md:text-sm bg-card/80 backdrop-blur-sm py-2 rounded-full border border-border">
              <MapPin className="w-4 h-4 text-accent" />
              <span>Click a pin to view dealers</span>
            </div>
          )}

          {/* Australia Tab */}
          <TabsContent value="australia" className="mt-0">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start justify-center">
              {/* Map Section */}
              <div
                className={`relative transition-all duration-500 ease-out flex items-center justify-center ${selectedRegion ? "lg:w-1/2" : "w-full max-w-2xl"
                  }`}
              >
                <div className="w-full flex flex-col items-center">
                  <div className="w-full">
                    <AustraliaMap
                      selectedRegion={selectedRegion}
                      onRegionClick={handleRegionClick}
                    />
                  </div>
                </div>
              </div>

              {/* Dealers Panel */}
              {selectedRegion && (
                <div
                  className={`w-full lg:w-1/2 max-w-lg ${isAnimating ? "animate-slide-out-right" : "animate-slide-in-right"
                    }`}
                >
                  {/* Panel Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-display font-bold text-foreground">
                        {selectedRegionName}
                      </h2>
                      <p className="text-muted-foreground text-sm mt-1">
                        {dealers.length} dealer{dealers.length !== 1 ? "s" : ""} available
                      </p>
                    </div>
                    <button
                      onClick={handleClose}
                      className="p-2.5 rounded-lg bg-card hover:bg-card/90 transition-colors group"
                      aria-label="Close panel"
                    >
                      <X className="w-5 h-5 text-foreground group-hover:text-foreground transition-colors" />
                    </button>
                  </div>

                  {/* Dealer Cards */}
                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                    {dealers.map((dealer, index) => (
                      <DealerCard key={dealer.id} dealer={dealer} index={index} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          {/* New Zealand Tab */}
          <TabsContent value="newzealand" className="mt-0">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start justify-center">
              {/* Map Section */}
              <div
                className={`relative transition-all duration-500 ease-out flex items-center justify-center ${selectedRegion ? "lg:w-1/2" : "w-full max-w-2xl"
                  }`}
              >
                <div className="w-full flex flex-col items-center">
                  <div className="w-full">
                    <NewZealandMap
                      selectedRegion={selectedRegion}
                      onRegionClick={handleRegionClick}
                    />
                  </div>
                </div>
              </div>

              {/* Dealers Panel */}
              {selectedRegion && (
                <div
                  className={`w-full lg:w-1/2 max-w-lg ${isAnimating ? "animate-slide-out-right" : "animate-slide-in-right"
                    }`}
                >
                  {/* Panel Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-display font-bold text-foreground">
                        {selectedRegionName}
                      </h2>
                      <p className="text-muted-foreground text-sm mt-1">
                        {dealers.length} dealer{dealers.length !== 1 ? "s" : ""} available
                      </p>
                    </div>
                    <button
                      onClick={handleClose}
                      className="p-2.5 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors group"
                      aria-label="Close panel"
                    >
                      <X className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </button>
                  </div>

                  {/* Dealer Cards */}
                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                    {dealers.map((dealer, index) => (
                      <DealerCard key={dealer.id} dealer={dealer} index={index} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
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

