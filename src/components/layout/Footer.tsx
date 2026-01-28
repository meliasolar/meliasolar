import { Link, useLocation } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  const location = useLocation();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src={logo} 
                alt="Melia King Solar" 
                className="w-10 h-10 rounded-lg"
              />
              <div className="flex flex-col">
                <span className="font-display text-xl font-semibold">
                  Melia King
                </span>
                <span className="text-xs text-primary-foreground tracking-widest uppercase">
                  Solar
                </span>
              </div>
            </Link>
            <div className="text-primary-foreground text-sm leading-relaxed space-y-2">
              <p>Melia makes solar possible for businesses &amp; homeowners by keeping the cost less than or equal to their existing energy bill.</p>
              <p>Your cost does not go up!</p>
              <p>Our equipment is the highest quality &amp; our team is the highest caliber. You can count on Melia.</p>
            </div>
          </div>

          {/* Navigation - hidden on mobile */}
          <div className="hidden md:block">
            <h3 className="font-display text-lg font-semibold mb-4">
              Explore
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/meetmelia"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className={`transition-colors text-sm ${
                    location.pathname === "/meetmelia" || location.pathname === "/about"
                      ? "text-accent"
                      : "text-primary-foreground/80 hover:text-primary-foreground"
                  }`}
                >
                  Meet Melia
                </Link>
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
                <Link
                  to="/savingscalculator"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className={`transition-colors text-sm ${
                    location.pathname === "/savingscalculator"
                      ? "text-accent"
                      : "text-primary-foreground/80 hover:text-primary-foreground"
                  }`}
                >
                  Savings Calculator
                </Link>
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
                  to="/projects"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className={`transition-colors text-sm ${
                    location.pathname === "/projects"
                      ? "text-accent"
                      : "text-primary-foreground/80 hover:text-primary-foreground"
                  }`}
                >
                  Projects
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
              <li>
                <Link
                  to="/news"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className={`transition-colors text-sm ${
                    location.pathname === "/news"
                      ? "text-accent"
                      : "text-primary-foreground/80 hover:text-primary-foreground"
                  }`}
                >
                  News
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">
              Get In Touch
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-primary-foreground/80 text-sm">
                <Phone className="w-4 h-4" />
                <a href="tel:+13103469466" className="hover:text-primary-foreground transition-colors">+1 (310) 346-9466</a>
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/80 text-sm">
                <Mail className="w-4 h-4" />
                <a href="mailto:meliaking@voltaicnow.com" className="hover:text-primary-foreground transition-colors">meliaking@voltaicnow.com</a>
              </li>
              <li className="flex items-start gap-3 text-primary-foreground/80 text-sm">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>Serving CA, TX, CO, NV, FL, HI, IL, MA, MD, NJ, VA, CT</span>
              </li>
            </ul>
            <div className="flex items-center gap-4 mt-6">
              <a 
                href="https://www.facebook.com/melia.king" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground/80 hover:bg-primary-foreground/20 hover:text-primary-foreground transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/solarwithmelia/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground/80 hover:bg-primary-foreground/20 hover:text-primary-foreground transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center">
          <p className="text-primary-foreground/80 text-sm">
            © {new Date().getFullYear()} Melia King Solar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;