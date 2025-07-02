
import React, { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useWireframe } from "@/hooks/useWireframe";
import { RadioGroup } from "@/components/ui/radio-group";
import { Gauge } from "lucide-react";
import { toast } from "sonner";
import { GaugeStyleTemplate } from "./GaugeStyleTemplate";
import { gaugeTemplateDisplays } from "./GaugeTemplates";

interface GaugeStyleDialogProps {
  elementId: string;
  open: boolean;
  onClose: () => void;
}

export const GaugeStyleDialog = ({ elementId, open, onClose }: GaugeStyleDialogProps) => {
  const { elements, updateElementProperties } = useWireframe();
  const element = elements.find(el => el.id === elementId);
  
  if (!element) return null;
  
  const gaugeProperties = element.properties || {};
  const [gaugeStyle, setGaugeStyle] = useState<string>(
    gaugeProperties.gaugeStyle || 'default'
  );
  
  const applyStyle = () => {
    const selectedTemplate = gaugeTemplateDisplays.find(t => t.id === gaugeStyle);
    
    if (!selectedTemplate) return;
    
    updateElementProperties(elementId, {
      gaugeStyle,
      gaugePrimaryColor: selectedTemplate.primaryColor,
      gaugeSecondaryColor: selectedTemplate.secondaryColor,
    });
    
    toast.success("Gauge style updated successfully!");
    onClose();
  };
  
  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Gauge className="h-5 w-5" />
            Choose gauge style
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 pt-4">
          <div className="text-sm text-muted-foreground mb-2">Available styles</div>
          
          <RadioGroup 
            value={gaugeStyle} 
            onValueChange={setGaugeStyle}
            className="grid grid-cols-2 gap-4"
          >
            {gaugeTemplateDisplays.map(template => (
              <GaugeStyleTemplate
                key={template.id}
                template={template}
                isSelected={gaugeStyle === template.id}
                onSelect={setGaugeStyle}
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
