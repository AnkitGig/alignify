
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react';

interface HeaderNavigationButtonsSectionProps {
  showNavigationButtons: boolean;
  navigationButtons: Array<{title: string, active?: boolean}>;
  onNavigationButtonsToggle: (checked: boolean) => void;
  onNavigationButtonChange: (index: number, field: string, value: any) => void;
  onAddNavigationButton: () => void;
  onRemoveNavigationButton: (index: number) => void;
}

export function HeaderNavigationButtonsSection({
  showNavigationButtons,
  navigationButtons,
  onNavigationButtonsToggle,
  onNavigationButtonChange,
  onAddNavigationButton,
  onRemoveNavigationButton
}: HeaderNavigationButtonsSectionProps) {
  const [showButtonOptions, setShowButtonOptions] = useState(false);

  return (
    <>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="font-medium text-sm">Navigation Buttons</div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowButtonOptions(!showButtonOptions)}
            className="h-7 w-7 p-0"
          >
            {showButtonOptions ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="show-nav-buttons" className="text-sm">Show navigation buttons</Label>
          <Switch 
            id="show-nav-buttons"
            checked={showNavigationButtons} 
            onCheckedChange={onNavigationButtonsToggle}
          />
        </div>
        
        {showButtonOptions && showNavigationButtons && (
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between mb-2">
              <Label className="text-xs text-gray-500">Button Items</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={onAddNavigationButton}
                className="h-6 px-2"
              >
                <Plus size={12} className="mr-1" />
                Add
              </Button>
            </div>
            
            {navigationButtons.map((button, index) => (
              <div key={index} className="space-y-2 p-2 border rounded">
                <div className="flex items-center space-x-2">
                  <div className="flex-1">
                    <Label htmlFor={`button-title-${index}`} className="text-xs text-gray-500 mb-1 block">
                      Button {index + 1} Title
                    </Label>
                    <Input
                      id={`button-title-${index}`}
                      value={button.title}
                      onChange={(e) => onNavigationButtonChange(index, 'title', e.target.value)}
                      className="text-sm h-8"
                      placeholder={`Button ${index + 1}`}
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveNavigationButton(index)}
                    className="h-8 w-8 p-0 mt-5"
                  >
                    <Trash2 size={12} />
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor={`button-active-${index}`} className="text-xs">Active Button</Label>
                  <Switch 
                    id={`button-active-${index}`}
                    checked={button.active || false} 
                    onCheckedChange={(checked) => onNavigationButtonChange(index, 'active', checked)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Separator />
    </>
  );
}
