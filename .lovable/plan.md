# Performance Optimization Plan: Target Score 95+

## Current Progress

| Metric | Before | After Phase 1 | Target |
|--------|--------|---------------|--------|
| Performance Score | 68 | **88** ✅ | 95+ |
| LCP | 8.1s | **3.2s** | < 2.5s |
| FCP | 1.9s | 1.9s | < 1.8s |
| Speed Index | 6.4s | **4.5s** | < 3.0s |
| CLS | 0 | 0.075 | < 0.1 |
| TBT | 0ms | 0ms ✅ | 0ms |

---

## Completed ✅

### Phase 1: Portfolio Image Optimization
- [x] Copied 8 WebP images to `public/images/portfolio/`
- [x] Updated hero images to WebP
- [x] Refactored `PortfolioCarousel.tsx` to use static paths
- [x] Refactored `Projects.tsx` to use static paths
- [x] Deleted old JPG files from `src/assets/portfolio/`

---

## Remaining Work

### Phase 2: Convert Remaining Portfolio Images to WebP

**User action required** - Upload WebP versions of:

| Current File | Location | Status |
|--------------|----------|--------|
| `project-4.jpg` | `src/assets/portfolio/` | ⏳ Needs WebP |
| `project-10.jpg` | `src/assets/portfolio/` | ⏳ Needs WebP |
| `project-11.jpg` | `src/assets/portfolio/` | ⏳ Needs WebP |
| `project-12.jpg` | `src/assets/portfolio/` | ⏳ Needs WebP |
| `project-13.jpg` | `src/assets/portfolio/` | ⏳ Needs WebP |
| `project-14.jpg` | `src/assets/portfolio/` | ⏳ Needs WebP |
| `tesla-1.jpg` | `src/assets/portfolio/` | ⏳ Needs WebP |
| `tesla-2.jpg` | `src/assets/portfolio/` | ⏳ Needs WebP |

---

### Phase 3: Convert Service Images to WebP

**User action required** - Upload WebP versions of:

| Current File | Est. Size | Target |
|--------------|-----------|--------|
| `hvac-service.jpg` | ~200KB | < 50KB |
| `quietcool-service.jpg` | ~200KB | < 50KB |
| `roofing-service.jpg` | ~200KB | < 50KB |
| `tesla-supercharger-service.jpg` | ~200KB | < 50KB |

After upload:
- Copy to `public/images/services/`
- Update `Services.tsx` and `TeslaSupercharger.tsx`
- Delete old JPGs

---

### Phase 4: Convert Instagram Images to WebP

**User action required** - Upload WebP versions of:

| Current File | Target Size |
|--------------|-------------|
| `insta-1.jpg` | < 30KB |
| `insta-2.jpg` | < 30KB |
| `insta-3.jpg` | < 30KB |
| `insta-4.jpg` | < 30KB |
| `insta-5.jpg` | < 30KB |

After upload:
- Copy to `public/images/instagram/`
- Update `InstagramFeed.tsx`
- Delete old JPGs

---

### Phase 5: Fix CLS (0.075)

Add explicit `width` and `height` attributes to all images to prevent layout shift:

```tsx
<img 
  src="/images/portfolio/project-1.webp"
  alt="..."
  width={800}
  height={600}
  loading="lazy"
/>
```

---

### Phase 6: Optimize Melia Portrait

The `melia-portrait.webp` (currently ~200KB) could be optimized further:
- Create mobile version: 400px width, < 50KB
- Create desktop version: 800px width, < 100KB
- Use `<picture>` element with srcset

---

## Image Compression Settings

Use https://squoosh.app with these settings:

| Image Type | Format | Quality | Max Width |
|------------|--------|---------|-----------|
| Portfolio | WebP | 80% | 800px |
| Services | WebP | 80% | 600px |
| Instagram | WebP | 75% | 400px |
| Portrait | WebP | 85% | 800px |

---

## Expected Final Results

| Metric | Current | After All Phases |
|--------|---------|------------------|
| Performance Score | 88 | 95+ |
| LCP | 3.2s | < 2.0s |
| Image Savings | 1,726 KiB | 0 KiB |
| Total Image Payload | ~2 MB | < 500 KB |

---

## Next Action

**User to provide:**
1. WebP versions of remaining 8 portfolio images (project-4, 10-14, tesla-1-2)
2. WebP versions of 4 service images
3. WebP versions of 5 Instagram images

Or prioritize: Just upload the **portfolio images** first for biggest impact.
