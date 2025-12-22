import { CheckCircle2, Award, Heart, Users } from "lucide-react";
import meliaImage from "@/assets/melia-king.png";

const About = () => {
  const benefits = [
    "Personalized energy consultation",
    "Transparent pricing with no hidden fees",
    "Quality equipment from trusted manufacturers",
    "Expert installation by certified professionals",
    "Ongoing support and maintenance",
    "Financing options available",
  ];

  return (
    <section id="about" className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        {/* Meet Melia Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto mb-24">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl bg-background overflow-hidden">
              <img
                src={meliaImage}
                alt="Melia King - Solar Energy Advisor"
                className="w-full h-full object-cover object-top"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-2xl bg-accent/20 -z-10" />
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div>
              <span className="text-accent font-semibold text-sm uppercase tracking-widest">
                Your Energy Advisor
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4">
                Meet <span className="text-accent">Melia</span> King
              </h2>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed">
              Melia King is passionate about helping families &amp; businesses take control of their energy costs. Her mission is to make clean, renewable energy accessible to every business &amp; homeowner in 13 states…&amp; counting.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 pt-4">
              <div className="flex flex-col items-center sm:items-start gap-3 p-4 rounded-xl bg-background">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="font-display text-2xl font-bold text-foreground">5,000+</div>
                  <div className="text-sm text-muted-foreground">Families Helped</div>
                </div>
              </div>

              <div className="flex flex-col items-center sm:items-start gap-3 p-4 rounded-xl bg-background">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <Award className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="font-display text-2xl font-bold text-foreground">10+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
              </div>

              <div className="flex flex-col items-center sm:items-start gap-3 p-4 rounded-xl bg-background">
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

        {/* About Content */}
        <div className="max-w-3xl mx-auto">
          {/* Content */}
          <div className="space-y-8">
            <div className="text-center">
              <span className="text-accent font-semibold text-sm uppercase tracking-widest">
                About Us
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4">
                Building a brighter future, one home at a time.
              </h2>
            </div>

            <p className="text-muted-foreground leading-relaxed text-center">
              We walk alongside you through every step — from your first questions about solar to the day your system goes live. No high-pressure sales tactics, just straightforward advice customized to your home and budget.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-foreground text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
