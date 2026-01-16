import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { X, Volume2, VolumeX } from "lucide-react";
import meliaVideo from "@/assets/melia-welcome.mp4";

const MeliaVideoWidget = () => {
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

        <video
          ref={videoRef}
          src={meliaVideo}
          autoPlay
          muted={isMuted}
          playsInline
          preload="none"
          onEnded={handleVideoEnd}
          className="w-64 h-44 object-cover"
        />

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
