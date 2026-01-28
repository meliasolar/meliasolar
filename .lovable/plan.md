
# Plan: Add Scheduled Publishing for Blog Posts

## Overview
Add the ability to schedule blog posts to be published at a specific future date and time. Posts can be saved as drafts, published immediately, or scheduled for automatic publication.

---

## How It Will Work

1. **In the Admin Editor**: When creating or editing a post, you'll have three options:
   - **Draft** - Save without publishing (current behavior)
   - **Publish Now** - Publish immediately (current behavior)
   - **Schedule** - Set a future date and time for automatic publication

2. **Scheduled Posts**: Will show a "Scheduled" badge with the publication date in the admin list

3. **Automatic Publishing**: A background function will run periodically to publish posts whose scheduled time has passed

---

## Database Changes

Add a new column to the `blog_posts` table:

| Column | Type | Purpose |
|--------|------|---------|
| `scheduled_at` | `timestamp with time zone` | When the post should be published (null = not scheduled) |

---

## Admin Interface Updates

### Publishing Options Section
Replace the current "Publish immediately" toggle with a more flexible UI:

```text
Publishing Options:
[ ] Save as Draft
[ ] Publish Now  
[x] Schedule for Later
    [Date Picker] [Time Picker]
    → Scheduled for: Jan 30, 2026 at 9:00 AM
```

### Post List Badges
- **Published** (green) - Currently live
- **Draft** (gray) - Not published, no schedule
- **Scheduled** (blue/orange) - Has a future publish date with countdown

---

## Public News Page Logic

The query on `/news` will be updated to only show posts where:
- `published = true`, OR
- `scheduled_at` is set AND `scheduled_at <= now()`

This ensures scheduled posts appear automatically when their time arrives.

---

## Automatic Publishing Mechanism

**Option A: Database-Level (Recommended)**
Create a scheduled database function using `pg_cron` that runs every minute to:
1. Find posts where `scheduled_at <= NOW()` and `published = false`
2. Set `published = true` for those posts

**Option B: Query-Based**
Simply update the public query to treat posts as "published" if their scheduled time has passed. No background job needed - the post appears live the moment the scheduled time is reached.

I recommend **Option B** for simplicity - it requires no cron jobs and works instantly.

---

## Technical Implementation

### 1. Database Migration
```sql
-- Add scheduled_at column
ALTER TABLE blog_posts 
ADD COLUMN scheduled_at timestamp with time zone DEFAULT NULL;

-- Create index for efficient scheduled post queries
CREATE INDEX idx_blog_posts_scheduled_at ON blog_posts(scheduled_at) 
WHERE scheduled_at IS NOT NULL;
```

### 2. Update Admin Form (`src/pages/AdminBlog.tsx`)
- Add state for publish mode: `'draft' | 'now' | 'scheduled'`
- Add date/time picker (using existing date-fns for formatting)
- Update form submission to include `scheduled_at`
- Update post list to show scheduled status with date

### 3. Update Public Query (`src/pages/Blog.tsx`)
Change the query filter from:
```typescript
.eq("published", true)
```
To:
```typescript
.or('published.eq.true,and(scheduled_at.not.is.null,scheduled_at.lte.now())')
```

### 4. Update RLS Policy
Ensure the "Anyone can read published posts" policy also allows reading scheduled posts whose time has passed.

---

## Files to Modify

| File | Changes |
|------|---------|
| Database | Add `scheduled_at` column + index |
| `src/pages/AdminBlog.tsx` | Add scheduling UI, date/time picker, status badges |
| `src/pages/Blog.tsx` | Update query to include scheduled posts |
| `src/pages/BlogPost.tsx` | Update single post query for same logic |
| RLS Policy | Update read policy to include scheduled posts |

---

## User Experience

**Creating a Scheduled Post:**
1. Write your article as normal
2. Instead of "Publish immediately", select "Schedule for later"
3. Pick date and time
4. Click "Schedule Post"
5. Post appears in admin list with "Scheduled for Jan 30 at 9:00 AM" badge

**Managing Scheduled Posts:**
- Edit the post anytime before publication
- Change the scheduled date/time
- Publish immediately if you change your mind
- Convert back to draft to cancel scheduling

---

## Edge Cases Handled

- **Scheduled time in the past**: Treat as "publish now"
- **Edit a scheduled post**: Can change the schedule or publish immediately
- **Time zones**: All times stored in UTC, displayed in local time
