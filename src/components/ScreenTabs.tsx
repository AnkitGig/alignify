
import { Plus } from "lucide-react";
import { useWireframe } from "@/hooks/useWireframe";
import { Button } from "@/components/ui/button";

export function ScreenTabs() {
  const { screens, switchScreen, addScreen, deleteScreen } = useWireframe();
  
  return (
    <div className="border-b flex items-center px-2 bg-gray-50">
      <div className="flex-1 flex overflow-x-auto py-1">
        {screens.map((screen) => (
          <button
            key={screen.id}
            className={`px-4 py-2 text-sm font-medium rounded-t-md mr-1 min-w-[100px] ${
              screen.isActive 
                ? "bg-white border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:bg-gray-100"
            }`}
            onClick={() => switchScreen(screen.id)}
          >
            {screen.name}
            {screens.length > 1 && screen.isActive && (
              <span 
                className="ml-2 text-gray-400 hover:text-gray-600" 
                onClick={(e) => {
                  e.stopPropagation();
                  deleteScreen(screen.id);
                }}
              >
                ×
              </span>
            )}
          </button>
        ))}
      </div>
      <Button 
        variant="ghost" 
        size="sm" 
        className="ml-2" 
        onClick={() => addScreen()}
      >
        <Plus className="h-4 w-4 mr-1" />
        Add Screen
      </Button>
    </div>
  );
}
