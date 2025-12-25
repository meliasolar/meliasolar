import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Sun } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

import project1 from "@/assets/portfolio/project-1.jpg";
import project2 from "@/assets/portfolio/project-2.jpg";
import project3 from "@/assets/portfolio/project-3.jpg";
import project4 from "@/assets/portfolio/project-4.jpg";
import project5 from "@/assets/portfolio/project-5.jpg";
import project6 from "@/assets/portfolio/project-6.jpg";
import project7 from "@/assets/portfolio/project-7.jpg";
import project8 from "@/assets/portfolio/project-8.jpg";
import project9 from "@/assets/portfolio/project-9.jpg";
import project10 from "@/assets/portfolio/project-10.jpg";
import project12 from "@/assets/portfolio/project-12.jpg";
import project13 from "@/assets/portfolio/project-13.jpg";
import project14 from "@/assets/portfolio/project-14.jpg";
import tesla1 from "@/assets/portfolio/tesla-1.jpg";
import tesla2 from "@/assets/portfolio/tesla-2.jpg";
import tesla3 from "@/assets/portfolio/tesla-3.jpg";

const projects = [
  { image: project1, alt: "Desert solar installation with mountain backdrop" },
  { image: project2, alt: "Aerial view of residential solar panels" },
  { image: project3, alt: "Commercial rooftop solar array" },
  { image: project4, alt: "Large-scale commercial solar installation" },
  { image: project5, alt: "Multi-roof solar panel system" },
  { image: project6, alt: "Coastal property solar installation" },
  { image: project7, alt: "Luxury estate with solar panels" },
  { image: project8, alt: "Residential home solar installation" },
  { image: project9, alt: "Neighborhood aerial showing solar home" },
  { image: project10, alt: "Solar panels on tile roof" },
  { image: project12, alt: "Luxury estate aerial solar installation" },
  { image: project13, alt: "Spanish tile roof solar installation" },
  { image: project14, alt: "Aerial neighborhood view with multiple solar homes" },
  { image: tesla1, alt: "Tesla Powerwall battery storage installation" },
  { image: tesla2, alt: "Tesla Powerwall side view" },
  { image: tesla3, alt: "Large Tesla Powerwall array" },
];

const PortfolioCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });
  
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="pt-4 pb-10 md:pt-6 md:pb-16 bg-muted/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sun className="w-4 h-4" />
            Our Work
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            <span className="text-primary">Real</span> Installations, <span className="text-primary">Real</span> Results
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A few of our completed solar installations across California and beyond. 
            Each project represents our commitment to quality and clean energy.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-2 md:-left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-background/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center transition-all hover:bg-background hover:scale-105"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
          </button>

          <button
            onClick={scrollNext}
            className="absolute right-2 md:-right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-background/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center transition-all hover:bg-background hover:scale-105"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
          </button>

          {/* Embla Carousel */}
          <div className="overflow-hidden rounded-xl" ref={emblaRef}>
            <div className="flex gap-4">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-[85%] sm:w-[45%] lg:w-[30%] aspect-[4/3] relative group"
                >
                  <img
                    src={project.image}
                    alt={project.alt}
                    className="w-full h-full object-cover rounded-xl shadow-md transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === selectedIndex 
                    ? "bg-primary w-6" 
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioCarousel;
