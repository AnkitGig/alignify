
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useProjects } from "@/hooks/useProjects";
import { useWireframe } from "@/hooks/useWireframe";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function useProjectLoader(projectId: string | undefined) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { updateProject } = useProjects();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  
  const { loadProjectFromDatabase } = useWireframe();

  const loadProject = async () => {
    if (!projectId || !user) return;

    try {
      setLoading(true);
      
      // Fetch project with collaborator info
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          project_collaborators (
            role,
            user_id
          )
        `)
        .eq('id', projectId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          toast.error('Project not found');
          navigate('/dashboard');
        } else {
          throw error;
        }
        return;
      }

      // Check permissions
      const isOwner = data.owner_id === user.id;
      const collaboration = data.project_collaborators?.find(
        (collab: any) => collab.user_id === user.id
      );
      const hasAccess = isOwner || collaboration || data.is_public;

      if (!hasAccess) {
        toast.error('You do not have permission to access this project');
        navigate('/dashboard');
        return;
      }

      // Check if user can edit
      const canEdit = isOwner || (collaboration && ['editor', 'admin'].includes(collaboration.role));
      setHasPermission(canEdit);

      setProject(data);
      
      // Load project data into wireframe store
      if (data.screens && data.elements) {
        await loadProjectFromDatabase(projectId);
      }
    } catch (error) {
      console.error('Error loading project:', error);
      toast.error('Failed to load project');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const createNewProject = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      const newProject = {
        name: 'Untitled Project',
        owner_id: user.id,
        screens: [{ id: crypto.randomUUID(), name: 'Screen1', isActive: true }],
        elements: [],
      };

      const { data, error } = await supabase
        .from('projects')
        .insert(newProject)
        .select()
        .single();

      if (error) throw error;

      setProject(data);
      setHasPermission(true);
      
      // Update URL without triggering navigation
      window.history.replaceState(null, '', `/editor/${data.id}`);
      
      toast.success('New project created!');
    } catch (error) {
      console.error('Error creating project:', error);
      toast.error('Failed to create project');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (projectId) {
      loadProject();
    } else {
      // No project ID, create a new project
      createNewProject();
    }
  }, [projectId, user]);

  return {
    project,
    loading,
    hasPermission,
    updateProject
  };
}
