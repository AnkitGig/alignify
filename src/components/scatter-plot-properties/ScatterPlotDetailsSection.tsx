
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ScatterPlotDetailsSectionProps {
  properties: any;
  handleChange: (field: string, value: any) => void;
  detailsOpen: boolean;
  setDetailsOpen: (open: boolean) => void;
}

export function ScatterPlotDetailsSection({ properties, handleChange, detailsOpen, setDetailsOpen }: ScatterPlotDetailsSectionProps) {
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
          <div>
            <Label className="text-sm font-medium">Title</Label>
            <Input
              value={properties.scatterPlotTitle || 'Scatter Plot'}
              onChange={(e) => handleChange('scatterPlotTitle', e.target.value)}
              placeholder="Enter chart title"
              className="mt-1"
            />
          </div>
          
          <div>
            <Label className="text-sm font-medium">X-Axis Label</Label>
            <Input
              value={properties.scatterXAxisLabel || 'X Axis'}
              onChange={(e) => handleChange('scatterXAxisLabel', e.target.value)}
              placeholder="Enter X-axis label"
              className="mt-1"
            />
          </div>
          
          <div>
            <Label className="text-sm font-medium">Y-Axis Label</Label>
            <Input
              value={properties.scatterYAxisLabel || 'Y Axis'}
              onChange={(e) => handleChange('scatterYAxisLabel', e.target.value)}
              placeholder="Enter Y-axis label"
              className="mt-1"
            />
          </div>
        </div>
      )}
    </>
  );
}
