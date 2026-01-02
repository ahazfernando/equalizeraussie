"use client";

import React from 'react';
import { Users, ShieldCheck, Settings, MapPin, Compass, Zap } from "lucide-react";
import { DealerLocator } from '@/components/dealers/DealerLocator';
import { motion } from 'framer-motion';
import Image from 'next/image';

const dealerCards = [
    {
        icon: Users,
        title: "Expert Guidance",
        description: "Knowledgeable specialists who understand Equalizer RVs and journey.",
    },
    {
        icon: ShieldCheck,
        title: "Trusted Support",
        description: "Authorised dealers delivering reliable service and genuine peace of mind.",
    },
    {
        icon: Settings,
        title: "Seamless Ownership",
        description: "From purchase to after-sales care, every step is handled with precision.",
    },
    {
        icon: MapPin,
        title: "Nationwide Network",
        description: "Convenient access to authorised Equalizer RV dealers across Australia.",
    },
];

// Animation Variants
const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

const Dealers = () => {
    return (
        <>
            <section className="bg-background py-20 overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header Section */}
                    <motion.div 
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="max-w-4xl"
                    >
                        <motion.div variants={fadeInUp} className="inline-block mb-6">
                            <span className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-accent/15 to-accent/5 border border-accent/30 backdrop-blur-sm shadow-lg shadow-accent/10 group text-red-500 dark:text-red-400 text-base font-semibold cursor-pointer">
                                <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
                                Explore Without Limits
                            </span>
                        </motion.div>
                        
                        <motion.h2 variants={fadeInUp} className="font-heading text-5xl sm:text-6xl max-w-3xl lg:text-6xl font-semibold leading-[1.1] mb-8 tracking-wider">
                            The Power of Our Authorised Dealer Network
                        </motion.h2>
                        
                        <motion.p variants={fadeInUp} className="text-muted-foreground text-md leading-relaxed max-w-4xl mx-auto font-light">
                            Our authorised dealers deliver expert guidance, trusted service, and seamless support—ensuring your Equalizer RV experience is refined, reliable, and ready for every journey.
                        </motion.p>
                    </motion.div>

                    {/* Cards Grid */}
                    <motion.div 
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10"
                    >
                        {dealerCards.map((pillar) => (
                            <motion.div
                                key={pillar.title}
                                variants={fadeInUp}
                                whileHover={{ y: -5 }} // Subtle extra lift on hover
                            >
                                <div className="group flex flex-col p-6 rounded-2xl bg-background border-2 border-border transition-all duration-300 ease-out hover:border-accent/50 hover:shadow-lg hover:bg-accent/10 cursor-pointer h-full">
                                    <div className="flex items-center gap-4 mb-3">
                                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 transition-colors group-hover:bg-accent/20">
                                            <pillar.icon className="w-6 h-6 text-accent transition-colors" />
                                        </div>
                                        <h3 className="font-heading font-semibold text-foreground transition-colors group-hover:text-accent tracking-wider">
                                            {pillar.title}
                                        </h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {pillar.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <div className="inline-block mb-6">
                            <span className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-accent/15 to-accent/5 border border-accent/30 backdrop-blur-sm shadow-lg shadow-accent/10 group text-red-500 dark:text-red-400 text-base font-semibold cursor-pointer">
                                <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
                                Connect with a Dealer
                            </span>
                        </div>
                        <h2 className="font-heading text-5xl sm:text-6xl lg:text-6xl font-semibold leading-[1.1] mb-8">
                            Find Your{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600 relative inline-block">
                                Perfect Dealer
                                <motion.span 
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "100%" }}
                                    transition={{ delay: 0.5, duration: 0.8 }}
                                    className="absolute -bottom-3 left-0 right-0 h-2 bg-gradient-to-r from-red-500/50 to-red-600/50 blur-xl" 
                                />
                            </span>
                        </h2>
                        <p className="text-muted-foreground text-md leading-relaxed max-w-4xl mx-auto font-light">
                            Connect with an authorised dealer near you and experience our caravans firsthand. Expert guidance, tailored solutions, and quality craftsmanship designed for every destination.
                        </p>
                    </motion.div>

                    <motion.div 
                        id="dealer-locator"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 1 }}
                    >
                        <DealerLocator />
                    </motion.div>
                </div>
            </section>

            {/* Premium Features Grid Section */}
            <section className="pt-4 pb-24 lg:pt-6 lg:pb-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
                
                <div className="container mx-auto px-4 lg:px-8 relative">
                    <div className="text-center mb-16">
                        <span className="text-primary text-sm font-medium tracking-wider uppercase">Premium Features</span>
                        <h2 className="font-display text-4xl lg:text-6xl mt-2 text-foreground italic">What sets us apart</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                        {/* Feature 1 - Large */}
                        <div className="lg:col-span-2 lg:row-span-2 relative group overflow-hidden border border-border/20">
                            <div className="absolute inset-0">
                                <Image 
                                    src="/images/aboutFactory.jpg" 
                                    alt="Australian Craftsmanship" 
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12 flex flex-col items-start">
                                <div className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center mb-6 backdrop-blur-sm">
                                    <Settings className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="font-display text-3xl lg:text-4xl text-foreground mb-4">Precision Engineering</h3>
                                <p className="text-foreground/70 text-lg max-w-lg leading-relaxed">Every Equalizer RV is meticulously crafted using premium Australian materials and cutting-edge manufacturing processes. Built to withstand the harshest Australian conditions, from the red dust of the outback to coastal salt spray.</p>
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="relative group overflow-hidden border border-border/20 bg-background-secondary/50 backdrop-blur-sm">
                            <div className="p-8 lg:p-10 min-h-[250px] flex flex-col justify-between">
                                <div className="w-14 h-14 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center mb-6">
                                    <Compass className="w-7 h-7 text-accent" />
                                </div>
                                <div>
                                    <h3 className="font-display text-2xl text-foreground mb-3">Go-Anywhere Capability</h3>
                                    <p className="text-muted-foreground leading-relaxed">Independent suspension systems, reinforced heavy-duty chassis, and premium all-terrain tires for ultimate off-road performance across Australia&apos;s diverse terrain.</p>
                                </div>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>

                        {/* Feature 3 */}
                        <div className="relative group overflow-hidden border border-border/20 bg-background-secondary/50 backdrop-blur-sm">
                            <div className="p-8 lg:p-10 min-h-[250px] flex flex-col justify-between">
                                <div className="w-14 h-14 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center mb-6">
                                    <Zap className="w-7 h-7 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-display text-2xl text-foreground mb-3">Smart Power Systems</h3>
                                    <p className="text-muted-foreground leading-relaxed">High-capacity lithium batteries, advanced solar power systems, and intelligent energy management for complete off-grid independence on your adventures.</p>
                                </div>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Dealers;