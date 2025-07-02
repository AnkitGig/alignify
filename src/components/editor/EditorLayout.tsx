
import { ReactNode } from "react";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/sidebar";
import { ScreenTabs } from "@/components/ScreenTabs";
import { Canvas } from "@/components/Canvas";
import { PropertiesPanel } from "@/components/PropertiesPanel";
import { SaveTemplateDialog } from "@/components/SaveTemplateDialog";
import { StyleDialogController } from "@/components/StyleDialogController";
import { useWireframe } from "@/hooks/useWireframe";

interface EditorLayoutProps {
  hasPermission: boolean;
  updateElementProperties: (id: string, properties: any) => void;
}

export function EditorLayout({ hasPermission, updateElementProperties }: EditorLayoutProps) {
  const { showProperties } = useWireframe();

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen flex flex-col bg-gray-50">
        <Navbar />
        
        <div className="flex-1 flex overflow-hidden">
          <Sidebar />
          
          <div className="flex-1 flex flex-col">
            <ScreenTabs />
            <div className="flex-1 flex overflow-hidden">
              <div className="flex-1 overflow-hidden">
                <Canvas />
              </div>
              {showProperties && (
                <div className="w-80 border-l bg-white overflow-y-auto">
                  <PropertiesPanel updateElementProperties={updateElementProperties} />
                </div>
              )}
            </div>
          </div>
        </div>

        <SaveTemplateDialog open={false} onOpenChange={() => {}} />
        <StyleDialogController element={null} dialogType={null} onClose={() => {}} />
        
        {!hasPermission && (
          <div className="fixed bottom-4 right-4 bg-yellow-100 border border-yellow-400 rounded-lg p-3">
            <p className="text-sm text-yellow-800">
              You have view-only access to this project
            </p>
          </div>
        )}
      </div>
    </DndProvider>
  );
}
