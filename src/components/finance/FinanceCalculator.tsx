"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator, Info } from "lucide-react";

interface FinanceCalculatorProps {
  defaultPrice?: number;
  showEnquiryButton?: boolean;
}

export function FinanceCalculator({ 
  defaultPrice = 100000, 
  showEnquiryButton = true 
}: FinanceCalculatorProps) {
  const [price, setPrice] = useState(defaultPrice);
  const [deposit, setDeposit] = useState(20000);
  const [term, setTerm] = useState(5);
  const [interestRate, setInterestRate] = useState(7.5);
  const [frequency, setFrequency] = useState<"weekly" | "fortnightly" | "monthly">("weekly");

  const loanAmount = price - deposit;
  const monthlyRate = interestRate / 100 / 12;
  const totalPayments = term * 12;
  
  const monthlyPayment = loanAmount * 
    (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
    (Math.pow(1 + monthlyRate, totalPayments) - 1);

  const getPaymentAmount = () => {
    switch (frequency) {
      case "weekly":
        return monthlyPayment * 12 / 52;
      case "fortnightly":
        return monthlyPayment * 12 / 26;
      case "monthly":
        return monthlyPayment;
    }
  };

  const paymentAmount = getPaymentAmount();
  const totalInterest = (monthlyPayment * totalPayments) - loanAmount;

  return (
    <div className="calculator-panel space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
          <Calculator className="w-6 h-6 text-accent" />
        </div>
        <div>
          <h3 className="font-heading text-xl font-semibold">Finance Calculator</h3>
          <p className="text-muted-foreground text-sm">Estimate your repayments</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Purchase Price */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <Label>Purchase Price</Label>
            <span className="font-semibold">${price.toLocaleString()}</span>
          </div>
          <Slider
            value={[price]}
            onValueChange={(v) => setPrice(v[0])}
            min={50000}
            max={250000}
            step={5000}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>$50,000</span>
            <span>$250,000</span>
          </div>
        </div>

        {/* Deposit */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <Label>Deposit</Label>
            <span className="font-semibold">${deposit.toLocaleString()}</span>
          </div>
          <Slider
            value={[deposit]}
            onValueChange={(v) => setDeposit(v[0])}
            min={0}
            max={price * 0.5}
            step={1000}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>$0</span>
            <span>${(price * 0.5).toLocaleString()}</span>
          </div>
        </div>

        {/* Loan Term */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <Label>Loan Term</Label>
            <span className="font-semibold">{term} years</span>
          </div>
          <Slider
            value={[term]}
            onValueChange={(v) => setTerm(v[0])}
            min={1}
            max={7}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1 year</span>
            <span>7 years</span>
          </div>
        </div>

        {/* Interest Rate */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <Label>Interest Rate (p.a.)</Label>
            <span className="font-semibold">{interestRate.toFixed(1)}%</span>
          </div>
          <Slider
            value={[interestRate]}
            onValueChange={(v) => setInterestRate(v[0])}
            min={4}
            max={15}
            step={0.1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>4%</span>
            <span>15%</span>
          </div>
        </div>

        {/* Payment Frequency */}
        <div className="space-y-3">
          <Label>Payment Frequency</Label>
          <div className="grid grid-cols-3 gap-2">
            {(["weekly", "fortnightly", "monthly"] as const).map((freq) => (
              <button
                key={freq}
                onClick={() => setFrequency(freq)}
                className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                  frequency === freq
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {freq.charAt(0).toUpperCase() + freq.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="bg-secondary/50 rounded-xl p-6 space-y-4">
        <div className="text-center">
          <p className="text-muted-foreground text-sm mb-1">
            Estimated {frequency} repayment
          </p>
          <p className="calculator-result">
            ${paymentAmount.toFixed(0)}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
          <div>
            <p className="text-muted-foreground text-xs">Loan Amount</p>
            <p className="font-semibold">${loanAmount.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Total Interest</p>
            <p className="font-semibold">${totalInterest.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="flex items-start gap-2 text-xs text-muted-foreground">
        <Info className="w-4 h-4 shrink-0 mt-0.5" />
        <p>
          This calculator provides estimates only and does not constitute a finance 
          offer. Actual rates and terms will vary based on your circumstances. 
          Contact us for a personalised quote.
        </p>
      </div>

      {showEnquiryButton && (
        <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
          Get a Finance Quote
        </Button>
      )}
    </div>
  );
}
