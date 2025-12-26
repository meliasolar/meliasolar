-- Drop the existing policy
DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;

-- Create a new policy that requires authentication and only allows users to see their own role
-- Admins can see all roles
CREATE POLICY "Users can view own role, admins can view all"
ON public.user_roles
FOR SELECT
TO authenticated
USING (
  user_id = auth.uid() OR has_role(auth.uid(), 'admin'::app_role)
);