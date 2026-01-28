
# Plan: Fix Social Media Sharing for Blog Articles

## Overview
This plan addresses the broken social media sharing experience and implements proper 50/50 split share images for blog articles.

---

## Current Problems Identified

Based on your screenshots:

| Platform | Issue |
|----------|-------|
| **Facebook** | Shows generic site meta ("Melia King Solar | Your Solar King") instead of article-specific content |
| **LinkedIn** | Shows raw edge function URL with no preview at all |
| **X/Twitter** | Shows article title but displays ugly edge function URL |
| **Copy Link** | Copies edge function URL which appears as "Text Document" in iMessage |

---

## Root Cause Analysis

The `og-meta` edge function approach has fundamental issues:
1. Social platforms don't reliably crawl edge function URLs
2. The immediate JavaScript redirect may execute before crawlers read meta tags
3. Mobile share dialogs show the ugly Supabase function URL to users

---

## Solution: Canonical URL Approach + Dynamic Image Generation

### Strategy Change
Instead of redirecting through an edge function, we'll:
1. **Share the canonical URL** directly (e.g., `https://meliasolar.com/news/article-slug`)
2. **Generate dynamic 50/50 split images** via a new edge function
3. **Remove the Copy Link button** since it doesn't work on iPhone

The canonical URL already has OG tags in the page's `<Helmet>`, but we'll update those to use the dynamic split image.

---

## Part 1: Remove Copy Link Button

Simply remove the "Copy Link" button from the share section since it doesn't work reliably on mobile.

### Changes to `src/pages/BlogPost.tsx`
Remove lines 395-403 (the Copy Link button).

---

## Part 2: Change Share URLs to Canonical

Update all share functions to use the canonical URL instead of the edge function URL.

### Before (current - broken)
```typescript
const shareOnFacebook = () => {
  const url = encodeURIComponent(getOgMetaUrl()); // Edge function URL
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, ...);
};
```

### After (fixed)
```typescript
const shareOnFacebook = () => {
  const url = encodeURIComponent(getCanonicalUrl()); // meliasolar.com/news/slug
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, ...);
};
```

This works because the canonical blog post page already has proper OG meta tags in the `<Helmet>` component.

---

## Part 3: Create Dynamic 50/50 Split Image Generator

Create a new edge function `og-article-image` that generates a composite image.

### Image Layout (1200×630 pixels)
```text
┌────────────────────────────────────────────────────────┐
│                                                        │
│   ┌─────────────────────┬──────────────────────────┐   │
│   │                     │                          │   │
│   │   Article Featured  │    Melia OG Branding     │   │
│   │   Image (cropped    │    (phoenix logo on      │   │
│   │   to fit 600×630)   │    white background)     │   │
│   │                     │                          │   │
│   └─────────────────────┴──────────────────────────┘   │
│                                                        │
│              1200 × 630 pixels total                   │
└────────────────────────────────────────────────────────┘
```

### Edge Function: `supabase/functions/og-article-image/index.ts`

The function will:
1. Accept an `image` parameter (the article's featured image URL)
2. Fetch both images (article image + Melia branding from `/melia-og-image.png`)
3. Use canvas compositing to create the 50/50 split
4. Return the resulting PNG with appropriate cache headers

### Technical Approach
Use `satori` + `resvg-js` (same approach as Vercel OG) to render HTML/CSS to an image:

```typescript
// Pseudo-code for the edge function
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

// Generate HTML layout
const html = (
  <div style={{ display: 'flex', width: 1200, height: 630 }}>
    <img src={articleImage} style={{ width: 600, height: 630, objectFit: 'cover' }} />
    <img src={meliaOgImage} style={{ width: 600, height: 630, objectFit: 'cover' }} />
  </div>
);

// Convert to SVG, then to PNG
const svg = await satori(html, { width: 1200, height: 630 });
const png = new Resvg(svg).render().asPng();

return new Response(png, { headers: { 'Content-Type': 'image/png' } });
```

### Fallback
If the article has no featured image, return the default `melia-og-image.png` without splitting.

---

## Part 4: Update OG Image Tags

Update the `<Helmet>` OG image to point to the dynamic image generator.

### In `src/pages/BlogPost.tsx`

```typescript
// Generate the composite OG image URL
const getOgImageUrl = () => {
  if (!post?.image_url) {
    return `${window.location.origin}/melia-og-image.png`;
  }
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  return `${supabaseUrl}/functions/v1/og-article-image?image=${encodeURIComponent(post.image_url)}`;
};

// In Helmet
<meta property="og:image" content={getOgImageUrl()} />
<meta name="twitter:image" content={getOgImageUrl()} />
```

---

## Files to Modify/Create

| File | Action | Purpose |
|------|--------|---------|
| `src/pages/BlogPost.tsx` | Modify | Remove Copy Link button, update share functions to use canonical URL, update OG image to use composite |
| `supabase/functions/og-article-image/index.ts` | Create | New function to generate 50/50 split images |
| `supabase/functions/og-meta/index.ts` | Keep (optional cleanup later) | May be deprecated but leave for now |

---

## Technical Considerations

### Edge Function Dependencies
The `og-article-image` function will use:
- `satori` - Converts HTML/CSS to SVG
- `@resvg/resvg-js` - Converts SVG to PNG
- These are well-tested libraries used by Vercel's OG image generation

### Caching
Add appropriate cache headers so images aren't regenerated on every request:
```typescript
'Cache-Control': 'public, max-age=86400, s-maxage=86400' // 24 hours
```

### Image Dimensions
- Output: 1200×630 (standard OG image size)
- Left half: 600×630 (article image, cropped to cover)
- Right half: 600×630 (Melia branding)

---

## Expected Results After Implementation

| Platform | Expected Behavior |
|----------|-------------------|
| **Facebook** | Shows article title, excerpt, and 50/50 split image |
| **LinkedIn** | Shows article title, excerpt, and 50/50 split image |
| **X/Twitter** | Shows article title, excerpt, and 50/50 split image |
| **iMessage** | Shows article preview with proper image (when sharing canonical URL) |

---

## Testing Checklist

1. Share an article to Facebook - verify title, description, and split image appear
2. Share an article to LinkedIn - verify proper preview
3. Share an article to X/Twitter - verify proper preview
4. Test article without featured image - should show default Melia OG image
5. Verify Copy Link button is removed
6. Use Facebook Sharing Debugger to validate OG tags: https://developers.facebook.com/tools/debug/
