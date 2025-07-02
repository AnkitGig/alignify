
import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useWireframe } from "@/hooks/useWireframe";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check, Gauge } from "lucide-react";
import { toast } from "sonner";

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
  
  const templates = [
    {
      id: 'default',
      name: 'Default',
      primaryColor: '#4F46E5',
      secondaryColor: '#E5E7EB',
      display: (
        <div className="border rounded-md p-4 bg-white">
          <div className="text-sm font-medium mb-2">Title goes here</div>
          <div className="relative w-full h-[100px]">
            <div className="w-full h-full bg-gray-200 rounded-t-full overflow-hidden" style={{ clipPath: 'polygon(0 50%, 100% 50%, 100% 0, 0 0)' }}>
              <div className="w-[40%] h-full bg-indigo-600 rounded-t-full" style={{ clipPath: 'polygon(0 50%, 100% 50%, 100% 0, 0 0)' }}></div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold">4K</div>
            <div className="absolute bottom-0 left-0 text-xs">2K</div>
            <div className="absolute bottom-0 right-0 text-xs">7K</div>
          </div>
        </div>
      )
    },
    {
      id: 'speed-gauge',
      name: 'Speed-Gauge',
      primaryColor: '#9b87f5',
      secondaryColor: '#F1F0FB',
      display: (
        <div className="border rounded-md p-4 bg-white">
          <div className="text-sm font-medium mb-2">Title goes here</div>
          <div className="relative w-full h-[100px]">
            <div className="w-full h-full bg-purple-100 rounded-t-full overflow-hidden" style={{ clipPath: 'polygon(0 50%, 100% 50%, 100% 0, 0 0)' }}>
              <div className="w-[40%] h-full bg-purple-400 rounded-t-full" style={{ clipPath: 'polygon(0 50%, 100% 50%, 100% 0, 0 0)' }}></div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold">40K</div>
            <div className="absolute bottom-0 left-0 text-xs">10K</div>
            <div className="absolute bottom-0 right-0 text-xs">100K</div>
            {/* Needle */}
            <div className="absolute w-[1px] h-[50px] bg-gray-800 origin-bottom" 
              style={{ 
                bottom: '0px', 
                left: '40%', 
                transform: 'rotate(-30deg)',
                transformOrigin: 'bottom'
              }}>
              <div className="absolute w-2 h-2 rounded-full bg-gray-800 -top-1 -left-1"></div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'round-gauge',
      name: 'Round Gauge',
      primaryColor: '#3B82F6',
      secondaryColor: '#EFF6FF',
      display: (
        <div className="border rounded-md p-4 bg-white">
          <div className="text-sm font-medium mb-2">Title goes here</div>
          <div className="relative w-full h-[100px]">
            <div className="absolute w-full h-full flex items-center justify-center">
              <div className="relative w-full h-full">
                <div className="absolute inset-0 rounded-full border-8 border-blue-100"></div>
                <div className="absolute inset-0 rounded-full border-8 border-blue-500" style={{ 
                  clipPath: 'polygon(50% 50%, 50% 0, 75% 0, 75% 25%, 50% 50%)',
                  transform: 'rotate(45deg)'
                }}></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold">40%</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'digital-gauge',
      name: 'Digital Gauge',
      primaryColor: '#10B981',
      secondaryColor: '#ECFDF5',
      display: (
        <div className="border rounded-md p-4 bg-white">
          <div className="text-sm font-medium mb-2">Title goes here</div>
          <div className="flex flex-col items-center justify-center h-[100px] bg-gray-50 rounded-md border">
            <div className="text-xl font-bold text-green-600">40K</div>
            <div className="w-full mt-2 px-4">
              <div className="w-full h-2 bg-green-100 rounded-full">
                <div className="h-2 bg-green-500 rounded-full" style={{ width: "40%" }}></div>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-500">0</span>
                <span className="text-xs text-gray-500">100K</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'gradient-gauge',
      name: 'Gradient Gauge',
      primaryColor: '#EC4899',
      secondaryColor: '#F9A8D4',
      display: (
        <div className="border rounded-md p-4 bg-white">
          <div className="text-sm font-medium mb-2">Title goes here</div>
          <div className="relative w-full h-[100px]">
            <div className="w-full h-full rounded-t-full overflow-hidden bg-gradient-to-r from-pink-100 to-pink-50" style={{ clipPath: 'polygon(0 50%, 100% 50%, 100% 0, 0 0)' }}>
              <div className="w-[40%] h-full rounded-t-full bg-gradient-to-r from-pink-600 to-pink-400" style={{ clipPath: 'polygon(0 50%, 100% 50%, 100% 0, 0 0)' }}></div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold text-pink-700">40K</div>
            <div className="absolute bottom-0 left-0 text-xs text-pink-700">0</div>
            <div className="absolute bottom-0 right-0 text-xs text-pink-700">100K</div>
            {/* Needle */}
            <div className="absolute w-[1px] h-[50px] bg-pink-800 origin-bottom" 
              style={{ 
                bottom: '0px', 
                left: '40%', 
                transform: 'rotate(-30deg)',
                transformOrigin: 'bottom'
              }}>
              <div className="absolute w-2 h-2 rounded-full bg-pink-800 -top-1 -left-1"></div>
            </div>
          </div>
        </div>
      )
    }
  ];
  
  const applyStyle = () => {
    const selectedTemplate = templates.find(t => t.id === gaugeStyle);
    
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
            {templates.map(template => (
              <div key={template.id} className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={template.id} id={template.id} className="sr-only" />
                  <Label htmlFor={template.id} className="cursor-pointer w-full">
                    <div className={`border-2 rounded-md p-2 transition-all hover:border-gray-300 ${gaugeStyle === template.id ? 'border-indigo-600 shadow-sm' : 'border-gray-200'}`}>
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium">{template.name}</span>
                        {gaugeStyle === template.id && (
                          <div className="h-5 w-5 bg-indigo-600 rounded-full flex items-center justify-center">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </div>
                      {template.display}
                    </div>
                  </Label>
                </div>
              </div>
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
