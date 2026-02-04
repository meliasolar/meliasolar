import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    // Extract slug from query param (from redirect :splat) or path
    const slug = url.searchParams.get('slug') || url.pathname.split('/').pop();
    
    console.log('OG Meta request for slug:', slug);

    if (!slug) {
      console.log('No slug provided');
      return new Response('Missing slug parameter', { status: 400 });
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch the blog post (including scheduled posts that have gone live)
    const now = new Date().toISOString();
    const { data: post, error } = await supabase
      .from('blog_posts')
      .select('id, title, content, image_url, created_at, slug, scheduled_at')
      .eq('slug', slug)
      .or(`published.eq.true,and(scheduled_at.not.is.null,scheduled_at.lte.${now})`)
      .maybeSingle();

    if (error) {
      console.error('Database error:', error);
      return new Response('Database error', { status: 500 });
    }

    // Get the origin for building URLs
    const origin = 'https://meliasolar.com';
    const canonicalUrl = `${origin}/news/${slug}`;
    const defaultImage = `${origin}/melia-og-share.png`;

    if (!post) {
      console.log('Post not found for slug:', slug);
      // Return default meta for non-existent posts
      const html = generateHtml({
        title: 'Post Not Found | Melia King Solar',
        description: 'The article you are looking for does not exist.',
        image: defaultImage,
        url: canonicalUrl,
        redirectUrl: canonicalUrl,
      });
      return new Response(html, {
        headers: { ...corsHeaders, 'Content-Type': 'text/html; charset=utf-8' },
      });
    }

    // Generate excerpt from content
    const excerpt = post.content
      .replace(/<[^>]*>/g, '')
      .substring(0, 160)
      .trim() + '...';

    // Use the og-article-image function to generate a nice OG image with blurred background
    const ogImage = post.image_url 
      ? `${supabaseUrl}/functions/v1/og-article-image?image=${encodeURIComponent(post.image_url)}`
      : defaultImage;

    console.log('Generating OG meta for:', post.title);
    console.log('OG Image:', ogImage);

    const html = generateHtml({
      title: post.title,
      description: excerpt,
      image: ogImage,
      url: canonicalUrl,
      redirectUrl: canonicalUrl,
    });

    return new Response(html, {
      headers: { ...corsHeaders, 'Content-Type': 'text/html; charset=utf-8' },
    });

  } catch (error: unknown) {
    console.error('Error in og-meta function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function generateHtml(params: {
  title: string;
  description: string;
  image: string;
  url: string;
  redirectUrl: string;
}): string {
  const { title, description, image, url, redirectUrl } = params;
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Primary Meta Tags -->
  <title>${escapeHtml(title)}</title>
  <meta name="title" content="${escapeHtml(title)}">
  <meta name="description" content="${escapeHtml(description)}">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="${escapeHtml(url)}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:image" content="${escapeHtml(image)}">
  <meta property="og:site_name" content="Melia King Solar">
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="${escapeHtml(url)}">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${escapeHtml(image)}">
  
  <!-- Redirect to actual page (for real users, not crawlers) -->
  <meta http-equiv="refresh" content="0;url=${escapeHtml(redirectUrl)}">
  <link rel="canonical" href="${escapeHtml(url)}">
  
  <script>
    window.location.replace("${escapeHtml(redirectUrl)}");
  </script>
</head>
<body>
  <p>Redirecting to <a href="${escapeHtml(redirectUrl)}">${escapeHtml(title)}</a>...</p>
</body>
</html>`;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
