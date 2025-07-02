
import React from 'react';
import { ChevronDown, Plus, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface ColumnChartDataSectionProps {
  properties: any;
  handleChange: (field: string, value: any) => void;
  dataOpen: boolean;
  setDataOpen: (open: boolean) => void;
}

export function ColumnChartDataSection({ properties, handleChange, dataOpen, setDataOpen }: ColumnChartDataSectionProps) {
  const chartData = properties.chartData || [
    { category: 'Jan', value: 65 },
    { category: 'Feb', value: 78 },
    { category: 'Mar', value: 52 },
    { category: 'Apr', value: 84 },
    { category: 'May', value: 71 },
    { category: 'Jun', value: 93 }
  ];

  const addDataPoint = () => {
    const newData = [...chartData, { category: 'New', value: 50 }];
    handleChange('chartData', newData);
  };

  const removeDataPoint = (index: number) => {
    const newData = chartData.filter((_: any, i: number) => i !== index);
    handleChange('chartData', newData);
  };

  const updateDataPoint = (index: number, field: string, value: any) => {
    const newData = [...chartData];
    newData[index] = { ...newData[index], [field]: value };
    handleChange('chartData', newData);
  };

  return (
    <>
      <div className="border-b pb-2 mb-2">
        <button
          onClick={() => setDataOpen(!dataOpen)}
          className="flex items-center justify-between w-full text-left font-medium py-2"
        >
          <span>Data</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${dataOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>
      
      {dataOpen && (
        <div className="space-y-4 mb-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Data Points</Label>
            <Button
              onClick={addDataPoint}
              size="sm"
              variant="outline"
              className="h-6 text-xs"
            >
              <Plus className="h-3 w-3 mr-1" />
              Add Point
            </Button>
          </div>
          
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {chartData.map((point: any, index: number) => (
              <div key={index} className="flex items-center gap-2 p-2 border rounded">
                <div className="flex-1">
                  <Label className="text-xs text-gray-500">Category</Label>
                  <Input
                    value={point.category}
                    onChange={(e) => updateDataPoint(index, 'category', e.target.value)}
                    placeholder="Category"
                    className="text-xs"
                  />
                </div>
                <div className="flex-1">
                  <Label className="text-xs text-gray-500">Value</Label>
                  <Input
                    type="number"
                    value={point.value}
                    onChange={(e) => updateDataPoint(index, 'value', parseInt(e.target.value) || 0)}
                    placeholder="Value"
                    className="text-xs"
                  />
                </div>
                <Button
                  onClick={() => removeDataPoint(index)}
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
