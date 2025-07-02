
import React from 'react';
import { Element } from '@/types/wireframe';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';

interface LineChartAppearanceSectionProps {
  element: Element;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
}

export function LineChartAppearanceSection({ element, updateElementProperties }: LineChartAppearanceSectionProps) {
  const handleColorChange = (property: string, value: string) => {
    updateElementProperties(element.id, { [property]: value });
  };

  const handleSwitchChange = (property: string, checked: boolean) => {
    updateElementProperties(element.id, { [property]: checked });
  };

  const handleSelectChange = (property: string, value: string) => {
    updateElementProperties(element.id, { [property]: value });
  };

  const handleSliderChange = (property: string, value: number[]) => {
    updateElementProperties(element.id, { [property]: value[0] });
  };

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-gray-700 border-b pb-2">Appearance</h4>
      
      <div className="space-y-4">
        {/* Line Style */}
        <div>
          <Label className="text-xs font-medium text-gray-600">Line Style</Label>
          <Select 
            value={element.properties?.lineStyle || 'solid'} 
            onValueChange={(value) => handleSelectChange('lineStyle', value)}
          >
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="solid">Solid</SelectItem>
              <SelectItem value="dashed">Dashed</SelectItem>
              <SelectItem value="dotted">Dotted</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Line Width */}
        <div>
          <Label className="text-xs font-medium text-gray-600">
            Line Width: {element.properties?.lineWidth || 2}px
          </Label>
          <Slider
            min={1}
            max={8}
            step={1}
            value={[element.properties?.lineWidth || 2]}
            onValueChange={(value) => handleSliderChange('lineWidth', value)}
            className="mt-2"
          />
        </div>

        {/* Line Color */}
        <div>
          <Label className="text-xs font-medium text-gray-600">Line Color</Label>
          <Input
            type="color"
            value={element.properties?.lineColor || '#3b82f6'}
            onChange={(e) => handleColorChange('lineColor', e.target.value)}
            className="mt-1 h-8"
          />
        </div>

        {/* Curve Type */}
        <div>
          <Label className="text-xs font-medium text-gray-600">Curve Type</Label>
          <Select 
            value={element.properties?.curveType || 'monotone'} 
            onValueChange={(value) => handleSelectChange('curveType', value)}
          >
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="linear">Linear</SelectItem>
              <SelectItem value="monotone">Monotone</SelectItem>
              <SelectItem value="basis">Basis (Curved)</SelectItem>
              <SelectItem value="step">Step</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Markers */}
        <div className="flex items-center justify-between">
          <Label className="text-xs font-medium text-gray-600">Show Markers</Label>
          <Switch
            checked={element.properties?.showMarkers ?? true}
            onCheckedChange={(checked) => handleSwitchChange('showMarkers', checked)}
          />
        </div>

        {element.properties?.showMarkers && (
          <>
            {/* Marker Style */}
            <div>
              <Label className="text-xs font-medium text-gray-600">Marker Style</Label>
              <Select 
                value={element.properties?.markerStyle || 'circle'} 
                onValueChange={(value) => handleSelectChange('markerStyle', value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="circle">Circle</SelectItem>
                  <SelectItem value="square">Square</SelectItem>
                  <SelectItem value="triangle">Triangle</SelectItem>
                  <SelectItem value="diamond">Diamond</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Marker Size */}
            <div>
              <Label className="text-xs font-medium text-gray-600">
                Marker Size: {element.properties?.markerSize || 6}px
              </Label>
              <Slider
                min={3}
                max={12}
                step={1}
                value={[element.properties?.markerSize || 6]}
                onValueChange={(value) => handleSliderChange('markerSize', value)}
                className="mt-2"
              />
            </div>
          </>
        )}

        {/* Grid Lines */}
        <div className="flex items-center justify-between">
          <Label className="text-xs font-medium text-gray-600">Show Grid Lines</Label>
          <Switch
            checked={element.properties?.showGridLines ?? true}
            onCheckedChange={(checked) => handleSwitchChange('showGridLines', checked)}
          />
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between">
          <Label className="text-xs font-medium text-gray-600">Show Legend</Label>
          <Switch
            checked={element.properties?.showLegend ?? true}
            onCheckedChange={(checked) => handleSwitchChange('showLegend', checked)}
          />
        </div>

        {/* Animation */}
        <div className="flex items-center justify-between">
          <Label className="text-xs font-medium text-gray-600">Enable Animation</Label>
          <Switch
            checked={element.properties?.enableAnimation ?? true}
            onCheckedChange={(checked) => handleSwitchChange('enableAnimation', checked)}
          />
        </div>
      </div>
    </div>
  );
}
