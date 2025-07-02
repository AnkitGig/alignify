
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2, Plus } from 'lucide-react';

interface WaterfallDataSectionProps {
  properties: any;
  elementId: string;
  updateElementProperties: (properties: any) => void;
}

export function WaterfallDataSection({ properties, elementId, updateElementProperties }: WaterfallDataSectionProps) {
  const waterfallData = properties.waterfallData || [
    { category: 'Jan 22', value: 50, isTotal: false },
    { category: 'Feb 22', value: 130, isTotal: false },
    { category: 'Mar 22', value: 80, isTotal: false },
    { category: 'Apr 22', value: 150, isTotal: false },
    { category: 'May 22', value: 120, isTotal: false },
    { category: 'Total', value: 530, isTotal: true }
  ];

  const updateDataPoint = (index: number, field: string, value: any) => {
    const newData = [...waterfallData];
    newData[index] = { ...newData[index], [field]: value };
    console.log('WaterfallDataSection updating data:', newData);
    updateElementProperties({ waterfallData: newData });
  };

  const addDataPoint = () => {
    const newData = [...waterfallData, { category: 'New', value: 0, isTotal: false }];
    updateElementProperties({ waterfallData: newData });
  };

  const removeDataPoint = (index: number) => {
    const newData = waterfallData.filter((_: any, i: number) => i !== index);
    updateElementProperties({ waterfallData: newData });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900">Data</h3>
        <Button
          size="sm"
          variant="outline"
          onClick={addDataPoint}
          className="h-8 w-8 p-0"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="space-y-3">
        {waterfallData.map((item: any, index: number) => (
          <div key={index} className="grid grid-cols-12 gap-2 items-center">
            <div className="col-span-5">
              <Input
                value={item.category}
                onChange={(e) => updateDataPoint(index, 'category', e.target.value)}
                placeholder="Category"
                className="text-sm"
              />
            </div>
            <div className="col-span-5">
              <Input
                type="number"
                value={item.value}
                onChange={(e) => updateDataPoint(index, 'value', parseInt(e.target.value) || 0)}
                placeholder="Value"
                className="text-sm"
              />
            </div>
            <div className="col-span-2 flex justify-end">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => removeDataPoint(index)}
                className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
