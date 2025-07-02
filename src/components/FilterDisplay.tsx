import { useWireframe, Element, FilterVariant } from "@/hooks/useWireframe";
import { Check, ChevronDown, Search, Sliders, X } from "lucide-react";
import { useState } from "react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FilterDisplayProps {
  element: Element;
}

export function FilterDisplay({ element }: FilterDisplayProps) {
  const properties = element.properties || {};
  const variant = properties.filterVariant || 'dropdown';
  const title = properties.filterTitle || 'Filter';
  const values = properties.filterValues || ['All', 'Value 1', 'Value 2'];
  const alignment = properties.filterAlignment || 'left';
  const enableSearch = properties.enableSearch || false;
  const allowMultiSelect = properties.allowMultiSelect || false;
  const showApplyButton = properties.showApplyButton || false;
  const showClearAll = properties.showClearAll || false;
  const showFilterCount = properties.showFilterCount || false;
  const searchPlaceholder = properties.searchPlaceholder || 'Search filters...';
  
  const [selectedValues, setSelectedValues] = useState<string[]>([values[0] || 'All']);
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredValues = values.filter(value => 
    value.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getTextAlignClass = () => {
    switch (alignment) {
      case 'left': return 'text-left';
      case 'center': return 'text-center';
      case 'right': return 'text-right';
      default: return 'text-left';
    }
  };
  
  const handleValueToggle = (value: string) => {
    if (allowMultiSelect) {
      setSelectedValues(prev => 
        prev.includes(value) 
          ? prev.filter(v => v !== value)
          : [...prev, value]
      );
    } else {
      setSelectedValues([value]);
    }
  };
  
  const handleClearAll = () => {
    setSelectedValues([]);
    setSearchTerm('');
  };
  
  const renderFilterActions = () => {
    if (!showApplyButton && !showClearAll && !showFilterCount) return null;
    
    return (
      <div className="flex items-center justify-between mt-2 pt-2 border-t">
        <div className="flex items-center gap-2">
          {showFilterCount && (
            <span className="text-xs text-gray-500">
              {selectedValues.length} selected
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {showClearAll && (
            <Button variant="ghost" size="sm" onClick={handleClearAll}>
              Clear All
            </Button>
          )}
          {showApplyButton && (
            <Button variant="default" size="sm">
              Apply
            </Button>
          )}
        </div>
      </div>
    );
  };
  
  const renderSearchInput = () => {
    if (!enableSearch) return null;
    
    return (
      <div className="mb-2">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
          <Input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-7 h-7 text-xs"
          />
        </div>
      </div>
    );
  };
  
  const renderFilter = () => {
    switch (variant) {
      case 'dropdown':
        return (
          <div className="w-full">
            {title && <div className={`text-sm font-medium mb-1 ${getTextAlignClass()}`}>{title}</div>}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full h-8 text-sm justify-between">
                  {allowMultiSelect && selectedValues.length > 1 
                    ? `${selectedValues.length} items selected`
                    : selectedValues[0] || 'Select...'}
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                {renderSearchInput()}
                <div className="max-h-40 overflow-y-auto">
                  {filteredValues.map((value, index) => (
                    <DropdownMenuItem 
                      key={index} 
                      onClick={() => handleValueToggle(value)}
                      className="flex items-center justify-between"
                    >
                      <span>{value}</span>
                      {selectedValues.includes(value) && (
                        <Check className="h-3 w-3 text-blue-600" />
                      )}
                    </DropdownMenuItem>
                  ))}
                </div>
                {renderFilterActions()}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
        
      case 'checkbox':
        return (
          <div className="w-full">
            {title && <div className={`text-sm font-medium mb-1 ${getTextAlignClass()}`}>{title}</div>}
            {renderSearchInput()}
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {filteredValues.map((value, index) => (
                <div key={index} className="flex items-center">
                  <div 
                    className={`h-4 w-4 border rounded mr-2 flex items-center justify-center cursor-pointer ${
                      selectedValues.includes(value) ? 'bg-blue-600 border-blue-600' : ''
                    }`}
                    onClick={() => handleValueToggle(value)}
                  >
                    {selectedValues.includes(value) && <Check className="h-3 w-3 text-white" />}
                  </div>
                  <span className="text-sm">{value}</span>
                </div>
              ))}
            </div>
            {renderFilterActions()}
          </div>
        );
        
      case 'radio':
        return (
          <div className="w-full">
            {title && <div className={`text-sm font-medium mb-1 ${getTextAlignClass()}`}>{title}</div>}
            {renderSearchInput()}
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {filteredValues.map((value, index) => (
                <div key={index} className="flex items-center">
                  <div 
                    className={`h-4 w-4 border rounded-full mr-2 flex items-center justify-center cursor-pointer ${
                      selectedValues.includes(value) ? 'border-blue-600' : ''
                    }`}
                    onClick={() => handleValueToggle(value)}
                  >
                    {selectedValues.includes(value) && <div className="h-2 w-2 bg-blue-600 rounded-full"></div>}
                  </div>
                  <span className="text-sm">{value}</span>
                </div>
              ))}
            </div>
            {renderFilterActions()}
          </div>
        );
        
      case 'search':
        return (
          <div className="w-full">
            {title && <div className={`text-sm font-medium mb-1 ${getTextAlignClass()}`}>{title || 'Search'}</div>}
            <div className="border rounded bg-white p-1 pl-2 flex items-center">
              <Search className="h-3 w-3 text-gray-400 mr-2" />
              <input 
                type="text" 
                className="text-sm outline-none flex-1" 
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <X 
                  className="h-3 w-3 text-gray-400 cursor-pointer mr-1" 
                  onClick={() => setSearchTerm('')}
                />
              )}
            </div>
            {showFilterCount && searchTerm && (
              <div className="text-xs text-gray-500 mt-1">
                {filteredValues.length} results found
              </div>
            )}
          </div>
        );
        
      case 'date':
        return (
          <div className="w-full">
            {title && <div className={`text-sm font-medium mb-1 ${getTextAlignClass()}`}>{title || 'Date'}</div>}
            <Popover>
              <PopoverTrigger asChild>
                <button className="w-full border rounded bg-white p-1 px-2 text-sm text-left">
                  23/05/23
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <div className="p-4">
                  <div className="text-sm">Date picker would go here</div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        );
        
      case 'daterange':
        return (
          <div className="w-full">
            <div className="flex space-x-2">
              <div className="flex-1">
                <div className={`text-sm font-medium mb-1 ${getTextAlignClass()}`}>Start Date</div>
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="w-full border rounded bg-white p-1 px-2 text-sm text-left">
                      23/05/23
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <div className="p-4">
                      <div className="text-sm">Date picker would go here</div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex-1">
                <div className={`text-sm font-medium mb-1 ${getTextAlignClass()}`}>End Date</div>
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="w-full border rounded bg-white p-1 px-2 text-sm text-left">
                      16/07/23
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <div className="p-4">
                      <div className="text-sm">Date picker would go here</div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        );
        
      case 'slider':
        return (
          <div className="w-full">
            {title && <div className={`text-sm font-medium mb-2 ${getTextAlignClass()}`}>{title}</div>}
            <div className="px-1 py-2">
              <div className="h-1 bg-gray-200 rounded-full mb-2 relative">
                <div className="absolute left-1/3 top-1/2 -translate-y-1/2 h-3 w-3 bg-blue-600 rounded-full border-2 border-white shadow-sm"></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>0</span>
                <span>100</span>
              </div>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="w-full flex items-center justify-center p-2">
            <Sliders className="h-5 w-5 mr-2" />
            <div className="font-medium">Filter</div>
          </div>
        );
    }
  };
  
  return (
    <div 
      className="w-full h-full flex items-center p-2"
      style={{
        backgroundColor: properties.backgroundColor || '#ffffff',
        color: properties.textColor || 'black',
      }}
    >
      {renderFilter()}
    </div>
  );
}
