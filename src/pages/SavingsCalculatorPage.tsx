import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SavingsCalculator from "@/components/sections/SavingsCalculator";

const SavingsCalculatorPage = () => {
  return (
    <>
      <Helmet>
        <title>Solar Savings Calculator | Melia King Solar</title>
        <meta
          name="description"
          content="Solar Savings Calculator. Calculate your potential solar savings and see how much you can save on electricity bills."
        />
        <link rel="canonical" href="https://meliasolar.com/savingscalculator" />
        <meta property="og:title" content="Solar Savings Calculator | Melia King Solar" />
        <meta property="og:description" content="Calculate your potential solar savings and see how much you can save on electricity bills." />
        <meta property="og:image" content="https://meliasolar.com/melia-og-image.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://meliasolar.com/savingscalculator" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://meliasolar.com/melia-og-image.png" />
      </Helmet>

      <Header />

      <main className="min-h-screen pt-24">
        <SavingsCalculator />
      </main>

      <Footer />
    </>
  );
};

export default SavingsCalculatorPage;
