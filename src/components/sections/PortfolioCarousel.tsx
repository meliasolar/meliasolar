import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Sun } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

// Static paths for WebP images - served from public folder for proper caching
const projectImages = [
  { path: "/images/portfolio/project-1.webp", alt: "Melia Solar desert installation - residential solar panels on Palm Springs CA estate with mountain backdrop" },
  { path: "/images/portfolio/tesla-1.webp", alt: "Melia Solar Tesla Powerwall battery storage installation in San Diego CA home garage" },
  { path: "/images/portfolio/project-3.webp", alt: "Melia Solar commercial installation - large rooftop solar array on Los Angeles CA business building" },
  { path: "/images/portfolio/project-10.webp", alt: "Melia Solar tile roof integration - solar panels installed on Orange County CA Spanish tile roof" },
  
  { path: "/images/portfolio/tesla-2.webp", alt: "Melia Solar Tesla Powerwall home battery backup system - wall-mounted installation in Texas home" },
  { path: "/images/portfolio/project-2.webp", alt: "Melia Solar residential installation - aerial view of modern Dallas TX home with rooftop solar panels" },
  { path: "/images/portfolio/project-13.webp", alt: "Melia Solar Spanish tile roof - seamless solar panel integration on Santa Barbara CA home" },
  
  
  { path: "/images/portfolio/tesla-3.webp", alt: "Melia Solar large battery array - multiple Tesla Powerwall units installed in Phoenix Arizona home" },
  { path: "/images/portfolio/project-9.webp", alt: "Melia Solar neighborhood installation - Las Vegas NV home with complete solar and battery system" },
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
              {projectImages.map((project, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-[85%] sm:w-[45%] lg:w-[30%] aspect-[4/3] relative group"
                >
                  <img
                    src={project.path}
                    alt={project.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover rounded-xl shadow-md transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-1 mt-6">
            {projectImages.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className="w-12 h-12 p-4 flex items-center justify-center"
                aria-label={`Go to slide ${index + 1}`}
              >
                <span className={`block rounded-full transition-all ${
                  index === selectedIndex 
                    ? "w-6 h-2 bg-primary" 
                    : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioCarousel;
