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
          content="Calculate your potential solar savings with our free solar savings calculator. See how much you can save on electricity bills."
        />
        <link rel="canonical" href="https://meliasolar.com/savingscalculator" />
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
