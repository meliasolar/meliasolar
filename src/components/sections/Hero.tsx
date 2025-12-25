import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import heroImage from "@/assets/hero-solar.webp";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Solar panels on California home"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-2xl space-y-8">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-medium text-foreground">
              Trusted Expert in 12 States
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            Your Personal
            <span className="block">
              <span className="text-gradient-solar">Solar</span> King
            </span>
          </h1>

          {/* Subheadline - LCP element, no animation for immediate render */}
          <p
            className="text-lg md:text-xl text-foreground font-semibold max-w-lg leading-relaxed"
          >
            We make solar possible for homeowners &amp; businesses by keeping the cost less than or equal to your existing energy bill. Your cost does not go up! Our equipment is the highest quality &amp; our team is the highest caliber. You can count on Melia.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-4 animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
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
              Get Free Quote
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-3 gap-8 pt-8 border-t border-border/50 animate-fade-up"
            style={{ animationDelay: "0.5s" }}
          >
            {[
              { value: "12K+", label: "Installations" },
              { value: "99%", label: "Satisfaction" },
              { value: "10+", label: "Years Experience" },
            ].map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <div className="font-display text-3xl md:text-4xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;
