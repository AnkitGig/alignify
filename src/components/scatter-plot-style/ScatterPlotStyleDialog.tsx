
import React, { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useWireframe } from "@/hooks/useWireframe";
import { RadioGroup } from "@/components/ui/radio-group";
import { ChartScatter } from "lucide-react";
import { toast } from "sonner";
import { ScatterPlotStyleTemplate } from "./ScatterPlotStyleTemplate";
import { scatterPlotTemplateDisplays } from "./ScatterPlotTemplates";

interface ScatterPlotStyleDialogProps {
  elementId: string;
  open: boolean;
  onClose: () => void;
}

export const ScatterPlotStyleDialog = ({ elementId, open, onClose }: ScatterPlotStyleDialogProps) => {
  const { elements, updateElementProperties } = useWireframe();
  const element = elements.find(el => el.id === elementId);
  
  if (!element) return null;
  
  const scatterPlotProperties = element.properties || {};
  const [scatterPlotStyle, setScatterPlotStyle] = useState<string>(
    scatterPlotProperties.scatterPlotStyle || 'default'
  );
  
  const applyStyle = () => {
    const selectedTemplate = scatterPlotTemplateDisplays.find(t => t.id === scatterPlotStyle);
    
    if (!selectedTemplate) return;
    
    updateElementProperties(elementId, {
      scatterPlotStyle,
      scatterPlotPrimaryColor: selectedTemplate.primaryColor,
      scatterPlotSecondaryColor: selectedTemplate.secondaryColor,
    });
    
    toast.success("Scatter plot style updated successfully!");
    onClose();
  };
  
  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ChartScatter className="h-5 w-5" />
            Choose scatter plot style
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 pt-4">
          <div className="text-sm text-muted-foreground mb-2">Available styles</div>
          
          <RadioGroup 
            value={scatterPlotStyle} 
            onValueChange={setScatterPlotStyle}
            className="grid grid-cols-2 gap-4"
          >
            {scatterPlotTemplateDisplays.map(template => (
              <ScatterPlotStyleTemplate
                key={template.id}
                template={template}
                isSelected={scatterPlotStyle === template.id}
                onSelect={setScatterPlotStyle}
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
