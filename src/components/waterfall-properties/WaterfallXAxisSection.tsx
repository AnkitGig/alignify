
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

interface WaterfallXAxisSectionProps {
  properties: any;
  elementId: string;
  updateElementProperties: (properties: any) => void;
}

export function WaterfallXAxisSection({ properties, elementId, updateElementProperties }: WaterfallXAxisSectionProps) {
  const handlePropertyChange = (key: string, value: any) => {
    console.log('WaterfallXAxisSection updating property:', key, value);
    updateElementProperties({ [key]: value });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-900">X Axis</h3>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="showXAxis" className="text-sm">Axis</Label>
          <Switch
            id="showXAxis"
            checked={properties.showXAxis !== false}
            onCheckedChange={(checked) => handlePropertyChange('showXAxis', checked)}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="showXAxisTitle" className="text-sm">Title</Label>
            <Switch
              id="showXAxisTitle"
              checked={properties.showXAxisTitle || false}
              onCheckedChange={(checked) => handlePropertyChange('showXAxisTitle', checked)}
            />
          </div>

          {properties.showXAxisTitle && (
            <div>
              <Label htmlFor="xAxisTitle" className="text-sm text-gray-600">Title Text</Label>
              <Input
                id="xAxisTitle"
                value={properties.xAxisTitle || ''}
                onChange={(e) => handlePropertyChange('xAxisTitle', e.target.value)}
                placeholder="X Axis Title"
                className="text-sm mt-1"
              />
            </div>
          )}

          <div>
            <Label className="text-sm text-gray-600">Label Rotation</Label>
            <div className="mt-2">
              <Slider
                value={[properties.xAxisLabelRotation || 0]}
                onValueChange={(value) => handlePropertyChange('xAxisLabelRotation', value[0])}
                max={90}
                min={-90}
                step={15}
                className="w-full"
              />
              <div className="text-xs text-gray-500 mt-1">{properties.xAxisLabelRotation || 0}°</div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="showXAxisLabels" className="text-sm">Labels</Label>
            <Switch
              id="showXAxisLabels"
              checked={properties.showXAxisLabels !== false}
              onCheckedChange={(checked) => handlePropertyChange('showXAxisLabels', checked)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
