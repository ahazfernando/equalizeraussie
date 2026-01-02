"use client";

import { useState } from "react";
import { bookings, Booking } from "@/data/bookings";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, CheckCircle, XCircle, Clock, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type BookingStatus = "Pending" | "Confirmed" | "Cancelled" | "Completed" | "All";

export default function AdminBookings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<BookingStatus>("All");
  const [bookingList, setBookingList] = useState(bookings);

  const filteredBookings = bookingList.filter((booking) => {
    const matchesSearch =
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.caravanModel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const updateStatus = (id: string, newStatus: Booking["status"]) => {
    setBookingList(
      bookingList.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
  };

  const statusCounts = {
    All: bookingList.length,
    Pending: bookingList.filter((b) => b.status === "Pending").length,
    Confirmed: bookingList.filter((b) => b.status === "Confirmed").length,
    Cancelled: bookingList.filter((b) => b.status === "Cancelled").length,
    Completed: bookingList.filter((b) => b.status === "Completed").length,
  };

  const getStatusBadge = (status: Booking["status"]) => {
    const variants: Record<Booking["status"], string> = {
      Pending: "bg-gold/20 text-gold border-gold/30",
      Confirmed: "bg-accent/20 text-accent border-accent/30",
      Cancelled: "bg-destructive/20 text-destructive border-destructive/30",
      Completed: "bg-sage/20 text-sage border-sage/30",
    };
    return (
      <Badge variant="outline" className={variants[status]}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-wider">Booking Management</h2>
        <p className="text-muted-foreground text-base md:text-lg mt-2">
          Manage customer viewing bookings and appointments
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
            <Clock className="w-4 h-4 text-gold" />
            <p className="text-sm text-muted-foreground">Pending</p>
          </div>
          <p className="text-2xl font-bold">{statusCounts.Pending}</p>
        </div>
        <div className="admin-card p-4">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="w-4 h-4 text-accent" />
            <p className="text-sm text-muted-foreground">Confirmed</p>
          </div>
          <p className="text-2xl font-bold">{statusCounts.Confirmed}</p>
        </div>
        <div className="admin-card p-4">
          <div className="flex items-center gap-2 mb-1">
            <XCircle className="w-4 h-4 text-destructive" />
            <p className="text-sm text-muted-foreground">Cancelled</p>
          </div>
          <p className="text-2xl font-bold">{statusCounts.Cancelled}</p>
        </div>
        <div className="admin-card p-4">
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-4 h-4 text-sage" />
            <p className="text-sm text-muted-foreground">Completed</p>
          </div>
          <p className="text-2xl font-bold">{statusCounts.Completed}</p>
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
        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as BookingStatus)}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Status</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Confirmed">Confirmed</SelectItem>
            <SelectItem value="Cancelled">Cancelled</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Bookings Table */}
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
                  Preferred Date
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
              {filteredBookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="border-b border-border/50 hover:bg-secondary/30"
                >
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium">{booking.customerName}</p>
                      <p className="text-xs text-muted-foreground">
                        {booking.email}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {booking.phone}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-medium">{booking.caravanModel}</p>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <p className="text-sm">
                        {new Date(booking.preferredDate).toLocaleDateString()}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-4">{getStatusBadge(booking.status)}</td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col gap-2">
                      {booking.status === "Pending" && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateStatus(booking.id, "Confirmed")}
                            className="w-full sm:w-auto"
                          >
                            Confirm
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateStatus(booking.id, "Cancelled")}
                            className="w-full sm:w-auto text-destructive"
                          >
                            Cancel
                          </Button>
                        </>
                      )}
                      {booking.status === "Confirmed" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateStatus(booking.id, "Completed")}
                          className="w-full sm:w-auto"
                        >
                          Mark Complete
                        </Button>
                      )}
                      {booking.notes && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Note: {booking.notes}
                        </p>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredBookings.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No bookings found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}






