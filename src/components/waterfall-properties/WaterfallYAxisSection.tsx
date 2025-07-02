
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface WaterfallYAxisSectionProps {
  properties: any;
  elementId: string;
  updateElementProperties: (properties: any) => void;
}

export function WaterfallYAxisSection({ properties, elementId, updateElementProperties }: WaterfallYAxisSectionProps) {
  const handlePropertyChange = (key: string, value: any) => {
    console.log('WaterfallYAxisSection updating property:', key, value);
    updateElementProperties({ [key]: value });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-900">Y Axis</h3>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="showYAxis" className="text-sm">Axis</Label>
          <Switch
            id="showYAxis"
            checked={properties.showYAxis !== false}
            onCheckedChange={(checked) => handlePropertyChange('showYAxis', checked)}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="showYAxisTitle" className="text-sm">Title</Label>
            <Switch
              id="showYAxisTitle"
              checked={properties.showYAxisTitle || false}
              onCheckedChange={(checked) => handlePropertyChange('showYAxisTitle', checked)}
            />
          </div>

          {properties.showYAxisTitle && (
            <div>
              <Label htmlFor="yAxisTitle" className="text-sm text-gray-600">Title Text</Label>
              <Input
                id="yAxisTitle"
                value={properties.yAxisTitle || ''}
                onChange={(e) => handlePropertyChange('yAxisTitle', e.target.value)}
                placeholder="Y Axis Title"
                className="text-sm mt-1"
              />
            </div>
          )}

          <div>
            <Label className="text-sm text-gray-600">Range</Label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <div>
                <Label htmlFor="yAxisMin" className="text-xs text-gray-500">Min</Label>
                <Input
                  id="yAxisMin"
                  type="number"
                  value={properties.yAxisMin || 0}
                  onChange={(e) => handlePropertyChange('yAxisMin', parseInt(e.target.value) || 0)}
                  className="text-sm"
                />
              </div>
              <div>
                <Label htmlFor="yAxisMax" className="text-xs text-gray-500">Max</Label>
                <Input
                  id="yAxisMax"
                  type="number"
                  value={properties.yAxisMax || 600}
                  onChange={(e) => handlePropertyChange('yAxisMax', parseInt(e.target.value) || 600)}
                  className="text-sm"
                />
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="yAxisStepSize" className="text-sm">Step Size</Label>
            <Input
              id="yAxisStepSize"
              type="number"
              value={properties.yAxisStepSize || 10}
              onChange={(e) => handlePropertyChange('yAxisStepSize', parseInt(e.target.value) || 10)}
              className="text-sm"
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="showYAxisLabels" className="text-sm">Labels</Label>
            <Switch
              id="showYAxisLabels"
              checked={properties.showYAxisLabels !== false}
              onCheckedChange={(checked) => handlePropertyChange('showYAxisLabels', checked)}
            />
          </div>

          <div>
            <Label className="text-sm text-gray-600">Label Format</Label>
            <Select
              value={properties.yAxisLabelFormat || 'number'}
              onValueChange={(value) => handlePropertyChange('yAxisLabelFormat', value)}
            >
              <SelectTrigger className="text-sm mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="number">Number</SelectItem>
                <SelectItem value="currency">Currency</SelectItem>
                <SelectItem value="percentage">Percentage</SelectItem>
                <SelectItem value="decimal">Decimal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
