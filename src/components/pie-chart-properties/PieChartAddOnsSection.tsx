
import React from 'react';
import { ChevronDown, Plus, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PieChartAddOnsSectionProps {
  properties: any;
  handleChange: (field: string, value: any) => void;
  addOnsOpen: boolean;
  setAddOnsOpen: (open: boolean) => void;
}

export function PieChartAddOnsSection({ properties, handleChange, addOnsOpen, setAddOnsOpen }: PieChartAddOnsSectionProps) {
  const pieChartVariant = properties.pieChartVariant || 'default';
  const showButtonsSection = pieChartVariant === 'with-buttons';
  const showKpisSection = pieChartVariant === 'with-kpis';
  
  const buttons = properties.pieChartButtons || [];
  const kpis = properties.pieChartKpis || [];

  const updateButton = (index: number, field: string, value: any) => {
    const newButtons = [...buttons];
    newButtons[index] = { ...newButtons[index], [field]: value };
    handleChange('pieChartButtons', newButtons);
  };

  const addButton = () => {
    const newButtons = [...buttons, { title: 'New Button', alignment: 'left' }];
    handleChange('pieChartButtons', newButtons);
  };

  const removeButton = (index: number) => {
    const newButtons = buttons.filter((_: any, i: number) => i !== index);
    handleChange('pieChartButtons', newButtons);
  };

  const updateKpi = (index: number, field: string, value: any) => {
    const newKpis = [...kpis];
    newKpis[index] = { ...newKpis[index], [field]: value };
    handleChange('pieChartKpis', newKpis);
  };

  const addKpi = () => {
    const newKpis = [...kpis, { title: 'New Metric', value: '0', change: '0%' }];
    handleChange('pieChartKpis', newKpis);
  };

  const removeKpi = (index: number) => {
    const newKpis = kpis.filter((_: any, i: number) => i !== index);
    handleChange('pieChartKpis', newKpis);
  };

  // Don't render if no add-ons are available for current variant
  if (!showButtonsSection && !showKpisSection) {
    return null;
  }

  return (
    <>
      <div className="border-b pb-2 mb-2">
        <button
          onClick={() => setAddOnsOpen(!addOnsOpen)}
          className="flex items-center justify-between w-full text-left font-medium py-2"
        >
          <span>Add-ons</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${addOnsOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>
      
      {addOnsOpen && (
        <div className="space-y-4 mb-4">
          {showButtonsSection && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium">Buttons</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addButton}
                  className="h-6 text-xs"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              
              <div className="space-y-2">
                {buttons.map((button: any, index: number) => (
                  <div key={index} className="border rounded p-2">
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-xs">Button {index + 1}</Label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeButton(index)}
                        className="h-5 w-5 p-0 text-red-500"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <Input
                        value={button.title}
                        onChange={(e) => updateButton(index, 'title', e.target.value)}
                        placeholder="Button title"
                        className="text-xs h-6"
                      />
                      
                      <Select
                        value={button.alignment}
                        onValueChange={(value) => updateButton(index, 'alignment', value)}
                      >
                        <SelectTrigger className="text-xs h-6">
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
                ))}
              </div>
            </div>
          )}
          
          {showKpisSection && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium">KPIs</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addKpi}
                  className="h-6 text-xs"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              
              <div className="space-y-2">
                {kpis.map((kpi: any, index: number) => (
                  <div key={index} className="border rounded p-2">
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-xs">KPI {index + 1}</Label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeKpi(index)}
                        className="h-5 w-5 p-0 text-red-500"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <Input
                        value={kpi.title}
                        onChange={(e) => updateKpi(index, 'title', e.target.value)}
                        placeholder="Metric title"
                        className="text-xs h-6"
                      />
                      
                      <Input
                        value={kpi.value}
                        onChange={(e) => updateKpi(index, 'value', e.target.value)}
                        placeholder="Value"
                        className="text-xs h-6"
                      />
                      
                      <Input
                        value={kpi.change}
                        onChange={(e) => updateKpi(index, 'change', e.target.value)}
                        placeholder="Change (%)"
                        className="text-xs h-6"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
