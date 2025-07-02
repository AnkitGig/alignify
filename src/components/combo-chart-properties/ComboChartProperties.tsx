
import React from 'react';
import { Element } from '@/types/wireframe';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ComboChartDetailsSection } from './ComboChartDetailsSection';
import { ComboChartDataSection } from './ComboChartDataSection';
import { ComboChartAppearanceSection } from './ComboChartAppearanceSection';
import { ComboChartAddOnsSection } from './ComboChartAddOnsSection';
import { ComboChartColorSection } from './ComboChartColorSection';

interface ComboChartPropertiesProps {
  element: Element;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
  onOpenStyleDialog?: () => void;
}

export function ComboChartProperties({ 
  element, 
  updateElementProperties, 
  onOpenStyleDialog 
}: ComboChartPropertiesProps) {
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Combo Chart Properties</h3>
        <Button 
          onClick={onOpenStyleDialog}
          variant="outline" 
          size="sm"
        >
          Choose Style
        </Button>
      </div>
      
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="details" className="text-xs">Details</TabsTrigger>
          <TabsTrigger value="styling" className="text-xs">Styling</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="space-y-4 mt-4">
          <ComboChartDetailsSection 
            element={element}
            updateElementProperties={updateElementProperties}
          />
          
          <ComboChartDataSection 
            element={element}
            updateElementProperties={updateElementProperties}
          />
          
          <ComboChartAddOnsSection 
            element={element}
            updateElementProperties={updateElementProperties}
          />
        </TabsContent>
        
        <TabsContent value="styling" className="space-y-4 mt-4">
          <ComboChartAppearanceSection 
            element={element}
            updateElementProperties={updateElementProperties}
          />
          
          <ComboChartColorSection 
            element={element}
            updateElementProperties={updateElementProperties}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
