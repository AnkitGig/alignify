
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X, Settings, ChevronDown, Settings2 } from "lucide-react";
import { Element } from "@/types/wireframe";
import { toast } from "sonner";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface HeaderPropertiesProps {
  element: Element;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
  toggleProperties: () => void;
  onOpenStyleDialog?: () => void;
  updateLogoImage: (id: string, logoUrl: string) => void;
}

export function HeaderProperties({ 
  element, 
  updateElementProperties, 
  toggleProperties,
  onOpenStyleDialog,
  updateLogoImage
}: HeaderPropertiesProps) {
  const properties = element.properties || {};
  const [backgroundColor, setBackgroundColor] = useState(properties.backgroundColor || '#ffffff');
  const [textColor, setTextColor] = useState(properties.textColor || '#000000');
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const currentVariant = properties.variant || 'default';
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check if the file is an image
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }
    
    // Convert to base64
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const base64String = event.target.result.toString();
        updateLogoImage(element.id, base64String);
        toast.success('Logo updated successfully!');
      }
    };
    reader.readAsDataURL(file);
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const getAdvancedPropertiesForVariant = () => {
    switch (currentVariant) {
      case 'with-metrics':
      case 'title-metrics':
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="show-metrics">Show Metrics</Label>
              <Switch
                id="show-metrics"
                checked={properties.showMetrics || false}
                onCheckedChange={(checked) => updateElementProperties(element.id, { showMetrics: checked })}
              />
            </div>
            
            {properties.showMetrics && (
              <div className="space-y-3">
                <Label className="text-sm font-medium">Metrics Configuration</Label>
                {(properties.metrics || []).map((metric: any, index: number) => (
                  <div key={index} className="grid grid-cols-2 gap-2">
                    <Input
                      placeholder="Metric title"
                      value={metric.title || ''}
                      onChange={(e) => {
                        const newMetrics = [...(properties.metrics || [])];
                        newMetrics[index] = { ...newMetrics[index], title: e.target.value };
                        updateElementProperties(element.id, { metrics: newMetrics });
                      }}
                    />
                    <Input
                      placeholder="Value"
                      value={metric.value || ''}
                      onChange={(e) => {
                        const newMetrics = [...(properties.metrics || [])];
                        newMetrics[index] = { ...newMetrics[index], value: e.target.value };
                        updateElementProperties(element.id, { metrics: newMetrics });
                      }}
                    />
                  </div>
                ))}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    const newMetrics = [...(properties.metrics || []), { title: `Metric ${(properties.metrics?.length || 0) + 1}`, value: '0' }];
                    updateElementProperties(element.id, { metrics: newMetrics });
                  }}
                >
                  Add Metric
                </Button>
              </div>
            )}
          </div>
        );

      case 'navigation-buttons':
      case 'navigation-top':
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="show-nav-buttons">Show Navigation Buttons</Label>
              <Switch
                id="show-nav-buttons"
                checked={properties.showNavigationButtons || false}
                onCheckedChange={(checked) => updateElementProperties(element.id, { showNavigationButtons: checked })}
              />
            </div>
            
            {properties.showNavigationButtons && (
              <div className="space-y-3">
                <Label className="text-sm font-medium">Navigation Buttons</Label>
                {(properties.navigationButtons || []).map((button: any, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      placeholder="Button title"
                      value={button.title || ''}
                      onChange={(e) => {
                        const newButtons = [...(properties.navigationButtons || [])];
                        newButtons[index] = { ...newButtons[index], title: e.target.value };
                        updateElementProperties(element.id, { navigationButtons: newButtons });
                      }}
                    />
                    <Switch
                      checked={button.active || false}
                      onCheckedChange={(checked) => {
                        const newButtons = [...(properties.navigationButtons || [])];
                        newButtons[index] = { ...newButtons[index], active: checked };
                        updateElementProperties(element.id, { navigationButtons: newButtons });
                      }}
                    />
                  </div>
                ))}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    const newButtons = [...(properties.navigationButtons || []), { title: `Nav ${(properties.navigationButtons?.length || 0) + 1}`, active: false }];
                    updateElementProperties(element.id, { navigationButtons: newButtons });
                  }}
                >
                  Add Navigation Button
                </Button>
              </div>
            )}
          </div>
        );

      case 'double-logo-purple':
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">  
              <Label htmlFor="show-double-logos">Show Double Logos</Label>
              <Switch
                id="show-double-logos"
                checked={properties.showDoubleLogos || false}
                onCheckedChange={(checked) => updateElementProperties(element.id, { showDoubleLogos: checked })}
              />
            </div>
            
            {properties.showDoubleLogos && (
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label>Secondary Logo</Label>
                  <Button className="w-full" variant="outline" onClick={() => {
                    // Handle secondary logo upload
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = 'image/*';
                    input.onchange = (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          if (event.target?.result) {
                            updateElementProperties(element.id, { secondaryLogoUrl: event.target.result.toString() });
                            toast.success('Secondary logo updated!');
                          }
                        };
                        reader.readAsDataURL(file);
                      }
                    };
                    input.click();
                  }}>
                    {properties.secondaryLogoUrl ? 'Change Secondary Logo' : 'Add Secondary Logo'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        );

      case 'centered-navigation-purple':
        return (
          <div className="space-y-3">
            <div className="space-y-2">
              <Label>Navigation Items</Label>
              {(properties.navigationItems || []).map((item: string, index: number) => (
                <Input
                  key={index}
                  placeholder={`Navigation ${index + 1}`}
                  value={item}
                  onChange={(e) => {
                    const newItems = [...(properties.navigationItems || [])];
                    newItems[index] = e.target.value;
                    updateElementProperties(element.id, { navigationItems: newItems });
                  }}
                />
              ))}
            </div>
          </div>
        );

      case 'minimal-title':
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="show-icon">Show Icon</Label>
              <Switch
                id="show-icon"
                checked={properties.showIcon || false}
                onCheckedChange={(checked) => updateElementProperties(element.id, { showIcon: checked })}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Title Alignment</Label>
              <Select 
                value={properties.titleAlignment || 'left'} 
                onValueChange={(value) => updateElementProperties(element.id, { titleAlignment: value as 'left' | 'center' | 'right' })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Title Size</Label>
              <Select 
                value={properties.titleSize || 'md'} 
                onValueChange={(value) => updateElementProperties(element.id, { titleSize: value as 'sm' | 'md' | 'lg' | 'xl' })}
              >
                <SelectTrigger>
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
            
            <div className="space-y-2">
              <Label>Title Weight</Label>
              <Select 
                value={properties.titleWeight || 'bold'} 
                onValueChange={(value) => updateElementProperties(element.id, { titleWeight: value as 'normal' | 'medium' | 'semibold' | 'bold' })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="semibold">Semibold</SelectItem>
                  <SelectItem value="bold">Bold</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-3">
            <div className="space-y-2">
              <Label>Title Alignment</Label>
              <Select 
                value={properties.titleAlignment || 'left'} 
                onValueChange={(value) => updateElementProperties(element.id, { titleAlignment: value as 'left' | 'center' | 'right' })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
    }
  };
    
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-base font-medium">Edit header</h3>
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
            Details
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <Settings className="h-3 w-3" />
            </Button>
          </h4>
          
          <div className="flex justify-between items-center">
            <Label htmlFor="title-toggle">Title</Label>
            <Switch 
              id="title-toggle" 
              checked={properties.title !== ''} 
              onCheckedChange={(checked) => 
                updateElementProperties(element.id, { title: checked ? 'DASHBOARD TITLE' : '' })
              } 
            />
          </div>
          
          {properties.title !== '' && (
            <div className="space-y-2">
              <Label htmlFor="title-text">Edit Text</Label>
              <Input 
                id="title-text" 
                value={properties.title || 'DASHBOARD TITLE'} 
                onChange={(e) => updateElementProperties(element.id, { title: e.target.value })}
              />
            </div>
          )}
          
          {properties.variant !== 'minimal' && (
            <div className="flex justify-between items-center">
              <Label htmlFor="logo-toggle">Primary Logo</Label>
              <Switch 
                id="logo-toggle" 
                checked={properties.showLogo === true} 
                onCheckedChange={(checked) => 
                  updateElementProperties(element.id, { showLogo: checked })
                } 
              />
            </div>
          )}
          
          {properties.showLogo && properties.variant !== 'minimal' && (
            <>
              <Button className="w-full" variant="outline" onClick={triggerFileInput}>
                {properties.logoUrl ? 'Change Image' : 'Add Image'}
              </Button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange}
                className="hidden" 
                accept="image/*" 
              />
              {properties.logoUrl && (
                <div className="mt-2 p-2 border rounded-md">
                  <img 
                    src={properties.logoUrl} 
                    alt="Logo Preview" 
                    className="h-12 w-auto object-contain mx-auto"
                  />
                  <Button 
                    className="w-full mt-2" 
                    variant="destructive" 
                    size="sm"
                    onClick={() => updateLogoImage(element.id, '')}
                  >
                    Remove
                  </Button>
                </div>
              )}
            </>
          )}
          
          {properties.variant === 'with-description' && (
            <div className="space-y-2">
              <Label htmlFor="description-text">Description</Label>
              <Textarea 
                id="description-text" 
                value={properties.description || ''} 
                onChange={(e) => updateElementProperties(element.id, { description: e.target.value })}
                placeholder="Enter description"
                className="h-20"
              />
            </div>
          )}
        </div>
      </div>

      {/* Advanced Options Section */}
      <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between p-3 h-auto border-t pt-4">
            <div className="flex items-center gap-2">
              <Settings2 className="h-4 w-4" />
              <span className="font-medium">Advanced Options</span>
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform ${advancedOpen ? 'rotate-180' : ''}`} />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 pt-2">
          {getAdvancedPropertiesForVariant()}
        </CollapsibleContent>
      </Collapsible>
      
      <div className="border-t pt-4">
        <div className="space-y-3">
          <h4 className="text-sm font-semibold flex justify-between items-center">
            Properties
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <Settings className="h-3 w-3" />
            </Button>
          </h4>
          
          {properties.variant !== 'gradient' && properties.variant !== 'colorful-banner' && (
            <div className="flex justify-between items-center">
              <Label htmlFor="bg-color">Background Color</Label>
              <div className="flex items-center">
                <input 
                  type="color" 
                  id="bg-color" 
                  value={backgroundColor} 
                  onChange={(e) => {
                    setBackgroundColor(e.target.value);
                    updateElementProperties(element.id, { backgroundColor: e.target.value });
                  }}
                  className="w-8 h-8 cursor-pointer p-0 border-none mr-2"
                />
                <Input 
                  value={backgroundColor} 
                  onChange={(e) => {
                    setBackgroundColor(e.target.value);
                    updateElementProperties(element.id, { backgroundColor: e.target.value });
                  }}
                  className="w-24"
                />
              </div>
            </div>
          )}
          
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
          
          {!['centered-navigation-purple', 'navigation-top', 'dark-navigation', 'minimal'].includes(properties.variant || '') && (
            <div className="flex items-center justify-between">
              <Label htmlFor="nav-toggle">Navigation Buttons</Label>
              <Switch 
                id="nav-toggle" 
                checked={properties.showNavigation === true} 
                onCheckedChange={(checked) => 
                  updateElementProperties(element.id, { showNavigation: checked })
                } 
              />
            </div>
          )}
        </div>
      </div>
      
      <div className="flex flex-col space-y-2 mt-4 border-t pt-4">
        <Label className="text-sm font-semibold">Header Style</Label>
        <div className="mt-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-between"
            onClick={onOpenStyleDialog}
          >
            {properties.variant === 'default' && 'Default'}
            {properties.variant === 'with-description' && 'With Description'}
            {properties.variant === 'with-metrics' && 'With Metrics'}
            {properties.variant === 'centered-navigation-purple' && 'Centered Navigation (Purple)'}
            {properties.variant === 'navigation-top' && 'Top Navigation'}
            {properties.variant === 'double-logo-purple' && 'Double Logo (Purple)'}
            {properties.variant === 'dark-navigation' && 'Dark Navigation'}
            {properties.variant === 'gradient' && 'Gradient'}
            {properties.variant === 'minimal' && 'Minimal'}
            {properties.variant === 'colorful-banner' && 'Colorful Banner'}
            {!properties.variant && 'Choose Header Style'}
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-1">Double-click on the header to change styles</p>
      </div>
    </div>
  );
}
