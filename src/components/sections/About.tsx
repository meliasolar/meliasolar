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
                We&apos;re here to rise above to form a new way.
              </h2>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed">
              We believe that we can provide decades of positive impact by
              providing our customers a solid understanding of the valuable
              nature of renewable energy and where applicable, aid them with
              adopting it.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              As your concierge energy advisor, we guide you through every step
              of the process — from initial consultation to final installation.
              No pressure, no gimmicks, just honest advice tailored to your
              home&apos;s unique needs.
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
