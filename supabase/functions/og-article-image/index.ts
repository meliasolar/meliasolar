import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { encode as encodeBase64 } from "https://deno.land/std@0.168.0/encoding/base64.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
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
    // NOTE: Avoid `String.fromCharCode(...bytes)` which can crash with large images.
    const base64 = encodeBase64(arrayBuffer);
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
    return new Response('ok', { headers: corsHeaders });
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

    // Fetch the featured article image
    const articleImageData = await fetchImageAsBase64(articleImageUrl);

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

    // Generate SVG with tasteful blurred background + centered full image.
    // Using SVG because it's natively supported and can embed images.
    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <filter id="bgBlur" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="24"/>
      <feColorMatrix type="matrix" values="
        1 0 0 0 0
        0 1 0 0 0
        0 0 1 0 0
        0 0 0 0.95 0
      "/>
    </filter>
    <linearGradient id="vignette" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#000" stop-opacity="0.08" />
      <stop offset="100%" stop-color="#000" stop-opacity="0.20" />
    </linearGradient>
  </defs>

  <!-- Blurred background (cover) -->
  <image
    xlink:href="${articleImageData}"
    x="0"
    y="0"
    width="1200"
    height="630"
    preserveAspectRatio="xMidYMid slice"
    filter="url(#bgBlur)"
  />
  <rect width="1200" height="630" fill="url(#vignette)" />

  <!-- Foreground image (contain, no cropping) -->
  <g>
    <rect x="80" y="60" width="1040" height="510" rx="28" fill="#000" opacity="0.18" />
    <rect x="70" y="50" width="1060" height="530" rx="28" fill="#fff" opacity="0.12" />
    <image
      xlink:href="${articleImageData}"
      x="80"
      y="60"
      width="1040"
      height="510"
      preserveAspectRatio="xMidYMid meet"
    />
  </g>
</svg>`;

    console.log('Generated SVG for blurred-background OG image');

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
