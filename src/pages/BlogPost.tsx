import { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import DOMPurify from "dompurify";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft, Facebook, Linkedin, Share2, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ArticleSchema from "@/components/seo/ArticleSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  created_at: string;
  slug: string;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      
      // Get post if published OR scheduled and past its scheduled time
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, content, image_url, created_at, slug")
        .eq("slug", slug)
        .or(`published.eq.true,and(scheduled_at.not.is.null,scheduled_at.lte.${new Date().toISOString()})`)
        .maybeSingle();

      if (!error && data) {
        setPost(data);
      }
      setLoading(false);
    };

    fetchPost();
  }, [slug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getExcerpt = (htmlContent: string, maxLength = 160) => {
    const text = htmlContent.replace(/<[^>]*>/g, "");
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  const getReadingTime = (htmlContent: string) => {
    const text = htmlContent.replace(/<[^>]*>/g, "");
    const wordCount = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(wordCount / 200);
    return `${minutes} min read`;
  };

  const getCanonicalUrl = () => {
    return `${window.location.origin}/news/${slug}`;
  };

  // Get the shareable URL - use canonical URL for direct sharing (iMessage, SMS, email)
  const getShareableUrl = () => {
    return getCanonicalUrl();
  };

  // Get the edge function URL for social platforms that properly parse OG meta
  const getOgMetaUrl = () => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const origin = encodeURIComponent(window.location.origin);
    return `${supabaseUrl}/functions/v1/og-meta?slug=${slug}&origin=${origin}`;
  };

  const shareOnFacebook = () => {
    const url = encodeURIComponent(getOgMetaUrl());
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank", "width=600,height=400");
  };

  const shareOnTwitter = () => {
    const url = encodeURIComponent(getOgMetaUrl());
    const text = encodeURIComponent(post?.title || "");
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank", "width=600,height=400");
  };

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(getOgMetaUrl());
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank", "width=600,height=400");
  };

  const copyToClipboard = async (url?: string) => {
    // Use og-meta URL for clipboard so SMS/iMessage/Line previews show correct OG tags
    const textToCopy = url || getOgMetaUrl();
    try {
      await navigator.clipboard.writeText(textToCopy);
      toast({ title: "Link copied to clipboard!" });
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      toast({ title: "Link copied to clipboard!" });
    }
  };

  // Generate slug from heading text
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  // Process content to add IDs to headings, insert featured image after ~2 paragraphs, and make headings linkable
  const { contentBeforeImage, contentAfterImage } = useMemo(() => {
    if (!post?.content) return { contentBeforeImage: "", contentAfterImage: "" };
    
    // Sanitize HTML content to prevent XSS attacks
    const sanitizedContent = DOMPurify.sanitize(post.content, {
      ADD_TAGS: ['iframe'],
      ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling', 'target'],
      ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|data):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
    });
    
    // Parse the sanitized HTML and add IDs to headings
    const parser = new DOMParser();
    const doc = parser.parseFromString(sanitizedContent, "text/html");
    
    const headings = doc.querySelectorAll("h1, h2, h3, h4, h5, h6");
    headings.forEach((heading) => {
      const text = heading.textContent || "";
      const slug = generateSlug(text);
      heading.setAttribute("id", slug);
      heading.classList.add("group", "relative", "scroll-mt-24");
      
      // Create anchor link button
      const anchor = doc.createElement("a");
      anchor.href = `#${slug}`;
      anchor.className = "anchor-link";
      anchor.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`;
      anchor.setAttribute("aria-label", `Link to ${text}`);
      
      heading.insertBefore(anchor, heading.firstChild);
    });
    
    // Split content to insert featured image after approximately 2 paragraphs (first third)
    const allElements = Array.from(doc.body.children);
    const totalElements = allElements.length;
    
    // Find break point after approximately 2 paragraphs
    let breakIndex = 0;
    let paragraphCount = 0;
    for (let i = 0; i < totalElements; i++) {
      const el = allElements[i];
      if (el.tagName === 'P') {
        paragraphCount++;
        if (paragraphCount >= 2) {
          breakIndex = i + 1; // Insert after this paragraph
          break;
        }
      }
    }
    
    // Fallback: if less than 2 paragraphs, put after first element or at 1/3 point
    if (breakIndex === 0) {
      breakIndex = Math.max(1, Math.floor(totalElements / 3));
    }
    
    const beforeElements = allElements.slice(0, breakIndex);
    const afterElements = allElements.slice(breakIndex);
    
    const beforeHtml = beforeElements.map(el => el.outerHTML).join('');
    const afterHtml = afterElements.map(el => el.outerHTML).join('');
    
    return { contentBeforeImage: beforeHtml, contentAfterImage: afterHtml };
  }, [post?.content]);

  // Handle anchor link clicks to copy full URL
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest(".anchor-link");
      if (anchor) {
        e.preventDefault();
        const href = anchor.getAttribute("href");
        if (href) {
          const fullUrl = `${getCanonicalUrl()}${href}`;
          copyToClipboard(fullUrl);
          // Update URL without reload
          window.history.pushState(null, "", href);
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, [slug]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-32 pb-20">
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-3/4 mb-4" />
              <div className="h-4 bg-muted rounded w-1/4 mb-8" />
              <div className="h-64 bg-muted rounded mb-8" />
              <div className="space-y-3">
                <div className="h-4 bg-muted rounded" />
                <div className="h-4 bg-muted rounded" />
                <div className="h-4 bg-muted rounded w-2/3" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-32 pb-20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="font-display text-3xl font-bold text-foreground mb-4">
              Post Not Found
            </h1>
            <p className="text-muted-foreground mb-8">
              The article you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/news">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to News
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const description = getExcerpt(post.content);
  // Use featured image for sharing, fallback to Melia default image
  const defaultOgImage = `${window.location.origin}/melia-og-image.png`;
  const ogImage = post.image_url || defaultOgImage;

  return (
    <>
      <Helmet>
        <title>{post.title} | Melia King Solar</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={getCanonicalUrl()} />
        <meta name="keywords" content="solar energy, renewable energy, solar installation, energy savings, Melia King Solar" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={getCanonicalUrl()} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="article:published_time" content={post.created_at} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={getCanonicalUrl()} />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>
      <ArticleSchema
        title={post.title}
        description={description}
        url={getCanonicalUrl()}
        image={ogImage}
        datePublished={post.created_at}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://meliasolar.com" },
          { name: "News", url: "https://meliasolar.com/news" },
          { name: post.title, url: getCanonicalUrl() },
        ]}
      />

      <Header />

      <main className="min-h-screen pt-32 pb-20">
        <article className="container mx-auto px-6 max-w-3xl">
          {/* Back Link */}
          <Link
            to="/news"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to News
          </Link>

          {/* Header */}
          <header className="mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-muted-foreground">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(post.created_at)}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {getReadingTime(post.content)}
              </span>
            </div>
          </header>

          {/* Content - First Half */}
          <div 
            className="blog-content prose prose-lg max-w-none text-foreground prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-strong:text-foreground prose-blockquote:border-primary prose-blockquote:text-muted-foreground prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-10 prose-h2:mb-6 prose-h2:border-b prose-h2:border-border prose-h2:pb-3"
            dangerouslySetInnerHTML={{ __html: contentBeforeImage }}
          />

          {/* Featured Image - Smaller and in middle */}
          {post.image_url && (
            <div className="my-10 flex justify-center">
              <div className="max-w-md rounded-xl overflow-hidden shadow-medium">
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="w-full h-auto"
                />
              </div>
            </div>
          )}

          {/* Content - Second Half */}
          <div 
            className="blog-content prose prose-lg max-w-none text-foreground prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-strong:text-foreground prose-blockquote:border-primary prose-blockquote:text-muted-foreground prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-10 prose-h2:mb-6 prose-h2:border-b prose-h2:border-border prose-h2:pb-3 mb-12"
            dangerouslySetInnerHTML={{ __html: contentAfterImage }}
          />

          {/* Share Buttons */}
          <div className="border-t border-border pt-8">
            <p className="text-sm font-medium text-foreground mb-4">Share this article</p>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={shareOnFacebook}
                className="gap-2"
              >
                <Facebook className="w-4 h-4" />
                Facebook
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={shareOnTwitter}
                className="gap-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                X (Twitter)
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={shareOnLinkedIn}
                className="gap-2"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard()}
                className="gap-2"
              >
                <Share2 className="w-4 h-4" />
                Copy Link
              </Button>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
};

export default BlogPost;
