
import React from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Plus, Minus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface HeatmapDataSectionProps {
  properties: any;
  handleChange: (field: string, value: any) => void;
  dataOpen: boolean;
  setDataOpen: (open: boolean) => void;
}

export function HeatmapDataSection({ 
  properties, 
  handleChange, 
  dataOpen, 
  setDataOpen 
}: HeatmapDataSectionProps) {
  const heatmapData = properties.heatmapData || [
    { label: 'Data A', value: 86 },
    { label: 'Data B', value: 56 },
    { label: 'Data C', value: 21 },
    { label: 'Data D', value: 18 },
    { label: 'Data E', value: 67 }
  ];

  const updateDataItem = (index: number, field: 'label' | 'value', value: string | number) => {
    const newData = [...heatmapData];
    newData[index] = { ...newData[index], [field]: value };
    handleChange('heatmapData', newData);
  };

  const addDataItem = () => {
    const newData = [...heatmapData, { label: `Data ${heatmapData.length + 1}`, value: 50 }];
    handleChange('heatmapData', newData);
  };

  const removeDataItem = (index: number) => {
    if (heatmapData.length > 1) {
      const newData = heatmapData.filter((_, i) => i !== index);
      handleChange('heatmapData', newData);
    }
  };

  return (
    <Collapsible open={dataOpen} onOpenChange={setDataOpen}>
      <CollapsibleTrigger className="flex items-center justify-between w-full py-2 px-1 hover:bg-gray-50 rounded">
        <span className="font-medium">Data</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${dataOpen ? 'rotate-180' : ''}`} />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-3 pt-2 pb-4">
        <div className="text-sm text-gray-600 mb-2">Edit Data</div>
        
        {heatmapData.map((item: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <Input
              value={item.label}
              onChange={(e) => updateDataItem(index, 'label', e.target.value)}
              className="flex-1"
              placeholder="Label"
            />
            <Input
              type="number"
              value={item.value}
              onChange={(e) => updateDataItem(index, 'value', Number(e.target.value))}
              className="w-20"
              placeholder="Value"
            />
            <button
              onClick={() => removeDataItem(index)}
              className="p-1 hover:bg-gray-100 rounded"
              disabled={heatmapData.length <= 1}
            >
              <Minus className="h-4 w-4" />
            </button>
          </div>
        ))}
        
        <button
          onClick={addDataItem}
          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
        >
          <Plus className="h-4 w-4" />
          Add Data Point
        </button>
      </CollapsibleContent>
    </Collapsible>
  );
}
