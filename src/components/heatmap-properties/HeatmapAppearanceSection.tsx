
import React from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface HeatmapAppearanceSectionProps {
  properties: any;
  handleChange: (field: string, value: any) => void;
  propertiesOpen: boolean;
  setPropertiesOpen: (open: boolean) => void;
}

export function HeatmapAppearanceSection({ 
  properties, 
  handleChange, 
  propertiesOpen, 
  setPropertiesOpen 
}: HeatmapAppearanceSectionProps) {
  return (
    <Collapsible open={propertiesOpen} onOpenChange={setPropertiesOpen}>
      <CollapsibleTrigger className="flex items-center justify-between w-full py-2 px-1 hover:bg-gray-50 rounded">
        <span className="font-medium">Properties</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${propertiesOpen ? 'rotate-180' : ''}`} />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-3 pt-2 pb-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="showDataLabels" className="text-sm">Data Labels</Label>
          <Switch
            id="showDataLabels"
            checked={properties.showDataLabels ?? true}
            onCheckedChange={(checked) => handleChange('showDataLabels', checked)}
          />
        </div>
        
        <div>
          <Label className="text-sm">Orientation</Label>
          <Select
            value={properties.heatmapOrientation || 'horizontal'}
            onValueChange={(value) => handleChange('heatmapOrientation', value)}
          >
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="horizontal">Horizontal</SelectItem>
              <SelectItem value="vertical">Vertical</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="showLegends" className="text-sm">Legends</Label>
          <Switch
            id="showLegends"
            checked={properties.showLegends ?? false}
            onCheckedChange={(checked) => handleChange('showLegends', checked)}
          />
        </div>
        
        <div>
          <Label className="text-sm">Grid Size</Label>
          <div className="flex gap-2 mt-1">
            <Input
              type="number"
              value={properties.heatmapRows || 5}
              onChange={(e) => handleChange('heatmapRows', Number(e.target.value))}
              placeholder="Rows"
              min="1"
              max="20"
            />
            <Input
              type="number"
              value={properties.heatmapColumns || 5}
              onChange={(e) => handleChange('heatmapColumns', Number(e.target.value))}
              placeholder="Columns"
              min="1"
              max="20"
            />
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
