
import React from "react";
import { Element } from "@/types/wireframe";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface TextboxPropertiesProps {
  element: Element;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
  toggleProperties: () => void;
  onOpenStyleDialog?: () => void;
}

export function TextboxProperties({ 
  element, 
  updateElementProperties, 
  toggleProperties,
  onOpenStyleDialog 
}: TextboxPropertiesProps) {
  const properties = element.properties || {};
  
  const handleChange = (field: string, value: any) => {
    updateElementProperties(element.id, { [field]: value });
  };

  return (
    <div className="text-sm space-y-6">
      <div className="flex justify-between items-center pb-2 border-b">
        <div className="font-semibold">Textbox Properties</div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-7 text-xs"
          onClick={() => onOpenStyleDialog?.()}
        >
          Choose style
        </Button>
      </div>
      
      {/* Content Section */}
      <div className="space-y-4">
        <div className="font-medium text-sm">Content</div>
        
        {/* Show Title Toggle */}
        <div className="flex items-center space-x-2">
          <Switch
            id="show-title"
            checked={properties.showTextboxTitle !== false}
            onCheckedChange={(checked) => handleChange('showTextboxTitle', checked)}
          />
          <Label htmlFor="show-title">Show Title</Label>
        </div>
        
        {/* Title Field */}
        {properties.showTextboxTitle !== false && (
          <div>
            <Label htmlFor="textbox-title">Title</Label>
            <Input
              id="textbox-title"
              value={properties.textboxTitle || 'Title goes here'}
              onChange={(e) => handleChange('textboxTitle', e.target.value)}
              className="mt-1"
            />
          </div>
        )}

        {/* Content Field */}
        <div>
          <Label htmlFor="textbox-content">Content</Label>
          <Textarea
            id="textbox-content"
            value={properties.textboxContent || 'Edit text in left pane...'}
            onChange={(e) => handleChange('textboxContent', e.target.value)}
            className="mt-1"
            rows={4}
          />
        </div>
      </div>

      <Separator />

      {/* Typography Section */}
      <div className="space-y-4">
        <div className="font-medium text-sm">Typography</div>
        
        {/* Text Alignment */}
        <div>
          <Label className="text-sm mb-3 block">Text Alignment</Label>
          <RadioGroup 
            value={properties.textAlignment || 'left'}
            onValueChange={(value) => handleChange('textAlignment', value)}
            className="grid grid-cols-2 gap-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="left" id="align-left" />
              <Label htmlFor="align-left" className="text-xs">Left</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="center" id="align-center" />
              <Label htmlFor="align-center" className="text-xs">Center</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="right" id="align-right" />
              <Label htmlFor="align-right" className="text-xs">Right</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="justify" id="align-justify" />
              <Label htmlFor="align-justify" className="text-xs">Justify</Label>
            </div>
          </RadioGroup>
        </div>
        
        {/* Font Family */}
        <div>
          <Label>Font Family</Label>
          <Select
            value={properties.fontFamily || 'inter'}
            onValueChange={(value) => handleChange('fontFamily', value)}
          >
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="inter">Inter</SelectItem>
              <SelectItem value="roboto">Roboto</SelectItem>
              <SelectItem value="open-sans">Open Sans</SelectItem>
              <SelectItem value="lato">Lato</SelectItem>
              <SelectItem value="montserrat">Montserrat</SelectItem>
              <SelectItem value="poppins">Poppins</SelectItem>
              <SelectItem value="source-sans">Source Sans Pro</SelectItem>
              <SelectItem value="nunito">Nunito</SelectItem>
              <SelectItem value="raleway">Raleway</SelectItem>
              <SelectItem value="merriweather">Merriweather</SelectItem>
              <SelectItem value="playfair">Playfair Display</SelectItem>
              <SelectItem value="crimson">Crimson Text</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Font Size */}
        <div>
          <Label className="text-sm mb-3 block">Font Size</Label>
          <RadioGroup 
            value={properties.fontSize || 'md'}
            onValueChange={(value) => handleChange('fontSize', value)}
            className="grid grid-cols-3 gap-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="xs" id="size-xs" />
              <Label htmlFor="size-xs" className="text-xs">XS</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sm" id="size-sm" />
              <Label htmlFor="size-sm" className="text-xs">SM</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="md" id="size-md" />
              <Label htmlFor="size-md" className="text-xs">MD</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="lg" id="size-lg" />
              <Label htmlFor="size-lg" className="text-xs">LG</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="xl" id="size-xl" />
              <Label htmlFor="size-xl" className="text-xs">XL</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="2xl" id="size-2xl" />
              <Label htmlFor="size-2xl" className="text-xs">2XL</Label>
            </div>
          </RadioGroup>
        </div>
        
        {/* Font Weight */}
        <div>
          <Label className="text-sm mb-3 block">Font Weight</Label>
          <RadioGroup 
            value={properties.fontWeight || 'normal'}
            onValueChange={(value) => handleChange('fontWeight', value)}
            className="grid grid-cols-3 gap-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="light" id="weight-light" />
              <Label htmlFor="weight-light" className="text-xs">Light</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="normal" id="weight-normal" />
              <Label htmlFor="weight-normal" className="text-xs">Normal</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="medium" id="weight-medium" />
              <Label htmlFor="weight-medium" className="text-xs">Medium</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="semibold" id="weight-semibold" />
              <Label htmlFor="weight-semibold" className="text-xs">Semi</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="bold" id="weight-bold" />
              <Label htmlFor="weight-bold" className="text-xs">Bold</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="extrabold" id="weight-extrabold" />
              <Label htmlFor="weight-extrabold" className="text-xs">Extra</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Line Height */}
        <div>
          <Label>Line Height</Label>
          <Select
            value={properties.lineHeight || 'normal'}
            onValueChange={(value) => handleChange('lineHeight', value)}
          >
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tight">Tight (1.25)</SelectItem>
              <SelectItem value="snug">Snug (1.375)</SelectItem>
              <SelectItem value="normal">Normal (1.5)</SelectItem>
              <SelectItem value="relaxed">Relaxed (1.625)</SelectItem>
              <SelectItem value="loose">Loose (2)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Letter Spacing */}
        <div>
          <Label>Letter Spacing</Label>
          <Select
            value={properties.letterSpacing || 'normal'}
            onValueChange={(value) => handleChange('letterSpacing', value)}
          >
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tighter">Tighter</SelectItem>
              <SelectItem value="tight">Tight</SelectItem>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="wide">Wide</SelectItem>
              <SelectItem value="wider">Wider</SelectItem>
              <SelectItem value="widest">Widest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator />

      {/* Colors Section */}
      <div className="space-y-4">
        <div className="font-medium text-sm">Colors</div>
        
        {/* Text Color */}
        <div>
          <Label htmlFor="text-color">Text Color</Label>
          <Input
            id="text-color"
            type="color"
            value={properties.textColor || '#000000'}
            onChange={(e) => handleChange('textColor', e.target.value)}
            className="mt-1 h-10 w-full"
          />
        </div>

        {/* Background Color */}
        <div>
          <Label htmlFor="bg-color">Background Color</Label>
          <Input
            id="bg-color"
            type="color"
            value={properties.backgroundColor || '#ffffff'}
            onChange={(e) => handleChange('backgroundColor', e.target.value)}
            className="mt-1 h-10 w-full"
          />
        </div>

        {/* Background Opacity */}
        <div>
          <Label>Background Opacity</Label>
          <div className="mt-2 px-2">
            <Slider
              value={[properties.backgroundOpacity || 100]}
              onValueChange={(value) => handleChange('backgroundOpacity', value[0])}
              max={100}
              step={1}
              className="w-full"
            />
            <div className="text-xs text-gray-500 mt-1">
              {properties.backgroundOpacity || 100}%
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Border & Spacing Section */}
      <div className="space-y-4">
        <div className="font-medium text-sm">Border & Spacing</div>
        
        {/* Border */}
        <div className="flex items-center space-x-2">
          <Switch
            id="show-border"
            checked={properties.showBorder || false}
            onCheckedChange={(checked) => handleChange('showBorder', checked)}
          />
          <Label htmlFor="show-border">Show Border</Label>
        </div>

        {properties.showBorder && (
          <>
            {/* Border Color */}
            <div>
              <Label htmlFor="border-color">Border Color</Label>
              <Input
                id="border-color"
                type="color"
                value={properties.borderColor || '#d1d5db'}
                onChange={(e) => handleChange('borderColor', e.target.value)}
                className="mt-1 h-10 w-full"
              />
            </div>

            {/* Border Width */}
            <div>
              <Label>Border Width</Label>
              <Select
                value={properties.borderWidth || '1'}
                onValueChange={(value) => handleChange('borderWidth', value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1px</SelectItem>
                  <SelectItem value="2">2px</SelectItem>
                  <SelectItem value="4">4px</SelectItem>
                  <SelectItem value="8">8px</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Border Style */}
            <div>
              <Label>Border Style</Label>
              <Select
                value={properties.borderStyle || 'solid'}
                onValueChange={(value) => handleChange('borderStyle', value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="solid">Solid</SelectItem>
                  <SelectItem value="dashed">Dashed</SelectItem>
                  <SelectItem value="dotted">Dotted</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        {/* Border Radius */}
        <div>
          <Label>Border Radius</Label>
          <Select
            value={properties.borderRadius || 'md'}
            onValueChange={(value) => handleChange('borderRadius', value)}
          >
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="sm">Small</SelectItem>
              <SelectItem value="md">Medium</SelectItem>
              <SelectItem value="lg">Large</SelectItem>
              <SelectItem value="xl">Extra Large</SelectItem>
              <SelectItem value="full">Full</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Padding */}
        <div>
          <Label>Padding</Label>
          <div className="mt-2 px-2">
            <Slider
              value={[properties.padding || 16]}
              onValueChange={(value) => handleChange('padding', value[0])}
              max={64}
              step={4}
              className="w-full"
            />
            <div className="text-xs text-gray-500 mt-1">
              {properties.padding || 16}px
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Effects Section */}
      <div className="space-y-4">
        <div className="font-medium text-sm">Effects</div>
        
        {/* Shadow */}
        <div className="flex items-center space-x-2">
          <Switch
            id="show-shadow"
            checked={properties.showShadow || false}
            onCheckedChange={(checked) => handleChange('showShadow', checked)}
          />
          <Label htmlFor="show-shadow">Drop Shadow</Label>
        </div>

        {properties.showShadow && (
          <div>
            <Label>Shadow Size</Label>
            <Select
              value={properties.shadowSize || 'md'}
              onValueChange={(value) => handleChange('shadowSize', value)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sm">Small</SelectItem>
                <SelectItem value="md">Medium</SelectItem>
                <SelectItem value="lg">Large</SelectItem>
                <SelectItem value="xl">Extra Large</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Text Decoration */}
        <div>
          <Label>Text Decoration</Label>
          <Select
            value={properties.textDecoration || 'none'}
            onValueChange={(value) => handleChange('textDecoration', value)}
          >
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="underline">Underline</SelectItem>
              <SelectItem value="line-through">Strike Through</SelectItem>
              <SelectItem value="overline">Overline</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Text Transform */}
        <div>
          <Label>Text Transform</Label>
          <Select
            value={properties.textTransform || 'none'}
            onValueChange={(value) => handleChange('textTransform', value)}
          >
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="uppercase">UPPERCASE</SelectItem>
              <SelectItem value="lowercase">lowercase</SelectItem>
              <SelectItem value="capitalize">Capitalize</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
