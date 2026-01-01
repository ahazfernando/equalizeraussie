import { FinanceCalculator } from "@/components/finance/FinanceCalculator";
import { Check, HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const benefits = [
  "Competitive interest rates from leading lenders",
  "Flexible terms from 1-7 years",
  "Quick online pre-approval process",
  "Tailored packages for your budget",
  "No early repayment penalties",
  "Dedicated finance team support",
];

const faqs = [
  {
    question: "What credit score do I need?",
    answer: "We work with a range of lenders to accommodate different credit profiles. While a good credit score helps secure better rates, we can often find solutions for most customers. Contact us for a confidential assessment.",
  },
  {
    question: "Can I finance a used caravan?",
    answer: "Yes, we can help finance both new and pre-owned Equalizer RV caravans. Terms and rates may vary based on the age and condition of the vehicle.",
  },
  {
    question: "How long does approval take?",
    answer: "Pre-approval can often be obtained within 24-48 hours. Full approval depends on the lender and documentation requirements, typically taking 3-5 business days.",
  },
  {
    question: "What deposit do I need?",
    answer: "Deposit requirements vary by lender and your financial situation. Many of our customers finance with deposits ranging from 10-20% of the purchase price.",
  },
  {
    question: "Can I pay off my loan early?",
    answer: "Most of our finance products allow early repayment without penalty. This means you can pay off your loan faster and save on interest if your circumstances change.",
  },
];

export default function Finance() {
  return (
    <>
      {/* Hero */}
      <section className="bg-secondary/30 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-accent font-medium mb-2">Finance Options</p>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Make Your Dream RV Affordable
            </h1>
            <p className="text-muted-foreground text-lg">
              Flexible finance solutions to help you hit the road sooner. Calculate 
              your repayments and get started today.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Benefits */}
            <div className="space-y-8">
              <div>
                <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                  Finance Made Simple
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We&apos;ve partnered with Australia&apos;s leading finance providers to offer 
                  you competitive rates and flexible terms. Our dedicated finance team 
                  will guide you through the process from application to approval.
                </p>
              </div>

              <div className="space-y-4">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 text-accent" />
                    </div>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Partners */}
              <div className="pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground mb-4">
                  Finance partners include:
                </p>
                <div className="flex items-center gap-6 opacity-60">
                  <div className="h-8 w-24 bg-muted rounded flex items-center justify-center text-xs font-medium">
                    Pepper Money
                  </div>
                  <div className="h-8 w-24 bg-muted rounded flex items-center justify-center text-xs font-medium">
                    Latitude
                  </div>
                  <div className="h-8 w-24 bg-muted rounded flex items-center justify-center text-xs font-medium">
                    Macquarie
                  </div>
                </div>
              </div>
            </div>

            {/* Calculator */}
            <div>
              <FinanceCalculator defaultPrice={120000} />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 mb-4">
                <HelpCircle className="w-6 h-6 text-accent" />
              </div>
              <h2 className="font-heading text-3xl font-bold text-foreground">
                Frequently Asked Questions
              </h2>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="bg-card rounded-xl border border-border px-6"
                >
                  <AccordionTrigger className="text-left font-medium hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </>
  );
}
