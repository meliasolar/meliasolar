

# Blog Admin Improvements Plan

This plan addresses two issues:
1. **Featured image drag and drop not working** - The drop zone only works with clicks
2. **Scheduled blog posts showing wrong status** - Posts with past scheduled dates still show "Scheduled" instead of "Live"

---

## Part 1: Fix Featured Image Drag and Drop

### Problem
The featured image upload area shows "Click to upload or drag and drop" but only clicking works. The drag and drop event handlers are missing.

### Solution
Add proper drag/drop event handlers to the featured image upload zone.

### Changes to `src/pages/AdminBlog.tsx`

**Step 1: Add drag state tracking (after line 51)**
```typescript
const [isDraggingFeatured, setIsDraggingFeatured] = useState(false);
```

**Step 2: Add drag/drop handlers (after the existing `handleImageUpload` function, around line 138)**
```typescript
const handleFeaturedDragOver = (e: React.DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
  setIsDraggingFeatured(true);
};

const handleFeaturedDragLeave = (e: React.DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
  setIsDraggingFeatured(false);
};

const handleFeaturedDrop = async (e: React.DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
  setIsDraggingFeatured(false);

  const files = Array.from(e.dataTransfer.files);
  const imageFile = files.find(file => file.type.startsWith("image/"));

  if (!imageFile) {
    toast({ variant: "destructive", title: "Please drop an image file" });
    return;
  }

  await handleImageUpload(imageFile);
};
```

**Step 3: Update the drop zone div (lines 379-396)**
- Add `onDragOver`, `onDragLeave`, and `onDrop` handlers
- Add visual feedback when dragging (blue border highlight)
- Show "Drop image here" text while dragging

---

## Part 2: Fix Scheduled Blog Post Display

### Problem
The "Heat Pumps + Solar" post was scheduled for January 29, 2026. Today is February 2, 2026, but the Admin panel still shows "Scheduled" badge instead of indicating it's live.

### Solution
Update the status badge logic to show "Live" for scheduled posts whose publish time has passed.

### Changes to `src/pages/AdminBlog.tsx`

**Update status badge logic (lines 560-573)**

Current logic:
- `published = true` → Green "Published" badge
- `scheduled_at exists` → Blue "Scheduled" badge
- Else → Gray "Draft" badge

New logic:
- `published = true` → Green "Published" badge
- `scheduled_at exists AND scheduled_at <= now()` → Green "Live (Scheduled)" badge
- `scheduled_at exists AND scheduled_at > now()` → Blue "Scheduled" badge
- Else → Gray "Draft" badge

---

## Part 3: Fix Edge Functions for Scheduled Posts

### Problem
The sitemap and OG meta edge functions only query for `published = true`, meaning scheduled posts that have "gone live" don't appear in the sitemap and won't have proper social media sharing.

### Changes to `supabase/functions/sitemap/index.ts`

**Update query (lines 35-39)**

Current:
```typescript
.eq("published", true)
```

New:
```typescript
.or(`published.eq.true,and(scheduled_at.not.is.null,scheduled_at.lte.${new Date().toISOString()})`)
```

### Changes to `supabase/functions/og-meta/index.ts`

**Update query (lines 32-37)**

Current:
```typescript
.eq('published', true)
```

New:
```typescript
.or(`published.eq.true,and(scheduled_at.not.is.null,scheduled_at.lte.${new Date().toISOString()})`)
```

Also need to add `scheduled_at` to the select fields.

---

## Summary of Files to Modify

| File | Changes |
|------|---------|
| `src/pages/AdminBlog.tsx` | Add drag/drop state, handlers, update drop zone UI, fix status badge logic |
| `supabase/functions/sitemap/index.ts` | Include scheduled posts in sitemap query |
| `supabase/functions/og-meta/index.ts` | Include scheduled posts in OG meta query |

---

## Expected Results

After implementation:
- Dragging an image onto the featured image box will upload it
- Visual feedback shows when dragging over the drop zone
- Scheduled posts that have passed their publish time show a green "Live (Scheduled)" badge
- Scheduled posts appear in the sitemap for SEO
- Scheduled posts work correctly for social media sharing

