-- Add INSERT policy: Only admins can insert roles
CREATE POLICY "Only admins can insert roles" 
ON public.user_roles 
FOR INSERT 
TO authenticated 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Add UPDATE policy: Only admins can update roles
CREATE POLICY "Only admins can update roles" 
ON public.user_roles 
FOR UPDATE 
TO authenticated 
USING (has_role(auth.uid(), 'admin'::app_role)) 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Add DELETE policy: Only admins can delete roles
CREATE POLICY "Only admins can delete roles" 
ON public.user_roles 
FOR DELETE 
TO authenticated 
USING (has_role(auth.uid(), 'admin'::app_role));