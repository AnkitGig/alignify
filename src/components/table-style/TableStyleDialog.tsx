
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useWireframe } from "@/hooks/useWireframe";
import { Button } from "@/components/ui/button";
import { TableStyleOptions } from "./TableStyleOptions";

interface TableStyleDialogProps {
  elementId: string;
  open: boolean;
  onClose: () => void;
}

export function TableStyleDialog({ elementId, open, onClose }: TableStyleDialogProps) {
  const { elements, updateElementProperties } = useWireframe();
  const element = elements.find(e => e.id === elementId);
  
  if (!element) return null;
  
  const properties = element.properties || {};
  const {
    headerBackground = '#f3f4f6',
    headerTextColor = '#111827',
    cellBackground = '#ffffff',
    cellTextColor = '#374151',
    alternateRowColor = false,
    alternateRowBackground = '#f9fafb',
  } = properties;
  
  const [localHeaderBg, setLocalHeaderBg] = useState(headerBackground);
  const [localHeaderText, setLocalHeaderText] = useState(headerTextColor);
  const [localCellBg, setLocalCellBg] = useState(cellBackground);
  const [localCellText, setLocalCellText] = useState(cellTextColor);
  const [localAlternate, setLocalAlternate] = useState(alternateRowColor);
  const [localAlternateBg, setLocalAlternateBg] = useState(alternateRowBackground);
  
  const handleSave = () => {
    updateElementProperties(elementId, {
      headerBackground: localHeaderBg,
      headerTextColor: localHeaderText,
      cellBackground: localCellBg,
      cellTextColor: localCellText,
      alternateRowColor: localAlternate,
      alternateRowBackground: localAlternateBg,
    });
    onClose();
  };
  
  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) {
        onClose();
      }
    }}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Table Style Options</DialogTitle>
        </DialogHeader>
        
        <TableStyleOptions
          headerBackground={localHeaderBg}
          headerTextColor={localHeaderText}
          onHeaderBackgroundChange={setLocalHeaderBg}
          onHeaderTextColorChange={setLocalHeaderText}
          
          cellBackground={localCellBg}
          cellTextColor={localCellText}
          onCellBackgroundChange={setLocalCellBg}
          onCellTextColorChange={setLocalCellText}
          
          alternateRowColor={localAlternate}
          alternateRowBackground={localAlternateBg}
          onAlternateRowColorChange={setLocalAlternate}
          onAlternateRowBackgroundChange={setLocalAlternateBg}
        />
        
        <div className="pt-4 flex justify-end">
          <Button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
