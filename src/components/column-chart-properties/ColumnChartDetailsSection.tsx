
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ColumnChartDetailsSectionProps {
  properties: any;
  handleChange: (field: string, value: any) => void;
  detailsOpen: boolean;
  setDetailsOpen: (open: boolean) => void;
}

export function ColumnChartDetailsSection({ properties, handleChange, detailsOpen, setDetailsOpen }: ColumnChartDetailsSectionProps) {
  const chartVariant = properties.chartVariant || 'default';
  const showLegendOption = chartVariant !== 'default';

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
        <div className="space-y-4 mb-4">
          <div>
            <Label className="text-sm font-medium">Title</Label>
            <Input
              value={properties.chartTitle || 'Chart Title'}
              onChange={(e) => handleChange('chartTitle', e.target.value)}
              placeholder="Enter chart title"
              className="text-xs"
            />
          </div>
          
          <div>
            <Label className="text-sm font-medium">Chart Variant</Label>
            <Select
              value={chartVariant}
              onValueChange={(value) => handleChange('chartVariant', value)}
            >
              <SelectTrigger className="text-xs">
                <SelectValue placeholder="Select variant" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Standard</SelectItem>
                <SelectItem value="grouped">Grouped</SelectItem>
                <SelectItem value="stacked">Stacked</SelectItem>
                <SelectItem value="gradient">Gradient</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Show Title</Label>
            <Switch
              checked={properties.showTitle !== false}
              onCheckedChange={(checked) => handleChange('showTitle', checked)}
            />
          </div>
          
          {showLegendOption && (
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Show Legend</Label>
              <Switch
                checked={properties.showLegend !== false}
                onCheckedChange={(checked) => handleChange('showLegend', checked)}
              />
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Show Grid Lines</Label>
            <Switch
              checked={properties.showGridLines !== false}
              onCheckedChange={(checked) => handleChange('showGridLines', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Show Labels</Label>
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
