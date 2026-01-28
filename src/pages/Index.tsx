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
const TestimonialsCarousel = lazy(() => import("@/components/sections/TestimonialsCarousel"));

// Defer video widget to not block initial render
const MeliaVideoWidget = lazy(() => import("@/components/MeliaVideoWidget"));

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
  const testimonialsRef = useRef<HTMLDivElement>(null);

  // Defer TestimonialsCarousel until near viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowTestimonials(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' }
    );

    if (testimonialsRef.current) {
      observer.observe(testimonialsRef.current);
    }

    return () => observer.disconnect();
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
          <PortfolioCarousel />
        </Suspense>
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
