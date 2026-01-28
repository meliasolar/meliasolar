import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Instagram } from "lucide-react";
import { useContactModal } from "@/contexts/ContactModalContext";

const serviceLinks = [
  { name: "Solar Panel Installation", href: "/solar" },
  { name: "Tesla Superchargers", href: "/supercharger" },
  { name: "HVAC Systems", href: "/hvac" },
  { name: "Title 24 Roofing", href: "/title24" },
  { name: "QuietCool Fans", href: "/fans" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { openContactModal } = useContactModal();

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

  const handleServiceClick = (href: string) => {
    setIsMobileMenuOpen(false);
    navigate(href);
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
          {/* Logo - Navigate to Home & Scroll to Top */}
          <button
            onClick={() => {
              if (location.pathname !== "/") {
                navigate("/");
                setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
              } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <img 
              src="/images/logo.webp" 
              alt="Melia King Solar" 
              className="w-10 h-10 rounded-lg transition-transform group-hover:scale-110"
              width={40}
              height={40}
              loading="eager"
              decoding="async"
            />
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
            <Link
              to="/meetmelia"
              className={`font-medium transition-colors relative group ${
                location.pathname === "/meetmelia" || location.pathname === "/about"
                  ? "text-accent"
                  : "text-foreground/80 hover:text-foreground"
              }`}
            >
              Meet Melia
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 ${
                location.pathname === "/meetmelia" || location.pathname === "/about" ? "w-full" : "w-0 group-hover:w-full"
              }`} />
            </Link>

            {/* Services Dropdown */}
            <div className="relative group">
              <Link
                to="/services"
                className={`font-medium transition-colors relative flex items-center gap-1 ${
                  location.pathname === "/services" || location.pathname.match(/^\/(solar|supercharger|hvac|title24|fans)$/)
                    ? "text-accent"
                    : "text-foreground/80 hover:text-foreground"
                }`}
              >
                Services
                <ChevronDown className="w-4 h-4" />
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 ${
                  location.pathname === "/services" || location.pathname.match(/^\/(solar|supercharger|hvac|title24|fans)$/)
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`} />
              </Link>
              <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-background border border-border rounded-lg shadow-lg py-2 min-w-[220px]">
                  {serviceLinks.map((service) => (
                    <Link
                      key={service.name}
                      to={service.href}
                      className="block w-full text-left px-4 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-muted transition-colors"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              to="/savingscalculator"
              className={`font-medium transition-colors relative group ${
                location.pathname === "/savingscalculator"
                  ? "text-accent"
                  : "text-foreground/80 hover:text-foreground"
              }`}
            >
              Savings Calculator
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 ${
                location.pathname === "/savingscalculator" ? "w-full" : "w-0 group-hover:w-full"
              }`} />
            </Link>

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
              to="/projects"
              className={`font-medium transition-colors relative group ${
                location.pathname === "/projects"
                  ? "text-accent"
                  : "text-foreground/80 hover:text-foreground"
              }`}
            >
              Projects
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 ${
                location.pathname === "/projects" ? "w-full" : "w-0 group-hover:w-full"
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

            <Link
              to="/news"
              className={`font-medium transition-colors relative group ${
                location.pathname.startsWith("/news")
                  ? "text-accent"
                  : "text-foreground/80 hover:text-foreground"
              }`}
            >
              News
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 ${
                location.pathname.startsWith("/news") ? "w-full" : "w-0 group-hover:w-full"
              }`} />
            </Link>

            <a
              href="https://www.instagram.com/solarwithmelia/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/80 hover:text-accent transition-colors"
              aria-label="Follow us on Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button variant="solar" size="lg" onClick={openContactModal}>
              Get A Quote
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
          <div className="lg:hidden absolute top-20 left-0 right-0 bg-background border-b border-border z-50">
            <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
              <Link
                to="/meetmelia"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-medium py-2 transition-colors ${
                  location.pathname === "/meetmelia" || location.pathname === "/about"
                    ? "text-accent"
                    : "text-foreground/80 hover:text-foreground"
                }`}
              >
                Meet Melia
              </Link>

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
                      <Link
                        key={service.name}
                        to={service.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-left text-foreground/60 hover:text-foreground text-sm py-1.5 transition-colors"
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                to="/savingscalculator"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-medium py-2 transition-colors ${
                  location.pathname === "/savingscalculator"
                    ? "text-accent"
                    : "text-foreground/80 hover:text-foreground"
                }`}
              >
                Savings Calculator
              </Link>

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
                to="/projects"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-medium py-2 transition-colors ${
                  location.pathname === "/projects"
                    ? "text-accent"
                    : "text-foreground/80 hover:text-foreground"
                }`}
              >
                Projects
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

              <Link
                to="/news"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-medium py-2 transition-colors ${
                  location.pathname.startsWith("/news")
                    ? "text-accent"
                    : "text-foreground/80 hover:text-foreground"
                }`}
              >
                News
              </Link>

              <a
                href="https://www.instagram.com/solarwithmelia/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-medium py-2 text-foreground/80 hover:text-foreground transition-colors"
              >
                <Instagram className="w-5 h-5" />
                Instagram
              </a>

              <Button variant="solar" size="lg" className="mt-2" onClick={() => { setIsMobileMenuOpen(false); openContactModal(); }}>
                Get A Quote
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
