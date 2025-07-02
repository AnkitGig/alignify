
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Trash2, Plus, GripVertical } from 'lucide-react';

interface WaterfallAdvancedAddOnsSectionProps {
  properties: any;
  elementId: string;
  updateElementProperties: (properties: any) => void;
}

export function WaterfallAdvancedAddOnsSection({ properties, elementId, updateElementProperties }: WaterfallAdvancedAddOnsSectionProps) {
  const waterfallButtons = properties.waterfallButtons || [];
  const waterfallKpis = properties.waterfallKpis || [];

  const handlePropertyChange = (key: string, value: any) => {
    console.log('WaterfallAdvancedAddOnsSection updating property:', key, value);
    updateElementProperties({ [key]: value });
  };

  const addButton = () => {
    const newButtons = [...waterfallButtons, { title: 'Title1', alignment: 'left' }];
    handlePropertyChange('waterfallButtons', newButtons);
    handlePropertyChange('showButtons', true);
  };

  const updateButton = (index: number, field: string, value: string) => {
    const newButtons = [...waterfallButtons];
    newButtons[index] = { ...newButtons[index], [field]: value };
    handlePropertyChange('waterfallButtons', newButtons);
  };

  const removeButton = (index: number) => {
    const newButtons = waterfallButtons.filter((_: any, i: number) => i !== index);
    handlePropertyChange('waterfallButtons', newButtons);
    handlePropertyChange('showButtons', newButtons.length > 0);
  };

  const addKpi = () => {
    const newKpis = [...waterfallKpis, { title: 'Metric', value: '123', change: '12%' }];
    handlePropertyChange('waterfallKpis', newKpis);
    handlePropertyChange('showKpis', true);
  };

  const updateKpi = (index: number, field: string, value: string) => {
    const newKpis = [...waterfallKpis];
    newKpis[index] = { ...newKpis[index], [field]: value };
    handlePropertyChange('waterfallKpis', newKpis);
  };

  const removeKpi = (index: number) => {
    const newKpis = waterfallKpis.filter((_: any, i: number) => i !== index);
    handlePropertyChange('waterfallKpis', newKpis);
    handlePropertyChange('showKpis', newKpis.length > 0);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-900">Add Ons</h3>
      
      <div className="space-y-4">
        {/* Buttons Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm">Buttons</Label>
            <Switch
              checked={properties.showButtons || waterfallButtons.length > 0}
              onCheckedChange={(checked) => {
                handlePropertyChange('showButtons', checked);
                if (!checked) {
                  handlePropertyChange('waterfallButtons', []);
                }
              }}
            />
          </div>
          
          {(properties.showButtons || waterfallButtons.length > 0) && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs text-gray-600">Alignment</Label>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" className="h-6 w-6 p-0 text-xs">
                    L
                  </Button>
                  <Button variant="outline" size="sm" className="h-6 w-6 p-0 text-xs">
                    C
                  </Button>
                  <Button variant="outline" size="sm" className="h-6 w-6 p-0 text-xs">
                    R
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                {waterfallButtons.map((button: any, index: number) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                    <GripVertical className="h-4 w-4 text-gray-400" />
                    <Input
                      value={button.title}
                      onChange={(e) => updateButton(index, 'title', e.target.value)}
                      className="text-sm flex-1"
                      placeholder="Button title"
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeButton(index)}
                      className="h-6 w-6 p-0 text-red-500"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addButton}
                  className="w-full text-blue-600 border-blue-200 hover:bg-blue-50"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Button
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* KPIs Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Label className="text-sm">KPIs</Label>
              <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
            </div>
            <Switch
              checked={properties.showKpis || waterfallKpis.length > 0}
              onCheckedChange={(checked) => {
                handlePropertyChange('showKpis', checked);
                if (!checked) {
                  handlePropertyChange('waterfallKpis', []);
                }
              }}
            />
          </div>

          {(properties.showKpis || waterfallKpis.length > 0) && (
            <div className="space-y-2">
              {waterfallKpis.map((kpi: any, index: number) => (
                <div key={index} className="space-y-2 p-2 bg-gray-50 rounded">
                  <div className="flex items-center gap-2">
                    <GripVertical className="h-4 w-4 text-gray-400" />
                    <Input
                      value={kpi.title}
                      onChange={(e) => updateKpi(index, 'title', e.target.value)}
                      className="text-sm flex-1"
                      placeholder="KPI Title"
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeKpi(index)}
                      className="h-6 w-6 p-0 text-red-500"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
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
              
              <Button
                variant="outline"
                size="sm"
                onClick={addKpi}
                className="w-full text-blue-600 border-blue-200 hover:bg-blue-50"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add KPI
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
