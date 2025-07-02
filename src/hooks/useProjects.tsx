
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface Project {
  id: string;
  name: string;
  description?: string;
  owner_id: string;
  screens: any[];
  elements: any[];
  is_public: boolean;
  created_at: string;
  updated_at: string;
  profiles?: {
    first_name?: string;
    last_name?: string;
    email: string;
  };
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchProjects = async () => {
    if (!user) {
      setProjects([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          profiles:owner_id (first_name, last_name, email)
        `)
        .order('updated_at', { ascending: false });

      if (error) {
        console.error('Error fetching projects:', error);
        throw error;
      }

      // Transform the data to match our interface
      const transformedProjects = (data || []).map(project => ({
        ...project,
        screens: Array.isArray(project.screens) ? project.screens : [],
        elements: Array.isArray(project.elements) ? project.elements : []
      }));

      setProjects(transformedProjects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to fetch projects');
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (name: string, description?: string) => {
    if (!user) {
      toast.error('User not authenticated');
      throw new Error('User not authenticated');
    }

    try {
      console.log('Creating project with user:', user.id);
      
      const newProject = {
        name,
        description: description || null,
        owner_id: user.id,
        screens: [{ id: crypto.randomUUID(), name: 'Screen1', isActive: true }],
        elements: [],
        is_public: false
      };

      console.log('Project data to insert:', newProject);

      // Cast to any to work around the temporary type mismatch
      const { data, error } = await supabase
        .from('projects')
        .insert(newProject as any)
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Project created successfully:', data);
      await fetchProjects();
      toast.success('Project created successfully!');
      return data;
    } catch (error) {
      console.error('Error creating project:', error);
      toast.error('Failed to create project. Please try again.');
      throw error;
    }
  };

  const updateProject = async (id: string, updates: Partial<Project>) => {
    try {
      const { error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      await fetchProjects();
      toast.success('Project updated successfully!');
    } catch (error) {
      console.error('Error updating project:', error);
      toast.error('Failed to update project');
      throw error;
    }
  };

  const deleteProject = async (id: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await fetchProjects();
      toast.success('Project deleted successfully!');
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
      throw error;
    }
  };

  const shareProject = async (projectId: string, userEmail: string, role: 'viewer' | 'editor' | 'admin') => {
    try {
      // First, find the user by email
      const { data: userProfile, error: userError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', userEmail)
        .single();

      if (userError || !userProfile) {
        throw new Error('User not found');
      }

      // Add collaborator
      const { error } = await supabase
        .from('project_collaborators')
        .insert({
          project_id: projectId,
          user_id: userProfile.id,
          role,
          invited_by: user?.id,
        });

      if (error) throw error;

      await fetchProjects();
      toast.success(`Project shared with ${userEmail}`);
    } catch (error) {
      console.error('Error sharing project:', error);
      toast.error('Failed to share project');
      throw error;
    }
  };

  useEffect(() => {
    if (user) {
      fetchProjects();
    }
  }, [user]);

  return {
    projects,
    loading,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
    shareProject,
  };
}
