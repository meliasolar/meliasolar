import { Phone, Mail } from "lucide-react";

const FloatingContactButtons = () => {
  return (
    <div className="fixed top-[clamp(260px,55vh,420px)] md:bottom-6 md:top-auto right-4 md:right-6 z-50 flex flex-col gap-3">
      {/* Email Button */}
      <a
        href="mailto:Melia@solarkingsolutions.com"
        className="w-12 h-12 bg-primary hover:bg-primary-foreground hover:text-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 animate-fade-in border-2 border-transparent hover:border-primary"
        aria-label="Email us"
      >
        <Mail className="w-5 h-5" />
      </a>

      {/* Call Button */}
      <a
        href="tel:+13103469466"
        className="relative w-14 h-14 bg-accent hover:bg-accent/90 text-foreground rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 animate-fade-in group"
        aria-label="Call us"
      >
        {/* Pulse rings */}
        <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-30" />
        <span className="absolute inset-0 rounded-full bg-accent animate-pulse opacity-20" />
        
        {/* Icon */}
        <Phone className="w-6 h-6 relative z-10 group-hover:animate-bounce" />
      </a>
    </div>
  );
};

export default FloatingContactButtons;
