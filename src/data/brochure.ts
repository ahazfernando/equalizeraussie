export interface Brochure {
  id: string;
  name: string;
  category: string;
  image: string;
  description?: string;
}

export const brochures: Brochure[] = [
  {
    id: "1",
    name: "Cruzer Model",
    category: "On-Road",
    image: "/brochure/caravan-1.jpg",
    description: "Perfect entry-level caravan for on-road adventures",
  },
  {
    id: "2",
    name: "Rebel Model",
    category: "Semi-Offroad",
    image: "/brochure/caravan-2.jpg",
    description: "Semi-offroad capability with luxury features",
  },
  {
    id: "3",
    name: "Rogue Model",
    category: "Off-Road",
    image: "/brochure/caravan-3.jpg",
    description: "Ultimate off-road expedition caravan",
  },
  {
    id: "4",
    name: "Family Range",
    category: "Family",
    image: "/brochure/caravan-4.jpg",
    description: "Spacious family caravans with bunk beds",
  },
  {
    id: "5",
    name: "Couples Range",
    category: "Couples",
    image: "/brochure/caravan-5.jpg",
    description: "Compact and cozy caravans for couples",
  },
];
