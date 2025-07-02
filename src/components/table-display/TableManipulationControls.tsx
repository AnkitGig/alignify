
import React from 'react';
import { Button } from "../ui/button";
import { Plus, Minus } from "lucide-react";
import { Element } from "@/types/wireframe";
import { useWireframe } from "@/hooks/useWireframe";

interface TableManipulationControlsProps {
  element: Element;
  localData: string[][];
  localHeaders: string[];
  showControls: boolean;
  isEditable: boolean;
}

export function TableManipulationControls({
  element,
  localData,
  localHeaders,
  showControls,
  isEditable
}: TableManipulationControlsProps) {
  const { updateElementProperties } = useWireframe();

  // Function to add a new row
  const handleAddRow = (index: number) => {
    const newData = [...localData];
    const newRow = Array(localHeaders.length).fill('New cell');
    newData.splice(index + 1, 0, newRow);
    
    // Update the wireframe state
    updateElementProperties(element.id, { 
      tableData: newData,
      numRows: newData.length
    });
  };

  // Function to delete a row
  const handleDeleteRow = (index: number) => {
    if (localData.length <= 1) return; // Prevent deleting the last row
    const newData = [...localData];
    newData.splice(index, 1);
    
    // Update the wireframe state
    updateElementProperties(element.id, { 
      tableData: newData,
      numRows: newData.length
    });
  };

  // Function to add a new column
  const handleAddColumn = (index: number) => {
    const newHeaders = [...localHeaders];
    newHeaders.splice(index + 1, 0, `New Header`);
    
    const newData = localData.map(row => {
      const newRow = [...row];
      newRow.splice(index + 1, 0, 'New cell');
      return newRow;
    });
    
    // Update the wireframe state
    updateElementProperties(element.id, { 
      tableHeaders: newHeaders,
      tableData: newData,
      numColumns: newHeaders.length
    });
  };

  // Function to delete a column
  const handleDeleteColumn = (index: number) => {
    if (localHeaders.length <= 1) return; // Prevent deleting the last column
    
    const newHeaders = [...localHeaders];
    newHeaders.splice(index, 1);
    
    const newData = localData.map(row => {
      const newRow = [...row];
      newRow.splice(index, 1);
      return newRow;
    });
    
    // Update the wireframe state
    updateElementProperties(element.id, { 
      tableHeaders: newHeaders,
      tableData: newData,
      numColumns: newHeaders.length
    });
  };

  // Render column controls above the table
  const renderColumnControls = () => {
    if (!isEditable || !showControls) return null;
    
    return (
      <div className="flex absolute -top-8 left-0 right-0 justify-around">
        {localHeaders.map((_, index) => (
          <div key={index} className="flex space-x-1">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-6 w-6 bg-white"
              onClick={() => handleAddColumn(index)}
            >
              <Plus className="h-3 w-3" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-6 w-6 bg-white"
              onClick={() => handleDeleteColumn(index)}
              disabled={localHeaders.length <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
          </div>
        ))}
      </div>
    );
  };

  // Cell manipulation controls for each row
  const renderRowControls = (rowIndex: number) => {
    if (!isEditable || !showControls) return null;
    
    return (
      <div className="flex flex-col space-y-1">
        <Button 
          variant="outline" 
          size="icon" 
          className="h-6 w-6"
          onClick={() => handleAddRow(rowIndex)}
        >
          <Plus className="h-3 w-3" />
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          className="h-6 w-6"
          onClick={() => handleDeleteRow(rowIndex)}
          disabled={localData.length <= 1}
        >
          <Minus className="h-3 w-3" />
        </Button>
      </div>
    );
  };

  return {
    renderColumnControls,
    renderRowControls
  };
}
