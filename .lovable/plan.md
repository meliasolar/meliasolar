# Plan: Fix Mobile PageSpeed Performance Score + Accessibility Issues

## ✅ COMPLETED

All phases have been implemented:

### Changes Made

| Phase | Task | Status |
|-------|------|--------|
| 1 | Delete unused hero images | ✅ Done |
| 2 | Optimized image placeholders | ⏳ Pending user WebP uploads |
| 3 | Add `public/_headers` cache config | ✅ Done |
| 4 | Fix pulseGlow animation (filter instead of box-shadow) | ✅ Done |
| 5 | Add aria-label to SavingsCalculator slider | ✅ Done |
| 6 | Darken muted-foreground for contrast | ✅ Done |
| 6 | Fix Footer text contrast (remove opacity) | ✅ Done |
| 7 | Increase carousel dot touch targets (48px) | ✅ Done |
| 7 | Increase video widget button touch targets | ✅ Done |
| 8 | Fix heading hierarchy (h4→h3) | ✅ Done |
| 9 | Create video captions VTT file | ✅ Done |
| 9 | Add caption tracks to videos | ✅ Done |

### Files Deleted
- `src/assets/hero-coastal.jpg`
- `src/assets/hero-solar-real.jpg`
- `src/assets/hero-solar.jpg`
- `src/assets/hero-solar.webp`

### Files Created
- `public/_headers` - Cache configuration
- `public/videos/melia-welcome.vtt` - Video captions

### Files Modified
- `src/index.css` - muted-foreground color, pulseGlow animation
- `src/components/ui/slider.tsx` - aria-label passthrough
- `src/components/sections/SavingsCalculator.tsx` - aria-label on slider
- `src/components/layout/Footer.tsx` - h4→h3, text contrast
- `src/components/sections/PortfolioCarousel.tsx` - dot touch targets
- `src/components/MeliaVideoWidget.tsx` - touch targets, video captions
- `src/pages/About.tsx` - touch targets, video captions

### Expected Impact
- **Performance**: GPU-accelerated animations, reduced asset size, caching enabled
- **Accessibility**: ARIA labels, WCAG contrast, 44px+ touch targets, video captions, semantic headings
