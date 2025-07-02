
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useWireframe, FilterVariant } from "@/hooks/useWireframe";
import { toast } from "sonner";
import { Check } from "lucide-react";

interface FilterStyleDialogProps {
  elementId: string;
  open: boolean;
  onClose: () => void;
}

export function FilterStyleDialog({ elementId, open, onClose }: FilterStyleDialogProps) {
  const { elements, updateElementProperties } = useWireframe();
  const element = elements.find(el => el.id === elementId);
  const [selectedVariant, setSelectedVariant] = useState<FilterVariant>(
    element?.properties?.filterVariant || 'dropdown'
  );

  const handleApplyStyle = () => {
    if (elementId) {
      updateElementProperties(elementId, { 
        filterVariant: selectedVariant 
      });
      toast.success("Filter style applied");
      onClose();
    }
  };

  const filterStyles: { id: FilterVariant; label: string; preview: JSX.Element }[] = [
    { 
      id: 'dropdown', 
      label: 'Dropdown Filter', 
      preview: (
        <div className="p-4 bg-gray-100 rounded-md">
          <div className="text-sm font-medium mb-1">Title goes here</div>
          <div className="border rounded bg-white p-1 px-2 text-sm flex justify-between items-center">
            <span>All</span>
            <svg width="12" height="12" viewBox="0 0 16 16">
              <path d="M3 6l5 5 5-5" stroke="currentColor" fill="none" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      )
    },
    { 
      id: 'checkbox', 
      label: 'Checkbox Filter', 
      preview: (
        <div className="p-4 bg-gray-100 rounded-md">
          <div className="text-sm font-medium mb-1">Title goes here</div>
          <div className="space-y-1">
            <div className="flex items-center">
              <div className="h-4 w-4 border rounded mr-2"></div>
              <span className="text-sm">All</span>
            </div>
            <div className="flex items-center">
              <div className="h-4 w-4 border rounded mr-2"></div>
              <span className="text-sm">Value 1</span>
            </div>
            <div className="flex items-center">
              <div className="h-4 w-4 border rounded mr-2"></div>
              <span className="text-sm">Value 2</span>
            </div>
          </div>
        </div>
      )
    },
    { 
      id: 'radio', 
      label: 'Radio Filter', 
      preview: (
        <div className="p-4 bg-gray-100 rounded-md">
          <div className="text-sm font-medium mb-1">Title goes here</div>
          <div className="space-y-1">
            <div className="flex items-center">
              <div className="h-4 w-4 border rounded-full mr-2"></div>
              <span className="text-sm">All</span>
            </div>
            <div className="flex items-center">
              <div className="h-4 w-4 border rounded-full mr-2 flex items-center justify-center">
                <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
              </div>
              <span className="text-sm">Value 1</span>
            </div>
            <div className="flex items-center">
              <div className="h-4 w-4 border rounded-full mr-2"></div>
              <span className="text-sm">Value 2</span>
            </div>
          </div>
        </div>
      )
    },
    { 
      id: 'date', 
      label: 'Date Filter', 
      preview: (
        <div className="p-4 bg-gray-100 rounded-md">
          <div className="text-sm font-medium mb-1">Date</div>
          <div className="border rounded bg-white p-1 px-2 text-sm">
            23/05/23
          </div>
        </div>
      )
    },
    { 
      id: 'daterange', 
      label: 'Date Range Filter', 
      preview: (
        <div className="p-4 bg-gray-100 rounded-md">
          <div className="flex space-x-2">
            <div className="flex-1">
              <div className="text-sm font-medium mb-1">Start Date</div>
              <div className="border rounded bg-white p-1 px-2 text-sm">
                23/05/23
              </div>
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium mb-1">End Date</div>
              <div className="border rounded bg-white p-1 px-2 text-sm">
                16/07/23
              </div>
            </div>
          </div>
        </div>
      )
    },
    { 
      id: 'slider', 
      label: 'Slider Filter', 
      preview: (
        <div className="p-4 bg-gray-100 rounded-md">
          <div className="text-sm font-medium mb-2">Title goes here</div>
          <div className="px-1">
            <div className="h-1 bg-gray-200 rounded-full mb-1 relative">
              <div className="absolute left-1/4 top-1/2 -translate-y-1/2 h-3 w-3 bg-blue-600 rounded-full"></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>0</span>
              <span>100</span>
            </div>
          </div>
        </div>
      )
    },
    { 
      id: 'search', 
      label: 'Search Filter', 
      preview: (
        <div className="p-4 bg-gray-100 rounded-md">
          <div className="text-sm font-medium mb-1">Search</div>
          <div className="border rounded bg-white p-1 flex items-center">
            <svg className="h-3 w-3 text-gray-400 ml-1 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-sm text-gray-400">Search...</span>
          </div>
        </div>
      )
    },
  ];

  return (
    <Dialog open={open} onOpenChange={isOpen => !isOpen && onClose()}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden">
        <DialogTitle className="px-6 py-4 border-b">Choose style</DialogTitle>
        <div className="px-6 py-4">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm text-gray-500">Available styles</div>
            <Button variant="link" size="sm" className="text-blue-600 p-0 h-auto" onClick={() => setSelectedVariant('dropdown')}>
              <span>Default</span>
            </Button>
          </div>
          <div className="max-h-[400px] overflow-y-auto">
            <RadioGroup value={selectedVariant} onValueChange={value => setSelectedVariant(value as FilterVariant)} className="grid grid-cols-2 gap-4">
              {filterStyles.map(style => (
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
          </div>
        </div>
        <DialogFooter className="bg-white p-4 border-t">
          <Button className="w-full" onClick={handleApplyStyle}>Apply style</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
