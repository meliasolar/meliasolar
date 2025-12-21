import { Star, ChevronLeft, ChevronRight } from "lucide-react";
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
      name: "Patrick L.",
      location: "Murrieta, CA",
      rating: 5,
      text: "The team was AWESOME!! They promptly responded to our inquiry and set up an in-person meeting to explain solar and answer any questions we had. They really wanted us to understand all about solar, not just sell us a system.",
    },
    {
      name: "Jay B.",
      location: "Brea, CA",
      rating: 5,
      text: "I had my Solar System installed a little over a year ago, and I am very satisfied with the pricing, quality of equipment and installation. I had an incredible experience — they worked with us to figure out how many panels we needed.",
    },
    {
      name: "Barbara D.",
      location: "Orange County, CA",
      rating: 5,
      text: "Let me start by saying I was the biggest skeptic on Solar there is. I had 3 consultations and was going to throw in the towel. They provided realistic and honest information, was patient with me, and answered every question.",
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
      text: "They worked to get us through the entire process from our panel purchase to installation and activation. We never felt abandoned as they were always in contact with us, helping us to the very end.",
    },
    {
      name: "David P.",
      location: "Temecula, CA",
      rating: 5,
      text: "I can't believe we dreaded this project for years, anticipating all the kinds of problems we had heard about from others. But our solar project could not have gone more smoothly!",
    },
    {
      name: "Michael R.",
      location: "Phoenix, AZ",
      rating: 5,
      text: "From start to finish, the experience was seamless. The team was professional, knowledgeable, and made the entire process stress-free. Our energy bills have dropped significantly since installation.",
    },
    {
      name: "Sarah M.",
      location: "Austin, TX",
      rating: 5,
      text: "Excellent communication throughout the entire process. They explained everything clearly and were always available to answer questions. The installation was completed ahead of schedule.",
    },
    {
      name: "Robert H.",
      location: "Los Angeles, CA",
      rating: 5,
      text: "After researching multiple companies, we chose Melia King Solar and couldn't be happier. The quality of the panels and installation exceeded our expectations. Highly recommend!",
    },
    {
      name: "Jennifer T.",
      location: "Scottsdale, AZ",
      rating: 5,
      text: "The team made going solar incredibly easy. They handled all the permits and paperwork, and the installation crew was courteous and efficient. Our system has been performing great!",
    },
    {
      name: "William C.",
      location: "Dallas, TX",
      rating: 5,
      text: "Outstanding service from consultation to completion. They designed a system perfectly sized for our needs and the savings have been even better than projected. Five stars!",
    },
    {
      name: "Lisa K.",
      location: "Irvine, CA",
      rating: 5,
      text: "We were hesitant about solar but the team put all our concerns to rest. They were transparent about costs and savings, and delivered exactly what they promised. Couldn't ask for more.",
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
                        className="w-4 h-4 fill-foreground text-foreground"
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
                    <div className="text-sm text-muted-foreground">
                      {testimonial.location}
                    </div>
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
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-secondary rounded-full">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-foreground text-foreground" />
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