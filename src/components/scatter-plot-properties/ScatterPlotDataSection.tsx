
import React from 'react';
import { ChevronDown, Plus, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface ScatterPlotDataSectionProps {
  properties: any;
  handleChange: (field: string, value: any) => void;
  dataOpen: boolean;
  setDataOpen: (open: boolean) => void;
}

export function ScatterPlotDataSection({ properties, handleChange, dataOpen, setDataOpen }: ScatterPlotDataSectionProps) {
  const scatterPlotData = properties.scatterPlotData || [
    { name: 'A', x: 20, y: 30, size: 10 },
    { name: 'B', x: 40, y: 50, size: 15 },
    { name: 'C', x: 60, y: 25, size: 8 },
    { name: 'D', x: 80, y: 70, size: 12 }
  ];

  const updateDataPoint = (index: number, field: string, value: string | number) => {
    const updatedData = [...scatterPlotData];
    updatedData[index] = { ...updatedData[index], [field]: value };
    handleChange('scatterPlotData', updatedData);
  };

  const addDataPoint = () => {
    const newData = [...scatterPlotData, { name: `Point ${scatterPlotData.length + 1}`, x: 50, y: 50, size: 10 }];
    handleChange('scatterPlotData', newData);
  };

  const removeDataPoint = (index: number) => {
    const newData = scatterPlotData.filter((_: any, i: number) => i !== index);
    handleChange('scatterPlotData', newData);
  };

  return (
    <>
      <div className="border-b pb-2 mb-2">
        <button
          onClick={() => setDataOpen(!dataOpen)}
          className="flex items-center justify-between w-full text-left font-medium py-2"
        >
          <span>Data Points</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${dataOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>
      
      {dataOpen && (
        <div className="space-y-3 mb-4">
          {scatterPlotData.map((point: any, index: number) => (
            <div key={index} className="p-3 border rounded-md bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium">Point {index + 1}</Label>
                {scatterPlotData.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeDataPoint(index)}
                    className="h-6 w-6 p-0"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs">Name</Label>
                  <Input
                    value={point.name}
                    onChange={(e) => updateDataPoint(index, 'name', e.target.value)}
                    className="mt-1 h-8 text-sm"
                  />
                </div>
                <div>
                  <Label className="text-xs">Size</Label>
                  <Input
                    type="number"
                    value={point.size || 10}
                    onChange={(e) => updateDataPoint(index, 'size', parseFloat(e.target.value))}
                    className="mt-1 h-8 text-sm"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div>
                  <Label className="text-xs">X Value</Label>
                  <Input
                    type="number"
                    value={point.x}
                    onChange={(e) => updateDataPoint(index, 'x', parseFloat(e.target.value))}
                    className="mt-1 h-8 text-sm"
                  />
                </div>
                <div>
                  <Label className="text-xs">Y Value</Label>
                  <Input
                    type="number"
                    value={point.y}
                    onChange={(e) => updateDataPoint(index, 'y', parseFloat(e.target.value))}
                    className="mt-1 h-8 text-sm"
                  />
                </div>
              </div>
            </div>
          ))}
          
          <Button
            variant="outline"
            size="sm"
            onClick={addDataPoint}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Data Point
          </Button>
        </div>
      )}
    </>
  );
}
