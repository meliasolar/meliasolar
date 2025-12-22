import { Phone } from "lucide-react";

const FloatingCallButton = () => {
  return (
    <a
      href="tel:+13103469466"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-accent hover:bg-accent/90 text-foreground rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 animate-fade-in"
      aria-label="Call us"
    >
      <Phone className="w-6 h-6" />
    </a>
  );
};

export default FloatingCallButton;
