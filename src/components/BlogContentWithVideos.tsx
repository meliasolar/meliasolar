import { useMemo } from "react";
import BlogVideo from "./BlogVideo";

interface BlogContentWithVideosProps {
  html: string;
  videoSources: string[];
  className?: string;
}

const BlogContentWithVideos = ({ html, videoSources, className = "" }: BlogContentWithVideosProps) => {
  // Parse HTML and find video placeholders
  const { segments, videoIndices } = useMemo(() => {
    if (!html) return { segments: [], videoIndices: [] };
    
    // Split HTML by video placeholder divs
    const placeholderRegex = /<div[^>]*data-video-placeholder="(\d+)"[^>]*class="blog-video-placeholder"[^>]*><\/div>/g;
    
    const parts: { type: "html" | "video"; content: string; videoIndex?: number }[] = [];
    let lastIndex = 0;
    let match;
    const indices: number[] = [];

    while ((match = placeholderRegex.exec(html)) !== null) {
      // Add HTML before the placeholder
      if (match.index > lastIndex) {
        parts.push({
          type: "html",
          content: html.slice(lastIndex, match.index),
        });
      }
      
      // Add video placeholder
      const videoIndex = parseInt(match[1], 10);
      indices.push(videoIndex);
      parts.push({
        type: "video",
        content: "",
        videoIndex,
      });
      
      lastIndex = match.index + match[0].length;
    }
    
    // Add remaining HTML
    if (lastIndex < html.length) {
      parts.push({
        type: "html",
        content: html.slice(lastIndex),
      });
    }
    
    return { segments: parts, videoIndices: indices };
  }, [html]);

  if (segments.length === 0 && html) {
    // No video placeholders, render as-is
    return (
      <div 
        className={`blog-content prose prose-lg max-w-none text-foreground prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-blockquote:border-primary prose-blockquote:text-muted-foreground prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-10 prose-h2:mb-6 prose-h2:border-b prose-h2:border-border prose-h2:pb-3 ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <div className={`blog-content prose prose-lg max-w-none text-foreground prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-blockquote:border-primary prose-blockquote:text-muted-foreground prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-10 prose-h2:mb-6 prose-h2:border-b prose-h2:border-border prose-h2:pb-3 ${className}`}>
      {segments.map((segment, index) => {
        if (segment.type === "video" && segment.videoIndex !== undefined) {
          const videoSrc = videoSources[segment.videoIndex];
          if (videoSrc) {
            return <BlogVideo key={`video-${segment.videoIndex}`} src={videoSrc} />;
          }
          return null;
        }
        
        return (
          <div 
            key={`html-${index}`}
            dangerouslySetInnerHTML={{ __html: segment.content }}
          />
        );
      })}
    </div>
  );
};

export default BlogContentWithVideos;
