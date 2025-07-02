
import React from "react";
import { Element, ChartVariant } from "@/types/wireframe";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ChartArea } from "lucide-react";

interface AreaChartPropertiesProps {
  element: Element;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
  onOpenStyleDialog?: () => void;
}

export const AreaChartProperties: React.FC<AreaChartPropertiesProps> = ({
  element,
  updateElementProperties,
  onOpenStyleDialog,
}) => {
  const properties = element.properties || {};
  const {
    chartTitle = "Title goes here",
    chartVariant = "basic-area" as ChartVariant,
    barColor = "#9b87f5",
    secondaryBarColor = "#D6BCFA",
    showLegend = true,
    showGridLines = true,
    showLabels = true,
    chartHeight = 200,
  } = properties;

  const handlePropertyChange = (key: string, value: any) => {
    updateElementProperties(element.id, { [key]: value });
  };

  return (
    <div className="p-4 space-y-6 overflow-auto">
      <div>
        <h2 className="text-lg font-medium">Area Chart Properties</h2>
        <p className="text-sm text-muted-foreground">
          Configure the area chart appearance and data
        </p>
      </div>

      <Separator />

      {onOpenStyleDialog && (
        <div className="space-y-2">
          <Label>Chart Style</Label>
          <Button 
            variant="outline" 
            className="w-full justify-start" 
            onClick={onOpenStyleDialog}
          >
            <ChartArea className="w-4 h-4 mr-2" />
            <span>Change chart style</span>
          </Button>
        </div>
      )}

      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="chartTitle">Chart Title</Label>
          <Input
            id="chartTitle"
            value={chartTitle}
            onChange={(e) => handlePropertyChange("chartTitle", e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="chartHeight">Chart Height</Label>
          <Input
            id="chartHeight"
            type="number"
            value={chartHeight}
            onChange={(e) => handlePropertyChange("chartHeight", parseInt(e.target.value) || 200)}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="barColor">Primary Color</Label>
            <div className="flex items-center gap-2">
              <div
                className="w-5 h-5 rounded border"
                style={{ backgroundColor: barColor }}
              />
              <Input
                id="barColor"
                type="color"
                value={barColor}
                onChange={(e) => handlePropertyChange("barColor", e.target.value)}
                className="w-full h-8 p-1"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="secondaryBarColor">Secondary Color</Label>
            <div className="flex items-center gap-2">
              <div
                className="w-5 h-5 rounded border"
                style={{ backgroundColor: secondaryBarColor }}
              />
              <Input
                id="secondaryBarColor"
                type="color"
                value={secondaryBarColor}
                onChange={(e) => handlePropertyChange("secondaryBarColor", e.target.value)}
                className="w-full h-8 p-1"
              />
            </div>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <h3 className="text-sm font-medium">Display Options</h3>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="showLegend" className="cursor-pointer">
            Show Legend
          </Label>
          <Switch
            id="showLegend"
            checked={showLegend}
            onCheckedChange={(checked) => handlePropertyChange("showLegend", checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="showGridLines" className="cursor-pointer">
            Show Grid Lines
          </Label>
          <Switch
            id="showGridLines"
            checked={showGridLines}
            onCheckedChange={(checked) => handlePropertyChange("showGridLines", checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="showLabels" className="cursor-pointer">
            Show Labels
          </Label>
          <Switch
            id="showLabels"
            checked={showLabels}
            onCheckedChange={(checked) => handlePropertyChange("showLabels", checked)}
          />
        </div>
      </div>
    </div>
  );
};
