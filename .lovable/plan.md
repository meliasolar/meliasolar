
# Plan: Fix FCP, LCP, Speed Index + All PageSpeed Issues

## Current State Analysis

### All PageSpeed Issues (from screenshot)

| Issue | Savings | Current Plan Status | Action Needed |
|-------|---------|---------------------|---------------|
| **Use efficient cache lifetimes** | 3,478 KiB | ✅ Done | `public/_headers` already exists |
| **Improve image delivery** | 2,963 KiB | ⚠️ Partial | Need to move large assets to public/ |
| **Render blocking requests** | 300 ms | ⚠️ Partial | CSS bundle is render-blocking |
| **Forced reflow** | - | ❌ Missing | `InstagramFeed.tsx` scroll listeners |
| **Network dependency tree** | - | ⚠️ Partial | Need to defer more resources |
| **Reduce unused JavaScript** | 138 KiB | ❌ Missing | Lazy load more components |
| **Reduce unused CSS** | 11 KiB | ❌ Missing | Purge Quill/blog styles |
| **Avoid enormous network payloads** | 19,007 KiB | ⚠️ Partial | Large assets bundled via imports |
| **Avoid long main-thread tasks** | 4 tasks | ⚠️ Partial | Defer heavy initialization |
| **Avoid non-composited animations** | 1 element | ✅ Done | pulseGlow uses filter now |

---

## Phase 1: Move Large Assets from src/assets to public/

### Problem
Large files imported from `src/assets/` are bundled into JS chunks, blocking the main thread:
- `melia-king-clean.png` - 1.2 MB bundled via import
- `melia-welcome.mp4` - 7.7 MB triggers early network request
- `logo.png` - 54 KB bundled

### Solution
Move assets to `public/` folder and reference via URL paths:

**Files to move:**
| From | To |
|------|-----|
| `src/assets/melia-king-clean.png` | `public/images/melia-portrait.png` |
| `src/assets/melia-welcome.mp4` | `public/videos/melia-welcome.mp4` |
| `src/assets/logo.png` | Already at `public/logo.png` |

**Components to update:**

1. **src/components/sections/About.tsx** - Change imports to paths:
```tsx
// Remove:
// import meliaImage from "@/assets/melia-king-clean.png";
// import meliaVideo from "@/assets/melia-welcome.mp4";

// Use paths:
<img src="/images/melia-portrait.png" loading="lazy" />
<video src="/videos/melia-welcome.mp4" preload="none" />
```

2. **src/pages/About.tsx** - Same changes

3. **src/components/layout/Header.tsx** - Use public logo:
```tsx
// Remove: import logo from "@/assets/logo.png";
<img src="/logo.png" alt="Melia King Solar" />
```

4. **src/components/layout/Footer.tsx** - Same change

---

## Phase 2: Lazy Load the About Section

### Problem
`About` is eagerly imported in `Index.tsx` even though it's below the fold, bundling the 1.2MB image import.

### Solution
Convert to lazy loading with skeleton fallback:

```tsx
// src/pages/Index.tsx
import { lazy, Suspense } from "react";

// Remove eager import:
// import About from "@/components/sections/About";

// Add lazy import:
const About = lazy(() => import("@/components/sections/About"));

// Add skeleton fallback component
const AboutSkeleton = () => (
  <section className="py-24 bg-secondary">
    <div className="container mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
        <div className="aspect-[4/5] rounded-2xl bg-muted animate-pulse" />
        <div className="space-y-8">
          <div className="h-8 w-32 bg-muted animate-pulse rounded" />
          <div className="h-12 w-64 bg-muted animate-pulse rounded" />
        </div>
      </div>
    </div>
  </section>
);

// In render:
<Suspense fallback={<AboutSkeleton />}>
  <About />
</Suspense>
```

---

## Phase 3: Lazy Load ContactFormModal

### Problem
`ContactModalContext` eagerly imports `ContactFormModal` which loads:
- framer-motion AnimatePresence
- Dialog, Button, Input, Textarea components
- Supabase client
- Form validation with zod

All this loads even if user never opens the modal.

### Solution
Defer modal loading until opened:

```tsx
// src/contexts/ContactModalContext.tsx
import { lazy, Suspense } from "react";

// Remove: import ContactFormModal from "@/components/ContactFormModal";
const ContactFormModal = lazy(() => import("@/components/ContactFormModal"));

// In provider render:
{isOpen && (
  <Suspense fallback={null}>
    <ContactFormModal open={isOpen} onOpenChange={setIsOpen} />
  </Suspense>
)}
```

---

## Phase 4: Remove Animation Delays from Hero

### Problem
Hero content has staggered animation delays that prevent LCP from completing quickly:
- h1: `animationDelay: "0.2s"`
- CTAs: `animationDelay: "0.4s"`
- Stats: `animationDelay: "0.5s"`

### Solution
Remove delays on mobile, keep subtle delays on desktop for polish:

```tsx
// src/components/sections/Hero.tsx

// h1 - Remove inline delay
<h1 className="... animate-fade-up">

// CTAs - Remove inline delay, use CSS for desktop
<div className="... animate-fade-up md:[animation-delay:0.1s]">

// Stats - Remove inline delay
<div className="... animate-fade-up md:[animation-delay:0.15s]">
```

Add CSS media query to disable delays on mobile:

```css
/* src/index.css */
@media (max-width: 768px) {
  .animate-fade-up {
    animation-delay: 0s !important;
    animation-duration: 0.3s !important;
  }
}
```

---

## Phase 5: Fix Forced Reflow in InstagramFeed

### Problem
`InstagramFeed.tsx` reads layout properties synchronously on every scroll event:
```tsx
const checkScroll = () => {
  const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current; // Forces reflow!
};
ref.addEventListener("scroll", checkScroll); // Fires 60+ times/sec
```

### Solution
Throttle the scroll handler using `requestAnimationFrame`:

```tsx
// src/components/sections/InstagramFeed.tsx
const checkScroll = useCallback(() => {
  if (!scrollRef.current) return;
  const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
  setCanScrollLeft(scrollLeft > 0);
  setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
}, []);

const throttledCheckScroll = useCallback(() => {
  requestAnimationFrame(checkScroll);
}, [checkScroll]);

useEffect(() => {
  checkScroll();
  const ref = scrollRef.current;
  if (ref) {
    ref.addEventListener("scroll", throttledCheckScroll, { passive: true });
    window.addEventListener("resize", throttledCheckScroll, { passive: true });
    return () => {
      ref.removeEventListener("scroll", throttledCheckScroll);
      window.removeEventListener("resize", throttledCheckScroll);
    };
  }
}, [throttledCheckScroll]);
```

---

## Phase 6: Defer TestimonialsCarousel Until Scroll

### Problem
TestimonialsCarousel renders immediately after Hero, competing for resources.

### Solution
Use IntersectionObserver to defer rendering:

```tsx
// src/pages/Index.tsx
const [showTestimonials, setShowTestimonials] = useState(false);
const testimonialsRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setShowTestimonials(true);
        observer.disconnect();
      }
    },
    { rootMargin: '300px' } // Preload 300px before visible
  );
  
  if (testimonialsRef.current) {
    observer.observe(testimonialsRef.current);
  }
  
  return () => observer.disconnect();
}, []);

// In render:
<div ref={testimonialsRef}>
  {showTestimonials && (
    <Suspense fallback={<div className="min-h-[300px]" />}>
      <TestimonialsCarousel />
    </Suspense>
  )}
</div>
```

---

## Phase 7: Reduce Unused CSS

### Problem
~11 KiB of unused CSS from:
- Rich text editor styles (`.rich-text-editor`, `.ql-*`) - only used on admin pages
- Blog content styles (`.blog-content`) - only used on blog pages

### Solution
Move these styles to component-level CSS that's only loaded when needed:

1. Create `src/styles/rich-text-editor.css` with Quill styles
2. Create `src/styles/blog-content.css` with blog styles
3. Import only where used:

```tsx
// src/components/RichTextEditor.tsx
import "@/styles/rich-text-editor.css";

// src/pages/BlogPost.tsx
import "@/styles/blog-content.css";
```

4. Remove ~200 lines from `src/index.css` (lines 210-590)

---

## Phase 8: Optimize Main Thread Tasks

### Problem
4 long main-thread tasks from:
- React provider chain initialization
- Icon library tree-shaking not working optimally
- All components importing from lucide-react barrel export

### Solution
Use specific imports for Lucide icons:

```tsx
// Instead of barrel imports:
// import { ArrowRight, PiggyBank, Zap } from "lucide-react";

// Use specific imports:
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";
import PiggyBank from "lucide-react/dist/esm/icons/piggy-bank";
import Zap from "lucide-react/dist/esm/icons/zap";
```

Note: This is optional - benefits are minimal with modern bundlers.

---

## Summary of Changes

### Files to Create

| File | Purpose |
|------|---------|
| `src/styles/rich-text-editor.css` | Quill editor styles (~150 lines) |
| `src/styles/blog-content.css` | Blog post styles (~150 lines) |

### Files to Modify

| File | Changes |
|------|---------|
| `src/pages/Index.tsx` | Lazy load About, defer TestimonialsCarousel |
| `src/components/sections/About.tsx` | Use public/ paths for assets |
| `src/pages/About.tsx` | Use public/ paths for assets |
| `src/components/layout/Header.tsx` | Use public logo path |
| `src/components/layout/Footer.tsx` | Use public logo path |
| `src/contexts/ContactModalContext.tsx` | Lazy load ContactFormModal |
| `src/components/sections/Hero.tsx` | Remove animation delays |
| `src/components/sections/InstagramFeed.tsx` | Throttle scroll listeners |
| `src/index.css` | Add mobile animation override, remove editor/blog styles |
| `src/components/RichTextEditor.tsx` | Import component CSS |
| `src/pages/BlogPost.tsx` | Import blog CSS |

### Assets to Move

| From | To |
|------|-----|
| `src/assets/melia-king-clean.png` | `public/images/melia-portrait.png` |
| `src/assets/melia-welcome.mp4` | `public/videos/melia-welcome.mp4` |

---

## Expected Performance Impact

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| **FCP** | ~4-6s | ~1.5s | 65-75% faster |
| **LCP** | ~8-10s | ~2.5s | 70-75% faster |
| **Speed Index** | ~8s | ~2.5s | 70% faster |
| **Main Bundle** | ~600 KB | ~400 KB | 33% smaller |
| **Initial JS** | ~500 KB | ~300 KB | 40% smaller |
| **Unused CSS** | 11 KiB | ~0 KiB | 100% removed |
| **Unused JS** | 138 KiB | ~50 KiB | 65% reduced |
| **Network Payload** | 19 MB | ~8 MB | 58% smaller |
| **Forced Reflow** | Yes | No | Fixed |
| **Long Tasks** | 4 | 1-2 | 50% reduced |

---

## Implementation Order

1. Move large assets from `src/assets/` to `public/` folder
2. Update Header.tsx and Footer.tsx to use public logo path
3. Update About.tsx (component) to use public asset paths
4. Update About.tsx (page) to use public asset paths
5. Lazy load About section in Index.tsx with skeleton
6. Lazy load ContactFormModal in ContactModalContext.tsx
7. Remove animation delays from Hero.tsx LCP elements
8. Add mobile animation override in index.css
9. Throttle scroll listeners in InstagramFeed.tsx (fix forced reflow)
10. Defer TestimonialsCarousel until scroll
11. Extract rich-text-editor styles to separate CSS file
12. Extract blog-content styles to separate CSS file
13. Remove extracted styles from index.css
14. Update RichTextEditor.tsx and BlogPost.tsx to import their CSS
15. Test with PageSpeed Insights
