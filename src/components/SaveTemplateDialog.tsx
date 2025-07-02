
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useWireframe } from "@/hooks/useWireframe";
import { toast } from "sonner";
import { CanvasElement } from "@/components/CanvasElement";
import { Loader2 } from "lucide-react";

interface SaveTemplateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SaveTemplateDialog({ open, onOpenChange }: SaveTemplateDialogProps) {
  const [name, setName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const { saveTemplate, templates, activeTemplateId, elements, screens } = useWireframe();
  const navigate = useNavigate();
  const previewRef = useRef<HTMLDivElement>(null);
  
  // Get the active screen
  const activeScreen = screens.find(screen => screen.isActive) || screens[0];
  
  // Get elements for the active screen
  const activeScreenElements = elements.filter(element => element.screenId === activeScreen?.id);
  
  useEffect(() => {
    if (open && activeTemplateId) {
      const currentTemplate = templates.find(t => t.id === activeTemplateId);
      if (currentTemplate) {
        setName(currentTemplate.name);
      }
    }
  }, [open, activeTemplateId, templates]);
  
  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Please enter a template name");
      return;
    }
    
    setIsSaving(true);
    
    try {
      await saveTemplate(name);
      toast.success("Template saved successfully!");
      onOpenChange(false);
      
      // Navigate to templates section after successful save
      navigate("/templates");
    } catch (error) {
      console.error("Error saving template:", error);
      toast.error("Failed to save template. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Save Template</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
              placeholder="My Awesome Template"
              autoFocus
            />
          </div>
          
          <div className="mt-2">
            <Label className="mb-2 block">Preview</Label>
            <div className="aspect-video bg-white rounded-md border overflow-hidden">
              <div ref={previewRef} className="relative w-full h-full border border-gray-200 overflow-hidden" style={{ transform: "scale(0.4)", transformOrigin: "top left", width: "250%", height: "250%" }}>
                {activeScreenElements.length > 0 ? (
                  activeScreenElements.map(element => (
                    <CanvasElement
                      key={element.id}
                      element={element}
                      isSelected={false}
                    />
                  ))
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                    <span className="text-sm font-medium text-gray-500">Empty template</span>
                  </div>
                )}
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {activeScreenElements.length} element{activeScreenElements.length === 1 ? '' : 's'} in preview
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSaving}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Template'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
