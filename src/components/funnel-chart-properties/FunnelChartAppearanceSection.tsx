
import React from 'react';
import { Element } from '@/types/wireframe';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

interface FunnelChartAppearanceSectionProps {
  properties: Element['properties'];
  updateProperties: (updates: Partial<Element['properties']>) => void;
}

export function FunnelChartAppearanceSection({ properties, updateProperties }: FunnelChartAppearanceSectionProps) {
  const {
    funnelPrimaryColor = '#8884d8',
    showLabels = true,
    showValues = true,
    backgroundColor = '#ffffff'
  } = properties || {};

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-gray-700">Appearance</h4>
      
      <div className="space-y-3">
        <div>
          <Label htmlFor="primary-color" className="text-sm text-gray-600">Primary Color</Label>
          <div className="flex items-center gap-2 mt-1">
            <Input
              id="primary-color"
              type="color"
              value={funnelPrimaryColor}
              onChange={(e) => updateProperties({ funnelPrimaryColor: e.target.value })}
              className="h-8 w-16 p-1"
            />
            <Input
              value={funnelPrimaryColor}
              onChange={(e) => updateProperties({ funnelPrimaryColor: e.target.value })}
              placeholder="#8884d8"
              className="h-8 text-xs flex-1"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="bg-color" className="text-sm text-gray-600">Background Color</Label>
          <div className="flex items-center gap-2 mt-1">
            <Input
              id="bg-color"
              type="color"
              value={backgroundColor}
              onChange={(e) => updateProperties({ backgroundColor: e.target.value })}
              className="h-8 w-16 p-1"
            />
            <Input
              value={backgroundColor}
              onChange={(e) => updateProperties({ backgroundColor: e.target.value })}
              placeholder="#ffffff"
              className="h-8 text-xs flex-1"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="show-labels" className="text-sm">Show Labels</Label>
          <Switch
            id="show-labels"
            checked={showLabels}
            onCheckedChange={(checked) => updateProperties({ showLabels: checked })}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="show-values" className="text-sm">Show Values</Label>
          <Switch
            id="show-values"
            checked={showValues}
            onCheckedChange={(checked) => updateProperties({ showValues: checked })}
          />
        </div>
      </div>
    </div>
  );
}
