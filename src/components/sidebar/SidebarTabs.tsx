
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ElementsTab } from "./ElementsTab";
import { LayersTab } from "./LayersTab";

export function SidebarTabs() {
  const [activeTab, setActiveTab] = useState<'elements' | 'layers'>('elements');
  
  return (
    <>
      <div className="border-b flex">
        <button
          className={cn(
            "flex-1 py-3 text-center text-sm font-medium",
            activeTab === 'elements' ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500 hover:text-gray-900"
          )}
          onClick={() => setActiveTab('elements')}
        >
          Elements
        </button>
        <button
          className={cn(
            "flex-1 py-3 text-center text-sm font-medium",
            activeTab === 'layers' ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500 hover:text-gray-900"
          )}
          onClick={() => setActiveTab('layers')}
        >
          Layers
        </button>
      </div>

      <div className="flex-1 overflow-auto p-4">
        {activeTab === 'elements' ? (
          <ElementsTab />
        ) : (
          <LayersTab />
        )}
      </div>
    </>
  );
}
