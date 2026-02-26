import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Static paths for WebP images - served from public folder for proper caching
const hvacImage = "/images/services/hvac-service.webp";
const roofingImage = "/images/services/roofing-service.webp";
const quietcoolImage = "/images/services/quietcool-service.webp";
const teslaImage = "/images/services/tesla-supercharger-service.webp";

const Services = () => {
  const services = [
    {
      id: "services-solar",
      title: "Solar Panel & Backup Battery Installation",
      description:
        "Solar power is the cornerstone of our offerings — a renewable and green source of energy that allows homeowners to be less dependent on traditional electricity sources. Solar systems are becoming more efficient and cost-effective every day! Invest in a solar system to ensure your home is equipped to stay ahead of the changing energy landscape. Adding batteries provides storage for your solar production & back up power when you need it most.",
      image: null,
      features: [
        "Custom system design",
        "Premium tier-1 panels",
        "25-year warranty",
        "Battery storage options",
      ],
    },
    {
      id: "services-tesla",
      title: "Tesla Superchargers Pay You",
      description:
        "Melia is a certified Tesla Supercharger installer. Add Tesla Superchargers to your business parking lot and you get to collect income from every single charge, for lifetime. Turn your parking spaces into a revenue stream while supporting the EV revolution.",
      image: teslaImage,
      features: [
        "Certified Tesla installer",
        "Lifetime passive income",
        "Attract EV customers",
        "Professional installation",
      ],
    },
    {
      id: "services-hvac",
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
      id: "services-roofing",
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
      id: "services-quietcool",
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
              id={service.id}
              className={`grid lg:grid-cols-2 gap-12 items-center scroll-mt-24 ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              {service.image && (
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
              )}

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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
