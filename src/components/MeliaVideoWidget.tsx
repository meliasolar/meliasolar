import { useState, useEffect, useRef } from "react";
import { X, Volume2, VolumeX } from "lucide-react";
import meliaVideo from "@/assets/melia-welcome.mp4";

const MeliaVideoWidget = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Set volume to 50% for when user unmutes
    if (videoRef.current) {
      videoRef.current.volume = 0.5;
    }
    
    // Fly in after 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => setIsDismissed(true), 300);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  if (isDismissed) return null;

  return (
    <div
      className={`fixed bottom-24 left-4 md:bottom-6 md:left-6 z-50 transition-all duration-500 ease-out ${
        isVisible
          ? "translate-x-0 opacity-100"
          : "-translate-x-full opacity-0"
      }`}
    >
      <div className="relative rounded-2xl overflow-hidden bg-background/90 backdrop-blur-sm border border-primary/30 animate-pulse-glow">
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-background/80 hover:bg-background transition-colors"
          aria-label="Close video"
        >
          <X className="w-4 h-4 text-foreground" />
        </button>

        {/* Mute toggle */}
        <button
          onClick={toggleMute}
          className="absolute bottom-2 right-2 z-10 p-1.5 rounded-full bg-background/80 hover:bg-background transition-colors"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-foreground" />
          ) : (
            <Volume2 className="w-4 h-4 text-foreground" />
          )}
        </button>

        {/* Video */}
        <video
          ref={videoRef}
          src={meliaVideo}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-48 h-32 md:w-64 md:h-44 object-cover"
        />

        {/* Label */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-2 pr-10">
          <p className="text-xs font-medium text-foreground truncate">
            Welcome from Melia! 👋
          </p>
        </div>
      </div>
    </div>
  );
};

export default MeliaVideoWidget;
