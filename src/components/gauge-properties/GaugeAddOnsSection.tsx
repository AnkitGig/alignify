
import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ChevronDown } from "@/components/properties/ChevronDown";

interface GaugeAddOnsSectionProps {
  properties: Record<string, any>;
  handleChange: (field: string, value: any) => void;
  addOnsOpen: boolean;
  setAddOnsOpen: (open: boolean) => void;
}

export function GaugeAddOnsSection({ 
  properties, 
  handleChange, 
  addOnsOpen, 
  setAddOnsOpen 
}: GaugeAddOnsSectionProps) {
  return (
    <div className="py-2">
      <div 
        className="flex justify-between items-center cursor-pointer" 
        onClick={() => setAddOnsOpen(!addOnsOpen)}
      >
        <span className="font-medium">Add Ons</span>
        <ChevronDown open={addOnsOpen} />
      </div>
      
      {addOnsOpen && (
        <div className="space-y-3 mt-2">
          <div className="border-b pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mr-1.5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                <Label>Buttons</Label>
              </div>
              <Switch 
                id="showButtons" 
                checked={properties.showButtons === true}
                onCheckedChange={(checked) => handleChange('showButtons', checked)} 
              />
            </div>
          </div>
          
          <div className="border-b pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mr-1.5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                <Label>Dropdowns</Label>
              </div>
              <Switch 
                id="showDropdowns" 
                checked={properties.showDropdowns === true}
                onCheckedChange={(checked) => handleChange('showDropdowns', checked)} 
              />
            </div>
          </div>
          
          <div className="border-b pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mr-1.5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                <Label>KPIs</Label>
              </div>
              <Switch 
                id="showKpis" 
                checked={properties.showKpis === true}
                onCheckedChange={(checked) => handleChange('showKpis', checked)} 
              />
            </div>
          </div>
          
          <div className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mr-1.5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                <Label>Text</Label>
              </div>
              <Switch 
                id="showText" 
                checked={properties.showText === true}
                onCheckedChange={(checked) => handleChange('showText', checked)} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
