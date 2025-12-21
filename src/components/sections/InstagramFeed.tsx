import { Instagram } from "lucide-react";
import { useEffect } from "react";

const InstagramFeed = () => {
  // Instagram embed script loader
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    // Process embeds when script loads
    script.onload = () => {
      if ((window as any).instgrm) {
        (window as any).instgrm.Embeds.process();
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Sample Instagram post URLs from Melia's account - these can be updated with actual post URLs
  const instagramPosts = [
    "https://www.instagram.com/p/C_example1/",
    "https://www.instagram.com/p/C_example2/",
    "https://www.instagram.com/p/C_example3/",
    "https://www.instagram.com/p/C_example4/",
  ];

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

        {/* Instagram Embeds Carousel */}
        <div className="relative">
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {instagramPosts.map((postUrl, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[320px] snap-center"
              >
                <blockquote
                  className="instagram-media"
                  data-instgrm-permalink={postUrl}
                  data-instgrm-version="14"
                  style={{
                    background: "#FFF",
                    border: 0,
                    borderRadius: "12px",
                    boxShadow: "0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)",
                    margin: "1px",
                    maxWidth: "320px",
                    minWidth: "280px",
                    padding: 0,
                    width: "100%",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Follow Button */}
        <div className="text-center mt-8">
          <a
            href="https://www.instagram.com/solarwithmelia"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
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
