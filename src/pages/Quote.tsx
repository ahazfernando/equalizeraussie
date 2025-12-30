"use client";

import { useState, useEffect } from "react";
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
import { Send, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const images = [
    "/quote/caravan-1.jpg",
    "/quote/caravan-2.jpg",
    "/quote/caravan-3.jpg",
    "/quote/caravan-4.jpg",
    "/quote/caravan-5.jpg",
];

// Animation Variants
const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
};

export default function Quote() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        model: "",
        message: "",
        postcode: "",
        state: "",
    });

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, 5000); // Slightly slower for better UX with animations
        return () => clearInterval(interval);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success("Thank you for your enquiry! We'll be in touch within 24 hours.");
        setFormData({
            name: "", email: "", phone: "", model: "",
            message: "", postcode: "", state: "",
        });
    };

    const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
    const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

    return (
        <>
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-background py-20 min-h-[60vh] flex items-center -mt-24 pt-24">
                <video
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay loop muted playsInline aria-hidden="true"
                >
                    <source src="/videos/quote-hero.mp4" type="video/mp4" />
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
                                Get a Quote
                            </span>
                        </motion.div>

                        <motion.h2 variants={fadeInUp} className="font-heading text-5xl sm:text-6xl lg:text-6xl font-extrabold leading-[1.1] mb-8 text-white">
                            Let{"'"}s Start Your Adventure
                        </motion.h2>

                        <motion.p variants={fadeInUp} className="text-gray-200 text-lg leading-relaxed max-w-xl font-light">
                            Adventure starts with a simple message. Whether you{"'"}re exploring options or ready to move forward, we{"'"}re excited to hear from you.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-start">

                        {/* Left Column: Visuals */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="space-y-8"
                        >
                            <div className="bg-secondary rounded-3xl h-80 md:h-[500px] overflow-hidden relative group shadow-2xl">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={currentImageIndex}
                                        src={images[currentImageIndex]}
                                        initial={{ opacity: 0, scale: 1.1 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.7 }}
                                        alt="Caravan Preview"
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                </AnimatePresence>

                                {/* Navigation overlay */}
                                <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button variant="secondary" size="icon" onClick={prevImage} className="rounded-full shadow-lg">
                                        <ChevronLeft className="w-6 h-6" />
                                    </Button>
                                    <Button variant="secondary" size="icon" onClick={nextImage} className="rounded-full shadow-lg">
                                        <ChevronRight className="w-6 h-6" />
                                    </Button>
                                </div>
                            </div>

                            {/* Map with entrance delay */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="bg-muted rounded-2xl h-64 overflow-hidden relative border border-border shadow-inner"
                            >
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5000!2d144.956776!3d-37.813628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5774f372b625b0!2sMelbourne%20VIC%203000%2C%20Australia!5e0!3m2!1sen!2sau!4v1734470000000&z=14&q=123+Caravan+Way"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </motion.div>
                        </motion.div>

                        {/* Right Column: Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="p-8 md:p-10 bg-card shadow-2xl border border-border rounded-3xl relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-2 h-full bg-accent" />
                                <h2 className="font-heading text-3xl font-bold mb-8">Send an Enquiry</h2>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Full Name *</Label>
                                            <Input id="name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="bg-background" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email Address *</Label>
                                            <Input id="email" type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="bg-background" />
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Phone Number</Label>
                                            <Input id="phone" type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="bg-background" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="model">Select Model</Label>
                                            <Select value={formData.model} onValueChange={(v) => setFormData({ ...formData, model: v })}>
                                                <SelectTrigger className="bg-background">
                                                    <SelectValue placeholder="Select an option" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="cruzer">Cruzer</SelectItem>
                                                    <SelectItem value="rebel">Rebel</SelectItem>
                                                    <SelectItem value="rogue">Rogue</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="state">State</Label>
                                            <Select value={formData.state} onValueChange={(v) => setFormData({ ...formData, state: v })}>
                                                <SelectTrigger className="bg-background">
                                                    <SelectValue placeholder="Select State" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {["NSW", "VIC", "QLD", "WA", "SA", "TAS", "NT", "ACT"].map(s => (
                                                        <SelectItem key={s} value={s}>{s}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="postcode">Post Code *</Label>
                                            <Input id="postcode" required value={formData.postcode} onChange={(e) => setFormData({ ...formData, postcode: e.target.value })} className="bg-background" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="message">Your Message *</Label>
                                        <Textarea id="message" required rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="bg-background resize-none" />
                                    </div>

                                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                        <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-white font-md text-md h-12">
                                            <Send className="w-5 h-5 mr-2" />
                                            Send Enquiry
                                        </Button>
                                    </motion.div>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
}