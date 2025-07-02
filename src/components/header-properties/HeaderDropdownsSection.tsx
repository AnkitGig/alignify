import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronDown, ChevronUp, Plus, Settings, Trash2, X, Info } from 'lucide-react';

interface HeaderDropdownsSectionProps {
  showDropdowns: boolean;
  dropdowns: Array<{title: string, values: string[], editText?: string}>;
  onDropdownsToggle: (checked: boolean) => void;
  onDropdownChange: (index: number, field: string, value: string) => void;
  onAddDropdownValue: (dropdownIndex: number, value: string) => void;
  onRemoveDropdownValue: (dropdownIndex: number, valueIndex: number) => void;
  onAddDropdown: () => void;
  onRemoveDropdown: (index: number) => void;
}

export function HeaderDropdownsSection({
  showDropdowns,
  dropdowns,
  onDropdownsToggle,
  onDropdownChange,
  onAddDropdownValue,
  onRemoveDropdownValue,
  onAddDropdown,
  onRemoveDropdown
}: HeaderDropdownsSectionProps) {
  const [showDropdownOptions, setShowDropdownOptions] = useState(false);
  const [newValueInput, setNewValueInput] = useState<{[key: number]: string}>({});

  const handleAddValue = (dropdownIndex: number) => {
    const value = newValueInput[dropdownIndex];
    if (value && value.trim()) {
      onAddDropdownValue(dropdownIndex, value.trim());
      setNewValueInput(prev => ({ ...prev, [dropdownIndex]: '' }));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, dropdownIndex: number) => {
    if (e.key === 'Enter') {
      handleAddValue(dropdownIndex);
    }
  };

  return (
    <>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="font-medium text-sm">Dropdowns</div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowDropdownOptions(!showDropdownOptions)}
            className="h-7 w-7 p-0"
          >
            {showDropdownOptions ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="show-dropdowns" className="text-sm">Show dropdowns</Label>
          <Switch 
            id="show-dropdowns"
            checked={showDropdowns} 
            onCheckedChange={onDropdownsToggle}
          />
        </div>
        
        {showDropdownOptions && showDropdowns && (
          <div className="space-y-3 pt-2">
            {dropdowns.map((dropdown, index) => (
              <div key={index} className="border rounded-md p-3 space-y-3">
                <div className="flex items-center justify-between">
                  <Select value={`Dropdown ${index + 1}`} onValueChange={() => {}}>
                    <SelectTrigger className="flex-1 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={`Dropdown ${index + 1}`}>Dropdown {index + 1}</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex items-center space-x-1 ml-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 w-6 p-0"
                      onClick={onAddDropdown}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Settings className="h-3 w-3" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 w-6 p-0"
                      onClick={() => onRemoveDropdown(index)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                
                <div>
                  <Label className="text-xs text-gray-500 mb-1 block">Edit Text</Label>
                  <Input
                    value={dropdown.editText || dropdown.title}
                    onChange={(e) => onDropdownChange(index, 'editText', e.target.value)}
                    className="text-sm"
                    placeholder="Title 1"
                  />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-xs text-gray-500">Add Values</Label>
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                        <Info className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                        <Settings className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Input
                      value={newValueInput[index] || ''}
                      onChange={(e) => setNewValueInput(prev => ({ ...prev, [index]: e.target.value }))}
                      placeholder="Press Enter To Add..."
                      className="text-sm flex-1"
                      onKeyPress={(e) => handleKeyPress(e, index)}
                    />
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 w-6 p-0"
                      onClick={() => handleAddValue(index)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Settings className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-2">
                    {(dropdown.values || []).map((value: string, valueIndex: number) => (
                      <div key={valueIndex} className="flex items-center bg-blue-100 text-blue-800 rounded px-2 py-1">
                        <span className="text-xs">{value}</span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-4 w-4 p-0 ml-1 hover:bg-blue-200"
                          onClick={() => onRemoveDropdownValue(index, valueIndex)}
                        >
                          <X className="h-2 w-2" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Separator />
    </>
  );
}
