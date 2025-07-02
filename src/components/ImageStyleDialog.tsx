
import { useState, useRef } from "react";
import { useWireframe } from "@/hooks/useWireframe";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ImageStyleDialogProps {
  elementId: string;
  open: boolean;
  onClose: () => void;
}

export function ImageStyleDialog({ elementId, open, onClose }: ImageStyleDialogProps) {
  const { elements, updateElementProperties, updateImage } = useWireframe();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const element = elements.find(el => el.id === elementId);
  const properties = element?.properties || {};
  
  const [borderColor, setBorderColor] = useState(properties.borderColor || '#e5e7eb');
  
  if (!element) return null;
  
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
        updateImage(elementId, base64String);
        toast.success('Image uploaded successfully!');
      }
    };
    reader.readAsDataURL(file);
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Image Style</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="content">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="style">Style</TabsTrigger>
          </TabsList>
          
          <TabsContent value="content" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="image-upload">Upload Image</Label>
              <Button className="w-full" variant="outline" onClick={triggerFileInput}>
                {properties.imageUrl ? 'Change Image' : 'Upload Image'}
              </Button>
              <input 
                type="file" 
                id="image-upload"
                ref={fileInputRef} 
                onChange={handleFileChange}
                className="hidden" 
                accept="image/*" 
              />
              {properties.imageUrl && (
                <div className="mt-2 p-2 border rounded-md">
                  <img 
                    src={properties.imageUrl} 
                    alt="Preview" 
                    className="h-32 w-auto object-contain mx-auto"
                  />
                  <Button 
                    className="w-full mt-2" 
                    variant="destructive" 
                    size="sm"
                    onClick={() => updateImage(elementId, '')}
                  >
                    Remove Image
                  </Button>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image-alt">Alt Text (Accessibility)</Label>
              <Input 
                id="image-alt" 
                value={properties.imageAlt || ''} 
                placeholder="Describe the image for screen readers"
                onChange={(e) => updateElementProperties(elementId, { imageAlt: e.target.value })}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="style" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="image-fit">Image Fit</Label>
              <Select 
                value={properties.imageFit || 'contain'} 
                onValueChange={(value) => 
                  updateElementProperties(elementId, { 
                    imageFit: value as 'contain' | 'cover' | 'fill' | 'none' | 'scale-down' 
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a fit style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="contain">Contain (Preserve aspect ratio)</SelectItem>
                  <SelectItem value="cover">Cover (Fill space, may crop)</SelectItem>
                  <SelectItem value="fill">Fill (Stretch to fill)</SelectItem>
                  <SelectItem value="none">None (Original size)</SelectItem>
                  <SelectItem value="scale-down">Scale Down (Smaller of contain or none)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">Choose how the image fits within its container</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="border-radius">Border Radius</Label>
              <Select 
                value={properties.borderRadius || 'md'} 
                onValueChange={(value) => 
                  updateElementProperties(elementId, { 
                    borderRadius: value as 'none' | 'sm' | 'md' | 'lg' | 'full' 
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a border radius" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None (Square corners)</SelectItem>
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
                  updateElementProperties(elementId, { hasBorder: checked })
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
                      updateElementProperties(elementId, { borderColor: e.target.value });
                    }}
                    className="w-8 h-8 cursor-pointer p-0 border-none mr-2"
                  />
                  <Input 
                    value={borderColor} 
                    onChange={(e) => {
                      setBorderColor(e.target.value);
                      updateElementProperties(elementId, { borderColor: e.target.value });
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
                  updateElementProperties(elementId, { hasShadow: checked })
                }
              />
            </div>
            
            {properties.hasShadow && (
              <div className="space-y-2">
                <Label htmlFor="shadow-size">Shadow Size</Label>
                <Select 
                  value={properties.shadowSize || 'md'} 
                  onValueChange={(value) => 
                    updateElementProperties(elementId, { 
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
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end mt-4">
          <Button onClick={onClose}>Done</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
