
import React from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface HeatmapDetailsSectionProps {
  properties: any;
  handleChange: (field: string, value: any) => void;
  detailsOpen: boolean;
  setDetailsOpen: (open: boolean) => void;
}

export function HeatmapDetailsSection({ 
  properties, 
  handleChange, 
  detailsOpen, 
  setDetailsOpen 
}: HeatmapDetailsSectionProps) {
  return (
    <Collapsible open={detailsOpen} onOpenChange={setDetailsOpen}>
      <CollapsibleTrigger className="flex items-center justify-between w-full py-2 px-1 hover:bg-gray-50 rounded">
        <span className="font-medium">Details</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${detailsOpen ? 'rotate-180' : ''}`} />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-3 pt-2 pb-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="showTitle" className="text-sm">Title</Label>
          <Switch
            id="showTitle"
            checked={properties.showTitle ?? true}
            onCheckedChange={(checked) => handleChange('showTitle', checked)}
          />
        </div>
        
        {properties.showTitle !== false && (
          <div>
            <Label htmlFor="heatmapTitle" className="text-sm">Edit Text</Label>
            <Input
              id="heatmapTitle"
              value={properties.heatmapTitle || 'Title goes here'}
              onChange={(e) => handleChange('heatmapTitle', e.target.value)}
              className="mt-1"
            />
          </div>
        )}
        
        <div>
          <Label className="text-sm">Alignment</Label>
          <div className="flex gap-1 mt-1">
            <button
              className={`p-2 border rounded ${properties.textAlignment === 'left' ? 'bg-gray-200' : ''}`}
              onClick={() => handleChange('textAlignment', 'left')}
            >
              ≡
            </button>
            <button
              className={`p-2 border rounded ${properties.textAlignment === 'center' ? 'bg-gray-200' : ''}`}
              onClick={() => handleChange('textAlignment', 'center')}
            >
              ≣
            </button>
            <button
              className={`p-2 border rounded ${properties.textAlignment === 'right' ? 'bg-gray-200' : ''}`}
              onClick={() => handleChange('textAlignment', 'right')}
            >
              ≢
            </button>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
