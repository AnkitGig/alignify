
import React from 'react';
import { Element } from '@/types/wireframe';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';

interface TreemapAddOnsSectionProps {
  element: Element;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
}

export function TreemapAddOnsSection({ element, updateElementProperties }: TreemapAddOnsSectionProps) {
  const properties = element.properties || {};
  const {
    showButtons = false,
    treemapButtons = [],
    showKpis = false,
    treemapKpis = []
  } = properties;

  const updateButton = (index: number, field: string, value: any) => {
    const newButtons = [...treemapButtons];
    newButtons[index] = { ...newButtons[index], [field]: value };
    updateElementProperties(element.id, { treemapButtons: newButtons });
  };

  const addButton = () => {
    const newButtons = [...treemapButtons, { title: `Title ${treemapButtons.length + 1}`, alignment: 'left' }];
    updateElementProperties(element.id, { treemapButtons: newButtons });
  };

  const removeButton = (index: number) => {
    const newButtons = treemapButtons.filter((_, i) => i !== index);
    updateElementProperties(element.id, { treemapButtons: newButtons });
  };

  const updateKpi = (index: number, field: string, value: any) => {
    const newKpis = [...treemapKpis];
    newKpis[index] = { ...newKpis[index], [field]: value };
    updateElementProperties(element.id, { treemapKpis: newKpis });
  };

  const addKpi = () => {
    const newKpis = [...treemapKpis, { title: 'Metric', value: '1234', change: '12%' }];
    updateElementProperties(element.id, { treemapKpis: newKpis });
  };

  const removeKpi = (index: number) => {
    const newKpis = treemapKpis.filter((_, i) => i !== index);
    updateElementProperties(element.id, { treemapKpis: newKpis });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Add Ons</h3>
      
      {/* Buttons Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="showButtons" className="text-sm">Buttons</Label>
          <Switch
            id="showButtons"
            checked={showButtons}
            onCheckedChange={(checked) => {
              updateElementProperties(element.id, { 
                showButtons: checked,
                treemapButtons: checked && treemapButtons.length === 0 ? [
                  { title: 'Title 1', alignment: 'left' },
                  { title: 'Title 2', alignment: 'right' }
                ] : treemapButtons
              });
            }}
          />
        </div>
        
        {showButtons && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs">Alignment</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={addButton}
                className="flex items-center gap-1"
              >
                <Plus className="h-3 w-3" />
                Add Button
              </Button>
            </div>
            
            {treemapButtons.map((button, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={button.title}
                  onChange={(e) => updateButton(index, 'title', e.target.value)}
                  className="flex-1 h-8"
                  placeholder="Button title"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeButton(index)}
                  className="h-8 w-8 p-0"
                >
                  <Minus className="h-3 w-3" />
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
            onCheckedChange={(checked) => {
              updateElementProperties(element.id, { 
                showKpis: checked,
                treemapKpis: checked && treemapKpis.length === 0 ? [
                  { title: 'Metric 1', value: '1234', change: '12%' },
                  { title: 'Metric 2', value: '1234', change: '12%' }
                ] : treemapKpis
              });
            }}
          />
        </div>
        
        {showKpis && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs">KPI1</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={addKpi}
                className="flex items-center gap-1"
              >
                <Plus className="h-3 w-3" />
                Add KPI
              </Button>
            </div>
            
            {treemapKpis.map((kpi, index) => (
              <div key={index} className="p-2 border rounded space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs">KPI{index + 1}</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeKpi(index)}
                    className="h-6 w-6 p-0"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                </div>
                <Input
                  value={kpi.title}
                  onChange={(e) => updateKpi(index, 'title', e.target.value)}
                  className="h-8 text-xs"
                  placeholder="Title"
                />
                <Input
                  value={kpi.value}
                  onChange={(e) => updateKpi(index, 'value', e.target.value)}
                  className="h-8 text-xs"
                  placeholder="Measured Value"
                />
                <Input
                  value={kpi.change}
                  onChange={(e) => updateKpi(index, 'change', e.target.value)}
                  className="h-8 text-xs"
                  placeholder="Percentage Change"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
