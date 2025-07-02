
import React from 'react';
import { Label } from "@/components/ui/label";

interface TableCellColorEditorProps {
  cellBackground: string;
  onColorChange: (color: string) => void;
}

export function TableCellColorEditor({ 
  cellBackground = '#ffffff',
  onColorChange 
}: TableCellColorEditorProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="cellColor">Cell Background Color</Label>
      <div className="flex space-x-2">
        <input
          id="cellColor"
          type="color"
          value={cellBackground}
          onChange={(e) => onColorChange(e.target.value)}
          className="w-10 h-10 p-1 border rounded"
        />
        <input
          type="text"
          value={cellBackground}
          onChange={(e) => onColorChange(e.target.value)}
          className="flex-1 px-3 py-1 text-sm border rounded"
        />
      </div>
    </div>
  );
}
