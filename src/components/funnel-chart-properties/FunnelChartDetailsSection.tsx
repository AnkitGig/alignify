
import React from 'react';
import { Element } from '@/types/wireframe';
import type { FunnelChartVariant } from '@/types/wireframe';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FunnelChartDetailsSectionProps {
  properties: Element['properties'];
  updateProperties: (updates: Partial<Element['properties']>) => void;
}

export function FunnelChartDetailsSection({ properties, updateProperties }: FunnelChartDetailsSectionProps) {
  const {
    funnelChartTitle = 'Funnel Chart',
    showTitle = true,
    funnelChartVariant = 'default'
  } = properties || {};

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-gray-700">Details</h4>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="title-toggle" className="text-sm">Title</Label>
          <Switch
            id="title-toggle"
            checked={showTitle}
            onCheckedChange={(checked) => updateProperties({ showTitle: checked })}
          />
        </div>

        {showTitle && (
          <div>
            <Label htmlFor="chart-title" className="text-sm text-gray-600">Edit Text</Label>
            <Input
              id="chart-title"
              value={funnelChartTitle}
              onChange={(e) => updateProperties({ funnelChartTitle: e.target.value })}
              placeholder="Enter chart title"
              className="mt-1"
            />
          </div>
        )}

        <div>
          <Label htmlFor="chart-variant" className="text-sm text-gray-600">Variation</Label>
          <Select
            value={funnelChartVariant}
            onValueChange={(value: FunnelChartVariant) => updateProperties({ funnelChartVariant: value })}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select variation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="with-buttons">With Buttons</SelectItem>
              <SelectItem value="with-kpis">With KPIs</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
