import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingContactButtons from "@/components/FloatingContactButtons";
import PortfolioCarousel from "@/components/sections/PortfolioCarousel";
import { Button } from "@/components/ui/button";
import ServiceSchema from "@/components/seo/ServiceSchema";

// Static paths for WebP images - served from public folder for proper caching
const hvacImage = "/images/services/hvac-service.webp";
const roofingImage = "/images/services/roofing-service.webp";
const quietcoolImage = "/images/services/quietcool-service.webp";
const teslaImage = "/images/services/tesla-supercharger-service.webp";
const solarAerialImage = "/images/services/solar-aerial.webp";
const teslaBatteryImage = "/images/services/tesla-battery-wall.webp";

const ServicesPage = () => {
  const services = [
    {
      id: "solar",
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
      id: "tesla",
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
      link: "/supercharger",
    },
    {
      id: "hvac",
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
      id: "roofing",
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
      id: "quietcool",
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
    <>
      <Helmet>
        <title>Our Services | Melia King Solar</title>
        <meta
          name="description"
          content="Renewable Energy Solutions For Your Whole Home. Modern, whole home solutions for energy independence."
        />
        <link rel="canonical" href="https://meliasolar.com/services" />
        <meta property="og:title" content="Renewable Energy Solutions | Melia King Solar" />
        <meta property="og:description" content="Renewable Energy Solutions For Your Whole Home. Modern, whole home solutions for energy independence." />
        <meta property="og:image" content="https://meliasolar.com/melia-og-share.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://meliasolar.com/services" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Renewable Energy Solutions | Melia King Solar" />
        <meta name="twitter:description" content="Modern, whole home solutions for energy independence." />
        <meta name="twitter:image" content="https://meliasolar.com/melia-og-share.png" />
      </Helmet>
      <ServiceSchema
        serviceName="Solar Panel Installation & Energy Solutions"
        description="Expert solar panel installation, HVAC, Title 24 roofing, and QuietCool whole house fans. Modern, whole home solutions for energy independence."
        url="https://meliasolar.com/services"
      />

      <Header />

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-b from-secondary to-background">
          <div className="container mx-auto px-6 text-center">
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">
              Our Services
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4">
              Renewable Energy <span className="text-primary">Solutions</span> For Your Whole Home
            </h1>
            <p className="text-muted-foreground text-lg mt-6 max-w-2xl mx-auto lg:mb-0 mb-4">
              Modern, whole home solutions for energy independence. Making the switch to renewable energy has never been simpler.
            </p>
          </div>
        </section>

        {/* Services List */}
        <section className="py-6 md:py-8 bg-background">
          <div className="container mx-auto px-6">
            {/* Solar Hero Images */}
            <div id="solar" className="scroll-mt-24 grid md:grid-cols-2 gap-6 mb-12">
              <div className="relative rounded-2xl overflow-hidden shadow-medium">
                <img
                  src={solarAerialImage}
                  alt="Aerial view of solar panel installation on residential home"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-72 md:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-medium">
                <img
                  src={teslaBatteryImage}
                  alt="Tesla backup battery wall installation"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-72 md:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
              </div>
            </div>

            <div className="space-y-24">
              {services.map((service, index) => (
                <div
                  key={service.id}
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
                        loading="lazy"
                        decoding="async"
                        className="w-full h-80 lg:h-96 object-cover object-left"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
                    </div>
                  )}

                  {/* Content */}
                  <div
                    className={`space-y-6 ${index % 2 === 1 ? "lg:order-1" : ""}`}
                  >
                    <h2 className="font-display text-3xl font-bold text-foreground">
                      {service.title}
                    </h2>
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

                    {service.link && (
                      <Button variant="solar" asChild>
                        <Link to={service.link}>Learn More</Link>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Carousel */}
        <PortfolioCarousel />

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-primary/5">
          <div className="container mx-auto px-6 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Contact us today for a free consultation and discover the perfect energy solution for your home or business.
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

export default ServicesPage;
