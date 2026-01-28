-- Add scheduled_at column for scheduling posts
ALTER TABLE blog_posts 
ADD COLUMN scheduled_at timestamp with time zone DEFAULT NULL;

-- Create index for efficient scheduled post queries
CREATE INDEX idx_blog_posts_scheduled_at ON blog_posts(scheduled_at) 
WHERE scheduled_at IS NOT NULL;

-- Update RLS policy to allow reading scheduled posts whose time has passed
DROP POLICY IF EXISTS "Anyone can read published posts" ON blog_posts;

CREATE POLICY "Anyone can read published or scheduled posts" 
ON public.blog_posts 
FOR SELECT 
USING (
  published = true 
  OR (scheduled_at IS NOT NULL AND scheduled_at <= now())
);