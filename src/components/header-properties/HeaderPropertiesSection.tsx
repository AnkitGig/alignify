
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { ChevronDown, ChevronUp, Settings } from 'lucide-react';

interface HeaderPropertiesSectionProps {
  properties: any;
  showIcon: boolean;
  showNavigation: boolean;
  onIconToggle: (checked: boolean) => void;
  onNavigationToggle: (checked: boolean) => void;
  updateElementProperties: (id: string, properties: any) => void;
  elementId: string;
}

export function HeaderPropertiesSection({
  properties,
  showIcon,
  showNavigation,
  onIconToggle,
  onNavigationToggle,
  updateElementProperties,
  elementId
}: HeaderPropertiesSectionProps) {
  const [showProperties, setShowProperties] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(properties.backgroundColor || '#ffffff');
  const [textColor, setTextColor] = useState(properties.textColor || '#000000');

  const handleBackgroundColorChange = (value: string) => {
    setBackgroundColor(value);
    updateElementProperties(elementId, { backgroundColor: value });
  };

  const handleTextColorChange = (value: string) => {
    setTextColor(value);
    updateElementProperties(elementId, { textColor: value });
  };

  return (
    <>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="font-medium text-sm flex items-center">
            Properties
            <Settings className="h-3 w-3 ml-1 text-gray-400" />
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowProperties(!showProperties)}
            className="h-7 w-7 p-0"
          >
            {showProperties ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>
        </div>
        
        {showProperties && (
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="background-color" className="text-sm">Background Color</Label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  id="background-color"
                  value={backgroundColor}
                  onChange={(e) => handleBackgroundColorChange(e.target.value)}
                  className="w-8 h-8 rounded border cursor-pointer"
                />
                <Input
                  value={backgroundColor}
                  onChange={(e) => handleBackgroundColorChange(e.target.value)}
                  className="w-20 h-8 text-xs"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="text-color" className="text-sm">Text Color</Label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  id="text-color"
                  value={textColor}
                  onChange={(e) => handleTextColorChange(e.target.value)}
                  className="w-8 h-8 rounded border cursor-pointer"
                />
                <Input
                  value={textColor}
                  onChange={(e) => handleTextColorChange(e.target.value)}
                  className="w-20 h-8 text-xs"
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <Label htmlFor="show-icon" className="text-sm">Icon</Label>
          <Switch 
            id="show-icon"
            checked={showIcon} 
            onCheckedChange={onIconToggle}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="navigation-buttons" className="text-sm">Navigation Buttons</Label>
          <Switch 
            id="navigation-buttons"
            checked={showNavigation} 
            onCheckedChange={onNavigationToggle}
          />
        </div>
      </div>
      <Separator />
    </>
  );
}
