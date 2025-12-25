import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import heroImage from "@/assets/hero-coastal.jpg";

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
      <div className="relative container mx-auto px-6 pt-20 pb-12">
        <div className="max-w-2xl space-y-6">

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
          <div className="bg-purple-100/30 border border-purple-300/60 px-3 py-2 rounded-lg backdrop-blur-sm w-fit">
            <div
              className="text-lg md:text-xl text-foreground font-semibold max-w-lg leading-relaxed space-y-3"
            >
              <p>Melia keeps the cost of solar less than or equal to the existing energy bill - for businesses &amp; for homeowners.</p>
              <p className="font-bold">Locked in savings. No up front cost.</p>
              <p className="font-bold">Backup power when you need it most!</p>
            </div>
          </div>

          {/* CTAs with Trusted Expert badge */}
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-fade-up"
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
            <div className="inline-flex items-center gap-2 h-12 px-4 rounded-full bg-secondary border border-border">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm font-medium text-foreground">
                Trusted Expert in 12 States
              </span>
            </div>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-3 gap-8 pt-8 pb-4 md:pb-0 border-t border-border/50 bg-white md:bg-transparent -mx-6 px-6 animate-fade-up"
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
