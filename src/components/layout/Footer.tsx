import { Link, useNavigate, useLocation } from "react-router-dom";
import { Sun, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== "/") {
      navigate(`/#${sectionId}`);
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
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
            </Link>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              We make solar possible for homeowners &amp; businesses by keeping the cost equal to your existing energy bill. Your cost does not go up! Our equipment is the highest quality &amp; our team is the highest caliber. You can count on Melia.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                >
                  Meet Melia
                </button>
              </li>
              <li>
                <Link
                  to="/services"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className={`transition-colors text-sm ${
                    location.pathname === "/services"
                      ? "text-accent"
                      : "text-primary-foreground/80 hover:text-primary-foreground"
                  }`}
                >
                  Services
                </Link>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("calculator")}
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                >
                  Savings Calculator
                </button>
              </li>
              <li>
                <Link
                  to="/testimonials"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className={`transition-colors text-sm ${
                    location.pathname === "/testimonials"
                      ? "text-accent"
                      : "text-primary-foreground/80 hover:text-primary-foreground"
                  }`}
                >
                  Testimonials
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className={`transition-colors text-sm ${
                    location.pathname === "/faq"
                      ? "text-accent"
                      : "text-primary-foreground/80 hover:text-primary-foreground"
                  }`}
                >
                  FAQ
                </Link>
              </li>
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
                <a href="tel:+13103469466" className="hover:text-primary-foreground transition-colors">+1 (310) 346-9466</a>
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/80 text-sm">
                <Mail className="w-4 h-4" />
                <a href="mailto:melia@voltaicnow.com" className="hover:text-primary-foreground transition-colors">melia@voltaicnow.com</a>
              </li>
              <li className="flex items-start gap-3 text-primary-foreground/80 text-sm">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>California, Arizona, Texas & 10 more states</span>
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