import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import solarImage from "@/assets/solar-service.jpg";
import hvacImage from "@/assets/hvac-service.jpg";
import roofingImage from "@/assets/roofing-service.jpg";
import quietcoolImage from "@/assets/quietcool-service.jpg";

const Services = () => {
  const services = [
    {
      title: "Solar Panel Installation",
      description:
        "Solar power is the cornerstone of our offerings — a renewable and green source of energy that allows homeowners to be less dependent on traditional electricity sources. Solar systems are becoming more efficient and cost-effective every day! Invest in a solar system to ensure your home is equipped to stay ahead of the changing energy landscape.",
      image: solarImage,
      features: [
        "Custom system design",
        "Premium tier-1 panels",
        "25-year warranty",
        "Battery storage options",
      ],
    },
    {
      title: "HVAC System Installation",
      description:
        "Modern, energy-efficient heating and cooling solutions for your home. Our HVAC systems work seamlessly with your solar installation to maximize energy savings and maintain optimal comfort year-round.",
      image: hvacImage,
      features: [
        "Energy Star certified",
        "Smart thermostat integration",
        "Improved air quality",
        "Reduced energy bills",
      ],
    },
    {
      title: "Title 24 Roofing",
      description:
        "California Title 24 compliant cool roof installations that meet state energy efficiency requirements while protecting your home. Our roofing solutions are designed to reduce heat absorption and lower cooling costs.",
      image: roofingImage,
      features: [
        "Code compliant",
        "Cool roof technology",
        "Extended roof lifespan",
        "Solar-ready installation",
      ],
    },
    {
      title: "QuietCool Whole House Fan",
      description:
        "The QuietCool whole house fan system provides an affordable and energy-efficient way to cool your home. Drawing in cool outside air while exhausting hot air from your attic, it can reduce AC usage by up to 90%.",
      image: quietcoolImage,
      features: [
        "90% AC reduction",
        "Whisper quiet operation",
        "Rapid installation",
        "10-year warranty",
      ],
    },
  ];

  return (
    <section id="services" className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">
            Our Services
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4">
            Renewable Energy Solutions For Your Whole Home
          </h2>
          <p className="text-muted-foreground text-lg mt-6">
            Modern, whole home solutions for energy independence. Making the
            switch to renewable energy has never been simpler.
          </p>
        </div>

        {/* Services Grid */}
        <div className="space-y-24">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <div
                className={`relative rounded-2xl overflow-hidden shadow-medium ${
                  index % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-80 lg:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
              </div>

              {/* Content */}
              <div
                className={`space-y-6 ${index % 2 === 1 ? "lg:order-1" : ""}`}
              >
                <h3 className="font-display text-3xl font-bold text-foreground">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>

                <div className="grid sm:grid-cols-2 gap-3">
                  {service.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2 text-foreground"
                    >
                      <div className="w-2 h-2 rounded-full bg-accent" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button variant="solar" size="lg">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
