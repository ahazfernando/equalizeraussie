"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { dealers } from "@/data/dealers";
import { saveWarrantyClaim } from "@/data/warranty";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Send, ArrowRight, CheckCircle2, MapPin,
    Shield, FileSearch, ClipboardCheck, Phone
} from "lucide-react";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

// Animation Variants
const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
};

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
        issueType: "claim"
    });

    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // @ts-ignore - simple data passing
            saveWarrantyClaim(formData);
            setShowSuccessModal(true);
            setFormData({
                firstName: "", lastName: "", email: "", phone: "",
                dealer: "", state: "", postcode: "", description: "",
                issueType: "claim"
            });
        } catch (error) {
            console.error("Error submitting claim:", error);
            toast.error("There was an error submitting your claim. Please try again.");
        }
    };

    return (
        <div className="bg-background text-foreground overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center overflow-hidden -mt-24 pt-24">
                <video
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay loop muted playsInline
                >
                    <source src="/videos/warranty-hero.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-background" />

                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="initial"
                        animate="animate"
                        variants={{
                            animate: { transition: { staggerChildren: 0.2 } }
                        }}
                        className="max-w-3xl"
                    >
                        <motion.div variants={fadeInUp} className="inline-block mb-6">
                            <span className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-white/15 to-white/5 border border-white/30 backdrop-blur-sm shadow-lg text-white text-base font-semibold">
                                <span className="w-3 h-3 rounded-full bg-white animate-ping" />
                                Warranty & Support
                            </span>
                        </motion.div>

                        <motion.h1 variants={fadeInUp} className="font-heading text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-8 text-white">
                            We've Got You Covered
                        </motion.h1>

                        <motion.p variants={fadeInUp} className="text-gray-200 text-lg leading-relaxed max-w-xl font-light">
                            Experience peace of mind with our comprehensive warranty protection. Submit claims easily and get back to your adventure.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Form Section */}
            <section className="py-8 md:py-12 bg-background -mt-8">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-12 gap-16 items-stretch">
                        {/* Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="lg:col-span-7"
                        >
                            <div className="p-8 md:p-10 bg-card shadow-2xl border border-border rounded-3xl relative overflow-hidden h-full">
                                <div className="absolute top-0 left-0 w-2 h-full bg-accent" />
                                <h2 className="text-3xl font-bold mb-2">Warranty Claim / Issue</h2>
                                <p className="text-muted-foreground mb-10">
                                    Please fill out the form below to report an issue or submit a warranty claim.
                                </p>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>First Name *</Label>
                                            <Input
                                                required
                                                value={formData.firstName}
                                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                className="rounded-xl bg-secondary/50 border-none h-12"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Last Name *</Label>
                                            <Input
                                                required
                                                value={formData.lastName}
                                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                className="rounded-xl bg-secondary/50 border-none h-12"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Email *</Label>
                                            <Input
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="rounded-xl bg-secondary/50 border-none h-12"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Phone Number *</Label>
                                            <Input
                                                type="tel"
                                                required
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="rounded-xl bg-secondary/50 border-none h-12"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Purchased From Dealer *</Label>
                                        <Select
                                            value={formData.dealer}
                                            onValueChange={(v) => setFormData({ ...formData, dealer: v })}
                                            required
                                        >
                                            <SelectTrigger className="rounded-xl bg-secondary/50 border-none h-12">
                                                <SelectValue placeholder="Select your dealer..." />
                                            </SelectTrigger>
                                            <SelectContent className="bg-background border-border">
                                                {dealers.map((dealer) => (
                                                    <SelectItem key={dealer.id} value={dealer.name}>
                                                        {dealer.name}
                                                    </SelectItem>
                                                ))}
                                                <SelectItem value="other">Other / Direct Purchase</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>State *</Label>
                                            <Select
                                                value={formData.state}
                                                onValueChange={(value) => setFormData({ ...formData, state: value })}
                                                required
                                            >
                                                <SelectTrigger className="rounded-xl bg-secondary/50 border-none h-12">
                                                    <SelectValue placeholder="Select..." />
                                                </SelectTrigger>
                                                <SelectContent className="bg-background border-border">
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
                                        <div className="space-y-2">
                                            <Label>Postcode *</Label>
                                            <Input
                                                required
                                                value={formData.postcode}
                                                onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                                                className="rounded-xl bg-secondary/50 border-none h-12"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Description of Issue *</Label>
                                        <Textarea
                                            required
                                            rows={5}
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            placeholder="Please describe the issue in detail..."
                                            className="rounded-xl bg-secondary/50 border-none resize-none"
                                        />
                                    </div>

                                    <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-white font-md text-md h-12">
                                        <Send className="w-5 h-5 mr-2" />
                                        Submit Claim
                                    </Button>
                                </form>
                            </div>
                        </motion.div>

                        {/* Story / Info Widget on Right Side */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="lg:col-span-5 relative w-full h-full min-h-[700px] rounded-3xl overflow-hidden group bg-black"
                        >
                            {/* Background Image/Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black" />
                            <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-20 mix-blend-overlay" />

                            {/* Content */}
                            <div className="absolute inset-0 p-10 flex flex-col justify-center">
                                <div className="mb-12">
                                    <div className="w-16 h-16 rounded-2xl bg-accent text-white flex items-center justify-center mb-6 shadow-lg shadow-accent/20">
                                        <Shield className="w-8 h-8" />
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                                        How the Process Works
                                    </h2>
                                    <p className="text-white/60 text-lg">
                                        We work closely with our dealer network to ensure your issues are resolved quickly.
                                    </p>
                                </div>

                                <div className="space-y-8">
                                    <div className="flex gap-6 group/item">
                                        <div className="shrink-0 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white font-bold text-xl group-hover/item:border-accent group-hover/item:bg-accent transition-all duration-300">
                                            1
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-2">Contact Your Dealer</h3>
                                            <p className="text-white/60 leading-relaxed">
                                                If you encounter an issue, your first step is to call the dealer you purchased your caravan from.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-6 group/item">
                                        <div className="shrink-0 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white font-bold text-xl group-hover/item:border-accent group-hover/item:bg-accent transition-all duration-300">
                                            2
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-2">Dealer Assessment</h3>
                                            <p className="text-white/60 leading-relaxed">
                                                The dealer will assess the issue. If it requires warranty work, they will contact Great Aussie directly.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-6 group/item">
                                        <div className="shrink-0 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white font-bold text-xl group-hover/item:border-accent group-hover/item:bg-accent transition-all duration-300">
                                            3
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-2">Approval & Repair</h3>
                                            <p className="text-white/60 leading-relaxed">
                                                Once processed, we approve the claim and the dealer proceeds with the repairs to get you back on the road.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12 pt-12 border-t border-white/10">
                                    <p className="text-white/40 text-sm mb-4">Need to find your dealer's contact info?</p>
                                    <Link href="/dealers">
                                        <Button variant="outline" className="rounded-full border-white/20 text-white hover:bg-white hover:text-black">
                                            Find a Dealer <ArrowRight className="ml-2 w-4 h-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Success Modal */}
            <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
                <DialogContent className="max-w-md p-0 overflow-hidden border-0 bg-transparent shadow-none">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-card border border-border rounded-3xl p-8 relative overflow-hidden"
                    >
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-6 text-green-500">
                                <CheckCircle2 className="w-8 h-8" />
                            </div>
                            <h2 className="text-2xl font-bold mb-2">Claim Submitted</h2>
                            <p className="text-muted-foreground mb-6">
                                Thank you for submitting your warranty claim. Our team has received your details and will be in contact shortly.
                            </p>
                            <Button
                                onClick={() => setShowSuccessModal(false)}
                                className="w-full rounded-full"
                            >
                                Close
                            </Button>
                        </div>
                    </motion.div>
                </DialogContent>
            </Dialog>
        </div>
    );
}