export interface Specification {
  category: string;
  items: string[];
}

export interface CaravanModel {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: string;
  priceValue: number;
  image: string;
  /** Gallery images for model detail page (from public/newmodels) */
  images?: string[];
  features: {
    title: string;
    description: string;
  }[];
  specifications: {
    electrical: string[];
    chassis: string[];
    appliances: string[];
    internal: string[];
    external: string[];
    plumbing: string[];
  };
  planscouples: {
    size1: string[];
    size2: string[];
    size3: string[];
    size4: string[];
    size5: string[];
    size6: string[];
    size7: string[];
    size8: string[];
    size9: string[];
    size10: string[];
  };
  plansfamily: {
    size1: string[];
    size2: string[];
    size3: string[];
    size4: string[];
    size5: string[];
    size6: string[];
  };
}

export const caravanModels: CaravanModel[] = [
  {
    id: "cruzer",
    name: "Cruzer",
    tagline: "The Perfect Entry Point",
    description: "The Cruzer by Equalizer RV is the perfect on-road model for touring in luxury! Designed to provide an unparalleled experience, combining functionality and style",
    price: "From $89,990",
    priceValue: 89990,
    image: "/newmodels/CruzerD1V1.png",
    images: [
      "/newmodels/CruzerD1V!C1.png",
      "/newmodels/CruzerD1V1.png",
      "/newmodels/CruzerD1V2.png",
      "/newmodels/CruzerD1V3.png",
      "/newmodels/CruzerD1V5.png"
    ],
    features: [
      {
        title: "Compact yet spacious design",
        description: "Smart layout optimizing space with a queen bed and full amenities."
      },
      {
        title: "Off-road capable suspension",
        description: "Leaf spring suspension with all-terrain tyres for smooth touring."
      },
      {
        title: "Solar power ready",
        description: "200W solar panel and 100Ah battery for off-grid confidence."
      },
      {
        title: "Premium kitchen package",
        description: "Full kitchen with compressor fridge, cooktop, and microwave."
      }
    ],
    specifications: {
      chassis: [
        "Leaf Spring Suspension 2.5T Single Axle",
        "12\" Drum Brakes",
        "245/75/R16 All Terrain Tyres",
        "Leaf Spring Suspension 3.2T Tandem Axle",
        "10\" Drum Brakes",
        "205/75/R15 All Terrain Tyres",
        "Standard 50mm Ball Coupling",
        "Supagal Chassis made with Australian RHS Steel",
        "6\" Drawbar",
        "4\" Chassis",
        "2\" Chassis Raiser",
        "Rear 2 Arm Bumper Bar",
        "Mud Flaps to Avoid Stones"
      ],
      appliances: [
        "Reverse Cycle Air-Conditioner",
        "NCE 270L Compressor Fridge",
        "Premium Top Loader 3.5 kg Washing Machine (Excludes 17' Model)",
        "24\" TV (12V)",
        "Dome TV Antenna",
        "Microwave",
        "Cooktop (3 x Gas & 1 x Electric Elements)",
        "NCE Mechless Head Bluetooth Sound System w/ Internal & External Speakers",
        "Smoke Alarm"
      ],
      electrical: [
        "BMPRO BMS",
        "200W of Solar Power",
        "100Ah AGM Battery",
        "Internal LED Bulkhead Lighting",
        "LED Reading Lights at Bed Head & Dinette w/ USB Output",
        "Premium Quality Roof Hatch w/ LED Lights",
        "Rear LED Tail Lights",
        "Radio Antenna"
      ],
      external: [
        "100% Timber Free PVC Polytech Composite Outside Walls (Lined with PVC Boards)",
        "High Checker Plate for Protection",
        "Premium, One-Piece, Fiberglass Roof",
        "One-Piece Honeycomb Floor",
        "Roll-Out Awning",
        "Full Length Tunnel Boot w/ Lights Inside",
        "External TV Bracket, Antenna, 12V & 240V Power Outlets",
        "Premium 3-Point Locking System, Alloy SecuraMesh Door",
        "Built-In External Generator Compartment (As Per Floor Plan)",
        "External Gas Bayonet to the Awning Side of the Caravan for BBQ",
        "Anderson Plug to Charge Battery",
        "External Grab Handle w/ LED Light",
        "Premium Quality Picnic Table w/ LED Lights"
      ],
      plumbing: [
        "190L Fresh Water (2 x 95L)",
        "Digital Water Tank Level Display",
        "12V Water Pump",
        "2 x 9kg Gas Bottles",
        "Globe Gas & Electric Hot Water System",
        "Thetford Plastic Bowl Cassette Toilet",
        "Flick Mixer Taps Throughout",
        "Hidden Plumbing & Waste Lines Inside Cabinetry (Wherever Possible)",
        "Lockable Water Filler Caps",
        "Tap on A-Frame w/ Guard"
      ],
      internal: [
        "Deluxe 6'2\" Pillow-Top Mattress",
        "Large Size Double Glazed Windows",
        "Nooks Beside Master Bed w/ 240V & USB Outlets for Electronic Device Charging",
        "Modern CNC Interior",
        "Comfortable Dual Density Lounges",
        "Premium Upholstery",
        "Soft Close Drawers",
        "Premium Brushed Door & Drawer Catches (As Per Your Build Selection)",
        "Block Out Blinds & Pulldown Mesh Screens",
        "Stylish Acrylic Finished Cabinetry",
        "Recessed Stove Cover",
        "Large Stylish Grab Handle on Entry Wall"
      ]
    },
    planscouples: {
      size1: [],
      size2: [],
      size3: [],
      size4: [],
      size5: [],
      size6: [],
      size7: [],
      size8: [],
      size9: [],
      size10: [],
    },
    plansfamily: {
      size1: [],
      size2: [],
      size3: [],
      size4: [],
      size5: [],
      size6: [],
    },
  },
  {
    id: "rebel",
    name: "Rebel",
    tagline: "Adventure Without Limits",
    description: "This semi-offroad model is the ideal choice for those seeking to explore both on and off-road in style.",
    price: "From $119,990",
    priceValue: 119990,
    image: "/newmodels/RebelD1V1.png",
    images: [
      "/newmodels/RebelD1V!C1.png",
      "/newmodels/RebelD1V1.png",
      "/newmodels/RebelD1V5.png",
      "/newmodels/RevelD1V3.png"
    ],
    features: [
      {
        title: "Heavy-duty off-road chassis",
        description: "Independent coil suspension and robust chassis for tough terrain."
      },
      {
        title: "Extended living space",
        description: "Spacious interior with cafe dinette and separate ensuite."
      },
      {
        title: "Dual battery system",
        description: "2x 100Ah batteries and 400W solar for extended stays."
      },
      {
        title: "Premium outdoor kitchen",
        description: "External gas bayonet and picnic table for outdoor living."
      }
    ],
    specifications: {
      chassis: [
        "Independent Coil Spring Suspension",
        "2.75T Single Axle w/ 12\" Drum Brakes",
        "3.3T Tandem Axle w/ 10\" Drum Brakes",
        "245/75/R16 All Terrain Tyres",
        "30cm A-Frame Extension",
        "DO35 Articulating Coupling",
        "Supagal Chassis made with Australian RHS Steel",
        "6\" Drawbar",
        "4\" Chassis",
        "2\" Chassis Raiser",
        "Small Front Toolbox for Handy Storage",
        "Rear 3-Arm Bumper Bar",
        "Single Alloy Entry Step",
        "Mud Flaps to Avoid Stones"
      ],
      appliances: [
        "Reverse Cycle Air-Conditioner",
        "NCE 270L Compressor Fridge",
        "Premium Front Loader 3.5 kg Washing Machine",
        "24\" TV (12V)",
        "Dome TV Antenna",
        "Microwave",
        "Cooktop (3 x Gas & 1 x Electric Elements)",
        "Separate Grill",
        "NCE Mechless Head Bluetooth Sound System w/ Internal & External Speakers",
        "Smoke Alarm"
      ],
      electrical: [
        "BMPRO BMS",
        "2 x 200W Solar Power",
        "2 x 100Ah AGM Batteries",
        "External Rear Camera",
        "Internal LED Bulkhead Lighting",
        "LED Reading Light at Bed Head & Dinette w/ USB Output",
        "Premium Quality Roof Hatch w/ LED Lights",
        "Rear LED Tail Lights",
        "Radio Antenna"
      ],
      external: [
        "100% Timber Free PVC Polytech Composite Outside Walls (Lined with PVC Boards)",
        "Extra High Checker Plate for Protection",
        "Premium, One-Piece, Fiberglass Roof",
        "One-Piece Honeycomb Floor",
        "Roll-Out Awning",
        "Full-Length Tunnel Boot w/ Lights Inside",
        "External TV Bracket, Antenna, 12V & 240V Power Outlets",
        "Premium 3-Point Locking System, Alloy SecuraMesh Door",
        "External Gas Bayonet to the Awning Side of the Caravan for BBQ",
        "Anderson Plug to Charge Battery",
        "External Grab Handle w/ LED Light",
        "Premium Quality Picnic Table w/ LEDs"
      ],
      plumbing: [
        "190L Fresh Water (2 x 95L)",
        "95L Grey Water",
        "Digital Water Tank Level Display",
        "12V Water Pump",
        "2 x 9kg Gas Bottles",
        "Globe Gas/Electric Hot Water System",
        "Ceramic Inlay Cassette Toilet",
        "Flick Mixer Taps Throughout",
        "Hidden Plumbing & Waste Lines Inside Cabinetry (Wherever Possible)",
        "Lockable Water Filler Caps",
        "Tap on A-Frame w/ Guard"
      ],
      internal: [
        "Deluxe 6'2\" Pillow-Top Mattress",
        "Large Size Double Glazed Windows",
        "Nooks Beside Master Bed w/ 240V & USB Outlets for Electronic Device Charging",
        "Modern CNC Interior Cabinetry",
        "Comfortable Dual Density Lounges",
        "Premium Upholstery",
        "Soft Close Drawers",
        "Block Out Blinds & Pulldown Mesh Screens",
        "Recessed Stove Cover",
        "Large Stylish Grab Handle on Entry Door",
        "Premium Quality Ensuite Mirror",
        "Fire Extinguisher"
      ]
    },
    planscouples: {
      size1: [],
      size2: [],
      size3: [],
      size4: [],
      size5: [],
      size6: [],
      size7: [],
      size8: [],
      size9: [],
      size10: [],
    },
    plansfamily: {
      size1: [],
      size2: [],
      size3: [],
      size4: [],
      size5: [],
      size6: [],
    },
  },
  {
    id: "rogue",
    name: "Rogue",
    tagline: "The Ultimate Expedition",
    description: "Ultimate off-road caravan designed for those that enjoy exploring locations off the beaten track.",
    price: "From $159,990",
    priceValue: 159990,
    image: "/newmodels/RogueD1V1.png",
    images: [
      "/newmodels/RogueD1V1.png",
      "/newmodels/RogueD1V2.png",
      "/newmodels/RogueD1V3.png",
      "/newmodels/RogueD1V5.png"
    ],
    features: [
      {
        title: "Flagship luxury features",
        description: "Black pack finishes, waterfall benchtop, and premium leather upholstery."
      },
      {
        title: "Maximum off-grid capability",
        description: "600W solar, 200Ah lithium battery, and 2000W inverter."
      },
      {
        title: "Premium entertainment system",
        description: "Smart TVs, Bluetooth sound system inside and out."
      },
      {
        title: "Complete self-sufficiency",
        description: "285L water capacity and grey water tank for remote travel."
      }
    ],
    specifications: {
      chassis: [
        "Independent Coil Spring Suspension",
        "3T Single Axle",
        "3.5T Tandem Axle",
        "Twin Shock Absorbers",
        "265/75/R16 All Terrain Tyres",
        "12\" Drum Brakes",
        "50cm A-Frame Extension",
        "Front Stone Guard",
        "DO35 Articulating Coupling",
        "Supagal Chassis made with Australian RHS Steel",
        "6\" Drawbar",
        "4\" Chassis",
        "4\" Chassis Raiser",
        "Large Front Toolbox",
        "2 x Jerry Can Holders",
        "Generator Slide Inside",
        "Rear 3 Arm Bumper Bar"
      ],
      appliances: [
        "Reverse Cycle Air-Conditioner",
        "NCE 270L Compressor Fridge",
        "Premium Front Loader 3.5 Kg Washing Machine",
        "24\" Smart TV (12V)",
        "Dome TV Antenna",
        "4-in-1 Microwave/Airfryer/Oven/Grill",
        "NCE Mechless Head Bluetooth Sound System w/ Internal & External Speakers",
        "Smoke Alarm"
      ],
      electrical: [
        "BMPRO Odyssey BMS",
        "3 x 200W of Solar Power",
        "2 x 100Ah Lithium Batteries",
        "2000W Inverter",
        "External Rear Camera",
        "Front & Rear External LED Light Bars",
        "Internal LED Bulkhead Lighting",
        "LED Reading Lights at Bed Head & Dinette w/ USB Output",
        "Premium Quality Roof Hatches w/ LED Lights",
        "Rear LED Tail Lights",
        "Radio Antenna"
      ],
      external: [
        "100% Timber Free PVC Polytech Composite Outside Walls (Lined with PVC Boards)",
        "Extra High Checker Plate for Protection",
        "Premium, One-Piece, Fiberglass Roof",
        "One-Piece Honeycomb Floor",
        "Roll-Out Awning",
        "Dust Reduction System (DRS)",
        "Full Length Tunnel Boot w/ Lights Inside",
        "Premium 3-Point Locking System with SecuraMesh Door",
        "Built-In External Generator Compartment (If Applicable)",
        "External Gas Bayonet to the Awning Side of the Caravan for BBQ",
        "Anderson Plug to Charge Battery",
        "External Grab Handle w/ Push Button LED Light",
        "Built In Picnic Table w/ LED Lights"
      ],
      plumbing: [
        "285L Fresh Water (3 x 95L)",
        "95L Grey Water",
        "Digital Water Tank Level",
        "12V Water Pump",
        "External Hot/Cold Shower",
        "2 x 9kg Gas Bottles",
        "Globe Gas/Electric HWS",
        "Ceramic Inlay Cassette Toilet",
        "Flick Mixer Taps Throughout",
        "Lockable Water Filler Caps",
        "Tap on A Frame w/ Guard"
      ],
      internal: [
        "Deluxe 6'2\" Innerspring Pillow-Top Mattress",
        "Large Size Double Glazed Windows",
        "Internal Black Pack",
        "Black Sink & Tapware",
        "Black Shower Trim",
        "Black Rail & Fittings",
        "Black Cupboard Door & Drawer Catches",
        "Nooks Beside Master Bed w/ 240V & USB",
        "Comfortable Dual Density Lounges",
        "Premium Upholstery",
        "Recess Footrest to Dinette Seats (As Per Floor Plan)",
        "Soft Close Drawers",
        "Block Out Blinds & Pulldown Mesh Screens",
        "Pull-Out Pantry (As Per Floor Plan)",
        "Large Stylish Grab Handle on Entry Wall",
        "Premium Quality Ensuite Mirror",
        "Fire Extinguisher"
      ]
    },
    planscouples: {
      size1: [],
      size2: [],
      size3: [],
      size4: [],
      size5: [],
      size6: [],
      size7: [],
      size8: [],
      size9: [],
      size10: [],
    },
    plansfamily: {
      size1: [],
      size2: [],
      size3: [],
      size4: [],
      size5: [],
      size6: [],
    },
  },
];

export function getCaravanModelById(id: string): CaravanModel | undefined {
  return caravanModels.find(model => model.id.toLowerCase() === id.toLowerCase());
}

export function getAllCaravanModels(): CaravanModel[] {
  return caravanModels;
}





