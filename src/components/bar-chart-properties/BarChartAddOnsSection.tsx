
import React from 'react';
import { ChevronDown, ChevronRight, Plus, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BarChartAddOnsSectionProps {
  properties: any;
  handleChange: (field: string, value: any) => void;
  addOnsOpen: boolean;
  setAddOnsOpen: (open: boolean) => void;
}

export function BarChartAddOnsSection({ 
  properties, 
  handleChange, 
  addOnsOpen, 
  setAddOnsOpen 
}: BarChartAddOnsSectionProps) {
  const chartButtons = properties.chartButtons || [];
  const chartKpis = properties.chartKpis || [];

  const updateButton = (index: number, field: string, value: any) => {
    const newButtons = [...chartButtons];
    newButtons[index] = { ...newButtons[index], [field]: value };
    handleChange('chartButtons', newButtons);
  };

  const addButton = () => {
    const newButtons = [...chartButtons, { title: 'New Button', alignment: 'right' }];
    handleChange('chartButtons', newButtons);
  };

  const removeButton = (index: number) => {
    const newButtons = chartButtons.filter((_: any, i: number) => i !== index);
    handleChange('chartButtons', newButtons);
  };

  const updateKpi = (index: number, field: string, value: any) => {
    const newKpis = [...chartKpis];
    newKpis[index] = { ...newKpis[index], [field]: value };
    handleChange('chartKpis', newKpis);
  };

  const addKpi = () => {
    const newKpis = [...chartKpis, { title: 'New KPI', value: '0', change: '+0%' }];
    handleChange('chartKpis', newKpis);
  };

  const removeKpi = (index: number) => {
    const newKpis = chartKpis.filter((_: any, i: number) => i !== index);
    handleChange('chartKpis', newKpis);
  };

  return (
    <div className="pb-3">
      <button 
        className="flex items-center justify-between w-full text-left font-medium text-sm py-2"
        onClick={() => setAddOnsOpen(!addOnsOpen)}
      >
        <span>Add-ons</span>
        {addOnsOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      </button>
      
      {addOnsOpen && (
        <div className="space-y-4 mt-2">
          {/* Buttons Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-xs font-medium">Buttons</Label>
              <Switch
                checked={properties.showButtons === true}
                onCheckedChange={(checked) => handleChange('showButtons', checked)}
              />
            </div>
            
            {properties.showButtons && (
              <div className="space-y-2">
                {chartButtons.map((button: any, index: number) => (
                  <div key={index} className="border rounded p-2 space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs font-medium">Button {index + 1}</Label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeButton(index)}
                        className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={12} />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="text-xs">Title</Label>
                        <Input
                          value={button.title || ''}
                          onChange={(e) => updateButton(index, 'title', e.target.value)}
                          className="mt-1 h-7 text-xs"
                          placeholder="Button Text"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Alignment</Label>
                        <Select
                          value={button.alignment || 'right'}
                          onValueChange={(value) => updateButton(index, 'alignment', value)}
                        >
                          <SelectTrigger className="mt-1 h-7 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="left">Left</SelectItem>
                            <SelectItem value="center">Center</SelectItem>
                            <SelectItem value="right">Right</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addButton}
                  className="w-full h-7 text-xs"
                >
                  <Plus size={12} className="mr-1" />
                  Add Button
                </Button>
              </div>
            )}
          </div>

          {/* KPIs Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-xs font-medium">KPIs</Label>
              <Switch
                checked={properties.showKpis === true}
                onCheckedChange={(checked) => handleChange('showKpis', checked)}
              />
            </div>
            
            {properties.showKpis && (
              <div className="space-y-2">
                {chartKpis.map((kpi: any, index: number) => (
                  <div key={index} className="border rounded p-2 space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs font-medium">KPI {index + 1}</Label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeKpi(index)}
                        className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={12} />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-2">
                      <div>
                        <Label className="text-xs">Title</Label>
                        <Input
                          value={kpi.title || ''}
                          onChange={(e) => updateKpi(index, 'title', e.target.value)}
                          className="mt-1 h-7 text-xs"
                          placeholder="KPI Name"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label className="text-xs">Value</Label>
                          <Input
                            value={kpi.value || ''}
                            onChange={(e) => updateKpi(index, 'value', e.target.value)}
                            className="mt-1 h-7 text-xs"
                            placeholder="1,234"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Change</Label>
                          <Input
                            value={kpi.change || ''}
                            onChange={(e) => updateKpi(index, 'change', e.target.value)}
                            className="mt-1 h-7 text-xs"
                            placeholder="+12%"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addKpi}
                  className="w-full h-7 text-xs"
                >
                  <Plus size={12} className="mr-1" />
                  Add KPI
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
