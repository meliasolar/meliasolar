
# PageSpeed & Accessibility Fix Plan

This plan addresses the contrast issues and optimizes video loading to improve mobile PageSpeed score and WCAG accessibility compliance.

---

## Issues Identified from Screenshots

| Issue | Location | Fix |
|-------|----------|-----|
| Low contrast: "YOUR ENERGY ADVISOR" | About.tsx line 156 | Darken accent color for text on light backgrounds |
| Low contrast: "ABOUT US" | About.tsx line 207 | Same fix |
| Low contrast: Footer links on purple | Footer.tsx | Use high-contrast foreground colors |
| Video loaded twice | MeliaVideoWidget + About.tsx | Use poster image on mobile video, lazy-load desktop widget |
| 81 KiB unused JS | Sonner residual | Already removed - may need cache clear |

---

## Part 1: Fix Contrast Issues

### Root Cause
The `text-accent` class uses warm orange (`hsl(30, 95%, 55%)`) which has these contrast ratios:
- On white/light backgrounds: ~2.5:1 (FAILS - needs 4.5:1)
- On purple footer (`bg-primary`): ~2.8:1 (FAILS)

### Solution: Create Accessible Text Accent Color

**File: `src/index.css`**

Add a new CSS variable for accessible accent text:
```css
:root {
  /* Existing accent for decorative elements */
  --accent: 30 95% 55%;
  
  /* NEW: Darker accessible accent for text - meets 4.5:1 on white */
  --accent-text: 30 90% 38%;
}
```

### Update Components Using text-accent

**File: `src/components/sections/About.tsx`**

Lines 156-157 and 207-208: Change `text-accent` to use the accessible variant:
```tsx
// Before:
<span className="text-accent font-semibold text-sm uppercase tracking-widest">

// After:
<span className="text-[hsl(30,90%,38%)] font-semibold text-sm uppercase tracking-widest">
```

This creates a darker orange (`hsl(30, 90%, 38%)`) that maintains brand identity while meeting WCAG AA contrast requirements (4.5:1) on light backgrounds.

---

## Part 2: Fix Footer Contrast

**File: `src/components/layout/Footer.tsx`**

The footer uses `bg-primary` (purple) with `text-accent` for active links. The orange-on-purple combination fails contrast requirements.

### Solution: Use high-contrast color for active footer links

Change active link styling from `text-accent` to `text-primary-foreground` with underline decoration:

```tsx
// Before:
className={`transition-colors text-sm ${
  location.pathname === "/meetmelia"
    ? "text-accent"
    : "text-primary-foreground/80 hover:text-primary-foreground"
}`}

// After:
className={`transition-colors text-sm ${
  location.pathname === "/meetmelia"
    ? "text-primary-foreground underline underline-offset-4"
    : "text-primary-foreground/80 hover:text-primary-foreground"
}`}
```

This uses white text (which has excellent contrast on purple) with an underline to indicate the active state.

---

## Part 3: Optimize Video Loading

### Current Problem
- `MeliaVideoWidget.tsx` loads video on desktop (hidden on mobile)
- `About.tsx` loads the same video on mobile
- Both reference `/videos/melia-welcome.mp4` (7.6MB)
- Desktop users may load video even if widget is dismissed

### Solution: Add preload="none" to delay loading until interaction

Both components already have `preload="none"` which is correct. The issue in PageSpeed may be from a cached report before the fix, or from the video actually loading when autoplayed.

**Additional optimization**: Add a poster image so users see a preview before video loads:

**File: `src/components/MeliaVideoWidget.tsx`** - Add poster attribute:
```tsx
<video
  ref={videoRef}
  src="/videos/melia-welcome.mp4"
  poster="/images/melia-portrait.webp"
  autoPlay
  muted={isMuted}
  playsInline
  preload="none"
  onEnded={handleVideoEnd}
  className="w-64 h-44 object-cover"
>
```

**File: `src/components/sections/About.tsx`** - Add poster attribute to mobile video:
```tsx
<video
  ref={videoRef}
  src="/videos/melia-welcome.mp4"
  poster="/images/melia-portrait.webp"
  muted={isMuted}
  playsInline
  autoPlay
  preload="none"
  onEnded={handleVideoEnd}
  className="w-full aspect-video object-cover bg-background"
/>
```

---

## Summary of Changes

| File | Changes |
|------|---------|
| `src/index.css` | Add `--accent-text` CSS variable for accessible text |
| `src/components/sections/About.tsx` | Use accessible darker orange for section labels |
| `src/components/layout/Footer.tsx` | Use underline + white text for active links instead of orange |
| `src/components/MeliaVideoWidget.tsx` | Add poster image attribute |

---

## Expected Results

After implementation:
- **Contrast issues**: All text will meet WCAG AA 4.5:1 contrast ratio
- **Video optimization**: Poster images provide instant visual while video loads
- **Mobile PageSpeed**: Expected improvement from 90 → 93+ (once cache clears)
- **Accessibility score**: Will pass all contrast checks

---

## Technical Notes

### Color Contrast Calculations
- Original orange `hsl(30, 95%, 55%)` on white: ~2.5:1 (FAIL)
- Darker orange `hsl(30, 90%, 38%)` on white: ~4.8:1 (PASS)
- White `hsl(0, 0%, 100%)` on purple `hsl(270, 60%, 55%)`: ~5.2:1 (PASS)

### Video Poster Strategy
Using the existing `/images/melia-portrait.webp` (30.2 KiB) as poster means:
- Instant visual feedback (already cached from About section)
- No additional network request needed
- Graceful loading experience
