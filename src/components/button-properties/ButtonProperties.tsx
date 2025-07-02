
import React from 'react';
import { Element } from '@/types/wireframe';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface ButtonPropertiesProps {
  element: Element;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
  toggleProperties?: () => void;
  onOpenStyleDialog?: () => void;
}

export function ButtonProperties({ 
  element, 
  updateElementProperties, 
  toggleProperties
}: ButtonPropertiesProps) {
  const properties = element.properties || {};
  
  const handlePropertyChange = (key: string, value: any) => {
    updateElementProperties(element.id, { [key]: value });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Button Properties</h3>
        {toggleProperties && (
          <Button variant="ghost" size="sm" onClick={toggleProperties}>
            <X size={16} />
          </Button>
        )}
      </div>

      {/* Button Text */}
      <div className="space-y-2">
        <Label htmlFor="button-text" className="text-sm font-medium">Button Text</Label>
        <Input
          id="button-text"
          value={properties.buttonText || 'Button'}
          onChange={(e) => handlePropertyChange('buttonText', e.target.value)}
          placeholder="Enter button text"
          className="h-8"
        />
      </div>

      <Separator />

      {/* Button Size */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Button Size</Label>
        <Select 
          value={properties.buttonSize || 'md'} 
          onValueChange={(value) => handlePropertyChange('buttonSize', value)}
        >
          <SelectTrigger className="h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sm">Small</SelectItem>
            <SelectItem value="md">Medium</SelectItem>
            <SelectItem value="lg">Large</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Button Icon */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="button-icon" className="text-sm font-medium">Show Icon</Label>
          <Switch
            id="button-icon"
            checked={properties.buttonIcon || false}
            onCheckedChange={(checked) => handlePropertyChange('buttonIcon', checked)}
          />
        </div>
      </div>

      <Separator />

      {/* Background Color */}
      <div className="space-y-2">
        <Label htmlFor="bg-color" className="text-sm font-medium">Background Color</Label>
        <div className="flex items-center space-x-2">
          <Input
            id="bg-color"
            type="color"
            value={properties.backgroundColor || '#3b82f6'}
            onChange={(e) => handlePropertyChange('backgroundColor', e.target.value)}
            className="w-12 h-8 p-1 border rounded"
          />
          <Input
            value={properties.backgroundColor || '#3b82f6'}
            onChange={(e) => handlePropertyChange('backgroundColor', e.target.value)}
            placeholder="#3b82f6"
            className="h-8 flex-1"
          />
        </div>
      </div>

      {/* Text Color */}
      <div className="space-y-2">
        <Label htmlFor="text-color" className="text-sm font-medium">Text Color</Label>
        <div className="flex items-center space-x-2">
          <Input
            id="text-color"
            type="color"
            value={properties.textColor || '#ffffff'}
            onChange={(e) => handlePropertyChange('textColor', e.target.value)}
            className="w-12 h-8 p-1 border rounded"
          />
          <Input
            value={properties.textColor || '#ffffff'}
            onChange={(e) => handlePropertyChange('textColor', e.target.value)}
            placeholder="#ffffff"
            className="h-8 flex-1"
          />
        </div>
      </div>

      <Separator />

      {/* Preview Section */}
      <div className="space-y-2 pt-2">
        <Label className="text-sm font-medium">Preview</Label>
        <div className="p-4 border rounded-md bg-gray-50 flex items-center justify-center">
          <button 
            className={`rounded transition-colors flex items-center justify-center ${
              properties.buttonSize === 'sm' ? 'px-3 py-1 text-xs' :
              properties.buttonSize === 'lg' ? 'px-6 py-3 text-base' :
              'px-4 py-2 text-sm'
            }`}
            style={{
              backgroundColor: properties.backgroundColor || '#3b82f6',
              color: properties.textColor || '#ffffff'
            }}
          >
            {properties.buttonIcon && (
              <svg className="mr-1 w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            {properties.buttonText || 'Button'}
          </button>
        </div>
      </div>
    </div>
  );
}
