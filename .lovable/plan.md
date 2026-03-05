

## Plan: Add 5 New Images to Portfolio Carousel and Shuffle Order

### 1. Copy 5 uploaded images to `public/images/portfolio/`
- `slope_wide.webp` → `public/images/portfolio/slope-wide.webp`
- `slope_sky.webp` → `public/images/portfolio/slope-sky.webp`
- `boxes_2.webp` → `public/images/portfolio/boxes-2.webp`
- `big_roof.webp` → `public/images/portfolio/big-roof.webp`
- `helioscope.webp` → `public/images/portfolio/helioscope.webp`

### 2. Update `src/components/sections/PortfolioCarousel.tsx`
- Add 5 new entries to `projectImages` with descriptive alt text
- Shuffle the entire array into a new mixed order (all 14 images: 9 existing + 5 new)

Proposed shuffled order:
1. tesla-1 (Tesla Powerwall)
2. **slope-wide** (ground-mount hillside array aerial)
3. project-3 (commercial rooftop LA)
4. **big-roof** (large commercial rooftop solar)
5. project-1 (desert installation)
6. **boxes-2** (SolarEdge inverter/electrical wall)
7. tesla-2 (Powerwall backup)
8. **slope-sky** (hillside ground-mount close-up)
9. project-13 (Spanish tile roof)
10. project-10 (tile roof OC)
11. **helioscope** (HelioScope design layout)
12. tesla-3 (large battery array)
13. project-2 (modern residential)
14. project-9 (neighborhood solar)

### No other files affected
The Projects page is separate and not changed here — only the homepage carousel.

