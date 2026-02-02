
# PageSpeed Fixes & Image Replacement Plan

## Summary

This plan addresses:
1. Replace 3 images with new uploaded versions
2. **Keep old logo.webp** (renamed) since it's used in SEO schema markup
3. Fix PageSpeed issues from the network dependency tree screenshot

---

## Part 1: Image Replacements

### Images to Replace

| Current File | New File | Used In |
|-------------|----------|---------|
| `public/images/hero-mobile.webp` | `user-uploads://hero-2.webp` | Hero section background (mobile) |
| `public/images/melia-portrait.webp` | `user-uploads://Melia_on_stage-2.webp` | Meet Melia section |
| `public/images/logo.webp` → **renamed to** `logo-old.webp` | Keep for SEO schemas | LocalBusinessSchema, ArticleSchema |
| New: `public/images/logo.webp` | `user-uploads://phoenix_purple_70x70.webp` | Header & Footer |

### Logo File Strategy (Keep Old Logo)

The old logo is referenced in **SEO Schema markup**:
- `src/components/seo/LocalBusinessSchema.tsx` line 15: `"logo": "https://meliasolar.com/images/logo.webp"`
- `src/components/seo/ArticleSchema.tsx` line 42: publisher logo

**Action:** Rename old logo to `logo-old.webp`, then copy new logo to `logo.webp`. Update schema files to point to `logo-old.webp` to preserve the existing branding in structured data.

---

## Part 2: PageSpeed Fixes - Critical Path Optimization

The screenshot shows a **1,803ms critical path latency** with many JavaScript chunks loading sequentially. Key issues:

### Issue 1: Render-Blocking CSS (Est. 300ms savings)
- `/assets/index-liqMOeiU.css` - 13.73 KiB, 700ms
- **Fix:** The CSS is already inlined in index.html for critical styles. The main CSS file is deferred by Vite naturally.

### Issue 2: Long JavaScript Chain
The network tree shows excessive JS chunk loading:
- `index-DhMKBaNl.js` - 843ms, 154.46 KiB (main bundle)
- `About-Cl-IGQWc.js` - 1,558ms  
- `WhySolar-CKztcc14.js` - 1,550ms
- `SavingsCalculator...js` - 1,803ms (longest)
- `TestimonialsCarousel...js` - 1,617ms
- `MeliaVideoWidget...js` - 1,532ms

**Current lazy loading strategy in Index.tsx is good**, but we can improve by:

### Fix A: Reduce initial bundle - Remove unused Toaster components

Currently `App.tsx` imports **two** toaster libraries:
```tsx
import { Toaster } from "@/components/ui/toaster";      // Heavy
import { Toaster as Sonner } from "@/components/ui/sonner";  // Lighter
```

**Action:** Remove the duplicate Toaster if only one is used, or lazy load them.

### Fix B: Defer more sections in Index.tsx

Current deferred sections:
- ✅ TestimonialsCarousel (deferred with IntersectionObserver)
- ✅ PortfolioCarousel (deferred with IntersectionObserver)
- ✅ MeliaVideoWidget (deferred with requestIdleCallback)

Could also defer:
- WhySolar
- SavingsCalculator

**Action:** Wrap WhySolar and SavingsCalculator in IntersectionObserver-based loading like TestimonialsCarousel to reduce initial JS payload.

### Fix C: Preconnect to Supabase for faster API requests

The site likely makes requests to Supabase. Add preconnect hints in index.html.

**Action:** Add to `index.html`:
```html
<link rel="preconnect" href="https://tccujdytaskukotfjapn.supabase.co" />
```

---

## Part 3: Code Changes

### File 1: `public/images/logo-old.webp`
- Copy existing `logo.webp` to `logo-old.webp` before overwriting

### File 2: `public/images/logo.webp`  
- Replace with `user-uploads://phoenix_purple_70x70.webp`

### File 3: `public/images/hero-mobile.webp`
- Replace with `user-uploads://hero-2.webp`

### File 4: `public/images/melia-portrait.webp`
- Replace with `user-uploads://Melia_on_stage-2.webp`

### File 5: `src/components/seo/LocalBusinessSchema.tsx`
- Line 15: Change `logo.webp` → `logo-old.webp`

### File 6: `src/components/seo/ArticleSchema.tsx`
- Line 42: Change `logo.webp` → `logo-old.webp`

### File 7: `src/components/layout/Header.tsx`
- Update logo dimensions to match new 70x70 image (currently set to 40x40 display size - this is fine, but width/height attributes should reflect actual image size for proper resource hinting)

### File 8: `src/pages/Index.tsx`
- Add IntersectionObserver deferred loading for WhySolar and SavingsCalculator sections
- Reduce initial JavaScript bundle size further

### File 9: `index.html`
- Add preconnect hint for Supabase API

---

## Implementation Order

1. **Copy old logo** to `logo-old.webp`
2. **Replace images** (logo, hero-mobile, melia-portrait)
3. **Update SEO schemas** to reference `logo-old.webp`
4. **Update Index.tsx** to defer more sections
5. **Add preconnect** in index.html

---

## Expected Results

After implementation:
- New purple phoenix logo displays in header/footer
- New hero image loads for mobile visitors
- New Melia stage photo in Meet Melia section
- Old logo preserved for SEO structured data
- Reduced initial JavaScript bundle (fewer chunks blocking LCP)
- Faster API connections via preconnect hints
- Critical path latency reduced from 1,803ms
