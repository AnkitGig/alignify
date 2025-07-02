
-- Drop all existing problematic policies on projects table
DROP POLICY IF EXISTS "Users can view their own projects" ON public.projects;
DROP POLICY IF EXISTS "Users can view shared projects" ON public.projects;
DROP POLICY IF EXISTS "Users can view public projects" ON public.projects;
DROP POLICY IF EXISTS "Users can create projects" ON public.projects;
DROP POLICY IF EXISTS "Owners can update their projects" ON public.projects;
DROP POLICY IF EXISTS "Editors can update shared projects" ON public.projects;
DROP POLICY IF EXISTS "Owners can delete their projects" ON public.projects;

-- Create simple, non-recursive policies that don't cause infinite loops
CREATE POLICY "Enable read for project owners" ON public.projects
  FOR SELECT USING (auth.uid() = owner_id);

CREATE POLICY "Enable read for public projects" ON public.projects  
  FOR SELECT USING (is_public = true);

CREATE POLICY "Enable insert for authenticated users" ON public.projects
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Enable update for project owners" ON public.projects
  FOR UPDATE USING (auth.uid() = owner_id);

CREATE POLICY "Enable delete for project owners" ON public.projects
  FOR DELETE USING (auth.uid() = owner_id);
