import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingContactButtons from "@/components/FloatingContactButtons";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

const TestimonialsPage = () => {
  const testimonials = [
    {
      name: "Loc Bui",
      text: "Melia and the team at Voltaic were amazing! They showed up on time, kept everything super clean, and did an awesome job with our solar installation. The whole process was smooth and professional from start to finish. Really happy with the results — highly recommend them if you're thinking about going solar!",
      rating: 5,
    },
    {
      name: "Josh Gonzales",
      title: "Owner, Master Construction",
      text: "I have been a general contractor in Ventura County for over 15 years and it is critical to partner with dependable, knowledgeable, and efficient trades especially when it comes to solar and Title 24 compliance on new builds. Working with Melia King and the team at Voltaic Construction has been a game-changer for us. They move faster than any other solar company I've worked with, and their communication, quality of work, and attention to detail are top-notch.",
      rating: 5,
    },
    {
      name: "Bijan Nejadeh",
      text: "I had the best experience with Voltaic and their Rep. Remy. I had pricing for solar panels and Tesla Powerwall 3 from several companies including Tesla. Voltaic construction not only came close to Tesla (Tesla was the lowest price) but came in with the best design that Tesla couldn't do. They were ahead of the game in every aspect from start to finish. The entire process from permit to complete operation took about 45 days.",
      rating: 5,
    },
    {
      name: "Trg EPS",
      text: "Excellent Solar Storage Battery Installation by Voltaic. The Voltaic team was professional, knowledgeable, and courteous. They explained the entire installation process in detail, ensuring that I understood the benefits and limitations of the system. The installation itself was completed quickly and with minimal disruption to my daily routine.",
      rating: 5,
    },
    {
      name: "Alma Acosta",
      text: "It has been a positive experience all around interfacing with Voltaic (extra thanks to Bryce, Remy & Dean for making this an easy process). The roof was replaced & solar panels installed… as an added bonus stored items were reorganized more logically, and the house surroundings were left beyond clean! The house is definitely in better shape than when this all began.",
      rating: 5,
    },
    {
      name: "DJ Dark",
      text: "A close friend of mine recommended Voltaic for my office HVAC system. And I must say I was highly impressed with the service that was done. Tyler is very professional and very thorough in explaining every detail. Also, the cleanup crew were very respectful and I've never been offered lunch by workers who were hired by me. Blew me away. I highly recommend their service.",
      rating: 5,
    },
    {
      name: "David Shadrake",
      text: "Solid team. Goes above and beyond for clients. Takes great pride in their mission to deliver overhead cost reduction.",
      rating: 5,
    },
    {
      name: "CSXG Powerwashing",
      text: "I had a great experience with Voltaic Construction for solar panel installation at my small business. Recommended by a family friend, their team was knowledgeable and patient, answering all my questions about solar energy. Their expertise in HVAC, solar, batteries, and QuietCool fans is outstanding. The process was smooth, and I'm thrilled with the results. Highly recommend them for anyone looking to make eco-friendly upgrades!",
      rating: 5,
    },
    {
      name: "Phil Seminara",
      text: "Voltaic Construction removed our solar panels, for a new roof to be installed. Bryce is very knowledgeable and explained the process. The foreman took photographs and a video of the panels and wiring before removing the panels to ensure they would be placed back correctly. The crew worked in an organized manner and removed all the panels. After our new roof was installed, the same crew returned and placed the solar panels back on our new roof and reattached the wiring.",
      rating: 5,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Customer Testimonials | Melia King Solar</title>
        <meta
          name="description"
          content="What Our Customers Say. Real stories from homeowners and businesses who made the switch to solar with Melia."
        />
        <link rel="canonical" href="https://meliasolar.com/testimonials" />
        <meta property="og:title" content="What Our Customers Say | Melia King Solar" />
        <meta property="og:description" content="Real stories from homeowners and businesses who made the switch to solar with Melia. 4.9 stars on Google Reviews." />
        <meta property="og:image" content="https://meliasolar.com/og-testimonials-1.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://meliasolar.com/testimonials" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="What Our Customers Say | Melia King Solar" />
        <meta name="twitter:description" content="Real stories from homeowners and businesses who made the switch to solar with Melia. 4.9 stars on Google Reviews." />
        <meta name="twitter:image" content="https://meliasolar.com/og-testimonials-1.png" />
      </Helmet>

      <Header />

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-8 md:pt-40 md:pb-10 bg-gradient-to-b from-secondary to-background">
          <div className="container mx-auto px-6 text-center">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              What Our Customers Say
            </h1>
            <p className="text-muted-foreground text-lg mt-6 max-w-2xl mx-auto">
              Real stories from homeowners and businesses who made the switch to solar with Melia.
            </p>
            
            {/* Google Reviews Badge */}
            <div className="mt-8">
              <a
                href="https://maps.app.goo.gl/b8Z83MdUr8dECADZ9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 bg-card rounded-full shadow-soft hover:shadow-medium transition-all"
              >
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <span className="font-bold text-foreground text-lg">4.9</span>
                <span className="text-muted-foreground">on Google Reviews</span>
              </a>
              <p className="mt-3 text-xs text-muted-foreground italic">
                Melia King is part owner of Voltaic Construction
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="py-10 md:py-16 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-card rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all"
                >
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-accent text-accent"
                      />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-foreground leading-relaxed text-[15px]">
                    "{testimonial.text}"
                  </p>

                  {/* Author */}
                  <div className="mt-6 pt-6 border-t border-border">
                    <div className="font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    {testimonial.title && (
                      <div className="text-sm text-muted-foreground">
                        {testimonial.title}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-12 text-center text-sm text-muted-foreground italic">
              Melia King is part owner of Voltaic Construction
            </p>
          </div>
        </section>

        {/* CTA Section - Leave a Review */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-6 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Had a Great Experience?
            </h2>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
              We'd love to hear from you! Share your experience and help others discover the benefits of going solar with Melia.
            </p>
            <Button
              size="lg"
              className="bg-accent text-foreground hover:bg-accent/90"
              asChild
            >
              <a
                href="https://maps.app.goo.gl/b8Z83MdUr8dECADZ9"
                target="_blank"
                rel="noopener noreferrer"
              >
                Leave a Review on Google
              </a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingContactButtons />
    </>
  );
};

export default TestimonialsPage;
