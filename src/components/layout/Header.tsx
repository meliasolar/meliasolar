import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Sun, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Why Solar", href: "/#why-solar" },
  { name: "Testimonials", href: "/#testimonials" },
];

const services = [
  { name: "Solar", href: "/#services-solar" },
  { name: "HVAC", href: "/#services-hvac" },
  { name: "Title 24 Roofing", href: "/#services-roofing" },
  { name: "QuietCool Whole House Fan", href: "/#services-quietcool" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    setIsMobileServicesOpen(false);
    if (href.startsWith("/#")) {
      const elementId = href.substring(2);
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
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
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-solar flex items-center justify-center">
              <Sun className="w-6 h-6 text-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl font-semibold text-foreground">
                Melia King
              </span>
              <span className="text-xs text-muted-foreground tracking-widest uppercase">
                Solar
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  if (link.href.startsWith("/#")) {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }
                }}
                className="text-foreground/80 hover:text-foreground font-medium transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}

            {/* Services Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-foreground/80 hover:text-foreground font-medium transition-colors relative group outline-none">
                Services
                <ChevronDown className="w-4 h-4" />
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-card border border-border shadow-medium z-50">
                {services.map((service) => (
                  <DropdownMenuItem
                    key={service.name}
                    className="cursor-pointer hover:bg-secondary focus:bg-secondary"
                    onClick={() => handleNavClick(service.href)}
                  >
                    {service.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button variant="solar" size="lg">
              Get Free Quote
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
          <div className="lg:hidden absolute top-20 left-0 right-0 bg-background border-b border-border animate-fade-in">
            <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    if (link.href.startsWith("/#")) {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }
                  }}
                  className="text-foreground/80 hover:text-foreground font-medium py-2 transition-colors"
                >
                  {link.name}
                </a>
              ))}

              {/* Mobile Services Accordion */}
              <div>
                <button
                  onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                  className="flex items-center justify-between w-full text-foreground/80 hover:text-foreground font-medium py-2 transition-colors"
                >
                  Services
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isMobileServicesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isMobileServicesOpen && (
                  <div className="pl-4 flex flex-col gap-2 mt-2">
                    {services.map((service) => (
                      <a
                        key={service.name}
                        href={service.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(service.href);
                        }}
                        className="text-foreground/70 hover:text-foreground text-sm py-1 transition-colors"
                      >
                        {service.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <Button variant="solar" size="lg" className="mt-2">
                Get Free Quote
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;