"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { getModelById } from "@/data/models";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Check, ChevronLeft, Calendar, Phone, Zap, Truck, Lightbulb, Bed, Home, Droplets } from "lucide-react";

const tabIcons = {
  electrical: Zap,
  chassis: Truck,
  appliances: Lightbulb,
  internal: Bed,
  external: Home,
  plumbing: Droplets,
};

export default function ModelSpecifications() {
  const params = useParams();
  const modelId = params?.model as string;
  const model = getModelById(modelId || "");

  if (!model) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="font-heading text-3xl font-bold mb-4">Model Not Found</h1>
        <Link href="/" className="text-accent hover:underline">
          Back to Home
        </Link>
      </div>
    );
  }

  const tabs = [
    { id: "electrical", label: "Electrical", icon: Zap },
    { id: "chassis", label: "Chassis", icon: Truck },
    { id: "appliances", label: "Appliances", icon: Lightbulb },
    { id: "internal", label: "Internal", icon: Bed },
    { id: "external", label: "External", icon: Home },
    { id: "plumbing", label: "Plumbing", icon: Droplets },
  ];

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-secondary/30 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-secondary/30 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-accent font-medium mb-2">{model.tagline}</p>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-4">
              {model.name}
            </h1>
            <p className="text-muted-foreground text-lg">
              {model.description}
            </p>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {model.highlights.map((highlight, index) => (
              <div
                key={index}
                className="bg-secondary/50 rounded-lg p-4 flex items-center gap-3"
              >
                <Check className="w-5 h-5 text-accent shrink-0" />
                <span className="text-sm font-medium">{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-accent font-medium mb-2">DETAILED SPECIFICATIONS</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
              Every Detail Matters
            </h2>
          </div>

          <Tabs defaultValue="electrical" className="space-y-8">
            <TabsList className="w-full justify-start border-b rounded-none bg-transparent p-0 h-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent data-[state=active]:text-accent px-6 py-4 flex items-center gap-2"
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {tabs.map((tab) => {
              const spec = model.specifications[tab.id as keyof typeof model.specifications];
              const items = spec.items;
              const midPoint = Math.ceil(items.length / 2);
              const leftColumn = items.slice(0, midPoint);
              const rightColumn = items.slice(midPoint);

              return (
                <TabsContent key={tab.id} value={tab.id} className="mt-8">
                  <div className="bg-white rounded-2xl p-8 shadow-sm">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        {leftColumn.map((item, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0" />
                            <span className="text-foreground">{item}</span>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-3">
                        {rightColumn.map((item, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0" />
                            <span className="text-foreground">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </section>

      {/* Pricing & CTA Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Starting from</p>
                <p className="font-heading text-4xl font-bold text-foreground">
                  {model.price}
                </p>
                {model.priceNote && (
                  <p className="text-xs text-muted-foreground mt-1">{model.priceNote}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="flex-1">
                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" size="lg">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book a Viewing
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                <Phone className="w-4 h-4 mr-2" />
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}






