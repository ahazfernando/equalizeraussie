"use client";

import { useState, useEffect } from "react";
import { getWarrantyClaims, updateWarrantyStatus, WarrantyClaim } from "@/data/warranty";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, FileText, CheckCircle, XCircle, Clock, Filter, Mail, Phone, MapPin, Shield } from "lucide-react";
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

type StatusFilter = "All" | WarrantyClaim["status"];

export default function AdminWarranty() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
    const [claimList, setClaimList] = useState<WarrantyClaim[]>([]);

    useEffect(() => {
        setClaimList(getWarrantyClaims());
        const interval = setInterval(() => {
            setClaimList(getWarrantyClaims());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const filteredClaims = claimList.filter((claim) => {
        const matchesSearch =
            claim.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            claim.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            claim.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            claim.phone.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === "All" || claim.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const handleStatusUpdate = (id: string, newStatus: WarrantyClaim["status"]) => {
        updateWarrantyStatus(id, newStatus);
        setClaimList(getWarrantyClaims());
    };

    const statusCounts = {
        All: claimList.length,
        New: claimList.filter((c) => c.status === "New").length,
        Contacted: claimList.filter((c) => c.status === "Contacted").length,
        InProgress: claimList.filter((c) => c.status === "In Progress").length,
        Resolved: claimList.filter((c) => c.status === "Resolved").length,
        Closed: claimList.filter((c) => c.status === "Closed").length,
    };

    const getStatusBadge = (status: WarrantyClaim["status"]) => {
        const variants: Record<WarrantyClaim["status"], string> = {
            "New": "bg-accent/20 text-accent border-accent/30",
            "Contacted": "bg-gold/20 text-gold border-gold/30",
            "In Progress": "bg-blue-500/20 text-blue-500 border-blue-500/30",
            "Resolved": "bg-green-500/20 text-green-500 border-green-500/30",
            "Closed": "bg-muted/20 text-muted-foreground border-muted/30",
        };
        return (
            <Badge variant="outline" className={variants[status] || variants.Closed}>
                {status}
            </Badge>
        );
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-wider">Warranty Claims</h2>
                <p className="text-muted-foreground text-base md:text-lg mt-2">
                    Manage warranty claims and issues
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                <div className="admin-card p-4">
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="text-2xl font-bold mt-1">{statusCounts.All}</p>
                </div>
                <div className="admin-card p-4">
                    <p className="text-sm text-muted-foreground">New</p>
                    <p className="text-2xl font-bold text-accent">{statusCounts.New}</p>
                </div>
                <div className="admin-card p-4">
                    <p className="text-sm text-muted-foreground">Contacted</p>
                    <p className="text-2xl font-bold text-gold">{statusCounts.Contacted}</p>
                </div>
                <div className="admin-card p-4">
                    <p className="text-sm text-muted-foreground">In Progress</p>
                    <p className="text-2xl font-bold text-blue-500">{statusCounts.InProgress}</p>
                </div>
                <div className="admin-card p-4">
                    <p className="text-sm text-muted-foreground">Resolved</p>
                    <p className="text-2xl font-bold text-green-500">{statusCounts.Resolved}</p>
                </div>
                <div className="admin-card p-4">
                    <p className="text-sm text-muted-foreground">Closed</p>
                    <p className="text-2xl font-bold text-muted-foreground">{statusCounts.Closed}</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by name, email, or phone..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as StatusFilter)}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All">All Status</SelectItem>
                        <SelectItem value="New">New</SelectItem>
                        <SelectItem value="Contacted">Contacted</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Resolved">Resolved</SelectItem>
                        <SelectItem value="Closed">Closed</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* List */}
            <div className="admin-card">
                {filteredClaims.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                        No warranty claims found.
                    </div>
                ) : (
                    <Accordion type="single" collapsible className="w-full">
                        {filteredClaims.map((claim) => (
                            <AccordionItem key={claim.id} value={claim.id} className="border-b border-border/50">
                                <AccordionTrigger className="hover:no-underline px-4">
                                    <div className="flex flex-1 items-center justify-between pr-4">
                                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 flex-1 text-left">
                                            <div className="font-medium min-w-[150px]">{claim.firstName} {claim.lastName}</div>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Shield className="w-4 h-4" />
                                                {claim.issueType === "claim" ? "Warranty Claim" : "General Issue"}
                                            </div>
                                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                <MapPin className="w-4 h-4" /> {claim.state}
                                            </div>
                                            {getStatusBadge(claim.status)}
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="px-4 pt-4">
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <h4 className="font-bold border-b pb-2">Customer Details</h4>
                                            <div className="grid grid-cols-[100px_1fr] gap-2 text-sm">
                                                <span className="text-muted-foreground">Email:</span> <span>{claim.email}</span>
                                                <span className="text-muted-foreground">Phone:</span> <span>{claim.phone}</span>
                                                <span className="text-muted-foreground">Address:</span> <span>{claim.state}, {claim.postcode}</span>
                                                <span className="text-muted-foreground">Dealer:</span> <span>{claim.dealer}</span>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <h4 className="font-bold border-b pb-2">Issue Description</h4>
                                            <p className="text-sm whitespace-pre-wrap">{claim.description}</p>
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-4 border-t flex flex-wrap gap-2">
                                        {claim.status === "New" && (
                                            <Button size="sm" onClick={() => handleStatusUpdate(claim.id, "Contacted")}>Mark Contacted</Button>
                                        )}
                                        {claim.status !== "In Progress" && claim.status !== "Resolved" && claim.status !== "Closed" && (
                                            <Button size="sm" variant="outline" onClick={() => handleStatusUpdate(claim.id, "In Progress")}>Mark In Progress</Button>
                                        )}
                                        {claim.status === "In Progress" && (
                                            <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleStatusUpdate(claim.id, "Resolved")}>Mark Resolved</Button>
                                        )}
                                        {claim.status !== "Closed" && (
                                            <Button size="sm" variant="destructive" onClick={() => handleStatusUpdate(claim.id, "Closed")}>Close Claim</Button>
                                        )}
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
