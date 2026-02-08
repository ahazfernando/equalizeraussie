import { Caravan } from "@/types/caravan";

// Re-export for backward compatibility
export type { Caravan };

export const caravans: Caravan[] = [
  {
    id: "cruzer",
    name: "Cruzer",
    series: "Cruzer",
    tagline: "The Perfect Entry Point",
    price: 89990,
    length: "17ft - 22ft",
    berth: 2,
    tare: "2,450kg",
    atm: "3,200kg",
    features: [
      "Compact yet spacious design",
      "Off-road capable suspension",
      "Solar power ready",
      "Premium kitchen package",
      "Queen Island Bed",
      "Full Ensuite"
    ],
    description: "The Cruzer by Equalizer RV is the perfect on-road model for touring in luxury! Designed to provide an unparalleled experience, combining functionality and style",
    images: ["/Equalizermodels/CR-D1.png", "/Equalizermodels/CR-D2.png"],
    specs: [
      {
        category: "Dimensions",
        items: [
          { label: "External Length", value: "6.4m (21ft)" },
          { label: "External Width", value: "2.5m" },
          { label: "External Height", value: "2.95m" },
          { label: "Internal Height", value: "1.98m" }
        ]
      },
      {
        category: "Weights",
        items: [
          { label: "Tare Weight", value: "2,450kg" },
          { label: "ATM", value: "3,200kg" },
          { label: "Payload", value: "750kg" },
          { label: "Ball Weight", value: "180kg" }
        ]
      },
      {
        category: "Tanks",
        items: [
          { label: "Fresh Water", value: "150L" },
          { label: "Grey Water", value: "100L" },
          { label: "Hot Water", value: "20L Gas" }
        ]
      }
    ],
    variants: [
      { name: "Standard", priceModifier: 0 },
      { name: "Off-Road Pack", priceModifier: 8500 },
      { name: "Premium Interior", priceModifier: 5500 }
    ],
    available: true,
    featured: true
  },
  {
    id: "rebel",
    name: "Rebel",
    series: "Rebel",
    tagline: "Adventure Without Limits",
    price: 119990,
    length: "17ft - 24ft",
    berth: 4,
    tare: "2,850kg",
    atm: "3,500kg",
    features: [
      "Heavy-duty off-road chassis",
      "Extended living space",
      "Dual battery system",
      "Premium outdoor kitchen",
      "Kids Bunks",
      "Premium Audio System"
    ],
    description: "This semi-offroad model is the ideal choice for those seeking to explore both on and off-road in style.",
    images: ["/rebelnew/RB-D1.png", "/rebelnew/RB-D2.png"],
    specs: [
      {
        category: "Dimensions",
        items: [
          { label: "External Length", value: "7.0m (23ft)" },
          { label: "External Width", value: "2.5m" },
          { label: "External Height", value: "3.05m" },
          { label: "Internal Height", value: "1.98m" }
        ]
      },
      {
        category: "Weights",
        items: [
          { label: "Tare Weight", value: "2,850kg" },
          { label: "ATM", value: "3,500kg" },
          { label: "Payload", value: "650kg" },
          { label: "Ball Weight", value: "220kg" }
        ]
      },
      {
        category: "Tanks",
        items: [
          { label: "Fresh Water", value: "200L" },
          { label: "Grey Water", value: "150L" },
          { label: "Hot Water", value: "20L Gas/Electric" }
        ]
      }
    ],
    variants: [
      { name: "Standard", priceModifier: 0 },
      { name: "Bunk Layout", priceModifier: 3500 },
      { name: "Extreme Off-Road", priceModifier: 12000 }
    ],
    available: true,
    featured: true
  },
  {
    id: "rogue",
    name: "Rogue",
    series: "Rogue",
    tagline: "The Ultimate Expedition",
    price: 159990,
    length: "17ft - 24ft",
    berth: 2,
    tare: "3,100kg",
    atm: "3,800kg",
    features: [
      "Flagship luxury features",
      "Maximum off-grid capability",
      "Premium entertainment system",
      "Complete self-sufficiency",
      "Full Slide-Out",
      "Club Lounge"
    ],
    description: "Ultimate off-road caravan designed for those that enjoy exploring locations off the beaten track.",
    images: ["/Rogue/RO-D1.png", "/Rogue/RO-D2.png"],
    specs: [
      {
        category: "Dimensions",
        items: [
          { label: "External Length", value: "7.6m (25ft)" },
          { label: "External Width", value: "2.5m (3.2m extended)" },
          { label: "External Height", value: "3.15m" },
          { label: "Internal Height", value: "1.98m" }
        ]
      },
      {
        category: "Weights",
        items: [
          { label: "Tare Weight", value: "3,100kg" },
          { label: "ATM", value: "3,800kg" },
          { label: "Payload", value: "700kg" },
          { label: "Ball Weight", value: "260kg" }
        ]
      },
      {
        category: "Tanks",
        items: [
          { label: "Fresh Water", value: "250L" },
          { label: "Grey Water", value: "180L" },
          { label: "Hot Water", value: "25L Gas/Electric" }
        ]
      }
    ],
    variants: [
      { name: "Standard", priceModifier: 0 },
      { name: "Luxury Pack", priceModifier: 15000 },
      { name: "Tech Package", priceModifier: 8000 }
    ],
    available: true,
    featured: true
  }
];

export const getFeaturedCaravans = () => caravans.filter(c => c.featured);
export const getCaravanById = (id: string) => caravans.find(c => c.id === id);
export const getCaravansBySeries = (series: string) => caravans.filter(c => c.series === series);