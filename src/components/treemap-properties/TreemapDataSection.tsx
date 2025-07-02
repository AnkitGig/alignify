
import React from 'react';
import { Element } from '@/types/wireframe';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';

interface TreemapDataSectionProps {
  element: Element;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
}

export function TreemapDataSection({ element, updateElementProperties }: TreemapDataSectionProps) {
  const properties = element.properties || {};
  const {
    treemapData = [
      { name: 'Category A', value: 400, color: '#4F46E5' },
      { name: 'Category B', value: 300, color: '#7C3AED' },
      { name: 'Category C', value: 200, color: '#059669' }
    ]
  } = properties;

  const updateDataPoint = (index: number, field: string, value: any) => {
    const newData = [...treemapData];
    newData[index] = { ...newData[index], [field]: value };
    updateElementProperties(element.id, { treemapData: newData });
  };

  const addDataPoint = () => {
    const newData = [...treemapData, { name: `Category ${treemapData.length + 1}`, value: 100, color: '#4F46E5' }];
    updateElementProperties(element.id, { treemapData: newData });
  };

  const removeDataPoint = (index: number) => {
    if (treemapData.length > 1) {
      const newData = treemapData.filter((_, i) => i !== index);
      updateElementProperties(element.id, { treemapData: newData });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Edit Data</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={addDataPoint}
          className="flex items-center gap-1"
        >
          <Plus className="h-3 w-3" />
          Add
        </Button>
      </div>
      
      <div className="space-y-3">
        {treemapData.map((dataPoint, index) => (
          <div key={index} className="p-3 border rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-medium">Data {index + 1}</Label>
              {treemapData.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeDataPoint(index)}
                  className="h-6 w-6 p-0"
                >
                  <Minus className="h-3 w-3" />
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs">Name</Label>
                <Input
                  value={dataPoint.name}
                  onChange={(e) => updateDataPoint(index, 'name', e.target.value)}
                  className="h-8 text-xs"
                />
              </div>
              <div>
                <Label className="text-xs">Value</Label>
                <Input
                  type="number"
                  value={dataPoint.value}
                  onChange={(e) => updateDataPoint(index, 'value', Number(e.target.value))}
                  className="h-8 text-xs"
                />
              </div>
            </div>
            
            <div>
              <Label className="text-xs">Color</Label>
              <input
                type="color"
                value={dataPoint.color}
                onChange={(e) => updateDataPoint(index, 'color', e.target.value)}
                className="w-full h-8 rounded border"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
