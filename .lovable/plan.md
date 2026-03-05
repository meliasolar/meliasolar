

## Fix headline visibility with dark overlay

**Edit `src/components/sections/Hero.tsx`** — Wrap the `h1` headline in the same frosted glass treatment as the subheading, or add a standalone dark semi-transparent box behind it.

Since the subheading already uses `bg-black/20 backdrop-blur-md border border-white/20`, applying a similar but slightly lighter treatment to the headline keeps things consistent:

- Wrap the `h1` in a `div` with classes: `bg-black/30 backdrop-blur-sm px-4 py-3 rounded-lg w-fit`
- This gives it a dark tinted glass background that makes white text legible over the solar flare
- Slightly stronger opacity (`/30` vs `/20`) since the headline is larger and needs more separation

One file changed, ~3 lines added.

