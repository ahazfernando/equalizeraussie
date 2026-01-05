"use client";

import { useState, useEffect } from "react";
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
import { Send, ArrowRight, CheckCircle2, Search, Phone } from "lucide-react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { saveQuote } from "@/data/quotes";
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

export default function Quote() {
    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        email: "",
        countryCode: "+61",
        phone: "",
        model: "",
        message: "",
        postcode: "",
        state: "",
    });

    const [phoneCodeOpen, setPhoneCodeOpen] = useState(false);

    // Common country codes
    const countryCodes = [
        { code: "+61", country: "Australia", flag: "🇦🇺" },
        { code: "+1", country: "United States", flag: "🇺🇸" },
        { code: "+44", country: "United Kingdom", flag: "🇬🇧" },
        { code: "+64", country: "New Zealand", flag: "🇳🇿" },
        { code: "+27", country: "South Africa", flag: "🇿🇦" },
        { code: "+33", country: "France", flag: "🇫🇷" },
        { code: "+49", country: "Germany", flag: "🇩🇪" },
        { code: "+39", country: "Italy", flag: "🇮🇹" },
        { code: "+34", country: "Spain", flag: "🇪🇸" },
        { code: "+31", country: "Netherlands", flag: "🇳🇱" },
        { code: "+32", country: "Belgium", flag: "🇧🇪" },
        { code: "+41", country: "Switzerland", flag: "🇨🇭" },
        { code: "+43", country: "Austria", flag: "🇦🇹" },
        { code: "+45", country: "Denmark", flag: "🇩🇰" },
        { code: "+46", country: "Sweden", flag: "🇸🇪" },
        { code: "+47", country: "Norway", flag: "🇳🇴" },
        { code: "+358", country: "Finland", flag: "🇫🇮" },
        { code: "+353", country: "Ireland", flag: "🇮🇪" },
        { code: "+351", country: "Portugal", flag: "🇵🇹" },
        { code: "+30", country: "Greece", flag: "🇬🇷" },
        { code: "+7", country: "Russia", flag: "🇷🇺" },
        { code: "+81", country: "Japan", flag: "🇯🇵" },
        { code: "+82", country: "South Korea", flag: "🇰🇷" },
        { code: "+86", country: "China", flag: "🇨🇳" },
        { code: "+91", country: "India", flag: "🇮🇳" },
        { code: "+65", country: "Singapore", flag: "🇸🇬" },
        { code: "+60", country: "Malaysia", flag: "🇲🇾" },
        { code: "+66", country: "Thailand", flag: "🇹🇭" },
        { code: "+62", country: "Indonesia", flag: "🇮🇩" },
        { code: "+63", country: "Philippines", flag: "🇵🇭" },
        { code: "+84", country: "Vietnam", flag: "🇻🇳" },
        { code: "+971", country: "UAE", flag: "🇦🇪" },
        { code: "+974", country: "Qatar", flag: "🇶🇦" },
        { code: "+966", country: "Saudi Arabia", flag: "🇸🇦" },
        { code: "+55", country: "Brazil", flag: "🇧🇷" },
        { code: "+52", country: "Mexico", flag: "🇲🇽" },
        { code: "+54", country: "Argentina", flag: "🇦🇷" },
        { code: "+56", country: "Chile", flag: "🇨🇱" },
        { code: "+57", country: "Colombia", flag: "🇨🇴" },
    ];

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [submittedModel, setSubmittedModel] = useState<string>("");

    // Available models
    const availableModels = [
        { id: "cruzer", name: "Cruzer" },
        { id: "rebel", name: "Rebel" },
        { id: "rogue", name: "Rogue" },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.model) {
            toast.error("Please select a caravan model");
            return;
        }
        
        try {
            saveQuote({
                name: `${formData.fname} ${formData.lname}`,
                email: formData.email,
                phone: `${formData.countryCode} ${formData.phone}`,
                model: formData.model,
                message: formData.message,
                postcode: formData.postcode,
                state: formData.state,
            });
            setSubmittedModel(formData.model);
            setShowSuccessModal(true);
            setFormData({
                fname: "", lname: "", email: "", countryCode: "+61", phone: "", model: "",
                message: "", postcode: "", state: "",
            });
        } catch (error) {
            console.error("Error saving quote:", error);
            toast.error("There was an error submitting your enquiry. Please try again.");
        }
    };

    // Get model logo based on model name
    const getModelLogo = () => {
        const modelName = submittedModel.toLowerCase();
        if (modelName.includes("cruzer")) return "/caravanlogos/CruzerLogo.png";
        if (modelName.includes("rebel")) return "/caravanlogos/RebelLogo.png";
        if (modelName.includes("rogue")) return "/caravanlogos/RogueLogo.png";
        return "/caravanlogos/CruzerLogo.png"; // Default
    };

    return (
        <>
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-background h-[60vh] flex items-center -mt-24 pt-24">
                <div className="absolute inset-0 w-full h-full">
                    <Image
                        src="/mainlogo/Image_fx-5.png"
                        alt="Quote Header"
                        fill
                        className="object-cover"
                        priority
                        sizes="100vw"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-background" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

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
                                <h2 className="text-3xl font-bold mb-2">Request a Quote</h2>
                                <p className="text-muted-foreground mb-10">Get a personalized quote for the <span className="text-foreground font-semibold">{formData.model || "caravan model"}</span> of your choice.</p>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>First Name *</Label>
                                            <Input 
                                                required 
                                                value={formData.fname}
                                                onChange={(e) => setFormData({ ...formData, fname: e.target.value })}
                                                className="rounded-xl bg-secondary/50 border-none h-12" 
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Last Name *</Label>
                                            <Input 
                                                required 
                                                value={formData.lname}
                                                onChange={(e) => setFormData({ ...formData, lname: e.target.value })}
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
                                            <Label>Phone Number</Label>
                                            <div className="flex gap-2">
                                                <Popover open={phoneCodeOpen} onOpenChange={setPhoneCodeOpen}>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        role="combobox"
                                                        aria-expanded={phoneCodeOpen}
                                                        className="w-[80px] justify-center rounded-xl bg-secondary/50 border-none h-12 px-2"
                                                    >
                                                        {formData.countryCode}
                                                    </Button>
                                                </PopoverTrigger>
                                                    <PopoverContent className="w-[300px] p-0" align="start">
                                                        <Command>
                                                            <CommandInput placeholder="Search country..." />
                                                            <CommandList>
                                                                <CommandEmpty>No country found.</CommandEmpty>
                                                                <CommandGroup>
                                                                    {countryCodes.map((country) => (
                                                                        <CommandItem
                                                                            key={country.code}
                                                                            value={`${country.code} ${country.country}`}
                                                                            onSelect={() => {
                                                                                setFormData({ ...formData, countryCode: country.code });
                                                                                setPhoneCodeOpen(false);
                                                                            }}
                                                                            className="flex items-center gap-2"
                                                                        >
                                                                            <span>{country.flag}</span>
                                                                            <span className="font-medium">{country.code}</span>
                                                                            <span className="text-muted-foreground">{country.country}</span>
                                                                        </CommandItem>
                                                                    ))}
                                                                </CommandGroup>
                                                            </CommandList>
                                                        </Command>
                                                    </PopoverContent>
                                                </Popover>
                                                <Input 
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    placeholder="Phone number"
                                                    className="flex-1 rounded-xl bg-secondary/50 border-none h-12" 
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Select Model *</Label>
                                        <Select 
                                            value={formData.model} 
                                            onValueChange={(v) => setFormData({ ...formData, model: v })}
                                            required
                                        >
                                            <SelectTrigger className="rounded-xl bg-secondary/50 border-none h-12">
                                                <SelectValue placeholder="Select a model" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-background border-border">
                                                {availableModels.map((model) => (
                                                    <SelectItem key={model.id} value={model.name}>
                                                        {model.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
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
                            className="lg:col-span-5 relative w-full h-full min-h-[700px] rounded-3xl overflow-hidden group"
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
                </div>
            </section>

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
                            {submittedModel && (
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
                            )}

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
                                        Your quote request has been successfully sent. We&apos;ll send you a personalized quote for the <span className="text-accent font-semibold">{submittedModel || "selected model"}</span> shortly.
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
        </>
    );
}