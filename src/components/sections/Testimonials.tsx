import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Testimonials = () => {
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
    <section id="testimonials" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground tracking-tight">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground text-lg mt-6">
            Real stories from homeowners who made the switch to solar.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="bg-secondary rounded-2xl p-8 h-full flex flex-col">
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
                  <p className="text-foreground leading-relaxed flex-grow text-[15px]">
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
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-2 mt-8">
            <CarouselPrevious className="static translate-y-0 bg-secondary hover:bg-border border-0" />
            <CarouselNext className="static translate-y-0 bg-secondary hover:bg-border border-0" />
          </div>
        </Carousel>

        {/* Google Reviews Badge */}
        <div className="mt-12 text-center">
          <a
            href="https://maps.app.goo.gl/b8Z83MdUr8dECADZ9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 bg-secondary rounded-full hover:bg-border transition-colors"
          >
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-accent text-accent" />
              ))}
            </div>
            <span className="font-semibold text-foreground">4.9</span>
            <span className="text-muted-foreground">on Google Reviews</span>
          </a>
          <p className="mt-2 text-xs text-muted-foreground italic">
            Melia King is part owner of Voltaic Inc
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;