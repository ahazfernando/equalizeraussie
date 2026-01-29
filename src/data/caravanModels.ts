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
  features: string[];
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
    image: "/actualmodels/cruzer-1.jpeg",
    features: [
      "Compact yet spacious design",
      "Off-road capable suspension",
      "Solar power ready",
      "Premium kitchen package",
    ],
    specifications: {
      electrical: [
        "200W of solar power (1 x 200W panel)",
        "Projecta 100Ah high discharge lithium battery",
        "Projecta PM300 battery management system",
        "External rear camera",
        "Internal LED bulkhead lighting",
        "LED reading lights at bed head & dinette with USB output",
        "Remote LED lights throughout the van",
        "Premium quality roof hatch with LED lights",
        "Rear LED tail lights",
        "Radio antenna"
      ],
      chassis: [
        "Reliable leaf spring suspension (2.5T single axle & 3.2T tandem axle)",
        "235/75/R15 All terrain tyres on load rated alloys",
        "10\" drum brakes (tandem axle) or 12\" drum brakes (single axle)",
        "Standard 50mm ball coupling",
        "Supagal chassis made with Australian RHS steel",
        "6\" drawbar with 4\" chassis and 2\" chassis raiser (tandem axle)",
        "Rear 2 arm bumper bar",
        "Mud flaps to avoid stones"
      ],
      appliances: [
        "Dometic reverse cycle air-conditioner",
        "188L 3-way fridge/freezer",
        "Premium front loader 3.5 kg washing machine (Excludes 17\" model)",
        "24\" Smart TV (12v)",
        "Wingard TV antenna",
        "Microwave",
        "Stove top with 3 gas, 1 electric element with separate grill",
        "Bluetooth sound system with internal & external speakers",
        "Smoke alarm",
      ],
      internal: [
        "Deluxe 6\'2\" pillow-top mattress",
        "Large size double glazed windows",
        "Nooks beside master bed with 240V & USB outlets for electronic device charging",
        "Modern CNC interior",
        "Comfortable dual density lounges with premium automotive grade, upholstery",
        "Soft close drawers on ball-bearing runners",
        "Premium brushed door & drawer catches (as per your build selection)",
        "Block out blinds and pulldown mesh screens to all windows",
        "Stylish acrylic finished cabinetry",
        "Recessed stove cover",
        "Pull-out pantries (as per floor plan)",
        "Large stylish grab handle on entry wall"
      ],
      external: [
        "Aluminum composite outside walls",
        "High checker plate for protection",
        "Premium, one-piece, fiberglass roof",
        "One-piece floor as per your build selection",
        "Roll-out awning",
        "Full length tunnel boot with lights inside",
        "External TV bracket, antenna, 12V and 240V power outlets",
        "Premium 3-point locking system, alloy SecuraMesh door",
        "Built-in external generator compartment (as per floor plan)",
        "Wheel arch with aluminium checker plate armour moulds",
        "External gas bayonet to the awning side of the caravan for BBQ",
        "Anderson plug to charge battery from car",
        "External grab handle with LED light",
        "Premium quality picnic table with LED lights",
      ],
      plumbing: [
        "190L of drinking water capacity (2 x 95L tanks)",
        "12V water pump",
        "2 x 9Kg gas bottles",
        "Gas & electric hot water system",
        "Digital water tank level display",
        "Ceramic inlay cassette toilet",
        "Flick mixer taps throughout",
        "Hidden plumbing and waste lines inside cabinetry (wherever possible)",
        "Lockable water filler to each water tank",
        "Tap on A-Frame with guard"
      ],
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
    image: "/caravan/RebelCaravan.png",
    features: [
      "Heavy-duty off-road chassis",
      "Extended living space",
      "Dual battery system",
      "Premium outdoor kitchen",
    ],
    specifications: {
      electrical: [
        "200W of solar power (1x200W panel)",
        "Projecta 100Ah high discharge lithium battery",
        "Projecta PM300 battery management system",
        "External rear camera",
        "Anti-dazzle LED strip light around the underbody of the caravan",
        "Internal LED bulkhead lighting",
        "LED reading light at bed head & dinette with USB output",
        "Remote LED lights throughout the van",
        "Premium quality roof hatch with LED lights",
        "Rear LED tail lights",
        "Radio antenna",
      ],
      chassis: [
        "Independent coil spring suspension (2.75T single axle & 3.3T tandem axle)",
        "265/75/R16 mud terrain tires on load-rated alloys",
        "10\" drum brakes (Tandem axle) or 12\" drum brakes (single axle)",
        "Small front toolbox for handy storage",
        "30cm A-frame extension",
        "D035 articulating coupling",
        "Supagal chassis made with Australian RHS steel",
        "6\" drawbar with 4\" chassis and 2\" chassis raiser",
        "Rear 3-arm bumper bar",
        "Single alloy entry step",
        "Mud flaps to avoid stones",
      ],
      appliances: [
        "Dometic reverse cycle air-conditioner",
        "224L 3-way fridge/freezer",
        "Premium front loader 3.5 kg washing machine",
        "24\" Smart TV (12V)",
        "Wingard TV antenna",
        "Microwave",
        "Stove top with 3 gas, 1 electric elements with separate grill",
        "Bluetooth sound system with internal & external speakers",
        "Smoke alarm",
      ],
      internal: [
        "Deluxe 6\'2\" pillow-top mattress",
        "Large size double glazed windows",
        "Stylish waterfall bench top",
        "Nooks beside master bed with 240V & USB outlets for electronic device charging",
        "Modern CNC interior cabinetry",
        "Comfortable dual density lounges with premium automotive grade upholstery",
        "Recess footrest to dinette seats (as per your floor plan)",
        "Soft close drawers on ball-bearing runners",
        "Premium brushed door & drawer catches (as per your build selection)",
        "Block out blinds and pulldown mesh screens to all windows",
        "Recessed stove cover",
        "Pull-out pantries (as per floor plan)",
        "Large stylish grab handle on entry door",
        "Premium quality ensuite mirror with additional magnifying glass",
        "Fire extinguisher",
      ],
      external: [
        "Aluminum composite outside walls",
        "Extra high checker plate for protection",
        "Premium, one-piece, fiberglass roof",
        "One-piece floor as per your build selection",
        "Roll-out awning",
        "Full-length tunnel boot with lights inside",
        "External TV bracket, antenna, 12V and 240V power outlets",
        "Premium 3-point locking system, alloy SecuraMesh door",
        "Built-in external generator compartment (as per floor plan)",
        "Wheel arch with aluminum checker plate armor moulds",
        "External gas bayonet to the awning side of the caravan for BBQ",
        "Anderson plug to charge battery from car",
        "External grab handle with LED light",
        "Premium quality picnic table with LEDs",
      ],
      plumbing: [
        "190L of drinking water capacity (2 x 95L tanks)",
        "12V water pump",
        "95L grey water tank with large water outlet",
        "2x9kg gas bottles",
        "Gas/electric hot water system",
        "Digital water tank level display",
        "Ceramic inlay cassette toilet",
        "Flick mixer taps throughout",
        "Hidden plumbing and waste lines inside cabinetry (wherever possible)",
        "Lockable water filler for each water tank",
        "Tap on A-Frame with guard",
      ],
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
    image: "/caravan/RogueCaravan.png",
    features: [
      "Flagship luxury features",
      "Maximum off-grid capability",
      "Premium entertainment system",
      "Complete self-sufficiency",
    ],
    specifications: {
      electrical: [
        "600W of solar power (3 x 200W panels)",
        "Projecta 200Ah high discharge lithium battery",
        "PM435-BT Projecta battery management system",
        "2000W inverter",
        "External rear camera",
        "Front & rear external LED light bars",
        "Anti-dazzle LED strip light around the underbody of the caravan",
        "Internal LED bulkhead lighting",
        "LED reading lights at bed head & dinette with USB output",
        "Remote LED lights throughout the van",
        "Premium quality roof hatches with LED lights",
        "Rear LED tail lights",
        "Radio antenna",
      ],
      chassis: [
        "Independent coil spring suspension with twin shock absorbers (3T single axle & 3.5T tandem axle)",
        "265/75/R16 premium mud terrain tyres on load-rated alloys",
        "12\" drum brakes",
        "Large front toolbox with 2 jerry can holders and generator slide inside",
        "50cm A-frame extension with front stone guard",
        "D035 articulating coupling",
        "Supagal chassis made with Australian RHS steel",
        "6\" drawbar with 4\" chassis and 4\" chassis raiser",
        "Rear 3 arm bumper bar",
        "Double alloy entry step",
        "Mud flaps to avoid stones",
      ],
      appliances: [
        "Dometic reverse cycle air-conditioner",
        "224L compressor fridge/freezer",
        "Premium front loader 3.5 kg washing machine",
        "24\" smart TV (12V)",
        "Wingard TV antenna",
        "Microwave",
        "Stove top with 3 x gas & 1 x electric elements",
        "Full oven with separate grill",
        "Bluetooth sound system with internal & external speakers",
        "Smoke alarm",
      ],
      internal: [
        "Deluxe 6\'2\" innerspring pillow-top mattress",
        "Large size double glazed windows",
        "Internal \'Black Pack\' consisting of black sink, tapware, shower trim, rail and fittings, cupboard door & drawer catches",
        "Stylish waterfall bench top",
        "Nooks beside master bed with 240V & USB outlets for electronic device charging",
        "Piano hinged cupboards with gas struts",
        "Comfortable dual density lounges with premium automotive grade upholstery",
        "Recess footrest to dinette seats (as per floor plan)",
        "Soft close drawers on ball-bearing runners",
        "Premium brushed door & drawer catches (as per your build selection)",
        "Block out blinds and pulldown mesh screens to all windows",
        "Recessed stove cover with laminated lid over stove",
        "Pull-out pantries (as per floor plan)",
        "Premium acrylic splash-backs",
        "Large stylish grab handle on entry wall at door",
        "Premium quality ensuite mirror with additional magnifying glass",
        "Fire extinguisher",
      ],
      external: [
        "Aluminum composite outside walls",
        "Extra high checker plate for protection",
        "Premium, one-piece, fiberglass roof",
        "One-piece floor as per your build selection",
        "Dust reduction system (DRS)",
        "Roll-out awning",
        "Full length tunnel boot with lights inside",
        "Entertainment hatch with TV bracket, antenna and 12V and 240V power outlets",
        "Premium 3-point locking system with SecuraMesh door",
        "Built-in external generator compartment (if applicable)",
        "Wheel arch with aluminum checker plate armor moulds",
        "External gas bayonet to the awning side of the caravan for BBQ",
        "Anderson plug to charge battery while driving",
        "External grab handle with push button LED light",
        "Premium quality picnic table with LED lights",
      ],
      plumbing: [
        "285L of drinking water capacity (3 x 95L tanks)",
        "12V water pump",
        "95L grey water tank with large water outlet",
        "External hot/cold shower",
        "2 x 9Kg gas bottles",
        "Gas/electric hot water system",
        "Digital water tank level display",
        "Ceramic inlay cassette toilet",
        "Flick mixer taps throughout",
        "Hidden plumbing and waste lines inside cabinetry (wherever possible)",
        "Lockable water filler to each water tank",
        "Tap on A Frame with guard",
      ],
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





