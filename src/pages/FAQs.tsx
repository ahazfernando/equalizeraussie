"use client";

import { useState } from "react";
import Image from "next/image";
import { MessageCircle, HelpCircle, Car, Shield, Wrench, Phone, Mail } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

const generalFAQs = [
  {
    question: "WHAT MAKES EQUALIZER RV DIFFERENT FROM OTHER CARAVAN BRANDS?",
    answer: "Equalizer RV is 100% Australian made, designed specifically for Australian conditions. We use premium materials, precision engineering, and offer comprehensive warranties. Our caravans are built to handle everything from on-road touring to extreme off-road adventures."
  },
  {
    question: "WHERE ARE EQUALIZER RVS MANUFACTURED?",
    answer: "All Equalizer RVs are proudly manufactured in Australia. Our facility uses Australian-sourced materials where possible and employs skilled local craftspeople who understand the unique demands of Australian travel."
  },
  {
    question: "WHAT WARRANTY DO YOU OFFER?",
    answer: "Every Equalizer RV comes with our industry-leading 5-year comprehensive warranty covering structural components, appliances, and workmanship. Extended warranty options are also available for additional peace of mind."
  },
  {
    question: "CAN I CUSTOMIZE MY CARAVAN?",
    answer: "Yes! We offer extensive customization options including floor plans, interior finishes, appliances, and features. Our team will work with you to create a caravan that perfectly matches your lifestyle and travel needs."
  },
  {
    question: "HOW LONG DOES IT TAKE TO BUILD A CARAVAN?",
    answer: "Build times typically range from 12-16 weeks depending on the model and level of customization. Our team will provide an accurate timeline during your consultation based on your specific requirements."
  }
];

const purchaseFAQs = [
  {
    question: "DO YOU OFFER FINANCE OPTIONS?",
    answer: "Yes, we work with trusted finance partners to offer flexible payment plans tailored to your budget. Our finance specialists can help you explore options including competitive interest rates, flexible terms from 1-7 years, and quick pre-approval processes."
  },
  {
    question: "WHAT DEPOSIT IS REQUIRED?",
    answer: "Deposit requirements vary depending on the finance option and your circumstances. Typically, deposits range from 10-20% of the purchase price. We can discuss the best option for your situation during consultation."
  },
  {
    question: "CAN I TRADE IN MY EXISTING CARAVAN?",
    answer: "Yes, we accept trade-ins on existing caravans. Our team can assess your current caravan and provide a fair trade-in value that can be applied towards your new Equalizer RV purchase."
  },
  {
    question: "DO YOU DELIVER INTERSTATE?",
    answer: "Yes, we offer complimentary delivery to all capital cities and major regional centres across Australia. Our team coordinates the entire delivery process to ensure your new caravan arrives safely and on schedule."
  },
  {
    question: "WHAT PAYMENT METHODS DO YOU ACCEPT?",
    answer: "We accept various payment methods including bank transfers, finance options, and cash payments. Our team will discuss the best payment arrangement for your situation during the purchase process."
  }
];

const serviceFAQs = [
  {
    question: "WHERE CAN I GET MY CARAVAN SERVICED?",
    answer: "We have a nationwide network of authorised service centres across Australia. Whether you need routine maintenance, warranty repairs, or general servicing, you can find a qualified service centre near you through our dealer locator."
  },
  {
    question: "HOW OFTEN SHOULD I SERVICE MY CARAVAN?",
    answer: "We recommend annual servicing to keep your caravan in optimal condition. However, if you do extensive off-road travel or high mileage, more frequent servicing may be beneficial. Your service centre can provide recommendations based on your usage."
  },
  {
    question: "WHAT IS COVERED UNDER WARRANTY?",
    answer: "Our 5-year comprehensive warranty covers structural components, appliances, electrical systems, plumbing, and workmanship defects. Normal wear and tear, damage from misuse, or modifications not approved by Equalizer RV are not covered."
  },
  {
    question: "CAN I GET PARTS FOR OLDER EQUALIZER RVS?",
    answer: "Yes, we maintain a comprehensive parts inventory and can source parts for older models. Our service network can help identify and order the parts you need, even for caravans that are several years old."
  },
  {
    question: "DO YOU OFFER MOBILE SERVICING?",
    answer: "Some of our authorised service centres offer mobile servicing options. Contact your nearest service centre to inquire about mobile servicing availability in your area."
  }
];

const technicalFAQs = [
  {
    question: "WHAT TOWING CAPACITY DO I NEED?",
    answer: "Towing capacity requirements vary by model. Our Cruzer models typically require a vehicle with 2.5-3.5 tonne towing capacity, while our Rebel and Rogue models may require 3.5-4.5 tonnes. We recommend checking your vehicle's specifications and consulting with our team to ensure compatibility."
  },
  {
    question: "WHAT IS THE OFF-GRID CAPABILITY?",
    answer: "All Equalizer RV models come with solar power systems and lithium batteries for off-grid capability. The capacity varies by model - from 200W solar and 100Ah batteries in entry models, up to 1250W solar and 600Ah batteries in premium models. This allows for extended off-grid stays depending on your power usage."
  },
  {
    question: "ARE YOUR CARAVANS SUITABLE FOR OFF-ROAD TRAVEL?",
    answer: "Yes! Our Rebel and Rogue models are specifically designed for off-road adventures with independent suspension, reinforced chassis, and all-terrain tires. Even our Cruzer model has off-road capable suspension for light off-road use. All models are built to handle Australian conditions."
  },
  {
    question: "WHAT WATER CAPACITY DO THE CARAVANS HAVE?",
    answer: "Water capacity varies by model, typically ranging from 190L to 240L of fresh water storage. All models include grey water tanks and feature efficient water systems with digital level displays for monitoring your water usage."
  },
  {
    question: "CAN I ADD ADDITIONAL SOLAR PANELS?",
    answer: "Yes, all our caravans are solar-ready and can accommodate additional solar panels. Our team can discuss solar upgrade options during customization to meet your specific power needs for extended off-grid adventures."
  }
];

export default function FAQs() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[40vh] lg:h-[50vh] w-full overflow-hidden -mt-24 pt-24 flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/header/nighttie.jpg"
            alt="FAQ Header"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        </div>

        <div className="container relative z-10 mx-auto px-4 lg:px-8">
          <span className="text-primary text-sm font-medium tracking-wider uppercase">FREQUENTLY ASKED QUESTIONS</span>
          <h1 className="font-display text-5xl lg:text-7xl mt-2 text-foreground">FAQs</h1>
          <p className="text-muted-foreground text-lg mt-4 max-w-2xl">
            Find answers to common questions about Equalizer RV caravans, purchasing, servicing, and more.
          </p>
        </div>
      </section>

      {/* General Questions Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-primary" />
              </div>
              <h2 className="font-display text-3xl lg:text-4xl text-foreground">General Questions</h2>
            </div>
            <p className="text-muted-foreground max-w-3xl">
              Learn about Equalizer RV, our manufacturing process, warranties, and what makes our caravans unique.
            </p>
          </div>

          <div>
            <Accordion type="single" collapsible className="space-y-4">
              {generalFAQs.map((faq, index) => (
                <AccordionItem key={index} value={`general-${index}`} className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger className="hover:no-underline py-4">
                    <div className="flex items-center gap-4 w-full text-left">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <MessageCircle className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-foreground font-semibold text-base md:text-lg tracking-wide">{faq.question}</h3>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 pt-0">
                    <div className="pl-14">
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Purchase & Finance Section */}
      <section className="py-16 bg-background-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                <Car className="w-6 h-6 text-accent" />
              </div>
              <h2 className="font-display text-3xl lg:text-4xl text-foreground">Purchase & Finance</h2>
            </div>
            <p className="text-muted-foreground max-w-3xl">
              Everything you need to know about purchasing your Equalizer RV, including finance options, deposits, trade-ins, and delivery.
            </p>
          </div>

          <div>
            <Accordion type="single" collapsible className="space-y-4">
              {purchaseFAQs.map((faq, index) => (
                <AccordionItem key={index} value={`purchase-${index}`} className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger className="hover:no-underline py-4">
                    <div className="flex items-center gap-4 w-full text-left">
                      <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <MessageCircle className="w-5 h-5 text-accent" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-foreground font-semibold text-base md:text-lg tracking-wide">{faq.question}</h3>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 pt-0">
                    <div className="pl-14">
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Service & Support Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Wrench className="w-6 h-6 text-primary" />
              </div>
              <h2 className="font-display text-3xl lg:text-4xl text-foreground">Service & Support</h2>
            </div>
            <p className="text-muted-foreground max-w-3xl">
              Information about servicing, maintenance, warranty coverage, and finding support for your Equalizer RV.
            </p>
          </div>

          <div>
            <Accordion type="single" collapsible className="space-y-4">
              {serviceFAQs.map((faq, index) => (
                <AccordionItem key={index} value={`service-${index}`} className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger className="hover:no-underline py-4">
                    <div className="flex items-center gap-4 w-full text-left">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <MessageCircle className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-foreground font-semibold text-base md:text-lg tracking-wide">{faq.question}</h3>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 pt-0">
                    <div className="pl-14">
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Technical Specifications Section */}
      <section className="py-16 bg-background-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <h2 className="font-display text-3xl lg:text-4xl text-foreground">Technical Specifications</h2>
            </div>
            <p className="text-muted-foreground max-w-3xl">
              Technical questions about towing requirements, off-grid capability, water systems, and caravan specifications.
            </p>
          </div>

          <div>
            <Accordion type="single" collapsible className="space-y-4">
              {technicalFAQs.map((faq, index) => (
                <AccordionItem key={index} value={`technical-${index}`} className="bg-card border border-border rounded-xl px-6">
                  <AccordionTrigger className="hover:no-underline py-4">
                    <div className="flex items-center gap-4 w-full text-left">
                      <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <MessageCircle className="w-5 h-5 text-accent" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-foreground font-semibold text-base md:text-lg tracking-wide">{faq.question}</h3>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 pt-0">
                    <div className="pl-14">
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Still Have Questions CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center mx-auto mb-6">
                <HelpCircle className="w-8 h-8 text-primary" />
              </div>
              <h2 className="font-display text-3xl lg:text-4xl text-foreground mb-4">Still Have Questions?</h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                Our team is here to help. Get in touch with our specialists who can answer any questions and guide you through your caravan journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-foreground">
                    <Phone className="w-5 h-5 mr-2" />
                    Contact Us
                  </Button>
                </Link>
                <Link href="/dealers">
                  <Button size="lg" variant="outline">
                    <Mail className="w-5 h-5 mr-2" />
                    Find a Dealer
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
