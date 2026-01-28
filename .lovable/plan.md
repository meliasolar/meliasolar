
# Plan: Fix Mobile PageSpeed Performance Score

## Current Performance Issues (from PageSpeed Insights)

| Metric | Current | Target | Issue |
|--------|---------|--------|-------|
| LCP (Largest Contentful Paint) | 8.6s | < 2.5s | **Critical** |
| FCP (First Contentful Paint) | 3.5s | < 1.8s | Needs improvement |
| Speed Index | 6.6s | < 3.4s | Slow visual completion |
| Image Delivery | ~2MB savings | - | Large unoptimized images |
| Render Blocking | 330ms | - | Google Fonts blocking |

## Root Cause Analysis

1. **Hero Image Too Large**: The hero image (`hero-coastal.jpg`) is loaded at 1920x1080 even on mobile devices. On a typical phone (390px viewport), this means downloading 5-10x more pixels than needed.

2. **No Responsive Images**: All images use single-source `<img>` tags without `srcset` or `<picture>` elements, forcing mobile users to download desktop-sized assets.

3. **WebP Not Used for LCP**: WebP versions exist (`hero-solar.webp`) but aren't being served for the critical hero image.

4. **Preload Path Incorrect**: The `index.html` preloads `/src/assets/hero-coastal.jpg`, but Vite builds assets to `/assets/` with hashed names - the preload is ineffective in production.

5. **Google Fonts Render Blocking**: Despite using `media="print"` trick, fonts still block rendering on slow connections.

6. **Portfolio Carousel Imports All Images**: 12 high-resolution portfolio images are imported at module level, even though they're lazy-loaded - this increases the initial JS bundle parse time.

---

## Implementation Plan

### Phase 1: Fix Critical LCP Issue (Hero Image)

**Step 1.1: Create Mobile-Optimized Hero Image**
- Create a smaller hero image for mobile (640px wide, WebP format)
- Use `<picture>` element with `srcset` to serve appropriate sizes

**Step 1.2: Update Hero Component**
```tsx
// Use <picture> with responsive sources
<picture>
  <source 
    media="(max-width: 640px)" 
    srcSet={heroImageMobile} 
    type="image/webp"
  />
  <source 
    media="(max-width: 1024px)" 
    srcSet={heroImageTablet} 
    type="image/webp"
  />
  <img
    src={heroImage}
    alt="Solar panels on California home"
    className="w-full h-full object-cover"
    fetchPriority="high"
    decoding="sync"
  />
</picture>
```

**Step 1.3: Add Optimized Images to Public Folder**
- Place optimized WebP images in `/public/images/` for consistent preloading
- Create three sizes: mobile (640w), tablet (1024w), desktop (1920w)

### Phase 2: Fix Image Preloading

**Step 2.1: Update index.html Preload**
```html
<!-- Preload mobile-optimized hero image for LCP -->
<link 
  rel="preload" 
  as="image" 
  href="/images/hero-mobile.webp" 
  type="image/webp"
  media="(max-width: 640px)"
  fetchpriority="high" 
/>
<link 
  rel="preload" 
  as="image" 
  href="/images/hero-desktop.webp" 
  type="image/webp"
  media="(min-width: 641px)"
  fetchpriority="high" 
/>
```

### Phase 3: Optimize Font Loading

**Step 3.1: Self-Host Critical Font Weights**
- Download only the essential font weights (Inter 400, 600 and Playfair Display 700)
- Use `font-display: swap` to prevent blocking
- Inline critical font-face declarations

**Step 3.2: Update index.html**
```html
<style>
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url('/fonts/inter-400.woff2') format('woff2');
  }
  /* Similar for other weights */
</style>
```

### Phase 4: Defer Non-Critical Resources

**Step 4.1: Defer TestimonialsCarousel**
The TestimonialsCarousel is currently loaded synchronously despite being wrapped in Suspense. Move the lazy import earlier:

```tsx
// Index.tsx - ensure it's truly lazy
const TestimonialsCarousel = lazy(() => 
  import("@/components/sections/TestimonialsCarousel")
);
```

**Step 4.2: Increase Suspense Fallback Height**
Add proper skeleton placeholders to prevent layout shift:

```tsx
<Suspense fallback={<div className="min-h-[400px] bg-muted/30 animate-pulse" />}>
  <TestimonialsCarousel />
</Suspense>
```

### Phase 5: Optimize Portfolio Images

**Step 5.1: Use Dynamic Imports for Portfolio**
Instead of importing all 12 images at module load, use dynamic imports:

```tsx
// Load images only when needed
const projects = [
  { image: () => import("@/assets/portfolio/project-1.jpg"), alt: "..." },
  // ...
];
```

**Step 5.2: Add Loading State**
```tsx
<img
  src={loadedImage || placeholderSrc}
  loading="lazy"
  decoding="async"
/>
```

---

## Technical Details

### Files to Create

| File | Purpose |
|------|---------|
| `public/images/hero-mobile.webp` | 640px wide mobile hero |
| `public/images/hero-tablet.webp` | 1024px wide tablet hero |
| `public/images/hero-desktop.webp` | 1920px wide desktop hero |
| `public/fonts/inter-400.woff2` | Self-hosted Inter Regular |
| `public/fonts/inter-600.woff2` | Self-hosted Inter SemiBold |
| `public/fonts/playfair-700.woff2` | Self-hosted Playfair Bold |

### Files to Modify

| File | Changes |
|------|---------|
| `index.html` | Update preloads, inline critical fonts |
| `src/components/sections/Hero.tsx` | Use `<picture>` element with responsive sources |
| `src/pages/Index.tsx` | Improve Suspense fallbacks |
| `src/components/sections/PortfolioCarousel.tsx` | Use dynamic imports for images |
| `src/index.css` | Add self-hosted font-face declarations |

---

## Expected Impact

| Metric | Before | Expected After |
|--------|--------|----------------|
| LCP | 8.6s | ~2.5-3.0s |
| FCP | 3.5s | ~1.5-2.0s |
| Speed Index | 6.6s | ~3.0-4.0s |
| Performance Score | 62 | 80-90 |

The biggest win will come from serving appropriately-sized hero images to mobile devices. A 640px WebP image will be approximately 50-100KB vs the current 500KB+ JPG, reducing LCP by 3-5 seconds on slow 4G connections.

---

## Implementation Order

1. Create optimized hero images (WebP, multiple sizes)
2. Update Hero component with `<picture>` element
3. Fix preload in index.html
4. Self-host critical fonts
5. Optimize portfolio carousel imports
6. Add proper Suspense fallbacks
7. Test with PageSpeed Insights
