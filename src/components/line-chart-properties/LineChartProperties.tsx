
import React from 'react';
import { Element } from '@/types/wireframe';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChartDetailsSection } from './LineChartDetailsSection';
import { LineChartDataSection } from './LineChartDataSection';
import { LineChartAppearanceSection } from './LineChartAppearanceSection';
import { LineChartAddOnsSection } from './LineChartAddOnsSection';

interface LineChartPropertiesProps {
  element: Element;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
  onOpenStyleDialog?: () => void;
}

export function LineChartProperties({ 
  element, 
  updateElementProperties, 
  onOpenStyleDialog 
}: LineChartPropertiesProps) {
  
  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-2">
        <h3 className="text-sm font-medium">Line Chart Properties</h3>
        <Button 
          onClick={onOpenStyleDialog}
          variant="outline" 
          size="sm"
          className="w-full sm:w-auto"
        >
          Choose Style
        </Button>
      </div>
      
      <Tabs defaultValue="details" className="w-full flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-2 mx-2">
          <TabsTrigger value="details" className="text-xs">Details</TabsTrigger>
          <TabsTrigger value="styling" className="text-xs">Styling</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="space-y-4 mt-4 flex-1 overflow-auto px-2">
          <LineChartDetailsSection 
            element={element}
            updateElementProperties={updateElementProperties}
          />
          
          <LineChartDataSection 
            element={element}
            updateElementProperties={updateElementProperties}
          />
          
          <LineChartAddOnsSection 
            element={element}
            updateElementProperties={updateElementProperties}
          />
        </TabsContent>
        
        <TabsContent value="styling" className="space-y-4 mt-4 flex-1 overflow-auto px-2">
          <LineChartAppearanceSection 
            element={element}
            updateElementProperties={updateElementProperties}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
