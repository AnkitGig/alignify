
import React from 'react';
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";

interface HeatmapStyleTemplateProps {
  template: {
    id: string;
    name: string;
    primaryColor: string;
    secondaryColor: string;
    display: React.ReactNode;
  };
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export const HeatmapStyleTemplate: React.FC<HeatmapStyleTemplateProps> = ({
  template,
  isSelected,
  onSelect
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <input 
          type="radio" 
          id={template.id} 
          value={template.id} 
          checked={isSelected}
          onChange={() => onSelect(template.id)}
          className="sr-only" 
        />
        <Label htmlFor={template.id} className="cursor-pointer w-full">
          <div 
            className={`border-2 rounded-md p-2 transition-all hover:border-gray-300 hover:shadow-sm ${
              isSelected ? 'border-indigo-600 shadow-sm' : 'border-gray-200'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className={`font-medium ${isSelected ? 'text-indigo-600' : ''}`}>
                {template.name}
              </span>
              {isSelected && (
                <div className="h-5 w-5 bg-indigo-600 rounded-full flex items-center justify-center">
                  <Check className="h-3 w-3 text-white" />
                </div>
              )}
            </div>
            {template.display}
          </div>
        </Label>
      </div>
    </div>
  );
};
