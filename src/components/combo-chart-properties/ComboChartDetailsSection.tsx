
import React from 'react';
import { Element, ChartVariant } from '@/types/wireframe';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

interface ComboChartDetailsSectionProps {
  element: Element;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
}

export function ComboChartDetailsSection({ element, updateElementProperties }: ComboChartDetailsSectionProps) {
  const handleTitleChange = (value: string) => {
    updateElementProperties(element.id, { chartTitle: value });
  };

  const handleVariantChange = (value: string) => {
    const chartVariant = value as ChartVariant;
    updateElementProperties(element.id, { chartVariant });
    
    // Apply specific configurations for advanced variants
    if (value === 'advanced-combo') {
      updateElementProperties(element.id, {
        enableAnimation: true,
        animationDuration: 1500,
        customTooltip: true,
        enableZoom: true,
        enablePan: true,
        enableExport: true,
        showDataLabels: true,
        labelPosition: 'top'
      });
    } else if (value === 'multi-line-combo') {
      updateElementProperties(element.id, {
        chartData: [
          { category: 'Jan', value: 30, line: 25, secondary: 20, tertiary: 15 },
          { category: 'Feb', value: 45, line: 35, secondary: 30, tertiary: 25 },
          { category: 'Mar', value: 35, line: 40, secondary: 25, tertiary: 30 },
          { category: 'Apr', value: 50, line: 45, secondary: 35, tertiary: 40 },
          { category: 'May', value: 25, line: 30, secondary: 40, tertiary: 35 },
          { category: 'Jun', value: 60, line: 55, secondary: 45, tertiary: 50 }
        ],
        showLegend: true,
        enableAnimation: true
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
          <Select value={element.properties?.chartVariant || 'basic-combo'} onValueChange={handleVariantChange}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select chart type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="basic-combo">Basic Combo</SelectItem>
              <SelectItem value="advanced-combo">Advanced Combo</SelectItem>
              <SelectItem value="multi-line-combo">Multi-Chart Combo</SelectItem>
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
  );
}
