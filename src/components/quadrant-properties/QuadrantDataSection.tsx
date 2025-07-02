
import React from 'react';
import { ChevronDown, Plus, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface QuadrantDataSectionProps {
  properties: any;
  handleChange: (field: string, value: any) => void;
  dataOpen: boolean;
  setDataOpen: (open: boolean) => void;
}

export function QuadrantDataSection({ properties, handleChange, dataOpen, setDataOpen }: QuadrantDataSectionProps) {
  const quadrantData = properties.quadrantData || [
    { name: 'A', x: 2, y: 3 },
    { name: 'B', x: 4, y: 1 },
    { name: 'C', x: 1, y: 4 },
    { name: 'D', x: 3, y: 2 }
  ];

  const updateDataPoint = (index: number, field: string, value: any) => {
    const newData = [...quadrantData];
    newData[index] = { ...newData[index], [field]: value };
    handleChange('quadrantData', newData);
  };

  const addDataPoint = () => {
    const newData = [...quadrantData, { name: `Point ${quadrantData.length + 1}`, x: 2.5, y: 2.5 }];
    handleChange('quadrantData', newData);
  };

  const removeDataPoint = (index: number) => {
    const newData = quadrantData.filter((_: any, i: number) => i !== index);
    handleChange('quadrantData', newData);
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
        <div className="space-y-3 mb-4">
          {quadrantData.map((point: any, index: number) => (
            <div key={index} className="p-3 border rounded-md bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium">Data Point {index + 1}</Label>
                {quadrantData.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeDataPoint(index)}
                    className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Label className="text-xs text-gray-600">Name</Label>
                  <Input
                    value={point.name}
                    onChange={(e) => updateDataPoint(index, 'name', e.target.value)}
                    className="h-7 text-sm"
                    placeholder="Name"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-600">X Value</Label>
                  <Input
                    type="number"
                    value={point.x}
                    onChange={(e) => updateDataPoint(index, 'x', parseFloat(e.target.value) || 0)}
                    className="h-7 text-sm"
                    placeholder="X"
                    step="0.1"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-600">Y Value</Label>
                  <Input
                    type="number"
                    value={point.y}
                    onChange={(e) => updateDataPoint(index, 'y', parseFloat(e.target.value) || 0)}
                    className="h-7 text-sm"
                    placeholder="Y"
                    step="0.1"
                  />
                </div>
              </div>
            </div>
          ))}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={addDataPoint}
            className="w-full border border-dashed border-gray-300 text-gray-600 hover:border-gray-400"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Data Point
          </Button>
        </div>
      )}
    </>
  );
}
