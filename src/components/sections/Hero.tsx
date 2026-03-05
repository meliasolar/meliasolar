import { Button } from "@/components/ui/button";
import { ArrowRight, PiggyBank, Zap } from "lucide-react";
import { useContactModal } from "@/contexts/ContactModalContext";

const Hero = () => {
  const { openContactModal } = useContactModal();
  return (
    <section className="relative flex flex-col overflow-hidden">
      {/* Hero content with background */}
      <div className="relative min-h-[auto] md:min-h-[75vh] lg:min-h-[70vh] flex items-center">
        {/* Background Image - only covers this area, not the stats */}
        <div className="absolute inset-0 md:block">
          <picture>
            <source
              media="(max-width: 640px)"
              srcSet="/images/hero-mobile.webp"
              type="image/webp"
            />
            <source
              media="(min-width: 641px)"
              srcSet="/images/hero-desktop.webp"
              type="image/webp"
            />
            <img
              src="/images/hero-desktop.webp"
              alt="Solar panels on California home"
              className="w-full h-full object-cover"
              width={1920}
              height={1080}
              fetchPriority="high"
              decoding="sync"
              style={{ contentVisibility: 'auto' }}
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/40 to-transparent md:from-background/75 md:via-background/50 md:to-transparent" />
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-6 pt-20 lg:pt-24 pb-8 lg:pb-6">
          <div className="max-w-2xl space-y-6">

            {/* Headline - no animation for immediate LCP */}
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
              Your Personal
              <span className="block">
                <span className="text-gradient-solar">Solar</span> King
              </span>
            </h1>

            {/* Subheadline - LCP element, no animation for immediate render */}
            <div className="bg-primary/10 border border-primary/30 px-3 py-2 rounded-lg backdrop-blur-sm w-fit">
              <div
                className="text-lg md:text-xl text-foreground font-semibold max-w-lg leading-relaxed space-y-3"
              >
                <p>Melia keeps the cost of solar less than or equal to the existing energy bill - for <span className="text-primary">businesses</span> &amp; for <span className="text-primary">homeowners</span>.</p>
                <p className="font-bold italic flex items-center gap-2">
                  <PiggyBank className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="relative">
                    <span className="text-accent">Locked in savings.</span>
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent animate-[scale-in_0.6s_ease-out_0.3s_both] origin-left" />
                  </span>
                  {" "}No up front cost.
                </p>
                <p className="font-extrabold flex items-start gap-2">
                  <Zap className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                  <span>
                    <span className="relative inline-block whitespace-nowrap">
                      <span className="font-black text-accent">Backup power</span>
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent animate-[scale-in_0.6s_ease-out_0.5s_both] origin-left" />
                    </span>
                    {" "}when you need it most!
                  </span>
                </p>
              </div>
            </div>

            {/* CTAs with Trusted Expert badge - no delay on mobile */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-fade-up md:[animation-delay:0.1s]">
              <Button
                variant="solar"
                size="xl"
                onClick={openContactModal}
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
          </div>
        </div>
      </div>

      {/* Stats - separate from hero background, renders immediately */}
      <div className="bg-background relative z-10">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl">
            <div className="grid grid-cols-3 gap-8 py-6 border-t border-border/50">
              {[
                { value: "9K+", label: "Installations", mobileLabel: "Installations" },
                { value: "99%", label: "Satisfaction", mobileLabel: "Satisfaction" },
                { value: "10+", label: "Years Experience", mobileLabel: "Years" },
              ].map((stat) => (
                <div key={stat.label} className="text-center sm:text-left">
                  <div className="font-display text-3xl md:text-4xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold text-foreground mt-1">
                    <span className="hidden sm:inline">{stat.label}</span>
                    <span className="sm:hidden">{stat.mobileLabel}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;
