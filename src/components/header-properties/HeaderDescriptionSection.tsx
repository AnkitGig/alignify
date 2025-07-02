
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface HeaderDescriptionSectionProps {
  description: string;
  onDescriptionChange: (value: string) => void;
}

export function HeaderDescriptionSection({ description, onDescriptionChange }: HeaderDescriptionSectionProps) {
  const [showDescriptionOptions, setShowDescriptionOptions] = useState(false);

  return (
    <>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="font-medium text-sm">Description</div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowDescriptionOptions(!showDescriptionOptions)}
            className="h-7 w-7 p-0"
          >
            {showDescriptionOptions ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>
        </div>
        
        {showDescriptionOptions && (
          <div className="space-y-2 pt-2">
            <Label htmlFor="header-description" className="text-xs text-gray-500 mb-1 block">
              Description Text
            </Label>
            <Textarea
              id="header-description"
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
              className="text-sm h-20 resize-none"
              placeholder="Enter description text"
            />
          </div>
        )}
      </div>
      <Separator />
    </>
  );
}
