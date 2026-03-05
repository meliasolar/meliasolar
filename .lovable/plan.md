

## Fix LCP: 4.0s → under 2.5s

### Root cause

The static hero shell inside `<div id="root">` gets **destroyed and repainted** when React calls `createRoot().render()`. React replaces all children of `#root`, so the browser must re-render the hero image from scratch after JS boots. This second paint registers as the LCP at 4.0s — the static shell only helped FCP (1.4s), not LCP.

### Solution: Move hero visual outside `#root`

Place the static hero (image + headline) **before** `<div id="root">` in `index.html`, so React never touches it. The React Hero component will then render **on top** using CSS positioning, and hide the static shell once mounted.

### Changes

**1. `index.html`** — Move static hero shell outside `#root`

```html
<body>
  <!-- Static hero - survives React mount, hidden by React after boot -->
  <div id="hero-shell" style="position:relative;min-height:100vh;overflow:hidden;background:linear-gradient(135deg,#1a4a3d 0%,#0d2a24 100%)">
    <picture>
      <source media="(max-width:640px)" srcset="/images/hero-mobile.webp" type="image/webp"/>
      <source media="(min-width:641px)" srcset="/images/hero-desktop.webp" type="image/webp"/>
      <img src="/images/hero-desktop.webp" alt="" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0" fetchpriority="high"/>
    </picture>
    <div style="position:relative;padding:5rem 1.5rem 2rem;max-width:80rem;margin:0 auto">
      <div style="max-width:42rem">
        <div style="background:rgba(0,0,0,0.4);padding:0.75rem 1rem;border-radius:0.5rem;width:fit-content">
          <h1 style="font-family:'Playfair Display',Georgia,serif;font-size:3rem;font-weight:700;color:#fff;line-height:1.1;margin:0">
            Your Personal<br/><span style="background:linear-gradient(135deg,hsl(270 60% 55%),hsl(270 50% 65%));-webkit-background-clip:text;-webkit-text-fill-color:transparent">Solar</span> King
          </h1>
        </div>
      </div>
    </div>
  </div>

  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
```

**2. `src/components/sections/Hero.tsx`** — Hide static shell on mount

Add a `useEffect` that removes `#hero-shell` once React's Hero component is painted:

```tsx
useEffect(() => {
  const shell = document.getElementById('hero-shell');
  if (shell) shell.remove();
}, []);
```

**3. `src/pages/Index.tsx`** — Ensure Hero renders above the static shell

The React Hero component is already eagerly loaded. It will render on top of (or replacing) the static shell. Since `#hero-shell` is outside `#root` and comes before it in DOM order, React's content will appear below it. To fix this, the Hero component needs `margin-top: -100vh` or the shell needs to be positioned `absolute/fixed` so it doesn't push `#root` down.

Best approach: make `#hero-shell` absolutely positioned so it doesn't affect document flow, and React renders normally starting from the top:

```html
<div id="hero-shell" style="position:fixed;top:0;left:0;right:0;min-height:100vh;z-index:0;...">
```

Then in Hero.tsx, add `position:relative;z-index:1` so React's version layers on top and the shell removal is seamless.

### Expected impact

- The hero image + headline paint at FCP (1.4s) and **stay painted** through React boot
- LCP = FCP ≈ 1.4s (hero image is the largest element and never gets destroyed)
- Score should jump from 86 to 95+

