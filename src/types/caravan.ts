// src/types/caravan.ts

export interface Variant {
  name: string;
  priceModifier: number;
}

export interface SpecItem {
  label: string;
  value: string;
}

export interface SpecCategory {
  category: string;
  items: SpecItem[];
}

export interface Caravan {
  id: string;
  name: string;
  series: "Explorer" | "Outback" | "Horizon" | "Summit" | "Compact";
  tagline: string;
  price: number;
  length: string;
  berth: 2 | 4;
  tare: string;
  atm: string;
  features: string[];
  description: string;
  images: string[];
  specs: SpecCategory[];
  variants: Variant[];
  available: boolean;
  featured: boolean;
}