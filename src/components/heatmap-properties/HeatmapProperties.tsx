
import React from "react";
import { Element } from "@/types/wireframe";
import { Button } from "@/components/ui/button";
import { HeatmapDetailsSection } from "./HeatmapDetailsSection";
import { HeatmapDataSection } from "./HeatmapDataSection";
import { HeatmapAppearanceSection } from "./HeatmapAppearanceSection";
import { HeatmapAddOnsSection } from "./HeatmapAddOnsSection";

interface HeatmapPropertiesProps {
  element: Element;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
  onOpenStyleDialog?: () => void;
}

export function HeatmapProperties({ element, updateElementProperties, onOpenStyleDialog }: HeatmapPropertiesProps) {
  const properties = element.properties || {};
  
  const [detailsOpen, setDetailsOpen] = React.useState(true);
  const [dataOpen, setDataOpen] = React.useState(true);
  const [propertiesOpen, setPropertiesOpen] = React.useState(true);
  const [addOnsOpen, setAddOnsOpen] = React.useState(true);
  
  const handleChange = (field: string, value: any) => {
    updateElementProperties(element.id, { [field]: value });
  };

  return (
    <div className="text-sm">
      <div className="flex justify-between items-center pb-2 border-b">
        <div className="font-semibold">Heatmap Properties</div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-7 text-xs"
          onClick={() => onOpenStyleDialog?.()}
        >
          Choose style
        </Button>
      </div>
      
      <HeatmapDetailsSection 
        properties={properties}
        handleChange={handleChange}
        detailsOpen={detailsOpen}
        setDetailsOpen={setDetailsOpen}
      />
      
      <HeatmapDataSection 
        properties={properties}
        handleChange={handleChange}
        dataOpen={dataOpen}
        setDataOpen={setDataOpen}
      />
      
      <HeatmapAppearanceSection 
        properties={properties}
        handleChange={handleChange}
        propertiesOpen={propertiesOpen}
        setPropertiesOpen={setPropertiesOpen}
      />
      
      <HeatmapAddOnsSection 
        properties={properties}
        handleChange={handleChange}
        addOnsOpen={addOnsOpen}
        setAddOnsOpen={setAddOnsOpen}
      />
    </div>
  );
}
