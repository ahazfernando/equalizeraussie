"use client";

import { useState } from "react";
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
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
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
    details: ["Mon-Fri: 9am - 5pm", "Sat: 10am - 4pm", "Sun: By Appointment"],
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for your enquiry! We&apos;ll be in touch within 24 hours.");
    setFormData({ name: "", email: "", phone: "", interest: "", message: "" });
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-secondary/30 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-accent font-medium mb-2">Get in Touch</p>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Let&apos;s Start Your Adventure
            </h1>
            <p className="text-muted-foreground text-lg">
              Whether you&apos;re ready to buy, want to book a viewing, or just have 
              questions, our friendly team is here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <h2 className="font-heading text-2xl font-bold">Contact Information</h2>
              
              <div className="grid sm:grid-cols-2 gap-6">
                {contactInfo.map((info) => (
                  <div key={info.title} className="card-premium p-6">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                      <info.icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="font-heading font-semibold mb-2">{info.title}</h3>
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-muted-foreground text-sm">
                        {detail}
                      </p>
                    ))}
                  </div>
                ))}
              </div>

              {/* Map Placeholder */}
              <div className="bg-secondary rounded-2xl h-64 flex items-center justify-center">
                <p className="text-muted-foreground">Map would be displayed here</p>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="card-premium p-8">
                <h2 className="font-heading text-2xl font-bold mb-6">Send an Enquiry</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="form-input-premium"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="form-input-premium"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="form-input-premium"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="interest">I&apos;m Interested In</Label>
                      <Select
                        value={formData.interest}
                        onValueChange={(value) => setFormData({ ...formData, interest: value })}
                      >
                        <SelectTrigger className="form-input-premium">
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="booking">Booking a Viewing</SelectItem>
                          <SelectItem value="quote">Getting a Quote</SelectItem>
                          <SelectItem value="finance">Finance Options</SelectItem>
                          <SelectItem value="custom">Custom Build</SelectItem>
                          <SelectItem value="general">General Enquiry</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Your Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={5}
                      className="form-input-premium resize-none"
                      placeholder="Tell us about your dream caravan or any questions you have..."
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Enquiry
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    By submitting this form, you agree to our privacy policy. 
                    We&apos;ll respond within 24 hours.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
