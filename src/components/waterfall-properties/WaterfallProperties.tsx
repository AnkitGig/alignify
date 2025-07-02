
import React from 'react';
import { Element } from '@/types/wireframe';
import { WaterfallDetailsSection } from './WaterfallDetailsSection';
import { WaterfallDataSection } from './WaterfallDataSection';
import { WaterfallXAxisSection } from './WaterfallXAxisSection';
import { WaterfallYAxisSection } from './WaterfallYAxisSection';
import { WaterfallPropertiesSection } from './WaterfallPropertiesSection';
import { WaterfallAppearanceSection } from './WaterfallAppearanceSection';
import { WaterfallAdvancedAddOnsSection } from './WaterfallAdvancedAddOnsSection';
import { WaterfallVariationSection } from './WaterfallVariationSection';
import { WaterfallDesignSection } from './WaterfallDesignSection';
import { Separator } from '@/components/ui/separator';

interface WaterfallPropertiesProps {
  element: Element;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
  onOpenStyleDialog?: () => void;
}

export function WaterfallProperties({ element, updateElementProperties, onOpenStyleDialog }: WaterfallPropertiesProps) {
  const properties = element.properties || {};

  console.log('WaterfallProperties rendering with element:', element.id);
  console.log('Current properties:', properties);

  const handleUpdateProperties = (newProperties: any) => {
    console.log('Updating waterfall properties:', newProperties);
    // Ensure we're updating with a clean object
    const cleanProperties = { ...newProperties };
    updateElementProperties(element.id, cleanProperties);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Waterfall Chart Properties</h2>
      </div>

      <WaterfallDetailsSection 
        properties={properties}
        elementId={element.id}
        updateElementProperties={handleUpdateProperties}
      />
      
      <Separator />
      
      <WaterfallDataSection 
        properties={properties}
        elementId={element.id}
        updateElementProperties={handleUpdateProperties}
      />
      
      <Separator />
      
      <WaterfallXAxisSection 
        properties={properties}
        elementId={element.id}
        updateElementProperties={handleUpdateProperties}
      />
      
      <Separator />
      
      <WaterfallYAxisSection 
        properties={properties}
        elementId={element.id}
        updateElementProperties={handleUpdateProperties}
      />
      
      <Separator />
      
      <WaterfallPropertiesSection 
        properties={properties}
        elementId={element.id}
        updateElementProperties={handleUpdateProperties}
      />
      
      <Separator />
      
      <WaterfallAppearanceSection 
        properties={properties}
        elementId={element.id}
        updateElementProperties={handleUpdateProperties}
      />
      
      <Separator />
      
      <WaterfallAdvancedAddOnsSection 
        properties={properties}
        elementId={element.id}
        updateElementProperties={handleUpdateProperties}
      />
      
      <Separator />
      
      <WaterfallVariationSection 
        properties={properties}
        onOpenStyleDialog={onOpenStyleDialog}
      />
      
      <Separator />
      
      <WaterfallDesignSection 
        properties={properties}
        onOpenStyleDialog={onOpenStyleDialog}
      />
    </div>
  );
}
