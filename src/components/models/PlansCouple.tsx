"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface PlansCoupleTabsProps {
  planscouples: {
    size1: string[];
    size2: string[];
    size3: string[];
    size4: string[];
    size5: string[];
    size6: string[];
    size7: string[];
    size8: string[];
    size9: string[];
    size10: string[];
  };
}

const tabs = [
  { id: "size1", label: "15'6" },
  { id: "size2", label: "17'6 RD" },
  { id: "size3", label: "18'6 RD" },
  { id: "size4", label: "18'6 FD" },
  { id: "size5", label: "19'6 FD" },
  { id: "size6", label: "19'6 RD" },
  { id: "size7", label: "20'6 Club" },
  { id: "size8", label: "20'6" },
  { id: "size9", label: "21'6" },
  { id: "size10", label: "22'6" },
];

export const PlansCoupleTabs = ({ planscouples }: PlansCoupleTabsProps) => {
  const [activeTab, setActiveTab] = useState("size1");

  const currentSize = activeTab as keyof typeof planscouples;

  // Derive image paths based on tab id (e.g., size1 → 1, size2 → 2, etc.)
  const sizeNumber = activeTab.replace("size", "");

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-lg">
      {/* Tab Headers */}
      <div className="flex overflow-x-auto border-b border-border bg-secondary/50">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-all duration-200 border-b-2 -mb-px",
              activeTab === tab.id
                ? "border-accent text-accent bg-card"
                : "border-transparent text-muted-foreground hover:text-foreground hover:bg-card/50"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6 md:p-8">
        {/* Floor Plan Images - Left & Right Views */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="relative w-full h-72 md:h-[350px] rounded-xl overflow-hidden shadow-md border border-border">
            <Image
              src={`/caravancouple/size${sizeNumber}-left.jpg`}
              alt={`${tabs.find(t => t.id === activeTab)?.label} - Left View Floor Plan`}
              fill
              className="object-cover bg-white"
              priority
            />
          </div>

          <div className="relative w-full h-72 md:h-[350px] rounded-xl overflow-hidden shadow-md border border-border">
            <Image
              src={`/caravancouple/size${sizeNumber}-right.jpg`}
              alt={`${tabs.find(t => t.id === activeTab)?.label} - Right View Floor Plan`}
              fill
              className="object-cover bg-white"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};