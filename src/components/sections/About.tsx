import { CheckCircle2, Award, Heart, Users, X, Volume2, VolumeX } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const About = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoDismissed, setIsVideoDismissed] = useState(false);
  const [showSoundOverlay, setShowSoundOverlay] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Reset and play video when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && videoRef.current) {
            // Reset video to beginning and play
            videoRef.current.currentTime = 0;
            videoRef.current.volume = 0.5;
            videoRef.current.play().catch(() => {
              // Autoplay failed, user will need to interact
            });
            setShowSoundOverlay(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
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

  const handleVideoEnd = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 2;
      videoRef.current.pause();
    }
  };

  const benefits = [
    "Personalized energy consultation",
    "Transparent pricing with no hidden fees",
    "Quality equipment from trusted manufacturers",
    "Expert installation by certified professionals",
    "Ongoing support and maintenance",
    "Financing options available",
  ];

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        {/* Mobile Video Widget - appears above Meet Melia section */}
        {!isVideoDismissed && (
          <div className="md:hidden mb-8" style={{ minHeight: '180px' }}>
            <div className="relative rounded-2xl overflow-hidden bg-background/90 backdrop-blur-sm border border-primary/30 animate-pulse-glow">
              {/* Close button */}
              <button
                onClick={() => setIsVideoDismissed(true)}
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
                src="/videos/melia-welcome.mp4"
                muted={isMuted}
                playsInline
                autoPlay
                preload="none"
                onEnded={handleVideoEnd}
                className="w-full aspect-video object-cover bg-background"
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

              {/* Label - positioned at top center to avoid overlapping captions */}
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-background/90 to-transparent p-2 pointer-events-none">
                <p className="text-xs font-medium text-foreground text-center">
                  Welcome from Melia! 👋
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Meet Melia Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto mb-24">
          {/* Image - fixed dimensions to prevent layout shift */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl bg-muted overflow-hidden" style={{ minHeight: '400px' }}>
              <img
                src="/images/melia-portrait.png"
                alt="Melia King - Solar Energy Advisor"
                className="w-full h-full object-cover object-top"
                width={544}
                height={680}
                loading="lazy"
                decoding="async"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-2xl bg-accent/20 -z-10" />
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div>
              <span className="text-accent font-semibold text-sm uppercase tracking-widest">
                Your Energy Advisor
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4">
                Meet <span className="text-primary">Melia</span> King
              </h2>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed">
              Melia King is passionate about helping families &amp; businesses take control of their energy costs. Her mission is to make clean, renewable energy accessible to every business &amp; homeowner in 12 states…&amp; counting.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 pt-4">
              <div className="flex flex-col items-center sm:items-start gap-3 p-4 rounded-xl bg-background">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="font-display text-2xl font-bold text-foreground">5,000+</div>
                  <div className="text-sm text-muted-foreground">Families Helped</div>
                </div>
              </div>

              <div className="flex flex-col items-center sm:items-start gap-3 p-4 rounded-xl bg-background">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <Award className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="font-display text-2xl font-bold text-foreground">10+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
              </div>

              <div className="flex flex-col items-center sm:items-start gap-3 p-4 rounded-xl bg-background">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="font-display text-2xl font-bold text-foreground">99%</div>
                  <div className="text-sm text-muted-foreground">Happy Clients</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Content */}
        <div className="max-w-3xl mx-auto">
          {/* Content */}
          <div className="space-y-8">
            <div className="text-center">
              <span className="text-accent font-semibold text-sm uppercase tracking-widest">
                About Us
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4">
                Building A <span className="text-primary">Brighter Future</span>, One Home At A Time 🫶
              </h2>
            </div>

            <p className="text-muted-foreground leading-relaxed text-center">
              We walk alongside you through every step — from your first questions about solar to the day your system goes live. No high-pressure sales tactics, just straightforward advice customized to your home and budget.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-foreground text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
