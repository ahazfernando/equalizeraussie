"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { caravans } from "@/data/caravans";
import { Check, ArrowRight, Palette, Sofa, Zap, Shield } from "lucide-react";
import { toast } from "sonner";

const customizationOptions = [
  {
    category: "Exterior",
    icon: Palette,
    options: [
      { id: "ext-white", name: "Arctic White", price: 0 },
      { id: "ext-grey", name: "Graphite Grey", price: 1500 },
      { id: "ext-champagne", name: "Champagne Gold", price: 2000 },
    ],
  },
  {
    category: "Interior",
    icon: Sofa,
    options: [
      { id: "int-light", name: "Light Oak", price: 0 },
      { id: "int-dark", name: "Walnut", price: 2500 },
      { id: "int-grey", name: "Coastal Grey", price: 2000 },
    ],
  },
  {
    category: "Power",
    icon: Zap,
    options: [
      { id: "pwr-standard", name: "Standard (200W Solar)", price: 0 },
      { id: "pwr-upgraded", name: "Upgraded (400W Solar + Lithium)", price: 8500 },
      { id: "pwr-offgrid", name: "Full Off-Grid (600W + 400Ah)", price: 15000 },
    ],
  },
  {
    category: "Protection",
    icon: Shield,
    options: [
      { id: "pro-standard", name: "Standard Warranty", price: 0 },
      { id: "pro-extended", name: "Extended 7-Year Warranty", price: 3500 },
      { id: "pro-roadside", name: "5-Year Roadside Assist", price: 1500 },
    ],
  },
];

const extras = [
  { id: "awning", name: "Electric Awning", price: 3500 },
  { id: "tv", name: "32\" Smart TV", price: 1200 },
  { id: "bbq", name: "External BBQ Point", price: 800 },
  { id: "camera", name: "Reverse Camera System", price: 1500 },
  { id: "washer", name: "Washing Machine Ready", price: 2000 },
  { id: "diesel", name: "Diesel Heater", price: 3500 },
];

export default function BuildYourRV() {
  const [selectedCaravan, setSelectedCaravan] = useState("");
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [contactInfo, setContactInfo] = useState({ name: "", email: "", phone: "" });

  const baseCaravan = caravans.find((c) => c.id === selectedCaravan);
  const basePrice = baseCaravan?.price || 0;

  const optionsTotal = Object.entries(selections).reduce((total, [_, optionId]) => {
    for (const category of customizationOptions) {
      const option = category.options.find((o) => o.id === optionId);
      if (option) return total + option.price;
    }
    return total;
  }, 0);

  const extrasTotal = selectedExtras.reduce((total, extraId) => {
    const extra = extras.find((e) => e.id === extraId);
    return total + (extra?.price || 0);
  }, 0);

  const totalPrice = basePrice + optionsTotal + extrasTotal;

  const handleSubmit = () => {
    if (!selectedCaravan) {
      toast.error("Please select a base model first");
      return;
    }
    toast.success("Your custom build request has been submitted! We'll contact you within 24 hours.");
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-secondary/30 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-accent font-medium mb-2">Customise Your Dream</p>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Build Your Dream RV
            </h1>
            <p className="text-muted-foreground text-lg">
              Start with one of our proven models and customise it to perfectly 
              match your adventure style. Every Equalizer RV can be tailored to you.
            </p>
          </div>
        </div>
      </section>

      {/* Builder Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Options */}
            <div className="lg:col-span-2 space-y-8">
              {/* Base Model Selection */}
              <div className="card-premium p-6">
                <h2 className="font-heading text-xl font-semibold mb-4">
                  1. Choose Your Base Model
                </h2>
                <Select value={selectedCaravan} onValueChange={setSelectedCaravan}>
                  <SelectTrigger className="form-input-premium">
                    <SelectValue placeholder="Select a caravan model" />
                  </SelectTrigger>
                  <SelectContent>
                    {caravans.filter(c => c.available).map((caravan) => (
                      <SelectItem key={caravan.id} value={caravan.id}>
                        {caravan.name} - ${caravan.price.toLocaleString()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Customization Options */}
              {selectedCaravan && (
                <>
                  <div className="card-premium p-6">
                    <h2 className="font-heading text-xl font-semibold mb-6">
                      2. Customise Your Options
                    </h2>
                    <div className="space-y-8">
                      {customizationOptions.map((category) => (
                        <div key={category.category}>
                          <div className="flex items-center gap-2 mb-4">
                            <category.icon className="w-5 h-5 text-accent" />
                            <h3 className="font-medium">{category.category}</h3>
                          </div>
                          <div className="grid sm:grid-cols-3 gap-3">
                            {category.options.map((option) => (
                              <button
                                key={option.id}
                                onClick={() =>
                                  setSelections((prev) => ({
                                    ...prev,
                                    [category.category]: option.id,
                                  }))
                                }
                                className={`p-4 rounded-xl border-2 text-left transition-all ${
                                  selections[category.category] === option.id
                                    ? "border-accent bg-accent/5"
                                    : "border-border hover:border-accent/50"
                                }`}
                              >
                                <div className="flex items-start justify-between">
                                  <div>
                                    <p className="font-medium text-sm">{option.name}</p>
                                    <p className="text-muted-foreground text-xs mt-1">
                                      {option.price === 0 ? "Included" : `+$${option.price.toLocaleString()}`}
                                    </p>
                                  </div>
                                  {selections[category.category] === option.id && (
                                    <Check className="w-5 h-5 text-accent shrink-0" />
                                  )}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Extras */}
                  <div className="card-premium p-6">
                    <h2 className="font-heading text-xl font-semibold mb-6">
                      3. Add Optional Extras
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {extras.map((extra) => (
                        <div
                          key={extra.id}
                          className="flex items-center space-x-3 p-4 rounded-xl border border-border hover:border-accent/50 transition-colors"
                        >
                          <Checkbox
                            id={extra.id}
                            checked={selectedExtras.includes(extra.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedExtras((prev) => [...prev, extra.id]);
                              } else {
                                setSelectedExtras((prev) => prev.filter((id) => id !== extra.id));
                              }
                            }}
                          />
                          <Label htmlFor={extra.id} className="flex-1 cursor-pointer">
                            <span className="block font-medium text-sm">{extra.name}</span>
                            <span className="text-muted-foreground text-xs">
                              +${extra.price.toLocaleString()}
                            </span>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="card-premium p-6">
                    <h2 className="font-heading text-xl font-semibold mb-6">
                      4. Your Details
                    </h2>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="build-name">Name</Label>
                        <Input
                          id="build-name"
                          value={contactInfo.name}
                          onChange={(e) => setContactInfo((prev) => ({ ...prev, name: e.target.value }))}
                          className="form-input-premium"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="build-email">Email</Label>
                        <Input
                          id="build-email"
                          type="email"
                          value={contactInfo.email}
                          onChange={(e) => setContactInfo((prev) => ({ ...prev, email: e.target.value }))}
                          className="form-input-premium"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="build-phone">Phone</Label>
                        <Input
                          id="build-phone"
                          type="tel"
                          value={contactInfo.phone}
                          onChange={(e) => setContactInfo((prev) => ({ ...prev, phone: e.target.value }))}
                          className="form-input-premium"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="card-premium p-6 sticky top-28">
                <h2 className="font-heading text-xl font-semibold mb-6">
                  Build Summary
                </h2>

                {selectedCaravan && baseCaravan ? (
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm text-muted-foreground">Base Model</p>
                      <p className="font-medium">{baseCaravan.name}</p>
                      <p className="text-accent font-semibold">
                        ${basePrice.toLocaleString()}
                      </p>
                    </div>

                    {optionsTotal > 0 && (
                      <div>
                        <p className="text-sm text-muted-foreground">Options</p>
                        <p className="text-accent font-semibold">
                          +${optionsTotal.toLocaleString()}
                        </p>
                      </div>
                    )}

                    {extrasTotal > 0 && (
                      <div>
                        <p className="text-sm text-muted-foreground">Extras</p>
                        <p className="text-accent font-semibold">
                          +${extrasTotal.toLocaleString()}
                        </p>
                      </div>
                    )}

                    <div className="pt-4 border-t border-border">
                      <p className="text-sm text-muted-foreground">Estimated Total</p>
                      <p className="font-heading text-3xl font-bold text-foreground">
                        ${totalPrice.toLocaleString()}
                      </p>
                    </div>

                    <Button
                      onClick={handleSubmit}
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                      size="lg"
                    >
                      Submit Build Request
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      Our team will contact you to discuss your build and provide a final quote.
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      Select a base model to start building your dream RV
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
