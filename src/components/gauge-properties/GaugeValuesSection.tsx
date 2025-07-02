
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ChevronDown } from "@/components/properties/ChevronDown";

interface GaugeValuesSectionProps {
  properties: Record<string, any>;
  handleChange: (field: string, value: any) => void;
  numericHandler: (field: string, value: string) => void;
  valuesOpen: boolean;
  setValuesOpen: (open: boolean) => void;
}

export function GaugeValuesSection({ 
  properties, 
  handleChange, 
  numericHandler,
  valuesOpen, 
  setValuesOpen 
}: GaugeValuesSectionProps) {
  return (
    <div className="border-b py-2">
      <div 
        className="flex justify-between items-center cursor-pointer" 
        onClick={() => setValuesOpen(!valuesOpen)}
      >
        <span className="font-medium">Values</span>
        <ChevronDown open={valuesOpen} />
      </div>
      
      {valuesOpen && (
        <div className="space-y-3 mt-2">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="gaugeValue" className="text-xs">Start Value</Label>
              <Input
                id="gaugeValue"
                value={properties.gaugeValue || ""}
                onChange={(e) => numericHandler('gaugeValue', e.target.value)}
                placeholder="40"
                className="border h-8 px-2 mt-1"
              />
            </div>
            <div>
              <Label htmlFor="gaugeMax" className="text-xs">End Value</Label>
              <Input
                id="gaugeMax"
                value={properties.gaugeMax || ""}
                onChange={(e) => numericHandler('gaugeMax', e.target.value)}
                placeholder="100"
                className="border h-8 px-2 mt-1"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="gaugeMin" className="text-xs">Min</Label>
              <Input
                id="gaugeMin"
                value={properties.gaugeMin || ""}
                onChange={(e) => numericHandler('gaugeMin', e.target.value)}
                placeholder="0"
                className="border h-8 px-2 mt-1"
              />
            </div>
            <div>
              <Label htmlFor="gaugeMaxDisplay" className="text-xs">Max</Label>
              <Input
                id="gaugeMaxDisplay"
                value={properties.gaugeMaxDisplay || ""}
                onChange={(e) => numericHandler('gaugeMaxDisplay', e.target.value)}
                placeholder="100"
                className="border h-8 px-2 mt-1"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="gaugeUnits" className="text-xs">Units</Label>
            <Input
              id="gaugeUnits"
              value={properties.gaugeUnits || ""}
              onChange={(e) => handleChange('gaugeUnits', e.target.value)}
              placeholder="K"
              className="border h-8 px-2 mt-1"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="showGaugeNeedle">Needle</Label>
            <Switch 
              id="showGaugeNeedle" 
              checked={properties.showGaugeNeedle !== false}
              onCheckedChange={(checked) => handleChange('showGaugeNeedle', checked)} 
            />
          </div>
          
          {properties.showGaugeNeedle !== false && (
            <div>
              <Label htmlFor="gaugeNeedleValue" className="text-xs">Edit Needle</Label>
              <Input
                id="gaugeNeedleValue"
                value={properties.gaugeValue || ""}
                onChange={(e) => numericHandler('gaugeValue', e.target.value)}
                placeholder="40"
                className="border h-8 px-2 mt-1"
              />
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <Label htmlFor="showGaugeTarget">Target</Label>
            <Switch 
              id="showGaugeTarget" 
              checked={properties.showGaugeTarget !== false}
              onCheckedChange={(checked) => handleChange('showGaugeTarget', checked)} 
            />
          </div>
          
          {properties.showGaugeTarget !== false && (
            <div>
              <Label htmlFor="gaugeTarget" className="text-xs">Edit Target</Label>
              <Input
                id="gaugeTarget"
                value={properties.gaugeTarget || ""}
                onChange={(e) => numericHandler('gaugeTarget', e.target.value)}
                placeholder="50"
                className="border h-8 px-2 mt-1"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
