
import React from "react";
import { Element } from "@/types/wireframe";
import { Button } from "@/components/ui/button";
import { BarChartDetailsSection } from "./BarChartDetailsSection";
import { BarChartDataSection } from "./BarChartDataSection";
import { BarChartAppearanceSection } from "./BarChartAppearanceSection";
import { BarChartAddOnsSection } from "./BarChartAddOnsSection";

interface BarChartPropertiesProps {
  element: Element;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
  onOpenStyleDialog?: () => void;
}

export function BarChartProperties({ element, updateElementProperties, onOpenStyleDialog }: BarChartPropertiesProps) {
  const properties = element.properties || {};
  
  const [detailsOpen, setDetailsOpen] = React.useState(true);
  const [dataOpen, setDataOpen] = React.useState(true);
  const [propertiesOpen, setPropertiesOpen] = React.useState(true);
  const [addOnsOpen, setAddOnsOpen] = React.useState(false);
  
  const handleChange = (field: string, value: any) => {
    updateElementProperties(element.id, { [field]: value });
  };

  return (
    <div className="text-sm">
      <div className="flex justify-between items-center pb-2 border-b">
        <div className="font-semibold">Bar Chart Properties</div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-7 text-xs"
          onClick={() => onOpenStyleDialog?.()}
        >
          Choose style
        </Button>
      </div>
      
      <BarChartDetailsSection 
        properties={properties}
        handleChange={handleChange}
        detailsOpen={detailsOpen}
        setDetailsOpen={setDetailsOpen}
      />
      
      <BarChartDataSection 
        properties={properties}
        handleChange={handleChange}
        dataOpen={dataOpen}
        setDataOpen={setDataOpen}
      />
      
      <BarChartAppearanceSection 
        properties={properties}
        handleChange={handleChange}
        propertiesOpen={propertiesOpen}
        setPropertiesOpen={setPropertiesOpen}
      />
      
      <BarChartAddOnsSection 
        properties={properties}
        handleChange={handleChange}
        addOnsOpen={addOnsOpen}
        setAddOnsOpen={setAddOnsOpen}
      />
    </div>
  );
}
