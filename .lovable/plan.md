

# Fix Image Squashing for ALL Blog OG Images

## Problem
The `og-article-image` edge function generates social share previews using an SVG with a **1040x510 pixel foreground container** (approximately 2:1 aspect ratio - very wide). When portrait or square images are used, `preserveAspectRatio="xMidYMid meet"` scales them down to fit the height, resulting in:
- Small, hard-to-see faces
- Wasted horizontal space
- Melia appearing "squashed" or tiny

## Current Blog Posts Affected
From the database query, 18 blog posts have featured images. The Chamath post uses `melia-chamath-solar-split.webp` which is portrait-oriented, causing the squashing issue. Other posts may have similar issues depending on their image aspect ratios.

## Solution
Redesign the SVG container to use a **more square-friendly aspect ratio** that accommodates both portrait and landscape images without making anyone appear tiny.

### New Container Dimensions
Change from `1040x510` to `900x510` - this creates a ~16:9 container that:
- Better accommodates portrait images (they display larger)
- Still works well for landscape images
- Centers nicely within the 1200x630 OG canvas

## Technical Changes

### File: `supabase/functions/og-article-image/index.ts`

**Lines 102-111 - Update foreground container dimensions:**

| Element | Current | New |
|---------|---------|-----|
| Shadow rect | `x="80" width="1040"` | `x="150" width="900"` |
| Glow rect | `x="70" width="1060"` | `x="140" width="920"` |
| Image | `x="80" width="1040"` | `x="150" width="900"` |

**Line 133 - Fix error fallback:**
Change `melia-og-image.png` to `melia-og-share.png` for consistency.

### Code Change Preview

```xml
<!-- Current (too wide) -->
<rect x="80" y="60" width="1040" height="510" ... />
<image x="80" y="60" width="1040" height="510" ... />

<!-- New (balanced) -->
<rect x="150" y="60" width="900" height="510" ... />
<image x="150" y="60" width="900" height="510" ... />
```

### Visual Comparison

```text
Current container (2:1 ratio - very wide):
┌─────────────────────────────────────────┐
│  x=80                      width=1040   │
│  Portrait images appear tiny here       │
└─────────────────────────────────────────┘

New container (~16:9 ratio - balanced):
    ┌───────────────────────────────┐
    │  x=150          width=900     │
    │  Portrait images display      │
    │  at proper size               │
    └───────────────────────────────┘
```

## Files to Modify

| File | Change |
|------|--------|
| `supabase/functions/og-article-image/index.ts` | Update container dimensions (lines 102-111) and fix line 133 fallback |

## Expected Result
- All blog post share previews will display featured images at proper proportions
- Portrait images (like Melia/Chamath) will appear larger and clearer
- Landscape images will still look great with balanced margins
- Melia will never appear squashed or distorted

