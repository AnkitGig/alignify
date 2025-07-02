
import React, { useState } from 'react';
import { Element } from '@/types/wireframe';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Edit } from 'lucide-react';

interface ComboChartAddOnsSectionProps {
  element: Element;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
}

export function ComboChartAddOnsSection({ element, updateElementProperties }: ComboChartAddOnsSectionProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [editingKpi, setEditingKpi] = useState<number | null>(null);
  const [tempValue, setTempValue] = useState('');
  const [editingButton, setEditingButton] = useState<number | null>(null);
  const [tempButtonTitle, setTempButtonTitle] = useState('');

  const chartKpis = element.properties?.chartKpis || [
    { title: 'Total Sales', value: '$245K', change: '+12%' },
    { title: 'Growth Rate', value: '8.5%', change: '+2.1%' }
  ];

  const chartButtons = element.properties?.chartButtons || [
    { title: 'Export', alignment: 'left' },
    { title: 'Filter', alignment: 'right' }
  ];

  const handleKpiEdit = (index: number, currentValue: string) => {
    setEditingKpi(index);
    setTempValue(currentValue);
  };

  const handleKpiSave = (index: number) => {
    const updatedKpis = [...chartKpis];
    updatedKpis[index] = { ...updatedKpis[index], value: tempValue };
    updateElementProperties(element.id, { chartKpis: updatedKpis });
    setEditingKpi(null);
    setTempValue('');
  };

  const handleKpiCancel = () => {
    setEditingKpi(null);
    setTempValue('');
  };

  const handleKpiKeyPress = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter') {
      handleKpiSave(index);
    } else if (e.key === 'Escape') {
      handleKpiCancel();
    }
  };

  const handleButtonEdit = (index: number, currentTitle: string) => {
    setEditingButton(index);
    setTempButtonTitle(currentTitle);
  };

  const handleButtonSave = (index: number) => {
    const updatedButtons = [...chartButtons];
    updatedButtons[index] = { ...updatedButtons[index], title: tempButtonTitle };
    updateElementProperties(element.id, { chartButtons: updatedButtons });
    setEditingButton(null);
    setTempButtonTitle('');
  };

  const handleButtonCancel = () => {
    setEditingButton(null);
    setTempButtonTitle('');
  };

  const handleButtonKeyPress = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter') {
      handleButtonSave(index);
    } else if (e.key === 'Escape') {
      handleButtonCancel();
    }
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex items-center justify-between w-full p-2 text-sm font-medium bg-gray-50 hover:bg-gray-100 rounded">
        Add-ons
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-3 p-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="showButtons">Buttons</Label>
          <Switch
            id="showButtons"
            checked={element.properties?.showButtons ?? false}
            onCheckedChange={(checked) => updateElementProperties(element.id, { showButtons: checked })}
          />
        </div>

        {element.properties?.showButtons && (
          <div className="space-y-3 mt-4">
            <Label className="text-sm font-medium">Edit Button Titles</Label>
            {chartButtons.map((button, index) => (
              <div key={index} className="p-3 border rounded-lg bg-white">
                <div className="text-sm text-gray-600 mb-2">Button {index + 1}</div>
                <div className="flex items-center gap-2">
                  {editingButton === index ? (
                    <div className="flex items-center gap-2">
                      <Input
                        value={tempButtonTitle}
                        onChange={(e) => setTempButtonTitle(e.target.value)}
                        onKeyDown={(e) => handleButtonKeyPress(e, index)}
                        className="h-8 w-24"
                        autoFocus
                      />
                      <Button 
                        size="sm" 
                        onClick={() => handleButtonSave(index)}
                        className="h-8"
                      >
                        Save
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={handleButtonCancel}
                        className="h-8"
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{button.title}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleButtonEdit(index, button.title)}
                        className="h-6 w-6 p-0"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                  <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700">
                    {button.alignment}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <Label htmlFor="showKpis">KPIs</Label>
          <Switch
            id="showKpis"
            checked={element.properties?.showKpis ?? false}
            onCheckedChange={(checked) => updateElementProperties(element.id, { showKpis: checked })}
          />
        </div>

        {element.properties?.showKpis && (
          <div className="space-y-3 mt-4">
            <Label className="text-sm font-medium">Edit KPI Values</Label>
            {chartKpis.map((kpi, index) => (
              <div key={index} className="p-3 border rounded-lg bg-white">
                <div className="text-sm text-gray-600 mb-2">{kpi.title}</div>
                <div className="flex items-center gap-2">
                  {editingKpi === index ? (
                    <div className="flex items-center gap-2">
                      <Input
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        onKeyDown={(e) => handleKpiKeyPress(e, index)}
                        className="h-8 w-24"
                        autoFocus
                      />
                      <Button 
                        size="sm" 
                        onClick={() => handleKpiSave(index)}
                        className="h-8"
                      >
                        Save
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={handleKpiCancel}
                        className="h-8"
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{kpi.value}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleKpiEdit(index, kpi.value)}
                        className="h-6 w-6 p-0"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                  {kpi.change && (
                    <span className={`text-xs px-2 py-1 rounded ${
                      kpi.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {kpi.change}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}
