
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useWireframe } from "@/hooks/useWireframe";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

interface TextboxStyleDialogProps {
  elementId: string;
  open: boolean;
  onClose: () => void;
}

export function TextboxStyleDialog({ elementId, open, onClose }: TextboxStyleDialogProps) {
  const { elements, updateElementProperties } = useWireframe();
  const element = elements.find(el => el.id === elementId);
  
  const [title, setTitle] = useState(element?.properties?.textboxTitle || 'Title goes here');
  const [content, setContent] = useState(element?.properties?.textboxContent || 'Edit text in left pane...');
  const [showTitle, setShowTitle] = useState(element?.properties?.showTextboxTitle !== false);
  const [textAlignment, setTextAlignment] = useState<'left' | 'center' | 'right'>(
    (element?.properties?.textAlignment as any) || 'left'
  );
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg' | 'xl'>(
    (element?.properties?.fontSize as any) || 'md'
  );
  const [fontWeight, setFontWeight] = useState<'normal' | 'medium' | 'bold'>(
    (element?.properties?.fontWeight as any) || 'normal'
  );
  
  const handleSave = () => {
    updateElementProperties(elementId, {
      textboxTitle: title,
      textboxContent: content,
      showTextboxTitle: showTitle,
      textAlignment,
      fontSize,
      fontWeight,
    });
    onClose();
  };
  
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Textbox Style</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="content">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="style">Style</TabsTrigger>
          </TabsList>
          
          <TabsContent value="content" className="space-y-4">
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="show-title"
                    checked={showTitle}
                    onCheckedChange={setShowTitle}
                  />
                  <Label htmlFor="show-title">Show Title</Label>
                </div>
                
                {showTitle && (
                  <div>
                    <Label htmlFor="textbox-title">Title</Label>
                    <Input
                      id="textbox-title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="textbox-content">Content</Label>
                <Textarea
                  id="textbox-content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="mt-1"
                  rows={5}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="style" className="space-y-4">
            <div className="space-y-4 pt-4">
              <div>
                <Label>Text Alignment</Label>
                <RadioGroup 
                  value={textAlignment}
                  onValueChange={(value: any) => setTextAlignment(value)}
                  className="flex space-x-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="left" id="align-left" />
                    <Label htmlFor="align-left">Left</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="center" id="align-center" />
                    <Label htmlFor="align-center">Center</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="right" id="align-right" />
                    <Label htmlFor="align-right">Right</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <Label>Font Size</Label>
                <RadioGroup 
                  value={fontSize}
                  onValueChange={(value: any) => setFontSize(value)}
                  className="flex space-x-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sm" id="size-sm" />
                    <Label htmlFor="size-sm">Small</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="md" id="size-md" />
                    <Label htmlFor="size-md">Medium</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="lg" id="size-lg" />
                    <Label htmlFor="size-lg">Large</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="xl" id="size-xl" />
                    <Label htmlFor="size-xl">XL</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <Label>Font Weight</Label>
                <RadioGroup 
                  value={fontWeight}
                  onValueChange={(value: any) => setFontWeight(value)}
                  className="flex space-x-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="normal" id="weight-normal" />
                    <Label htmlFor="weight-normal">Normal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="weight-medium" />
                    <Label htmlFor="weight-medium">Medium</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bold" id="weight-bold" />
                    <Label htmlFor="weight-bold">Bold</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6">
          <Label>Preview</Label>
          <div className="mt-2 p-4 border rounded-md bg-gray-50">
            <div style={{ textAlign: textAlignment }}>
              {showTitle && (
                <h3 className={`mb-2 ${fontSize === 'sm' ? 'text-sm' : fontSize === 'lg' ? 'text-lg' : fontSize === 'xl' ? 'text-xl' : 'text-base'} ${fontWeight === 'normal' ? 'font-normal' : fontWeight === 'medium' ? 'font-medium' : 'font-bold'}`}>
                  {title}
                </h3>
              )}
              <div className={`${fontSize === 'sm' ? 'text-sm' : fontSize === 'lg' ? 'text-lg' : fontSize === 'xl' ? 'text-xl' : 'text-base'} ${fontWeight === 'normal' ? 'font-normal' : fontWeight === 'medium' ? 'font-medium' : 'font-bold'}`}>
                {content}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Apply</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
