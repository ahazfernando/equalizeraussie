"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Zap,
  Truck,
  ChefHat,
  Sofa,
  TreeDeciduous,
  Droplets,
  ChevronRight,
} from "lucide-react";

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

  const activeSpecs = specifications[activeTab as keyof typeof specifications];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Card: Category Navigation */}
      <div className="lg:col-span-4">
        <div className="bg-card rounded-2xl border-2 border-border overflow-hidden shadow-xl h-full">
          <div className="p-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "w-full flex items-center justify-between gap-4 px-5 py-4 rounded-xl text-sm font-medium transition-all duration-300 group mb-2 last:mb-0",
                    isActive
                      ? "bg-accent text-foreground shadow-md"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={cn("h-5 w-5", isActive && "text-foreground")} />
                    <span>{tab.label}</span>
                  </div>
                  <ChevronRight
                    className={cn(
                      "h-4 w-4 transition-all duration-300",
                      isActive ? "translate-x-1 opacity-100" : "opacity-0 group-hover:opacity-60"
                    )}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Card: Specifications Content */}
      <div className="lg:col-span-8">
        <div className="bg-card rounded-2xl border-2 border-border overflow-hidden shadow-xl h-full">
          <div className="p-8 md:p-10">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-foreground flex items-center gap-3">
                {tabs.find((t) => t.id === activeTab)?.icon &&
                  (() => {
                    const Icon = tabs.find((t) => t.id === activeTab)!.icon;
                    return <Icon className="h-7 w-7 text-accent" />;
                  })()}
                {tabs.find((t) => t.id === activeTab)?.label} Specifications
              </h3>
              <div className="mt-2 h-1 w-20 bg-accent rounded-full" />
            </div>

            {activeSpecs.length === 0 ? (
              <p className="text-muted-foreground">No specifications available.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {activeSpecs.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-5 rounded-xl bg-background backdrop-blur-sm border-2 border-border hover:bg-background/60 cursor-pointer transition-all duration-300 shadow-sm"
                    style={{ animationDelay: `${index * 60}ms` }}
                  >
                    <div className="w-2 h-2 rounded-full bg-accent mt-2.5 shrink-0" />
                    <span className="text-foreground leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};