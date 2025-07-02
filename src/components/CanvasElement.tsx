
import { useState } from "react";
import { useWireframe } from "@/hooks/useWireframe";
import { toast } from "sonner";
import { ElementRenderer } from "./element-renderers/ElementRenderer";
import { ElementInteraction } from "./ElementInteraction";
import { StyleDialogController } from "./StyleDialogController";
import { Element } from "@/types/wireframe";

interface CanvasElementProps {
  element: Element;
  isSelected: boolean;
}

export function CanvasElement({ element, isSelected }: CanvasElementProps) {
  const [activeDialog, setActiveDialog] = useState<string | null>(null);
  const { removeElement } = useWireframe();
  
  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Skip double-click for textbox elements
    if (element.type === 'textbox') {
      return;
    }
    
    switch (element.type) {
      case 'filter':
        setActiveDialog('filter');
        break;
      case 'kpi':
        setActiveDialog('kpi');
        break;
      case 'button':
        setActiveDialog('button');
        break;
      case 'image':
        setActiveDialog('image');
        break;
      case 'shapes':
        setActiveDialog('shapes');
        break;
      case 'header':
        setActiveDialog('header');
        break;
      case 'bar-chart':
        setActiveDialog('bar-chart');
        break;
      case 'column-chart':
        setActiveDialog('column-chart');
        break;
      case 'line-chart':
        setActiveDialog('line-chart');
        break;
      case 'combo-chart':
        setActiveDialog('combo-chart');
        break;
      case 'pie-chart':
        setActiveDialog('pie-chart');
        break;
      case 'simple-table':
        setActiveDialog('table');
        break;
      case 'heatmap':
        setActiveDialog('heatmap');
        break;
      case 'quadrant-chart':
        setActiveDialog('quadrant');
        break;
      case 'scatter-plot':
        setActiveDialog('scatter-plot');
        break;
      case 'waterfall':
        setActiveDialog('waterfall');
        break;
      case 'treemap':
        setActiveDialog('treemap');
        break;
      case 'histogram':
        setActiveDialog('histogram');
        break;
    }
  };
  
  const handleDialogClose = () => {
    setActiveDialog(null);
  };
  
  const handleDelete = (e: React.KeyboardEvent) => {
    if (isSelected && e.key === 'Delete') {
      removeElement(element.id);
      toast.success(`${element.type} removed`);
    }
  };
  
  return (
    <>
      <ElementInteraction 
        element={element}
        isSelected={isSelected} 
        onDoubleClick={handleDoubleClick}
      >
        <div className="h-full w-full" onKeyDown={handleDelete}>
          <ElementRenderer element={element} isEditable={isSelected && element.type === 'simple-table'} />
        </div>
      </ElementInteraction>
      
      <StyleDialogController 
        element={element}
        dialogType={activeDialog}
        onClose={handleDialogClose}
      />
    </>
  );
}
