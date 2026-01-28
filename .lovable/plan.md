
# Plan: Fix Social Media Share Previews for Blog Articles

## Problem Summary
When sharing blog articles on iMessage (and other social platforms), the preview shows the default Melia OG image (Melia's photo + purple phoenix logo) instead of the article's featured image.

## Root Cause
Two issues are preventing the correct share images from appearing:

1. **Edge functions not working**: The `og-meta` and `og-article-image` functions use an outdated Deno API (`serve()` from `std@0.168.0`) instead of the modern `Deno.serve()`. This is why they return 404 errors while the `sitemap` function (which uses `Deno.serve()`) works correctly.

2. **No crawler routing**: Social media crawlers request `/news/article-slug` and receive the static `index.html` with generic OG tags. There's no mechanism to route these requests to the `og-meta` edge function.

## Solution Overview
We need to:
1. Update both edge functions to use the modern `Deno.serve()` API
2. Modify the `og-meta` function to use the article's featured image directly in OG tags
3. Add redirect rules to route blog article requests through the OG meta function for crawlers

---

## Technical Implementation

### Step 1: Update og-article-image edge function
Migrate from deprecated `serve()` to `Deno.serve()`:

```typescript
// Change from:
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
serve(async (req) => { ... });

// To:
Deno.serve(async (req) => { ... });
```

### Step 2: Update og-meta edge function  
1. Migrate to `Deno.serve()` API
2. Update to use the `og-article-image` function URL for dynamic image generation:

```typescript
// Update OG image URL generation
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const ogImage = post.image_url 
  ? `${supabaseUrl}/functions/v1/og-article-image?image=${encodeURIComponent(post.image_url)}`
  : defaultImage;
```

### Step 3: Add redirect rules for blog articles
Update `public/_redirects` to route `/news/:slug` requests to the `og-meta` function:

```text
# Existing sitemap redirect
/sitemap.xml https://tccujdytaskukotfjapn.supabase.co/functions/v1/sitemap 200

# NEW: Route blog article requests to og-meta for crawler support
/news/* https://tccujdytaskukotfjapn.supabase.co/functions/v1/og-meta?slug=:splat 200
```

### Step 4: Update og-meta to extract slug from path
Modify the function to handle the `:splat` parameter from the redirect:

```typescript
// Extract slug from query param OR from path
const slug = url.searchParams.get('slug') 
  || url.pathname.split('/').pop();
```

---

## Files to Modify

| File | Change |
|------|--------|
| `supabase/functions/og-meta/index.ts` | Update to `Deno.serve()`, fix image URL, handle splat param |
| `supabase/functions/og-article-image/index.ts` | Update to `Deno.serve()` |
| `public/_redirects` | Add `/news/*` redirect rule |
| `supabase/config.toml` | Add sitemap function config (currently missing) |

---

## Expected Result
After implementation:
- When sharing any blog article URL, the preview will show the article's featured image with a tasteful blurred background
- Regular users visiting `/news/article-slug` will still see the full React SPA
- Social crawlers will receive pre-rendered HTML with correct OG tags and then redirect users to the actual page

## Testing Plan
1. Deploy updated edge functions
2. Test `og-meta` function directly with curl
3. Test `og-article-image` function directly with curl  
4. Share a blog article link in iMessage to verify the preview shows the correct featured image
