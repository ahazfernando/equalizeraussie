export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  postcode: string;
  state: string;
  status: "New" | "Contacted" | "Resolved" | "Closed";
  notes?: string;
  createdAt: string;
}

// In a real app, this would be stored in Firebase or a database
// For now, we'll use localStorage to persist data
export function getInquiries(): Inquiry[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("inquiries");
  return stored ? JSON.parse(stored) : [];
}

export function saveInquiry(inquiry: Omit<Inquiry, "id" | "createdAt" | "status">): Inquiry {
  const inquiries = getInquiries();
  const newInquiry: Inquiry = {
    ...inquiry,
    id: Date.now().toString(),
    status: "New",
    createdAt: new Date().toISOString(),
  };
  inquiries.push(newInquiry);
  localStorage.setItem("inquiries", JSON.stringify(inquiries));
  return newInquiry;
}

export function updateInquiryStatus(
  id: string,
  status: Inquiry["status"],
  notes?: string
): void {
  const inquiries = getInquiries();
  const updated = inquiries.map((i) =>
    i.id === id ? { ...i, status, notes: notes || i.notes } : i
  );
  localStorage.setItem("inquiries", JSON.stringify(updated));
}

export function getInquiryById(id: string): Inquiry | undefined {
  return getInquiries().find((i) => i.id === id);
}

// Sample data for development
export const sampleInquiries: Inquiry[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "0412 345 678",
    interest: "Find a Dealer",
    message: "Looking for a dealer near Melbourne to view the Cruzer model.",
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
    interest: "Request Quote",
    message: "Interested in getting a quote for the Rebel model.",
    postcode: "2000",
    state: "NSW",
    status: "Contacted",
    notes: "Followed up via email",
    createdAt: "2024-12-08T14:20:00Z",
  },
];
