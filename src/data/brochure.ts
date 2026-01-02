export interface Brochure {
  id: string;
  name: string;
  category: string;
  image: string;
  description?: string;
  tagline?: string;
  length?: string;
  berth?: number;
  tare?: string;
  features?: string[];
}

export const brochures: Brochure[] = [
  {
    id: "1",
    name: "Cruzer Model",
    category: "On-Road",
    image: "/caravan/CruzerCaravan.png",
    description: "Perfect entry-level caravan for on-road adventures",
    tagline: "Perfect On Road Model",
    length: "17-21ft",
    berth: 2,
    tare: "2,450kg",
    features: [
      "Queen Island Bed",
      "Full Ensuite",
      "Diesel Heater",
      "200W Solar",
      "150L Fresh Water",
      "LED Lighting Throughout"
    ],
  },
  {
    id: "2",
    name: "Rebel Model",
    category: "Semi-Offroad",
    image: "/caravan/RebelCaravan.png",
    description: "Semi-offroad capability with luxury features",
    tagline: "Semi Offroad Model",
    length: "19-23ft",
    berth: 4,
    tare: "2,850kg",
    features: [
      "Off-Road Suspension",
      "Dual Batteries",
      "300W Solar",
      "Bunk Beds",
      "Large Kitchen",
      "Full Ensuite"
    ],
  },
  {
    id: "3",
    name: "Rogue Model",
    category: "Off-Road",
    image: "/caravan/RogueCaravan.png",
    description: "Ultimate off-road expedition caravan",
    tagline: "Off Road Model",
    length: "20-24ft",
    berth: 4,
    tare: "3,200kg",
    features: [
      "Ultimate Off-Road Suspension",
      "Dual Batteries",
      "400W Solar",
      "Independent Suspension",
      "Heavy Duty Chassis",
      "Full Ensuite"
    ],
  },
  {
    id: "4",
    name: "Family Range",
    category: "Family",
    image: "/caravan/CruzerCaravan.png",
    description: "Spacious family caravans with bunk beds",
    tagline: "Built for Adventure",
    length: "23ft",
    berth: 4,
    tare: "2,850kg",
    features: [
      "Off-Road Suspension",
      "Dual Batteries",
      "300W Solar",
      "Bunk Beds",
      "Large Kitchen",
      "Full Ensuite"
    ],
  },
  {
    id: "5",
    name: "Couples Range",
    category: "Couples",
    image: "/caravan/RebelCaravan.png",
    description: "Compact and cozy caravans for couples",
    tagline: "Perfect for Two",
    length: "21ft",
    berth: 2,
    tare: "2,450kg",
    features: [
      "Queen Island Bed",
      "Full Ensuite",
      "Diesel Heater",
      "200W Solar",
      "150L Fresh Water",
      "LED Lighting Throughout"
    ],
  },
];
