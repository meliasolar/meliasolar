import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface BlogVideoProps {
  src: string;
}

const BlogVideo = ({ src }: BlogVideoProps) => {
  const [isMuted, setIsMuted] = useState(true);
  const [showSoundOverlay, setShowSoundOverlay] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Set volume to 50% for when user unmutes
    if (videoRef.current) {
      videoRef.current.volume = 0.5;
    }
  }, []);

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

  return (
    <div className="blog-video-wrapper relative max-w-full my-6 rounded-lg overflow-hidden shadow-lg">
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted={isMuted}
        loop
        playsInline
        preload="metadata"
        className="w-full h-auto block"
      />

      {/* Mute toggle button in corner */}
      <button
        onClick={toggleMute}
        className="absolute bottom-3 right-3 z-10 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-background/80 hover:bg-background transition-colors"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? (
          <VolumeX className="w-4 h-4 text-foreground" />
        ) : (
          <Volume2 className="w-4 h-4 text-foreground" />
        )}
      </button>

      {/* "Tap for sound" overlay - only shows when muted and not dismissed */}
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
    </div>
  );
};

export default BlogVideo;
