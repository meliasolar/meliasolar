
# Plan: Fix Mobile PageSpeed Performance Score + Accessibility Issues

## Current State Analysis

### Performance Issues

| Issue | Current Impact | Savings |
|-------|----------------|---------|
| Cache lifetimes | No caching configured | 3,478 KiB |
| Image delivery | PNG/JPG instead of WebP | 2,963 KiB |
| Render blocking requests | Google Fonts | 300 ms |
| Total network payload | 19,006 KiB | Critical |
| Non-composited animations | pulseGlow uses box-shadow | Layout thrashing |

### Accessibility Issues (from PageSpeed Screenshots)

| Issue | Category | Failing Elements |
|-------|----------|------------------|
| ARIA slider missing accessible name | ARIA | SavingsCalculator slider |
| Insufficient color contrast | Contrast | text-muted-foreground, text-primary-foreground/60, text-primary-foreground/70, text-primary-foreground/80 |
| Touch targets too small | Best Practices | Carousel dot pagination buttons (8px x 8px), video widget buttons |
| Heading elements not sequential | Navigation | Footer uses h4 "Get In Touch" but no h3 precedes it |
| Video missing captions track | Audio/Video | melia-welcome.mp4 in MeliaVideoWidget and About page |

---

## Phase 1: Remove Unused Assets

Delete unused hero image files from `src/assets/`:
- `hero-coastal.jpg`
- `hero-solar-real.jpg`
- `hero-solar.jpg`
- `hero-solar.webp`

---

## Phase 2: Optimize Large Images

Create optimized WebP versions in `public/images/`:

| File | Size Target | Purpose |
|------|-------------|---------|
| `melia-portrait-mobile.webp` | ~50 KB | 400px wide for mobile |
| `melia-portrait-desktop.webp` | ~100 KB | 700px wide for desktop |
| `logo-80.webp` | ~5 KB | 80x80 for 2x retina |

Update components to use `<picture>` elements with responsive sources.

---

## Phase 3: Add Cache Headers

Create `public/_headers` file:

```text
/images/*
  Cache-Control: public, max-age=31536000, immutable

/fonts/*
  Cache-Control: public, max-age=31536000, immutable

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/videos/*
  Cache-Control: public, max-age=31536000, immutable
```

---

## Phase 4: Fix Non-Composited Animation

Replace box-shadow with GPU-accelerated `filter: drop-shadow()` in `src/index.css`:

```css
@keyframes pulseGlow {
  0%, 100% {
    filter: drop-shadow(0 0 20px hsl(var(--primary) / 0.4)) 
            drop-shadow(0 0 40px hsl(var(--primary) / 0.2));
  }
  50% {
    filter: drop-shadow(0 0 30px hsl(var(--primary) / 0.6)) 
            drop-shadow(0 0 60px hsl(var(--primary) / 0.3));
  }
}
```

---

## Phase 5: Fix ARIA Slider Accessible Name

Update `src/components/sections/SavingsCalculator.tsx`:

```tsx
<Slider
  value={monthlyBill}
  onValueChange={setMonthlyBill}
  min={100}
  max={20000}
  step={10}
  className="w-full"
  aria-label="Monthly electricity bill amount"
/>
```

Update `src/components/ui/slider.tsx` to pass through aria-label to the thumb element.

---

## Phase 6: Fix Color Contrast Ratio

1. Update `src/index.css` - darken muted-foreground:
```css
--muted-foreground: 0 0% 35%;  /* Was 45%, now 6.2:1 contrast */
```

2. Update `src/components/layout/Footer.tsx` - replace opacity-based colors:
   - `text-primary-foreground/70` → `text-primary-foreground`
   - `text-primary-foreground/80` → `text-primary-foreground`
   - `text-primary-foreground/60` → `text-primary-foreground/80`

---

## Phase 7: Fix Touch Target Sizes

1. **PortfolioCarousel.tsx** - Increase dot touch targets from 8px to 48px:
```tsx
<button
  key={index}
  onClick={() => emblaApi?.scrollTo(index)}
  className="w-12 h-12 p-4 flex items-center justify-center"
  aria-label={`Go to project ${index + 1}`}
>
  <span className={`block rounded-full transition-all ${
    index === selectedIndex 
      ? "w-6 h-2 bg-primary" 
      : "w-2 h-2 bg-muted-foreground/30"
  }`} />
</button>
```

2. **MeliaVideoWidget.tsx** - Increase button touch targets:
   - Close button: `p-1.5` → `p-2 min-w-[44px] min-h-[44px]`
   - Mute button: `p-1.5` → `p-2 min-w-[44px] min-h-[44px]`

---

## Phase 8: Fix Heading Hierarchy

Update `src/components/layout/Footer.tsx` - Change h4 to h3:

```tsx
{/* "Explore" heading */}
<h3 className="font-display text-lg font-semibold mb-4">
  Explore
</h3>

{/* "Get In Touch" heading */}
<h3 className="font-display text-lg font-semibold mb-4">
  Get In Touch
</h3>
```

---

## Phase 9: Add Video Captions Track

1. Create `public/videos/melia-welcome.vtt`:
```vtt
WEBVTT

00:00:00.000 --> 00:00:02.000
Hi, I'm Melia King, your personal solar expert.

00:00:02.000 --> 00:00:05.000
Let me help you save money with clean solar energy.

00:00:05.000 --> 00:00:08.000
Contact me today for a free consultation.
```

2. Update `src/components/MeliaVideoWidget.tsx`:
```tsx
<video ref={videoRef} ...>
  <track 
    kind="captions" 
    src="/videos/melia-welcome.vtt" 
    srcLang="en" 
    label="English"
    default
  />
</video>
```

3. Update `src/pages/About.tsx` - Add track to the mobile video element.

---

## Technical Summary

### Files to Delete

| File | Reason |
|------|--------|
| `src/assets/hero-coastal.jpg` | Replaced by WebP |
| `src/assets/hero-solar-real.jpg` | Unused |
| `src/assets/hero-solar.jpg` | Unused |
| `src/assets/hero-solar.webp` | Replaced |

### Files to Create

| File | Purpose |
|------|---------|
| `public/images/melia-portrait-mobile.webp` | ~50 KB mobile portrait |
| `public/images/melia-portrait-desktop.webp` | ~100 KB desktop portrait |
| `public/images/logo-80.webp` | ~5 KB retina logo |
| `public/_headers` | Cache configuration |
| `public/videos/melia-welcome.vtt` | Video captions |

### Files to Modify

| File | Changes |
|------|---------|
| `src/index.css` | Fix pulseGlow animation, darken muted-foreground |
| `src/components/sections/About.tsx` | Picture element for portrait |
| `src/pages/About.tsx` | Picture element, video captions |
| `src/components/layout/Header.tsx` | Optimized logo |
| `src/components/layout/Footer.tsx` | Fix heading hierarchy (h4→h3), fix contrast |
| `src/components/ui/slider.tsx` | Pass through aria-label |
| `src/components/sections/SavingsCalculator.tsx` | Add aria-label to slider |
| `src/components/sections/PortfolioCarousel.tsx` | Fix dot touch targets |
| `src/components/MeliaVideoWidget.tsx` | Add caption track, fix touch targets |

---

## Expected Impact

### Performance Gains

| Metric | Before | After |
|--------|--------|-------|
| Total Page Weight | ~19 MB | ~5 MB |
| LCP | 8.6s | ~2.5s |
| Image Download | 2.9 MB | ~300 KB |
| Cache Savings (Repeat) | 0% | 95% |
| Performance Score | 62 | 80-90 |

### Accessibility Improvements

| Issue | Before | After |
|-------|--------|-------|
| ARIA slider name | Missing | Properly labeled |
| Color contrast | 4.2:1 | 6.2:1+ |
| Touch targets | 8-24px | 44-56px |
| Heading order | h4 without h3 | Sequential h3 |
| Video captions | None | English captions |

---

## Implementation Order

1. Delete unused hero images from `src/assets/`
2. Create optimized WebP images in `public/images/`
3. Add `public/_headers` for cache configuration
4. Fix pulseGlow animation (filter instead of box-shadow)
5. Darken muted-foreground color for contrast
6. Fix Footer heading hierarchy (h4→h3) and text contrast
7. Add aria-label to SavingsCalculator slider
8. Increase carousel dot touch target sizes
9. Increase video widget button touch targets
10. Create video captions VTT file
11. Add caption tracks to all video elements
12. Re-test with PageSpeed Insights
