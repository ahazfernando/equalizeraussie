"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { CheckCircle, Phone, ArrowRight, Shield, FileText, CheckSquare, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { dealers } from "@/data/dealers";
import { saveWarrantyClaim } from "@/data/warranty";

export default function Warranty() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dealer: "",
        state: "",
        postcode: "",
        description: "",
        issueType: "claim" as const,
    });

    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!formData.firstName || !formData.email || !formData.description) {
            toast.error("Please fill in all required fields.");
            return;
        }

        const success = saveWarrantyClaim(formData);

        if (success) {
            setShowSuccess(true);
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                dealer: "",
                state: "",
                postcode: "",
                description: "",
                issueType: "claim",
            });
        } else {
            toast.error("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="bg-background text-foreground overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center overflow-hidden -mt-24 pt-40">
                <div className="absolute inset-0 z-0">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover opacity-60"
                        poster="/header/nighttie.jpg"
                    >
                        <source src="/videos/Equalizer_Hero.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-background/20" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-background" />
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl"
                    >
                        <h1 className="font-heading text-5xl md:text-7xl font-black mb-6 uppercase tracking-wider text-white">
                            We've Got You <span className="text-red-600">Covered</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-200 mb-8 font-light leading-relaxed">
                            Comprehensive warranty support for your peace of mind on every journey.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Form Section */}
            <section className="py-8 md:py-12 bg-background -mt-8">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-12 gap-16 items-stretch">
                        {/* Form on the left */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="lg:col-span-7"
                        >
                            <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-2xl relative z-20">
                                <h2 className="font-heading text-3xl font-bold mb-2">Submit a Claim</h2>
                                <p className="text-muted-foreground mb-8">
                                    Please fill out the form below detailing your issue.
                                </p>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">First Name *</Label>
                                            <Input
                                                id="firstName"
                                                name="firstName"
                                                placeholder="John"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName">Last Name</Label>
                                            <Input
                                                id="lastName"
                                                name="lastName"
                                                placeholder="Doe"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email Address *</Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="john@example.com"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Phone Number</Label>
                                            <Input
                                                id="phone"
                                                name="phone"
                                                type="tel"
                                                placeholder="0400 000 000"
                                                value={formData.phone}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="dealer">Purchased From Dealer *</Label>
                                        <Select onValueChange={(value) => handleSelectChange("dealer", value)} value={formData.dealer}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a dealer" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {dealers.map(dealer => (
                                                    <SelectItem key={dealer.id} value={dealer.name}>{dealer.name}</SelectItem>
                                                ))}
                                                <SelectItem value="Other">Other / Direct</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="state">State</Label>
                                            <Select onValueChange={(value) => handleSelectChange("state", value)} value={formData.state}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select State" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="NSW">New South Wales</SelectItem>
                                                    <SelectItem value="VIC">Victoria</SelectItem>
                                                    <SelectItem value="QLD">Queensland</SelectItem>
                                                    <SelectItem value="WA">Western Australia</SelectItem>
                                                    <SelectItem value="SA">South Australia</SelectItem>
                                                    <SelectItem value="TAS">Tasmania</SelectItem>
                                                    <SelectItem value="NT">Northern Territory</SelectItem>
                                                    <SelectItem value="ACT">Australian Capital Territory</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="postcode">Postcode</Label>
                                            <Input
                                                id="postcode"
                                                name="postcode"
                                                placeholder="0000"
                                                value={formData.postcode}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="description">Description of Issue *</Label>
                                        <Textarea
                                            id="description"
                                            name="description"
                                            placeholder="Please describe your warranty issue in detail..."
                                            className="min-h-[150px]"
                                            value={formData.description}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <Button type="submit" size="lg" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-6 text-lg rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-red-600/30">
                                        Submit Warranty Claim <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </form>
                            </div>
                        </motion.div>

                        {/* Info Widget on the right */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="lg:col-span-5 relative"
                        >
                            <div className="sticky top-24 space-y-8">
                                <div className="bg-card/50 backdrop-blur-sm border border-border p-8 rounded-2xl">
                                    <h3 className="font-heading text-2xl font-bold mb-6 flex items-center gap-3">
                                        <Shield className="w-6 h-6 text-red-600" />
                                        The Process
                                    </h3>

                                    <div className="space-y-8 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-border">
                                        <div className="relative pl-12">
                                            <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-background border-2 border-red-600 flex items-center justify-center font-bold text-red-600 z-10">1</div>
                                            <h4 className="font-bold text-lg mb-2">Claim Submission</h4>
                                            <p className="text-muted-foreground text-sm leading-relaxed">
                                                Submit your warranty claim using the form. Provide as much detail as possible to help us assess your case quickly.
                                            </p>
                                        </div>
                                        <div className="relative pl-12">
                                            <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-background border-2 border-border flex items-center justify-center font-bold text-muted-foreground z-10">2</div>
                                            <h4 className="font-bold text-lg mb-2">Dealer Assessment</h4>
                                            <p className="text-muted-foreground text-sm leading-relaxed">
                                                Your preferred dealer will be notified. They will contact you to arrange an inspection or assessment of the issue.
                                            </p>
                                        </div>
                                        <div className="relative pl-12">
                                            <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-background border-2 border-border flex items-center justify-center font-bold text-muted-foreground z-10">3</div>
                                            <h4 className="font-bold text-lg mb-2">Approval & Repair</h4>
                                            <p className="text-muted-foreground text-sm leading-relaxed">
                                                Once assessed and approved, repairs will be scheduled. We work with our dealer network to get you back on the road.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-red-600 text-white p-8 rounded-2xl shadow-xl overflow-hidden relative group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16 transition-transform group-hover:scale-150" />

                                    <h3 className="font-heading text-2xl font-bold mb-4 relative z-10">Urgent Assistance?</h3>
                                    <p className="text-white/80 mb-6 relative z-10">
                                        If you require immediate assistance or are stranded, please contact our emergency support line.
                                    </p>
                                    <Button variant="secondary" className="w-full bg-white text-red-600 hover:bg-gray-100 font-bold gap-2">
                                        <Phone className="w-4 h-4" /> Call Support
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Success Modal */}
            <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                        <DialogTitle className="text-center text-2xl font-bold">Claim Submitted!</DialogTitle>
                        <DialogDescription className="text-center pt-2">
                            Thank you for submitting your warranty claim. We have received your details and a confirmation email has been sent to you.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="bg-muted/50 p-4 rounded-lg text-sm">
                            <p className="font-semibold mb-2">What happens next?</p>
                            <ul className="space-y-2 text-muted-foreground">
                                <li className="flex gap-2 items-start"><CheckSquare className="w-4 h-4 mt-0.5 shrink-0" /> Your dealer will be notified immediately.</li>
                                <li className="flex gap-2 items-start"><CheckSquare className="w-4 h-4 mt-0.5 shrink-0" /> Expect a call within 24-48 hours.</li>
                                <li className="flex gap-2 items-start"><CheckSquare className="w-4 h-4 mt-0.5 shrink-0" /> Keep your claim reference number handy.</li>
                            </ul>
                        </div>
                    </div>
                    <DialogFooter className="sm:justify-center">
                        <Button onClick={() => setShowSuccess(false)} className="w-full sm:w-auto min-w-[150px]">
                            Got it
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
