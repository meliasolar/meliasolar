import { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingContactButtons from "@/components/FloatingContactButtons";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Award, Heart, Users, X, Volume2, VolumeX, Play, Pause } from "lucide-react";

const AboutPage = () => {
  // Mobile video state
  const [isMutedMobile, setIsMutedMobile] = useState(true);
  const [isPlayingMobile, setIsPlayingMobile] = useState(true);
  const [isDismissedMobile, setIsDismissedMobile] = useState(false);
  const [showSoundOverlayMobile, setShowSoundOverlayMobile] = useState(true);
  const videoRefMobile = useRef<HTMLVideoElement>(null);

  // Desktop inline video state
  const [isDismissedDesktop, setIsDismissedDesktop] = useState(false);
  const [isMutedDesktop, setIsMutedDesktop] = useState(true);
  const [isPlayingDesktop, setIsPlayingDesktop] = useState(true);
  const [showSoundOverlayDesktop, setShowSoundOverlayDesktop] = useState(true);
  const videoRefDesktop = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRefMobile.current) {
      videoRefMobile.current.volume = 0.5;
    }
    if (videoRefDesktop.current) {
      videoRefDesktop.current.volume = 0.5;
    }
  }, []);

  const togglePlayMobile = () => {
    if (videoRefMobile.current) {
      if (isPlayingMobile) {
        videoRefMobile.current.pause();
      } else {
        videoRefMobile.current.play();
      }
      setIsPlayingMobile(!isPlayingMobile);
    }
  };

  const toggleMuteMobile = () => {
    if (videoRefMobile.current) {
      videoRefMobile.current.muted = !isMutedMobile;
      setIsMutedMobile(!isMutedMobile);
    }
  };

  const handleEnableSoundMobile = () => {
    if (videoRefMobile.current) {
      videoRefMobile.current.muted = false;
      setIsMutedMobile(false);
      setShowSoundOverlayMobile(false);
    }
  };

  const togglePlayDesktop = () => {
    if (videoRefDesktop.current) {
      if (isPlayingDesktop) {
        videoRefDesktop.current.pause();
      } else {
        videoRefDesktop.current.play();
      }
      setIsPlayingDesktop(!isPlayingDesktop);
    }
  };


  const toggleMuteDesktop = () => {
    if (videoRefDesktop.current) {
      videoRefDesktop.current.muted = !isMutedDesktop;
      setIsMutedDesktop(!isMutedDesktop);
    }
  };

  const handleEnableSoundDesktop = () => {
    if (videoRefDesktop.current) {
      videoRefDesktop.current.muted = false;
      setIsMutedDesktop(false);
      setShowSoundOverlayDesktop(false);
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
    <>
      <Helmet>
        <title>Meet Melia King | Your Solar King</title>
        <meta
          name="description"
          content="Meet Melia King 🫶 - Your Energy Advisor. Helping families & businesses take control of their energy costs across 12 states."
        />
        <link rel="canonical" href="https://meliasolar.com/meetmelia" />
        <meta property="og:title" content="Meet Melia King 🫶 | Your Solar King" />
        <meta property="og:description" content="Your Energy Advisor. Helping families & businesses take control of their energy costs across 12 states." />
        <meta property="og:image" content="https://meliasolar.com/melia-og-image.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://meliasolar.com/meetmelia" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Meet Melia King 🫶 | Your Solar King" />
        <meta name="twitter:description" content="Your Energy Advisor. Helping families & businesses take control of their energy costs across 12 states." />
        <meta name="twitter:image" content="https://meliasolar.com/melia-og-image.png" />
        <meta name="keywords" content="Melia King, solar energy advisor, Voltaic Construction, solar consultant, energy independence" />
      </Helmet>

      <Header />

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-b from-secondary to-background">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
              {/* Image - with dimensions to prevent layout shift */}
              <div className="relative">
                <div className="aspect-[4/5] rounded-2xl bg-muted overflow-hidden shadow-medium" style={{ minHeight: '400px' }}>
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
                <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-2xl bg-accent/20 -z-10" />
              </div>

              {/* Content */}
              <div className="space-y-8">
                <div>
                  <span className="text-accent font-semibold text-sm uppercase tracking-widest">
                    Your Energy Advisor
                  </span>
                  <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4">
                    Meet Melia King 🫶
                  </h1>
                </div>

                <p className="text-muted-foreground text-lg leading-relaxed">
                  Melia King is passionate about helping families & businesses take control of their energy costs. Her mission is to make clean, renewable energy accessible to every business & homeowner in 12 states…& counting.
                </p>

                {/* Mobile Video Widget */}
                {!isDismissedMobile && (
                  <div className="md:hidden relative rounded-2xl overflow-hidden bg-background/90 backdrop-blur-sm border border-primary/30">
                    <button
                      onClick={() => setIsDismissedMobile(true)}
                      className="absolute top-2 right-2 z-10 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-background/80 hover:bg-background transition-colors"
                      aria-label="Close video"
                    >
                      <X className="w-4 h-4 text-foreground" />
                    </button>

                    {/* Play/Pause button */}
                    <button
                      onClick={togglePlayMobile}
                      className="absolute top-2 left-2 z-10 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-background/80 hover:bg-background transition-colors"
                      aria-label={isPlayingMobile ? "Pause" : "Play"}
                    >
                      {isPlayingMobile ? (
                        <Pause className="w-4 h-4 text-foreground" />
                      ) : (
                        <Play className="w-4 h-4 text-foreground" />
                      )}
                    </button>

                    {/* Mute button */}
                    <button
                      onClick={toggleMuteMobile}
                      className="absolute bottom-2 right-2 z-10 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-background/80 hover:bg-background transition-colors"
                      aria-label={isMutedMobile ? "Unmute" : "Mute"}
                    >
                      {isMutedMobile ? (
                        <VolumeX className="w-4 h-4 text-foreground" />
                      ) : (
                        <Volume2 className="w-4 h-4 text-foreground" />
                      )}
                    </button>

                    <video
                      ref={videoRefMobile}
                      src="/videos/melia-welcome.mp4"
                      autoPlay
                      loop
                      muted={isMutedMobile}
                      playsInline
                      className="w-full aspect-video object-cover"
                    >
                      <track 
                        kind="captions" 
                        src="/videos/melia-welcome.vtt" 
                        srcLang="en" 
                        label="English"
                        default
                      />
                    </video>

                    {showSoundOverlayMobile && isMutedMobile && (
                      <button
                        onClick={handleEnableSoundMobile}
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
                )}

                {/* Desktop Inline Video */}
                {!isDismissedDesktop && (
                  <div className="hidden md:block relative rounded-2xl overflow-hidden bg-background/90 backdrop-blur-sm border border-primary/30 shadow-medium animate-fade-in">
                    <button
                      onClick={() => setIsDismissedDesktop(true)}
                      className="absolute top-3 right-3 z-10 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
                      aria-label="Close video"
                    >
                      <X className="w-5 h-5 text-foreground" />
                    </button>
                    {/* Play/Pause button */}
                    <button
                      onClick={togglePlayDesktop}
                      className="absolute top-3 left-3 z-10 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
                      aria-label={isPlayingDesktop ? "Pause" : "Play"}
                    >
                      {isPlayingDesktop ? (
                        <Pause className="w-5 h-5 text-foreground" />
                      ) : (
                        <Play className="w-5 h-5 text-foreground" />
                      )}
                    </button>

                    {/* Mute button */}
                    <button
                      onClick={toggleMuteDesktop}
                      className="absolute bottom-3 right-3 z-10 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
                      aria-label={isMutedDesktop ? "Unmute" : "Mute"}
                    >
                      {isMutedDesktop ? (
                        <VolumeX className="w-5 h-5 text-foreground" />
                      ) : (
                        <Volume2 className="w-5 h-5 text-foreground" />
                      )}
                    </button>

                    <video
                      ref={videoRefDesktop}
                      src="/videos/melia-welcome.mp4"
                      autoPlay
                      loop
                      muted={isMutedDesktop}
                      playsInline
                      className="w-full aspect-video object-cover"
                    >
                      <track 
                        kind="captions" 
                        src="/videos/melia-welcome.vtt" 
                        srcLang="en" 
                        label="English"
                        default
                      />
                    </video>

                    {showSoundOverlayDesktop && isMutedDesktop && (
                      <button
                        onClick={handleEnableSoundDesktop}
                        className="absolute inset-0 flex items-center justify-center bg-background/20 transition-opacity hover:bg-background/10"
                      >
                        <div className="flex items-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground font-medium shadow-lg">
                          <Volume2 className="w-5 h-5" />
                          Click for sound
                        </div>
                      </button>
                    )}

                    {/* Label - positioned at top center to avoid overlapping captions */}
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-background/90 to-transparent p-3 pointer-events-none">
                      <p className="text-sm font-medium text-foreground text-center">
                        Welcome from Melia! 👋
                      </p>
                    </div>
                  </div>
                )}

                <div className="grid sm:grid-cols-3 gap-6 pt-4">
                  <div className="flex flex-col items-center sm:items-start gap-3 p-4 rounded-xl bg-card shadow-soft">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                      <Users className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <div className="font-display text-2xl font-bold text-foreground">5,000+</div>
                      <div className="text-sm text-muted-foreground">Families Helped</div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center sm:items-start gap-3 p-4 rounded-xl bg-card shadow-soft">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                      <Award className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <div className="font-display text-2xl font-bold text-foreground">10+</div>
                      <div className="text-sm text-muted-foreground">Years Experience</div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center sm:items-start gap-3 p-4 rounded-xl bg-card shadow-soft">
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
          </div>
        </section>

        {/* About Content */}
        <section className="py-6 md:py-8 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <div>
                <span className="text-accent font-semibold text-sm uppercase tracking-widest">
                  About Us
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-4">
                  Building A <span className="text-primary">Brighter Future</span>, One Home At A Time 🫶
                </h2>
              </div>

              <p className="text-muted-foreground text-lg leading-relaxed">
                We walk alongside you through every step — from your first questions about solar to the day your system goes live. No high-pressure sales tactics, just straightforward advice customized to your home and budget.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-10 md:py-14 bg-secondary">
          <div className="container mx-auto px-6 text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground text-base max-w-xl mx-auto mb-6">
              Contact Melia today for a free consultation and discover how much you can save with solar.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="lg"
                className="bg-accent text-foreground hover:bg-accent/90"
                asChild
              >
                <a href="tel:+13103469466">Call +1 (310) 346-9466</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
              >
                <a href="mailto:meliaking@voltaicnow.com">Email Us</a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingContactButtons />

    </>
  );
};

export default AboutPage;
