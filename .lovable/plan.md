

# Fix First Contentful Paint & Largest Contentful Paint Regression

## Root Cause Analysis

The PageSpeed score dropped from 96 to 91 due to several FCP/LCP blockers:

### Issue 1: Hero Animation Delays Paint
The hero elements use `animate-fade-up` with `opacity: 0` as the starting state. This means the LCP element (the main headline and hero content) starts **invisible** and only appears after the 0.6s animation completes - significantly delaying LCP.

```css
/* Current animation starts at opacity: 0 */
@keyframes fadeUp {
  from {
    opacity: 0;  ← LCP element invisible!
    transform: translateY(30px);
  }
}
```

### Issue 2: Critical CSS Not Matching Actual Styles
The inline critical CSS in `index.html` doesn't include the animation classes, causing a flash or layout shift when the full CSS loads.

### Issue 3: Stats Section Animation Delay
The stats section at the bottom of the hero has `md:[animation-delay:0.15s]` which adds additional delay to visible content.

## Solution

### 1. Remove Animation from LCP Elements (Hero.tsx)
Remove the `animate-fade-up` class from the main headline and subheadline - these are the LCP elements and must render **immediately**.

**Changes to Hero.tsx:**
- Line 43: Remove `animate-fade-up` from h1
- Lines 51-75: The subheadline box should render immediately (it's the LCP element)
- Line 99: Remove animation delay from stats section for faster FCP

### 2. Add Critical Animation Fix to index.html
Add a CSS rule that ensures LCP elements are visible immediately, not waiting for animation.

### 3. Optimize Animation Approach
For elements that should animate, use `animation-fill-mode: backwards` and ensure they start visible, then animate subtly.

## Technical Changes

### File: `src/components/sections/Hero.tsx`

| Line | Current | Change |
|------|---------|--------|
| 43 | `animate-fade-up` | Remove animation class |
| 78 | `animate-fade-up md:[animation-delay:0.1s]` | Keep animation only on CTAs (below LCP threshold) |
| 99 | `animate-fade-up md:[animation-delay:0.15s]` | Remove animation-delay |

### File: `index.html`

Add to critical CSS (around line 96):
```css
/* Prevent LCP delay from animations */
.hero-lcp { opacity: 1 !important; animation: none !important; }
```

### File: `src/index.css`

Optimize the fadeUp animation to not start from opacity 0:
```css
@keyframes fadeUp {
  from {
    transform: translateY(20px);
  }
  to {
    transform: translateY(0);
  }
}

.animate-fade-up {
  animation: fadeUp 0.4s ease-out forwards;
}
```

## Visual Impact

```text
BEFORE (slow LCP):
┌────────────────────────────┐
│  Header loads              │ ← FCP: ~1.2s
│  [empty hero - animating]  │
│  ...waiting 0.6s...        │
│  Hero content appears      │ ← LCP: ~1.8s (LATE!)
└────────────────────────────┘

AFTER (fast LCP):
┌────────────────────────────┐
│  Header + Hero together    │ ← FCP: ~0.8s
│  "Your Personal Solar King"│ ← LCP: ~0.9s (FAST!)
│  [CTAs animate in subtly]  │
└────────────────────────────┘
```

## Files to Modify

| File | Change |
|------|--------|
| `src/components/sections/Hero.tsx` | Remove animations from h1, subheadline, stats |
| `index.html` | Add critical CSS rule for LCP |
| `src/index.css` | Optimize animation keyframes |

## Expected Outcome
- FCP: Improved by ~300-400ms (header + headline render immediately)
- LCP: Improved by ~500-600ms (headline visible without waiting for animation)
- PageSpeed score should return to 96+ on mobile

