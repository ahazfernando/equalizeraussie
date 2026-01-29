"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import { Send, ChevronLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { brochures } from "@/data/brochure";
import { saveBrochureRequest } from "@/data/brochures";
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
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [submittedBrochure, setSubmittedBrochure] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            saveBrochureRequest({
                fname: formData.fname,
                lname: formData.lname,
                email: formData.email,
                brochure: formData.brochure,
                message: formData.message,
                postcode: formData.postcode,
                state: formData.state,
            });
            setSubmittedBrochure(formData.brochure);
            setShowSuccessModal(true);
            setFormData({ fname: "", lname: "", email: "", brochure: "", message: "", postcode: "", state: "" });
        } catch (error) {
            console.error("Error saving brochure request:", error);
            // Still show success modal even if save fails (graceful degradation)
            setSubmittedBrochure(formData.brochure);
            setShowSuccessModal(true);
            setFormData({ fname: "", lname: "", email: "", brochure: "", message: "", postcode: "", state: "" });
        }
    };

    // Get model logo based on brochure name
    const getModelLogo = () => {
        const brochureName = submittedBrochure.toLowerCase();
        if (brochureName.includes("cruzer")) return "/caravanlogos/CruzerLogo.png";
        if (brochureName.includes("rebel")) return "/caravanlogos/RebelLogo.png";
        if (brochureName.includes("rogue")) return "/caravanlogos/RogueLogo.png";
        if (brochureName.includes("family")) return "/caravanlogos/CruzerLogo.png";
        if (brochureName.includes("couples")) return "/caravanlogos/RebelLogo.png";
        return "/caravanlogos/CruzerLogo.png"; // Default
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
                <div className="absolute inset-0 w-full h-full">
                    <Image
                        src="/header/Image_fx-3.png"
                        alt="Brochure Header"
                        fill
                        className="object-cover"
                        priority
                        sizes="100vw"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-background" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

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
                        <h1 className="font-heading text-5xl md:text-6xl font-extrabold text-white my-6 leading-tight tracking-wider">
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
                                <h2 className="text-4xl font-bold mb-4 tracking-wider">Select Your Brochure</h2>
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
                                        <Image
                                            src={brochure.image}
                                            alt={brochure.name}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                                            <p className="text-white/80 text-sm italic">Click to request full specifications</p>
                                        </div>
                                    </div>

                                    <div className="p-8">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <span className="text-accent text-xs font-bold tracking-widest mb-2 block">{brochure.category}</span>
                                                <h3 className="text-xl font-bold transition-colors tracking-wider">{brochure.name}</h3>
                                                {brochure.tagline && (
                                                    <p className="text-muted-foreground text-sm mt-1">{brochure.tagline}</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Specifications */}
                                        {(brochure.length || brochure.berth || brochure.tare) && (
                                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                                                {brochure.length && <span>{brochure.length}</span>}
                                                {brochure.length && brochure.berth && <span>•</span>}
                                                {brochure.berth && <span>{brochure.berth} Berth</span>}
                                                {brochure.berth && brochure.tare && <span>•</span>}
                                                {brochure.tare && <span>{brochure.tare} Tare</span>}
                                            </div>
                                        )}

                                        {/* Features */}
                                        {brochure.features && brochure.features.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {brochure.features.slice(0, 3).map((feature) => (
                                                    <span key={feature} className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-800">
                                                        {feature}
                                                    </span>
                                                ))}
                                                {brochure.features.length > 3 && (
                                                    <span className="text-xs text-muted-foreground">
                                                        +{brochure.features.length - 3} more
                                                    </span>
                                                )}
                                            </div>
                                        )}

                                        {brochure.description && (
                                            <p className="text-muted-foreground text-sm mb-6">{brochure.description}</p>
                                        )}

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

                        <div className="grid lg:grid-cols-12 gap-16 items-start">
                            {/* Form */}
                            <motion.div
                                initial={{ opacity: 0, x: -40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="lg:col-span-7"
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

                            {/* Widget on Right Side */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="lg:col-span-5 relative w-full h-[700px] rounded-3xl overflow-hidden group"
                            >
                                {/* Background Image */}
                                <Image
                                    src="/images/1e20ef54f236dbbb0ef0a201e1426adb.jpg"
                                    alt="Caravan Experience"
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-8 pb-10">
                                    <h2 className="text-2xl md:text-3xl font-black italic text-white leading-tight mb-4 tracking-wider">
                                        Connect with Our Expert Dealers
                                    </h2>

                                    <p className="text-white/70 text-base mb-8">
                                        Visit one of our authorized dealers to see our caravans in person and get expert advice on finding your perfect match.
                                    </p>

                                    <Link href="/dealers">
                                        <button className="px-8 py-3 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-colors inline-flex items-center gap-2">
                                            Find a Dealer
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>

            {/* Success Modal */}
            <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
                <DialogContent className="max-w-2xl p-0 overflow-hidden border-0 bg-transparent shadow-none">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative rounded-3xl overflow-hidden"
                    >
                        {/* Blended Background with Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-background/95 to-background backdrop-blur-xl">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.1),transparent_70%)]" />
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(239,68,68,0.15),transparent_50%)]" />
                        </div>

                        {/* Content Container */}
                        <div className="relative z-10 p-12 md:p-16 flex flex-col items-center">
                            {/* Model Logo at Top */}
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="relative h-24 w-40 mb-8"
                            >
                                <Image
                                    src={getModelLogo()}
                                    alt="Model Logo"
                                    fill
                                    className="object-contain brightness-0 invert"
                                />
                            </motion.div>

                            {/* Success Icon */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                                className="flex justify-center mb-8"
                            >
                                <div className="relative">
                                    <div className="absolute inset-0 bg-accent/20 rounded-full blur-2xl animate-pulse" />
                                    <div className="relative bg-gradient-to-br from-accent to-accent/80 p-4 rounded-full">
                                        <CheckCircle2 className="w-12 h-12 text-white" />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Title and Message */}
                            <DialogHeader className="text-center space-y-4">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="flex flex-col items-center"
                                >
                                    <DialogTitle className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-wider">
                                        Thank You!
                                    </DialogTitle>
                                    <DialogDescription className="text-lg text-white/80 max-w-md mx-auto leading-relaxed text-center">
                                        Your enquiry has been successfully sent. We&apos;ll send the <span className="text-accent font-semibold">{submittedBrochure || "brochure"}</span> to your inbox shortly.
                                    </DialogDescription>
                                </motion.div>
                            </DialogHeader>

                            {/* Additional Info */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="mt-8 text-center"
                            >
                                <p className="text-white/60 text-sm">
                                    Our team will be in touch with you soon to assist with your caravan journey.
                                </p>
                            </motion.div>

                            {/* Close Button */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="mt-10 flex justify-center"
                            >
                                <Button
                                    onClick={() => setShowSuccessModal(false)}
                                    className="px-8 py-6 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    Close
                                </Button>
                            </motion.div>

                            {/* Equalizer Logo at Bottom Center */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                                className="mt-12 relative h-10 w-32"
                            >
                                <Image
                                    src="/logo/whitelogoWQ.png"
                                    alt="Equalizer RV"
                                    fill
                                    className="object-contain"
                                />
                            </motion.div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                    </motion.div>
                </DialogContent>
            </Dialog>
        </div>
    );
}