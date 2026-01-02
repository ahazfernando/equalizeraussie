import { Caravan, Calendar, Star, DollarSign, TrendingUp } from "lucide-react";

const stats = [
  { icon: Caravan, label: "Total RVs", value: "5", change: "+2 this month" },
  { icon: Calendar, label: "Pending Bookings", value: "12", change: "3 new today" },
  { icon: Star, label: "Reviews", value: "6", change: "4.9 avg rating" },
  { icon: DollarSign, label: "Finance Enquiries", value: "8", change: "+15% vs last week" },
];

const recentBookings = [
  { id: 1, name: "John Smith", model: "Explorer 21", date: "2024-12-15", status: "Pending" },
  { id: 2, name: "Sarah Johnson", model: "Outback 23", date: "2024-12-14", status: "Confirmed" },
  { id: 3, name: "Mike Brown", model: "Horizon 25", date: "2024-12-13", status: "Pending" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="admin-card">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
                <p className="admin-stat">{stat.value}</p>
                <p className="text-xs text-accent">{stat.change}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="admin-card">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-accent" />
          <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-wider">Recent Bookings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 text-base font-bold text-muted-foreground tracking-wider">Customer</th>
                <th className="text-left py-3 text-base font-bold text-muted-foreground tracking-wider">Model</th>
                <th className="text-left py-3 text-base font-bold text-muted-foreground tracking-wider">Date</th>
                <th className="text-left py-3 text-base font-bold text-muted-foreground tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((booking) => (
                <tr key={booking.id} className="border-b border-border/50">
                  <td className="py-4 font-medium">{booking.name}</td>
                  <td className="py-4 text-muted-foreground">{booking.model}</td>
                  <td className="py-4 text-muted-foreground">{booking.date}</td>
                  <td className="py-4"><span className={`badge-${booking.status === "Confirmed" ? "sage" : "gold"}`}>{booking.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
