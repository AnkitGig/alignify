
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWireframe, KpiVariant } from "@/hooks/useWireframe";
import { toast } from "sonner";

interface KpiStyleDialogProps {
  elementId: string;
  open: boolean;
  onClose: () => void;
}

export function KpiStyleDialog({ elementId, open, onClose }: KpiStyleDialogProps) {
  const { elements, updateElementProperties } = useWireframe();
  
  const element = elements.find(el => el.id === elementId);
  if (!element) return null;
  
  const kpiVariant = element.properties?.kpiVariant || 'basic';
  
  const handleSelectVariant = (variant: KpiVariant) => {
    updateElementProperties(elementId, { 
      kpiVariant: variant,
      kpiTitle: 'Title goes here',
      kpiValue: '25.2K',
      kpiPreviousValue: '11.6K',
      kpiChangePercentage: '+10%',
      showKpiTitle: true,
      showPreviousValue: true,
      showChangePercentage: true,
      indicatorColor: '#8B5CF6',
    });
    toast.success(`KPI style updated to ${variant}`);
    onClose();
  };
  
  return (
    <Dialog open={open} onOpenChange={open => !open && onClose()}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle>Choose style</DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" size="icon" className="absolute right-4 top-4">
              <X className="h-4 w-4" />
            </Button>
          </DialogClose>
        </DialogHeader>
        
        <div className="py-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm text-gray-500">Available styles</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => handleSelectVariant('basic')}
              className="text-blue-600 hover:text-blue-800"
            >
              Default
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pb-4">
            {/* Basic KPI */}
            <div 
              className={`border rounded-md p-4 cursor-pointer hover:border-blue-400 transition-colors ${
                kpiVariant === 'basic' ? 'border-blue-500 bg-blue-50' : ''
              }`}
              onClick={() => handleSelectVariant('basic')}
            >
              <div className="p-4 bg-white rounded shadow-sm">
                <div className="text-sm text-gray-500 mb-1">Title goes here</div>
                <div className="text-xl font-bold mb-1">25.2K</div>
                <div className="flex text-xs items-center gap-2">
                  <span className="text-gray-500">vs prev 11.6K</span>
                  <span className="text-green-500">(+10%)</span>
                </div>
              </div>
              <div className="mt-2 text-center">
                <span className="text-sm font-medium">Basic KPI</span>
              </div>
            </div>
            
            {/* Area KPI */}
            <div 
              className={`border rounded-md p-4 cursor-pointer hover:border-blue-400 transition-colors ${
                kpiVariant === 'area' ? 'border-blue-500 bg-blue-50' : ''
              }`}
              onClick={() => handleSelectVariant('area')}
            >
              <div className="p-4 bg-white rounded shadow-sm">
                <div className="mb-1">
                  <span className="text-xs text-gray-500">Text</span>
                </div>
                <div className="text-lg font-bold mb-1">25.2K</div>
                <div className="text-xs text-gray-500">
                  vs prev = 11.6K | % Change
                </div>
                <div className="mt-2 h-4">
                  <svg viewBox="0 0 100 20" className="w-full h-full">
                    <path
                      d="M0,20 L10,15 L20,18 L30,10 L40,12 L50,5 L60,8 L70,3 L80,6 L90,1 L100,4 L100,20 L0,20 Z"
                      fill="#8B5CF640"
                      stroke="#8B5CF6"
                      strokeWidth="1"
                    />
                  </svg>
                </div>
              </div>
              <div className="mt-2 text-center">
                <span className="text-sm font-medium">Area KPI</span>
              </div>
            </div>
            
            {/* Indicator KPI */}
            <div 
              className={`border rounded-md p-4 cursor-pointer hover:border-blue-400 transition-colors ${
                kpiVariant === 'indicator' ? 'border-blue-500 bg-blue-50' : ''
              }`}
              onClick={() => handleSelectVariant('indicator')}
            >
              <div className="p-4 bg-white rounded shadow-sm">
                <div className="text-sm text-gray-500 mb-1">Title goes here</div>
                <div className="text-xl font-bold mb-1">25.2K</div>
                <div className="flex text-xs items-center gap-2">
                  <span className="text-gray-500">vs prev 11.6K</span>
                  <span className="text-green-500">(+10%)</span>
                </div>
                <div className="mt-2 h-1 bg-gray-200 w-full rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-purple-500" style={{ width: '70%' }}></div>
                </div>
              </div>
              <div className="mt-2 text-center">
                <span className="text-sm font-medium">Indicator KPI</span>
              </div>
            </div>
            
            {/* Comparison KPI */}
            <div 
              className={`border rounded-md p-4 cursor-pointer hover:border-blue-400 transition-colors ${
                kpiVariant === 'comparison' ? 'border-blue-500 bg-blue-50' : ''
              }`}
              onClick={() => handleSelectVariant('comparison')}
            >
              <div className="p-4 bg-white rounded shadow-sm flex">
                <div className="flex-1">
                  <div className="text-xs font-medium">Title</div>
                  <div className="text-lg font-bold">25.2K</div>
                  <div className="text-xs">Current</div>
                </div>
                <div className="flex-1">
                  <div className="text-xs font-medium opacity-0">.</div>
                  <div className="text-lg">11.6K</div>
                  <div className="text-xs">vs prev</div>
                </div>
                <div className="flex-1">
                  <div className="text-xs font-medium opacity-0">.</div>
                  <div className="text-green-500 text-lg">+10%</div>
                  <div className="text-xs">% change</div>
                </div>
              </div>
              <div className="mt-2 text-center">
                <span className="text-sm font-medium">Comparison KPI</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <Button 
            className="w-full" 
            onClick={() => {
              const currentVariant = element.properties?.kpiVariant || 'basic';
              handleSelectVariant(currentVariant as KpiVariant);
            }}
          >
            Apply style
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
