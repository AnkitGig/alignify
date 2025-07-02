
import { useRef } from "react";
import { useDrop } from "react-dnd";
import { useWireframe } from "@/hooks/useWireframe";
import { ElementType } from "@/types/wireframe";
import { CanvasElement } from "./CanvasElement";
import { toast } from "sonner";

export function Canvas() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const { elements, addElement, selectedElementId, selectElement, screens } = useWireframe();
  
  // Get the active screen
  const activeScreen = screens.find(screen => screen.isActive);
  
  // Filter elements to only show those from the active screen
  const activeElements = elements.filter(element => 
    activeScreen && element.screenId === activeScreen.id
  );
  
  // Single drop zone for the canvas
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'COMPONENT',
    drop: (item: { type: ElementType }, monitor) => {
      const canvasRect = canvasRef.current?.getBoundingClientRect();
      if (canvasRect && activeScreen) {
        const clientOffset = monitor.getClientOffset();
        if (clientOffset) {
          addElement(
            item.type,
            {
              x: clientOffset.x - canvasRect.left,
              y: clientOffset.y - canvasRect.top,
            }
          );
          
          if (item.type === 'header') {
            toast.info("Double-click header to choose a style");
          } else if (item.type === 'filter') {
            toast.info("Double-click filter to choose a filter style");
          } else if (item.type === 'kpi') {
            toast.info("Double-click KPI to choose a KPI style");
          }
        }
      } else if (!activeScreen) {
        toast.error("No active screen available");
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }), [activeScreen, addElement]);
  
  return (
    <div 
      ref={node => {
        drop(node);
        if (canvasRef) {
          canvasRef.current = node as HTMLDivElement;
        }
      }}
      className={`flex-1 overflow-auto bg-gray-100 h-full relative ${isOver ? 'bg-gray-200' : ''}`}
      onClick={() => selectElement(null)}
    >
      {(!activeElements || activeElements.length === 0) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
          <div className="w-24 h-24 mb-4">
            <svg viewBox="0 0 24 24" fill="none" className="text-gray-300" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 16v-4m0-4h.01M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z" 
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className="text-xl font-medium mb-2">Click/Drag elements onto the canvas & resize instantly!</h3>
          <p className="text-center max-w-md">
            Resize the elements from the bottom right corner to the desired size with a simple drag and release.
          </p>
        </div>
      )}
      
      {activeElements && activeElements.map((element) => (
        <CanvasElement
          key={element.id}
          element={element}
          isSelected={selectedElementId === element.id}
        />
      ))}
    </div>
  );
}
