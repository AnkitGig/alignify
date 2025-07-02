
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { ChevronDown, ChevronUp, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

interface HeaderTextSectionProps {
  showText: boolean;
  textContent: string;
  textAlignment: string;
  fontWeight: string;
  showHighlightedText: boolean;
  onTextToggle: (checked: boolean) => void;
  onTextContentChange: (value: string) => void;
  onTextAlignmentChange: (alignment: string) => void;
  onFontWeightChange: (weight: string) => void;
  onHighlightedTextToggle: (checked: boolean) => void;
}

export function HeaderTextSection({
  showText,
  textContent,
  textAlignment,
  fontWeight,
  showHighlightedText,
  onTextToggle,
  onTextContentChange,
  onTextAlignmentChange,
  onFontWeightChange,
  onHighlightedTextToggle
}: HeaderTextSectionProps) {
  const [showTextOptions, setShowTextOptions] = useState(false);

  return (
    <>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="font-medium text-sm">Text</div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowTextOptions(!showTextOptions)}
            className="h-7 w-7 p-0"
          >
            {showTextOptions ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="show-text" className="text-sm">Show text</Label>
          <Switch 
            id="show-text"
            checked={showText} 
            onCheckedChange={onTextToggle}
          />
        </div>
        
        {showTextOptions && showText && (
          <div className="space-y-3 pt-2">
            <div>
              <Label className="text-xs text-gray-500 mb-2 block">Edit Text</Label>
              <Textarea
                value={textContent}
                onChange={(e) => onTextContentChange(e.target.value)}
                className="text-sm h-20 resize-none"
                placeholder="Some dummy description text"
              />
            </div>
            
            <div>
              <Label className="text-xs text-gray-500 mb-2 block">Alignment</Label>
              <div className="flex space-x-1">
                <Button
                  variant={textAlignment === 'left' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onTextAlignmentChange('left')}
                  className="h-8 w-8 p-0"
                >
                  <AlignLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant={textAlignment === 'center' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onTextAlignmentChange('center')}
                  className="h-8 w-8 p-0"
                >
                  <AlignCenter className="h-4 w-4" />
                </Button>
                <Button
                  variant={textAlignment === 'right' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onTextAlignmentChange('right')}
                  className="h-8 w-8 p-0"
                >
                  <AlignRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div>
              <Label className="text-xs text-gray-500 mb-2 block">Font Weight</Label>
              <div className="flex space-x-1">
                <Button
                  variant={fontWeight === 'normal' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onFontWeightChange('normal')}
                  className="h-8 px-3 text-sm font-normal"
                >
                  T
                </Button>
                <Button
                  variant={fontWeight === 'medium' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onFontWeightChange('medium')}
                  className="h-8 px-3 text-sm font-medium"
                >
                  T
                </Button>
                <Button
                  variant={fontWeight === 'bold' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onFontWeightChange('bold')}
                  className="h-8 px-3 text-sm font-bold"
                >
                  T
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="highlighted-text" className="text-sm">Highlighted Text</Label>
              <Switch 
                id="highlighted-text"
                checked={showHighlightedText} 
                onCheckedChange={onHighlightedTextToggle}
              />
            </div>
          </div>
        )}
      </div>
      <Separator />
    </>
  );
}
