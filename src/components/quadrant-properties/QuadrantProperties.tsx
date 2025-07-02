
import React from "react";
import { Element } from "@/types/wireframe";
import { Button } from "@/components/ui/button";
import { QuadrantDetailsSection } from "./QuadrantDetailsSection";
import { QuadrantDataSection } from "./QuadrantDataSection";
import { QuadrantAppearanceSection } from "./QuadrantAppearanceSection";

interface QuadrantPropertiesProps {
  element: Element;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
  onOpenStyleDialog?: () => void;
}

export function QuadrantProperties({ element, updateElementProperties, onOpenStyleDialog }: QuadrantPropertiesProps) {
  const properties = element.properties || {};
  
  const [detailsOpen, setDetailsOpen] = React.useState(true);
  const [dataOpen, setDataOpen] = React.useState(true);
  const [propertiesOpen, setPropertiesOpen] = React.useState(true);
  
  const handleChange = (field: string, value: any) => {
    updateElementProperties(element.id, { [field]: value });
  };

  return (
    <div className="text-sm">
      <div className="flex justify-between items-center pb-2 border-b">
        <div className="font-semibold">Quadrant Chart Properties</div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-7 text-xs"
          onClick={() => onOpenStyleDialog?.()}
        >
          Choose style
        </Button>
      </div>
      
      <QuadrantDetailsSection 
        properties={properties}
        handleChange={handleChange}
        detailsOpen={detailsOpen}
        setDetailsOpen={setDetailsOpen}
      />
      
      <QuadrantDataSection 
        properties={properties}
        handleChange={handleChange}
        dataOpen={dataOpen}
        setDataOpen={setDataOpen}
      />
      
      <QuadrantAppearanceSection 
        properties={properties}
        handleChange={handleChange}
        propertiesOpen={propertiesOpen}
        setPropertiesOpen={setPropertiesOpen}
      />
    </div>
  );
}
