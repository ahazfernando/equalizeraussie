"use client";

import { useState, useEffect } from "react";
import { getInquiries, updateInquiryStatus, Inquiry } from "@/data/inquiries";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, MessageCircle, CheckCircle, XCircle, Clock, Filter, Mail, Phone, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type InquiryStatus = "New" | "Contacted" | "Resolved" | "Closed" | "All";
type StateFilter = "All" | "NSW" | "VIC" | "QLD" | "WA" | "SA" | "TAS" | "NT" | "ACT";

export default function AdminInquiries() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<InquiryStatus>("All");
  const [stateFilter, setStateFilter] = useState<StateFilter>("All");
  const [inquiryList, setInquiryList] = useState<Inquiry[]>([]);

  useEffect(() => {
    // Load inquiries from localStorage
    setInquiryList(getInquiries());
    
    // Set up interval to refresh inquiries (in case they're updated elsewhere)
    const interval = setInterval(() => {
      setInquiryList(getInquiries());
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const filteredInquiries = inquiryList.filter((inquiry) => {
    const matchesSearch =
      inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.interest.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || inquiry.status === statusFilter;
    const matchesState = stateFilter === "All" || inquiry.state === stateFilter;
    
    return matchesSearch && matchesStatus && matchesState;
  });

  const handleStatusUpdate = (id: string, newStatus: Inquiry["status"]) => {
    updateInquiryStatus(id, newStatus);
    setInquiryList(getInquiries());
  };

  const statusCounts = {
    All: inquiryList.length,
    New: inquiryList.filter((i) => i.status === "New").length,
    Contacted: inquiryList.filter((i) => i.status === "Contacted").length,
    Resolved: inquiryList.filter((i) => i.status === "Resolved").length,
    Closed: inquiryList.filter((i) => i.status === "Closed").length,
  };

  const getStatusBadge = (status: Inquiry["status"]) => {
    const variants: Record<Inquiry["status"], string> = {
      New: "bg-accent/20 text-accent border-accent/30",
      Contacted: "bg-gold/20 text-gold border-gold/30",
      Resolved: "bg-sage/20 text-sage border-sage/30",
      Closed: "bg-muted/20 text-muted-foreground border-muted/30",
    };
    return (
      <Badge variant="outline" className={`${variants[status]} text-sm px-3 py-1`}>
        {status}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-AU", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getInterestLabel = (interest: string) => {
    const labels: Record<string, string> = {
      dealer: "Find a Dealer",
      quote: "Request Quote",
      support: "Service Support",
    };
    return labels[interest] || interest;
  };

  return (
    <div className="space-y-6 font-instruments-sans">
      {/* Header */}
      <div>
        <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-wider">Contact Inquiries</h2>
        <p className="text-muted-foreground text-base md:text-lg mt-2">
          Manage customer contact form inquiries and messages
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="admin-card p-4">
          <p className="text-sm text-muted-foreground">Total</p>
          <p className="text-2xl font-bold mt-1">{statusCounts.All}</p>
        </div>
        <div className="admin-card p-4">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-accent" />
            <p className="text-sm text-muted-foreground">New</p>
          </div>
          <p className="text-2xl font-bold">{statusCounts.New}</p>
        </div>
        <div className="admin-card p-4">
          <div className="flex items-center gap-2 mb-1">
            <Mail className="w-4 h-4 text-gold" />
            <p className="text-sm text-muted-foreground">Contacted</p>
          </div>
          <p className="text-2xl font-bold">{statusCounts.Contacted}</p>
        </div>
        <div className="admin-card p-4">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="w-4 h-4 text-sage" />
            <p className="text-sm text-muted-foreground">Resolved</p>
          </div>
          <p className="text-2xl font-bold">{statusCounts.Resolved}</p>
        </div>
        <div className="admin-card p-4">
          <div className="flex items-center gap-2 mb-1">
            <XCircle className="w-4 h-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Closed</p>
          </div>
          <p className="text-2xl font-bold">{statusCounts.Closed}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, interest, phone, or message..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as InquiryStatus)}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Status</SelectItem>
            <SelectItem value="New">New</SelectItem>
            <SelectItem value="Contacted">Contacted</SelectItem>
            <SelectItem value="Resolved">Resolved</SelectItem>
            <SelectItem value="Closed">Closed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={stateFilter} onValueChange={(value) => setStateFilter(value as StateFilter)}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <MapPin className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by state" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All States</SelectItem>
            <SelectItem value="NSW">NSW</SelectItem>
            <SelectItem value="VIC">VIC</SelectItem>
            <SelectItem value="QLD">QLD</SelectItem>
            <SelectItem value="WA">WA</SelectItem>
            <SelectItem value="SA">SA</SelectItem>
            <SelectItem value="TAS">TAS</SelectItem>
            <SelectItem value="NT">NT</SelectItem>
            <SelectItem value="ACT">ACT</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Inquiries Accordion */}
      <div className="admin-card">
        {filteredInquiries.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No inquiries found matching your criteria.
          </div>
        ) : (
          <Accordion type="single" collapsible className="w-full">
            {filteredInquiries.map((inquiry) => (
              <AccordionItem key={inquiry.id} value={inquiry.id} className="border-b border-border/50">
                <AccordionTrigger className="hover:no-underline px-4">
                  <div className="flex flex-1 items-center justify-between pr-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 flex-1 text-left">
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="text-base md:text-lg font-semibold">{inquiry.name}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                            <Mail className="w-4 h-4" />
                            {inquiry.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-5 h-5 text-muted-foreground" />
                        <p className="text-base font-medium">{getInterestLabel(inquiry.interest)}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-5 h-5 text-muted-foreground" />
                        <p className="text-base">
                          {inquiry.state} {inquiry.postcode}
                        </p>
                      </div>
                      <p className="text-base text-muted-foreground">
                        {formatDate(inquiry.createdAt)}
                      </p>
                      {getStatusBadge(inquiry.status)}
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4">
                  <div className="space-y-6 pt-4">
                    <div>
                      <h4 className="text-xl font-bold mb-3 tracking-wider">Customer Information</h4>
                      <div className="space-y-2 text-base">
                        <p><span className="text-muted-foreground">Name:</span> {inquiry.name}</p>
                        <p><span className="text-muted-foreground">Email:</span> {inquiry.email}</p>
                        {inquiry.phone && (
                          <p className="flex items-center gap-2">
                            <Phone className="w-5 h-5 text-muted-foreground" />
                            <span className="text-muted-foreground">Phone:</span> {inquiry.phone}
                          </p>
                        )}
                        <p className="flex items-center gap-2">
                          <MapPin className="w-5 h-5 text-muted-foreground" />
                          <span className="text-muted-foreground">Location:</span> {inquiry.state} {inquiry.postcode}
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-3 tracking-wider">Interest</h4>
                      <p className="text-base">{getInterestLabel(inquiry.interest)}</p>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-3 tracking-wider">Message</h4>
                      <p className="text-base text-muted-foreground whitespace-pre-wrap">{inquiry.message}</p>
                    </div>
                    {inquiry.notes && (
                      <div>
                        <h4 className="text-xl font-bold mb-3 tracking-wider">Admin Notes</h4>
                        <p className="text-base text-muted-foreground">{inquiry.notes}</p>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-border/50">
                      {inquiry.status === "New" && (
                        <>
                          <Button
                            size="default"
                            variant="outline"
                            onClick={() => handleStatusUpdate(inquiry.id, "Contacted")}
                            className="text-sm"
                          >
                            Mark Contacted
                          </Button>
                          <Button
                            size="default"
                            variant="outline"
                            onClick={() => handleStatusUpdate(inquiry.id, "Resolved")}
                            className="text-sm"
                          >
                            Mark Resolved
                          </Button>
                        </>
                      )}
                      {inquiry.status === "Contacted" && (
                        <Button
                          size="default"
                          variant="outline"
                          onClick={() => handleStatusUpdate(inquiry.id, "Resolved")}
                          className="text-sm"
                        >
                          Mark Resolved
                        </Button>
                      )}
                      {inquiry.status !== "Closed" && (
                        <Button
                          size="default"
                          variant="outline"
                          onClick={() => handleStatusUpdate(inquiry.id, "Closed")}
                          className="text-sm text-destructive"
                        >
                          Close
                        </Button>
                      )}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </div>
  );
}
