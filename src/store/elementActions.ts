
import { Element, ElementType } from '@/types/wireframe';
import { StateCreator } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { WireframeState } from '@/types/wireframeState';
import { getDefaultSizeForType, getDefaultPropertiesForType } from '@/utils/elementDefaults';

export interface ElementSlice {
  elements: Element[];
  selectedElementId: string | null;
  showProperties: boolean;
  
  addElement: (type: ElementType, position: { x: number; y: number }) => void;
  updateElement: (id: string, updates: Partial<Element>) => void;
  removeElement: (id: string) => void;
  selectElement: (id: string | null) => void;
  toggleProperties: () => void;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
  updateLogoImage: (id: string, logoUrl: string) => void;
  updateImage: (id: string, imageUrl: string) => void;
}

export const createElementSlice: StateCreator<
  WireframeState,
  [],
  [],
  ElementSlice
> = (set, get) => ({
  elements: [],
  selectedElementId: null,
  showProperties: false,
  
  addElement: (type, position) => {
    const newElement: Element = {
      id: uuidv4(),
      type,
      position,
      size: getDefaultSizeForType(type),
      screenId: get().screens.find(screen => screen.isActive)?.id || get().screens[0].id,
      properties: getDefaultPropertiesForType(type)
    };
    
    set(state => ({
      elements: [...state.elements, newElement],
      selectedElementId: newElement.id,
      showProperties: true
    }));
  },
  
  updateElement: (id, updates) => {
    set(state => ({
      elements: state.elements.map(el => 
        el.id === id ? { ...el, ...updates } : el
      ),
    }));
  },
  
  removeElement: (id) => {
    set(state => ({
      elements: state.elements.filter(el => el.id !== id),
      selectedElementId: state.selectedElementId === id ? null : state.selectedElementId,
    }));
  },
  
  selectElement: (id) => {
    set({ 
      selectedElementId: id,
      showProperties: id !== null 
    });
  },
  
  toggleProperties: () => {
    set(state => ({
      showProperties: !state.showProperties
    }));
  },
  
  updateElementProperties: (id, properties) => {
    console.log('ElementSlice updateElementProperties called with:', { id, properties });
    
    set(state => ({
      elements: state.elements.map(el => {
        if (el.id === id) {
          const updatedElement = { 
            ...el, 
            properties: {
              ...el.properties,
              ...properties
            } 
          };
          console.log('Updated element properties:', updatedElement.properties);
          return updatedElement;
        }
        return el;
      }),
    }));
  },
  
  updateLogoImage: (id, logoUrl) => {
    set(state => ({
      elements: state.elements.map(el => 
        el.id === id ? { 
          ...el, 
          properties: {
            ...el.properties,
            logoUrl
          } 
        } : el
      ),
    }));
  },
  
  updateImage: (id, imageUrl) => {
    set(state => ({
      elements: state.elements.map(el => 
        el.id === id ? { 
          ...el, 
          properties: {
            ...el.properties,
            imageUrl
          } 
        } : el
      ),
    }));
  },
});
