
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WireframeState } from '@/types/wireframeState';
import { createElementSlice } from '@/store/elementActions';
import { createScreenSlice } from '@/store/screenActions';
import { createTemplateSlice } from '@/store/templateActions';
import { supabase } from '@/integrations/supabase/client';
import { Screen, Element } from '@/types/wireframe';

// Re-export types for convenience
export type { ElementType, FilterVariant, KpiVariant, ButtonVariant, ButtonSize, 
  HeaderVariant, ShapeVariant, ChartVariant, Element, Screen, Template } from '../types/wireframe';

// Extended interface for project management
interface ProjectWireframeState extends WireframeState {
  // Project management
  currentProjectId: string | null;
  setCurrentProject: (projectId: string | null) => void;
  loadProjectFromDatabase: (projectId: string) => Promise<void>;
  saveProjectToDatabase: (projectId: string) => Promise<void>;
}

// Combine all slices into one store with project management
export const useWireframe = create<ProjectWireframeState>()(
  persist(
    (set, get, store) => ({
      ...createElementSlice(set, get, store),
      ...createScreenSlice(set, get, store),
      ...createTemplateSlice(set, get, store),
      
      // Project management state
      currentProjectId: null,
      
      // Project management actions
      setCurrentProject: (projectId) => {
        set({ currentProjectId: projectId });
      },
      
      loadProjectFromDatabase: async (projectId: string) => {
        try {
          const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('id', projectId)
            .single();
            
          if (error) throw error;
          
          if (data) {
            // Type cast with proper validation using unknown first
            const screens: Screen[] = Array.isArray(data.screens) 
              ? (data.screens as unknown) as Screen[]
              : [{ id: crypto.randomUUID(), name: 'Screen1', isActive: true }];
            const elements: Element[] = Array.isArray(data.elements) 
              ? (data.elements as unknown) as Element[]
              : [];
            
            set({
              screens,
              elements,
              currentProjectId: projectId,
              selectedElementId: null,
            });
          }
        } catch (error) {
          console.error('Error loading project:', error);
          throw error;
        }
      },
      
      saveProjectToDatabase: async (projectId: string) => {
        try {
          const state = get();
          
          const { error } = await supabase
            .from('projects')
            .update({
              screens: state.screens as any,
              elements: state.elements as any,
              updated_at: new Date().toISOString()
            })
            .eq('id', projectId);
            
          if (error) throw error;
        } catch (error) {
          console.error('Error saving project:', error);
          throw error;
        }
      },
    }),
    {
      name: 'wireframe-storage',
      partialize: (state) => ({
        // Only persist template-related data, not project-specific data
        templates: state.templates,
        showProperties: state.showProperties,
      }),
    }
  )
);
