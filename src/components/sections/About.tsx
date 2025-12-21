import { CheckCircle2 } from "lucide-react";

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
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <span className="text-accent font-semibold text-sm uppercase tracking-widest">
                About Us
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4">
                Building a brighter future, one home at a time.
              </h2>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed">
              At Melia King Solar, we&apos;re passionate about helping families take control of their energy costs. Our mission is to make clean, renewable energy accessible to every homeowner in Southern California.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              We walk alongside you through every step — from your first questions about solar to the day your system goes live. No high-pressure sales tactics, just straightforward advice customized to your home and budget.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-foreground text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-6">
            {[
              {
                value: "5,000+",
                label: "Installations Completed",
                description: "Homes powered by clean energy",
              },
              {
                value: "99%",
                label: "Positive Feedback",
                description: "From satisfied customers",
              },
              {
                value: "10+",
                label: "Years Experience",
                description: "In renewable energy",
              },
              {
                value: "$50K+",
                label: "Average Savings",
                description: "Over system lifetime",
              },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className={`bg-card rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 ${
                  index % 2 === 1 ? "mt-8" : ""
                }`}
              >
                <div className="font-display text-3xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="font-semibold text-foreground mt-2">
                  {stat.label}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
