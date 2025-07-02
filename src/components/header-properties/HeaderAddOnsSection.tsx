
import React from 'react';
import { ChevronDown, Plus, Settings, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface HeaderAddOnsSectionProps {
  properties: any;
  handleChange: (field: string, value: any) => void;
  addOnsOpen: boolean;
  setAddOnsOpen: (open: boolean) => void;
}

export function HeaderAddOnsSection({ properties, handleChange, addOnsOpen, setAddOnsOpen }: HeaderAddOnsSectionProps) {
  const variant = properties.variant || 'default';
  
  // Show secondary logo for double-logo-purple variant
  const showSecondaryLogo = variant === 'double-logo-purple';
  
  // Show dropdowns for certain variants
  const showDropdowns = ['default', 'with-metrics', 'navigation-top'].includes(variant);
  
  // Show text customization for most variants
  const showTextCustomization = !['minimal'].includes(variant);
  
  // Show stylize options for advanced variants
  const showStylize = ['gradient', 'colorful-banner', 'dark-navigation'].includes(variant);

  const handleDropdownChange = (index: number, field: string, value: string) => {
    const dropdowns = properties.headerDropdowns || [{ title: 'Dropdown 1', values: [] }];
    const newDropdowns = [...dropdowns];
    newDropdowns[index] = { ...newDropdowns[index], [field]: value };
    handleChange('headerDropdowns', newDropdowns);
  };

  const addDropdownValue = (dropdownIndex: number, value: string) => {
    if (!value.trim()) return;
    
    const dropdowns = properties.headerDropdowns || [{ title: 'Dropdown 1', values: [] }];
    const newDropdowns = [...dropdowns];
    newDropdowns[dropdownIndex].values = [...(newDropdowns[dropdownIndex].values || []), value];
    handleChange('headerDropdowns', newDropdowns);
  };

  const removeDropdownValue = (dropdownIndex: number, valueIndex: number) => {
    const dropdowns = properties.headerDropdowns || [{ title: 'Dropdown 1', values: [] }];
    const newDropdowns = [...dropdowns];
    newDropdowns[dropdownIndex].values = newDropdowns[dropdownIndex].values.filter((_, i) => i !== valueIndex);
    handleChange('headerDropdowns', newDropdowns);
  };

  // Don't render if no add-ons are available for current variant
  if (!showSecondaryLogo && !showDropdowns && !showTextCustomization && !showStylize) {
    return null;
  }

  return (
    <>
      <div className="border-b pb-2 mb-2">
        <button
          onClick={() => setAddOnsOpen(!addOnsOpen)}
          className="flex items-center justify-between w-full text-left font-medium py-2"
        >
          <span>Add Ons</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${addOnsOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>
      
      {addOnsOpen && (
        <div className="space-y-4 mb-4">
          {showSecondaryLogo && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium">Secondary Logo</Label>
                <Switch
                  checked={properties.showSecondaryLogo !== false}
                  onCheckedChange={(checked) => handleChange('showSecondaryLogo', checked)}
                />
              </div>
              {properties.showSecondaryLogo !== false && (
                <Button className="w-full" variant="outline" size="sm">
                  Add Image
                </Button>
              )}
            </div>
          )}

          {showTextCustomization && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium">Text</Label>
                <Switch
                  checked={properties.showCustomText !== false}
                  onCheckedChange={(checked) => handleChange('showCustomText', checked)}
                />
              </div>
            </div>
          )}

          {showStylize && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium">Stylize</Label>
                <Switch
                  checked={properties.enableStylize !== false}
                  onCheckedChange={(checked) => handleChange('enableStylize', checked)}
                />
              </div>
              {properties.enableStylize !== false && (
                <Select
                  value={properties.stylizeOption || 'horizontal'}
                  onValueChange={(value) => handleChange('stylizeOption', value)}
                >
                  <SelectTrigger className="text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="horizontal">Horizontal</SelectItem>
                    <SelectItem value="vertical">Vertical</SelectItem>
                    <SelectItem value="centered">Centered</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          )}

          {showDropdowns && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium">Dropdowns</Label>
                <Switch
                  checked={properties.showDropdowns !== false}
                  onCheckedChange={(checked) => handleChange('showDropdowns', checked)}
                />
              </div>
              
              {properties.showDropdowns !== false && (
                <div className="space-y-3">
                  {(properties.headerDropdowns || [{ title: 'Dropdown 1', values: [] }]).map((dropdown: any, index: number) => (
                    <div key={index} className="border rounded-md p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <Input
                          value={dropdown.title}
                          onChange={(e) => handleDropdownChange(index, 'title', e.target.value)}
                          className="text-xs"
                          placeholder="Dropdown title"
                        />
                        <div className="flex items-center space-x-1 ml-2">
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Settings className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-xs text-gray-500">Edit Text</Label>
                        <Input
                          value={dropdown.editText || dropdown.title}
                          onChange={(e) => handleDropdownChange(index, 'editText', e.target.value)}
                          className="text-xs mt-1"
                          placeholder="Edit text"
                        />
                      </div>
                      
                      <div>
                        <Label className="text-xs text-gray-500">Add Values</Label>
                        <div className="flex items-center space-x-2 mt-1">
                          <Input
                            placeholder="Press Enter To Add..."
                            className="text-xs flex-1"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                const target = e.target as HTMLInputElement;
                                addDropdownValue(index, target.value);
                                target.value = '';
                              }
                            }}
                          />
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Settings className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mt-2">
                          {(dropdown.values || []).map((value: string, valueIndex: number) => (
                            <div key={valueIndex} className="flex items-center bg-gray-100 rounded px-2 py-1">
                              <span className="text-xs">{value}</span>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-4 w-4 p-0 ml-1"
                                onClick={() => removeDropdownValue(index, valueIndex)}
                              >
                                <Trash2 className="h-2 w-2" />
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
          )}
        </div>
      )}
    </>
  );
}
