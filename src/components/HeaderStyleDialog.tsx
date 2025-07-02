import { useState } from "react";
import { useWireframe } from "@/hooks/useWireframe";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { X, Check } from "lucide-react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface HeaderStyleDialogProps {
  elementId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function HeaderStyleDialog({ elementId, isOpen, onClose }: HeaderStyleDialogProps) {
  const { updateElementProperties, elements } = useWireframe();
  const element = elements.find(el => el.id === elementId);
  const [selectedVariant, setSelectedVariant] = useState<string>(element?.properties?.variant || 'default');
  
  // Navigation settings
  const [showNavigation, setShowNavigation] = useState<boolean>(element?.properties?.showNavigation || false);
  const [navigationItems, setNavigationItems] = useState<string[]>(
    element?.properties?.navigationItems || ["Navigation 1", "Navigation 2", "Navigation 3"]
  );
  
  // Metrics settings
  const [showMetrics, setShowMetrics] = useState<boolean>(element?.properties?.showMetrics || false);
  const [metrics, setMetrics] = useState<Array<{title: string, value: string}>>(
    element?.properties?.metrics || [
      { title: "Metric 1", value: "123" },
      { title: "Metric 2", value: "456" }
    ]
  );

  const handleNavigationItemChange = (index: number, value: string) => {
    const newItems = [...navigationItems];
    newItems[index] = value;
    setNavigationItems(newItems);
  };

  const handleMetricChange = (index: number, field: 'title' | 'value', value: string) => {
    const newMetrics = [...metrics];
    newMetrics[index][field] = value;
    setMetrics(newMetrics);
  };
  
  const handleApplyStyle = () => {
    updateElementProperties(elementId, { 
      variant: selectedVariant,
      showNavigation,
      navigationItems,
      showMetrics,
      metrics
    });
    toast.success("Header style applied successfully");
    onClose();
  };

  const headerStyles = [
    {
      id: 'default',
      label: 'Default Style',
      preview: (
        <div className="bg-gray-50 border rounded-md p-4 mt-1">
          <div className="flex items-center">
            <div className="w-16 h-6 bg-gray-200 text-[8px] flex items-center justify-center rounded">Upload Logo</div>
            <div className="font-bold ml-4 text-xs">DASHBOARD TITLE</div>
          </div>
        </div>
      )
    },
    {
      id: 'with-metrics',
      label: 'With Metrics',
      preview: (
        <div className="bg-gray-50 border rounded-md p-4 mt-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-16 h-6 bg-gray-200 text-[8px] flex items-center justify-center rounded">Upload Logo</div>
              <div className="font-bold ml-4 text-xs">DASHBOARD TITLE</div>
            </div>
            <div className="flex space-x-4">
              <div className="text-[8px]">
                <div>Title 1</div>
                <div className="text-gray-400">Metric 1</div>
              </div>
              <div className="text-[8px]">
                <div>Title 2</div>
                <div className="text-gray-400">Metric 1</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'with-description',
      label: 'With Description',
      preview: (
        <div className="bg-gray-50 border rounded-md p-4 mt-1">
          <div className="flex flex-col">
            <div className="flex items-center">
              <div className="w-16 h-6 bg-gray-200 text-[8px] flex items-center justify-center rounded">Upload Logo</div>
              <div className="font-bold ml-4 text-xs">DASHBOARD TITLE</div>
            </div>
            <div className="text-[8px] mt-2 text-gray-500">
              Some dummy description text<br />
              Some dummy description text
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'centered-navigation-purple',
      label: 'Centered Navigation (Purple)',
      preview: (
        <div className="bg-[#9b87f5] rounded-md p-4 mt-1 text-white">
          <div className="flex flex-col items-center">
            <div className="font-bold text-xs text-center mt-1">DASHBOARD TITLE</div>
            <div className="flex justify-center space-x-6 mt-1">
              <div className="text-[8px]">Navigation 1</div>
              <div className="text-[8px]">Navigation 2</div>
              <div className="text-[8px]">Navigation 3</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'navigation-top',
      label: 'Top Navigation',
      preview: (
        <div className="bg-gray-50 border rounded-md p-4 mt-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-16 h-6 bg-gray-200 text-[8px] flex items-center justify-center rounded">Upload Logo</div>
              <div className="font-bold ml-4 text-xs">DASHBOARD TITLE</div>
            </div>
            <div className="flex space-x-4 text-[8px] text-blue-500">
              <div>Navigation 1</div>
              <div>Navigation 2</div>
              <div>Navigation 3</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'double-logo-purple',
      label: 'Double Logo (Purple)',
      preview: (
        <div className="bg-[#9b87f5] rounded-md p-4 mt-1 text-white">
          <div className="flex items-center justify-between">
            <div className="w-16 h-6 bg-gray-200 text-[8px] flex items-center justify-center rounded text-gray-800">Upload Logo</div>
            <div className="font-bold text-xs text-center">DASHBOARD TITLE</div>
            <div className="w-16 h-6 bg-gray-200 text-[8px] flex items-center justify-center rounded text-gray-800">Upload Logo</div>
          </div>
        </div>
      )
    },
    {
      id: 'dark-navigation',
      label: 'Dark Navigation',
      preview: (
        <div className="bg-[#1A1F2C] rounded-md p-4 mt-1 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-16 h-6 bg-gray-600 text-[8px] flex items-center justify-center rounded text-white">Upload Logo</div>
              <div className="font-bold ml-4 text-xs">DASHBOARD TITLE</div>
            </div>
            <div className="flex space-x-4 text-[8px] text-gray-300">
              <div>Navigation 1</div>
              <div>Navigation 2</div>
              <div>Navigation 3</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'gradient',
      label: 'Gradient',
      preview: (
        <div className="bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] rounded-md p-4 mt-1 text-white">
          <div className="flex items-center">
            <div className="w-16 h-6 bg-white/20 backdrop-blur-sm text-[8px] flex items-center justify-center rounded">Upload Logo</div>
            <div className="font-bold ml-4 text-xs">DASHBOARD TITLE</div>
          </div>
        </div>
      )
    },
    {
      id: 'minimal',
      label: 'Minimal',
      preview: (
        <div className="bg-[#F6F6F7] rounded-md p-4 mt-1">
          <div className="flex items-center justify-center">
            <div className="font-bold text-xs text-gray-800">DASHBOARD TITLE</div>
          </div>
        </div>
      )
    },
    {
      id: 'colorful-banner',
      label: 'Colorful Banner',
      preview: (
        <div className="relative bg-white rounded-md overflow-hidden">
          <div className="h-3 bg-gradient-to-r from-[#F97316] via-[#8B5CF6] to-[#0EA5E9]"></div>
          <div className="p-4 mt-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-16 h-6 bg-gray-200 text-[8px] flex items-center justify-center rounded">Upload Logo</div>
                <div className="font-bold ml-4 text-xs">DASHBOARD TITLE</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'title-metrics',
      label: 'Title with Metrics',
      preview: (
        <div className="bg-white border rounded-md p-4 mt-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-16 h-6 bg-gray-200 text-[8px] flex items-center justify-center rounded">Logo</div>
              <div className="font-bold ml-4 text-xs">DASHBOARD TITLE</div>
            </div>
            <div className="flex space-x-4">
              <div className="text-[8px]">
                <div className="text-gray-500">Metric 1</div>
                <div className="font-bold">123</div>
              </div>
              <div className="text-[8px]">
                <div className="text-gray-500">Metric 2</div>
                <div className="font-bold">456</div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];
  
  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="sm:max-w-3xl p-0 overflow-hidden">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle>Choose header style</DialogTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-4 top-4" 
            onClick={onClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>
        
        <Tabs defaultValue="styles" className="w-full">
          <TabsList className="grid grid-cols-2 mx-6 mt-4">
            <TabsTrigger value="styles">Styles</TabsTrigger>
            <TabsTrigger value="properties">Properties</TabsTrigger>
          </TabsList>
          
          <TabsContent value="styles" className="p-6 pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-muted-foreground">Available styles</span>
              <Button 
                variant="link" 
                size="sm" 
                className="text-xs" 
                onClick={() => setSelectedVariant('default')}
              >
                Default
              </Button>
            </div>
            
            <RadioGroup 
              value={selectedVariant} 
              onValueChange={setSelectedVariant}
              className="grid grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2"
            >
              {headerStyles.map(style => (
                <div key={style.id} className="relative">
                  <RadioGroupItem 
                    value={style.id} 
                    id={style.id} 
                    className="sr-only peer"
                  />
                  <Label 
                    htmlFor={style.id} 
                    className="border rounded-md p-0 block cursor-pointer peer-focus:ring-2 peer-focus:ring-blue-400 peer-data-[state=checked]:border-blue-500"
                  >
                    <div className="p-1">
                      {style.preview}
                      <div className="text-xs p-2 pt-3 text-center">{style.label}</div>
                    </div>
                    {selectedVariant === style.id && (
                      <div className="absolute top-2 right-2 h-5 w-5 bg-blue-600 rounded-full flex items-center justify-center">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </TabsContent>
          
          <TabsContent value="properties" className="space-y-6 p-6 pt-4">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Navigation</h3>
              <div className="flex items-center justify-between">
                <span className="text-sm">Show navigation</span>
                <Switch 
                  checked={showNavigation} 
                  onCheckedChange={setShowNavigation} 
                  id="show-navigation"
                />
              </div>
              
              {showNavigation && (
                <div className="space-y-2 pt-2">
                  <h4 className="text-sm font-medium text-gray-500">Navigation items</h4>
                  {navigationItems.map((item, index) => (
                    <Input
                      key={index}
                      value={item}
                      onChange={(e) => handleNavigationItemChange(index, e.target.value)}
                      className="mb-2"
                      placeholder={`Navigation ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
            
            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-sm font-medium">Metrics</h3>
              <div className="flex items-center justify-between">
                <span className="text-sm">Show metrics</span>
                <Switch 
                  checked={showMetrics} 
                  onCheckedChange={setShowMetrics} 
                  id="show-metrics"
                />
              </div>
              
              {showMetrics && (
                <div className="space-y-4 pt-2">
                  {metrics.map((metric, index) => (
                    <div key={index} className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor={`metric-title-${index}`} className="text-xs text-gray-500 mb-1 block">
                          Title
                        </Label>
                        <Input
                          id={`metric-title-${index}`}
                          value={metric.title}
                          onChange={(e) => handleMetricChange(index, 'title', e.target.value)}
                          placeholder="Metric title"
                          className="text-sm"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`metric-value-${index}`} className="text-xs text-gray-500 mb-1 block">
                          Value
                        </Label>
                        <Input
                          id={`metric-value-${index}`}
                          value={metric.value}
                          onChange={(e) => handleMetricChange(index, 'value', e.target.value)}
                          placeholder="123"
                          className="text-sm"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="bg-white p-4 border-t">
          <Button 
            variant="default" 
            onClick={handleApplyStyle} 
            className="w-full bg-[#9b87f5] hover:bg-[#8B5CF6]"
          >
            Apply style
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
