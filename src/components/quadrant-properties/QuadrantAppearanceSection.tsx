
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface QuadrantAppearanceSectionProps {
  properties: any;
  handleChange: (field: string, value: any) => void;
  propertiesOpen: boolean;
  setPropertiesOpen: (open: boolean) => void;
}

export function QuadrantAppearanceSection({ properties, handleChange, propertiesOpen, setPropertiesOpen }: QuadrantAppearanceSectionProps) {
  return (
    <>
      <div className="border-b pb-2 mb-2">
        <button
          onClick={() => setPropertiesOpen(!propertiesOpen)}
          className="flex items-center justify-between w-full text-left font-medium py-2"
        >
          <span>Properties</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${propertiesOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>
      
      {propertiesOpen && (
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm">Show Grid Lines</Label>
            <Switch
              checked={properties.showGridLines !== false}
              onCheckedChange={(checked) => handleChange('showGridLines', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label className="text-sm">Show Labels</Label>
            <Switch
              checked={properties.showLabels !== false}
              onCheckedChange={(checked) => handleChange('showLabels', checked)}
            />
          </div>
        </div>
      )}
    </>
  );
}
