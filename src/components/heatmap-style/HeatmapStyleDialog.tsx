
import React, { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useWireframe } from "@/hooks/useWireframe";
import { RadioGroup } from "@/components/ui/radio-group";
import { Grid3X3 } from "lucide-react";
import { toast } from "sonner";
import { HeatmapStyleTemplate } from "./HeatmapStyleTemplate";
import { heatmapTemplateDisplays } from "./HeatmapTemplates";

interface HeatmapStyleDialogProps {
  elementId: string;
  open: boolean;
  onClose: () => void;
}

export const HeatmapStyleDialog = ({ elementId, open, onClose }: HeatmapStyleDialogProps) => {
  const { elements, updateElementProperties } = useWireframe();
  const element = elements.find(el => el.id === elementId);
  
  if (!element) return null;
  
  const heatmapProperties = element.properties || {};
  const [heatmapStyle, setHeatmapStyle] = useState<string>(
    heatmapProperties.heatmapStyle || 'default'
  );
  
  const applyStyle = () => {
    const selectedTemplate = heatmapTemplateDisplays.find(t => t.id === heatmapStyle);
    
    if (!selectedTemplate) return;
    
    updateElementProperties(elementId, {
      heatmapStyle,
      heatmapPrimaryColor: selectedTemplate.primaryColor,
      heatmapSecondaryColor: selectedTemplate.secondaryColor,
    });
    
    toast.success("Heatmap style updated successfully!");
    onClose();
  };
  
  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Grid3X3 className="h-5 w-5" />
            Choose heatmap style
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 pt-4">
          <div className="text-sm text-muted-foreground mb-2">Available styles</div>
          
          <RadioGroup 
            value={heatmapStyle} 
            onValueChange={setHeatmapStyle}
            className="grid grid-cols-2 gap-4"
          >
            {heatmapTemplateDisplays.map(template => (
              <HeatmapStyleTemplate
                key={template.id}
                template={template}
                isSelected={heatmapStyle === template.id}
                onSelect={setHeatmapStyle}
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
