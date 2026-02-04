

# Blog Article Share Image Fix

## Problem Summary
When sharing blog article URLs (e.g., `/news/how-solar-beat-coal-gas-nuclear-combined`) on social media platforms like Facebook, Twitter, LinkedIn, or iMessage, the featured image is not appearing in the share preview. Instead, the default site image is shown.

## Root Cause
The current architecture has a working edge function setup, but **Lovable's hosting does not process the `public/_redirects` file** for proxy rewrites. This means:

1. The `og-meta` edge function correctly generates HTML with proper OG meta tags (verified working when called directly)
2. The `og-article-image` edge function correctly generates dynamic share images with blurred backgrounds
3. However, requests to `/news/*` are served directly by the SPA instead of being proxied to the edge function
4. Social media crawlers (which don't execute JavaScript) only see the default meta tags from `index.html`, not the dynamic article-specific tags

## Solution Overview
Since Lovable hosting doesn't support proxy rewrites, we need an alternative approach. The recommended solution is to **modify the share URLs to use the edge function directly** for social media sharing purposes.

### How It Works
1. Create a new shareable URL pattern that goes through the edge function
2. The edge function serves crawler-friendly HTML with proper OG tags
3. Users clicking shared links get redirected to the SPA automatically (the edge function already does this)

---

## Implementation Details

### 1. Update Edge Function URL Pattern
Modify the `og-meta` edge function to handle requests at a dedicated path that can be used for sharing.

**Current flow (broken):**
```text
Social share URL: meliasolar.com/news/article-slug
     ↓
Lovable hosting (ignores _redirects)
     ↓
Serves SPA index.html
     ↓
Crawler sees default meta tags ❌
```

**New flow (working):**
```text
Social share URL: [supabase-url]/functions/v1/og-meta?slug=article-slug
     ↓
Edge function serves HTML with OG tags
     ↓
Crawler sees article-specific meta tags ✓
     ↓
Real users redirected to meliasolar.com/news/article-slug
```

### 2. Simplify by Using Direct Edge Function URLs
Since the edge function already:
- Generates proper OG meta tags with article title, description, and featured image
- Includes JavaScript redirect for real users to the actual SPA page
- Returns correct canonical URLs pointing to the real site

We can use the edge function URL directly as the shareable link.

### 3. Add a "Copy Share Link" Feature to Blog Posts
Add a button on blog post pages that copies a crawler-friendly share URL. This gives users an optimized link to share that will display proper previews.

**Implementation:**
- Add a share button to `BlogPost.tsx`
- The button copies the edge function URL with the article slug
- When shared, crawlers see the proper meta tags
- Users clicking the link get redirected to the real page

### 4. Alternative: Custom Domain with CDN
For a more seamless experience (using the actual domain for share URLs), the site can be configured with a CDN like Cloudflare that supports edge redirects. This would require:
- Enabling "Allow traffic through a CDN or proxy" in Lovable domain settings
- Configuring Cloudflare Page Rules or Workers to proxy `/news/*` to the edge function for crawler user agents

---

## Files to Modify

| File | Change |
|------|--------|
| `src/pages/BlogPost.tsx` | Add share button that copies edge function URL |
| `src/components/ui/` (new) | Create ShareButton component |

## Files Unchanged
- Edge functions (`og-meta`, `og-article-image`) - already working correctly
- `public/_redirects` - can be removed or kept for documentation

---

## Technical Notes

- The edge function URL format: `https://tccujdytaskukotfjapn.supabase.co/functions/v1/og-meta?slug=ARTICLE_SLUG`
- The edge function returns HTML with:
  - Proper OG meta tags (title, description, image)
  - Twitter card meta tags
  - A meta refresh redirect to the real page
  - JavaScript redirect as backup
- The `og-article-image` function generates a 1200x630 SVG with blurred background effect

## Expected Outcome
When users share the special share link:
1. Facebook, Twitter, LinkedIn, iMessage will display the article's featured image
2. The preview will show the correct title and description
3. Clicking the shared link takes users to the actual blog post on meliasolar.com

