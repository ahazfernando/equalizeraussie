export interface Quote {
  id: string;
  name: string;
  email: string;
  phone: string;
  model: string;
  message: string;
  postcode: string;
  state: string;
  status: "New" | "Contacted" | "Quoted" | "Closed";
  notes?: string;
  createdAt: string;
}

// In a real app, this would be stored in Firebase or a database
// For now, we'll use localStorage to persist data
export function getQuotes(): Quote[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("quotes");
  return stored ? JSON.parse(stored) : [];
}

export function saveQuote(quote: Omit<Quote, "id" | "createdAt" | "status">): Quote {
  const quotes = getQuotes();
  const newQuote: Quote = {
    ...quote,
    id: Date.now().toString(),
    status: "New",
    createdAt: new Date().toISOString(),
  };
  quotes.push(newQuote);
  localStorage.setItem("quotes", JSON.stringify(quotes));
  return newQuote;
}

export function updateQuoteStatus(id: string, status: Quote["status"], notes?: string): void {
  const quotes = getQuotes();
  const updated = quotes.map((q) =>
    q.id === id ? { ...q, status, notes: notes || q.notes } : q
  );
  localStorage.setItem("quotes", JSON.stringify(updated));
}

export function getQuoteById(id: string): Quote | undefined {
  return getQuotes().find((q) => q.id === id);
}

// Sample data for development
export const sampleQuotes: Quote[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "0412 345 678",
    model: "Cruzer",
    message: "Interested in getting a quote for the Cruzer model. Looking for a family-friendly option.",
    postcode: "3000",
    state: "VIC",
    status: "New",
    createdAt: "2024-12-10T10:30:00Z",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "0423 456 789",
    model: "Rebel",
    message: "Would like pricing information for the Rebel model.",
    postcode: "2000",
    state: "NSW",
    status: "Contacted",
    notes: "Followed up via email",
    createdAt: "2024-12-08T14:20:00Z",
  },
];
