import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground">
            Ready to Own Your Energy Future?
          </h2>
          <p className="text-primary-foreground/80 text-lg leading-relaxed">
            Take the first step toward energy independence. Get a free, no-obligation
            consultation and discover how much you could save with solar.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="solar"
              size="xl"
              className="shadow-glow"
            >
              Get Free Quote
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              variant="heroOutline"
              size="xl"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Phone className="w-5 h-5" />
              (877) 646-8658
            </Button>
          </div>

          <p className="text-primary-foreground/60 text-sm">
            No obligation • Free assessment • Expert advice
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
