
import { useParams } from "react-router-dom";
import { useWireframe } from "@/hooks/useWireframe";
import { useProjectLoader } from "@/hooks/useProjectLoader";
import { useAutoSave } from "@/hooks/useAutoSave";
import { useSilentProjectUpdate } from "@/hooks/useSilentProjectUpdate";
import { EditorLayout } from "@/components/editor/EditorLayout";
import { EditorLoading } from "@/components/editor/EditorLoading";

export default function Editor() {
  const { projectId } = useParams();
  const { updateElementProperties } = useWireframe();
  
  const { project, loading, hasPermission, updateProject } = useProjectLoader(projectId);
  const { updateProjectSilently } = useSilentProjectUpdate();
  
  // Set up auto-save with silent updates
  useAutoSave(project, hasPermission, updateProjectSilently);

  if (loading) {
    return <EditorLoading />;
  }

  return (
    <EditorLayout 
      hasPermission={hasPermission}
      updateElementProperties={updateElementProperties}
    />
  );
}
