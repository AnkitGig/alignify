
import React from 'react';
import { Element } from '@/types/wireframe';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface LineChartDataSectionProps {
  element: Element;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
}

export function LineChartDataSection({ element, updateElementProperties }: LineChartDataSectionProps) {
  const chartData = element.properties?.chartData || [
    { category: 'Jan 22', value: 30, line: 25 },
    { category: 'Feb 22', value: 45, line: 35 },
    { category: 'Mar 22', value: 35, line: 40 },
    { category: 'Apr 22', value: 50, line: 45 },
    { category: 'May 22', value: 25, line: 30 },
    { category: 'Jun 22', value: 60, line: 55 }
  ];

  const chartVariant = element.properties?.chartVariant || 'basic-line';
  const isMultiLine = chartVariant === 'multi-line';

  const handleDataChange = (index: number, field: string, value: string | number) => {
    const newData = [...chartData];
    newData[index] = { ...newData[index], [field]: value };
    updateElementProperties(element.id, { chartData: newData });
  };

  const addDataPoint = () => {
    const newPoint: any = { 
      category: `Item ${chartData.length + 1}`, 
      value: 0 
    };
    
    // Add line data for multi-line charts
    if (isMultiLine) {
      newPoint.line = 0;
    }
    
    const newData = [...chartData, newPoint];
    updateElementProperties(element.id, { chartData: newData });
  };

  const removeDataPoint = (index: number) => {
    const newData = chartData.filter((_, i) => i !== index);
    updateElementProperties(element.id, { chartData: newData });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-700 border-b pb-2 flex-1">Data Points</h4>
        <Button onClick={addDataPoint} size="sm" variant="outline" className="ml-2 shrink-0">
          <Plus className="h-3 w-3" />
        </Button>
      </div>
      
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {chartData.map((item, index) => (
          <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-2 p-3 border rounded-lg">
            <div className="flex-1 w-full sm:w-auto">
              <Label className="text-xs text-gray-500">Category</Label>
              <Input
                value={item.category}
                onChange={(e) => handleDataChange(index, 'category', e.target.value)}
                className="mt-1 text-xs"
                placeholder="Category"
              />
            </div>
            
            <div className="flex-1 w-full sm:w-auto">
              <Label className="text-xs text-gray-500">Primary Value</Label>
              <Input
                type="number"
                value={item.value}
                onChange={(e) => handleDataChange(index, 'value', parseInt(e.target.value) || 0)}
                className="mt-1 text-xs"
                placeholder="Value"
              />
            </div>
            
            {isMultiLine && (
              <div className="flex-1 w-full sm:w-auto">
                <Label className="text-xs text-gray-500">Secondary Value</Label>
                <Input
                  type="number"
                  value={item.line || 0}
                  onChange={(e) => handleDataChange(index, 'line', parseInt(e.target.value) || 0)}
                  className="mt-1 text-xs"
                  placeholder="Line Value"
                />
              </div>
            )}
            
            <Button 
              onClick={() => removeDataPoint(index)} 
              size="sm" 
              variant="outline"
              className="mt-4 sm:mt-0 shrink-0 w-full sm:w-auto"
            >
              <Minus className="h-3 w-3" />
            </Button>
          </div>
        ))}
      </div>

      {isMultiLine && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <h5 className="text-sm font-medium text-blue-800 mb-2">Multi-Line Chart Data</h5>
          <p className="text-xs text-blue-600">
            This chart supports multiple data series. Each data point includes both primary and secondary values 
            that will be displayed as separate lines on the chart.
          </p>
        </div>
      )}
    </div>
  );
}
