'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send, CheckCircle2 } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { COUNTRY_CODES } from "@/components/common/countryCodes";

const AUSTRALIAN_STATES = [
    { value: "NSW", label: "New South Wales" },
    { value: "VIC", label: "Victoria" },
    { value: "QLD", label: "Queensland" },
    { value: "WA", label: "Western Australia" },
    { value: "SA", label: "South Australia" },
    { value: "TAS", label: "Tasmania" },
    { value: "ACT", label: "Australian Capital Territory" },
    { value: "NT", label: "Northern Territory" },
];

export function DealerForm() {
    const [formData, setFormData] = useState({
        name: "",
        company: "",
        email: "",
        phone: "",
        countryCode: "+61",
        state: "",
        postcode: "",
        message: ""
    });
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            setShowSuccess(true);
            setFormData({
                name: "",
                company: "",
                email: "",
                phone: "",
                countryCode: "+61",
                state: "",
                postcode: "",
                message: ""
            });
        }, 1000);
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">Full Name</Label>
                    <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-accent"
                        placeholder="John Doe"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="company" className="text-white">Company Name</Label>
                    <Input
                        id="company"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-accent"
                        placeholder="Your Dealership Pty Ltd"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-accent"
                        placeholder="john@example.com"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white">Phone</Label>
                    <div className="flex gap-2">
                        <Select
                            value={formData.countryCode}
                            onValueChange={(value) => setFormData({ ...formData, countryCode: value })}
                        >
                            <SelectTrigger className="w-[110px] bg-white/10 border-white/20 text-white focus:border-accent">
                                <SelectValue placeholder="Code" />
                            </SelectTrigger>
                            <SelectContent className="max-h-[300px]">
                                {COUNTRY_CODES.map((item) => (
                                    <SelectItem key={`${item.code}-${item.name}`} value={item.code}>
                                        <div className="flex items-center">
                                            <span className="mr-2 text-lg">{item.flag}</span>
                                            <span className="text-sm">{item.code}</span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Input
                            id="phone"
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-accent flex-1"
                            placeholder="0400 000 000"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="state" className="text-white">State</Label>
                        <Select
                            value={formData.state}
                            onValueChange={(value) => setFormData({ ...formData, state: value })}
                        >
                            <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-accent">
                                <SelectValue placeholder="Select State" />
                            </SelectTrigger>
                            <SelectContent>
                                {AUSTRALIAN_STATES.map((state) => (
                                    <SelectItem key={state.value} value={state.value}>
                                        {state.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="postcode" className="text-white">Postcode</Label>
                        <Input
                            id="postcode"
                            required
                            value={formData.postcode}
                            onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-accent"
                            placeholder="3000"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="message" className="text-white">Message</Label>
                    <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-accent min-h-[100px]"
                        placeholder="Tell us about your dealership..."
                    />
                </div>
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-white h-12 text-base font-semibold">
                    <Send className="w-4 h-4 mr-2" />
                    Submit Application
                </Button>
            </form>

            <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
                <DialogContent className="bg-zinc-950 border-white/10 sm:max-w-md">
                    <DialogHeader className="items-center text-center">
                        <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                            <CheckCircle2 className="w-6 h-6 text-green-500" />
                        </div>
                        <DialogTitle className="text-white text-2xl">Application Received</DialogTitle>
                        <DialogDescription className="text-zinc-400 text-base mt-2">
                            Thank you for your interest in becoming an Equalizer RV dealer. Our team will review your application and contact you within 2-3 business days.
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
}
