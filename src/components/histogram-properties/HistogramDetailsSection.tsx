
import React from 'react';
import { Element } from '@/types/wireframe';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Palette } from 'lucide-react';

interface HistogramDetailsSectionProps {
  element: Element;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
  onOpenStyleDialog?: () => void;
}

export function HistogramDetailsSection({ element, updateElementProperties, onOpenStyleDialog }: HistogramDetailsSectionProps) {
  const properties = element.properties || {};
  const {
    histogramTitle = 'Histogram Chart',
    showTitle = true,
    textAlignment = 'center',
  } = properties;

  const handleAlignmentChange = (alignment: 'left' | 'center' | 'right') => {
    updateElementProperties(element.id, { textAlignment: alignment });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Details</h3>
        {onOpenStyleDialog && (
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenStyleDialog}
            className="flex items-center gap-2"
          >
            <Palette className="h-4 w-4" />
            Style
          </Button>
        )}
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="showTitle" className="text-sm">Title</Label>
          <Switch
            id="showTitle"
            checked={showTitle}
            onCheckedChange={(checked) => 
              updateElementProperties(element.id, { showTitle: checked })
            }
          />
        </div>
        
        {showTitle && (
          <div>
            <Label className="text-sm">Edit Text</Label>
            <Input
              value={histogramTitle}
              onChange={(e) => 
                updateElementProperties(element.id, { histogramTitle: e.target.value })
              }
              placeholder="Enter histogram title"
              className="mt-1"
            />
          </div>
        )}
        
        <div>
          <Label className="text-sm">Alignment</Label>
          <div className="flex gap-1 mt-1">
            {(['left', 'center', 'right'] as const).map((align) => (
              <Button
                key={align}
                variant={textAlignment === align ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleAlignmentChange(align)}
                className="flex-1"
              >
                {align.charAt(0).toUpperCase() + align.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
