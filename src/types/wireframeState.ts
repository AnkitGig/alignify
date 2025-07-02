
import { Element, Screen, Template, ElementType } from './wireframe';

export interface WireframeState {
  screens: Screen[];
  elements: Element[];
  selectedElementId: string | null;
  templates: Template[];
  activeTemplateId: string | null;
  showProperties: boolean;
  
  // Actions
  addElement: (type: ElementType, position: { x: number; y: number }) => void;
  updateElement: (id: string, updates: Partial<Element>) => void;
  removeElement: (id: string) => void;
  selectElement: (id: string | null) => void;
  saveTemplate: (name: string) => Promise<void>;
  loadTemplate: (id: string) => Promise<void>;
  createNewTemplate: () => void;
  deleteTemplate: (id: string) => Promise<void>;
  toggleProperties: () => void;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
  updateLogoImage: (id: string, logoUrl: string) => void;
  updateImage: (id: string, imageUrl: string) => void;
  fetchTemplates: () => Promise<void>;
  
  // Screen actions
  addScreen: () => void;
  switchScreen: (id: string) => void;
  renameScreen: (id: string, name: string) => void;
  deleteScreen: (id: string) => void;
}
