
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface WaterfallDetailsSectionProps {
  properties: any;
  elementId: string;
  updateElementProperties: (properties: any) => void;
}

export function WaterfallDetailsSection({ properties, elementId, updateElementProperties }: WaterfallDetailsSectionProps) {
  const handlePropertyChange = (key: string, value: any) => {
    console.log('WaterfallDetailsSection updating property:', key, value);
    updateElementProperties({ [key]: value });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-900">Details</h3>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="showTitle" className="text-sm">Show Title</Label>
          <Switch
            id="showTitle"
            checked={properties.showTitle !== false}
            onCheckedChange={(checked) => handlePropertyChange('showTitle', checked)}
          />
        </div>

        {properties.showTitle !== false && (
          <div className="space-y-3">
            <div>
              <Label htmlFor="waterfallTitle" className="text-sm">Title</Label>
              <Input
                id="waterfallTitle"
                value={properties.waterfallTitle || 'Waterfall Chart'}
                onChange={(e) => handlePropertyChange('waterfallTitle', e.target.value)}
                placeholder="Waterfall Chart"
              />
            </div>

            <div>
              <Label className="text-sm">Title Alignment</Label>
              <Select
                value={properties.titleAlignment || 'left'}
                onValueChange={(value) => handlePropertyChange('titleAlignment', value)}
              >
                <SelectTrigger className="text-sm mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
