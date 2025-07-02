
import React from 'react';
import { ChevronDown, ChevronRight, Plus, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface BarChartDataSectionProps {
  properties: any;
  handleChange: (field: string, value: any) => void;
  dataOpen: boolean;
  setDataOpen: (open: boolean) => void;
}

export function BarChartDataSection({ 
  properties, 
  handleChange, 
  dataOpen, 
  setDataOpen 
}: BarChartDataSectionProps) {
  const chartData = properties.chartData || [
    { name: 'Jan', value: 400, value2: 240, value3: 140 },
    { name: 'Feb', value: 300, value2: 139, value3: 190 },
    { name: 'Mar', value: 200, value2: 980, value3: 290 },
    { name: 'Apr', value: 278, value2: 390, value3: 340 },
    { name: 'May', value: 189, value2: 480, value3: 420 }
  ];

  const updateDataPoint = (index: number, field: string, value: any) => {
    const newData = [...chartData];
    newData[index] = { ...newData[index], [field]: value };
    handleChange('chartData', newData);
  };

  const addDataPoint = () => {
    const newData = [...chartData, { name: 'New', value: 0, value2: 0, value3: 0 }];
    handleChange('chartData', newData);
  };

  const removeDataPoint = (index: number) => {
    const newData = chartData.filter((_: any, i: number) => i !== index);
    handleChange('chartData', newData);
  };

  return (
    <div className="border-b pb-3 mb-3">
      <button 
        className="flex items-center justify-between w-full text-left font-medium text-sm py-2"
        onClick={() => setDataOpen(!dataOpen)}
      >
        <span>Data</span>
        {dataOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      </button>
      
      {dataOpen && (
        <div className="space-y-3 mt-2">
          {chartData.map((item: any, index: number) => (
            <div key={index} className="border rounded p-2 space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-medium">Data Point {index + 1}</Label>
                {chartData.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeDataPoint(index)}
                    className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={12} />
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs">Name</Label>
                  <Input
                    value={item.name}
                    onChange={(e) => updateDataPoint(index, 'name', e.target.value)}
                    className="mt-1 h-7 text-xs"
                  />
                </div>
                <div>
                  <Label className="text-xs">Value</Label>
                  <Input
                    type="number"
                    value={item.value}
                    onChange={(e) => updateDataPoint(index, 'value', parseInt(e.target.value) || 0)}
                    className="mt-1 h-7 text-xs"
                  />
                </div>
              </div>
              
              {(properties.chartVariant === 'multi-bar' || properties.chartVariant === 'stacked-bar') && (
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs">Value 2</Label>
                    <Input
                      type="number"
                      value={item.value2 || 0}
                      onChange={(e) => updateDataPoint(index, 'value2', parseInt(e.target.value) || 0)}
                      className="mt-1 h-7 text-xs"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Value 3</Label>
                    <Input
                      type="number"
                      value={item.value3 || 0}
                      onChange={(e) => updateDataPoint(index, 'value3', parseInt(e.target.value) || 0)}
                      className="mt-1 h-7 text-xs"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
          
          <Button
            variant="outline"
            size="sm"
            onClick={addDataPoint}
            className="w-full h-8 text-xs"
          >
            <Plus size={12} className="mr-1" />
            Add Data Point
          </Button>
        </div>
      )}
    </div>
  );
}
