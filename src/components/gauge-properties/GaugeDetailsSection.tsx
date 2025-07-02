
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ChevronDown } from "@/components/properties/ChevronDown";

interface GaugeDetailsSectionProps {
  properties: Record<string, any>;
  handleChange: (field: string, value: any) => void;
  detailsOpen: boolean;
  setDetailsOpen: (open: boolean) => void;
}

export function GaugeDetailsSection({ 
  properties, 
  handleChange, 
  detailsOpen, 
  setDetailsOpen 
}: GaugeDetailsSectionProps) {
  return (
    <div className="border-b py-2">
      <div 
        className="flex justify-between items-center cursor-pointer" 
        onClick={() => setDetailsOpen(!detailsOpen)}
      >
        <span className="font-medium">Details</span>
        <ChevronDown open={detailsOpen} />
      </div>
      
      {detailsOpen && (
        <div className="space-y-3 mt-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="showTitle">Title</Label>
            <Switch 
              id="showTitle" 
              checked={properties.showTitle !== false}
              onCheckedChange={(checked) => handleChange('showTitle', checked)} 
            />
          </div>
          
          {properties.showTitle !== false && (
            <div>
              <Input
                id="chartTitle"
                value={properties.chartTitle || ""}
                onChange={(e) => handleChange('chartTitle', e.target.value)}
                placeholder="Enter chart title"
                className="border h-8 px-2"
              />
            </div>
          )}
          
          <div className="flex items-center justify-between gap-2">
            <Label>Alignment</Label>
            <div className="flex border rounded-md">
              <Button 
                type="button"
                variant={properties.textAlignment === 'left' ? 'secondary' : 'ghost'}
                className="px-2 h-7 rounded-none rounded-l-md"
                onClick={() => handleChange('textAlignment', 'left')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="14" y1="12" y2="12"/><line x1="3" x2="18" y1="18" y2="18"/></svg>
              </Button>
              <Button 
                type="button"
                variant={properties.textAlignment === 'center' ? 'secondary' : 'ghost'}
                className="px-2 h-7 rounded-none border-x"
                onClick={() => handleChange('textAlignment', 'center')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" x2="21" y1="6" y2="6"/><line x1="7" x2="17" y1="12" y2="12"/><line x1="5" x2="19" y1="18" y2="18"/></svg>
              </Button>
              <Button 
                type="button"
                variant={properties.textAlignment === 'right' ? 'secondary' : 'ghost'}
                className="px-2 h-7 rounded-none rounded-r-md"
                onClick={() => handleChange('textAlignment', 'right')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" x2="21" y1="6" y2="6"/><line x1="10" x2="21" y1="12" y2="12"/><line x1="6" x2="21" y1="18" y2="18"/></svg>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
