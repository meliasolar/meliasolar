import { lazy, Suspense, useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import FloatingContactButtons from "@/components/FloatingContactButtons";
import LocalBusinessSchema from "@/components/seo/LocalBusinessSchema";

// Lazy load below-the-fold sections to reduce initial JS bundle
const About = lazy(() => import("@/components/sections/About"));
const WhySolar = lazy(() => import("@/components/sections/WhySolar"));
const SavingsCalculator = lazy(() => import("@/components/sections/SavingsCalculator"));
const PortfolioCarousel = lazy(() => import("@/components/sections/PortfolioCarousel"));

// Extra-deferred sections - only load when near viewport
const TestimonialsCarousel = lazy(() => import("@/components/sections/TestimonialsCarousel"));
const InstagramFeed = lazy(() => import("@/components/sections/InstagramFeed"));

// Defer video widget to not block initial render - load after page is interactive
const MeliaVideoWidget = lazy(() => 
  new Promise<typeof import("@/components/MeliaVideoWidget")>(resolve => {
    // Delay loading until after main content is rendered
    requestIdleCallback(() => {
      import("@/components/MeliaVideoWidget").then(resolve);
    }, { timeout: 3000 });
  })
);

// Skeleton for About section
const AboutSkeleton = () => (
  <section className="py-24 bg-secondary">
    <div className="container mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
        <div className="aspect-[4/5] rounded-2xl bg-muted animate-pulse" />
        <div className="space-y-8">
          <div className="h-8 w-32 bg-muted animate-pulse rounded" />
          <div className="h-12 w-64 bg-muted animate-pulse rounded" />
          <div className="h-24 w-full bg-muted animate-pulse rounded" />
        </div>
      </div>
    </div>
  </section>
);

const Index = () => {
  const [showTestimonials, setShowTestimonials] = useState(false);
  const [showInstagram, setShowInstagram] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const instagramRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);

  // Defer heavy sections until near viewport for better LCP
  useEffect(() => {
    const testimonialsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowTestimonials(true);
          testimonialsObserver.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    const portfolioObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowPortfolio(true);
          portfolioObserver.disconnect();
        }
      },
      { rootMargin: '300px' }
    );

    const instagramObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowInstagram(true);
          instagramObserver.disconnect();
        }
      },
      { rootMargin: '400px' }
    );

    if (testimonialsRef.current) {
      testimonialsObserver.observe(testimonialsRef.current);
    }
    if (portfolioRef.current) {
      portfolioObserver.observe(portfolioRef.current);
    }
    if (instagramRef.current) {
      instagramObserver.observe(instagramRef.current);
    }

    return () => {
      testimonialsObserver.disconnect();
      portfolioObserver.disconnect();
      instagramObserver.disconnect();
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Melia King Solar | Your Solar King</title>
        <meta
          name="description"
          content="Melia King Solar - Your Solar King. Expert solar panel installation, HVAC, Title 24 roofing, and QuietCool whole house fans. Get your free quote today!"
        />
        <meta
          name="keywords"
          content="solar panels, solar installation, solar energy, HVAC, Title 24 roofing, QuietCool, energy savings, renewable energy"
        />
        <link rel="canonical" href="https://meliasolar.com" />
        <meta property="og:title" content="Melia King Solar | Your Solar King" />
        <meta
          property="og:description"
          content="Melia King Solar - Your Solar King. Expert solar panel installation and whole-home energy solutions."
        />
        <meta property="og:image" content="https://meliasolar.com/melia-og-share.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://meliasolar.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Melia King Solar | Your Solar King" />
        <meta name="twitter:description" content="Expert solar panel installation and whole-home energy solutions." />
        <meta name="twitter:image" content="https://meliasolar.com/melia-og-share.png" />
      </Helmet>
      <LocalBusinessSchema />

      <Header />
      <main>
        <Hero />
        <div ref={testimonialsRef}>
          {showTestimonials && (
            <Suspense fallback={<div className="min-h-[300px] bg-muted/30 animate-pulse rounded-lg mx-6" />}>
              <TestimonialsCarousel />
            </Suspense>
          )}
        </div>
        <Suspense fallback={<AboutSkeleton />}>
          <About />
        </Suspense>
        <Suspense fallback={<div className="min-h-[400px] bg-muted/30 animate-pulse rounded-lg mx-6" />}>
          <WhySolar />
          <SavingsCalculator />
        </Suspense>
        {/* Portfolio - deferred to improve LCP */}
        <div ref={portfolioRef}>
          {showPortfolio && (
            <Suspense fallback={<div className="min-h-[300px] bg-muted/30 animate-pulse rounded-lg mx-6" />}>
              <PortfolioCarousel />
            </Suspense>
          )}
        </div>
        {/* Instagram Feed - deferred loading for performance */}
        <div ref={instagramRef}>
          {showInstagram && (
            <Suspense fallback={<div className="min-h-[300px] bg-muted/30 animate-pulse rounded-lg mx-6" />}>
              <InstagramFeed />
            </Suspense>
          )}
        </div>
      </main>
      <Footer />
      <FloatingContactButtons />
      <Suspense fallback={null}>
        <MeliaVideoWidget />
      </Suspense>
    </>
  );
};

export default Index;
