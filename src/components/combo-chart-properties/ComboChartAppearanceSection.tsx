
import React from 'react';
import { Element } from '@/types/wireframe';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';

interface ComboChartAppearanceSectionProps {
  element: Element;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
}

export function ComboChartAppearanceSection({ element, updateElementProperties }: ComboChartAppearanceSectionProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex items-center justify-between w-full p-2 text-sm font-medium bg-gray-50 hover:bg-gray-100 rounded">
        Appearance
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-3 p-2">
        <div>
          <Label htmlFor="barColor">Bar Color</Label>
          <Input
            id="barColor"
            type="color"
            value={element.properties?.barColor || '#3b82f6'}
            onChange={(e) => updateElementProperties(element.id, { barColor: e.target.value })}
            className="h-8"
          />
        </div>
        
        <div>
          <Label htmlFor="lineColor">Line Color</Label>
          <Input
            id="lineColor"
            type="color"
            value={element.properties?.lineColor || '#10b981'}
            onChange={(e) => updateElementProperties(element.id, { lineColor: e.target.value })}
            className="h-8"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="showLegend">Legend</Label>
          <Switch
            id="showLegend"
            checked={element.properties?.showLegend ?? true}
            onCheckedChange={(checked) => updateElementProperties(element.id, { showLegend: checked })}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="showGridLines">Grid Lines</Label>
          <Switch
            id="showGridLines"
            checked={element.properties?.showGridLines ?? true}
            onCheckedChange={(checked) => updateElementProperties(element.id, { showGridLines: checked })}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="showLabels">Labels</Label>
          <Switch
            id="showLabels"
            checked={element.properties?.showLabels ?? true}
            onCheckedChange={(checked) => updateElementProperties(element.id, { showLabels: checked })}
          />
        </div>
        
        <div>
          <Label htmlFor="chartHeight">Chart Height</Label>
          <Slider
            id="chartHeight"
            min={200}
            max={600}
            step={50}
            value={[element.properties?.chartHeight || 300]}
            onValueChange={(value) => updateElementProperties(element.id, { chartHeight: value[0] })}
            className="mt-2"
          />
          <div className="text-xs text-gray-500 mt-1">
            {element.properties?.chartHeight || 300}px
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
