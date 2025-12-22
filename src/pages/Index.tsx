import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import WhySolar from "@/components/sections/WhySolar";
import SavingsCalculator from "@/components/sections/SavingsCalculator";
import Contact from "@/components/sections/Contact";
import InstagramFeed from "@/components/sections/InstagramFeed";
import FloatingContactButtons from "@/components/FloatingContactButtons";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Melia King Solar | Your Concierge Energy Advisor in 13 States</title>
        <meta
          name="description"
          content="Melia King Solar - Your Concierge Energy Advisor in 13 States. Expert solar panel installation, HVAC, Title 24 roofing, and QuietCool whole house fans. Get your free quote today!"
        />
        <meta
          name="keywords"
          content="solar panels, solar installation, solar energy, HVAC, Title 24 roofing, QuietCool, energy savings, renewable energy"
        />
        <link rel="canonical" href="https://meliasolar.com" />
        <meta property="og:title" content="Melia King Solar | Your Concierge Energy Advisor in 13 States" />
        <meta
          property="og:description"
          content="Your Concierge Energy Advisor in 13 States. Expert solar panel installation and whole-home energy solutions."
        />
        <meta property="og:image" content="https://meliasolar.com/og-image.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://meliasolar.com" />
      </Helmet>

      <Header />
      <main>
        <Hero />
        <WhySolar />
        <SavingsCalculator />
        <Contact />
        <InstagramFeed />
      </main>
      <Footer />
      <FloatingContactButtons />
    </>
  );
};

export default Index;
