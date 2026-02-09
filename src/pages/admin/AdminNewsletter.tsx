"use client";

import { useEffect, useState } from "react";
import { Mail, Calendar, Search, RefreshCw } from "lucide-react";
import { getNewsletterSubscribers } from "@/lib/firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { toast } from "sonner";

interface Subscriber {
    id: string;
    email: string;
    createdAt: any;
}

export default function AdminNewsletter() {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchSubscribers = async () => {
        setLoading(true);
        try {
            const data = await getNewsletterSubscribers();
            setSubscribers(data as Subscriber[]);
        } catch (error) {
            console.error("Error fetching subscribers:", error);
            toast.error("Failed to load subscribers.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubscribers();
    }, []);

    const filteredSubscribers = subscribers.filter(sub =>
        sub.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="font-heading text-3xl font-bold tracking-tight">Newsletter Subscribers</h1>
                    <p className="text-muted-foreground mt-1">Manage email subscriptions.</p>
                </div>
                <Button onClick={fetchSubscribers} variant="outline" size="sm" className="gap-2">
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    Refresh
                </Button>
            </div>

            <div className="admin-card">
                <div className="flex items-center gap-2 mb-6">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search emails..."
                            className="pl-9"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="text-sm text-muted-foreground ml-auto">
                        Total: {subscribers.length}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="text-left py-3 px-4 text-base font-bold text-muted-foreground tracking-wider w-[60%]">Email</th>
                                <th className="text-left py-3 px-4 text-base font-bold text-muted-foreground tracking-wider">Date Subscribed</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={2} className="py-8 text-center text-muted-foreground">Loading...</td>
                                </tr>
                            ) : filteredSubscribers.length === 0 ? (
                                <tr>
                                    <td colSpan={2} className="py-8 text-center text-muted-foreground">No subscribers found.</td>
                                </tr>
                            ) : (
                                filteredSubscribers.map((sub) => (
                                    <tr key={sub.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                                        <td className="py-4 px-4 font-medium flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                                <Mail className="w-4 h-4 text-primary" />
                                            </div>
                                            {sub.email}
                                        </td>
                                        <td className="py-4 px-4 text-muted-foreground">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 opacity-50" />
                                                {sub.createdAt?.toDate ? format(sub.createdAt.toDate(), "MMM d, yyyy") : "N/A"}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
