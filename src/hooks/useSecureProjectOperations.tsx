
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useInputValidation } from '@/hooks/useInputValidation';
import { toast } from 'sonner';

export function useSecureProjectOperations() {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { validateProjectName, sanitizeInput } = useInputValidation();

  const createSecureProject = async (name: string, description?: string) => {
    if (!user) {
      toast.error('User not authenticated');
      throw new Error('User not authenticated');
    }

    try {
      setLoading(true);
      
      // Validate and sanitize inputs
      const nameError = validateProjectName(name);
      if (nameError) {
        toast.error(nameError);
        throw new Error(nameError);
      }
      
      const sanitizedName = sanitizeInput(name);
      const sanitizedDescription = description ? sanitizeInput(description) : null;
      
      // Additional length check for description
      if (sanitizedDescription && sanitizedDescription.length > 500) {
        toast.error('Description is too long (max 500 characters)');
        throw new Error('Description too long');
      }
      
      console.log('Creating project with user:', user.id);
      
      const newProject = {
        name: sanitizedName,
        description: sanitizedDescription,
        owner_id: user.id,
        screens: [{ id: crypto.randomUUID(), name: 'Screen1', isActive: true }],
        elements: [],
        is_public: false
      };

      console.log('Project data to insert:', newProject);

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
      toast.success('Project created successfully!');
      return data;
    } catch (error) {
      console.error('Error creating project:', error);
      toast.error('Failed to create project. Please try again.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateSecureProject = async (id: string, updates: any) => {
    if (!user) {
      toast.error('User not authenticated');
      throw new Error('User not authenticated');
    }

    try {
      setLoading(true);
      
      // Sanitize all string inputs
      const sanitizedUpdates = Object.keys(updates).reduce((acc, key) => {
        if (typeof updates[key] === 'string') {
          acc[key] = sanitizeInput(updates[key]);
          
          // Validate specific fields
          if (key === 'name') {
            const nameError = validateProjectName(acc[key]);
            if (nameError) {
              throw new Error(nameError);
            }
          }
          
          if (key === 'description' && acc[key] && acc[key].length > 500) {
            throw new Error('Description is too long (max 500 characters)');
          }
        } else {
          acc[key] = updates[key];
        }
        return acc;
      }, {} as any);
      
      const { error } = await supabase
        .from('projects')
        .update(sanitizedUpdates)
        .eq('id', id)
        .eq('owner_id', user.id); // Ensure user can only update their own projects

      if (error) throw error;

      toast.success('Project updated successfully!');
    } catch (error) {
      console.error('Error updating project:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to update project';
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteSecureProject = async (id: string) => {
    if (!user) {
      toast.error('User not authenticated');
      throw new Error('User not authenticated');
    }

    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)
        .eq('owner_id', user.id); // Ensure user can only delete their own projects

      if (error) throw error;

      toast.success('Project deleted successfully!');
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    createSecureProject,
    updateSecureProject,
    deleteSecureProject
  };
}
