
import React, { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useWireframe } from "@/hooks/useWireframe";
import { RadioGroup } from "@/components/ui/radio-group";
import { Grid3X3 } from "lucide-react";
import { toast } from "sonner";
import { QuadrantStyleTemplate } from "./QuadrantStyleTemplate";
import { quadrantTemplateDisplays } from "./QuadrantTemplates";

interface QuadrantStyleDialogProps {
  elementId: string;
  open: boolean;
  onClose: () => void;
}

export const QuadrantStyleDialog = ({ elementId, open, onClose }: QuadrantStyleDialogProps) => {
  const { elements, updateElementProperties } = useWireframe();
  const element = elements.find(el => el.id === elementId);
  
  if (!element) return null;
  
  const quadrantProperties = element.properties || {};
  const [quadrantStyle, setQuadrantStyle] = useState<string>(
    quadrantProperties.quadrantStyle || 'default'
  );
  
  const applyStyle = () => {
    const selectedTemplate = quadrantTemplateDisplays.find(t => t.id === quadrantStyle);
    
    if (!selectedTemplate) return;
    
    updateElementProperties(elementId, {
      quadrantStyle,
      quadrantPrimaryColor: selectedTemplate.primaryColor,
      quadrantSecondaryColor: selectedTemplate.secondaryColor,
    });
    
    toast.success("Quadrant chart style updated successfully!");
    onClose();
  };
  
  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Grid3X3 className="h-5 w-5" />
            Choose quadrant chart style
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 pt-4">
          <div className="text-sm text-muted-foreground mb-2">Available styles</div>
          
          <RadioGroup 
            value={quadrantStyle} 
            onValueChange={setQuadrantStyle}
            className="grid grid-cols-2 gap-4"
          >
            {quadrantTemplateDisplays.map(template => (
              <QuadrantStyleTemplate
                key={template.id}
                template={template}
                isSelected={quadrantStyle === template.id}
                onSelect={setQuadrantStyle}
              />
            ))}
          </RadioGroup>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={applyStyle} className="bg-indigo-600 hover:bg-indigo-700 text-white">
            Apply style
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
