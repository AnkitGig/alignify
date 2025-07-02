
import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useWireframe } from "@/hooks/useWireframe";
import { ChartVariant } from "@/types/wireframe";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface AreaChartStyleDialogProps {
  elementId: string;
  open: boolean;
  onClose: () => void;
}

export const AreaChartStyleDialog = ({ elementId, open, onClose }: AreaChartStyleDialogProps) => {
  const { elements, updateElementProperties } = useWireframe();
  const element = elements.find(el => el.id === elementId);
  
  if (!element) return null;
  
  const chartProperties = element.properties || {};
  const [chartVariant, setChartVariant] = useState<ChartVariant>(
    (chartProperties.chartVariant as ChartVariant) || 'basic-area'
  );
  const [activeTab, setActiveTab] = useState("styles");
  
  const applyStyle = () => {
    updateElementProperties(elementId, {
      chartVariant
    });
    
    toast.success("Chart style updated");
    onClose();
  };
  
  const handleVariantChange = (value: string) => {
    setChartVariant(value as ChartVariant);
  };
  
  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Choose area chart style</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="styles" value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid grid-cols-2 w-[200px]">
            <TabsTrigger value="styles">Styles</TabsTrigger>
            <TabsTrigger value="properties">Properties</TabsTrigger>
          </TabsList>
          
          <TabsContent value="styles" className="space-y-4 pt-4">
            <div className="text-sm text-muted-foreground mb-2">Available styles</div>
            
            <RadioGroup 
              value={chartVariant} 
              onValueChange={handleVariantChange}
              className="grid grid-cols-1 gap-4"
            >
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="basic-area" id="basic-area" />
                  <Label htmlFor="basic-area" className="cursor-pointer">Basic Area</Label>
                </div>
                <div className="border rounded-md p-4 bg-white">
                  <div className="text-sm font-medium mb-2">Title goes here</div>
                  <div className="bg-gradient-to-b from-indigo-400/10 to-indigo-400/40 h-32 relative rounded">
                    <div className="absolute top-0 left-0 h-full w-full">
                      <svg width="100%" height="100%" viewBox="0 0 100 30" preserveAspectRatio="none">
                        <path d="M0,30 L0,10 C10,15 20,5 30,10 C40,15 50,5 60,15 C70,20 80,15 90,10 L100,10 L100,30 Z" fill="none" stroke="#9b87f5" strokeWidth="1"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="kpi-area" id="kpi-area" />
                  <Label htmlFor="kpi-area" className="cursor-pointer">KPI with Area</Label>
                </div>
                <div className="border rounded-md p-4 bg-white">
                  <div className="text-sm font-medium mb-2">Title goes here</div>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center text-xs text-indigo-700 mr-3">
                      <span className="mr-1">●</span> Metric 1
                    </div>
                    <div className="text-xs text-gray-700">1234 | 12% <span className="text-green-600">▲</span></div>
                  </div>
                  <div className="bg-gradient-to-b from-indigo-400/10 to-indigo-400/40 h-24 relative rounded">
                    <div className="absolute top-0 left-0 h-full w-full">
                      <svg width="100%" height="100%" viewBox="0 0 100 30" preserveAspectRatio="none">
                        <path d="M0,30 L0,10 C10,15 20,5 30,10 C40,15 50,5 60,15 C70,20 80,15 90,10 L100,10 L100,30 Z" fill="none" stroke="#9b87f5" strokeWidth="1"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="multi-area" id="multi-area" />
                  <Label htmlFor="multi-area" className="cursor-pointer">Multi Area</Label>
                </div>
                <div className="border rounded-md p-4 bg-white">
                  <div className="text-sm font-medium mb-2">Title goes here</div>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center text-xs text-indigo-700 mr-3">
                      <span className="mr-1">●</span> Dataset 1
                    </div>
                    <div className="flex items-center text-xs text-purple-400 mr-3">
                      <span className="mr-1">●</span> Dataset 2
                    </div>
                  </div>
                  <div className="bg-gradient-to-b from-indigo-400/10 to-indigo-400/40 h-24 relative rounded">
                    <div className="absolute top-0 left-0 h-full w-full">
                      <svg width="100%" height="100%" viewBox="0 0 100 30" preserveAspectRatio="none">
                        <path d="M0,30 L0,10 C10,15 20,5 30,10 C40,15 50,5 60,15 C70,20 80,15 90,10 L100,10 L100,30 Z" fill="none" stroke="#9b87f5" strokeWidth="1"></path>
                        <path d="M0,30 L0,20 C10,18 20,25 30,20 C40,15 50,20 60,22 C70,24 80,21 90,20 L100,20 L100,30 Z" fill="none" stroke="#D6BCFA" strokeWidth="1"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="stacked-area" id="stacked-area" />
                  <Label htmlFor="stacked-area" className="cursor-pointer">Stacked Area</Label>
                </div>
                <div className="border rounded-md p-4 bg-white">
                  <div className="text-sm font-medium mb-2">Title goes here</div>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center text-xs text-indigo-700 mr-3">
                      <span className="mr-1">●</span> Dataset 1
                    </div>
                    <div className="flex items-center text-xs text-purple-400 mr-3">
                      <span className="mr-1">●</span> Dataset 2
                    </div>
                  </div>
                  <div className="h-24 relative rounded overflow-hidden">
                    <div className="absolute bottom-0 left-0 right-0 h-3/4 bg-indigo-400/40"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-2/4 bg-purple-400/40"></div>
                    <div className="absolute top-0 left-0 h-full w-full">
                      <svg width="100%" height="100%" viewBox="0 0 100 30" preserveAspectRatio="none">
                        <path d="M0,30 L0,10 C10,15 20,5 30,10 C40,15 50,5 60,15 C70,20 80,15 90,10 L100,10 L100,30 Z" fill="none" stroke="#9b87f5" strokeWidth="1"></path>
                        <path d="M0,30 L0,20 C10,18 20,25 30,20 C40,15 50,20 60,22 C70,24 80,21 90,20 L100,20 L100,30 Z" fill="none" stroke="#D6BCFA" strokeWidth="1"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </RadioGroup>
          </TabsContent>
          
          <TabsContent value="properties" className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="chartTitle">Chart Title</Label>
                <input
                  id="chartTitle"
                  className="w-full border rounded-md p-2 mt-1"
                  placeholder="Enter chart title"
                  defaultValue={chartProperties.chartTitle || ""}
                  onChange={(e) => {
                    updateElementProperties(elementId, {
                      chartTitle: e.target.value
                    });
                  }}
                />
              </div>
              
              <div>
                <Label htmlFor="chartHeight">Chart Height</Label>
                <input
                  id="chartHeight"
                  type="number"
                  className="w-full border rounded-md p-2 mt-1"
                  placeholder="Chart height"
                  defaultValue={chartProperties.chartHeight || 200}
                  onChange={(e) => {
                    updateElementProperties(elementId, {
                      chartHeight: parseInt(e.target.value) || 200
                    });
                  }}
                />
              </div>
              
              <div>
                <Label htmlFor="barColor">Area Color</Label>
                <div className="flex mt-1">
                  <input
                    id="barColor"
                    type="color"
                    className="w-full border rounded-md p-1 h-10"
                    defaultValue={chartProperties.barColor || "#9b87f5"}
                    onChange={(e) => {
                      updateElementProperties(elementId, {
                        barColor: e.target.value
                      });
                    }}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="secondaryBarColor">Secondary Area Color</Label>
                <div className="flex mt-1">
                  <input
                    id="secondaryBarColor"
                    type="color"
                    className="w-full border rounded-md p-1 h-10"
                    defaultValue={chartProperties.secondaryBarColor || "#D6BCFA"}
                    onChange={(e) => {
                      updateElementProperties(elementId, {
                        secondaryBarColor: e.target.value
                      });
                    }}
                  />
                </div>
              </div>
              
              <div>
                <Label>Show Legend</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <input
                    id="showLegend"
                    type="checkbox"
                    className="w-4 h-4"
                    defaultChecked={chartProperties.showLegend !== false}
                    onChange={(e) => {
                      updateElementProperties(elementId, {
                        showLegend: e.target.checked
                      });
                    }}
                  />
                  <Label htmlFor="showLegend">Display chart legend</Label>
                </div>
              </div>
              
              <div>
                <Label>Show Grid Lines</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <input
                    id="showGridLines"
                    type="checkbox"
                    className="w-4 h-4"
                    defaultChecked={chartProperties.showGridLines !== false}
                    onChange={(e) => {
                      updateElementProperties(elementId, {
                        showGridLines: e.target.checked
                      });
                    }}
                  />
                  <Label htmlFor="showGridLines">Display grid lines</Label>
                </div>
              </div>
              
              <div>
                <Label>Show Labels</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <input
                    id="showLabels"
                    type="checkbox"
                    className="w-4 h-4"
                    defaultChecked={chartProperties.showLabels !== false}
                    onChange={(e) => {
                      updateElementProperties(elementId, {
                        showLabels: e.target.checked
                      });
                    }}
                  />
                  <Label htmlFor="showLabels">Display data labels</Label>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
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
