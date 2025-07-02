
import React from 'react';
import { Label } from "@/components/ui/label";
import { ColorInput } from "./ColorInput";

interface HeaderStyleSectionProps {
  headerBackground: string;
  headerTextColor: string;
  onHeaderBackgroundChange: (value: string) => void;
  onHeaderTextColorChange: (value: string) => void;
}

export function HeaderStyleSection({ 
  headerBackground,
  headerTextColor,
  onHeaderBackgroundChange,
  onHeaderTextColorChange
}: HeaderStyleSectionProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label htmlFor="headerBg">Header Background</Label>
        <ColorInput
          id="headerBg"
          value={headerBackground}
          onChange={onHeaderBackgroundChange}
          label="Header Background Color"
        />
      </div>
      <div>
        <Label htmlFor="headerText">Header Text</Label>
        <ColorInput
          id="headerText"
          value={headerTextColor}
          onChange={onHeaderTextColorChange}
          label="Header Text Color"
        />
      </div>
    </div>
  );
}
