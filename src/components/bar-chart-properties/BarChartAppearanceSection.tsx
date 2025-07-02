
import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface BarChartAppearanceSectionProps {
  properties: any;
  handleChange: (field: string, value: any) => void;
  propertiesOpen: boolean;
  setPropertiesOpen: (open: boolean) => void;
}

export function BarChartAppearanceSection({ 
  properties, 
  handleChange, 
  propertiesOpen, 
  setPropertiesOpen 
}: BarChartAppearanceSectionProps) {
  return (
    <div className="border-b pb-3 mb-3">
      <button 
        className="flex items-center justify-between w-full text-left font-medium text-sm py-2"
        onClick={() => setPropertiesOpen(!propertiesOpen)}
      >
        <span>Appearance</span>
        {propertiesOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      </button>
      
      {propertiesOpen && (
        <div className="space-y-3 mt-2">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Primary Color</Label>
              <div className="flex mt-1">
                <Input
                  type="color"
                  value={properties.barColor || '#4F46E5'}
                  onChange={(e) => handleChange('barColor', e.target.value)}
                  className="h-8 w-full"
                />
              </div>
            </div>
            
            <div>
              <Label className="text-xs">Secondary Color</Label>
              <div className="flex mt-1">
                <Input
                  type="color"
                  value={properties.secondaryBarColor || '#818CF8'}
                  onChange={(e) => handleChange('secondaryBarColor', e.target.value)}
                  className="h-8 w-full"
                />
              </div>
            </div>
          </div>
          
          {(properties.chartVariant === 'stacked-bar' || properties.chartVariant === 'multi-bar') && (
            <div>
              <Label className="text-xs">Tertiary Color</Label>
              <div className="flex mt-1">
                <Input
                  type="color"
                  value={properties.tertiaryBarColor || '#C7D2FE'}
                  onChange={(e) => handleChange('tertiaryBarColor', e.target.value)}
                  className="h-8 w-full"
                />
              </div>
            </div>
          )}
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-xs">Show Legend</Label>
              <Switch
                checked={properties.showLegend !== false}
                onCheckedChange={(checked) => handleChange('showLegend', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label className="text-xs">Show Grid Lines</Label>
              <Switch
                checked={properties.showGridLines !== false}
                onCheckedChange={(checked) => handleChange('showGridLines', checked)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
