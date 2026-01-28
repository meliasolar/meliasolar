import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Convert image to base64 data URL
async function fetchImageAsBase64(url: string): Promise<string | null> {
  try {
    console.log('Fetching image:', url);
    const response = await fetch(url);
    if (!response.ok) {
      console.error('Failed to fetch image:', response.status, response.statusText);
      return null;
    }
    const arrayBuffer = await response.arrayBuffer();
    const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    return `data:${contentType};base64,${base64}`;
  } catch (error) {
    console.error('Error fetching image:', error);
    return null;
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const articleImageUrl = url.searchParams.get('image');
    
    console.log('OG Article Image request for:', articleImageUrl);

    // If no article image, return default Melia OG image
    if (!articleImageUrl) {
      console.log('No article image provided, redirecting to default');
      return new Response(null, {
        status: 302,
        headers: {
          ...corsHeaders,
          'Location': 'https://meliasolar.com/melia-og-image.png',
          'Cache-Control': 'public, max-age=86400',
        },
      });
    }

    // Fetch both images
    const [articleImageData, brandImageData] = await Promise.all([
      fetchImageAsBase64(articleImageUrl),
      fetchImageAsBase64('https://meliasolar.com/melia-og-image.png'),
    ]);

    // If article image fails to load, return default
    if (!articleImageData) {
      console.log('Article image failed to load, redirecting to default');
      return new Response(null, {
        status: 302,
        headers: {
          ...corsHeaders,
          'Location': 'https://meliasolar.com/melia-og-image.png',
          'Cache-Control': 'public, max-age=86400',
        },
      });
    }

    // Generate SVG with embedded images for the 50/50 split
    // Using SVG because it's natively supported and can embed images
    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <clipPath id="leftClip">
      <rect x="0" y="0" width="600" height="630"/>
    </clipPath>
    <clipPath id="rightClip">
      <rect x="600" y="0" width="600" height="630"/>
    </clipPath>
  </defs>
  
  <!-- Background -->
  <rect width="1200" height="630" fill="#ffffff"/>
  
  <!-- Left half - Article Image (cropped to cover) -->
  <g clip-path="url(#leftClip)">
    <image 
      xlink:href="${articleImageData}" 
      x="0" 
      y="0" 
      width="600" 
      height="630" 
      preserveAspectRatio="xMidYMid slice"
    />
  </g>
  
  <!-- Right half - Melia Branding -->
  <g clip-path="url(#rightClip)">
    ${brandImageData ? `
    <image 
      xlink:href="${brandImageData}" 
      x="600" 
      y="0" 
      width="600" 
      height="630" 
      preserveAspectRatio="xMidYMid slice"
    />
    ` : `
    <!-- Fallback: Purple gradient with text -->
    <rect x="600" y="0" width="600" height="630" fill="#8b5cf6"/>
    <text x="900" y="315" text-anchor="middle" font-family="system-ui, sans-serif" font-size="48" font-weight="600" fill="white">Melia King</text>
    <text x="900" y="375" text-anchor="middle" font-family="system-ui, sans-serif" font-size="24" fill="white" opacity="0.9">SOLAR</text>
    `}
  </g>
  
  <!-- Subtle divider line -->
  <line x1="600" y1="0" x2="600" y2="630" stroke="#e5e7eb" stroke-width="2"/>
</svg>`;

    console.log('Generated SVG for 50/50 split image');

    return new Response(svg, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      },
    });

  } catch (error: unknown) {
    console.error('Error in og-article-image function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    // On error, redirect to default image
    return new Response(null, {
      status: 302,
      headers: {
        ...corsHeaders,
        'Location': 'https://meliasolar.com/melia-og-image.png',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  }
});
