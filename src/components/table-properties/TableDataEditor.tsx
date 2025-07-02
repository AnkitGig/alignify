
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Minus } from "lucide-react";

interface TableDataEditorProps {
  tableData: string[][];
  numColumns: number;
  onUpdateCell: (rowIndex: number, colIndex: number, value: string) => void;
  onAddRow: () => void;
  onRemoveRow: () => void;
}

export function TableDataEditor({ 
  tableData, 
  numColumns, 
  onUpdateCell, 
  onAddRow, 
  onRemoveRow 
}: TableDataEditorProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label>Table Data</Label>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onRemoveRow}
            disabled={tableData.length <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onAddRow}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="max-h-64 overflow-y-auto space-y-2">
        {tableData.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-3 gap-2">
            {Array.from({ length: numColumns }).map((_, colIndex) => (
              <Input
                key={colIndex}
                value={row[colIndex] || ''}
                onChange={(e) => onUpdateCell(rowIndex, colIndex, e.target.value)}
                className="text-sm"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
