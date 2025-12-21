import { Sun, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                <Sun className="w-6 h-6 text-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xl font-semibold">
                  Melia King
                </span>
                <span className="text-xs text-primary-foreground/70 tracking-widest uppercase">
                  Solar
                </span>
              </div>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Your trusted partner for renewable energy solutions. We help
              homeowners achieve energy independence with quality installations
              and exceptional service.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {["Home", "About", "Why Solar", "Services", "Testimonials"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href={`/#${link.toLowerCase().replace(" ", "-")}`}
                      className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">
              Our Services
            </h4>
            <ul className="space-y-3">
              {[
                "Solar Panel Installation",
                "HVAC Systems",
                "Title 24 Roofing",
                "QuietCool Whole House Fan",
              ].map((service) => (
                <li key={service}>
                  <a
                    href="/#services"
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">
              Get In Touch
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-primary-foreground/80 text-sm">
                <Phone className="w-4 h-4" />
                <span>(877) 646-8658</span>
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/80 text-sm">
                <Mail className="w-4 h-4" />
                <span>info@meliasolar.com</span>
              </li>
              <li className="flex items-start gap-3 text-primary-foreground/80 text-sm">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>Southern California</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center">
          <p className="text-primary-foreground/60 text-sm">
            © {new Date().getFullYear()} Melia King Solar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
