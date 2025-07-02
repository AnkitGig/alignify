
import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface WaterfallAppearanceSectionProps {
  properties: any;
  elementId: string;
  updateElementProperties: (properties: any) => void;
}

export function WaterfallAppearanceSection({ properties, elementId, updateElementProperties }: WaterfallAppearanceSectionProps) {
  const handlePropertyChange = (key: string, value: any) => {
    console.log('WaterfallAppearanceSection updating property:', key, value);
    updateElementProperties({ [key]: value });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-900">Appearance</h3>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="showGridLines" className="text-sm">Show Grid Lines</Label>
          <Switch
            id="showGridLines"
            checked={properties.showGridLines !== false}
            onCheckedChange={(checked) => handlePropertyChange('showGridLines', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="showLabels" className="text-sm">Show Labels</Label>
          <Switch
            id="showLabels"
            checked={properties.showLabels !== false}
            onCheckedChange={(checked) => handlePropertyChange('showLabels', checked)}
          />
        </div>
      </div>
    </div>
  );
}
