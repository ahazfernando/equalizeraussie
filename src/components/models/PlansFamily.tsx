"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ChevronRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PlansFamiliyTabsProps {
  plansfamily: {
    size1: string[];
    size2: string[];
    size3: string[];
    size4: string[];
    size5: string[];
    size6: string[];
  };
}

const tabs = [
  { id: "size1", label: "18' Side Bunk", code: "FAM18SB" },
  { id: "size2", label: "18' Rear Bunk", code: "FAM18RB" },
  { id: "size3", label: "19'6", code: "FAM196" },
  { id: "size4", label: "20'6", code: "FAM206" },
  { id: "size5", label: "21'6", code: "FAM216" },
  { id: "size6", label: "22'6", code: "FAM226" },
];

// Specifications for each floor plan
const floorPlanSpecs: Record<string, {
  externalLength: string;
  internalLength: string;
  totalLength: string;
  externalWidth: string;
  internalWidth: string;
  externalHeight: string;
  internalHeight: string;
}> = {
  size1: {
    externalLength: "5490 (mm)",
    internalLength: "5410 (mm)",
    totalLength: "8110 (mm)",
    externalWidth: "2500 (mm)",
    internalWidth: "2240 (mm)",
    externalHeight: "3220 (mm)",
    internalHeight: "1946 (mm)",
  },
  size2: {
    externalLength: "5490 (mm)",
    internalLength: "5410 (mm)",
    totalLength: "8110 (mm)",
    externalWidth: "2500 (mm)",
    internalWidth: "2240 (mm)",
    externalHeight: "3220 (mm)",
    internalHeight: "1946 (mm)",
  },
  size3: {
    externalLength: "5950 (mm)",
    internalLength: "5870 (mm)",
    totalLength: "8570 (mm)",
    externalWidth: "2500 (mm)",
    internalWidth: "2240 (mm)",
    externalHeight: "3220 (mm)",
    internalHeight: "1946 (mm)",
  },
  size4: {
    externalLength: "6250 (mm)",
    internalLength: "6170 (mm)",
    totalLength: "8870 (mm)",
    externalWidth: "2500 (mm)",
    internalWidth: "2240 (mm)",
    externalHeight: "3220 (mm)",
    internalHeight: "1946 (mm)",
  },
  size5: {
    externalLength: "6550 (mm)",
    internalLength: "6470 (mm)",
    totalLength: "9170 (mm)",
    externalWidth: "2500 (mm)",
    internalWidth: "2240 (mm)",
    externalHeight: "3220 (mm)",
    internalHeight: "1946 (mm)",
  },
  size6: {
    externalLength: "6850 (mm)",
    internalLength: "6770 (mm)",
    totalLength: "9470 (mm)",
    externalWidth: "2500 (mm)",
    internalWidth: "2240 (mm)",
    externalHeight: "3220 (mm)",
    internalHeight: "1946 (mm)",
  },
};

export const PlansFamiliyTabs = ({ plansfamily }: PlansFamiliyTabsProps) => {
  const [activeTab, setActiveTab] = useState("size1");
  const [viewMode, setViewMode] = useState<"3d" | "floor">("3d");

  const sizeNumber = activeTab.replace("size", "");
  const activeLabel = tabs.find((t) => t.id === activeTab)?.label || "";
  const activeCode = tabs.find((t) => t.id === activeTab)?.code || "";
  const specs = floorPlanSpecs[activeTab] || floorPlanSpecs.size1;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Sidebar: Floor Plan Selector */}
      <div className="lg:col-span-3">
        <div className="bg-card rounded-2xl border-2 border-border overflow-hidden shadow-xl">
          <div className="p-6">
            <h3 className="text-lg font-bold text-foreground mb-4">SELECT YOUR FLOOR PLAN SIZE</h3>
            <div className="space-y-2 max-h-[600px] overflow-y-auto scrollbar-hide">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "w-full flex items-center justify-between gap-4 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 group",
                      isActive
                        ? "bg-accent text-foreground shadow-md"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/10 bg-background"
                    )}
                  >
                    <div className="flex flex-col items-start">
                      <span className="font-semibold">{tab.label}</span>
                      <span className="text-xs opacity-70">({tab.code})</span>
                    </div>
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 transition-all duration-300 shrink-0",
                        isActive
                          ? "translate-x-1 opacity-100"
                          : "opacity-0 group-hover:opacity-60"
                      )}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Center: Floor Plan Display */}
      <div className="lg:col-span-6">
        <div className="bg-card rounded-2xl border-2 border-border overflow-hidden shadow-xl h-full">
          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {activeLabel} FLOOR PLAN
              </h3>
              <div className="h-1 w-24 bg-accent rounded-full" />
            </div>

            {/* View Mode Tabs */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setViewMode("3d")}
                className={cn(
                  "px-6 py-2 rounded-lg text-sm font-medium transition-all",
                  viewMode === "3d"
                    ? "bg-accent text-foreground"
                    : "bg-background text-muted-foreground hover:text-foreground"
                )}
              >
                3D View
              </button>
              <button
                onClick={() => setViewMode("floor")}
                className={cn(
                  "px-6 py-2 rounded-lg text-sm font-medium transition-all",
                  viewMode === "floor"
                    ? "bg-accent text-foreground"
                    : "bg-background text-muted-foreground hover:text-foreground"
                )}
              >
                Floor View
              </button>
            </div>

            {/* Floor Plan Image */}
            <div className="relative w-full h-[500px] rounded-2xl overflow-hidden border-2 border-border bg-white">
              <Image
                src={viewMode === "3d" 
                  ? `/caravanfamily/size${sizeNumber}-left.jpg`
                  : `/caravanfamily/size${sizeNumber}-right.jpg`}
                alt={`${activeLabel} - ${viewMode === "3d" ? "3D" : "Floor"} View`}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Virtual Tour Button */}
            <div className="mt-6">
              <Button className="w-full bg-black hover:bg-black/90 text-white">
                <RotateCcw className="w-5 h-5 mr-2" />
                TAKE A VIRTUAL TOUR
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Specifications */}
      <div className="lg:col-span-3">
        <div className="bg-card rounded-2xl border-2 border-border overflow-hidden shadow-xl h-full">
          <div className="p-6">
            <h3 className="text-lg font-bold text-foreground mb-4">Specifications</h3>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-muted-foreground mb-1">External Body Length:</p>
                <p className="text-foreground font-semibold">{specs.externalLength}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Internal Length:</p>
                <p className="text-foreground font-semibold">{specs.internalLength}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Total Length (Tow Ball to Spare Tyre):</p>
                <p className="text-foreground font-semibold">{specs.totalLength}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">External Width:</p>
                <p className="text-foreground font-semibold">{specs.externalWidth}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Internal Width:</p>
                <p className="text-foreground font-semibold">{specs.internalWidth}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">External Height (Ground to top of air-con):</p>
                <p className="text-foreground font-semibold">{specs.externalHeight}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Internal Height:</p>
                <p className="text-foreground font-semibold">{specs.internalHeight}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-6 italic">
              *Specifications may be subject to change without notice at the discretion of Equalizer RV. Floorplans & images are for illustrative purposes only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};