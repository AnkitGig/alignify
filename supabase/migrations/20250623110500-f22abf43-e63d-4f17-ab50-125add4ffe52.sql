
-- First, drop the policies that depend on the user_id column
DROP POLICY IF EXISTS "Project owners can insert shares" ON public.project_users;
DROP POLICY IF EXISTS "Users can delete their own projects" ON public.projects;
DROP POLICY IF EXISTS "Users can insert their own projects" ON public.projects;
DROP POLICY IF EXISTS "Users can update their own projects" ON public.projects;

-- Now remove the user_id column from the projects table
ALTER TABLE public.projects DROP COLUMN IF EXISTS user_id;

-- Recreate the policies using owner_id instead of user_id
CREATE POLICY "Project owners can delete their projects" ON public.projects
  FOR DELETE USING (auth.uid() = owner_id);

CREATE POLICY "Project owners can insert their projects" ON public.projects
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Project owners can update their projects" ON public.projects
  FOR UPDATE USING (auth.uid() = owner_id);
