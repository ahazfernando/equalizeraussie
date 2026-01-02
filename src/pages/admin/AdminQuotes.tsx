"use client";

import { useState, useEffect } from "react";
import { getQuotes, updateQuoteStatus, Quote } from "@/data/quotes";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, FileText, CheckCircle, XCircle, Clock, Filter, Mail, Phone, MapPin } from "lucide-react";
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

type QuoteStatus = "New" | "Contacted" | "Quoted" | "Closed" | "All";
type StateFilter = "All" | "NSW" | "VIC" | "QLD" | "WA" | "SA" | "TAS" | "NT" | "ACT";
type ModelFilter = "All" | "Cruzer" | "Rebel" | "Rogue";

export default function AdminQuotes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<QuoteStatus>("All");
  const [stateFilter, setStateFilter] = useState<StateFilter>("All");
  const [modelFilter, setModelFilter] = useState<ModelFilter>("All");
  const [quoteList, setQuoteList] = useState<Quote[]>([]);

  useEffect(() => {
    // Load quotes from localStorage
    setQuoteList(getQuotes());
    
    // Set up interval to refresh quotes (in case they're updated elsewhere)
    const interval = setInterval(() => {
      setQuoteList(getQuotes());
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const filteredQuotes = quoteList.filter((quote) => {
    const matchesSearch =
      quote.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.phone.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || quote.status === statusFilter;
    const matchesState = stateFilter === "All" || quote.state === stateFilter;
    const matchesModel = modelFilter === "All" || quote.model === modelFilter;
    
    return matchesSearch && matchesStatus && matchesState && matchesModel;
  });

  const handleStatusUpdate = (id: string, newStatus: Quote["status"]) => {
    updateQuoteStatus(id, newStatus);
    setQuoteList(getQuotes());
  };

  const statusCounts = {
    All: quoteList.length,
    New: quoteList.filter((q) => q.status === "New").length,
    Contacted: quoteList.filter((q) => q.status === "Contacted").length,
    Quoted: quoteList.filter((q) => q.status === "Quoted").length,
    Closed: quoteList.filter((q) => q.status === "Closed").length,
  };

  const getStatusBadge = (status: Quote["status"]) => {
    const variants: Record<Quote["status"], string> = {
      New: "bg-accent/20 text-accent border-accent/30",
      Contacted: "bg-gold/20 text-gold border-gold/30",
      Quoted: "bg-sage/20 text-sage border-sage/30",
      Closed: "bg-muted/20 text-muted-foreground border-muted/30",
    };
    return (
      <Badge variant="outline" className={variants[status]}>
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-wider">Quote Inquiries</h2>
        <p className="text-muted-foreground text-base md:text-lg mt-2">
          Manage customer quote requests and inquiries
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
            <FileText className="w-4 h-4 text-sage" />
            <p className="text-sm text-muted-foreground">Quoted</p>
          </div>
          <p className="text-2xl font-bold">{statusCounts.Quoted}</p>
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
            placeholder="Search by name, email, model, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as QuoteStatus)}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Status</SelectItem>
            <SelectItem value="New">New</SelectItem>
            <SelectItem value="Contacted">Contacted</SelectItem>
            <SelectItem value="Quoted">Quoted</SelectItem>
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
        <Select value={modelFilter} onValueChange={(value) => setModelFilter(value as ModelFilter)}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <FileText className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Models</SelectItem>
            <SelectItem value="Cruzer">Cruzer</SelectItem>
            <SelectItem value="Rebel">Rebel</SelectItem>
            <SelectItem value="Rogue">Rogue</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Quotes Accordion */}
      <div className="admin-card">
        {filteredQuotes.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No quote inquiries found matching your criteria.
          </div>
        ) : (
          <Accordion type="single" collapsible className="w-full">
            {filteredQuotes.map((quote) => (
              <AccordionItem key={quote.id} value={quote.id} className="border-b border-border/50">
                <AccordionTrigger className="hover:no-underline px-4">
                  <div className="flex flex-1 items-center justify-between pr-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 flex-1 text-left">
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="font-medium">{quote.name}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                            <Mail className="w-3 h-3" />
                            {quote.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <p className="text-sm font-medium">{quote.model}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <p className="text-sm">
                          {quote.state} {quote.postcode}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(quote.createdAt)}
                      </p>
                      {getStatusBadge(quote.status)}
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4">
                  <div className="space-y-6 pt-4">
                    <div>
                      <h4 className="text-lg font-bold mb-3 tracking-wider">Customer Information</h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="text-muted-foreground">Name:</span> {quote.name}</p>
                        <p><span className="text-muted-foreground">Email:</span> {quote.email}</p>
                        <p className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Phone:</span> {quote.phone}
                        </p>
                        <p className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Location:</span> {quote.state} {quote.postcode}
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold mb-3 tracking-wider">Model Interest</h4>
                      <p className="text-sm">{quote.model}</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold mb-3 tracking-wider">Message</h4>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">{quote.message}</p>
                    </div>
                    {quote.notes && (
                      <div>
                        <h4 className="text-lg font-bold mb-3 tracking-wider">Admin Notes</h4>
                        <p className="text-sm text-muted-foreground">{quote.notes}</p>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-border/50">
                      {quote.status === "New" && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStatusUpdate(quote.id, "Contacted")}
                            className="text-xs"
                          >
                            Mark Contacted
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStatusUpdate(quote.id, "Quoted")}
                            className="text-xs"
                          >
                            Mark Quoted
                          </Button>
                        </>
                      )}
                      {quote.status === "Contacted" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusUpdate(quote.id, "Quoted")}
                          className="text-xs"
                        >
                          Mark Quoted
                        </Button>
                      )}
                      {quote.status !== "Closed" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusUpdate(quote.id, "Closed")}
                          className="text-xs text-destructive"
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
