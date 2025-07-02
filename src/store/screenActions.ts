
import { Screen } from '@/types/wireframe';
import { StateCreator } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { WireframeState } from '@/types/wireframeState';

export interface ScreenSlice {
  screens: Screen[];
  
  addScreen: () => void;
  switchScreen: (id: string) => void;
  renameScreen: (id: string, name: string) => void;
  deleteScreen: (id: string) => void;
}

export const createScreenSlice: StateCreator<
  WireframeState,
  [],
  [],
  ScreenSlice
> = (set, get) => ({
  screens: [{
    id: uuidv4(),
    name: 'Screen1',
    isActive: true
  }],
  
  addScreen: () => {
    const { screens } = get();
    const newScreenId = uuidv4();
    const screenNumber = screens.length + 1;
    
    const newScreen: Screen = {
      id: newScreenId,
      name: `Screen${screenNumber}`,
      isActive: false
    };
    
    set(state => ({
      screens: state.screens.map(screen => ({
        ...screen,
        isActive: false
      })).concat(newScreen)
    }));
    
    // Activate the new screen
    get().switchScreen(newScreenId);
  },
  
  switchScreen: (id) => {
    set(state => ({
      screens: state.screens.map(screen => ({
        ...screen,
        isActive: screen.id === id
      })),
      selectedElementId: null,
      showProperties: false
    }));
  },
  
  renameScreen: (id, name) => {
    set(state => ({
      screens: state.screens.map(screen => 
        screen.id === id ? { ...screen, name } : screen
      )
    }));
  },
  
  deleteScreen: (id) => {
    const { screens } = get();
    
    // Don't allow deleting the last screen
    if (screens.length <= 1) {
      return;
    }
    
    const screenToDelete = screens.find(screen => screen.id === id);
    if (!screenToDelete) return;
    
    // If the screen to delete is active, activate another screen
    let newActiveScreenId = null;
    if (screenToDelete.isActive) {
      const otherScreen = screens.find(screen => screen.id !== id);
      if (otherScreen) {
        newActiveScreenId = otherScreen.id;
      }
    }
    
    set(state => ({
      screens: state.screens
        .filter(screen => screen.id !== id)
        .map(screen => ({
          ...screen,
          isActive: newActiveScreenId ? screen.id === newActiveScreenId : screen.isActive
        })),
      elements: state.elements.filter(element => element.screenId !== id)
    }));
    
    // If we had to change the active screen, switch to it
    if (newActiveScreenId) {
      get().switchScreen(newActiveScreenId);
    }
  },
});
