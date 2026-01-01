"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Zap, Truck, ChefHat, Sofa, TreeDeciduous, Droplets } from "lucide-react";

interface SpecificationTabsProps {
  specifications: {
    electrical: string[];
    chassis: string[];
    appliances: string[];
    internal: string[];
    external: string[];
    plumbing: string[];
  };
}

const tabs = [
  { id: "electrical", label: "Electrical", icon: Zap },
  { id: "chassis", label: "Chassis", icon: Truck },
  { id: "appliances", label: "Appliances", icon: ChefHat },
  { id: "internal", label: "Internal", icon: Sofa },
  { id: "external", label: "External", icon: TreeDeciduous },
  { id: "plumbing", label: "Plumbing", icon: Droplets },
];

export const SpecificationTabs = ({ specifications }: SpecificationTabsProps) => {
  const [activeTab, setActiveTab] = useState("electrical");

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-lg">
      {/* Tab Headers */}
      <div className="flex overflow-x-auto border-b border-border bg-secondary/50">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
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
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {specifications[activeTab as keyof typeof specifications].map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30 animate-fade-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
              <span className="text-sm text-foreground">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};





