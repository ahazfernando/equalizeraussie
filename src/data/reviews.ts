export interface Review {
  id: string;
  author: string;
  location: string;
  caravanModel: string;
  caravanId: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified: boolean;
  tripHighlight?: string;
}

export const reviews: Review[] = [
  {
    id: "1",
    author: "David & Sue Thompson",
    location: "Brisbane, QLD",
    caravanModel: "Explorer 21",
    caravanId: "explorer-21",
    rating: 5,
    title: "Perfect for our lap of Australia",
    content: "We've just completed 18 months on the road in our Explorer 21 and it exceeded every expectation. The build quality is exceptional - not a single rattle or issue despite some rough outback roads. The kitchen layout is brilliant and we never felt cramped. Highly recommend Equalizer RV to anyone considering their first quality caravan.",
    date: "2024-11-15",
    verified: true,
    tripHighlight: "Gibb River Road, WA"
  },
  {
    id: "2",
    author: "The Mitchell Family",
    location: "Melbourne, VIC",
    caravanModel: "Outback 23",
    caravanId: "outback-23",
    rating: 5,
    title: "Our kids call it their adventure home",
    content: "After two years of research, we chose the Outback 23 for our family of four. The bunk setup is genius - our boys actually prefer it to their bedrooms at home! The off-road capability has opened up so many camping spots we never could have reached before. The after-sales support from the team has been outstanding.",
    date: "2024-10-22",
    verified: true,
    tripHighlight: "Cape York, QLD"
  },
  {
    id: "3",
    author: "Graham & Helen Peters",
    location: "Perth, WA",
    caravanModel: "Horizon 25",
    caravanId: "horizon-25",
    rating: 5,
    title: "Like having a real home on the road",
    content: "The slide-out on the Horizon 25 is a game-changer. We spent 8 weeks in Tasmania last winter and with the diesel heater and that extra living space, we were cozy as could be. Build quality is top-notch - you can see and feel the attention to detail everywhere. Worth every cent.",
    date: "2024-09-08",
    verified: true,
    tripHighlight: "Cradle Mountain, TAS"
  },
  {
    id: "4",
    author: "Mike O'Brien",
    location: "Adelaide, SA",
    caravanModel: "Summit 27",
    caravanId: "summit-27",
    rating: 5,
    title: "The pinnacle of Australian caravanning",
    content: "Upgraded from a competitor brand to the Summit 27 and the difference is night and day. The dual slide-outs create an unbelievable amount of space. The attention to the electrical system means we can stay off-grid for weeks. If you're serious about long-term touring in comfort, this is the one.",
    date: "2024-08-30",
    verified: true,
    tripHighlight: "Flinders Ranges, SA"
  },
  {
    id: "5",
    author: "Jenny & Steve Clark",
    location: "Sydney, NSW",
    caravanModel: "Compact 18",
    caravanId: "compact-18",
    rating: 5,
    title: "Don't need a truck to tow quality",
    content: "We were worried a smaller caravan meant lower quality, but the Compact 18 proved us wrong. It's incredibly well thought out - every storage space makes sense. Easy to tow with our Prado and fits into caravan parks the bigger vans can't access. Perfect weekend getaway vehicle.",
    date: "2024-07-14",
    verified: true,
    tripHighlight: "Blue Mountains, NSW"
  },
  {
    id: "6",
    author: "Robert & Linda Chen",
    location: "Gold Coast, QLD",
    caravanModel: "Explorer 21",
    caravanId: "explorer-21",
    rating: 4,
    title: "Great van, excellent service",
    content: "Six months into ownership and loving our Explorer 21. The team at Equalizer were fantastic throughout the buying process and beyond. Only minor issue was a small warranty claim which was handled promptly and professionally. Looking forward to many more adventures.",
    date: "2024-06-20",
    verified: true,
    tripHighlight: "Fraser Island, QLD"
  }
];

export const getReviewsByCaravan = (caravanId: string) => 
  reviews.filter(r => r.caravanId === caravanId);

export const getAverageRating = (caravanId: string) => {
  const caravanReviews = getReviewsByCaravan(caravanId);
  if (caravanReviews.length === 0) return 0;
  return caravanReviews.reduce((sum, r) => sum + r.rating, 0) / caravanReviews.length;
};
