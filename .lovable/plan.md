
# Performance Optimization Plan: Replace JPG Images with WebP

## Overview

This plan will replace existing JPG images in `src/assets/portfolio/` with the optimized WebP versions you've provided, move them to `public/images/portfolio/` for proper caching, update all component references, and delete the old JPG files. This will significantly reduce image payload and improve PageSpeed scores.

---

## Image Mapping

Based on the uploaded images and current files:

| Uploaded File | Replaces | Description |
|---------------|----------|-------------|
| `1.webp` | `project-1.jpg` | Worker installing solar panel on tile roof |
| `2.webp` | `project-2.jpg` | Desert aerial view with mountains |
| `3.webp` | `project-3.jpg` | Overhead aerial - multiple roofs with pool |
| `4.webp` | `project-5.jpg` | Commercial flat roof installation |
| `5.webp` | `project-7.jpg` | Construction site commercial |
| `6.webp` | `project-8.jpg` | Panoramic hillside view |
| `8.webp` | `project-9.jpg` | Luxury estate with pool aerial |
| `hero.webp` | `hero-desktop.webp` and `hero-mobile.webp` | New hero image |
| `T3.webp` | `tesla-3.jpg` | Multiple Tesla Powerwall batteries |

---

## Phase 1: Copy WebP Images to public/images/portfolio/

Create the folder structure and copy all uploaded images:

```text
public/images/portfolio/
  project-1.webp   (from 1.webp)
  project-2.webp   (from 2.webp)
  project-3.webp   (from 3.webp)
  project-5.webp   (from 4.webp)
  project-7.webp   (from 5.webp)
  project-8.webp   (from 6.webp)
  project-9.webp   (from 8.webp)
  tesla-3.webp     (from T3.webp)
```

Also replace the hero images:
```text
public/images/
  hero-desktop.webp  (from hero.webp)
  hero-mobile.webp   (from hero.webp - same image for both)
```

---

## Phase 2: Delete Old JPG Files from src/assets/portfolio/

Remove all JPG files that have been replaced:

| File to Delete |
|----------------|
| `src/assets/portfolio/project-1.jpg` |
| `src/assets/portfolio/project-2.jpg` |
| `src/assets/portfolio/project-3.jpg` |
| `src/assets/portfolio/project-5.jpg` |
| `src/assets/portfolio/project-7.jpg` |
| `src/assets/portfolio/project-8.jpg` |
| `src/assets/portfolio/project-9.jpg` |
| `src/assets/portfolio/tesla-3.jpg` |

**Note:** The following files remain (no replacement provided):
- `project-4.jpg`, `project-10.jpg`, `project-11.jpg`, `project-12.jpg`, `project-13.jpg`, `project-14.jpg`
- `tesla-1.jpg`, `tesla-2.jpg`

---

## Phase 3: Update PortfolioCarousel.tsx

Change from dynamic imports (which bundle images into JS) to static paths:

```typescript
const projectImages = [
  { path: "/images/portfolio/project-1.webp", alt: "..." },
  { path: "/images/portfolio/tesla-1.webp", alt: "..." },
  // ... etc
];
```

Remove the dynamic import logic and use simple `<img src={project.path}>` instead.

---

## Phase 4: Update Projects.tsx Page

Change imports from `src/assets/` to static paths:

```typescript
// Before:
import project1 from "@/assets/portfolio/project-1.jpg";

// After:
const project1 = "/images/portfolio/project-1.webp";
```

---

## Phase 5: Remaining Images to Convert Later

The following images still need WebP versions (not provided in this upload):

| Current File | Status |
|--------------|--------|
| `project-4.jpg` | Needs WebP |
| `project-10.jpg` | Needs WebP |
| `project-11.jpg` | Needs WebP |
| `project-12.jpg` | Needs WebP |
| `project-13.jpg` | Needs WebP |
| `project-14.jpg` | Needs WebP |
| `tesla-1.jpg` | Needs WebP |
| `tesla-2.jpg` | Needs WebP |

---

## Technical Changes Summary

### Files to Create/Copy
| Source | Destination |
|--------|-------------|
| `user-uploads://1.webp` | `public/images/portfolio/project-1.webp` |
| `user-uploads://2.webp` | `public/images/portfolio/project-2.webp` |
| `user-uploads://3.webp` | `public/images/portfolio/project-3.webp` |
| `user-uploads://4.webp` | `public/images/portfolio/project-5.webp` |
| `user-uploads://5.webp` | `public/images/portfolio/project-7.webp` |
| `user-uploads://6.webp` | `public/images/portfolio/project-8.webp` |
| `user-uploads://8.webp` | `public/images/portfolio/project-9.webp` |
| `user-uploads://T3.webp` | `public/images/portfolio/tesla-3.webp` |
| `user-uploads://hero.webp` | `public/images/hero-desktop.webp` (replace) |
| `user-uploads://hero.webp` | `public/images/hero-mobile.webp` (replace) |

### Files to Delete
- `src/assets/portfolio/project-1.jpg`
- `src/assets/portfolio/project-2.jpg`
- `src/assets/portfolio/project-3.jpg`
- `src/assets/portfolio/project-5.jpg`
- `src/assets/portfolio/project-7.jpg`
- `src/assets/portfolio/project-8.jpg`
- `src/assets/portfolio/project-9.jpg`
- `src/assets/portfolio/tesla-3.jpg`

### Files to Modify
| File | Changes |
|------|---------|
| `src/components/sections/PortfolioCarousel.tsx` | Use static paths instead of dynamic imports |
| `src/pages/Projects.tsx` | Change imports to static string paths |

---

## Expected Performance Impact

| Metric | Before | After |
|--------|--------|-------|
| Image payload | ~3 MB bundled | ~500 KB cached |
| JS bundle | Contains image data | Clean, no images |
| LCP | 8.1s | < 2.5s |
| Performance Score | 66-68 | 85-95+ |

---

## Implementation Order

1. Copy all 9 WebP images to `public/images/portfolio/`
2. Replace hero images in `public/images/`
3. Update `PortfolioCarousel.tsx` to use static paths
4. Update `Projects.tsx` to use static paths
5. Delete old JPG files from `src/assets/portfolio/`
6. Verify all images load correctly
