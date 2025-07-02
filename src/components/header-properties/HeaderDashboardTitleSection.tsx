
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface HeaderDashboardTitleSectionProps {
  showTitle: boolean;
  title: string;
  titleAlignment?: 'left' | 'center' | 'right';
  titleSize?: 'sm' | 'md' | 'lg' | 'xl';
  titleWeight?: 'normal' | 'medium' | 'semibold' | 'bold';
  onTitleToggle: (checked: boolean) => void;
  onTitleChange: (value: string) => void;
  onTitleAlignmentChange: (alignment: string) => void;
  onTitleSizeChange: (size: string) => void;
  onTitleWeightChange: (weight: string) => void;
}

export function HeaderDashboardTitleSection({
  showTitle,
  title,
  titleAlignment = 'left',
  titleSize = 'md',
  titleWeight = 'bold',
  onTitleToggle,
  onTitleChange,
  onTitleAlignmentChange,
  onTitleSizeChange,
  onTitleWeightChange
}: HeaderDashboardTitleSectionProps) {
  const [showTitleOptions, setShowTitleOptions] = useState(false);

  return (
    <>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="font-medium text-sm">Dashboard Title</div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowTitleOptions(!showTitleOptions)}
            className="h-7 w-7 p-0"
          >
            {showTitleOptions ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="show-title" className="text-sm">Show title</Label>
          <Switch 
            id="show-title"
            checked={showTitle} 
            onCheckedChange={onTitleToggle}
          />
        </div>
        
        {showTitleOptions && showTitle && (
          <div className="space-y-3 pt-2">
            <div className="space-y-2">
              <Label htmlFor="title-text" className="text-xs text-gray-500">Title Text</Label>
              <Input
                id="title-text"
                value={title}
                onChange={(e) => onTitleChange(e.target.value)}
                className="text-sm h-8"
                placeholder="Enter dashboard title"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-gray-500">Title Alignment</Label>
              <Select value={titleAlignment} onValueChange={onTitleAlignmentChange}>
                <SelectTrigger className="h-8">
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
              <Label className="text-xs text-gray-500">Title Size</Label>
              <Select value={titleSize} onValueChange={onTitleSizeChange}>
                <SelectTrigger className="h-8">
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
              <Label className="text-xs text-gray-500">Title Weight</Label>
              <Select value={titleWeight} onValueChange={onTitleWeightChange}>
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="semibold">Semi Bold</SelectItem>
                  <SelectItem value="bold">Bold</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>
      <Separator />
    </>
  );
}
