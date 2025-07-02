
import React from 'react';
import { Element } from '@/types/wireframe';
import { TreemapDetailsSection } from './TreemapDetailsSection';
import { TreemapAppearanceSection } from './TreemapAppearanceSection';
import { TreemapDataSection } from './TreemapDataSection';
import { TreemapAddOnsSection } from './TreemapAddOnsSection';

interface TreemapPropertiesProps {
  element: Element;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
  onOpenStyleDialog?: () => void;
}

export function TreemapProperties({ element, updateElementProperties, onOpenStyleDialog }: TreemapPropertiesProps) {
  return (
    <div className="space-y-4">
      <TreemapDetailsSection 
        element={element} 
        updateElementProperties={updateElementProperties}
        onOpenStyleDialog={onOpenStyleDialog}
      />
      <TreemapAppearanceSection 
        element={element} 
        updateElementProperties={updateElementProperties} 
      />
      <TreemapDataSection 
        element={element} 
        updateElementProperties={updateElementProperties} 
      />
      <TreemapAddOnsSection 
        element={element} 
        updateElementProperties={updateElementProperties} 
      />
    </div>
  );
}
