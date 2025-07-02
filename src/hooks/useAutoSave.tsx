
import { useEffect, useRef } from "react";
import { useWireframe } from "@/hooks/useWireframe";

export function useAutoSave(
  project: any,
  hasPermission: boolean,
  updateProject: (id: string, updates: any) => Promise<void>
) {
  const { screens, elements } = useWireframe();
  const lastSaveRef = useRef<string>('');

  useEffect(() => {
    if (!project || !hasPermission) return;

    // Create a hash of the current state to avoid unnecessary saves
    const currentStateHash = JSON.stringify({ screens, elements });
    
    // Only save if the state has actually changed
    if (currentStateHash === lastSaveRef.current) {
      return;
    }

    // Save immediately when state changes
    const saveProject = async () => {
      try {
        // Double-check that we still need to save
        const newStateHash = JSON.stringify({ screens, elements });
        if (newStateHash === lastSaveRef.current) {
          return;
        }

        console.log('Auto-saving project...');
        await updateProject(project.id, {
          screens,
          elements,
        });
        
        // Update the last saved state
        lastSaveRef.current = newStateHash;
        console.log('Auto-save completed');
      } catch (error) {
        console.error('Auto-save failed:', error);
      }
    };

    // Save immediately
    saveProject();
    
    // Also set up the interval for periodic saves (only if state has changed)
    const interval = setInterval(() => {
      const stateHash = JSON.stringify({ screens, elements });
      if (stateHash !== lastSaveRef.current) {
        saveProject();
      }
    }, 30000); // Check every 30 seconds
    
    // Save on unmount only if there are unsaved changes
    return () => {
      clearInterval(interval);
      
      const finalStateHash = JSON.stringify({ screens, elements });
      if (finalStateHash !== lastSaveRef.current) {
        saveProject();
      }
    };
  }, [project?.id, screens, elements, hasPermission, updateProject]);
}
