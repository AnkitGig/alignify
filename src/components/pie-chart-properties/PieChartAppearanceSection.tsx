
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PieChartAppearanceSectionProps {
  properties: any;
  handleChange: (field: string, value: any) => void;
  propertiesOpen: boolean;
  setPropertiesOpen: (open: boolean) => void;
}

export function PieChartAppearanceSection({ properties, handleChange, propertiesOpen, setPropertiesOpen }: PieChartAppearanceSectionProps) {
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
            <Label className="text-sm font-medium">Inner Radius</Label>
            <Input
              type="number"
              value={properties.pieInnerRadius || 0}
              onChange={(e) => handleChange('pieInnerRadius', parseInt(e.target.value) || 0)}
              placeholder="0"
              className="text-xs"
              min="0"
              max="100"
            />
          </div>
          
          <div>
            <Label className="text-sm font-medium">Outer Radius</Label>
            <Input
              type="number"
              value={properties.pieOuterRadius || 80}
              onChange={(e) => handleChange('pieOuterRadius', parseInt(e.target.value) || 80)}
              placeholder="80"
              className="text-xs"
              min="20"
              max="150"
            />
          </div>
          
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
