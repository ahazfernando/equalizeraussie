"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
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
import { Send, ChevronLeft, ChevronRight, FileText, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { manuals } from "@/data/manual";

const images = [
    "/manual/caravan-1.jpg",
    "/manual/caravan-2.jpg",
    "/manual/caravan-3.jpg",
    "/manual/caravan-4.jpg",
    "/manual/caravan-5.jpg",
];

// Animation Variants
const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
};

const staggerContainer = {
    animate: { transition: { staggerChildren: 0.1 } }
};

export default function Manuals() {
    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        email: "",
        manual: "",
        message: "",
        postcode: "",
        state: "",
    });

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [showContactSection, setShowContactSection] = useState(false);

    // Auto-advance slider
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success("Enquiry sent! Our support team will be in touch shortly.");
        setShowContactSection(false);
        setFormData({ fname: "", lname: "", email: "", manual: "", message: "", postcode: "", state: "" });
    };

    const handleGetManual = (manualName: string) => {
        setFormData((prev) => ({ ...prev, manual: manualName }));
        setShowContactSection(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const categories = ["All", ...Array.from(new Set(manuals.map((m) => m.category)))];
    const filteredManuals = selectedCategory === "All"
        ? manuals
        : manuals.filter((m) => m.category === selectedCategory);

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center overflow-hidden -mt-24 pt-24">
                <video
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay loop muted playsInline
                >
                    <source src="/videos/manual-hero.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-background" />

                <div className="relative container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl"
                    >
                        <span className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-white/15 to-white/5 border border-white/30 backdrop-blur-sm shadow-lg text-white text-base font-semibold">
                            <span className="w-3 h-3 rounded-full bg-white animate-ping" />
                            Owner Resources
                        </span>
                        <h1 className="font-heading text-5xl md:text-6xl font-extrabold text-white my-6 leading-tight">
                            Technical Support & Manuals
                        </h1>
                        <p className="text-gray-300 text-lg max-w-xl font-light">
                            Access comprehensive guides and technical documentation for your caravan to ensure a safe and smooth journey.
                        </p>
                    </motion.div>
                </div>
            </section>

            <AnimatePresence mode="wait">
                {!showContactSection ? (
                    /* ==================== MANUAL SELECTION GRID ==================== */
                    <motion.section
                        key="selection"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="py-24 container mx-auto px-4"
                    >
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                            <div className="max-w-2xl">
                                <h2 className="text-4xl font-bold mb-4">Find Your Manual</h2>
                                <p className="text-muted-foreground">Select your model category to find relevant documentation.</p>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${selectedCategory === category
                                            ? "bg-accent text-white shadow-lg shadow-accent/25"
                                            : "bg-secondary hover:bg-secondary/80 text-muted-foreground"
                                            }`}
                                    >
                                        {category === "All" ? "View All" : category}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <motion.div
                            variants={staggerContainer}
                            initial="initial"
                            animate="animate"
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {filteredManuals.map((manual) => (
                                <motion.div
                                    key={manual.id}
                                    variants={fadeInUp}
                                    className="group relative bg-card rounded-3xl overflow-hidden border border-border/50 shadow-sm hover:shadow-2xl transition-all duration-500"
                                >
                                    <div className="relative h-64 overflow-hidden">
                                        <Image
                                            src={manual.image}
                                            alt={manual.name}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <FileText className="text-white w-12 h-12" />
                                        </div>
                                    </div>

                                    <div className="p-8">
                                        <span className="text-accent text-xs font-bold tracking-widest mb-2 block uppercase">{manual.category}</span>
                                        <h3 className="text-xl font-bold mb-6">{manual.name}</h3>
                                        <Button
                                            onClick={() => handleGetManual(manual.name)}
                                            className="w-full group/btn bg-secondary hover:bg-accent hover:text-white text-foreground rounded-xl py-6 transition-all"
                                        >
                                            Request Manual
                                            <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                        </Button>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.section>
                ) : (
                    /* ==================== ENQUIRY FORM SECTION ==================== */
                    <motion.section
                        key="contact"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="py-20 container mx-auto px-4"
                    >
                        <button
                            onClick={() => setShowContactSection(false)}
                            className="group flex items-center gap-2 text-muted-foreground hover:text-accent mb-12 transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            Back to Selection
                        </button>

                        <div className="grid lg:grid-cols-2 gap-16 items-start">
                            {/* Visual Side */}
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-video lg:aspect-auto lg:h-[650px]">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={currentImageIndex}
                                        src={images[currentImageIndex]}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="w-full h-full object-cover"
                                    />
                                </AnimatePresence>
                                <div className="absolute inset-0 bg-black/20" />
                                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 bg-black/20 backdrop-blur-md p-2 rounded-full">
                                    {images.map((_, i) => (
                                        <div key={i} className={`w-2 h-2 rounded-full transition-all ${currentImageIndex === i ? "bg-white w-6" : "bg-white/50"}`} />
                                    ))}
                                </div>
                            </div>

                            {/* Form Side */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-8 md:p-10 bg-card shadow-2xl border border-border rounded-3xl relative overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-2 h-full bg-accent" />
                                <h2 className="text-3xl font-bold mb-2">Request Access</h2>
                                <p className="text-muted-foreground mb-10">Requesting documentation for: <span className="text-foreground font-semibold">{formData.manual}</span></p>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>First Name</Label>
                                            <Input required value={formData.fname} onChange={(e) => setFormData({ ...formData, fname: e.target.value })} className="rounded-xl bg-secondary/50 border-none h-12" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Last Name</Label>
                                            <Input required value={formData.lname} onChange={(e) => setFormData({ ...formData, lname: e.target.value })} className="rounded-xl bg-secondary/50 border-none h-12" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Email Address</Label>
                                        <Input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="rounded-xl bg-secondary/50 border-none h-12" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Additional Details</Label>
                                        <Textarea rows={3} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="rounded-xl bg-secondary/50 border-none resize-none" />
                                    </div>

                                    <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-white font-md text-md h-12">
                                        <Send className="w-5 h-5 mr-2" />
                                        Submit Request
                                    </Button>
                                </form>
                            </motion.div>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>
        </div>
    );
}