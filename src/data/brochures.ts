export interface BrochureRequest {
  id: string;
  fname: string;
  lname: string;
  email: string;
  brochure: string;
  message: string;
  postcode: string;
  state: string;
  status: "New" | "Sent" | "Followed Up" | "Closed";
  notes?: string;
  createdAt: string;
}

// In a real app, this would be stored in Firebase or a database
// For now, we'll use localStorage to persist data
export function getBrochureRequests(): BrochureRequest[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("brochureRequests");
  return stored ? JSON.parse(stored) : [];
}

export function saveBrochureRequest(
  request: Omit<BrochureRequest, "id" | "createdAt" | "status">
): BrochureRequest {
  const requests = getBrochureRequests();
  const newRequest: BrochureRequest = {
    ...request,
    id: Date.now().toString(),
    status: "New",
    createdAt: new Date().toISOString(),
  };
  requests.push(newRequest);
  localStorage.setItem("brochureRequests", JSON.stringify(requests));
  return newRequest;
}

export function updateBrochureStatus(
  id: string,
  status: BrochureRequest["status"],
  notes?: string
): void {
  const requests = getBrochureRequests();
  const updated = requests.map((r) =>
    r.id === id ? { ...r, status, notes: notes || r.notes } : r
  );
  localStorage.setItem("brochureRequests", JSON.stringify(updated));
}

export function getBrochureRequestById(id: string): BrochureRequest | undefined {
  return getBrochureRequests().find((r) => r.id === id);
}

// Sample data for development
export const sampleBrochureRequests: BrochureRequest[] = [
  {
    id: "1",
    fname: "Emma",
    lname: "Wilson",
    email: "emma.w@email.com",
    brochure: "Cruzer Model",
    message: "Please send me more information about the Cruzer model.",
    postcode: "4000",
    state: "QLD",
    status: "New",
    createdAt: "2024-12-11T16:45:00Z",
  },
  {
    id: "2",
    fname: "David",
    lname: "Lee",
    email: "david.lee@email.com",
    brochure: "Family Range",
    message: "Interested in the family range brochure.",
    postcode: "5000",
    state: "SA",
    status: "Sent",
    notes: "Brochure sent via email",
    createdAt: "2024-12-05T11:00:00Z",
  },
];
