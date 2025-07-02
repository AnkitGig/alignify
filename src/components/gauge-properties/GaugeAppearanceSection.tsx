
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ChevronDown } from "@/components/properties/ChevronDown";

interface GaugeAppearanceSectionProps {
  properties: Record<string, any>;
  handleChange: (field: string, value: any) => void;
  propertiesOpen: boolean;
  setPropertiesOpen: (open: boolean) => void;
}

export function GaugeAppearanceSection({ 
  properties, 
  handleChange, 
  propertiesOpen, 
  setPropertiesOpen 
}: GaugeAppearanceSectionProps) {
  return (
    <div className="border-b py-2">
      <div 
        className="flex justify-between items-center cursor-pointer" 
        onClick={() => setPropertiesOpen(!propertiesOpen)}
      >
        <span className="font-medium">Properties</span>
        <ChevronDown open={propertiesOpen} />
      </div>
      
      {propertiesOpen && (
        <div className="space-y-3 mt-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="showGaugeLabels">Labels</Label>
            <Switch 
              id="showGaugeLabels" 
              checked={properties.showGaugeLabels !== false}
              onCheckedChange={(checked) => handleChange('showGaugeLabels', checked)} 
            />
          </div>
          
          <div>
            <Label htmlFor="gaugePrimaryColor" className="text-xs">Primary Color</Label>
            <div className="flex mt-1">
              <input
                id="gaugePrimaryColor"
                type="color"
                value={properties.gaugePrimaryColor || "#4F46E5"}
                onChange={(e) => handleChange('gaugePrimaryColor', e.target.value)}
                className="w-8 h-8 p-1 border rounded-l-md"
              />
              <Input
                value={properties.gaugePrimaryColor || "#4F46E5"}
                onChange={(e) => handleChange('gaugePrimaryColor', e.target.value)}
                className="border rounded-l-none h-8"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="gaugeSecondaryColor" className="text-xs">Secondary Color</Label>
            <div className="flex mt-1">
              <input
                id="gaugeSecondaryColor"
                type="color"
                value={properties.gaugeSecondaryColor || "#E5E7EB"}
                onChange={(e) => handleChange('gaugeSecondaryColor', e.target.value)}
                className="w-8 h-8 p-1 border rounded-l-md"
              />
              <Input
                value={properties.gaugeSecondaryColor || "#E5E7EB"}
                onChange={(e) => handleChange('gaugeSecondaryColor', e.target.value)}
                className="border rounded-l-none h-8"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
