

## Problem

The hero background image is obscured by a heavy white gradient overlay: `from-background/95 via-background/80 to-transparent`. At 95% opacity on the left and 80% in the middle, the image is barely visible — especially on mobile where the gradient covers most of the viewport.

## Plan

**Edit `src/components/sections/Hero.tsx` (line 35):**

- Reduce the gradient opacity to let the image show through more
- Desktop: `from-background/75 via-background/50 to-transparent` — still readable text but image is visible
- Mobile: Use a lighter vertical gradient instead, since the text stacks vertically: `from-background/70 via-background/40 to-transparent`

Replace the single gradient div with responsive classes:
```html
<div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/40 to-transparent md:from-background/75 md:via-background/50 md:to-transparent" />
```

This keeps text legible (white text area still has enough contrast) while letting significantly more of the hero image show through on both mobile and desktop.

