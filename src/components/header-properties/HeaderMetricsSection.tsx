
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface HeaderMetricsSectionProps {
  showMetrics: boolean;
  metrics: Array<{title: string, value: string}>;
  onMetricToggle: (checked: boolean) => void;
  onMetricChange: (index: number, field: 'title' | 'value', value: string) => void;
}

export function HeaderMetricsSection({
  showMetrics,
  metrics,
  onMetricToggle,
  onMetricChange
}: HeaderMetricsSectionProps) {
  const [showMetricOptions, setShowMetricOptions] = useState(false);

  return (
    <>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="font-medium text-sm">Metrics</div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowMetricOptions(!showMetricOptions)}
            className="h-7 w-7 p-0"
          >
            {showMetricOptions ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="show-metrics" className="text-sm">Show metrics</Label>
          <Switch 
            id="show-metrics"
            checked={showMetrics} 
            onCheckedChange={onMetricToggle}
          />
        </div>
        
        {showMetricOptions && showMetrics && (
          <div className="space-y-3 pt-2">
            {metrics.map((metric, index) => (
              <div key={index} className="space-y-2">
                <div>
                  <Label htmlFor={`metric-title-${index}`} className="text-xs text-gray-500 mb-1 block">
                    Title {index + 1}
                  </Label>
                  <Input
                    id={`metric-title-${index}`}
                    value={metric.title}
                    onChange={(e) => onMetricChange(index, 'title', e.target.value)}
                    className="text-sm h-8 mb-1"
                  />
                </div>
                <div>
                  <Label htmlFor={`metric-value-${index}`} className="text-xs text-gray-500 mb-1 block">
                    Value {index + 1}
                  </Label>
                  <Input
                    id={`metric-value-${index}`}
                    value={metric.value}
                    onChange={(e) => onMetricChange(index, 'value', e.target.value)}
                    className="text-sm h-8"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Separator />
    </>
  );
}
