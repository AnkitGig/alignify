
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useWireframe } from "@/hooks/useWireframe";

export function LayersTab() {
  const { elements, selectedElementId, selectElement, removeElement } = useWireframe();
  
  return (
    <div className="space-y-1">
      {elements.map((element) => (
        <div
          key={element.id}
          className={cn(
            "px-2 py-1.5 rounded-md flex items-center justify-between text-sm",
            selectedElementId === element.id
              ? "bg-blue-100 text-blue-900"
              : "hover:bg-gray-100"
          )}
          onClick={() => selectElement(element.id)}
        >
          <span>{element.type}</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={(e) => {
              e.stopPropagation();
              removeElement(element.id);
            }}
          >
            ×
          </Button>
        </div>
      ))}
      
      {elements.length === 0 && (
        <div className="text-gray-500 text-sm p-2 text-center">
          No elements on canvas
        </div>
      )}
    </div>
  );
}
