import { Instagram, Play, ExternalLink } from "lucide-react";

const instagramPosts = [
  {
    url: "https://www.instagram.com/reel/DRS9bIhkhdz/",
    type: "reel",
  },
  {
    url: "https://www.instagram.com/p/DRvh1UrCSuI/",
    type: "post",
  },
  {
    url: "https://www.instagram.com/reel/DSRl-xSgP1B/",
    type: "reel",
  },
  {
    url: "https://www.instagram.com/reel/DSRmsYwgGlH/",
    type: "reel",
  },
  {
    url: "https://www.instagram.com/reel/DSRo70YABC2/",
    type: "reel",
  },
];

const InstagramFeed = () => {
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
        <div className="flex md:grid md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
          {instagramPosts.map((post, index) => (
            <a
              key={index}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex-shrink-0 w-[200px] md:w-auto aspect-square bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] snap-center"
            >
              {/* Overlay pattern */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Solar/energy themed background pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-4 border-white/30 rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-2 border-white/20 rounded-full" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                {post.type === "reel" ? (
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <Play className="w-6 h-6 fill-white" />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <Instagram className="w-6 h-6" />
                  </div>
                )}
                <span className="mt-2 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  View {post.type === "reel" ? "Reel" : "Post"}
                </span>
              </div>

              {/* External link indicator */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink className="w-4 h-4 text-white" />
              </div>
            </a>
          ))}
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
