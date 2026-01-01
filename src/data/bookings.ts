export interface Booking {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  caravanModel: string;
  caravanId: string;
  preferredDate: string;
  status: "Pending" | "Confirmed" | "Cancelled" | "Completed";
  notes?: string;
  createdAt: string;
}

export const bookings: Booking[] = [
  {
    id: "1",
    customerName: "John Smith",
    email: "john.smith@email.com",
    phone: "0412 345 678",
    caravanModel: "Explorer 21",
    caravanId: "explorer-21",
    preferredDate: "2024-12-20",
    status: "Pending",
    notes: "Interested in viewing on weekend",
    createdAt: "2024-12-10T10:30:00Z",
  },
  {
    id: "2",
    customerName: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "0423 456 789",
    caravanModel: "Outback 23",
    caravanId: "outback-23",
    preferredDate: "2024-12-18",
    status: "Confirmed",
    notes: "Confirmed for 2pm viewing",
    createdAt: "2024-12-08T14:20:00Z",
  },
  {
    id: "3",
    customerName: "Mike Brown",
    email: "mike.brown@email.com",
    phone: "0434 567 890",
    caravanModel: "Horizon 25",
    caravanId: "horizon-25",
    preferredDate: "2024-12-22",
    status: "Pending",
    createdAt: "2024-12-12T09:15:00Z",
  },
  {
    id: "4",
    customerName: "Emma Wilson",
    email: "emma.w@email.com",
    phone: "0445 678 901",
    caravanModel: "Summit 27",
    caravanId: "summit-27",
    preferredDate: "2024-12-19",
    status: "Confirmed",
    notes: "Follow up required",
    createdAt: "2024-12-11T16:45:00Z",
  },
  {
    id: "5",
    customerName: "David Lee",
    email: "david.lee@email.com",
    phone: "0456 789 012",
    caravanModel: "Compact 18",
    caravanId: "compact-18",
    preferredDate: "2024-12-17",
    status: "Completed",
    createdAt: "2024-12-05T11:00:00Z",
  },
  {
    id: "6",
    customerName: "Lisa Anderson",
    email: "lisa.a@email.com",
    phone: "0467 890 123",
    caravanModel: "Explorer 21",
    caravanId: "explorer-21",
    preferredDate: "2024-12-21",
    status: "Pending",
    createdAt: "2024-12-13T13:30:00Z",
  },
];

export function getBookingsByStatus(status: Booking["status"]) {
  return bookings.filter((b) => b.status === status);
}

export function getBookingById(id: string): Booking | undefined {
  return bookings.find((b) => b.id === id);
}






