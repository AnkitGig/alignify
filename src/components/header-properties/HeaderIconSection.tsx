
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';

interface HeaderIconSectionProps {
  showIcon: boolean;
  onIconToggle: (checked: boolean) => void;
}

export function HeaderIconSection({ showIcon, onIconToggle }: HeaderIconSectionProps) {
  const [showIconOptions, setShowIconOptions] = useState(false);

  return (
    <>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="font-medium text-sm flex items-center">
            Icon
            <Info className="h-3 w-3 ml-1 text-gray-400" />
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowIconOptions(!showIconOptions)}
            className="h-7 w-7 p-0"
          >
            {showIconOptions ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="show-icon" className="text-sm">Show icon</Label>
          <Switch 
            id="show-icon"
            checked={showIcon} 
            onCheckedChange={onIconToggle}
          />
        </div>
        
        {showIconOptions && showIcon && (
          <div className="space-y-3 pt-2">
            <div>
              <Label className="text-xs text-gray-500 mb-2 block">Icon Settings</Label>
              <p className="text-xs text-gray-400">Icon customization options will be available here</p>
            </div>
          </div>
        )}
      </div>
      <Separator />
    </>
  );
}
