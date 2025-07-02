
import React from 'react';
import { Element } from '@/types/wireframe';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Trash2, Plus } from 'lucide-react';

interface HistogramAddOnsSectionProps {
  element: Element;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
}

export function HistogramAddOnsSection({ element, updateElementProperties }: HistogramAddOnsSectionProps) {
  const properties = element.properties || {};
  const {
    showButtons = false,
    showKpis = false,
    histogramButtons = [],
    histogramKpis = [],
  } = properties;

  const addButton = () => {
    const newButtons = [...histogramButtons, { title: 'New Button', alignment: 'left' }];
    updateElementProperties(element.id, { histogramButtons: newButtons });
  };

  const updateButton = (index: number, field: string, value: string) => {
    const newButtons = [...histogramButtons];
    newButtons[index] = { ...newButtons[index], [field]: value };
    updateElementProperties(element.id, { histogramButtons: newButtons });
  };

  const removeButton = (index: number) => {
    const newButtons = histogramButtons.filter((_, i) => i !== index);
    updateElementProperties(element.id, { histogramButtons: newButtons });
  };

  const addKpi = () => {
    const newKpis = [...histogramKpis, { title: 'New KPI', value: '0', change: '0%' }];
    updateElementProperties(element.id, { histogramKpis: newKpis });
  };

  const updateKpi = (index: number, field: string, value: string) => {
    const newKpis = [...histogramKpis];
    newKpis[index] = { ...newKpis[index], [field]: value };
    updateElementProperties(element.id, { histogramKpis: newKpis });
  };

  const removeKpi = (index: number) => {
    const newKpis = histogramKpis.filter((_, i) => i !== index);
    updateElementProperties(element.id, { histogramKpis: newKpis });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Add Ons</h3>
      
      <div className="space-y-4">
        {/* Buttons Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="showButtons" className="text-sm">Buttons</Label>
            <Switch
              id="showButtons"
              checked={showButtons}
              onCheckedChange={(checked) => 
                updateElementProperties(element.id, { showButtons: checked })
              }
            />
          </div>
          
          {showButtons && (
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                onClick={addButton}
                className="flex items-center gap-2 w-full"
              >
                <Plus className="h-4 w-4" />
                Add Button
              </Button>
              
              {histogramButtons.map((button, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Input
                    value={button.title}
                    onChange={(e) => updateButton(index, 'title', e.target.value)}
                    placeholder="Button title"
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeButton(index)}
                    className="p-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* KPIs Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="showKpis" className="text-sm">KPIs</Label>
            <Switch
              id="showKpis"
              checked={showKpis}
              onCheckedChange={(checked) => 
                updateElementProperties(element.id, { showKpis: checked })
              }
            />
          </div>
          
          {showKpis && (
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                onClick={addKpi}
                className="flex items-center gap-2 w-full"
              >
                <Plus className="h-4 w-4" />
                Add KPI
              </Button>
              
              {histogramKpis.map((kpi, index) => (
                <div key={index} className="space-y-2 p-2 border rounded">
                  <div className="flex gap-2 items-center">
                    <Input
                      value={kpi.title}
                      onChange={(e) => updateKpi(index, 'title', e.target.value)}
                      placeholder="KPI title"
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeKpi(index)}
                      className="p-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={kpi.value}
                      onChange={(e) => updateKpi(index, 'value', e.target.value)}
                      placeholder="Value"
                      className="flex-1"
                    />
                    <Input
                      value={kpi.change}
                      onChange={(e) => updateKpi(index, 'change', e.target.value)}
                      placeholder="Change %"
                      className="flex-1"
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
