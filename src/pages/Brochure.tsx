"use client";

import { useState } from "react";
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
import { Send, ChevronLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { brochures } from "@/data/brochure";


// Animation Variants
const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
};

const staggerContainer = {
    animate: { transition: { staggerChildren: 0.1 } }
};

export default function Brochure() {
    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        email: "",
        brochure: "",
        message: "",
        postcode: "",
        state: "",
    });

    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [showContactSection, setShowContactSection] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success("Enquiry sent! We'll be in touch soon.");
        setFormData({ fname: "", lname: "", email: "", brochure: "", message: "", postcode: "", state: "" });
    };

    const handleGetBrochure = (brochureName: string) => {
        setFormData((prev) => ({ ...prev, brochure: brochureName }));
        setShowContactSection(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const categories = ["All", ...Array.from(new Set(brochures.map((b) => b.category)))];
    const filteredBrochures = selectedCategory === "All"
        ? brochures
        : brochures.filter((b) => b.category === selectedCategory);

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center overflow-hidden -mt-24 pt-24">
                <video
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay loop muted playsInline
                >
                    <source src="/videos/brochure-hero.mp4" type="video/mp4" />
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
                            Premium Catalogues
                        </span>
                        <h1 className="font-heading text-5xl md:text-6xl font-extrabold text-white my-6 leading-tight">
                            Start Your Adventure
                        </h1>
                        <p className="text-gray-300 text-lg max-w-xl font-light">
                            Discover our range of luxury caravans designed for the ultimate Australian road trip.
                        </p>
                    </motion.div>
                </div>
            </section>

            <AnimatePresence mode="wait">
                {!showContactSection ? (
                    /* ==================== MODERN BROCHURE SELECTION ==================== */
                    <motion.section
                        key="selection"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="py-24 container mx-auto px-4"
                    >
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                            <div className="max-w-2xl">
                                <h2 className="text-4xl font-bold mb-4">Select Your Brochure</h2>
                                <p className="text-muted-foreground">Filter by category to find the specific model details you need.</p>
                            </div>

                            {/* Modern Category Pills */}
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
                            {filteredBrochures.map((brochure) => (
                                <motion.div
                                    key={brochure.id}
                                    variants={fadeInUp}
                                    className="group relative bg-card rounded-3xl overflow-hidden border border-border/50 shadow-sm hover:shadow-2xl transition-all duration-500"
                                >
                                    <div className="relative h-72 overflow-hidden">
                                        <img
                                            src={brochure.image}
                                            alt={brochure.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                                            <p className="text-white/80 text-sm italic">Click to request full specifications</p>
                                        </div>
                                    </div>

                                    <div className="p-8">
                                        <div className="flex justify-between items-start mb-6">
                                            <div>
                                                <span className="text-accent text-xs font-bold tracking-widest mb-2 block">{brochure.category}</span>
                                                <h3 className="text-xl font-bold transition-colors">{brochure.name}</h3>
                                            </div>
                                        </div>

                                        <Button
                                            onClick={() => handleGetBrochure(brochure.name)}
                                            className="w-full group/btn bg-secondary hover:bg-accent hover:text-white text-foreground rounded-xl py-6 transition-all duration-300"
                                        >
                                            Get Brochure
                                            <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                        </Button>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.section>
                ) : (
                    /* ==================== CONTACT FORM SECTION ==================== */
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
                            Back to Brochure
                        </button>

                        <div className="grid lg:grid-cols-2 gap-16 items-start">
                            {/* Form */}
                            <motion.div
                                initial={{ opacity: 0, x: -40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <div className="p-8 md:p-10 bg-card shadow-2xl border border-border rounded-3xl relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-2 h-full bg-accent" />
                                    <h2 className="text-3xl font-bold mb-2">Finalize Your Request</h2>
                                    <p className="text-muted-foreground mb-10">We{"'"}ll send the <span className="text-foreground font-semibold">{formData.brochure}</span> brochure to your inbox.</p>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>First Name</Label>
                                                <Input 
                                                    required 
                                                    value={formData.fname}
                                                    onChange={(e) => setFormData({ ...formData, fname: e.target.value })}
                                                    className="rounded-xl bg-secondary/50 border-none h-12" 
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Last Name</Label>
                                                <Input 
                                                    required 
                                                    value={formData.lname}
                                                    onChange={(e) => setFormData({ ...formData, lname: e.target.value })}
                                                    className="rounded-xl bg-secondary/50 border-none h-12" 
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Email</Label>
                                            <Input 
                                                type="email" 
                                                required 
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="rounded-xl bg-secondary/50 border-none h-12" 
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>State</Label>
                                                <Select
                                                    value={formData.state}
                                                    onValueChange={(value) => setFormData({ ...formData, state: value })}
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
                                                <Label>Postcode</Label>
                                                <Input 
                                                    value={formData.postcode}
                                                    onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                                                    className="rounded-xl bg-secondary/50 border-none h-12" 
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Message</Label>
                                            <Textarea 
                                                rows={4} 
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                className="rounded-xl bg-secondary/50 border-none resize-none" 
                                            />
                                        </div>

                                        <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-white font-md text-md h-12">
                                            <Send className="w-5 h-5 mr-2" />
                                            Send Enquiry
                                        </Button>
                                    </form>
                                </div>
                            </motion.div>

                            {/* Image on Right Side */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] lg:aspect-auto lg:h-[700px]"
                            >
                                <Image
                                    src="/images/1e20ef54f236dbbb0ef0a201e1426adb.jpg"
                                    alt="Caravan"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-black/10" />
                            </motion.div>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>
        </div>
    );
}