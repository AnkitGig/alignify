
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
import { toast } from "sonner";
import { FilterDataSection } from './FilterDataSection';
import { FilterAdvancedSection } from './FilterAdvancedSection';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown as ChevronDownIcon, Database, Settings2 } from "lucide-react";

interface FilterPropertiesProps {
  element: Element;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
  toggleProperties: () => void;
}

export function FilterProperties({ 
  element, 
  updateElementProperties, 
  toggleProperties
}: FilterPropertiesProps) {
  const properties = element.properties || {};
  const [backgroundColor, setBackgroundColor] = useState(properties.backgroundColor || '#ffffff');
  const [textColor, setTextColor] = useState(properties.textColor || '#000000');
  const [filterValues, setFilterValues] = useState<string[]>(properties.filterValues || ['All', 'Value 1', 'Value 2']);
  const [dataOpen, setDataOpen] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  
  const currentVariant = properties.filterVariant || 'dropdown';
  
  const handleFilterValueChange = (index: number, value: string) => {
    const newValues = [...filterValues];
    newValues[index] = value;
    setFilterValues(newValues);
    updateElementProperties(element.id, { filterValues: newValues });
  };
  
  const addFilterValue = () => {
    const newValues = [...filterValues, `Value ${filterValues.length}`];
    setFilterValues(newValues);
    updateElementProperties(element.id, { filterValues: newValues });
  };
  
  const removeFilterValue = (index: number) => {
    if (filterValues.length <= 1) {
      toast.error("Filter must have at least one value");
      return;
    }
    const newValues = filterValues.filter((_, i) => i !== index);
    setFilterValues(newValues);
    updateElementProperties(element.id, { filterValues: newValues });
  };
  
  const getVariantSpecificProperties = () => {
    switch (currentVariant) {
      case 'dropdown':
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="multi-select">Allow Multiple Selection</Label>
              <Switch
                id="multi-select"
                checked={properties.allowMultiSelect || false}
                onCheckedChange={(checked) => updateElementProperties(element.id, { allowMultiSelect: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="enable-search">Enable Search in Dropdown</Label>
              <Switch
                id="enable-search"
                checked={properties.enableSearch || false}
                onCheckedChange={(checked) => updateElementProperties(element.id, { enableSearch: checked })}
              />
            </div>
          </div>
        );
        
      case 'checkbox':
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="enable-search">Enable Search</Label>
              <Switch
                id="enable-search"
                checked={properties.enableSearch || false}
                onCheckedChange={(checked) => updateElementProperties(element.id, { enableSearch: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="show-select-all">Show Select All Option</Label>
              <Switch
                id="show-select-all"
                checked={properties.showSelectAll || false}
                onCheckedChange={(checked) => updateElementProperties(element.id, { showSelectAll: checked })}
              />
            </div>
          </div>
        );
        
      case 'radio':
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="enable-search">Enable Search</Label>
              <Switch
                id="enable-search"
                checked={properties.enableSearch || false}
                onCheckedChange={(checked) => updateElementProperties(element.id, { enableSearch: checked })}
              />
            </div>
          </div>
        );
        
      case 'search':
        return (
          <div className="space-y-3">
            <div className="space-y-2">
              <Label>Search Placeholder</Label>
              <Input 
                value={properties.searchPlaceholder || 'Search...'}
                onChange={(e) => updateElementProperties(element.id, { searchPlaceholder: e.target.value })}
                placeholder="Enter search placeholder text"
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="show-suggestions">Show Search Suggestions</Label>
              <Switch
                id="show-suggestions"
                checked={properties.showSuggestions || false}
                onCheckedChange={(checked) => updateElementProperties(element.id, { showSuggestions: checked })}
              />
            </div>
          </div>
        );
        
      case 'date':
        return (
          <div className="space-y-3">
            <div className="space-y-2">
              <Label>Date Format</Label>
              <Input 
                value={properties.dateFormat || 'DD/MM/YYYY'}
                onChange={(e) => updateElementProperties(element.id, { dateFormat: e.target.value })}
                placeholder="DD/MM/YYYY"
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="show-calendar">Show Calendar Icon</Label>
              <Switch
                id="show-calendar"
                checked={properties.showCalendarIcon !== false}
                onCheckedChange={(checked) => updateElementProperties(element.id, { showCalendarIcon: checked })}
              />
            </div>
          </div>
        );
        
      case 'daterange':
        return (
          <div className="space-y-3">
            <div className="space-y-2">
              <Label>Date Format</Label>
              <Input 
                value={properties.dateFormat || 'DD/MM/YYYY'}
                onChange={(e) => updateElementProperties(element.id, { dateFormat: e.target.value })}
                placeholder="DD/MM/YYYY"
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="show-calendar">Show Calendar Icons</Label>
              <Switch
                id="show-calendar"
                checked={properties.showCalendarIcon !== false}
                onCheckedChange={(checked) => updateElementProperties(element.id, { showCalendarIcon: checked })}
              />
            </div>
          </div>
        );
        
      case 'slider':
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label>Min Value</Label>
                <Input 
                  type="number"
                  value={properties.sliderMin || 0}
                  onChange={(e) => updateElementProperties(element.id, { sliderMin: parseInt(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label>Max Value</Label>
                <Input 
                  type="number"
                  value={properties.sliderMax || 100}
                  onChange={(e) => updateElementProperties(element.id, { sliderMax: parseInt(e.target.value) })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Step Size</Label>
              <Input 
                type="number"
                value={properties.sliderStep || 1}
                onChange={(e) => updateElementProperties(element.id, { sliderStep: parseInt(e.target.value) })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="show-values">Show Values</Label>
              <Switch
                id="show-values"
                checked={properties.showSliderValues !== false}
                onCheckedChange={(checked) => updateElementProperties(element.id, { showSliderValues: checked })}
              />
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  const shouldShowFilterValues = () => {
    return ['dropdown', 'checkbox', 'radio'].includes(currentVariant);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-base font-medium">Edit filter</h3>
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
          
          <div className="space-y-2">
            <Label htmlFor="filter-title">Title</Label>
            <Input 
              id="filter-title" 
              value={properties.filterTitle || 'Filter'} 
              onChange={(e) => updateElementProperties(element.id, { filterTitle: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label className="block mb-1">Title Position</Label>
            <ToggleGroup type="single" value={properties.filterAlignment || 'left'} 
              onValueChange={(value) => {
                if (value) updateElementProperties(element.id, { filterAlignment: value as 'left' | 'center' | 'right' });
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
      
      <div className="flex flex-col space-y-2 border-t pt-4">
        <Label className="text-sm font-semibold">Filter Style</Label>
        <div className="mt-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="w-full justify-between">
                {properties.filterVariant === 'dropdown' && 'Dropdown Menu'}
                {properties.filterVariant === 'checkbox' && 'Checkbox Filter'}
                {properties.filterVariant === 'radio' && 'Radio Filter'}
                {properties.filterVariant === 'date' && 'Date Picker'}
                {properties.filterVariant === 'daterange' && 'Date Range'}
                {properties.filterVariant === 'slider' && 'Slider Filter'}
                {properties.filterVariant === 'search' && 'Search Box'}
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0">
              <div className="p-4 space-y-2">
                <h4 className="font-medium">Available filter types</h4>
                <div className="space-y-1">
                  {[
                    { id: 'dropdown', name: 'Dropdown Menu' },
                    { id: 'checkbox', name: 'Checkbox Filter' },
                    { id: 'radio', name: 'Radio Filter' },
                    { id: 'date', name: 'Date Picker' },
                    { id: 'daterange', name: 'Date Range' },
                    { id: 'slider', name: 'Slider Filter' },
                    { id: 'search', name: 'Search Box' },
                  ].map((type) => (
                    <div 
                      key={type.id}
                      onClick={() => updateElementProperties(element.id, { filterVariant: type.id as any })}
                      className={`p-2 rounded-md cursor-pointer hover:bg-gray-100 ${
                        properties.filterVariant === type.id ? 'bg-blue-50 text-blue-600 font-medium' : ''
                      }`}
                    >
                      {type.name}
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      {/* Variant-specific properties */}
      {getVariantSpecificProperties() && (
        <div className="border-t pt-4">
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Template Properties</h4>
            {getVariantSpecificProperties()}
          </div>
        </div>
      )}
      
      {shouldShowFilterValues() && (
        <Collapsible open={dataOpen} onOpenChange={setDataOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-3 h-auto">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4" />
                <span className="font-medium">Data Customization</span>
              </div>
              <ChevronDownIcon className={`h-4 w-4 transition-transform ${dataOpen ? 'rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 pt-2">
            <FilterDataSection 
              properties={properties}
              updateElementProperties={updateElementProperties}
              elementId={element.id}
            />
          </CollapsibleContent>
        </Collapsible>
      )}
      
      <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between p-3 h-auto">
            <div className="flex items-center gap-2">
              <Settings2 className="h-4 w-4" />
              <span className="font-medium">Advanced Options</span>
            </div>
            <ChevronDownIcon className={`h-4 w-4 transition-transform ${advancedOpen ? 'rotate-180' : ''}`} />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 pt-2">
          <FilterAdvancedSection 
            properties={properties}
            updateElementProperties={updateElementProperties}
            elementId={element.id}
          />
        </CollapsibleContent>
      </Collapsible>
      
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
        </div>
      </div>
    </div>
  );
}
