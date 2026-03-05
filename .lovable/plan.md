

## Changes to Hero.tsx

1. **Remove gradient overlay entirely** (line 35) — delete the gradient div.

2. **Change copy background** (line 51) — replace `bg-primary/10 border border-primary/30 backdrop-blur-sm` with a clear gaussian blur: `bg-white/10 backdrop-blur-md border border-white/20` (no purple tint, just frosted glass effect over the image).

3. **Remove "Trusted Expert in 12 States" badge** (lines 87-92) — delete the badge div entirely, and simplify the CTA wrapper since it's now just the button.

