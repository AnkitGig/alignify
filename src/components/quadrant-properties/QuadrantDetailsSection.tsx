
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface QuadrantDetailsSectionProps {
  properties: any;
  handleChange: (field: string, value: any) => void;
  detailsOpen: boolean;
  setDetailsOpen: (open: boolean) => void;
}

export function QuadrantDetailsSection({ properties, handleChange, detailsOpen, setDetailsOpen }: QuadrantDetailsSectionProps) {
  return (
    <>
      <div className="border-b pb-2 mb-2">
        <button
          onClick={() => setDetailsOpen(!detailsOpen)}
          className="flex items-center justify-between w-full text-left font-medium py-2"
        >
          <span>Details</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${detailsOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>
      
      {detailsOpen && (
        <div className="space-y-3 mb-4">
          <div className="flex items-center space-x-2">
            <Switch
              checked={properties.showTitle || true}
              onCheckedChange={(checked) => handleChange('showTitle', checked)}
            />
            <Label className="text-sm">Title</Label>
          </div>
          
          {(properties.showTitle !== false) && (
            <div className="space-y-1">
              <Label className="text-xs text-gray-600">Edit Text</Label>
              <Input
                value={properties.quadrantTitle || 'Title goes here'}
                onChange={(e) => handleChange('quadrantTitle', e.target.value)}
                className="h-8 text-sm"
                placeholder="Enter title"
              />
            </div>
          )}

          <div className="space-y-1">
            <Label className="text-xs text-gray-600">X-Axis Label</Label>
            <Input
              value={properties.xAxisLabel || 'X Axis'}
              onChange={(e) => handleChange('xAxisLabel', e.target.value)}
              className="h-8 text-sm"
              placeholder="Enter X-axis label"
            />
          </div>

          <div className="space-y-1">
            <Label className="text-xs text-gray-600">Y-Axis Label</Label>
            <Input
              value={properties.yAxisLabel || 'Y Axis'}
              onChange={(e) => handleChange('yAxisLabel', e.target.value)}
              className="h-8 text-sm"
              placeholder="Enter Y-axis label"
            />
          </div>
        </div>
      )}
    </>
  );
}
