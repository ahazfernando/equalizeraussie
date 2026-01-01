export interface Caravan {
  id: string;
  name: string;
  series: string;
  tagline: string;
  price: number;
  length: string;
  berth: number;
  tare: string;
  atm: string;
  features: string[];
  description: string;
  images: string[];
  specs: {
    category: string;
    items: { label: string; value: string }[];
  }[];
  variants: { name: string; priceModifier: number }[];
  available: boolean;
  featured: boolean;
}
{/*}
export const caravans: Caravan[] = [
  {
    id: "explorer-21",
    name: "Explorer 21",
    series: "Explorer",
    tagline: "Compact Luxury for Couples",
    price: 89990,
    length: "21ft",
    berth: 2,
    tare: "2,450kg",
    atm: "3,200kg",
    features: [
      "Queen Island Bed",
      "Full Ensuite",
      "Diesel Heater",
      "200W Solar",
      "150L Fresh Water",
      "LED Lighting Throughout"
    ],
    description: "The Explorer 21 is the perfect entry into luxury touring. Designed for couples who refuse to compromise on comfort, this compact tourer delivers everything you need in an easy-to-tow package. Australian engineered and built to handle our unique conditions.",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
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
    id: "outback-23",
    name: "Outback 23",
    series: "Outback",
    tagline: "Built for Adventure",
    price: 119990,
    length: "23ft",
    berth: 4,
    tare: "2,850kg",
    atm: "3,500kg",
    features: [
      "Off-Road Suspension",
      "Dual Batteries",
      "300W Solar",
      "External Kitchen",
      "Kids Bunks",
      "Premium Audio System"
    ],
    description: "The Outback 23 is designed for families who want to explore Australia's rugged beauty without sacrificing comfort. With genuine off-road capability and smart family-friendly layouts, this caravan opens up a world of adventure.",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
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
    id: "horizon-25",
    name: "Horizon 25",
    series: "Horizon",
    tagline: "Spacious Touring Excellence",
    price: 149990,
    length: "25ft",
    berth: 2,
    tare: "3,100kg",
    atm: "3,800kg",
    features: [
      "Full Slide-Out",
      "Residential Kitchen",
      "Separate Lounge",
      "400W Solar",
      "Washing Machine Ready",
      "Club Lounge"
    ],
    description: "The Horizon 25 redefines what's possible in touring comfort. With an innovative slide-out design, you'll enjoy residential-sized living space while parked, then effortlessly pack down for the road ahead.",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
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
  },
  {
    id: "summit-27",
    name: "Summit 27",
    series: "Summit",
    tagline: "The Ultimate Touring Experience",
    price: 189990,
    length: "27ft",
    berth: 4,
    tare: "3,450kg",
    atm: "4,200kg",
    features: [
      "Dual Slide-Outs",
      "Separate Bedroom",
      "Full-Size Bathroom",
      "600W Solar",
      "Integrated Inverter",
      "Premium Everything"
    ],
    description: "The Summit 27 is our flagship model, representing the pinnacle of Australian caravan design. Every detail has been considered, every material chosen for quality and longevity. This is not just a caravan – it's a mobile home.",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    specs: [
      {
        category: "Dimensions",
        items: [
          { label: "External Length", value: "8.2m (27ft)" },
          { label: "External Width", value: "2.5m (3.8m extended)" },
          { label: "External Height", value: "3.2m" },
          { label: "Internal Height", value: "2.0m" }
        ]
      },
      {
        category: "Weights",
        items: [
          { label: "Tare Weight", value: "3,450kg" },
          { label: "ATM", value: "4,200kg" },
          { label: "Payload", value: "750kg" },
          { label: "Ball Weight", value: "300kg" }
        ]
      },
      {
        category: "Tanks",
        items: [
          { label: "Fresh Water", value: "300L" },
          { label: "Grey Water", value: "220L" },
          { label: "Hot Water", value: "30L Gas/Electric" }
        ]
      }
    ],
    variants: [
      { name: "Standard", priceModifier: 0 },
      { name: "Platinum Edition", priceModifier: 25000 },
      { name: "Off-Grid Package", priceModifier: 18000 }
    ],
    available: true,
    featured: false
  },
  {
    id: "compact-18",
    name: "Compact 18",
    series: "Compact",
    tagline: "Big Adventure, Small Package",
    price: 69990,
    length: "18ft",
    berth: 2,
    tare: "1,850kg",
    atm: "2,500kg",
    features: [
      "Lightweight Design",
      "Pop-Top Roof",
      "Compact Kitchen",
      "100W Solar",
      "Easy Towing",
      "Quality Finishes"
    ],
    description: "Don't let the size fool you – the Compact 18 delivers exceptional value and surprising spaciousness. Perfect for weekenders and those new to caravanning who want quality without compromise.",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    specs: [
      {
        category: "Dimensions",
        items: [
          { label: "External Length", value: "5.5m (18ft)" },
          { label: "External Width", value: "2.4m" },
          { label: "External Height", value: "2.8m" },
          { label: "Internal Height", value: "1.95m" }
        ]
      },
      {
        category: "Weights",
        items: [
          { label: "Tare Weight", value: "1,850kg" },
          { label: "ATM", value: "2,500kg" },
          { label: "Payload", value: "650kg" },
          { label: "Ball Weight", value: "140kg" }
        ]
      },
      {
        category: "Tanks",
        items: [
          { label: "Fresh Water", value: "95L" },
          { label: "Grey Water", value: "70L" },
          { label: "Hot Water", value: "15L Gas" }
        ]
      }
    ],
    variants: [
      { name: "Standard", priceModifier: 0 },
      { name: "Adventure Ready", priceModifier: 5000 }
    ],
    available: true,
    featured: false
  }
];

export const getFeaturedCaravans = () => caravans.filter(c => c.featured);
export const getCaravanById = (id: string) => caravans.find(c => c.id === id);
export const getCaravansBySeries = (series: string) => caravans.filter(c => c.series === series);

*/}