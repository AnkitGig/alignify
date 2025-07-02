
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { X, Plus, Database, Upload } from "lucide-react";
import { toast } from "sonner";

interface FilterDataSectionProps {
  properties: any;
  updateElementProperties: (id: string, properties: any) => void;
  elementId: string;
}

export function FilterDataSection({ properties, updateElementProperties, elementId }: FilterDataSectionProps) {
  const [dataSource, setDataSource] = useState(properties.filterDataSource || 'manual');
  const [filterValues, setFilterValues] = useState<string[]>(properties.filterValues || ['All', 'Value 1', 'Value 2']);
  const [dataColumn, setDataColumn] = useState(properties.filterDataColumn || '');
  const [allowMultiSelect, setAllowMultiSelect] = useState(properties.allowMultiSelect || false);
  const [enableSearch, setEnableSearch] = useState(properties.enableSearch || false);
  
  const handleDataSourceChange = (value: string) => {
    setDataSource(value);
    updateElementProperties(elementId, { filterDataSource: value });
    
    if (value === 'csv' || value === 'json') {
      // Reset values when switching to data source
      setFilterValues(['Loading...']);
      updateElementProperties(elementId, { filterValues: ['Loading...'] });
    }
  };
  
  const handleFilterValueChange = (index: number, value: string) => {
    const newValues = [...filterValues];
    newValues[index] = value;
    setFilterValues(newValues);
    updateElementProperties(elementId, { filterValues: newValues });
  };
  
  const addFilterValue = () => {
    const newValues = [...filterValues, `Value ${filterValues.length}`];
    setFilterValues(newValues);
    updateElementProperties(elementId, { filterValues: newValues });
  };
  
  const removeFilterValue = (index: number) => {
    if (filterValues.length <= 1) {
      toast.error("Filter must have at least one value");
      return;
    }
    const newValues = filterValues.filter((_, i) => i !== index);
    setFilterValues(newValues);
    updateElementProperties(elementId, { filterValues: newValues });
  };
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        let extractedValues: string[] = [];
        
        if (file.name.endsWith('.csv')) {
          // Simple CSV parsing - get unique values from first column
          const lines = content.split('\n').filter(line => line.trim());
          const header = lines[0]?.split(',')[0] || 'Column1';
          extractedValues = [...new Set(lines.slice(1).map(line => line.split(',')[0]).filter(val => val.trim()))];
          setDataColumn(header);
        } else if (file.name.endsWith('.json')) {
          // Simple JSON parsing - get keys from first object
          const data = JSON.parse(content);
          if (Array.isArray(data) && data.length > 0) {
            extractedValues = Object.keys(data[0]);
          }
        }
        
        if (extractedValues.length > 0) {
          setFilterValues(['All', ...extractedValues.slice(0, 10)]); // Limit to 10 values
          updateElementProperties(elementId, { 
            filterValues: ['All', ...extractedValues.slice(0, 10)],
            filterDataColumn: dataColumn 
          });
          toast.success(`Loaded ${extractedValues.length} filter values from ${file.name}`);
        }
      } catch (error) {
        toast.error('Error parsing file. Please check the format.');
      }
    };
    reader.readAsText(file);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">Data Source</Label>
      </div>
      
      <Select value={dataSource} onValueChange={handleDataSourceChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select data source" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="manual">Manual Entry</SelectItem>
          <SelectItem value="csv">CSV File</SelectItem>
          <SelectItem value="json">JSON Data</SelectItem>
          <SelectItem value="database">Database Query</SelectItem>
        </SelectContent>
      </Select>
      
      {dataSource === 'manual' && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label>Filter Values</Label>
            <Button variant="outline" size="sm" onClick={addFilterValue}>
              <Plus className="h-4 w-4 mr-1" />
              Add Value
            </Button>
          </div>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {filterValues.map((value, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input 
                  value={value}
                  onChange={(e) => handleFilterValueChange(index, e.target.value)}
                  className="flex-1"
                  placeholder={`Filter value ${index + 1}`}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFilterValue(index)}
                  disabled={filterValues.length <= 1}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {(dataSource === 'csv' || dataSource === 'json') && (
        <div className="space-y-3">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
            <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
            <Label htmlFor="file-upload" className="cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-500">
              Upload {dataSource.toUpperCase()} file
            </Label>
            <input
              id="file-upload"
              type="file"
              accept={dataSource === 'csv' ? '.csv' : '.json'}
              onChange={handleFileUpload}
              className="hidden"
            />
            <p className="text-xs text-gray-500 mt-1">
              Upload a {dataSource.toUpperCase()} file to extract filter values
            </p>
          </div>
          
          {dataColumn && (
            <div className="space-y-2">
              <Label>Data Column</Label>
              <Input 
                value={dataColumn}
                onChange={(e) => {
                  setDataColumn(e.target.value);
                  updateElementProperties(elementId, { filterDataColumn: e.target.value });
                }}
                placeholder="Column name for filter values"
              />
            </div>
          )}
        </div>
      )}
      
      {dataSource === 'database' && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
            <Database className="h-5 w-5 text-blue-600" />
            <div className="text-sm">
              <div className="font-medium text-blue-900">Database Integration</div>
              <div className="text-blue-700">Connect to your database to fetch dynamic filter values</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>SQL Query</Label>
            <textarea 
              className="w-full p-2 border rounded-md text-sm font-mono"
              rows={3}
              placeholder="SELECT DISTINCT column_name FROM table_name ORDER BY column_name"
              value={properties.filterQuery || ''}
              onChange={(e) => updateElementProperties(elementId, { filterQuery: e.target.value })}
            />
            <p className="text-xs text-gray-500">
              Write a SQL query to fetch filter values dynamically
            </p>
          </div>
        </div>
      )}
      
      <div className="space-y-3 pt-3 border-t">
        <div className="flex items-center justify-between">
          <Label htmlFor="multi-select">Allow Multiple Selection</Label>
          <Switch
            id="multi-select"
            checked={allowMultiSelect}
            onCheckedChange={(checked) => {
              setAllowMultiSelect(checked);
              updateElementProperties(elementId, { allowMultiSelect: checked });
            }}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="enable-search">Enable Search</Label>
          <Switch
            id="enable-search"
            checked={enableSearch}
            onCheckedChange={(checked) => {
              setEnableSearch(checked);
              updateElementProperties(elementId, { enableSearch: checked });
            }}
          />
        </div>
        
        {enableSearch && (
          <div className="space-y-2">
            <Label>Search Placeholder</Label>
            <Input 
              value={properties.searchPlaceholder || 'Search filters...'}
              onChange={(e) => updateElementProperties(elementId, { searchPlaceholder: e.target.value })}
              placeholder="Enter search placeholder text"
            />
          </div>
        )}
      </div>
    </div>
  );
}
