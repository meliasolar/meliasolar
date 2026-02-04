
# Fix Squashed/Stretched Melia OG Image

## Problem
When sharing blog articles or pages that fall back to the default OG image, Melia's portrait is being distorted. Her face looks wrong and body appears too skinny because social platforms force a 1200x630 (landscape) aspect ratio.

## Root Cause
The `og-meta` edge function uses `melia-og-image.png` as the default fallback image. This file is a **portrait-oriented photo** (approximately 800x1200 pixels - taller than wide). When social platforms display this in their 1200x630 preview containers, they stretch the image horizontally, distorting proportions.

**Current image dimensions:**
- `melia-og-image.png`: Portrait orientation (~2:3 ratio) - **causes distortion**
- `melia-og-share.png`: Landscape orientation (1200x630) - **properly formatted for social sharing**

## Solution
Change the default fallback image from `melia-og-image.png` to `melia-og-share.png` in the edge function. The `melia-og-share.png` file is already a properly composed 1200x630 split-screen image showing Melia on the left and the purple phoenix logo on the right.

## Files to Modify

| File | Change |
|------|--------|
| `supabase/functions/og-meta/index.ts` | Change default image from `melia-og-image.png` to `melia-og-share.png` |

## Code Change

**Line 48 in `og-meta/index.ts`:**
```javascript
// Before
const defaultImage = `${origin}/melia-og-image.png`;

// After
const defaultImage = `${origin}/melia-og-share.png`;
```

## Technical Details
- The `og-meta` function serves as the entry point for social media crawlers
- When a blog post has a featured image, it uses `og-article-image` to generate a dynamic preview
- When no featured image exists, it falls back to the default image
- The `og-article-image` function also redirects to the default image on failure (lines 46 and 64) - these should also be updated for consistency

## Additional Updates
Update the `og-article-image` function fallback URLs as well:
- Line 46: Change fallback from `melia-og-image.png` to `melia-og-share.png`
- Line 64: Change fallback from `melia-og-image.png` to `melia-og-share.png`

## Expected Result
- Default share previews will show the properly formatted split-screen image
- Melia will appear with correct proportions
- The preview will include both her photo and the brand logo
- No more stretching or squashing
