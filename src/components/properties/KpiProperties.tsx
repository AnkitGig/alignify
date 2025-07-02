
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { X, Settings, ChevronDown } from "lucide-react";
import { Element } from "@/types/wireframe";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface KpiPropertiesProps {
  element: Element;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
  toggleProperties: () => void;
}

export function KpiProperties({ 
  element, 
  updateElementProperties, 
  toggleProperties
}: KpiPropertiesProps) {
  const properties = element.properties || {};
  const [backgroundColor, setBackgroundColor] = useState(properties.backgroundColor || '#ffffff');
  const [textColor, setTextColor] = useState(properties.textColor || '#000000');
  const [indicatorColor, setIndicatorColor] = useState(properties.indicatorColor || '#8B5CF6');
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-base font-medium">Edit KPI</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-6 w-6 p-0" 
          onClick={() => toggleProperties()}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="border-t pt-4">
        <div className="space-y-3">
          <h4 className="text-sm font-semibold flex justify-between items-center">
            Details
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <Settings className="h-3 w-3" />
            </Button>
          </h4>
          
          <div className="flex justify-between items-center">
            <Label htmlFor="kpi-title-toggle">Title</Label>
            <Switch 
              id="kpi-title-toggle" 
              checked={properties.showKpiTitle !== false} 
              onCheckedChange={(checked) => 
                updateElementProperties(element.id, { showKpiTitle: checked })
              } 
            />
          </div>
          
          {properties.showKpiTitle !== false && (
            <div className="space-y-2">
              <Label htmlFor="kpi-title">Edit Title</Label>
              <Input 
                id="kpi-title" 
                value={properties.kpiTitle || 'Metric Title'} 
                onChange={(e) => updateElementProperties(element.id, { kpiTitle: e.target.value })}
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="kpi-value">Value</Label>
            <Input 
              id="kpi-value" 
              value={properties.kpiValue || '25.2K'} 
              onChange={(e) => updateElementProperties(element.id, { kpiValue: e.target.value })}
            />
          </div>
          
          <div className="flex justify-between items-center">
            <Label htmlFor="kpi-previous-toggle">Previous Value</Label>
            <Switch 
              id="kpi-previous-toggle" 
              checked={properties.showPreviousValue !== false} 
              onCheckedChange={(checked) => 
                updateElementProperties(element.id, { showPreviousValue: checked })
              } 
            />
          </div>
          
          {properties.showPreviousValue !== false && (
            <div className="space-y-2">
              <Label htmlFor="kpi-previous-value">Previous Value</Label>
              <Input 
                id="kpi-previous-value" 
                value={properties.kpiPreviousValue || '11.6K'} 
                onChange={(e) => updateElementProperties(element.id, { kpiPreviousValue: e.target.value })}
              />
            </div>
          )}
          
          <div className="flex justify-between items-center">
            <Label htmlFor="kpi-change-toggle">Change Percentage</Label>
            <Switch 
              id="kpi-change-toggle" 
              checked={properties.showChangePercentage !== false} 
              onCheckedChange={(checked) => 
                updateElementProperties(element.id, { showChangePercentage: checked })
              } 
            />
          </div>
          
          {properties.showChangePercentage !== false && (
            <div className="space-y-2">
              <Label htmlFor="kpi-change-percentage">Change Percentage</Label>
              <Input 
                id="kpi-change-percentage" 
                value={properties.kpiChangePercentage || '+10%'} 
                onChange={(e) => updateElementProperties(element.id, { kpiChangePercentage: e.target.value })}
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label className="block mb-1">Alignment</Label>
            <ToggleGroup type="single" value={properties.kpiAlignment || 'left'} 
              onValueChange={(value) => {
                if (value) updateElementProperties(element.id, { kpiAlignment: value as 'left' | 'center' | 'right' });
              }}
              className="justify-start border rounded-md p-1"
            >
              <ToggleGroupItem value="left" aria-label="Align left">
                <AlignLeft className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="center" aria-label="Align center">
                <AlignCenter className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="right" aria-label="Align right">
                <AlignRight className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </div>
      
      <div className="border-t pt-4">
        <div className="space-y-3">
          <h4 className="text-sm font-semibold flex justify-between items-center">
            Properties
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <Settings className="h-3 w-3" />
            </Button>
          </h4>
          
          <div className="flex justify-between items-center">
            <Label htmlFor="bg-color">Background Color</Label>
            <div className="flex items-center">
              <input 
                type="color" 
                id="bg-color" 
                value={backgroundColor} 
                onChange={(e) => {
                  setBackgroundColor(e.target.value);
                  updateElementProperties(element.id, { backgroundColor: e.target.value });
                }}
                className="w-8 h-8 cursor-pointer p-0 border-none mr-2"
              />
              <Input 
                value={backgroundColor} 
                onChange={(e) => {
                  setBackgroundColor(e.target.value);
                  updateElementProperties(element.id, { backgroundColor: e.target.value });
                }}
                className="w-24"
              />
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <Label htmlFor="text-color">Text Color</Label>
            <div className="flex items-center">
              <input 
                type="color" 
                id="text-color" 
                value={textColor} 
                onChange={(e) => {
                  setTextColor(e.target.value);
                  updateElementProperties(element.id, { textColor: e.target.value });
                }}
                className="w-8 h-8 cursor-pointer p-0 border-none mr-2"
              />
              <Input 
                value={textColor} 
                onChange={(e) => {
                  setTextColor(e.target.value);
                  updateElementProperties(element.id, { textColor: e.target.value });
                }}
                className="w-24"
              />
            </div>
          </div>
          
          {(properties.kpiVariant === 'indicator' || properties.kpiVariant === 'area') && (
            <div className="flex justify-between items-center">
              <Label htmlFor="indicator-color">Indicator Color</Label>
              <div className="flex items-center">
                <input 
                  type="color" 
                  id="indicator-color" 
                  value={indicatorColor} 
                  onChange={(e) => {
                    setIndicatorColor(e.target.value);
                    updateElementProperties(element.id, { indicatorColor: e.target.value });
                  }}
                  className="w-8 h-8 cursor-pointer p-0 border-none mr-2"
                />
                <Input 
                  value={indicatorColor} 
                  onChange={(e) => {
                    setIndicatorColor(e.target.value);
                    updateElementProperties(element.id, { indicatorColor: e.target.value });
                  }}
                  className="w-24"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex flex-col space-y-2 mt-4 border-t pt-4">
        <Label className="text-sm font-semibold">KPI Style</Label>
        <div className="mt-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="w-full justify-between">
                {properties.kpiVariant === 'basic' && 'Basic KPI'}
                {properties.kpiVariant === 'area' && 'Area KPI'}
                {properties.kpiVariant === 'indicator' && 'Indicator KPI'}
                {properties.kpiVariant === 'comparison' && 'Comparison KPI'}
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0">
              <div className="p-4 space-y-2">
                <h4 className="font-medium">Available KPI types</h4>
                <RadioGroup 
                  value={properties.kpiVariant || 'basic'}
                  onValueChange={(value) => updateElementProperties(element.id, { kpiVariant: value as any })}
                  className="space-y-2"
                >
                  {[
                    { id: 'basic', name: 'Basic KPI' },
                    { id: 'area', name: 'Area KPI' },
                    { id: 'indicator', name: 'Indicator KPI' },
                    { id: 'comparison', name: 'Comparison KPI' },
                  ].map((type) => (
                    <div key={type.id} className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
                      <RadioGroupItem value={type.id} id={`kpi-type-${type.id}`} />
                      <Label htmlFor={`kpi-type-${type.id}`} className="cursor-pointer flex-1">
                        {type.name}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <p className="text-xs text-gray-500 mt-1">Double-click on the KPI to change styles</p>
      </div>
    </div>
  );
}
