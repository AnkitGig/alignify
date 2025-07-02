
import { supabase } from "@/integrations/supabase/client";

export function useSilentProjectUpdate() {
  const updateProjectSilently = async (id: string, updates: any) => {
    const { error } = await supabase
      .from('projects')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (error) {
      throw error;
    }
  };

  return { updateProjectSilently };
}
