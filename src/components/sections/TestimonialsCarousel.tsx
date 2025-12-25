import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Loc Bui",
    text: "Melia and the team at Voltaic were amazing! They showed up on time, kept everything super clean, and did an awesome job with our solar installation.",
    rating: 5,
  },
  {
    name: "Josh Gonzales",
    title: "Owner, Master Construction",
    text: "Working with Melia King and the team at Voltaic Construction has been a game-changer for us. They move faster than any other solar company I've worked with.",
    rating: 5,
  },
  {
    name: "Bijan Nejadeh",
    text: "I had the best experience with Voltaic. They came in with the best design that Tesla couldn't do. The entire process took about 45 days.",
    rating: 5,
  },
  {
    name: "Trg EPS",
    text: "The Voltaic team was professional, knowledgeable, and courteous. The installation was completed quickly and with minimal disruption.",
    rating: 5,
  },
  {
    name: "Alma Acosta",
    text: "It has been a positive experience all around. The roof was replaced & solar panels installed… the house is definitely in better shape than when this all began.",
    rating: 5,
  },
  {
    name: "DJ Dark",
    text: "Tyler is very professional and very thorough in explaining every detail. I've never been offered lunch by workers who were hired by me. Highly recommend!",
    rating: 5,
  },
  {
    name: "David Shadrake",
    text: "Solid team. Goes above and beyond for clients. Takes great pride in their mission to deliver overhead cost reduction.",
    rating: 5,
  },
  {
    name: "CSXG Powerwashing",
    text: "Their expertise in HVAC, solar, batteries, and QuietCool fans is outstanding. The process was smooth, and I'm thrilled with the results.",
    rating: 5,
  },
];

const TestimonialsCarousel = () => {
  return (
    <section className="pt-2 pb-8 md:py-12 bg-gradient-to-b from-background to-muted/30 overflow-hidden">
      <div className="container mx-auto px-6 mb-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Star className="w-4 h-4 fill-primary" />
            Customer Reviews
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trusted by <span className="text-primary">Businesses</span> & <span className="text-primary">Homeowners</span>
          </h2>
          <p className="text-muted-foreground">
            Real stories from customers who made the switch to solar with Melia King.
          </p>
        </div>
      </div>

      {/* Auto-scrolling carousel */}
      <div className="relative">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Scrolling track - touch scrollable on mobile, auto-scroll on desktop */}
        <div className="flex overflow-x-auto md:overflow-x-visible scrollbar-hide snap-x snap-mandatory md:snap-none md:animate-scroll md:hover:pause-animation touch-pan-x">
          {/* Duplicate testimonials for seamless loop */}
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[320px] md:w-[380px] mx-3 snap-center"
            >
              <div className="bg-card border border-border/50 rounded-2xl p-6 h-full shadow-sm hover:shadow-md transition-shadow">
                {/* Quote icon */}
                <Quote className="w-8 h-8 text-primary/20 mb-3" />

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
                <p className="text-foreground/90 leading-relaxed text-sm mb-6 line-clamp-4">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="pt-4 border-t border-border/50">
                  <div className="font-semibold text-foreground">
                    {testimonial.name}
                  </div>
                  {testimonial.title && (
                    <div className="text-xs text-muted-foreground">
                      {testimonial.title}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Google Reviews Badge */}
      <div className="mt-10 text-center">
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
    </section>
  );
};

export default TestimonialsCarousel;
