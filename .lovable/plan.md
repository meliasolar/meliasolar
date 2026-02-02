
# PageSpeed Optimization Plan - Mobile Score 90 → 95+

This plan addresses the specific issues shown in your PageSpeed Insights screenshot to restore and improve your mobile performance score.

---

## Issues Identified

| Issue | Impact | Solution |
|-------|--------|----------|
| Avoid enormous network payloads (15,922 KiB) | Major | Remove bundled 7.6MB video from `src/assets/` |
| Reduce unused JavaScript (81 KiB) | High | Remove duplicate Sonner toast library |
| Reduce unused CSS (10 KiB) | Medium | Already minimal - no action needed |
| Forced reflow | Medium | Optimize pulse animation |
| Console ref warnings | Minor | Fix forwardRef on lazy-loaded components |

---

## Part 1: Remove Bundled Video (Biggest Win)

**Problem:** The video is imported from `src/assets/melia-welcome.mp4` which causes Vite to bundle the 7.6MB file into the JavaScript. This is the primary cause of the "enormous network payloads" issue.

**Solution:**
- Update `MeliaVideoWidget.tsx` to use the static path `/videos/melia-welcome.mp4` instead of importing from `src/assets/`
- Delete the duplicate `src/assets/melia-welcome.mp4` file

**File changes:**

`src/components/MeliaVideoWidget.tsx`:
```typescript
// REMOVE this import line:
// import meliaVideo from "@/assets/melia-welcome.mp4";

// CHANGE the video src from:
<video src={meliaVideo} ...>

// TO:
<video src="/videos/melia-welcome.mp4" ...>
```

**Delete file:** `src/assets/melia-welcome.mp4`

**Expected savings:** ~7.6MB reduction in JavaScript bundle

---

## Part 2: Remove Duplicate Toast Library (81 KiB savings)

**Problem:** The app loads TWO toast libraries:
1. `@radix-ui/react-toast` (Shadcn Toaster) - used in Auth, Contact, AdminBlog
2. `sonner` - only used in RichTextEditor

**Solution:** Consolidate to use only the Shadcn Toaster

**File changes:**

`src/components/RichTextEditor.tsx`:
```typescript
// CHANGE import from:
import { toast } from "sonner";

// TO:
import { useToast } from "@/hooks/use-toast";

// Inside the component, add:
const { toast } = useToast();

// CHANGE toast calls from:
toast.error("message");
toast.success("message");

// TO:
toast({ title: "Error", description: "message", variant: "destructive" });
toast({ title: "Success", description: "message" });
```

`src/App.tsx`:
```typescript
// REMOVE these lines:
import { Toaster as Sonner } from "@/components/ui/sonner";
// and
<Sonner />
```

**Expected savings:** ~81 KiB of unused JavaScript

---

## Part 3: Fix Console Ref Warnings

**Problem:** The console shows "Function components cannot be given refs" for `About`, `TestimonialsCarousel`, and `MeliaVideoWidget`. This happens because these components are lazy-loaded in `Index.tsx` but don't use `forwardRef`.

**Impact:** While not directly affecting PageSpeed, these warnings indicate potential issues with React's reconciliation.

**Solution:** Wrap the exported components with `forwardRef` to properly handle refs from Suspense

`src/components/sections/About.tsx`:
```typescript
import { forwardRef } from "react";

const About = forwardRef<HTMLElement>((props, ref) => {
  // ... existing code
  return (
    <section id="about" ref={ref} ...>
    ...
  );
});

About.displayName = "About";
export default About;
```

Apply same pattern to:
- `src/components/sections/TestimonialsCarousel.tsx`
- `src/components/MeliaVideoWidget.tsx`

---

## Part 4: Optimize Pulse Animation (Forced Reflow)

**Problem:** The `animate-pulse-glow` animation may be causing forced reflow on mobile devices.

**Current code in `index.css`:**
```css
.animate-pulse-glow {
  animation: pulseGlow 2s ease-in-out infinite;
  will-change: opacity;
  box-shadow: 0 0 25px hsl(var(--primary) / 0.4), 
              0 0 50px hsl(var(--primary) / 0.2);
}
```

**Solution:** The animation is already optimized (only animates opacity). The forced reflow is likely coming from other sources. I'll add `contain: layout` to isolate paint operations:

```css
.animate-pulse-glow {
  animation: pulseGlow 2s ease-in-out infinite;
  will-change: opacity;
  contain: layout;
  box-shadow: 0 0 25px hsl(var(--primary) / 0.4), 
              0 0 50px hsl(var(--primary) / 0.2);
}
```

---

## Summary of Changes

| File | Action |
|------|--------|
| `src/components/MeliaVideoWidget.tsx` | Remove video import, use static path, add forwardRef |
| `src/assets/melia-welcome.mp4` | **DELETE** |
| `src/components/RichTextEditor.tsx` | Replace sonner with useToast |
| `src/App.tsx` | Remove Sonner import and component |
| `src/components/sections/About.tsx` | Add forwardRef |
| `src/components/sections/TestimonialsCarousel.tsx` | Add forwardRef |
| `src/index.css` | Add `contain: layout` to pulse animation |

---

## Expected Results

After implementation:
- **Network payload:** Reduced from 15,922 KiB to ~8,000 KiB (7.6MB video removed from bundle)
- **Unused JavaScript:** Reduced by 81 KiB (Sonner library removed)
- **Console warnings:** Eliminated ref warnings
- **Forced reflow:** Minimized with containment
- **Mobile PageSpeed:** Expected improvement from 90 → 95+
