
import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ColorInput } from "./ColorInput";

interface AlternateRowSectionProps {
  alternateRowColor: boolean;
  alternateRowBackground: string;
  onAlternateRowColorChange: (checked: boolean) => void;
  onAlternateRowBackgroundChange: (value: string) => void;
}

export function AlternateRowSection({
  alternateRowColor,
  alternateRowBackground,
  onAlternateRowColorChange,
  onAlternateRowBackgroundChange
}: AlternateRowSectionProps) {
  return (
    <>
      <div className="pt-2">
        <div className="flex items-center space-x-2">
          <Switch
            id="alternateRows"
            checked={alternateRowColor}
            onCheckedChange={onAlternateRowColorChange}
          />
          <Label htmlFor="alternateRows">Alternate Row Colors</Label>
        </div>
      </div>

      {alternateRowColor && (
        <div>
          <Label htmlFor="alternateBg">Alternate Row Background</Label>
          <ColorInput
            id="alternateBg"
            value={alternateRowBackground}
            onChange={onAlternateRowBackgroundChange}
            label="Alternate Row Background Color"
          />
        </div>
      )}
    </>
  );
}
