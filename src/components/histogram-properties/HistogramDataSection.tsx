
import React from 'react';
import { Element } from '@/types/wireframe';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2, Plus } from 'lucide-react';

interface HistogramDataSectionProps {
  element: Element;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
}

export function HistogramDataSection({ element, updateElementProperties }: HistogramDataSectionProps) {
  const properties = element.properties || {};
  const { 
    histogramData = [
      { range: '0-10', frequency: 5 },
      { range: '10-20', frequency: 8 },
      { range: '20-30', frequency: 12 },
      { range: '30-40', frequency: 15 },
      { range: '40-50', frequency: 10 },
      { range: '50-60', frequency: 7 },
      { range: '60-70', frequency: 4 },
      { range: '70-80', frequency: 2 }
    ],
    binCount = 8
  } = properties;

  const updateDataPoint = (index: number, field: 'range' | 'frequency', value: string | number) => {
    const newData = [...histogramData];
    newData[index] = { ...newData[index], [field]: value };
    updateElementProperties(element.id, { histogramData: newData });
  };

  const addDataPoint = () => {
    const newData = [...histogramData, { range: 'New Range', frequency: 0 }];
    updateElementProperties(element.id, { 
      histogramData: newData,
      binCount: newData.length
    });
  };

  const removeDataPoint = (index: number) => {
    const newData = histogramData.filter((_, i) => i !== index);
    updateElementProperties(element.id, { 
      histogramData: newData,
      binCount: newData.length
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Data</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={addDataPoint}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Bin
        </Button>
      </div>
      
      <div className="space-y-3">
        <div>
          <Label className="text-sm">Number of Bins</Label>
          <Input
            type="number"
            value={binCount}
            onChange={(e) => 
              updateElementProperties(element.id, { binCount: parseInt(e.target.value) || 8 })
            }
            className="mt-1"
            min="1"
            max="20"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm">Data Points</Label>
          {histogramData.map((point, index) => (
            <div key={index} className="flex gap-2 items-center">
              <Input
                value={point.range}
                onChange={(e) => updateDataPoint(index, 'range', e.target.value)}
                placeholder="Range"
                className="flex-1"
              />
              <Input
                type="number"
                value={point.frequency}
                onChange={(e) => updateDataPoint(index, 'frequency', parseInt(e.target.value) || 0)}
                placeholder="Frequency"
                className="w-20"
              />
              {histogramData.length > 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeDataPoint(index)}
                  className="p-2"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
