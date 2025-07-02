
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Plus } from 'lucide-react';

interface WaterfallAddOnsSectionProps {
  properties: any;
  elementId: string;
  updateElementProperties: (id: string, properties: any) => void;
}

export function WaterfallAddOnsSection({ properties, elementId, updateElementProperties }: WaterfallAddOnsSectionProps) {
  const waterfallVariant = properties.waterfallVariant || 'basic-waterfall';
  const waterfallButtons = properties.waterfallButtons || [];
  const waterfallKpis = properties.waterfallKpis || [];

  const addButton = () => {
    const newButtons = [...waterfallButtons, { title: 'New Button', alignment: 'left' }];
    updateElementProperties(elementId, { waterfallButtons: newButtons });
  };

  const updateButton = (index: number, field: string, value: string) => {
    const newButtons = [...waterfallButtons];
    newButtons[index] = { ...newButtons[index], [field]: value };
    updateElementProperties(elementId, { waterfallButtons: newButtons });
  };

  const removeButton = (index: number) => {
    const newButtons = waterfallButtons.filter((_: any, i: number) => i !== index);
    updateElementProperties(elementId, { waterfallButtons: newButtons });
  };

  const addKpi = () => {
    const newKpis = [...waterfallKpis, { title: 'Metric', value: '123', change: '12%' }];
    updateElementProperties(elementId, { waterfallKpis: newKpis });
  };

  const updateKpi = (index: number, field: string, value: string) => {
    const newKpis = [...waterfallKpis];
    newKpis[index] = { ...newKpis[index], [field]: value };
    updateElementProperties(elementId, { waterfallKpis: newKpis });
  };

  const removeKpi = (index: number) => {
    const newKpis = waterfallKpis.filter((_: any, i: number) => i !== index);
    updateElementProperties(elementId, { waterfallKpis: newKpis });
  };

  if (waterfallVariant === 'basic-waterfall') {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-900">Add-ons</h3>
      
      {waterfallVariant === 'with-buttons' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm">Buttons</Label>
            <Button size="sm" variant="outline" onClick={addButton} className="h-8 w-8 p-0">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          {waterfallButtons.map((button: any, index: number) => (
            <div key={index} className="grid grid-cols-12 gap-2 items-center">
              <div className="col-span-5">
                <Input
                  value={button.title}
                  onChange={(e) => updateButton(index, 'title', e.target.value)}
                  placeholder="Button text"
                  className="text-sm"
                />
              </div>
              <div className="col-span-5">
                <Select
                  value={button.alignment}
                  onValueChange={(value) => updateButton(index, 'alignment', value)}
                >
                  <SelectTrigger className="text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">Left</SelectItem>
                    <SelectItem value="center">Center</SelectItem>
                    <SelectItem value="right">Right</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 flex justify-end">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => removeButton(index)}
                  className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {waterfallVariant === 'with-kpis' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm">KPIs</Label>
            <Button size="sm" variant="outline" onClick={addKpi} className="h-8 w-8 p-0">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          {waterfallKpis.map((kpi: any, index: number) => (
            <div key={index} className="space-y-2">
              <div className="grid grid-cols-12 gap-2 items-center">
                <div className="col-span-10">
                  <Input
                    value={kpi.title}
                    onChange={(e) => updateKpi(index, 'title', e.target.value)}
                    placeholder="KPI Title"
                    className="text-sm"
                  />
                </div>
                <div className="col-span-2 flex justify-end">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeKpi(index)}
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  value={kpi.value}
                  onChange={(e) => updateKpi(index, 'value', e.target.value)}
                  placeholder="Value"
                  className="text-sm"
                />
                <Input
                  value={kpi.change || ''}
                  onChange={(e) => updateKpi(index, 'change', e.target.value)}
                  placeholder="Change %"
                  className="text-sm"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
