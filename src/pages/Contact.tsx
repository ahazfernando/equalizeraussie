"use client";

import { useState } from "react";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, Calendar, MessageCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
    postcode: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message Sent", description: "We'll be in touch within 24 hours." });
    setFormData({
      name: "",
      email: "",
      phone: "",
      interest: "",
      message: "",
      postcode: "",
    });
  };

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[40vh] lg:h-[50vh] w-full overflow-hidden -mt-24 pt-24 flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/header/Image_fx-4.png"
            alt="Contact Us Header"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* Gradient Overlay - Blends to background */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        </div>

        {/* Content */}
        <div className="container relative z-10 mx-auto px-4 lg:px-8">
          <span className="text-primary text-sm font-medium tracking-wider">GET IN TOUCH</span>
          <h1 className="font-display text-5xl lg:text-7xl mt-2 text-foreground">CONTACT US</h1>
          <p className="text-muted-foreground text-lg mt-4 max-w-2xl">
            Ready to start your adventure? Our team is here to help you find the perfect caravan.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="glass p-8 rounded-2xl">
              <h2 className="font-display text-2xl text-foreground mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label>Full Name</Label>
                  <Input
                    className="mt-1 bg-background-secondary"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    className="mt-1 bg-background-secondary"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input
                    type="tel"
                    className="mt-1 bg-background-secondary"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Interest</Label>
                  <Select
                    value={formData.interest}
                    onValueChange={(value) => setFormData({ ...formData, interest: value })}
                  >
                    <SelectTrigger className="mt-1 bg-background-secondary">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border">
                      <SelectItem value="dealer">Find a Dealer</SelectItem>
                      <SelectItem value="quote">Request Quote</SelectItem>
                      <SelectItem value="support">Service Support</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Postcode</Label>
                  <Input
                    className="mt-1 bg-background-secondary"
                    value={formData.postcode}
                    onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Message</Label>
                  <Textarea
                    className="mt-1 bg-background-secondary min-h-[120px]"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>

            {/* Info Panel */}
            <div className="space-y-8">
              <div className="glass p-8 rounded-2xl">
                <h3 className="font-display text-xl text-foreground mb-6">Contact Details</h3>
                <div className="space-y-6">
                  <a href="tel:1300000000" className="flex items-center gap-4 text-foreground hover:text-primary transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">1300 000 000</p>
                    </div>
                  </a>
                  <a href="mailto:hello@equalizerrv.com.au" className="flex items-center gap-4 text-foreground hover:text-primary transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">hello@equalizerrv.com.au</p>
                    </div>
                  </a>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Showroom</p>
                      <p className="font-medium text-foreground">123 Caravan Way, Melbourne, VIC 3000</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Hours</p>
                      <p className="font-medium text-foreground">Mon-Fri 9am-5pm, Sat 10am-4pm</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Book Viewing */}
              <div className="glass p-8 rounded-2xl">
                <h3 className="font-display text-xl text-foreground mb-4">Book a Viewing</h3>
                <p className="text-muted-foreground text-sm mb-6">Schedule a private showroom visit with one of our RV specialists.</p>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="glass p-3 rounded-lg text-center cursor-pointer hover:border-primary/50 transition-all">
                    <Calendar className="w-5 h-5 text-primary mx-auto mb-1" />
                    <p className="text-sm text-foreground">Select Date</p>
                  </div>
                  <div className="glass p-3 rounded-lg text-center cursor-pointer hover:border-primary/50 transition-all">
                    <Clock className="w-5 h-5 text-primary mx-auto mb-1" />
                    <p className="text-sm text-foreground">Select Time</p>
                  </div>
                </div>
                <Button className="w-full shadow-glow">Schedule Viewing</Button>
              </div>

              {/* Map Placeholder */}
              <div className="glass rounded-2xl h-64 flex items-center justify-center overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5000!2d144.956776!3d-37.813628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5774f372b625b0!2sMelbourne%20VIC%203000%2C%20Australia!5e0!3m2!1sen!2sau!4v1734470000000&z=14&q=123+Caravan+Way"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Answers Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Side - FAQ */}
            <div>
              <p className="text-primary tracking-[0.3em] uppercase text-lg font-medium mb-4">
                Common Questions
              </p>
              <h2 className="text-6xl md:text-7xl font-bold text-foreground mb-12">
                QUICK ANSWERS
              </h2>
              
              <Accordion type="single" collapsible className="space-y-4">
                {[
                  {
                    question: "HOW QUICKLY CAN I EXPECT A RESPONSE?",
                    answer: "Our team responds within 2-4 business hours during operating hours."
                  },
                  {
                    question: "CAN I VISIT WITHOUT AN APPOINTMENT?",
                    answer: "Walk-ins welcome, but booking ensures a dedicated specialist."
                  },
                  {
                    question: "DO YOU OFFER VIRTUAL CONSULTATIONS?",
                    answer: "Yes, video calls available for interstate or remote customers."
                  }
                ].map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`faq-${index}`}
                    className="bg-card/50 border border-border/30 rounded-xl px-6"
                  >
                    <AccordionTrigger className="hover:no-underline py-4">
                      <div className="flex items-center gap-4 w-full text-left">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <MessageCircle className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-foreground font-semibold text-base tracking-wide">
                            {faq.question}
                          </h3>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 pt-0">
                      <div className="pl-14">
                        <p className="text-muted-foreground text-base leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            
            {/* Right Side - Testimonial */}
            <div className="flex items-center">
              <div className="bg-card/30 border border-border/30 rounded-2xl p-8 w-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex -space-x-1">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center">
                        <Star className="w-4 h-4 text-primary fill-primary" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-foreground font-semibold">500+ Happy Customers</p>
                    <p className="text-muted-foreground text-sm">Trusted across Australia</p>
                  </div>
                </div>
                
                <blockquote className="text-xl md:text-2xl text-foreground italic leading-relaxed mb-8">
                  "From the first call to picking up our RV, the team made everything seamless. Highly recommend reaching out."
                </blockquote>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                    MK
                  </div>
                  <div>
                    <p className="text-foreground font-semibold">Michael K.</p>
                    <p className="text-muted-foreground text-sm">Queensland</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
