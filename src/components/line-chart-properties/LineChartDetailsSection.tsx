
import React from 'react';
import { Element, ChartVariant } from '@/types/wireframe';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

interface LineChartDetailsSectionProps {
  element: Element;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
}

export function LineChartDetailsSection({ element, updateElementProperties }: LineChartDetailsSectionProps) {
  const handleTitleChange = (value: string) => {
    updateElementProperties(element.id, { chartTitle: value });
  };

  const handleVariantChange = (value: string) => {
    const chartVariant = value as ChartVariant;
    updateElementProperties(element.id, { chartVariant });
    
    // Apply specific configurations for different variants
    if (value === 'multi-line') {
      updateElementProperties(element.id, {
        chartData: [
          { category: 'Jan 22', value: 30, line: 25, secondary: 20 },
          { category: 'Feb 22', value: 45, line: 35, secondary: 30 },
          { category: 'Mar 22', value: 35, line: 40, secondary: 25 },
          { category: 'Apr 22', value: 50, line: 45, secondary: 35 },
          { category: 'May 22', value: 25, line: 30, secondary: 40 },
          { category: 'Jun 22', value: 60, line: 55, secondary: 45 }
        ],
        showLegend: true,
        enableAnimation: true
      });
    } else if (value === 'stepped-line') {
      updateElementProperties(element.id, {
        curveType: 'step',
        showMarkers: false
      });
    } else if (value === 'curved-line') {
      updateElementProperties(element.id, {
        curveType: 'basis',
        lineWidth: 3
      });
    }
  };

  const handleHeightChange = (value: number[]) => {
    updateElementProperties(element.id, { chartHeight: value[0] });
  };

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-gray-700 border-b pb-2">Chart Details</h4>
      
      <div className="space-y-3">
        <div className="grid grid-cols-1 gap-3">
          <div>
            <Label htmlFor="chart-title" className="text-xs font-medium text-gray-600">
              Chart Title
            </Label>
            <Input
              id="chart-title"
              value={element.properties?.chartTitle || ''}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Enter chart title"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="chart-variant" className="text-xs font-medium text-gray-600">
              Chart Type
            </Label>
            <Select value={element.properties?.chartVariant || 'basic-line'} onValueChange={handleVariantChange}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select chart type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic-line">Basic Line</SelectItem>
                <SelectItem value="multi-line">Multi-Line</SelectItem>
                <SelectItem value="stepped-line">Stepped Line</SelectItem>
                <SelectItem value="curved-line">Curved Line</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="chart-height" className="text-xs font-medium text-gray-600">
              Chart Height: {element.properties?.chartHeight || 300}px
            </Label>
            <Slider
              id="chart-height"
              min={200}
              max={600}
              step={50}
              value={[element.properties?.chartHeight || 300]}
              onValueChange={handleHeightChange}
              className="mt-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
