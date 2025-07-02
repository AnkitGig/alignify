
import React from 'react';
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Element } from "@/types/wireframe";

interface DefaultPropertiesProps {
  element: Element;
  toggleProperties: () => void;
  onOpenStyleDialog?: () => void;
}

export function DefaultProperties({ 
  element, 
  toggleProperties, 
  onOpenStyleDialog 
}: DefaultPropertiesProps) {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Properties</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0" 
          onClick={() => toggleProperties()}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <p className="text-gray-500 mt-2">Edit {element.type} properties</p>
      {onOpenStyleDialog && (
        <Button 
          className="w-full mt-4" 
          variant="outline"
          onClick={onOpenStyleDialog}
        >
          Open Style Editor
        </Button>
      )}
    </div>
  );
}
