
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Minus } from "lucide-react";

interface TableHeadersEditorProps {
  tableHeaders: string[];
  onUpdateHeader: (index: number, value: string) => void;
  onAddColumn: () => void;
  onRemoveColumn: () => void;
}

export function TableHeadersEditor({ 
  tableHeaders, 
  onUpdateHeader, 
  onAddColumn, 
  onRemoveColumn 
}: TableHeadersEditorProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label>Headers</Label>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onRemoveColumn} 
            disabled={tableHeaders.length <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onAddColumn}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {tableHeaders.map((header, index) => (
          <Input
            key={index}
            value={header}
            onChange={(e) => onUpdateHeader(index, e.target.value)}
            className="text-sm"
          />
        ))}
      </div>
    </div>
  );
}
