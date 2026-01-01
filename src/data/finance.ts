export interface FinanceEnquiry {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  caravanModel: string;
  caravanId: string;
  loanAmount: number;
  deposit: number;
  loanTerm: number; // in months
  status: "Pending" | "Approved" | "Rejected" | "In Progress";
  notes?: string;
  createdAt: string;
}

export const financeEnquiries: FinanceEnquiry[] = [
  {
    id: "1",
    customerName: "James Wilson",
    email: "james.w@email.com",
    phone: "0411 222 333",
    caravanModel: "Explorer 21",
    caravanId: "explorer-21",
    loanAmount: 89990,
    deposit: 20000,
    loanTerm: 60,
    status: "Pending",
    notes: "Waiting for credit check",
    createdAt: "2024-12-10T09:00:00Z",
  },
  {
    id: "2",
    customerName: "Maria Garcia",
    email: "maria.g@email.com",
    phone: "0422 333 444",
    caravanModel: "Outback 23",
    caravanId: "outback-23",
    loanAmount: 109990,
    deposit: 30000,
    loanTerm: 72,
    status: "In Progress",
    notes: "Documents submitted, awaiting approval",
    createdAt: "2024-12-08T14:30:00Z",
  },
  {
    id: "3",
    customerName: "Robert Taylor",
    email: "robert.t@email.com",
    phone: "0433 444 555",
    caravanModel: "Horizon 25",
    caravanId: "horizon-25",
    loanAmount: 129990,
    deposit: 40000,
    loanTerm: 84,
    status: "Approved",
    createdAt: "2024-12-05T11:15:00Z",
  },
  {
    id: "4",
    customerName: "Jennifer Martinez",
    email: "jennifer.m@email.com",
    phone: "0444 555 666",
    caravanModel: "Summit 27",
    caravanId: "summit-27",
    loanAmount: 179990,
    deposit: 50000,
    loanTerm: 96,
    status: "Pending",
    notes: "High loan amount, requires additional review",
    createdAt: "2024-12-12T16:20:00Z",
  },
  {
    id: "5",
    customerName: "Michael Brown",
    email: "michael.b@email.com",
    phone: "0455 666 777",
    caravanModel: "Compact 18",
    caravanId: "compact-18",
    loanAmount: 69990,
    deposit: 15000,
    loanTerm: 48,
    status: "Rejected",
    notes: "Credit score below threshold",
    createdAt: "2024-12-07T10:45:00Z",
  },
  {
    id: "6",
    customerName: "Amanda Davis",
    email: "amanda.d@email.com",
    phone: "0466 777 888",
    caravanModel: "Explorer 21",
    caravanId: "explorer-21",
    loanAmount: 89990,
    deposit: 25000,
    loanTerm: 60,
    status: "In Progress",
    createdAt: "2024-12-11T13:00:00Z",
  },
];

export function getFinanceEnquiriesByStatus(status: FinanceEnquiry["status"]) {
  return financeEnquiries.filter((f) => f.status === status);
}

export function getFinanceEnquiryById(id: string): FinanceEnquiry | undefined {
  return financeEnquiries.find((f) => f.id === id);
}






