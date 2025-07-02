
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { X, Settings } from "lucide-react";
import { Element } from "@/types/wireframe";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import { ChevronDown } from "./ChevronDown";

interface ShapePropertiesProps {
  element: Element;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
  toggleProperties: () => void;
  onOpenStyleDialog?: () => void;
}

export function ShapeProperties({ 
  element, 
  updateElementProperties, 
  toggleProperties,
  onOpenStyleDialog 
}: ShapePropertiesProps) {
  const properties = element.properties || {};
  const [textColor, setTextColor] = useState(properties.textColor || '#000000');
  const [shapeColor, setShapeColor] = useState(properties.shapeColor || '#9b87f5');
  const [borderColor, setBorderColor] = useState(properties.borderColor || '#e5e7eb');
  
  const shapeWidth = properties.shapeWidth || 60;
  const shapeHeight = properties.shapeHeight || 40;
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-base font-medium">Edit Shape</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-6 w-6 p-0" 
          onClick={() => toggleProperties()}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="border-t pt-4">
        <div className="space-y-3">
          <h4 className="text-sm font-semibold flex justify-between items-center">
            Shape Content
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <Settings className="h-3 w-3" />
            </Button>
          </h4>
          
          <div className="space-y-2">
            <Label htmlFor="title-toggle">Title</Label>
            <Switch 
              id="title-toggle" 
              checked={properties.showTitle !== false} 
              onCheckedChange={(checked) => 
                updateElementProperties(element.id, { showTitle: checked })
              } 
            />
          </div>
          
          {properties.showTitle !== false && (
            <div className="space-y-2">
              <Label htmlFor="title-text">Edit Text</Label>
              <Input 
                id="title-text" 
                value={properties.title || 'Title goes here'} 
                onChange={(e) => updateElementProperties(element.id, { title: e.target.value })}
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label className="block mb-1">Text Alignment</Label>
            <ToggleGroup type="single" value={properties.textAlignment || 'center'} 
              onValueChange={(value) => {
                if (value) updateElementProperties(element.id, { textAlignment: value as 'left' | 'center' | 'right' });
              }}
              className="justify-start border rounded-md p-1"
            >
              <ToggleGroupItem value="left" aria-label="Align left">
                <AlignLeft className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="center" aria-label="Align center">
                <AlignCenter className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="right" aria-label="Align right">
                <AlignRight className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          
          <div className="space-y-3 border-t pt-3">
            <h4 className="text-sm font-semibold">Shape Size</h4>
            
            <div className="space-y-2">
              <Label htmlFor="shape-width">Width: {shapeWidth}px</Label>
              <Slider
                id="shape-width"
                min={20}
                max={150}
                step={5}
                value={[shapeWidth]}
                onValueChange={([value]) => updateElementProperties(element.id, { shapeWidth: value })}
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="shape-height">Height: {shapeHeight}px</Label>
              <Slider
                id="shape-height"
                min={20}
                max={100}
                step={5}
                value={[shapeHeight]}
                onValueChange={([value]) => updateElementProperties(element.id, { shapeHeight: value })}
                className="w-full"
              />
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <Label htmlFor="shape-color">Shape Color</Label>
            <div className="flex items-center">
              <input 
                type="color" 
                id="shape-color" 
                value={shapeColor} 
                onChange={(e) => {
                  setShapeColor(e.target.value);
                  updateElementProperties(element.id, { shapeColor: e.target.value });
                }}
                className="w-8 h-8 cursor-pointer p-0 border-none mr-2"
              />
              <Input 
                value={shapeColor} 
                onChange={(e) => {
                  setShapeColor(e.target.value);
                  updateElementProperties(element.id, { shapeColor: e.target.value });
                }}
                className="w-24"
              />
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <Label htmlFor="text-color">Text Color</Label>
            <div className="flex items-center">
              <input 
                type="color" 
                id="text-color" 
                value={textColor} 
                onChange={(e) => {
                  setTextColor(e.target.value);
                  updateElementProperties(element.id, { textColor: e.target.value });
                }}
                className="w-8 h-8 cursor-pointer p-0 border-none mr-2"
              />
              <Input 
                value={textColor} 
                onChange={(e) => {
                  setTextColor(e.target.value);
                  updateElementProperties(element.id, { textColor: e.target.value });
                }}
                className="w-24"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="has-border">Border</Label>
            <Switch 
              id="has-border" 
              checked={properties.hasBorder === true} 
              onCheckedChange={(checked) => 
                updateElementProperties(element.id, { hasBorder: checked })
              }
            />
          </div>
          
          {properties.hasBorder && (
            <div className="flex justify-between items-center">
              <Label htmlFor="border-color">Border Color</Label>
              <div className="flex items-center">
                <input 
                  type="color" 
                  id="border-color" 
                  value={borderColor} 
                  onChange={(e) => {
                    setBorderColor(e.target.value);
                    updateElementProperties(element.id, { borderColor: e.target.value });
                  }}
                  className="w-8 h-8 cursor-pointer p-0 border-none mr-2"
                />
                <Input 
                  value={borderColor} 
                  onChange={(e) => {
                    setBorderColor(e.target.value);
                    updateElementProperties(element.id, { borderColor: e.target.value });
                  }}
                  className="w-24"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex flex-col space-y-2 mt-4 border-t pt-4">
        <Label className="text-sm font-semibold">Shape Style</Label>
        <div className="mt-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-between"
            onClick={onOpenStyleDialog}
          >
            {properties.shapeVariant === 'triangle' && 'Triangle'}
            {properties.shapeVariant === 'rectangle' && 'Rectangle'}
            {properties.shapeVariant === 'circle' && 'Circle'}
            {properties.shapeVariant === 'oval' && 'Oval'}
            {!properties.shapeVariant && 'Choose Shape Style'}
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-1">Double-click on the shape to change styles</p>
      </div>
    </div>
  );
}
