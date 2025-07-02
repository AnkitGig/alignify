
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ColumnChartAppearanceSectionProps {
  properties: any;
  handleChange: (field: string, value: any) => void;
  propertiesOpen: boolean;
  setPropertiesOpen: (open: boolean) => void;
}

export function ColumnChartAppearanceSection({ properties, handleChange, propertiesOpen, setPropertiesOpen }: ColumnChartAppearanceSectionProps) {
  const chartVariant = properties.chartVariant || 'default';
  const showSecondaryColor = chartVariant === 'grouped' || chartVariant === 'stacked' || chartVariant === 'gradient';
  const showTertiaryColor = chartVariant === 'stacked';

  return (
    <>
      <div className="border-b pb-2 mb-2">
        <button
          onClick={() => setPropertiesOpen(!propertiesOpen)}
          className="flex items-center justify-between w-full text-left font-medium py-2"
        >
          <span>Appearance</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${propertiesOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>
      
      {propertiesOpen && (
        <div className="space-y-4 mb-4">
          <div>
            <Label className="text-sm font-medium">Primary Color</Label>
            <div className="flex items-center gap-2">
              <Input
                type="color"
                value={properties.barColor || '#3B82F6'}
                onChange={(e) => handleChange('barColor', e.target.value)}
                className="w-12 h-8 p-1 border rounded"
              />
              <Input
                value={properties.barColor || '#3B82F6'}
                onChange={(e) => handleChange('barColor', e.target.value)}
                placeholder="#3B82F6"
                className="text-xs flex-1"
              />
            </div>
          </div>
          
          {showSecondaryColor && (
            <div>
              <Label className="text-sm font-medium">Secondary Color</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="color"
                  value={properties.secondaryBarColor || '#818CF8'}
                  onChange={(e) => handleChange('secondaryBarColor', e.target.value)}
                  className="w-12 h-8 p-1 border rounded"
                />
                <Input
                  value={properties.secondaryBarColor || '#818CF8'}
                  onChange={(e) => handleChange('secondaryBarColor', e.target.value)}
                  placeholder="#818CF8"
                  className="text-xs flex-1"
                />
              </div>
            </div>
          )}
          
          {showTertiaryColor && (
            <div>
              <Label className="text-sm font-medium">Tertiary Color</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="color"
                  value={properties.tertiaryBarColor || '#C7D2FE'}
                  onChange={(e) => handleChange('tertiaryBarColor', e.target.value)}
                  className="w-12 h-8 p-1 border rounded"
                />
                <Input
                  value={properties.tertiaryBarColor || '#C7D2FE'}
                  onChange={(e) => handleChange('tertiaryBarColor', e.target.value)}
                  placeholder="#C7D2FE"
                  className="text-xs flex-1"
                />
              </div>
            </div>
          )}
          
          <div>
            <Label className="text-sm font-medium">Chart Height</Label>
            <Input
              type="number"
              value={properties.chartHeight || 300}
              onChange={(e) => handleChange('chartHeight', parseInt(e.target.value) || 300)}
              placeholder="300"
              className="text-xs"
              min="200"
              max="800"
            />
          </div>
        </div>
      )}
    </>
  );
}
