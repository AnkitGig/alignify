
import React from 'react';
import { Element } from '@/types/wireframe';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Plus, GripVertical, Settings, MoreHorizontal } from 'lucide-react';

interface FunnelChartAddOnsSectionProps {
  properties: Element['properties'];
  updateProperties: (updates: Partial<Element['properties']>) => void;
}

export function FunnelChartAddOnsSection({ properties, updateProperties }: FunnelChartAddOnsSectionProps) {
  const {
    showButtons = false,
    showKpis = false,
    showDropdowns = false,
    showText = false,
    funnelButtons = [],
    funnelKpis = [],
    funnelDropdowns = [],
    funnelTexts = []
  } = properties || {};

  const addButton = () => {
    const newButtons = [...funnelButtons, { title: 'Title 1', alignment: 'left' }];
    updateProperties({ funnelButtons: newButtons });
  };

  const updateButton = (index: number, field: string, value: string) => {
    const newButtons = [...funnelButtons];
    newButtons[index] = { ...newButtons[index], [field]: value };
    updateProperties({ funnelButtons: newButtons });
  };

  const removeButton = (index: number) => {
    const newButtons = funnelButtons.filter((_, i) => i !== index);
    updateProperties({ funnelButtons: newButtons });
  };

  const addKpi = () => {
    const newKpis = [...funnelKpis, { title: 'Metric 1', value: '123', change: '12%' }];
    updateProperties({ funnelKpis: newKpis });
  };

  const updateKpi = (index: number, field: string, value: string) => {
    const newKpis = [...funnelKpis];
    newKpis[index] = { ...newKpis[index], [field]: value };
    updateProperties({ funnelKpis: newKpis });
  };

  const removeKpi = (index: number) => {
    const newKpis = funnelKpis.filter((_, i) => i !== index);
    updateProperties({ funnelKpis: newKpis });
  };

  const addDropdown = () => {
    const newDropdowns = [...funnelDropdowns, { title: 'Dropdown 1', values: ['Option 1', 'Option 2'], editText: 'Title 1' }];
    updateProperties({ funnelDropdowns: newDropdowns });
  };

  const updateDropdown = (index: number, field: string, value: any) => {
    const newDropdowns = [...funnelDropdowns];
    newDropdowns[index] = { ...newDropdowns[index], [field]: value };
    updateProperties({ funnelDropdowns: newDropdowns });
  };

  const removeDropdown = (index: number) => {
    const newDropdowns = funnelDropdowns.filter((_, i) => i !== index);
    updateProperties({ funnelDropdowns: newDropdowns });
  };

  const addText = () => {
    const newTexts = [...funnelTexts, { title: 'Text 1', content: 'Sample text' }];
    updateProperties({ funnelTexts: newTexts });
  };

  const updateText = (index: number, field: string, value: string) => {
    const newTexts = [...funnelTexts];
    newTexts[index] = { ...newTexts[index], [field]: value };
    updateProperties({ funnelTexts: newTexts });
  };

  const removeText = (index: number) => {
    const newTexts = funnelTexts.filter((_, i) => i !== index);
    updateProperties({ funnelTexts: newTexts });
  };

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-gray-700">Add Ons</h4>
      
      <div className="space-y-4">
        {/* Buttons Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Label className="text-sm">Buttons</Label>
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>
            <Switch
              checked={showButtons}
              onCheckedChange={(checked) => {
                updateProperties({ showButtons: checked });
                if (!checked) {
                  updateProperties({ funnelButtons: [] });
                }
              }}
            />
          </div>
          
          {showButtons && (
            <div className="space-y-2 pl-4">
              <div className="flex items-center justify-between">
                <Label className="text-xs text-gray-600">Alignment</Label>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" className="h-6 w-6 p-0 text-xs">≡</Button>
                  <Button variant="outline" size="sm" className="h-6 w-6 p-0 text-xs">≣</Button>
                  <Button variant="outline" size="sm" className="h-6 w-6 p-0 text-xs">≡</Button>
                </div>
              </div>
              
              {funnelButtons.map((button, index) => (
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
          )}
        </div>

        {/* Dropdowns Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm">Dropdowns</Label>
            <Switch
              checked={showDropdowns}
              onCheckedChange={(checked) => {
                updateProperties({ showDropdowns: checked });
                if (!checked) {
                  updateProperties({ funnelDropdowns: [] });
                }
              }}
            />
          </div>
          
          {showDropdowns && (
            <div className="space-y-2 pl-4">
              <div className="flex items-center justify-between">
                <Label className="text-xs text-gray-600">Alignment</Label>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" className="h-6 w-6 p-0 text-xs">≡</Button>
                  <Button variant="outline" size="sm" className="h-6 w-6 p-0 text-xs">≣</Button>
                  <Button variant="outline" size="sm" className="h-6 w-6 p-0 text-xs">≡</Button>
                </div>
              </div>
              
              <div className="space-y-2">
                {funnelDropdowns.map((dropdown, index) => (
                  <div key={index} className="space-y-2 p-2 bg-gray-50 rounded">
                    <div className="flex items-center gap-2">
                      <Select value={dropdown.title} onValueChange={(value) => updateDropdown(index, 'title', value)}>
                        <SelectTrigger className="h-7 text-xs flex-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Dropdown 1">Dropdown 1</SelectItem>
                          <SelectItem value="Dropdown 2">Dropdown 2</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                        <Settings className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeDropdown(index)}
                        className="h-6 w-6 p-0 text-red-500"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                    <Input
                      value={dropdown.editText}
                      onChange={(e) => updateDropdown(index, 'editText', e.target.value)}
                      placeholder="Edit Text"
                      className="h-7 text-xs"
                    />
                  </div>
                ))}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addDropdown}
                  className="w-full text-blue-600 border-blue-200 hover:bg-blue-50"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Dropdown
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* KPIs Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm">KPIs</Label>
            <Switch
              checked={showKpis}
              onCheckedChange={(checked) => {
                updateProperties({ showKpis: checked });
                if (!checked) {
                  updateProperties({ funnelKpis: [] });
                }
              }}
            />
          </div>

          {showKpis && (
            <div className="space-y-2 pl-4">
              {funnelKpis.map((kpi, index) => (
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

        {/* Text Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm">Text</Label>
            <Switch
              checked={showText}
              onCheckedChange={(checked) => {
                updateProperties({ showText: checked });
                if (!checked) {
                  updateProperties({ funnelTexts: [] });
                }
              }}
            />
          </div>

          {showText && (
            <div className="space-y-2 pl-4">
              {funnelTexts.map((text, index) => (
                <div key={index} className="space-y-2 p-2 bg-gray-50 rounded">
                  <div className="flex items-center gap-2">
                    <GripVertical className="h-4 w-4 text-gray-400" />
                    <Input
                      value={text.title}
                      onChange={(e) => updateText(index, 'title', e.target.value)}
                      className="text-sm flex-1"
                      placeholder="Text Title"
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeText(index)}
                      className="h-6 w-6 p-0 text-red-500"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  <Input
                    value={text.content}
                    onChange={(e) => updateText(index, 'content', e.target.value)}
                    placeholder="Text Content"
                    className="text-sm"
                  />
                </div>
              ))}
              
              <Button
                variant="outline"
                size="sm"
                onClick={addText}
                className="w-full text-blue-600 border-blue-200 hover:bg-blue-50"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Text
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
