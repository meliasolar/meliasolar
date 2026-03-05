

## Performance Fix: Score 72 to 100

The PageSpeed screenshots reveal three critical bottlenecks:

| Metric | Current | Target | Root Cause |
|--------|---------|--------|------------|
| FCP | 3.1s | <1.8s | JS must download+parse before any paint |
| LCP | 4.6s | <2.5s | 1,510ms element render delay — hero image exists only in React JSX, so browser waits for full JS boot before painting it |
| CLS | 0.115 | <0.1 | AboutSkeleton height (220px) mismatches actual About mobile video (180px) |

### Plan (4 changes)

**1. Eliminate LCP render delay — static hero shell in index.html**

The hero image is preloaded in `<head>` and loads in 690ms, but then sits idle for 1,510ms waiting for React to boot and render the `<img>` tag. Fix: place a pre-rendered hero image directly inside `<div id="root">` in `index.html`. React's `createRoot().render()` replaces this content automatically on mount. The browser can paint the hero image immediately without waiting for any JavaScript.

```html
<div id="root">
  <!-- Static hero shell - painted before JS loads, replaced by React -->
  <div style="position:relative;min-height:100vh;overflow:hidden">
    <picture>
      <source media="(max-width:640px)" srcset="/images/hero-mobile.webp" type="image/webp"/>
      <source media="(min-width:641px)" srcset="/images/hero-desktop.webp" type="image/webp"/>
      <img src="/images/hero-desktop.webp" alt="" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0" fetchpriority="high"/>
    </picture>
  </div>
</div>
```

This alone should cut ~1.5s from LCP.

**2. Fix CLS — match skeleton height to actual About component**

The `AboutSkeleton` in `Index.tsx` reserves 220px for the mobile video placeholder, but `About.tsx` uses `minHeight: 180px`. When the lazy-loaded About replaces the skeleton, the 40px difference causes the 0.115 CLS. Fix: change AboutSkeleton's mobile video placeholder to exactly match About's `minHeight: 180px`.

**3. Remove backdrop-blur from hero overlays**

`backdrop-blur-sm` and `backdrop-blur-md` on the hero headline and subheadline boxes force expensive GPU compositing layers that delay paint. Replace with solid semi-transparent backgrounds (`bg-black/40` and `bg-black/30`) — visually nearly identical but eliminates compositing cost.

**4. Defer Google Analytics more aggressively**

Currently GA loads after `window.load` + 100ms timeout. Change to `requestIdleCallback` with a longer fallback (2000ms) so it never competes with LCP resources on slow 4G connections.

### Expected impact

- LCP: 4.6s → ~2.5s (static hero shell eliminates 1.5s render delay)
- FCP: 3.1s → ~1.8s (browser paints static HTML immediately)
- CLS: 0.115 → 0 (skeleton matches actual layout)
- Combined: should push score from 72 to 90+

