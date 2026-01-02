"use client";

import { useState, useEffect } from "react";
import { getBrochureRequests, updateBrochureStatus, BrochureRequest } from "@/data/brochures";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, FileText, CheckCircle, XCircle, Clock, Filter, Mail, Phone, MapPin, Send } from "lucide-react";
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

type BrochureStatus = "New" | "Sent" | "Followed Up" | "Closed" | "All";
type StateFilter = "All" | "NSW" | "VIC" | "QLD" | "WA" | "SA" | "TAS" | "NT" | "ACT";
type ModelFilter = "All" | "Cruzer" | "Rebel" | "Rogue";

export default function AdminBrochures() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<BrochureStatus>("All");
  const [stateFilter, setStateFilter] = useState<StateFilter>("All");
  const [modelFilter, setModelFilter] = useState<ModelFilter>("All");
  const [brochureList, setBrochureList] = useState<BrochureRequest[]>([]);

  useEffect(() => {
    // Load brochures from localStorage
    setBrochureList(getBrochureRequests());
    
    // Set up interval to refresh brochures (in case they're updated elsewhere)
    const interval = setInterval(() => {
      setBrochureList(getBrochureRequests());
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const filteredBrochures = brochureList.filter((brochure) => {
    const fullName = `${brochure.fname} ${brochure.lname}`.toLowerCase();
    const matchesSearch =
      fullName.includes(searchTerm.toLowerCase()) ||
      brochure.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brochure.brochure.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brochure.phone?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || brochure.status === statusFilter;
    const matchesState = stateFilter === "All" || brochure.state === stateFilter;
    const matchesModel = modelFilter === "All" || 
      brochure.brochure.toLowerCase().includes(modelFilter.toLowerCase());
    
    return matchesSearch && matchesStatus && matchesState && matchesModel;
  });

  const handleStatusUpdate = (id: string, newStatus: BrochureRequest["status"]) => {
    updateBrochureStatus(id, newStatus);
    setBrochureList(getBrochureRequests());
  };

  const statusCounts = {
    All: brochureList.length,
    New: brochureList.filter((b) => b.status === "New").length,
    Sent: brochureList.filter((b) => b.status === "Sent").length,
    "Followed Up": brochureList.filter((b) => b.status === "Followed Up").length,
    Closed: brochureList.filter((b) => b.status === "Closed").length,
  };

  const getStatusBadge = (status: BrochureRequest["status"]) => {
    const variants: Record<BrochureRequest["status"], string> = {
      New: "bg-accent/20 text-accent border-accent/30",
      Sent: "bg-sage/20 text-sage border-sage/30",
      "Followed Up": "bg-gold/20 text-gold border-gold/30",
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
        <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-wider">Brochure Requests</h2>
        <p className="text-muted-foreground text-base md:text-lg mt-2">
          Manage customer brochure requests and inquiries
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
            <Send className="w-4 h-4 text-sage" />
            <p className="text-sm text-muted-foreground">Sent</p>
          </div>
          <p className="text-2xl font-bold">{statusCounts.Sent}</p>
        </div>
        <div className="admin-card p-4">
          <div className="flex items-center gap-2 mb-1">
            <Mail className="w-4 h-4 text-gold" />
            <p className="text-sm text-muted-foreground">Followed Up</p>
          </div>
          <p className="text-2xl font-bold">{statusCounts["Followed Up"]}</p>
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
            placeholder="Search by name, email, brochure, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as BrochureStatus)}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Status</SelectItem>
            <SelectItem value="New">New</SelectItem>
            <SelectItem value="Sent">Sent</SelectItem>
            <SelectItem value="Followed Up">Followed Up</SelectItem>
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

      {/* Brochures Accordion */}
      <div className="admin-card">
        {filteredBrochures.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No brochure requests found matching your criteria.
          </div>
        ) : (
          <Accordion type="single" collapsible className="w-full">
            {filteredBrochures.map((brochure) => (
              <AccordionItem key={brochure.id} value={brochure.id} className="border-b border-border/50">
                <AccordionTrigger className="hover:no-underline px-4">
                  <div className="flex flex-1 items-center justify-between pr-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 flex-1 text-left">
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="font-medium">{brochure.fname} {brochure.lname}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                            <Mail className="w-3 h-3" />
                            {brochure.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <p className="text-sm font-medium">{brochure.brochure}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <p className="text-sm">
                          {brochure.state} {brochure.postcode}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(brochure.createdAt)}
                      </p>
                      {getStatusBadge(brochure.status)}
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4">
                  <div className="space-y-6 pt-4">
                    <div>
                      <h4 className="text-lg font-bold mb-3 tracking-wider">Customer Information</h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="text-muted-foreground">Name:</span> {brochure.fname} {brochure.lname}</p>
                        <p><span className="text-muted-foreground">Email:</span> {brochure.email}</p>
                        {brochure.phone && (
                          <p className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Phone:</span> {brochure.phone}
                          </p>
                        )}
                        <p className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Location:</span> {brochure.state} {brochure.postcode}
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold mb-3 tracking-wider">Brochure Requested</h4>
                      <p className="text-sm">{brochure.brochure}</p>
                    </div>
                    {brochure.message && (
                      <div>
                        <h4 className="text-lg font-bold mb-3 tracking-wider">Message</h4>
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">{brochure.message}</p>
                      </div>
                    )}
                    {brochure.notes && (
                      <div>
                        <h4 className="text-lg font-bold mb-3 tracking-wider">Admin Notes</h4>
                        <p className="text-sm text-muted-foreground">{brochure.notes}</p>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-border/50">
                      {brochure.status === "New" && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStatusUpdate(brochure.id, "Sent")}
                            className="text-xs"
                          >
                            Mark Sent
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStatusUpdate(brochure.id, "Followed Up")}
                            className="text-xs"
                          >
                            Follow Up
                          </Button>
                        </>
                      )}
                      {brochure.status === "Sent" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusUpdate(brochure.id, "Followed Up")}
                          className="text-xs"
                        >
                          Mark Followed Up
                        </Button>
                      )}
                      {brochure.status !== "Closed" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusUpdate(brochure.id, "Closed")}
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
