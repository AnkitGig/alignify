
import React, { useState } from 'react';
import { Element } from "@/types/wireframe";
import { Table } from "@/components/ui/table";
import { TableCellEditingEngine } from "./table-display/TableCellEditingEngine";
import { TableManipulationControls } from "./table-display/TableManipulationControls";
import { TableHeaderComponent } from "./table-display/TableHeader";
import { TableBodyComponent } from "./table-display/TableBody";
import { useWireframe } from "@/hooks/useWireframe";

interface TableDisplayProps {
  element: Element;
  isEditable?: boolean;
}

export function TableDisplay({ element, isEditable = false }: TableDisplayProps) {
  // Extract table properties from element
  const {
    tableTitle,
    tableHeaders = ['Header 1', 'Header 2', 'Header 3'],
    tableData = [
      ['Data 1', 'Data 2', 'Data 3'],
      ['Data 4', 'Data 5', 'Data 6'],
      ['Data 7', 'Data 8', 'Data 9'],
    ],
    showTableBorder = true,
    headerBackground = '#f3f4f6',
    headerTextColor = '#111827',
    cellBackground = '#ffffff',
    cellTextColor = '#374151',
    alternateRowColor = false,
    alternateRowBackground = '#f9fafb',
  } = element.properties || {};

  // State for local data and UI controls
  const [localData, setLocalData] = useState(tableData);
  const [localHeaders, setLocalHeaders] = useState(tableHeaders);
  const [showControls, setShowControls] = useState(false);

  // Use the editing engine hook
  const {
    editCell,
    handleCellClick,
    handleHeaderClick,
    handleSaveCell,
    handleSaveHeader
  } = TableCellEditingEngine({
    element,
    localData, 
    localHeaders,
    isEditable
  });

  // Use the table manipulation controls
  const {
    renderColumnControls,
    renderRowControls
  } = TableManipulationControls({
    element,
    localData,
    localHeaders,
    showControls,
    isEditable
  });

  // Update local state when props change
  React.useEffect(() => {
    setLocalData(tableData);
    setLocalHeaders(tableHeaders);
  }, [tableData, tableHeaders]);

  return (
    <div className="w-full h-full p-2 overflow-auto relative"
         onMouseEnter={() => isEditable && setShowControls(true)}
         onMouseLeave={() => setShowControls(false)}>
      {tableTitle && (
        <div className="text-base font-medium mb-2">{tableTitle}</div>
      )}
      
      <div className="relative">
        {renderColumnControls()}
        
        <Table className={showTableBorder ? 'border border-gray-200' : ''}>
          <TableHeaderComponent 
            headers={localHeaders}
            headerBackground={headerBackground}
            headerTextColor={headerTextColor}
            showTableBorder={showTableBorder}
            isEditable={isEditable}
            showControls={showControls}
            editCell={editCell}
            onHeaderClick={handleHeaderClick}
            onSaveHeader={handleSaveHeader}
          />
          
          <TableBodyComponent 
            data={localData}
            cellBackground={cellBackground}
            cellTextColor={cellTextColor}
            showTableBorder={showTableBorder}
            alternateRowColor={alternateRowColor}
            alternateRowBackground={alternateRowBackground}
            isEditable={isEditable}
            showControls={showControls}
            editCell={editCell}
            onCellClick={handleCellClick}
            onSaveCell={handleSaveCell}
            renderRowControls={renderRowControls}
          />
        </Table>
      </div>
    </div>
  );
}
