
# Plan: Fix Blog Thumbnails and Favicon Issues

## Overview
This plan addresses two issues: (1) blog grid thumbnails cropping images poorly, and (2) the wrong favicon appearing in Chrome due to an unreplaced SVG file.

---

## Part 1: Blog Grid Thumbnail Fix

### Current Problem
- Images with different aspect ratios (like the phoenix logo) get cropped when displayed in the 16:9 thumbnail area
- The `object-cover` CSS forces images to fill the space by cropping

### Solution: Show Full Image with Blurred Background
Instead of cropping, the image will be shown in full with a blurred, scaled-up version as the background. This keeps all cards the same size while showing the entire image.

### Changes to `src/pages/Blog.tsx`

**Before (cropping)**:
```tsx
<div className="aspect-[16/9] overflow-hidden">
  <img
    src={post.image_url}
    alt={post.title}
    className="w-full h-full object-cover object-center ..."
  />
</div>
```

**After (full image + blurred background)**:
```tsx
<div className="aspect-[16/9] overflow-hidden relative bg-muted">
  {/* Blurred background */}
  <img
    src={post.image_url}
    alt=""
    aria-hidden="true"
    className="absolute inset-0 w-full h-full object-cover scale-110 blur-xl opacity-60"
  />
  {/* Actual image centered */}
  <img
    src={post.image_url}
    alt={post.title}
    className="relative w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
  />
</div>
```

### Recommended Upload Dimensions
For best results, upload images at **1200 x 675 pixels** (16:9 ratio). However, the new implementation will gracefully handle any image dimensions.

---

## Part 2: Favicon Fix for Chrome

### Root Cause
The file `public/favicon.svg` contains a generic purple sun icon (Lovable branding) that was never replaced:

```xml
<linearGradient ... >
  <stop offset="0%" style="stop-color:#8b5cf6"/>  <!-- Purple = Lovable -->
</linearGradient>
```

Chrome and other browsers auto-discover `/favicon.svg` and prefer it over `.ico` files.

### Solution: Replace favicon.svg and apple-touch-icon.png with Phoenix Logo

**Files to update:**
1. **`public/favicon.svg`** - Replace with a proper SVG version of the phoenix logo
2. **`public/apple-touch-icon.png`** - Already correct (no change needed)

### New favicon.svg Content
Create an SVG that references the phoenix logo visually. Since the logo is a complex graphic, the SVG will be a simplified version or we can convert the PNG to an inline SVG-based image.

The cleanest approach is to create a simple SVG wrapper that maintains brand consistency with the purple phoenix theme.

---

## Implementation Summary

| File | Action | Purpose |
|------|--------|---------|
| `src/pages/Blog.tsx` | Modify | Add blurred background layer for thumbnails |
| `public/favicon.svg` | Replace | Remove Lovable sun icon, add phoenix-themed favicon |

---

## Testing After Implementation

1. **Blog page**: Verify all thumbnails show full images with nice blurred backgrounds
2. **Favicon in Chrome**: 
   - Hard refresh (Ctrl+Shift+R / Cmd+Shift+R)
   - Navigate to `chrome://settings/clearBrowserData` and clear cached images
   - Directly visit `https://meliasolar.com/favicon.svg` to confirm new icon
   - Check browser tab shows purple phoenix

---

## Technical Notes

- The blurred background technique is commonly used on platforms like YouTube and Spotify
- No performance impact: same image loaded once, browser caches it
- Maintains consistent card heights regardless of uploaded image dimensions
- The favicon.svg replacement is the definitive fix for Chrome's favicon caching
