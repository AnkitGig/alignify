
import React from 'react';
import { Element } from '@/types/wireframe';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Plus, Trash2 } from 'lucide-react';

interface ComboChartDataSectionProps {
  element: Element;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
}

export function ComboChartDataSection({ element, updateElementProperties }: ComboChartDataSectionProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  
  const chartData = element.properties?.chartData || [
    { category: 'Jan 22', value: 30, line: 25 },
    { category: 'Feb 22', value: 45, line: 35 },
    { category: 'Mar 22', value: 35, line: 40 },
    { category: 'Apr 22', value: 50, line: 45 },
    { category: 'May 22', value: 25, line: 30 },
    { category: 'Jun 22', value: 60, line: 55 }
  ];

  const updateDataPoint = (index: number, field: string, value: string | number) => {
    const newData = [...chartData];
    newData[index] = { ...newData[index], [field]: field === 'category' ? value : Number(value) };
    updateElementProperties(element.id, { chartData: newData });
  };

  const addDataPoint = () => {
    const newData = [...chartData, { category: 'New', value: 0, line: 0 }];
    updateElementProperties(element.id, { chartData: newData });
  };

  const removeDataPoint = (index: number) => {
    const newData = chartData.filter((_, i) => i !== index);
    updateElementProperties(element.id, { chartData: newData });
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex items-center justify-between w-full p-2 text-sm font-medium bg-gray-50 hover:bg-gray-100 rounded">
        Data
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-3 p-2">
        <div className="space-y-2">
          {chartData.map((item, index) => (
            <div key={index} className="grid grid-cols-4 gap-2 items-center">
              <Input
                value={item.category}
                onChange={(e) => updateDataPoint(index, 'category', e.target.value)}
                placeholder="Category"
                className="text-xs"
              />
              <Input
                type="number"
                value={item.value}
                onChange={(e) => updateDataPoint(index, 'value', e.target.value)}
                placeholder="Bar"
                className="text-xs"
              />
              <Input
                type="number"
                value={item.line}
                onChange={(e) => updateDataPoint(index, 'line', e.target.value)}
                placeholder="Line"
                className="text-xs"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeDataPoint(index)}
                className="h-8 w-8 p-0"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={addDataPoint}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Data Point
        </Button>
      </CollapsibleContent>
    </Collapsible>
  );
}
