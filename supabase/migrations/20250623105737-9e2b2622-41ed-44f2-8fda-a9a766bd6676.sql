
-- First, disable RLS temporarily to clear all policies
ALTER TABLE public.projects DISABLE ROW LEVEL SECURITY;

-- Drop ALL existing policies on projects table (including any that might exist)
DROP POLICY IF EXISTS "Users can view their own projects" ON public.projects;
DROP POLICY IF EXISTS "Users can view shared projects" ON public.projects;
DROP POLICY IF EXISTS "Users can view public projects" ON public.projects;
DROP POLICY IF EXISTS "Users can create projects" ON public.projects;
DROP POLICY IF EXISTS "Owners can update their projects" ON public.projects;
DROP POLICY IF EXISTS "Editors can update shared projects" ON public.projects;
DROP POLICY IF EXISTS "Owners can delete their projects" ON public.projects;
DROP POLICY IF EXISTS "Enable read for project owners" ON public.projects;
DROP POLICY IF EXISTS "Enable read for public projects" ON public.projects;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.projects;
DROP POLICY IF EXISTS "Enable update for project owners" ON public.projects;
DROP POLICY IF EXISTS "Enable delete for project owners" ON public.projects;

-- Re-enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Create completely new, simple policies that avoid recursion
CREATE POLICY "projects_select_owner" ON public.projects
  FOR SELECT USING (auth.uid() = owner_id);

CREATE POLICY "projects_select_public" ON public.projects  
  FOR SELECT USING (is_public = true);

CREATE POLICY "projects_insert_authenticated" ON public.projects
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "projects_update_owner" ON public.projects
  FOR UPDATE USING (auth.uid() = owner_id);

CREATE POLICY "projects_delete_owner" ON public.projects
  FOR DELETE USING (auth.uid() = owner_id);
