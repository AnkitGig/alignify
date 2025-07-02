
import React from 'react';
import { HeaderStyleSection } from './HeaderStyleSection';
import { CellStyleSection } from './CellStyleSection';
import { AlternateRowSection } from './AlternateRowSection';

interface TableStyleOptionsProps {
  // Header style props
  headerBackground: string;
  headerTextColor: string;
  onHeaderBackgroundChange: (value: string) => void;
  onHeaderTextColorChange: (value: string) => void;
  
  // Cell style props
  cellBackground: string;
  cellTextColor: string;
  onCellBackgroundChange: (value: string) => void;
  onCellTextColorChange: (value: string) => void;
  
  // Alternate row props
  alternateRowColor: boolean;
  alternateRowBackground: string;
  onAlternateRowColorChange: (checked: boolean) => void;
  onAlternateRowBackgroundChange: (value: string) => void;
}

export function TableStyleOptions({
  // Header props
  headerBackground,
  headerTextColor,
  onHeaderBackgroundChange,
  onHeaderTextColorChange,
  
  // Cell props
  cellBackground,
  cellTextColor,
  onCellBackgroundChange,
  onCellTextColorChange,
  
  // Alternate row props
  alternateRowColor,
  alternateRowBackground,
  onAlternateRowColorChange,
  onAlternateRowBackgroundChange
}: TableStyleOptionsProps) {
  return (
    <div className="space-y-4 py-4">
      <HeaderStyleSection 
        headerBackground={headerBackground}
        headerTextColor={headerTextColor}
        onHeaderBackgroundChange={onHeaderBackgroundChange}
        onHeaderTextColorChange={onHeaderTextColorChange}
      />

      <CellStyleSection
        cellBackground={cellBackground}
        cellTextColor={cellTextColor}
        onCellBackgroundChange={onCellBackgroundChange}
        onCellTextColorChange={onCellTextColorChange}
      />
      
      <AlternateRowSection
        alternateRowColor={alternateRowColor}
        alternateRowBackground={alternateRowBackground}
        onAlternateRowColorChange={onAlternateRowColorChange}
        onAlternateRowBackgroundChange={onAlternateRowBackgroundChange}
      />
    </div>
  );
}
