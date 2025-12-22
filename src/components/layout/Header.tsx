import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Sun, ChevronDown } from "lucide-react";

const serviceLinks = [
  { name: "Solar Panel Installation", href: "/services", hash: "#solar" },
  { name: "Tesla Superchargers", href: "/services", hash: "#tesla" },
  { name: "HVAC Systems", href: "/services", hash: "#hvac" },
  { name: "Title 24 Roofing", href: "/services", hash: "#roofing" },
  { name: "QuietCool Fans", href: "/services", hash: "#quietcool" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleServiceClick = (href: string, hash: string) => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== href) {
      navigate(href);
      setTimeout(() => {
        const element = document.getElementById(hash.replace("#", ""));
        element?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const element = document.getElementById(hash.replace("#", ""));
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-soft"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-between h-20">
          {/* Logo - Scroll to Top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-solar flex items-center justify-center transition-transform group-hover:scale-110">
              <Sun className="w-6 h-6 text-foreground" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-display text-xl font-semibold text-foreground">
                Melia King
              </span>
              <span className="text-xs text-muted-foreground tracking-widest uppercase">
                Solar
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("about")}
              className="text-foreground/80 hover:text-foreground font-medium transition-colors relative group"
            >
              Meet Melia
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
            </button>

            {/* Services Dropdown */}
            <div className="relative group">
              <Link
                to="/services"
                className={`font-medium transition-colors relative flex items-center gap-1 ${
                  location.pathname === "/services" || location.pathname === "/tesla-supercharger"
                    ? "text-accent"
                    : "text-foreground/80 hover:text-foreground"
                }`}
              >
                Services
                <ChevronDown className="w-4 h-4" />
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 ${
                  location.pathname === "/services" || location.pathname === "/tesla-supercharger"
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`} />
              </Link>
              <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-background border border-border rounded-lg shadow-lg py-2 min-w-[220px]">
                  {serviceLinks.map((service) => (
                    <button
                      key={service.name}
                      onClick={() => handleServiceClick(service.href, service.hash)}
                      className="block w-full text-left px-4 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-muted transition-colors"
                    >
                      {service.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => scrollToSection("calculator")}
              className="text-foreground/80 hover:text-foreground font-medium transition-colors relative group"
            >
              Savings Calculator
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
            </button>

            <Link
              to="/testimonials"
              className={`font-medium transition-colors relative group ${
                location.pathname === "/testimonials"
                  ? "text-accent"
                  : "text-foreground/80 hover:text-foreground"
              }`}
            >
              Testimonials
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 ${
                location.pathname === "/testimonials" ? "w-full" : "w-0 group-hover:w-full"
              }`} />
            </Link>

            <Link
              to="/faq"
              className={`font-medium transition-colors relative group ${
                location.pathname === "/faq"
                  ? "text-accent"
                  : "text-foreground/80 hover:text-foreground"
              }`}
            >
              FAQ
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 ${
                location.pathname === "/faq" ? "w-full" : "w-0 group-hover:w-full"
              }`} />
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button variant="solar" size="lg" asChild>
              <a href="tel:+13103469466">Call Now</a>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 right-0 bg-background border-b border-border animate-fade-in z-50">
            <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
              <button
                onClick={() => scrollToSection("about")}
                className="text-left text-foreground/80 hover:text-foreground font-medium py-2 transition-colors"
              >
                Meet Melia
              </button>

              {/* Services Accordion in Mobile */}
              <div>
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="flex items-center justify-between w-full text-foreground/80 hover:text-foreground font-medium py-2 transition-colors"
                >
                  Services
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isServicesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isServicesOpen && (
                  <div className="pl-4 flex flex-col gap-2 mt-2">
                    {serviceLinks.map((service) => (
                      <button
                        key={service.name}
                        onClick={() => handleServiceClick(service.href, service.hash)}
                        className="text-left text-foreground/60 hover:text-foreground text-sm py-1.5 transition-colors"
                      >
                        {service.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => scrollToSection("calculator")}
                className="text-left text-foreground/80 hover:text-foreground font-medium py-2 transition-colors"
              >
                Savings Calculator
              </button>

              <Link
                to="/testimonials"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-medium py-2 transition-colors ${
                  location.pathname === "/testimonials"
                    ? "text-accent"
                    : "text-foreground/80 hover:text-foreground"
                }`}
              >
                Testimonials
              </Link>

              <Link
                to="/faq"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-medium py-2 transition-colors ${
                  location.pathname === "/faq"
                    ? "text-accent"
                    : "text-foreground/80 hover:text-foreground"
                }`}
              >
                FAQ
              </Link>

              <Button variant="solar" size="lg" className="mt-2" asChild>
                <a href="tel:+13103469466">Call Now</a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;