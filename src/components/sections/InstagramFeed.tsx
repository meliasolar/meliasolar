import { Instagram, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";

// Static paths for portfolio images - reusing existing optimized WebP images
const instagramPosts = [
  {
    url: "https://www.instagram.com/reel/DRS9bIhkhdz/",
    type: "reel",
    image: "/images/portfolio/project-1.webp",
  },
  {
    url: "https://www.instagram.com/p/DRvh1UrCSuI/",
    type: "post",
    image: "/images/portfolio/project-2.webp",
  },
  {
    url: "https://www.instagram.com/reel/DSRl-xSgP1B/",
    type: "reel",
    image: "/images/portfolio/tesla-1.webp",
  },
  {
    url: "https://www.instagram.com/reel/DSRmsYwgGlH/",
    type: "reel",
    image: "/images/portfolio/project-3.webp",
  },
  {
    url: "https://www.instagram.com/reel/DSRo70YABC2/",
    type: "reel",
    image: "/images/portfolio/project-5.webp",
  },
];

const InstagramFeed = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

  // Throttle scroll handler with requestAnimationFrame to prevent forced reflow
  const throttledCheckScroll = useCallback(() => {
    requestAnimationFrame(checkScroll);
  }, [checkScroll]);

  useEffect(() => {
    checkScroll();
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener("scroll", throttledCheckScroll, { passive: true });
      window.addEventListener("resize", throttledCheckScroll, { passive: true });
      return () => {
        ref.removeEventListener("scroll", throttledCheckScroll);
        window.removeEventListener("resize", throttledCheckScroll);
      };
    }
  }, [throttledCheckScroll, checkScroll]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 220;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Instagram className="w-4 h-4" />
            Follow Our Journey
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Connect With Us on Instagram
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See our latest solar installations, behind-the-scenes moments, and
            happy customers. Follow us for tips on saving energy and going green!
          </p>
        </div>

        {/* Instagram Carousel (mobile) / Grid (desktop) */}
        <div className="relative">
          {/* Left Arrow - mobile only */}
          <button
            onClick={() => scroll("left")}
            className={`md:hidden absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-background/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center transition-opacity ${
              canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>

          {/* Right Arrow - mobile only */}
          <button
            onClick={() => scroll("right")}
            className={`md:hidden absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-background/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center transition-opacity ${
              canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>

          <div
            ref={scrollRef}
            className="flex md:grid md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0"
          >
            {instagramPosts.map((post, index) => (
              <a
                key={index}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex-shrink-0 w-[200px] md:w-auto aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] snap-center"
              >
                {/* Thumbnail Image */}
                <img
                  src={post.image}
                  alt={`Melia King Solar Instagram ${post.type}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  {post.type === "reel" ? (
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 group-hover:scale-110 transition-all">
                      <Play className="w-6 h-6 fill-white" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 group-hover:scale-110 transition-all opacity-0 group-hover:opacity-100">
                      <Instagram className="w-6 h-6" />
                    </div>
                  )}
                  <span className="mt-2 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    View {post.type === "reel" ? "Reel" : "Post"}
                  </span>
                </div>

                {/* Instagram badge */}
                <div className="absolute top-2 right-2">
                  <div className="w-6 h-6 rounded-md bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center shadow-md">
                    <Instagram className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Follow Button */}
        <div className="text-center mt-10">
          <a
            href="https://www.instagram.com/solarwithmelia"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity shadow-lg"
          >
            <Instagram className="w-5 h-5" />
            Follow @solarwithmelia
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
