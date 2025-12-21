import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Patrick L.",
      location: "Murrieta, CA",
      rating: 5,
      text: "The team was AWESOME!! They promptly responded to our inquiry and set up an in-person meeting to explain solar and answer any questions we had. They really wanted us to understand all about solar, not just sell us a system. They also encouraged us to get other bids, which we had already done.",
    },
    {
      name: "Jay B.",
      location: "Brea, CA",
      rating: 5,
      text: "I had my Solar System installed a little over a year ago, and I am very satisfied with the pricing, quality of equipment and installation. I had an incredible experience — they worked with us to figure out how many panels we needed and kept us informed and answered all of our questions in a timely manner.",
    },
    {
      name: "Barbara D.",
      location: "Orange County, CA",
      rating: 5,
      text: "Let me start by saying I was the biggest skeptic and critic on Solar there is. I had 3 solar consultations and was literally going to throw in the towel before this team. They provided realistic and honest information about solar, was patient with me, answered every question redundant or not, and ensured my system met my wants rather than needs.",
    },
    {
      name: "Peggy B.",
      location: "Riverside, CA",
      rating: 5,
      text: "We have had the BEST experience from the initial estimate and throughout the process. Their excellent customer service is very different from our experience with other companies. We highly recommend them!",
    },
    {
      name: "Kathy N.",
      location: "San Diego, CA",
      rating: 5,
      text: "They worked to get us through the entire process from our panel purchase to installation and activation. We never felt abandoned as they were always in contact with us, helping us to the very end. First rate service and commitment!",
    },
    {
      name: "David P.",
      location: "Temecula, CA",
      rating: 5,
      text: "I can't believe we dreaded this project for years, anticipating all the kinds of problems we had heard about from others. But our solar project could not have gone more smoothly! Our solar project was a trouble-free experience and we're grateful to have gotten connected with this amazing team!",
    },
  ];

  return (
    <section id="testimonials" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">
            Testimonials
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground text-lg mt-6">
            Everything you need to know about the quality of our services in
            customer testimonials. Every testimonial is from a real customer.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="bg-card rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 relative"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 right-8">
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                  <Quote className="w-4 h-4 text-foreground" />
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-accent text-accent"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-5">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-gradient-solar flex items-center justify-center">
                  <span className="text-foreground font-semibold text-sm">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google Reviews Badge */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-card rounded-full shadow-soft">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-accent text-accent" />
              ))}
            </div>
            <span className="font-semibold text-foreground">4.9</span>
            <span className="text-muted-foreground">on Google Reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
