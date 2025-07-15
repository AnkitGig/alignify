
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Trash2, Plus } from 'lucide-react';

interface PieChartDataSectionProps {
  properties: any;
  handleChange: (field: string, value: any) => void;
  dataOpen: boolean;
  setDataOpen: (open: boolean) => void;
}

export function PieChartDataSection({ properties, handleChange, dataOpen, setDataOpen }: PieChartDataSectionProps) {
  const pieChartData = properties.pieChartData || [
    { name: 'Text A', value: 30, color: '#4F46E5' },
    { name: 'Text B', value: 25, color: '#7C3AED' },
    { name: 'Text C', value: 20, color: '#06B6D4' },
    { name: 'Text D', value: 20, color: '#8B5CF6' },
    { name: 'Text E', value: 5, color: '#EC4899' }
  ];

  const updateDataItem = (index: number, field: string, value: any) => {
    const newData = [...pieChartData];
    newData[index] = { ...newData[index], [field]: value };
    handleChange('pieChartData', newData);
  };

  const addDataItem = () => {
    const newData = [...pieChartData, { name: 'New Item', value: 10, color: '#6B7280' }];
    handleChange('pieChartData', newData);
  };

  const removeDataItem = (index: number) => {
    const newData = pieChartData.filter((_: any, i: number) => i !== index);
    handleChange('pieChartData', newData);
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
          <div className="space-y-3">
            {pieChartData.map((item: any, index: number) => (
              <div key={index} className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-xs font-medium">Item {index + 1}</Label>
                  {pieChartData.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeDataItem(index)}
                      className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div>
                    <Label className="text-xs">Category Label</Label>
                    <Input
                      value={item.name}
                      onChange={(e) => updateDataItem(index, 'name', e.target.value)}
                      className="text-xs h-7"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-xs">Value</Label>
                    <Input
                      type="number"
                      value={item.value}
                      onChange={(e) => updateDataItem(index, 'value', Number(e.target.value))}
                      className="text-xs h-7"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-xs">Color</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="color"
                        value={item.color}
                        onChange={(e) => updateDataItem(index, 'color', e.target.value)}
                        className="w-8 h-7 p-1 border rounded"
                      />
                      <Input
                        value={item.color}
                        onChange={(e) => updateDataItem(index, 'color', e.target.value)}
                        className="text-xs h-7 flex-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={addDataItem}
            className="w-full text-xs h-7"
          >
            <Plus className="h-3 w-3 mr-1" />
            Add Data Item
          </Button>
        </div>
      )}
    </>
  );
}
