import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import FloatingContactButtons from "@/components/FloatingContactButtons";
import LocalBusinessSchema from "@/components/seo/LocalBusinessSchema";

// Lazy load below-the-fold sections to reduce initial JS bundle
const WhySolar = lazy(() => import("@/components/sections/WhySolar"));
const SavingsCalculator = lazy(() => import("@/components/sections/SavingsCalculator"));
const Contact = lazy(() => import("@/components/sections/Contact"));
const PortfolioCarousel = lazy(() => import("@/components/sections/PortfolioCarousel"));
const TestimonialsCarousel = lazy(() => import("@/components/sections/TestimonialsCarousel"));

// Defer video widget to not block initial render
const MeliaVideoWidget = lazy(() => import("@/components/MeliaVideoWidget"));

const Index = () => {
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
        <Suspense fallback={<div className="min-h-[200px]" />}>
          <TestimonialsCarousel />
        </Suspense>
        <About />
        <Suspense fallback={<div className="min-h-[200px]" />}>
          <WhySolar />
          <SavingsCalculator />
          <PortfolioCarousel />
          <Contact />
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
