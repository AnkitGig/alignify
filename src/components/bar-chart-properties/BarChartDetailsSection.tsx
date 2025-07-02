
import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface BarChartDetailsSectionProps {
  properties: any;
  handleChange: (field: string, value: any) => void;
  detailsOpen: boolean;
  setDetailsOpen: (open: boolean) => void;
}

export function BarChartDetailsSection({ 
  properties, 
  handleChange, 
  detailsOpen, 
  setDetailsOpen 
}: BarChartDetailsSectionProps) {
  return (
    <div className="border-b pb-3 mb-3">
      <button 
        className="flex items-center justify-between w-full text-left font-medium text-sm py-2"
        onClick={() => setDetailsOpen(!detailsOpen)}
      >
        <span>Details</span>
        {detailsOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      </button>
      
      {detailsOpen && (
        <div className="space-y-3 mt-2">
          <div>
            <Label className="text-xs">Title</Label>
            <Input
              value={properties.chartTitle || 'Title goes here'}
              onChange={(e) => handleChange('chartTitle', e.target.value)}
              className="mt-1 h-8 text-xs"
              placeholder="Chart title"
            />
          </div>
        </div>
      )}
    </div>
  );
}
