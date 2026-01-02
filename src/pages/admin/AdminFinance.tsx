"use client";

import { useState } from "react";
import { financeEnquiries, FinanceEnquiry } from "@/data/finance";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, DollarSign, CheckCircle, XCircle, Clock, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FinanceStatus = "Pending" | "Approved" | "Rejected" | "In Progress" | "All";

export default function AdminFinance() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<FinanceStatus>("All");
  const [enquiryList, setEnquiryList] = useState(financeEnquiries);

  const filteredEnquiries = enquiryList.filter((enquiry) => {
    const matchesSearch =
      enquiry.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.caravanModel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || enquiry.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const updateStatus = (id: string, newStatus: FinanceEnquiry["status"]) => {
    setEnquiryList(
      enquiryList.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
    );
  };

  const statusCounts = {
    All: enquiryList.length,
    Pending: enquiryList.filter((e) => e.status === "Pending").length,
    "In Progress": enquiryList.filter((e) => e.status === "In Progress").length,
    Approved: enquiryList.filter((e) => e.status === "Approved").length,
    Rejected: enquiryList.filter((e) => e.status === "Rejected").length,
  };

  const totalLoanAmount = enquiryList.reduce((sum, e) => sum + e.loanAmount, 0);
  const totalDeposit = enquiryList.reduce((sum, e) => sum + e.deposit, 0);

  const getStatusBadge = (status: FinanceEnquiry["status"]) => {
    const variants: Record<FinanceEnquiry["status"], string> = {
      Pending: "bg-gold/20 text-gold border-gold/30",
      "In Progress": "bg-accent/20 text-accent border-accent/30",
      Approved: "bg-sage/20 text-sage border-sage/30",
      Rejected: "bg-destructive/20 text-destructive border-destructive/30",
    };
    return (
      <Badge variant="outline" className={variants[status]}>
        {status}
      </Badge>
    );
  };

  const calculateMonthlyPayment = (amount: number, deposit: number, term: number) => {
    const principal = amount - deposit;
    const annualRate = 0.069; // 6.9% annual rate
    const monthlyRate = annualRate / 12;
    if (monthlyRate === 0) return principal / term;
    return (
      (principal * monthlyRate * Math.pow(1 + monthlyRate, term)) /
      (Math.pow(1 + monthlyRate, term) - 1)
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-wider">Finance Enquiry Management</h2>
        <p className="text-muted-foreground text-base md:text-lg mt-2">
          Manage customer finance applications and loan enquiries
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <div className="admin-card p-4">
          <p className="text-sm text-muted-foreground">Total Enquiries</p>
          <p className="text-2xl font-bold mt-1">{statusCounts.All}</p>
        </div>
        <div className="admin-card p-4">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-gold" />
            <p className="text-sm text-muted-foreground">Pending</p>
          </div>
          <p className="text-2xl font-bold">{statusCounts.Pending}</p>
        </div>
        <div className="admin-card p-4">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-4 h-4 text-accent" />
            <p className="text-sm text-muted-foreground">In Progress</p>
          </div>
          <p className="text-2xl font-bold">{statusCounts["In Progress"]}</p>
        </div>
        <div className="admin-card p-4">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="w-4 h-4 text-sage" />
            <p className="text-sm text-muted-foreground">Approved</p>
          </div>
          <p className="text-2xl font-bold">{statusCounts.Approved}</p>
        </div>
        <div className="admin-card p-4">
          <div className="flex items-center gap-2 mb-1">
            <XCircle className="w-4 h-4 text-destructive" />
            <p className="text-sm text-muted-foreground">Rejected</p>
          </div>
          <p className="text-2xl font-bold">{statusCounts.Rejected}</p>
        </div>
        <div className="admin-card p-4">
          <p className="text-sm text-muted-foreground">Total Loan Value</p>
          <p className="text-xl font-bold mt-1">
            ${(totalLoanAmount / 1000).toFixed(0)}k
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by customer name, model, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as FinanceStatus)}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Status</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Approved">Approved</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Enquiries Table */}
      <div className="admin-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-base font-bold text-muted-foreground tracking-wider">
                  Customer
                </th>
                <th className="text-left py-3 px-4 text-base font-bold text-muted-foreground tracking-wider">
                  Caravan Model
                </th>
                <th className="text-left py-3 px-4 text-base font-bold text-muted-foreground tracking-wider">
                  Loan Details
                </th>
                <th className="text-left py-3 px-4 text-base font-bold text-muted-foreground tracking-wider">
                  Monthly Payment
                </th>
                <th className="text-left py-3 px-4 text-base font-bold text-muted-foreground tracking-wider">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-base font-bold text-muted-foreground tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredEnquiries.map((enquiry) => {
                const monthlyPayment = calculateMonthlyPayment(
                  enquiry.loanAmount,
                  enquiry.deposit,
                  enquiry.loanTerm
                );
                return (
                  <tr
                    key={enquiry.id}
                    className="border-b border-border/50 hover:bg-secondary/30"
                  >
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium">{enquiry.customerName}</p>
                        <p className="text-xs text-muted-foreground">
                          {enquiry.email}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {enquiry.phone}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-medium">{enquiry.caravanModel}</p>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm">
                        <p>
                          <span className="text-muted-foreground">Loan:</span>{" "}
                          ${enquiry.loanAmount.toLocaleString()}
                        </p>
                        <p>
                          <span className="text-muted-foreground">Deposit:</span>{" "}
                          ${enquiry.deposit.toLocaleString()}
                        </p>
                        <p>
                          <span className="text-muted-foreground">Term:</span>{" "}
                          {enquiry.loanTerm} months
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-medium">
                        ${monthlyPayment.toFixed(2)}/mo
                      </p>
                    </td>
                    <td className="py-4 px-4">{getStatusBadge(enquiry.status)}</td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col gap-2">
                        {enquiry.status === "Pending" && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateStatus(enquiry.id, "In Progress")}
                              className="w-full sm:w-auto"
                            >
                              Start Processing
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateStatus(enquiry.id, "Rejected")}
                              className="w-full sm:w-auto text-destructive"
                            >
                              Reject
                            </Button>
                          </>
                        )}
                        {enquiry.status === "In Progress" && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateStatus(enquiry.id, "Approved")}
                              className="w-full sm:w-auto"
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateStatus(enquiry.id, "Rejected")}
                              className="w-full sm:w-auto text-destructive"
                            >
                              Reject
                            </Button>
                          </>
                        )}
                        {enquiry.notes && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Note: {enquiry.notes}
                          </p>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filteredEnquiries.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No finance enquiries found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}






