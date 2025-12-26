import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, DollarSign, Leaf, TrendingDown } from "lucide-react";

const SavingsCalculator = () => {
  const [monthlyBill, setMonthlyBill] = useState([200]);

  const currentBill = monthlyBill[0];
  const yearlyCost = currentBill * 12;
  const yearlyWithSolar = currentBill * 12; // Same cost with solar
  const savings25Years = yearlyCost * 25 * 0.4; // 40% savings over 25 years due to rate increases
  const treesEquivalent = Math.round((currentBill * 12 * 0.4) / 50); // Rough CO2 offset calculation

  return (
    <section id="calculator" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-accent/20 text-accent text-sm font-medium mb-4">
            Savings Calculator
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            See How Much You Can <span className="text-gradient-solar">Save</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Your solar payment will be equal to or less than your current bill—but protects you from rising energy costs for 25+ years.
          </p>
          <p className="text-sm text-muted-foreground italic mt-3">
            Savings may be higher than this calculator shows, depending on your unique specifications.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="p-8 md:p-12 bg-card border-border shadow-elegant">
            {/* Slider Section */}
            <div className="mb-12">
              <label className="block text-lg font-medium text-foreground mb-2">
                What's your current monthly electric bill?
              </label>
              <p className="text-muted-foreground text-sm mb-6">
                Drag the slider to match your average monthly bill
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <span className="font-display text-5xl md:text-6xl font-bold text-gradient-solar">
                    ${currentBill}
                  </span>
                  <span className="text-muted-foreground ml-2">/month</span>
                </div>
                
                <div className="px-4">
                <Slider
                    value={monthlyBill}
                    onValueChange={setMonthlyBill}
                    min={100}
                    max={20000}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>$100</span>
                    <span>$20,000</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div className="bg-primary/5 rounded-2xl p-6 text-center border border-primary/10">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground mb-2">Your Cost With Solar</p>
                <p className="font-display text-3xl font-bold text-foreground">
                  ${currentBill}<span className="text-lg font-normal">/mo</span>
                </p>
                <p className="text-xs text-accent mt-2 font-medium">Same as your current bill!</p>
              </div>

              <div className="bg-accent/10 rounded-2xl p-6 text-center border border-accent/20">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                  <TrendingDown className="w-6 h-6 text-accent" />
                </div>
                <p className="text-sm text-muted-foreground mb-2">25-Year Savings*</p>
                <p className="font-display text-3xl font-bold text-accent">
                  ${savings25Years.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground mt-2">*vs. rising utility rates</p>
              </div>

              <div className="bg-green-500/10 rounded-2xl p-6 text-center border border-green-500/20">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <Leaf className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-sm text-muted-foreground mb-2">Environmental Impact</p>
                <p className="font-display text-3xl font-bold text-green-600">
                  {treesEquivalent}
                </p>
                <p className="text-xs text-muted-foreground mt-2">Trees planted equivalent/yr</p>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center pt-6 border-t border-border">
              <p className="text-muted-foreground mb-4">
                Ready to lock in your rate and start saving?
              </p>
              <Button
                variant="solar"
                size="xl"
                onClick={() => {
                  const element = document.getElementById("contact");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Get Your Free Quote
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SavingsCalculator;
