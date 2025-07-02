
import React, { useState } from 'react';
import { TableCellEditor } from "../table-properties/TableCellEditor";
import { Element } from "@/types/wireframe";
import { useWireframe } from "@/hooks/useWireframe";

export interface EditCellPosition {
  row: number;
  col: number;
}

interface TableCellEditingEngineProps {
  element: Element;
  localData: string[][];
  localHeaders: string[];
  isEditable: boolean;
}

export function TableCellEditingEngine({
  element,
  localData,
  localHeaders,
  isEditable
}: TableCellEditingEngineProps) {
  const { updateElementProperties } = useWireframe();
  const [editCell, setEditCell] = useState<EditCellPosition | null>(null);

  // Function to handle cell click
  const handleCellClick = (rowIndex: number, colIndex: number) => {
    if (isEditable) {
      setEditCell({ row: rowIndex, col: colIndex });
    }
  };

  // Function to handle header click
  const handleHeaderClick = (colIndex: number) => {
    if (isEditable) {
      setEditCell({ row: -1, col: colIndex });
    }
  };

  // Function to save cell data
  const handleSaveCell = (rowIndex: number, colIndex: number, value: string) => {
    const newData = [...localData];
    newData[rowIndex][colIndex] = value;
    setEditCell(null);
    
    // Update the wireframe state
    updateElementProperties(element.id, { tableData: newData });
  };

  // Function to save header data
  const handleSaveHeader = (colIndex: number, value: string) => {
    const newHeaders = [...localHeaders];
    newHeaders[colIndex] = value;
    setEditCell(null);
    
    // Update the wireframe state
    updateElementProperties(element.id, { tableHeaders: newHeaders });
  };

  return {
    editCell,
    handleCellClick,
    handleHeaderClick,
    handleSaveCell,
    handleSaveHeader
  };
}
