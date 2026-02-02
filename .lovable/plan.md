
# Add Video Support with Autoplay and "Tap for Sound" Button

This plan adds video upload capability to blog posts with autoplay and a "Tap for sound" overlay, matching the MeliaVideoWidget experience.

---

## Overview

Videos embedded in blog posts will:
- **Autoplay muted** (required by browsers for autoplay to work)
- **Show "Tap for sound" overlay** when muted
- **Display mute/unmute toggle** button in corner
- **Play inline** on mobile (no fullscreen takeover)
- Support **MP4** and **WebM** formats

---

## Implementation

### Part 1: Create BlogVideo Component

**New File: `src/components/BlogVideo.tsx`**

A React component that wraps video elements with the "Tap for sound" overlay:

```tsx
// BlogVideo.tsx - handles autoplay + sound overlay like MeliaVideoWidget
const BlogVideo = ({ src }: { src: string }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [showSoundOverlay, setShowSoundOverlay] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Autoplay muted, show "Tap for sound" button
  // When clicked, unmute and hide overlay
  // Mute toggle button in corner
};
```

Key features:
- Volume set to 50% when unmuted
- "Tap for sound" overlay disappears after first unmute
- Corner mute/unmute toggle button (Volume2/VolumeX icons)
- Rounded corners and shadow matching blog content style

### Part 2: Update RichTextEditor for Video Upload

**File: `src/components/RichTextEditor.tsx`**

Changes:
1. Create unified `uploadMedia` function handling both images and videos
2. Register custom Quill video blot that creates `<video>` elements
3. Add video handler to toolbar
4. Accept video MIME types in drag/drop/paste
5. Size limits: 5MB for images, 25MB for videos

Video blot will insert:
```html
<video src="..." controls autoplay muted playsinline preload="metadata" />
```

### Part 3: Update BlogPost to Render Interactive Videos

**File: `src/pages/BlogPost.tsx`**

Since we need React state for the sound overlay, we can't just use `dangerouslySetInnerHTML`. Instead:

1. Update DOMPurify to allow `<video>` and `<source>` elements
2. After sanitization, find all `<video>` elements in the content
3. Replace each `<video>` with a placeholder `<div data-video-src="...">` 
4. In the render, map these placeholders to `<BlogVideo>` components

This approach keeps the React interactivity while preserving the content structure.

### Part 4: Add Styling

**File: `src/styles/rich-text-editor.css`**

Add editor preview styles for videos:
```css
.rich-text-editor .ql-editor video {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  margin: 1rem 0;
}
```

**File: `src/styles/blog-content.css`**

Add published blog styles:
```css
.blog-content .blog-video-wrapper {
  position: relative;
  max-width: 100%;
  margin: 1.5rem auto;
  border-radius: 0.5rem;
  overflow: hidden;
}

.blog-content .blog-video-wrapper video {
  width: 100%;
  height: auto;
  display: block;
}
```

---

## File Changes Summary

| File | Changes |
|------|---------|
| `src/components/BlogVideo.tsx` | **NEW** - React component with autoplay + "Tap for sound" overlay |
| `src/components/RichTextEditor.tsx` | Add video upload, custom video blot, accept MP4/WebM |
| `src/pages/BlogPost.tsx` | Allow video elements in DOMPurify, replace with BlogVideo components |
| `src/styles/rich-text-editor.css` | Add video element styles for editor |
| `src/styles/blog-content.css` | Add video wrapper styles for published posts |

---

## Technical Details

### Accepted File Types
- **Images**: `image/png`, `image/jpeg`, `image/webp`, `image/gif`
- **Videos**: `video/mp4`, `video/webm`

### Size Limits
- Images: 5MB (unchanged)
- Videos: 25MB (keeps clips short for page speed)

### Video Attributes for Performance
- `autoplay` - Start playing immediately
- `muted` - Required for autoplay to work in browsers
- `playsinline` - Prevent fullscreen on mobile
- `preload="metadata"` - Only load dimensions/duration initially
- `loop` - Optional, videos will loop by default

### "Tap for Sound" Behavior
1. Video starts autoplaying muted
2. Overlay shows "Tap for sound" button centered over video
3. Tapping overlay unmutes video and hides overlay
4. Mute toggle button remains in corner for manual control
5. Overlay only shows once per video (after unmute, it stays hidden)

---

## Expected Result

After implementation:
- Video upload button appears in blog editor toolbar
- Drag/drop and paste support for video files
- Videos autoplay muted when blog post loads
- "Tap for sound" overlay appears on each video
- Tapping enables audio and hides overlay
- Mute toggle button always available in corner
- Clean, rounded video player matching site design
