
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function useProjectShare(projectId: string | undefined) {
  const { user } = useAuth();
  const [project, setProject] = useState<any>(null);
  const [collaborators, setCollaborators] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjectAndCollaborators = async () => {
    if (!projectId) return;

    try {
      setLoading(true);
      
      // Fetch project details - use maybeSingle to handle cases where project doesn't exist
      const { data: projectData, error: projectError } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .maybeSingle();

      if (projectError) throw projectError;

      if (!projectData) {
        toast.error('Project not found');
        return;
      }

      // Check if user is owner
      if (projectData.owner_id !== user?.id) {
        toast.error('You do not have permission to manage this project');
        return;
      }

      setProject(projectData);

      // Fetch collaborators
      const { data: collabData, error: collabError } = await supabase
        .from('project_collaborators')
        .select(`
          *,
          profiles:user_id (first_name, last_name, email)
        `)
        .eq('project_id', projectId);

      if (collabError) throw collabError;

      setCollaborators(collabData || []);
    } catch (error) {
      console.error('Error fetching project:', error);
      toast.error('Failed to load project details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchProjectAndCollaborators();
    }
  }, [projectId]);

  return {
    project,
    collaborators,
    loading,
    refetch: fetchProjectAndCollaborators
  };
}
