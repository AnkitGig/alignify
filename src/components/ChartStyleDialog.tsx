
import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useWireframe, ChartVariant } from "@/hooks/useWireframe";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ChartBar, ChartBarStacked } from "lucide-react";

interface ChartStyleDialogProps {
  elementId: string;
  open: boolean;
  onClose: () => void;
}

export const ChartStyleDialog = ({ elementId, open, onClose }: ChartStyleDialogProps) => {
  const { elements, updateElementProperties } = useWireframe();
  const element = elements.find(el => el.id === elementId);
  
  if (!element) return null;
  
  const chartProperties = element.properties || {};
  const [chartVariant, setChartVariant] = useState<ChartVariant>(
    (chartProperties.chartVariant as ChartVariant) || 'bar'
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
    // Convert the string value to ChartVariant type
    setChartVariant(value as ChartVariant);
  };
  
  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Choose chart style</DialogTitle>
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
                  <RadioGroupItem value="bar" id="bar" />
                  <Label htmlFor="bar" className="cursor-pointer">Default Bar</Label>
                </div>
                <div className="border rounded-md p-4 bg-white">
                  <div className="text-sm font-medium mb-2">Title goes here</div>
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-2">
                      <div className="text-xs text-gray-500 w-12">Jan 22</div>
                      <div className="bg-indigo-600 h-4 rounded" style={{ width: '40%' }}></div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-xs text-gray-500 w-12">Feb 22</div>
                      <div className="bg-indigo-600 h-4 rounded" style={{ width: '60%' }}></div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-xs text-gray-500 w-12">Mar 22</div>
                      <div className="bg-indigo-600 h-4 rounded" style={{ width: '20%' }}></div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-xs text-gray-500 w-12">Apr 22</div>
                      <div className="bg-indigo-600 h-4 rounded" style={{ width: '70%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dropdown-bar" id="dropdown-bar" />
                  <Label htmlFor="dropdown-bar" className="cursor-pointer">Dropdown-Bar</Label>
                </div>
                <div className="border rounded-md p-4 bg-white">
                  <div className="text-sm font-medium mb-2">Title goes here</div>
                  <div className="flex items-center justify-end mb-2">
                    <div className="text-xs border px-2 py-1 rounded flex items-center">
                      Title 1
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="m6 9 6 6 6-6"/></svg>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-2">
                      <div className="text-xs text-gray-500 w-12">Jan 22</div>
                      <div className="bg-indigo-600 h-4 rounded" style={{ width: '40%' }}></div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-xs text-gray-500 w-12">Feb 22</div>
                      <div className="bg-indigo-600 h-4 rounded" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="kpi-bar" id="kpi-bar" />
                  <Label htmlFor="kpi-bar" className="cursor-pointer">KPI-Bar</Label>
                </div>
                <div className="border rounded-md p-4 bg-white">
                  <div className="text-sm font-medium mb-2">Title goes here</div>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center text-xs text-blue-700 mr-3">
                      <span className="mr-1">●</span> Metric 1
                    </div>
                    <div className="text-xs text-gray-700">1234 | 12% <span className="text-green-600">▲</span></div>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-2">
                      <div className="text-xs text-gray-500 w-12">Jan 22</div>
                      <div className="bg-indigo-600 h-4 rounded" style={{ width: '40%' }}></div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-xs text-gray-500 w-12">Feb 22</div>
                      <div className="bg-indigo-600 h-4 rounded" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="multi-bar" id="multi-bar" />
                  <Label htmlFor="multi-bar" className="cursor-pointer">Multi-Bar</Label>
                </div>
                <div className="border rounded-md p-4 bg-white">
                  <div className="text-sm font-medium mb-2">Title goes here</div>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center text-xs text-blue-700 mr-3">
                      <span className="mr-1">●</span> Dataset 1
                    </div>
                    <div className="flex items-center text-xs text-purple-700 mr-3">
                      <span className="mr-1">●</span> Dataset 2
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-2">
                      <div className="text-xs text-gray-500 w-12">Jan 22</div>
                      <div className="flex">
                        <div className="bg-indigo-600 h-4 rounded-l" style={{ width: '30%' }}></div>
                        <div className="bg-indigo-300 h-4 rounded-r" style={{ width: '40%' }}></div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-xs text-gray-500 w-12">Feb 22</div>
                      <div className="flex">
                        <div className="bg-indigo-600 h-4 rounded-l" style={{ width: '30%' }}></div>
                        <div className="bg-indigo-300 h-4 rounded-r" style={{ width: '40%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="stacked-bar" id="stacked-bar" />
                  <Label htmlFor="stacked-bar" className="cursor-pointer">Stacked-Bar</Label>
                </div>
                <div className="border rounded-md p-4 bg-white">
                  <div className="text-sm font-medium mb-2">Title goes here</div>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center text-xs text-blue-700 mr-3">
                      <span className="mr-1">●</span> Dataset 1
                    </div>
                    <div className="flex items-center text-xs text-purple-700 mr-3">
                      <span className="mr-1">●</span> Dataset 2
                    </div>
                    <div className="flex items-center text-xs text-indigo-300 mr-3">
                      <span className="mr-1">●</span> Dataset 3
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-2">
                      <div className="text-xs text-gray-500 w-12">Jan 22</div>
                      <div className="flex">
                        <div className="bg-indigo-600 h-4" style={{ width: '25%' }}></div>
                        <div className="bg-purple-500 h-4" style={{ width: '25%' }}></div>
                        <div className="bg-indigo-300 h-4 rounded-r" style={{ width: '25%' }}></div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-xs text-gray-500 w-12">Feb 22</div>
                      <div className="flex">
                        <div className="bg-indigo-600 h-4" style={{ width: '25%' }}></div>
                        <div className="bg-purple-500 h-4" style={{ width: '25%' }}></div>
                        <div className="bg-indigo-300 h-4 rounded-r" style={{ width: '25%' }}></div>
                      </div>
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
                <Label htmlFor="barColor">Bar Color</Label>
                <div className="flex mt-1">
                  <input
                    id="barColor"
                    type="color"
                    className="w-full border rounded-md p-1 h-10"
                    defaultValue={chartProperties.barColor || "#4F46E5"}
                    onChange={(e) => {
                      updateElementProperties(elementId, {
                        barColor: e.target.value
                      });
                    }}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="secondaryBarColor">Secondary Bar Color</Label>
                <div className="flex mt-1">
                  <input
                    id="secondaryBarColor"
                    type="color"
                    className="w-full border rounded-md p-1 h-10"
                    defaultValue={chartProperties.secondaryBarColor || "#818CF8"}
                    onChange={(e) => {
                      updateElementProperties(elementId, {
                        secondaryBarColor: e.target.value
                      });
                    }}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="tertiaryBarColor">Tertiary Bar Color</Label>
                <div className="flex mt-1">
                  <input
                    id="tertiaryBarColor"
                    type="color"
                    className="w-full border rounded-md p-1 h-10"
                    defaultValue={chartProperties.tertiaryBarColor || "#C7D2FE"}
                    onChange={(e) => {
                      updateElementProperties(elementId, {
                        tertiaryBarColor: e.target.value
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

