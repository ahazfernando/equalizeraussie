"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowRight, ChevronDown, Download, Droplets,
    HelpCircle, Shield, Wrench, ClipboardCheck,
    MapPin, CheckCircle2, FileSearch
} from "lucide-react";

// Animation Variants
const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
};

const staggerContainer = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.1 } }
};

function Warranty() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const claimSteps = [
        {
            title: "Document the Issue",
            desc: "Take clear photos or videos of the defect and keep your original Bill of Sale handy.",
            icon: <FileSearch className="w-6 h-6" />,
        },
        {
            title: "Locate a Service Center",
            desc: "Find your nearest authorized EqualizerRV dealer using our interactive dealer map.",
            icon: <MapPin className="w-6 h-6" />,
        },
        {
            title: "Schedule Inspection",
            desc: "Contact the dealer to schedule a warranty inspection. They will submit a claim on your behalf.",
            icon: <ClipboardCheck className="w-6 h-6" />,
        },
        {
            title: "Fast-Track Repair",
            desc: "Once approved, our team works with the dealer to ensure parts are shipped priority.",
            icon: <CheckCircle2 className="w-6 h-6" />,
        }
    ];

    const faqs = [
        {
            question: "Is the warranty transferable if I sell my EqualizerRV?",
            answer: "Yes, the warranty is transferable once to a second owner with proper documentation and notification to EqualizerRV within 30 days of sale."
        },
        {
            question: "What is not covered under the warranty?",
            answer: "Normal wear and tear, misuse, neglect, accidents, unauthorized modifications, and damage from improper maintenance or storage are not covered."
        },
        {
            question: "What is the Limited Lifetime Roof option?",
            answer: "For an additional fee at purchase, you can upgrade to lifetime coverage on the roof membrane and seals against manufacturing defects."
        }
    ];

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

                <div className="relative container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl"
                    >
                        <span className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-white/15 to-white/5 border border-white/30 backdrop-blur-sm shadow-lg text-white text-base font-semibold">
                            <span className="w-3 h-3 rounded-full bg-white animate-ping" />
                            EQUALIZERRV Protection
                        </span>
                        <h1 className="font-heading text-5xl md:text-6xl font-extrabold text-white my-6 leading-tight">
                            Peace of Mind On Every Journey
                        </h1>
                        <p className="text-gray-300 text-lg max-w-xl font-light">
                            Our comprehensive warranty covers a wide range of components, giving you the confidence to explore further.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Coverage Cards */}
            <section className="py-20 container mx-auto px-4">
                <motion.div {...fadeIn} className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Comprehensive Coverage</h2>
                    <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
                </motion.div>

                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {[
                        { icon: <Shield />, title: "Structural Integrity", time: "10 Years", desc: "Frame, chassis, and body construction covered against defects." },
                        { icon: <Wrench />, title: "Appliances & Systems", time: "03 Years", desc: "Refrigerator, AC, plumbing, and electrical factory components." },
                        { icon: <Droplets />, title: "Roof Protection", time: "12 Years", desc: "Full roof membrane and seals against manufacturing leaks." }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            variants={fadeIn}
                            className="p-8 cursor-pointer rounded-3xl bg-card border border-border shadow-sm hover:shadow-xl hover:border-accent/30 transition-all group"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-white transition-colors">
                                {item.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                            <p className="text-muted-foreground mb-6 text-sm">{item.desc}</p>
                            <div className="pt-6 border-t border-border flex justify-between items-center">
                                <span className="text-2xl font-black text-accent">{item.time}</span>
                                <span className="text-[10px] uppercase tracking-widest font-bold opacity-50">Coverage</span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* HOW TO CLAIM PROCESS SECTION */}
            <section className="py-20 relative overflow-hidden">
                {/* Abstract Background Decoration */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-5 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent rounded-full blur-[120px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent rounded-full blur-[120px]" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div {...fadeIn} className="text-center mb-24">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">How to Claim Your Warranty</h2>

                        <div className="w-20 h-1 bg-accent mx-auto rounded-full" />

                        <p className="text-muted-foreground mt-4">Four simple steps to get you back on the road.</p>
                    </motion.div>

                    <div className="relative max-w-7xl mx-auto">
                        {/* DESKTOP CONNECTING LINE */}
                        <div className="hidden md:block absolute top-[48px] left-[10%] right-[10%] h-[2px] overflow-hidden">
                            {/* Background Track */}
                            <div className="absolute inset-0 bg-border/50" />
                            {/* Animated Flow Layer */}
                            <motion.div
                                initial={{ x: "-100%" }}
                                whileInView={{ x: "100%" }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-accent to-transparent w-1/2"
                            />
                        </div>

                        {/* MOBILE CONNECTING LINE (Vertical) */}
                        <div className="md:hidden absolute left-[31px] top-10 bottom-10 w-[2px] bg-border/50" />

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
                            {claimSteps.map((step, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.15, duration: 0.5 }}
                                    viewport={{ once: true }}
                                    className="relative flex flex-row md:flex-col items-start md:items-center text-left md:text-center group"
                                >
                                    {/* Step Icon Node */}
                                    <div className="relative shrink-0 mb-0 md:mb-8 mr-6 md:mr-0">
                                        <div className="w-16 h-16 rounded-2xl bg-background border-2 border-border flex items-center justify-center text-foreground z-10 relative transition-all duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-white group-hover:shadow-[0_0_30px_rgba(var(--accent),0.4)] group-hover:-rotate-6">
                                            {step.icon}
                                        </div>
                                        {/* Shadow Number behind icon */}
                                        <div className="absolute -top-6 -right-10 text-6xl font-black text-foreground/10 pointer-events-none group-hover:text-accent/20 transition-colors">
                                            {idx + 1}
                                        </div>
                                    </div>

                                    {/* Text Content */}
                                    <div className="flex flex-col">
                                        <h4 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">
                                            {step.title}
                                        </h4>
                                        <p className="text-muted-foreground text-sm leading-relaxed md:px-4">
                                            {step.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 container mx-auto px-4 max-w-8xl">
                <motion.div {...fadeIn} className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Warranty FAQ</h2>
                    <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
                </motion.div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="border border-border rounded-2xl overflow-hidden bg-card"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full p-6 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
                            >
                                <span className="font-semibold text-lg flex items-center gap-3">
                                    <HelpCircle className="w-5 h-5 text-accent" />
                                    {faq.question}
                                </span>
                                <ChevronDown className={`w-5 h-5 transition-transform ${openIndex === index ? "rotate-180" : ""}`} />
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-6 pt-0 text-muted-foreground border-t border-border bg-muted/20">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA Footer */}
            <section className="py-20 bg-card text-white text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Need Further Assistance?</h2>
                    <p className="mb-10 text-white/80 max-w-2xl mx-auto">
                        Our support team is available Monday through Friday to help you with your warranty questions and claims.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button className="px-8 py-4 bg-white text-card rounded-full font-bold transition-transform flex items-center gap-2 shadow-lg">
                            Contact Support <ArrowRight className="w-5 h-5" />
                        </button>
                        <button className="px-8 py-4 bg-transparent border-2 border-white/30 rounded-full font-bold hover:bg-white/10 transition-colors flex items-center gap-2">
                            <Download className="w-5 h-5" /> Download PDF
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Warranty;