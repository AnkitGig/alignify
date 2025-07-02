
import React from 'react';
import { Element } from '@/types/wireframe';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface TreemapAppearanceSectionProps {
  element: Element;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
}

export function TreemapAppearanceSection({ element, updateElementProperties }: TreemapAppearanceSectionProps) {
  const properties = element.properties || {};
  const {
    showLabels = true,
    showValues = true,
  } = properties;

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Properties</h3>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="showLabels" className="text-sm">Labels</Label>
          <Switch
            id="showLabels"
            checked={showLabels}
            onCheckedChange={(checked) => 
              updateElementProperties(element.id, { showLabels: checked })
            }
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="showValues" className="text-sm">Values</Label>
          <Switch
            id="showValues"
            checked={showValues}
            onCheckedChange={(checked) => 
              updateElementProperties(element.id, { showValues: checked })
            }
          />
        </div>
      </div>
    </div>
  );
}
