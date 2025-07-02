
import React from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Plus, Minus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";

interface HeatmapAddOnsSectionProps {
  properties: any;
  handleChange: (field: string, value: any) => void;
  addOnsOpen: boolean;
  setAddOnsOpen: (open: boolean) => void;
}

export function HeatmapAddOnsSection({ 
  properties, 
  handleChange, 
  addOnsOpen, 
  setAddOnsOpen 
}: HeatmapAddOnsSectionProps) {
  const buttons = properties.heatmapButtons || [];
  const kpis = properties.heatmapKpis || [];

  const addButton = () => {
    const newButtons = [...buttons, { title: `Title ${buttons.length + 1}`, alignment: 'center' }];
    handleChange('heatmapButtons', newButtons);
  };

  const removeButton = (index: number) => {
    const newButtons = buttons.filter((_: any, i: number) => i !== index);
    handleChange('heatmapButtons', newButtons);
  };

  const updateButton = (index: number, field: string, value: string) => {
    const newButtons = [...buttons];
    newButtons[index] = { ...newButtons[index], [field]: value };
    handleChange('heatmapButtons', newButtons);
  };

  const addKpi = () => {
    const newKpis = [...kpis, { title: 'KPI1', value: '1234', change: '12%' }];
    handleChange('heatmapKpis', newKpis);
  };

  const removeKpi = (index: number) => {
    const newKpis = kpis.filter((_: any, i: number) => i !== index);
    handleChange('heatmapKpis', newKpis);
  };

  const updateKpi = (index: number, field: string, value: string) => {
    const newKpis = [...kpis];
    newKpis[index] = { ...newKpis[index], [field]: value };
    handleChange('heatmapKpis', newKpis);
  };

  return (
    <Collapsible open={addOnsOpen} onOpenChange={setAddOnsOpen}>
      <CollapsibleTrigger className="flex items-center justify-between w-full py-2 px-1 hover:bg-gray-50 rounded">
        <span className="font-medium">Add Ons</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${addOnsOpen ? 'rotate-180' : ''}`} />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-3 pt-2 pb-4">
        {/* Buttons Section */}
        <Collapsible>
          <CollapsibleTrigger className="flex items-center justify-between w-full py-1">
            <div className="flex items-center gap-2">
              <ChevronDown className="h-3 w-3" />
              <span className="text-sm">Buttons</span>
            </div>
            <Switch
              checked={properties.showButtons ?? false}
              onCheckedChange={(checked) => handleChange('showButtons', checked)}
            />
          </CollapsibleTrigger>
          {properties.showButtons && (
            <CollapsibleContent className="space-y-2 mt-2 ml-4">
              {buttons.map((button: any, index: number) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <Input
                    value={button.title}
                    onChange={(e) => updateButton(index, 'title', e.target.value)}
                    className="flex-1 h-8"
                    placeholder="Button title"
                  />
                  <button
                    onClick={() => removeButton(index)}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                </div>
              ))}
              <button
                onClick={addButton}
                className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 ml-4"
              >
                <Plus className="h-3 w-3" />
                Add Button
              </button>
            </CollapsibleContent>
          )}
        </Collapsible>

        {/* KPIs Section */}
        <Collapsible>
          <CollapsibleTrigger className="flex items-center justify-between w-full py-1">
            <div className="flex items-center gap-2">
              <ChevronDown className="h-3 w-3" />
              <span className="text-sm">KPIs</span>
            </div>
            <Switch
              checked={properties.showKpis ?? false}
              onCheckedChange={(checked) => handleChange('showKpis', checked)}
            />
          </CollapsibleTrigger>
          {properties.showKpis && (
            <CollapsibleContent className="space-y-2 mt-2 ml-4">
              {kpis.map((kpi: any, index: number) => (
                <div key={index} className="space-y-2 p-2 bg-gray-50 rounded">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium">KPI{index + 1}</span>
                    <button
                      onClick={() => removeKpi(index)}
                      className="p-1 hover:bg-gray-200 rounded ml-auto"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                  </div>
                  <Input
                    value={kpi.title}
                    onChange={(e) => updateKpi(index, 'title', e.target.value)}
                    placeholder="Title"
                    className="h-8"
                  />
                  <Input
                    value={kpi.value}
                    onChange={(e) => updateKpi(index, 'value', e.target.value)}
                    placeholder="Measured Value"
                    className="h-8"
                  />
                  <Input
                    value={kpi.change}
                    onChange={(e) => updateKpi(index, 'change', e.target.value)}
                    placeholder="Percentage Change"
                    className="h-8"
                  />
                </div>
              ))}
              <button
                onClick={addKpi}
                className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 ml-4"
              >
                <Plus className="h-3 w-3" />
                Add KPI
              </button>
            </CollapsibleContent>
          )}
        </Collapsible>
      </CollapsibleContent>
    </Collapsible>
  );
}
