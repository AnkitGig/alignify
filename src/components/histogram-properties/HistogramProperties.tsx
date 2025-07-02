
import React from 'react';
import { Element } from '@/types/wireframe';
import { HistogramDetailsSection } from './HistogramDetailsSection';
import { HistogramDataSection } from './HistogramDataSection';
import { HistogramAppearanceSection } from './HistogramAppearanceSection';
import { HistogramAddOnsSection } from './HistogramAddOnsSection';

interface HistogramPropertiesProps {
  element: Element;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
  onOpenStyleDialog?: () => void;
}

export function HistogramProperties({ element, updateElementProperties, onOpenStyleDialog }: HistogramPropertiesProps) {
  return (
    <div className="space-y-6">
      <HistogramDetailsSection 
        element={element} 
        updateElementProperties={updateElementProperties}
        onOpenStyleDialog={onOpenStyleDialog}
      />
      <HistogramDataSection 
        element={element} 
        updateElementProperties={updateElementProperties}
      />
      <HistogramAppearanceSection 
        element={element} 
        updateElementProperties={updateElementProperties}
      />
      <HistogramAddOnsSection 
        element={element} 
        updateElementProperties={updateElementProperties}
      />
    </div>
  );
}
