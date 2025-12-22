import { Phone } from "lucide-react";

const FloatingCallButton = () => {
  return (
    <a
      href="tel:+13103469466"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-accent hover:bg-accent/90 text-foreground rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 animate-fade-in group"
      aria-label="Call us"
    >
      {/* Pulse rings */}
      <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-30" />
      <span className="absolute inset-0 rounded-full bg-accent animate-pulse opacity-20" />
      
      {/* Icon */}
      <Phone className="w-6 h-6 relative z-10 group-hover:animate-bounce" />
    </a>
  );
};

export default FloatingCallButton;
