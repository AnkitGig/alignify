
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { X, Settings } from "lucide-react";
import { Element } from "@/types/wireframe";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface ImagePropertiesProps {
  element: Element;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
  toggleProperties: () => void;
  updateImage: (id: string, imageUrl: string) => void;
}

export function ImageProperties({ 
  element, 
  updateElementProperties, 
  toggleProperties,
  updateImage
}: ImagePropertiesProps) {
  const properties = element.properties || {};
  const [borderColor, setBorderColor] = useState(properties.borderColor || '#e5e7eb');
  const imageFileInputRef = useRef<HTMLInputElement>(null);
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        updateImage(element.id, base64String);
        toast.success('Image uploaded successfully!');
      }
    };
    reader.readAsDataURL(file);
  };
  
  const triggerImageFileInput = () => {
    imageFileInputRef.current?.click();
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-base font-medium">Edit Image</h3>
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
            Image Content
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <Settings className="h-3 w-3" />
            </Button>
          </h4>
          
          <Button className="w-full" variant="outline" onClick={triggerImageFileInput}>
            {properties.imageUrl ? 'Change Image' : 'Upload Image'}
          </Button>
          <input 
            type="file" 
            ref={imageFileInputRef} 
            onChange={handleImageUpload}
            className="hidden" 
            accept="image/*" 
          />
          
          {properties.imageUrl && (
            <div className="mt-2 p-2 border rounded-md">
              <img 
                src={properties.imageUrl} 
                alt="Image Preview" 
                className="h-32 w-auto object-contain mx-auto"
              />
              <Button 
                className="w-full mt-2" 
                variant="destructive" 
                size="sm"
                onClick={() => updateImage(element.id, '')}
              >
                Remove
              </Button>
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="image-alt">Alt Text</Label>
            <Input 
              id="image-alt" 
              value={properties.imageAlt || ''} 
              placeholder="Describe the image for screen readers"
              onChange={(e) => updateElementProperties(element.id, { imageAlt: e.target.value })}
            />
          </div>
        </div>
      </div>
      
      <div className="border-t pt-4">
        <div className="space-y-3">
          <h4 className="text-sm font-semibold flex justify-between items-center">
            Style Properties
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <Settings className="h-3 w-3" />
            </Button>
          </h4>
          
          <div className="space-y-2">
            <Label htmlFor="image-fit">Image Fit</Label>
            <Select 
              value={properties.imageFit || 'contain'} 
              onValueChange={(value) => 
                updateElementProperties(element.id, { 
                  imageFit: value as 'contain' | 'cover' | 'fill' | 'none' | 'scale-down' 
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a fit style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="contain">Contain</SelectItem>
                <SelectItem value="cover">Cover</SelectItem>
                <SelectItem value="fill">Fill</SelectItem>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="scale-down">Scale Down</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">
              Choose how the image fits within its container
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="border-radius">Border Radius</Label>
            <Select 
              value={properties.borderRadius || 'md'} 
              onValueChange={(value) => 
                updateElementProperties(element.id, { 
                  borderRadius: value as 'none' | 'sm' | 'md' | 'lg' | 'full' 
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a border radius" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="sm">Small</SelectItem>
                <SelectItem value="md">Medium</SelectItem>
                <SelectItem value="lg">Large</SelectItem>
                <SelectItem value="full">Full (Circle)</SelectItem>
              </SelectContent>
            </Select>
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
          
          <div className="flex items-center justify-between">
            <Label htmlFor="has-shadow">Shadow</Label>
            <Switch 
              id="has-shadow" 
              checked={properties.hasShadow === true} 
              onCheckedChange={(checked) => 
                updateElementProperties(element.id, { hasShadow: checked })
              }
            />
          </div>
          
          {properties.hasShadow && (
            <div className="space-y-2">
              <Label htmlFor="shadow-size">Shadow Size</Label>
              <Select 
                value={properties.shadowSize || 'md'} 
                onValueChange={(value) => 
                  updateElementProperties(element.id, { 
                    shadowSize: value as 'sm' | 'md' | 'lg' | 'xl' 
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select shadow size" />
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
        </div>
      </div>
    </div>
  );
}
