import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingContactButtons from "@/components/FloatingContactButtons";
import { Button } from "@/components/ui/button";
import { CheckCircle2, DollarSign, Zap, Users, TrendingUp, Shield } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import teslaImage from "@/assets/tesla-supercharger-service.jpg";

const TeslaSupercharger = () => {
  const benefits = [
    {
      icon: DollarSign,
      title: "Lifetime Passive Income",
      description: "Collect revenue from every single charge at your location, forever.",
    },
    {
      icon: Users,
      title: "Attract More Customers",
      description: "EV drivers actively seek out businesses with charging stations.",
    },
    {
      icon: TrendingUp,
      title: "Increase Property Value",
      description: "EV infrastructure adds significant value to commercial properties.",
    },
    {
      icon: Zap,
      title: "Fast Charging Technology",
      description: "Tesla Superchargers provide the fastest charging speeds available.",
    },
    {
      icon: Shield,
      title: "Certified Installation",
      description: "Melia is a certified Tesla Supercharger installer with expert technicians.",
    },
    {
      icon: CheckCircle2,
      title: "Full Support",
      description: "We handle everything from permits to installation to ongoing maintenance.",
    },
  ];

  const features = [
    "Revenue from every charge session",
    "Professional certified installation",
    "Attract EV-driving customers",
    "Increase foot traffic to your business",
    "Future-proof your property",
    "Join the growing EV network",
  ];

  return (
    <>
      <Helmet>
        <title>Tesla Superchargers Pay You | Melia King Solar</title>
        <meta
          name="description"
          content="Tesla Superchargers Pay You. Add Tesla Superchargers to your business parking lot and collect income from every single charge, for lifetime."
        />
        <meta
          name="keywords"
          content="Tesla Supercharger, EV charging, electric vehicle, commercial charging station, passive income, certified installer"
        />
        <link rel="canonical" href="https://meliasolar.com/supercharger" />
        <meta property="og:title" content="Tesla Superchargers Pay You | Melia King Solar" />
        <meta property="og:description" content="Add Tesla Superchargers to your business parking lot and collect income from every single charge, for lifetime." />
        <meta property="og:image" content="https://meliasolar.com/melia-og-image.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://meliasolar.com/supercharger" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://meliasolar.com/melia-og-image.png" />
      </Helmet>

      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-secondary to-background">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div>
                  <span className="inline-block bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-4">
                    Certified Tesla Installer
                  </span>
                  <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                    Tesla Superchargers <span className="text-accent">Pay You</span>
                  </h1>
                </div>
                
                <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                  Add Tesla Superchargers to your business parking lot and collect income from every single charge, for lifetime. Turn your parking spaces into a revenue stream while supporting the EV revolution.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="solar"
                    size="lg"
                    onClick={() => {
                      const element = document.getElementById("contact-form");
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    Get Started Today
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    asChild
                  >
                    <a href="tel:+13103469466">Call +1 (310) 346-9466</a>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <img
                  src={teslaImage}
                  alt="Tesla Supercharger station"
                  className="w-full rounded-2xl shadow-medium"
                />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-2xl bg-accent/20 -z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Why Add Tesla Superchargers to Your Business?
              </h2>
              <p className="text-muted-foreground text-lg mt-4">
                Join the EV charging network and turn your parking lot into a profit center.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-secondary">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                  What You Get With Melia
                </h2>
                <p className="text-muted-foreground text-lg">
                  As a certified Tesla Supercharger installer, we handle everything from start to finish so you can focus on running your business.
                </p>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  {features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  variant="solar"
                  size="lg"
                  onClick={() => {
                    const element = document.getElementById("contact-form");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  Request a Consultation
                </Button>
              </div>

              <div className="bg-card rounded-2xl p-8 shadow-medium">
                <h3 className="font-display text-2xl font-bold text-foreground mb-6">
                  Perfect For
                </h3>
                <ul className="space-y-4">
                  {[
                    "Shopping centers & retail stores",
                    "Hotels & hospitality venues",
                    "Office buildings & business parks",
                    "Restaurants & entertainment venues",
                    "Apartment complexes & condos",
                    "Gas stations & convenience stores",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                  Frequently Asked Questions
                </h2>
                <p className="text-muted-foreground text-lg mt-4">
                  Everything you need to know about adding Tesla Superchargers to your business.
                </p>
              </div>

              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="item-1" className="bg-card rounded-xl px-6 border-none shadow-soft">
                  <AccordionTrigger className="text-foreground font-semibold text-left hover:no-underline">
                    How much does it cost to install Tesla Superchargers?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    The cost varies based on your location, electrical infrastructure, and the number of charging stations. We offer free consultations to assess your property and provide a detailed quote. Many businesses find that the installation pays for itself through charging revenue within a few years.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="bg-card rounded-xl px-6 border-none shadow-soft">
                  <AccordionTrigger className="text-foreground font-semibold text-left hover:no-underline">
                    How much can I earn from Tesla Superchargers?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Your earnings depend on location, traffic, and pricing. High-traffic locations like shopping centers and hotels can generate significant passive income. You collect revenue from every charging session for the lifetime of the equipment.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="bg-card rounded-xl px-6 border-none shadow-soft">
                  <AccordionTrigger className="text-foreground font-semibold text-left hover:no-underline">
                    What are the electrical requirements?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Tesla Superchargers require high-voltage electrical service. During our free consultation, we assess your current electrical capacity and determine if upgrades are needed. We handle all electrical work and permitting as part of our installation service.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="bg-card rounded-xl px-6 border-none shadow-soft">
                  <AccordionTrigger className="text-foreground font-semibold text-left hover:no-underline">
                    How long does installation take?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Installation typically takes 2-4 weeks depending on the scope of the project and permitting requirements. We work efficiently to minimize disruption to your business operations.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" className="bg-card rounded-xl px-6 border-none shadow-soft">
                  <AccordionTrigger className="text-foreground font-semibold text-left hover:no-underline">
                    Who handles maintenance and repairs?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    As a certified Tesla installer, we provide ongoing support and maintenance services. Tesla Superchargers are built for reliability, but if any issues arise, our team is here to help keep your chargers running smoothly.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6" className="bg-card rounded-xl px-6 border-none shadow-soft">
                  <AccordionTrigger className="text-foreground font-semibold text-left hover:no-underline">
                    Are there any incentives or tax credits available?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes! Federal and state incentives are often available for EV charging infrastructure. We can help you navigate available tax credits, rebates, and incentive programs to maximize your return on investment.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact-form" className="py-16 md:py-20 bg-primary/5">
          <div className="container mx-auto px-6 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Start Earning?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Contact us today for a free consultation and learn how Tesla Superchargers can generate passive income for your business.
            </p>
            <Button size="lg" className="rounded-full" asChild>
              <a href="tel:+18182029527">Get a Free Quote</a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingContactButtons />
    </>
  );
};

export default TeslaSupercharger;
