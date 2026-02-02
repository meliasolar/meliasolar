import { useState, useEffect, useRef, forwardRef } from "react";
import { useLocation } from "react-router-dom";
import { X, Volume2, VolumeX } from "lucide-react";

const MeliaVideoWidget = forwardRef<HTMLDivElement>((_, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showSoundOverlay, setShowSoundOverlay] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const location = useLocation();

  // Hide on /meetmelia route to avoid duplicate videos
  const isOnMeetMelia = location.pathname === "/meetmelia";

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

  const handleVideoEnd = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 2;
      videoRef.current.pause();
    }
  };

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

  const handleEnableSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      setIsMuted(false);
      setShowSoundOverlay(false);
    }
  };

  if (isDismissed || isOnMeetMelia) return null;

  return (
    <div
      ref={ref}
      className={`fixed bottom-6 left-6 z-50 transition-all duration-500 ease-out hidden md:block ${
        isVisible
          ? "translate-x-0 opacity-100"
          : "-translate-x-full opacity-0"
      }`}
    >
      <div className="relative rounded-2xl overflow-hidden bg-background/90 backdrop-blur-sm border border-primary/30 animate-pulse-glow">
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 z-10 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-background/80 hover:bg-background transition-colors"
          aria-label="Close video"
        >
          <X className="w-4 h-4 text-foreground" />
        </button>

        {/* Mute toggle */}
        <button
          onClick={toggleMute}
          className="absolute bottom-2 right-2 z-10 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-background/80 hover:bg-background transition-colors"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-foreground" />
          ) : (
            <Volume2 className="w-4 h-4 text-foreground" />
          )}
        </button>

        <video
          ref={videoRef}
          src="/videos/melia-welcome.mp4"
          autoPlay
          muted={isMuted}
          playsInline
          preload="none"
          onEnded={handleVideoEnd}
          className="w-64 h-44 object-cover"
        >
          <track 
            kind="captions" 
            src="/videos/melia-welcome.vtt" 
            srcLang="en" 
            label="English"
            default
          />
        </video>

        {showSoundOverlay && isMuted && (
          <button
            onClick={handleEnableSound}
            className="absolute inset-0 flex items-center justify-center bg-background/20 transition-opacity hover:bg-background/10"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium shadow-lg">
              <Volume2 className="w-4 h-4" />
              Tap for sound
            </div>
          </button>
        )}

        {/* Label - positioned at top center to avoid overlapping captions */}
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-background/90 to-transparent p-2 pointer-events-none">
          <p className="text-xs font-medium text-foreground text-center">
            Welcome from Melia! 👋
          </p>
        </div>
      </div>
    </div>
  );
});

MeliaVideoWidget.displayName = "MeliaVideoWidget";

export default MeliaVideoWidget;
