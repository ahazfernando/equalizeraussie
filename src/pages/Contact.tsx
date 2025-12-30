"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
import { MapPin, Phone, Mail, Clock, Send, Sparkles } from "lucide-react";
import { toast } from "sonner";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["123 Caravan Way", "Melbourne, VIC 3000", "Australia"],
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["1300 000 000", "Mon-Fri 9am-5pm"],
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["hello@equalizerrv.com.au", "sales@equalizerrv.com.au"],
  },
  {
    icon: Clock,
    title: "Opening Hours",
    details: ["Mon-Fri: 9am - 5pm", "Sat: 10am - 4pm"],
  },
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
    postcode: "",
    state: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! Adventure awaits.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      interest: "",
      message: "",
      postcode: "",
      state: "",
    });
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center overflow-hidden -mt-24 pt-24">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/videos/contact-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-background" />
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="max-w-3xl">
              <div className="inline-block mb-6">
                <span className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-white/15 to-white/5 border border-white/30 backdrop-blur-sm shadow-lg shadow-accent/10 group text-white text-base font-semibold cursor-pointer">
                  <span className="w-3 h-3 rounded-full bg-foreground animate-ping" />
                  Get In Touch
                </span>
              </div>
              <h2 className="font-heading text-5xl sm:text-6xl lg:text-6xl font-extrabold leading-[1.1] mb-8 text-foreground">
                Let{"'"}s Start Your Adventure
              </h2>
              <p className="text-muted-foreground text-md sm:text-lg leading-relaxed max-w-4xl mx-auto font-light mb-5">
                Whether you{"'"}re ready to buy, want to book a viewing, or just have questions, our friendly team is here to help.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 relative">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]" />
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            {/* Left Column: Info */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-5 space-y-12"
            >
              <div>
                <h2 className="text-3xl font-bold mb-4 tracking-tight">How can we help?</h2>
                <p className="text-muted-foreground text-lg">
                  Our team of caravan enthusiasts is ready to answer your questions.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {contactInfo.map((info, idx) => (
                  <motion.div
                    key={info.title}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, translateY: -5 }}
                    className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm transition-all hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5"
                  >
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                      <info.icon className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="font-bold text-sm uppercase tracking-widest mb-2">{info.title}</h3>
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-sm text-muted-foreground">{detail}</p>
                    ))}
                  </motion.div>
                ))}
              </div>
              {/* Map with overlay */}
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
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="lg:col-span-7"
            >
              <div className="relative p-1 rounded-[2rem] bg-gradient-to-br from-border via-border/50 to-accent/20">
                <div className="bg-card p-10 rounded-[1.8rem] shadow-sm">
                  <div className="mb-10">
                    <h2 className="text-3xl font-bold mb-2">Send an Enquiry</h2>
                    <p className="text-muted-foreground">Fill out the form and we{"'"}ll be in touch within 24 hours.</p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="name" className="text-xs font-bold tracking-widest uppercase opacity-70">Full Name</Label>
                        <Input
                          id="name"
                          placeholder="John Doe"
                          required
                          className="h-12 bg-muted/30 border-none focus-visible:ring-2 focus-visible:ring-accent rounded-xl transition-all"
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          value={formData.name}
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="email" className="text-xs font-bold tracking-widest uppercase opacity-70">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          required
                          className="h-12 bg-muted/30 border-none focus-visible:ring-2 focus-visible:ring-accent rounded-xl"
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          value={formData.email}
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label className="text-xs font-bold tracking-widest uppercase opacity-70">Interest</Label>
                        <Select onValueChange={(v) => setFormData({ ...formData, interest: v })} value={formData.interest}>
                          <SelectTrigger className="h-12 bg-muted/30 border-none rounded-xl">
                            <SelectValue placeholder="Select interest" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dealer">Find a Dealer</SelectItem>
                            <SelectItem value="quote">Request Quote</SelectItem>
                            <SelectItem value="support">Service Support</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="postcode" className="text-xs font-bold tracking-widest uppercase opacity-70">Postcode</Label>
                        <Input
                          id="postcode"
                          placeholder="3000"
                          className="h-12 bg-muted/30 border-none focus-visible:ring-2 focus-visible:ring-accent rounded-xl"
                          onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                          value={formData.postcode}
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="message" className="text-xs font-bold tracking-widest uppercase opacity-70">Message</Label>
                      <Textarea
                        id="message"
                        rows={5}
                        placeholder="Tell us about your travel plans..."
                        className="bg-muted/30 border-none focus-visible:ring-2 focus-visible:ring-accent rounded-2xl resize-none p-4"
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        value={formData.message}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full h-14 bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-2xl transition-all hover:scale-[1.01] active:scale-[0.98] shadow-lg shadow-accent/20"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}