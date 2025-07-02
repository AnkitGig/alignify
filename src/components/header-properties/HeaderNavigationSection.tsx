
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react';

interface HeaderNavigationSectionProps {
  showNavigation: boolean;
  navigationItems: string[];
  onNavigationToggle: (checked: boolean) => void;
  onNavigationItemChange: (index: number, value: string) => void;
  onAddNavigationItem: () => void;
  onRemoveNavigationItem: (index: number) => void;
}

export function HeaderNavigationSection({
  showNavigation,
  navigationItems,
  onNavigationToggle,
  onNavigationItemChange,
  onAddNavigationItem,
  onRemoveNavigationItem
}: HeaderNavigationSectionProps) {
  const [showNavOptions, setShowNavOptions] = useState(false);

  return (
    <>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="font-medium text-sm">Navigation</div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowNavOptions(!showNavOptions)}
            className="h-7 w-7 p-0"
          >
            {showNavOptions ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="show-nav" className="text-sm">Show navigation</Label>
          <Switch 
            id="show-nav"
            checked={showNavigation} 
            onCheckedChange={onNavigationToggle}
          />
        </div>
        
        {showNavOptions && showNavigation && (
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between mb-2">
              <Label className="text-xs text-gray-500">Navigation Items</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={onAddNavigationItem}
                className="h-6 px-2"
              >
                <Plus size={12} className="mr-1" />
                Add
              </Button>
            </div>
            
            {navigationItems.map((item, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <div className="flex-1">
                  <Label htmlFor={`nav-item-${index}`} className="text-xs text-gray-500 mb-1 block">
                    Item {index + 1}
                  </Label>
                  <Input
                    id={`nav-item-${index}`}
                    value={item}
                    onChange={(e) => onNavigationItemChange(index, e.target.value)}
                    className="text-sm h-8"
                    placeholder={`Navigation ${index + 1}`}
                  />
                </div>
                {navigationItems.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveNavigationItem(index)}
                    className="h-8 w-8 p-0 mt-5"
                  >
                    <Trash2 size={12} />
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <Separator />
    </>
  );
}
