
import React from 'react';
import { Label } from "@/components/ui/label";
import { ColorInput } from "./ColorInput";

interface CellStyleSectionProps {
  cellBackground: string;
  cellTextColor: string;
  onCellBackgroundChange: (value: string) => void;
  onCellTextColorChange: (value: string) => void;
}

export function CellStyleSection({
  cellBackground,
  cellTextColor,
  onCellBackgroundChange,
  onCellTextColorChange
}: CellStyleSectionProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label htmlFor="cellBg">Cell Background</Label>
        <ColorInput
          id="cellBg"
          value={cellBackground}
          onChange={onCellBackgroundChange}
          label="Cell Background Color"
        />
      </div>
      <div>
        <Label htmlFor="cellText">Cell Text</Label>
        <ColorInput
          id="cellText"
          value={cellTextColor}
          onChange={onCellTextColorChange}
          label="Cell Text Color"
        />
      </div>
    </div>
  );
}
