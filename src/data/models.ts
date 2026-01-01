export interface ModelSpec {
  category: string;
  items: string[];
}

export interface ModelData {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: string;
  priceNote?: string;
  highlights: string[];
  specifications: {
    electrical: ModelSpec;
    chassis: ModelSpec;
    appliances: ModelSpec;
    internal: ModelSpec;
    external: ModelSpec;
    plumbing: ModelSpec;
  };
}

export const models: Record<string, ModelData> = {
  cruzer: {
    id: "cruzer",
    name: "Cruzer",
    tagline: "The Perfect Entry Point",
    description: "The Cruzer combines compact convenience with premium features, making it the ideal choice for couples and weekend adventurers seeking quality without compromise.",
    price: "From $89,990",
    priceNote: "*Drive away pricing",
    highlights: [
      "Compact yet spacious design",
      "Off-road capable suspension",
      "Solar power ready",
      "Premium kitchen package"
    ],
    specifications: {
      electrical: {
        category: "Electrical",
        items: [
          "200W Solar Panel",
          "2000W Inverter/Charger",
          "LED Strip Lighting Throughout",
          "12V/240V Power Outlets",
          "200Ah Lithium Battery",
          "30A DC-DC Charger",
          "USB Charging Points x6",
          "Battery Management System"
        ]
      },
      chassis: {
        category: "Chassis",
        items: [
          "Independent Suspension",
          "Heavy Duty A-Frame",
          "Electric Brakes",
          "15\" Alloy Wheels",
          "Stone Guard Protection",
          "Off-Road Package Included"
        ]
      },
      appliances: {
        category: "Appliances",
        items: [
          "3-Burner Gas Cooktop",
          "12V/240V Fridge (150L)",
          "Microwave Oven",
          "Range Hood with LED",
          "External BBQ Point"
        ]
      },
      internal: {
        category: "Internal",
        items: [
          "Queen Bed with Storage",
          "Dinette Seating Area",
          "Premium Upholstery",
          "LED Reading Lights",
          "Storage Cupboards Throughout",
          "Windows with Flyscreens"
        ]
      },
      external: {
        category: "External",
        items: [
          "Roll-Out Awning",
          "External Shower",
          "240V Mains Connection",
          "Gas Bayonet Fitting",
          "Toolbox Storage",
          "Spare Wheel Carrier"
        ]
      },
      plumbing: {
        category: "Plumbing",
        items: [
          "90L Fresh Water Tank",
          "80L Grey Water Tank",
          "12V Water Pump",
          "Hot Water System (Gas/Electric)",
          "Shower with Mixer Tap",
          "Kitchen Sink with Mixer"
        ]
      }
    }
  },
  rebel: {
    id: "rebel",
    name: "Rebel",
    tagline: "Adventure Without Limits",
    description: "The Rebel is built for those who demand more from their adventures. With enhanced off-road capabilities and premium features, it's designed for extended journeys into the great outdoors.",
    price: "From $119,990",
    priceNote: "*Drive away pricing",
    highlights: [
      "Enhanced off-road capability",
      "Extended range power system",
      "Luxury interior finishes",
      "Advanced suspension system"
    ],
    specifications: {
      electrical: {
        category: "Electrical",
        items: [
          "400W Solar Panel",
          "3000W Inverter/Charger",
          "LED Strip Lighting Throughout",
          "12V/240V Power Outlets",
          "400Ah Lithium Battery",
          "50A DC-DC Charger",
          "USB Charging Points x8",
          "Advanced Battery Management System",
          "Solar Controller with Bluetooth"
        ]
      },
      chassis: {
        category: "Chassis",
        items: [
          "Heavy Duty Independent Suspension",
          "Reinforced A-Frame",
          "Electric Brakes with ABS",
          "16\" Alloy Wheels",
          "Full Stone Guard Protection",
          "Off-Road Package Standard",
          "Extended Chassis Warranty"
        ]
      },
      appliances: {
        category: "Appliances",
        items: [
          "4-Burner Gas Cooktop",
          "12V/240V Fridge (190L)",
          "Microwave Oven",
          "Range Hood with LED",
          "External BBQ Point",
          "Coffee Machine Ready"
        ]
      },
      internal: {
        category: "Internal",
        items: [
          "Queen Bed with Premium Mattress",
          "Convertible Dinette",
          "Luxury Upholstery Options",
          "LED Reading Lights",
          "Ample Storage Solutions",
          "Windows with Privacy Blinds",
          "Air Conditioning Ready"
        ]
      },
      external: {
        category: "External",
        items: [
          "Electric Roll-Out Awning",
          "External Shower with Hot Water",
          "240V Mains Connection",
          "Dual Gas Bayonet Fittings",
          "Large Toolbox Storage",
          "Spare Wheel Carrier",
          "External Entertainment Unit"
        ]
      },
      plumbing: {
        category: "Plumbing",
        items: [
          "150L Fresh Water Tank",
          "120L Grey Water Tank",
          "12V Water Pump with Pressure System",
          "Hot Water System (Gas/Electric)",
          "Shower with Mixer Tap",
          "Kitchen Sink with Mixer",
          "External Shower Connection"
        ]
      }
    }
  },
  rogue: {
    id: "rogue",
    name: "Rogue",
    tagline: "Ultimate Off-Road Luxury",
    description: "The Rogue represents the pinnacle of off-road caravan engineering. With premium features throughout and uncompromising build quality, it's designed for the most demanding adventurers.",
    price: "From $149,990",
    priceNote: "*Drive away pricing",
    highlights: [
      "Ultimate off-road performance",
      "Premium luxury throughout",
      "Maximum power independence",
      "Top-tier build quality"
    ],
    specifications: {
      electrical: {
        category: "Electrical",
        items: [
          "600W Solar Panel",
          "3000W Inverter/Charger",
          "Premium LED Lighting System",
          "12V/240V Power Outlets",
          "600Ah Lithium Battery",
          "50A DC-DC Charger",
          "USB-C & USB Charging Points x10",
          "Advanced Battery Management System",
          "Solar Controller with App Control",
          "Generator Ready Connection"
        ]
      },
      chassis: {
        category: "Chassis",
        items: [
          "Premium Independent Suspension",
          "Heavy Duty Reinforced A-Frame",
          "Electric Brakes with ABS",
          "17\" Alloy Wheels",
          "Full Body Stone Guard",
          "Premium Off-Road Package",
          "Extended Chassis Warranty",
          "Underbody Protection"
        ]
      },
      appliances: {
        category: "Appliances",
        items: [
          "5-Burner Gas Cooktop",
          "12V/240V Fridge (250L)",
          "Built-in Microwave Oven",
          "Premium Range Hood",
          "External BBQ Point",
          "Coffee Machine Included",
          "Dishwasher Ready"
        ]
      },
      internal: {
        category: "Internal",
        items: [
          "King Bed with Premium Mattress",
          "Convertible Dinette & Lounge",
          "Luxury Upholstery Throughout",
          "Premium LED Lighting",
          "Extensive Storage Solutions",
          "Windows with Privacy Blinds",
          "Reverse Cycle Air Conditioning",
          "Entertainment System"
        ]
      },
      external: {
        category: "External",
        items: [
          "Electric Roll-Out Awning with LED",
          "External Shower with Hot Water",
          "240V Mains Connection",
          "Dual Gas Bayonet Fittings",
          "Large Toolbox & Storage",
          "Spare Wheel Carrier",
          "External Entertainment Unit",
          "Outdoor Kitchen Ready"
        ]
      },
      plumbing: {
        category: "Plumbing",
        items: [
          "200L Fresh Water Tank",
          "150L Grey Water Tank",
          "12V Water Pump with Pressure System",
          "Hot Water System (Gas/Electric)",
          "Premium Shower with Mixer",
          "Kitchen Sink with Mixer",
          "External Shower Connection",
          "Water Filtration System"
        ]
      }
    }
  }
};

export function getModelById(id: string): ModelData | undefined {
  return models[id.toLowerCase()];
}

export function getAllModels(): ModelData[] {
  return Object.values(models);
}






