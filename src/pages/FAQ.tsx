import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingContactButtons from "@/components/FloatingContactButtons";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const generalFaqs = [
    {
      question: "How does solar energy work?",
      answer: "Solar panels convert sunlight into electricity through photovoltaic cells. This electricity is then converted from DC to AC power by an inverter, making it usable for your home or business. Any excess energy can be stored in batteries or sent back to the grid for credits.",
    },
    {
      question: "How much can I save with solar panels?",
      answer: "Most homeowners save 50-90% on their electricity bills. Your exact savings depend on your energy usage, roof size, local sun exposure, and utility rates. We provide a free consultation to give you a personalized savings estimate.",
    },
    {
      question: "What states do you serve?",
      answer: "We proudly serve 12 states: California, Colorado, Connecticut, Florida, Hawaii, Illinois, Massachusetts, Maryland, New Jersey, Nevada, Texas, and Virginia.",
    },
    {
      question: "How long does solar panel installation take?",
      answer: "The installation itself typically takes 1-3 days. However, the complete process from consultation to activation usually takes 4-8 weeks, including permits, inspections, and utility approval.",
    },
    {
      question: "What happens on cloudy days or at night?",
      answer: "Solar panels still generate power on cloudy days, just at reduced capacity. At night, you can draw power from battery storage or the grid. With net metering, credits earned during sunny days offset nighttime usage.",
    },
    {
      question: "Do solar panels require maintenance?",
      answer: "Solar panels require minimal maintenance. Occasional cleaning and an annual inspection are typically all that's needed. Most panels come with 25-year warranties and can last 30+ years.",
    },
  ];

  const financialFaqs = [
    {
      question: "What financing options are available?",
      answer: "We offer multiple financing options including $0 down payment plans, solar loans, leases, and power purchase agreements (PPAs). We'll help you find the option that best fits your budget.",
    },
    {
      question: "Are there tax credits or incentives for going solar?",
      answer: "Yes! The federal Investment Tax Credit (ITC) allows you to deduct a significant percentage of your solar installation cost from your federal taxes. Many states also offer additional rebates and incentives.",
    },
    {
      question: "Will my property taxes increase if I install solar?",
      answer: "In most states, solar installations are exempt from property tax increases. Your home value increases, but you won't pay higher property taxes on that added value.",
    },
    {
      question: "How does the cost compare to my current energy bill?",
      answer: "Our goal is to keep your solar payment equal to or less than your current energy bill. Your cost doesn't go up — you simply redirect your energy spending toward owning your power source.",
    },
  ];

  const installationFaqs = [
    {
      question: "Is my roof suitable for solar panels?",
      answer: "Most roofs are suitable for solar. Ideal conditions include south-facing exposure, minimal shading, and a roof in good condition. During your free consultation, we'll assess your roof and recommend the best solution.",
    },
    {
      question: "What if I need a new roof?",
      answer: "If your roof needs replacement, we recommend doing it before solar installation. We offer Title 24 compliant roofing services and can coordinate both projects for maximum efficiency and savings.",
    },
    {
      question: "Do I need to be home during installation?",
      answer: "You don't need to be home for the entire installation, but we ask that you're available at the start and end of each day to address any questions and review the completed work.",
    },
    {
      question: "What equipment do you use?",
      answer: "We use only premium tier-1 solar panels and inverters from trusted manufacturers. All our equipment comes with comprehensive warranties and is designed for maximum efficiency and durability.",
    },
  ];

  const serviceFaqs = [
    {
      question: "What other services do you offer besides solar?",
      answer: "We offer comprehensive home energy solutions including HVAC systems, Title 24 roofing, QuietCool whole house fans, and Tesla Supercharger installations for businesses.",
    },
    {
      question: "What is a QuietCool whole house fan?",
      answer: "QuietCool is an energy-efficient cooling system that draws cool outside air through your home while exhausting hot air through the attic. It can reduce AC usage by up to 90% and operates whisper-quiet.",
    },
    {
      question: "Can businesses benefit from your services?",
      answer: "Absolutely! We serve both residential and commercial clients. Businesses can benefit from solar installations, and we're certified Tesla Supercharger installers — add chargers to your parking lot and earn lifetime passive income from every charge.",
    },
    {
      question: "Do you offer ongoing support after installation?",
      answer: "Yes! We provide ongoing support and maintenance services. Our team is always available to answer questions, perform inspections, and ensure your system operates at peak efficiency.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Frequently Asked Questions | Melia King Solar</title>
        <meta
          name="description"
          content="Find answers to common questions about solar panel installation, financing, savings, and our energy services. Melia King Solar serves 12 states."
        />
        <link rel="canonical" href="https://meliasolar.com/faq" />
      </Helmet>

      <Header />

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-b from-secondary to-background">
          <div className="container mx-auto px-6 text-center">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              Frequently Asked Questions
            </h1>
            <p className="text-muted-foreground text-lg mt-6 max-w-2xl mx-auto">
              Everything you need to know about going solar and our energy services.
            </p>
          </div>
        </section>

        {/* General FAQs */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
                General Questions
              </h2>
              <Accordion type="single" collapsible className="space-y-4">
                {generalFaqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`general-${index}`}
                    className="bg-card rounded-xl px-6 border-none shadow-soft"
                  >
                    <AccordionTrigger className="text-foreground font-semibold text-left hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Financial FAQs */}
        <section className="py-12 md:py-16 bg-secondary">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
                Financing & Savings
              </h2>
              <Accordion type="single" collapsible className="space-y-4">
                {financialFaqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`financial-${index}`}
                    className="bg-card rounded-xl px-6 border-none shadow-soft"
                  >
                    <AccordionTrigger className="text-foreground font-semibold text-left hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Installation FAQs */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
                Installation & Equipment
              </h2>
              <Accordion type="single" collapsible className="space-y-4">
                {installationFaqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`installation-${index}`}
                    className="bg-card rounded-xl px-6 border-none shadow-soft"
                  >
                    <AccordionTrigger className="text-foreground font-semibold text-left hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Service FAQs */}
        <section className="py-12 md:py-16 bg-secondary">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
                Our Services
              </h2>
              <Accordion type="single" collapsible className="space-y-4">
                {serviceFaqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`service-${index}`}
                    className="bg-card rounded-xl px-6 border-none shadow-soft"
                  >
                    <AccordionTrigger className="text-foreground font-semibold text-left hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-6 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Still Have Questions?
            </h2>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
              Our team is here to help. Contact us for a free consultation and get personalized answers for your situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
                className="border-accent text-accent hover:bg-accent/10"
                asChild
              >
                <a href="mailto:Melia@solarkingsolutions.com">Email Us</a>
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

export default FAQ;
