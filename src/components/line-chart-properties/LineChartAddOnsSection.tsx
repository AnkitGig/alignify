
import React from 'react';
import { Element } from '@/types/wireframe';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Minus } from 'lucide-react';

interface LineChartAddOnsSectionProps {
  element: Element;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
}

export function LineChartAddOnsSection({ element, updateElementProperties }: LineChartAddOnsSectionProps) {
  const chartButtons = element.properties?.chartButtons || [];
  const chartKpis = element.properties?.chartKpis || [];

  const handleSwitchChange = (property: string, checked: boolean) => {
    updateElementProperties(element.id, { [property]: checked });
  };

  const addButton = () => {
    const newButtons = [...chartButtons, { title: 'New Button', alignment: 'left' }];
    updateElementProperties(element.id, { chartButtons: newButtons, showButtons: true });
  };

  const removeButton = (index: number) => {
    const newButtons = chartButtons.filter((_, i) => i !== index);
    updateElementProperties(element.id, { chartButtons: newButtons });
  };

  const updateButton = (index: number, field: string, value: string) => {
    const newButtons = [...chartButtons];
    newButtons[index] = { ...newButtons[index], [field]: value };
    updateElementProperties(element.id, { chartButtons: newButtons });
  };

  const addKpi = () => {
    const newKpis = [...chartKpis, { title: 'KPI Title', value: '0', change: '+0%' }];
    updateElementProperties(element.id, { chartKpis: newKpis, showKpis: true });
  };

  const removeKpi = (index: number) => {
    const newKpis = chartKpis.filter((_, i) => i !== index);
    updateElementProperties(element.id, { chartKpis: newKpis });
  };

  const updateKpi = (index: number, field: string, value: string) => {
    const newKpis = [...chartKpis];
    newKpis[index] = { ...newKpis[index], [field]: value };
    updateElementProperties(element.id, { chartKpis: newKpis });
  };

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-gray-700 border-b pb-2">Add-ons</h4>
      
      <div className="space-y-4">
        {/* Buttons Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <Label className="text-xs font-medium text-gray-600">Buttons</Label>
            <Switch
              checked={element.properties?.showButtons || false}
              onCheckedChange={(checked) => handleSwitchChange('showButtons', checked)}
            />
          </div>
          
          {element.properties?.showButtons && (
            <div className="space-y-2">
              <Button onClick={addButton} size="sm" variant="outline" className="w-full">
                <Plus className="h-3 w-3 mr-1" />
                Add Button
              </Button>
              
              {chartButtons.map((button, index) => (
                <div key={index} className="flex items-center gap-2 p-2 border rounded">
                  <Input
                    value={button.title}
                    onChange={(e) => updateButton(index, 'title', e.target.value)}
                    placeholder="Button title"
                    className="text-xs"
                  />
                  <Button 
                    onClick={() => removeButton(index)} 
                    size="sm" 
                    variant="outline"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* KPIs Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <Label className="text-xs font-medium text-gray-600">KPIs</Label>
            <Switch
              checked={element.properties?.showKpis || false}
              onCheckedChange={(checked) => handleSwitchChange('showKpis', checked)}
            />
          </div>
          
          {element.properties?.showKpis && (
            <div className="space-y-2">
              <Button onClick={addKpi} size="sm" variant="outline" className="w-full">
                <Plus className="h-3 w-3 mr-1" />
                Add KPI
              </Button>
              
              {chartKpis.map((kpi, index) => (
                <div key={index} className="space-y-2 p-2 border rounded">
                  <div className="flex items-center gap-2">
                    <Input
                      value={kpi.title}
                      onChange={(e) => updateKpi(index, 'title', e.target.value)}
                      placeholder="KPI title"
                      className="text-xs"
                    />
                    <Button 
                      onClick={() => removeKpi(index)} 
                      size="sm" 
                      variant="outline"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      value={kpi.value}
                      onChange={(e) => updateKpi(index, 'value', e.target.value)}
                      placeholder="Value"
                      className="text-xs"
                    />
                    <Input
                      value={kpi.change || ''}
                      onChange={(e) => updateKpi(index, 'change', e.target.value)}
                      placeholder="Change"
                      className="text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
