
import React from 'react';
import { Element } from '@/types/wireframe';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

interface HistogramAppearanceSectionProps {
  element: Element;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
}

export function HistogramAppearanceSection({ element, updateElementProperties }: HistogramAppearanceSectionProps) {
  const properties = element.properties || {};
  const {
    histogramPrimaryColor = '#4F46E5',
    backgroundColor = 'transparent',
    showGridLines = true,
    showLabels = true,
    showValues = true,
    showLegend = false,
  } = properties;

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Appearance</h3>
      
      <div className="space-y-3">
        <div>
          <Label className="text-sm">Primary Color</Label>
          <Input
            type="color"
            value={histogramPrimaryColor}
            onChange={(e) => 
              updateElementProperties(element.id, { histogramPrimaryColor: e.target.value })
            }
            className="mt-1 h-10"
          />
        </div>

        <div>
          <Label className="text-sm">Background Color</Label>
          <Input
            type="color"
            value={backgroundColor === 'transparent' ? '#ffffff' : backgroundColor}
            onChange={(e) => 
              updateElementProperties(element.id, { backgroundColor: e.target.value })
            }
            className="mt-1 h-10"
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="showGridLines" className="text-sm">Grid Lines</Label>
          <Switch
            id="showGridLines"
            checked={showGridLines}
            onCheckedChange={(checked) => 
              updateElementProperties(element.id, { showGridLines: checked })
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="showLabels" className="text-sm">Axis Labels</Label>
          <Switch
            id="showLabels"
            checked={showLabels}
            onCheckedChange={(checked) => 
              updateElementProperties(element.id, { showLabels: checked })
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="showValues" className="text-sm">Values</Label>
          <Switch
            id="showValues"
            checked={showValues}
            onCheckedChange={(checked) => 
              updateElementProperties(element.id, { showValues: checked })
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="showLegend" className="text-sm">Legend</Label>
          <Switch
            id="showLegend"
            checked={showLegend}
            onCheckedChange={(checked) => 
              updateElementProperties(element.id, { showLegend: checked })
            }
          />
        </div>
      </div>
    </div>
  );
}
