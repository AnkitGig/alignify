
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

interface HeaderTitleSectionProps {
  title: string;
  onTitleChange: (value: string) => void;
}

export function HeaderTitleSection({ title, onTitleChange }: HeaderTitleSectionProps) {
  return (
    <>
      <div className="space-y-2">
        <div className="font-medium text-sm">Title</div>
        <div>
          <Label htmlFor="header-title" className="text-xs text-gray-500 mb-1 block">
            Header Title
          </Label>
          <Input
            id="header-title"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="text-sm h-8"
            placeholder="Enter header title"
          />
        </div>
      </div>
      <Separator />
    </>
  );
}
