import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Base URL for the project images
const BASE_URL = "https://meliasolar.com";

// Array of available OG images for the projects page
const ogImages = [
  `${BASE_URL}/og-projects-1.png`,
  `${BASE_URL}/og-projects-2.png`,
  `${BASE_URL}/og-projects-3.png`,
  `${BASE_URL}/og-projects-4.png`,
];

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const redirectUrl = url.searchParams.get('redirect') || `${BASE_URL}/projects`;
    
    // Randomly select one of the OG images
    const randomIndex = Math.floor(Math.random() * ogImages.length);
    const selectedImage = ogImages[randomIndex];
    
    console.log(`Selected OG image: ${selectedImage} (index: ${randomIndex})`);
    
    // Meta content
    const title = "Our Projects | Melia Solar";
    const description = "Real installations across the United States. See how we're helping businesses & families save on energy costs & secure energy independence.";
    
    // Return HTML with OG meta tags that redirects to the actual page
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${BASE_URL}/projects">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${selectedImage}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="${BASE_URL}/projects">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${selectedImage}">
  
  <!-- Redirect to actual page after crawlers read the meta tags -->
  <meta http-equiv="refresh" content="0;url=${redirectUrl}">
  <link rel="canonical" href="${BASE_URL}/projects">
</head>
<body>
  <p>Redirecting to <a href="${redirectUrl}">Melia Solar Projects</a>...</p>
</body>
</html>`;

    return new Response(html, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in og-projects function:', error);
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
