
import { Template } from '@/types/wireframe';
import { StateCreator } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { WireframeState } from '@/types/wireframeState';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface TemplateSlice {
  templates: Template[];
  activeTemplateId: string | null;
  
  saveTemplate: (name: string) => Promise<void>;
  loadTemplate: (id: string) => Promise<void>;
  createNewTemplate: () => void;
  deleteTemplate: (id: string) => Promise<void>;
  fetchTemplates: () => Promise<void>;
}

export const createTemplateSlice: StateCreator<
  WireframeState,
  [],
  [],
  TemplateSlice
> = (set, get) => ({
  templates: [],
  activeTemplateId: null,
  
  saveTemplate: async (name) => {
    const { elements, activeTemplateId, templates, screens } = get();
    const now = Date.now();
    
    try {
      if (activeTemplateId) {
        // Update existing template
        const template = {
          id: activeTemplateId,
          name,
          screens,
          elements,
          updatedAt: now,
        };
        
        // Update in Supabase
        const { error } = await supabase
          .from('templates')
          .update({ 
            name,
            screens: JSON.stringify(screens),
            elements: JSON.stringify(elements),
            updated_at: new Date(now).toISOString()
          })
          .eq('id', activeTemplateId);
          
        if (error) throw error;
        
        // Update local state
        set({
          templates: templates.map(t => 
            t.id === activeTemplateId 
              ? { ...t, name, screens, elements, updatedAt: now }
              : t
          ),
        });
      } else {
        // Create new template
        const newId = uuidv4();
        const newTemplate = {
          id: newId,
          name,
          screens,
          elements,
          createdAt: now,
          updatedAt: now,
        };
        
        // Insert into Supabase
        const { error } = await supabase
          .from('templates')
          .insert({ 
            id: newId,
            name,
            screens: JSON.stringify(screens),
            elements: JSON.stringify(elements),
            created_at: new Date(now).toISOString(),
            updated_at: new Date(now).toISOString()
          });
          
        if (error) throw error;
        
        // Update local state
        set(state => ({
          templates: [...state.templates, newTemplate],
          activeTemplateId: newId,
        }));
      }
    } catch (error) {
      console.error('Error saving template:', error);
      toast.error('Failed to save template. Please try again.');
    }
  },
  
  loadTemplate: async (id) => {
    try {
      // Try to find template in local state first
      const localTemplate = get().templates.find(t => t.id === id);
      
      if (localTemplate) {
        set({
          screens: localTemplate.screens,
          elements: localTemplate.elements,
          activeTemplateId: id,
          selectedElementId: null,
        });
        return;
      }
      
      // If not found locally, try to fetch from Supabase
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .eq('id', id)
        .single();
        
      if (error) throw error;
      
      if (data) {
        const parsedScreens = JSON.parse(data.screens as string);
        const parsedElements = JSON.parse(data.elements as string);
        
        const template = {
          id: data.id,
          name: data.name,
          screens: parsedScreens,
          elements: parsedElements,
          createdAt: new Date(data.created_at).getTime(),
          updatedAt: new Date(data.updated_at).getTime(),
        };
        
        set({
          screens: template.screens,
          elements: template.elements,
          activeTemplateId: id,
          selectedElementId: null,
          templates: [...get().templates.filter(t => t.id !== id), template]
        });
      }
    } catch (error) {
      console.error('Error loading template:', error);
      toast.error('Failed to load template. Please try again.');
    }
  },
  
  createNewTemplate: () => {
    const initialScreen = {
      id: uuidv4(),
      name: 'Screen1',
      isActive: true
    };
    
    set({
      screens: [initialScreen],
      elements: [],
      selectedElementId: null,
      activeTemplateId: null,
    });
  },
  
  deleteTemplate: async (id) => {
    try {
      // Delete from Supabase
      const { error } = await supabase
        .from('templates')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      // Update local state
      set(state => ({
        templates: state.templates.filter(t => t.id !== id),
        screens: state.activeTemplateId === id ? [{
          id: uuidv4(),
          name: 'Screen1',
          isActive: true
        }] : state.screens,
        elements: state.activeTemplateId === id ? [] : state.elements,
        activeTemplateId: state.activeTemplateId === id ? null : state.activeTemplateId,
      }));
    } catch (error) {
      console.error('Error deleting template:', error);
      toast.error('Failed to delete template. Please try again.');
    }
  },
  
  fetchTemplates: async () => {
    try {
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .order('updated_at', { ascending: false });
        
      if (error) throw error;
      
      if (data) {
        const templates = data.map(item => ({
          id: item.id,
          name: item.name,
          screens: JSON.parse(item.screens as string),
          elements: JSON.parse(item.elements as string),
          createdAt: new Date(item.created_at).getTime(),
          updatedAt: new Date(item.updated_at).getTime(),
        }));
        
        set({ templates });
      }
    } catch (error) {
      console.error('Error fetching templates:', error);
      toast.error('Failed to fetch templates. Please try again.');
    }
  },
});
