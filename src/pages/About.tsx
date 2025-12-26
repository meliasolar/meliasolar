import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingContactButtons from "@/components/FloatingContactButtons";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Award, Heart, Users } from "lucide-react";
import meliaImage from "@/assets/melia-king.png";

const AboutPage = () => {
  const benefits = [
    "Personalized energy consultation",
    "Transparent pricing with no hidden fees",
    "Quality equipment from trusted manufacturers",
    "Expert installation by certified professionals",
    "Ongoing support and maintenance",
    "Financing options available",
  ];

  return (
    <>
      <Helmet>
        <title>About Melia King | Your Concierge Energy Advisor</title>
        <meta
          name="description"
          content="Meet Melia King, your personal solar energy advisor helping families and businesses across 12 states take control of their energy costs."
        />
        <link rel="canonical" href="https://meliasolar.com/about" />
      </Helmet>

      <Header />

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-b from-secondary to-background">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
              {/* Image */}
              <div className="relative">
                <div className="aspect-[4/5] rounded-2xl bg-background overflow-hidden shadow-medium">
                  <img
                    src={meliaImage}
                    alt="Melia King - Solar Energy Advisor"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-2xl bg-accent/20 -z-10" />
              </div>

              {/* Content */}
              <div className="space-y-8">
                <div>
                  <span className="text-accent font-semibold text-sm uppercase tracking-widest">
                    Your Energy Advisor
                  </span>
                  <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4">
                    Meet Melia King
                  </h1>
                </div>

                <p className="text-muted-foreground text-lg leading-relaxed">
                  Melia King is passionate about helping families & businesses take control of their energy costs. Her mission is to make clean, renewable energy accessible to every business & homeowner in 12 states…& counting.
                </p>

                <div className="grid sm:grid-cols-3 gap-6 pt-4">
                  <div className="flex flex-col items-center sm:items-start gap-3 p-4 rounded-xl bg-card shadow-soft">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                      <Users className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <div className="font-display text-2xl font-bold text-foreground">5,000+</div>
                      <div className="text-sm text-muted-foreground">Families Helped</div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center sm:items-start gap-3 p-4 rounded-xl bg-card shadow-soft">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                      <Award className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <div className="font-display text-2xl font-bold text-foreground">10+</div>
                      <div className="text-sm text-muted-foreground">Years Experience</div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center sm:items-start gap-3 p-4 rounded-xl bg-card shadow-soft">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                      <Heart className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <div className="font-display text-2xl font-bold text-foreground">99%</div>
                      <div className="text-sm text-muted-foreground">Happy Clients</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Content */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <div>
                <span className="text-accent font-semibold text-sm uppercase tracking-widest">
                  About Us
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-4">
                  Building A <span className="text-primary">Brighter Future</span>, One Home At A Time
                </h2>
              </div>

              <p className="text-muted-foreground text-lg leading-relaxed">
                We walk alongside you through every step — from your first questions about solar to the day your system goes live. No high-pressure sales tactics, just straightforward advice customized to your home and budget.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-6 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
              Contact Melia today for a free consultation and discover how much you can save with solar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-accent text-foreground hover:bg-accent/90"
                asChild
              >
                <a href="tel:+13103469466">Call +1 (310) 346-9466</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground bg-transparent hover:bg-primary-foreground/10"
                asChild
              >
                <a href="mailto:Melia@solarkingsolutions.com">Email Us</a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingContactButtons />
    </>
  );
};

export default AboutPage;
