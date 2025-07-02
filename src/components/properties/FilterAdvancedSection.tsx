
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Settings2, Code, Zap } from "lucide-react";

interface FilterAdvancedSectionProps {
  properties: any;
  updateElementProperties: (id: string, properties: any) => void;
  elementId: string;
}

export function FilterAdvancedSection({ properties, updateElementProperties, elementId }: FilterAdvancedSectionProps) {
  const [enableDependentFilters, setEnableDependentFilters] = useState(properties.enableDependentFilters || false);
  const [enableCustomLogic, setEnableCustomLogic] = useState(properties.enableCustomLogic || false);
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-3">
        <Settings2 className="h-4 w-4" />
        <Label className="text-sm font-medium">Advanced Customization</Label>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="dependent-filters">Dependent Filters</Label>
          <Switch
            id="dependent-filters"
            checked={enableDependentFilters}
            onCheckedChange={(checked) => {
              setEnableDependentFilters(checked);
              updateElementProperties(elementId, { enableDependentFilters: checked });
            }}
          />
        </div>
        
        {enableDependentFilters && (
          <div className="space-y-3 p-3 bg-gray-50 rounded-lg">
            <Label>Parent Filter</Label>
            <Select 
              value={properties.parentFilterId || ''} 
              onValueChange={(value) => updateElementProperties(elementId, { parentFilterId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select parent filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="filter1">Category Filter</SelectItem>
                <SelectItem value="filter2">Region Filter</SelectItem>
                <SelectItem value="filter3">Date Filter</SelectItem>
              </SelectContent>
            </Select>
            
            <Label>Dependency Rule</Label>
            <Textarea 
              placeholder="e.g., When Category = 'Electronics', show only related brands"
              value={properties.dependencyRule || ''}
              onChange={(e) => updateElementProperties(elementId, { dependencyRule: e.target.value })}
              rows={2}
            />
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <Label htmlFor="custom-logic">Custom Filter Logic</Label>
          <Switch
            id="custom-logic"
            checked={enableCustomLogic}
            onCheckedChange={(checked) => {
              setEnableCustomLogic(checked);
              updateElementProperties(elementId, { enableCustomLogic: checked });
            }}
          />
        </div>
        
        {enableCustomLogic && (
          <div className="space-y-3 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              <Label>Custom JavaScript Logic</Label>
            </div>
            <Textarea 
              placeholder="// Custom filter logic&#10;function customFilter(data, selectedValues) {&#10;  return data.filter(item => {&#10;    // Your custom logic here&#10;    return selectedValues.includes(item.category);&#10;  });&#10;}"
              value={properties.customFilterLogic || ''}
              onChange={(e) => updateElementProperties(elementId, { customFilterLogic: e.target.value })}
              rows={6}
              className="font-mono text-sm"
            />
            <p className="text-xs text-gray-500">
              Write custom JavaScript to handle complex filtering scenarios
            </p>
          </div>
        )}
        
        <div className="space-y-3">
          <Label>Filter Performance</Label>
          <Select 
            value={properties.filterPerformance || 'standard'} 
            onValueChange={(value) => updateElementProperties(elementId, { filterPerformance: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select performance mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="debounced">Debounced (300ms)</SelectItem>
              <SelectItem value="lazy">Lazy Loading</SelectItem>
              <SelectItem value="virtual">Virtual Scrolling</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-3">
          <Label>Auto-refresh Data</Label>
          <div className="flex items-center gap-2">
            <Switch
              checked={properties.autoRefresh || false}
              onCheckedChange={(checked) => updateElementProperties(elementId, { autoRefresh: checked })}
            />
            <Input 
              type="number"
              placeholder="Interval (seconds)"
              value={properties.refreshInterval || 30}
              onChange={(e) => updateElementProperties(elementId, { refreshInterval: parseInt(e.target.value) })}
              className="w-32"
              disabled={!properties.autoRefresh}
            />
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            <Label>Filter Actions</Label>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm">Show Apply Button</Label>
              <Switch
                checked={properties.showApplyButton || false}
                onCheckedChange={(checked) => updateElementProperties(elementId, { showApplyButton: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-sm">Show Clear All</Label>
              <Switch
                checked={properties.showClearAll || false}
                onCheckedChange={(checked) => updateElementProperties(elementId, { showClearAll: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-sm">Show Filter Count</Label>
              <Switch
                checked={properties.showFilterCount || false}
                onCheckedChange={(checked) => updateElementProperties(elementId, { showFilterCount: checked })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
