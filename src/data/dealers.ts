export interface Dealer {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  region: string;
}

export interface Region {
  id: string;
  name: string;
}

export const regions: Region[] = [
  { id: "sa", name: "South Australia" },
  { id: "vic", name: "Victoria" },
  { id: "nsw", name: "New South Wales" },
  { id: "qld", name: "Queensland" },
  { id: "wa", name: "Western Australia" },
  { id: "tas", name: "Tasmania" },
  { id: "nt", name: "Northern Territory" },
  { id: "act", name: "Australian Capital Territory" },
];

export const dealers: Dealer[] = [
  {
    id: "1",
    name: "Equalizer RV Melbourne",
    address: "123 Main Street, Melbourne, VIC 3000",
    phone: "(03) 1234 5678",
    email: "melbourne@equalizerrv.com.au",
    region: "vic",
  },
  {
    id: "2",
    name: "Equalizer RV Sydney",
    address: "456 George Street, Sydney, NSW 2000",
    phone: "(02) 9876 5432",
    email: "sydney@equalizerrv.com.au",
    region: "nsw",
  },
  {
    id: "3",
    name: "Equalizer RV Adelaide",
    address: "789 King William Street, Adelaide, SA 5000",
    phone: "(08) 1111 2222",
    email: "adelaide@equalizerrv.com.au",
    region: "sa",
  },
  {
    id: "4",
    name: "Equalizer RV Brisbane",
    address: "321 Queen Street, Brisbane, QLD 4000",
    phone: "(07) 3333 4444",
    email: "brisbane@equalizerrv.com.au",
    region: "qld",
  },
  {
    id: "5",
    name: "Equalizer RV Perth",
    address: "654 St Georges Terrace, Perth, WA 6000",
    phone: "(08) 5555 6666",
    email: "perth@equalizerrv.com.au",
    region: "wa",
  },
];

export function getDealersByRegion(regionId: string): Dealer[] {
  return dealers.filter((dealer) => dealer.region === regionId);
}
