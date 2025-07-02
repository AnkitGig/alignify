
import React from 'react';
import { Element } from "@/types/wireframe";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { TableHeadersEditor } from "./TableHeadersEditor";
import { TableDataEditor } from "./TableDataEditor";
import { TableOptions } from "./TableOptions";
import { TableCellColorEditor } from "./TableCellColorEditor";

interface TablePropertiesProps {
  element: Element;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
  onOpenStyleDialog?: () => void;
}

export function TableProperties({ element, updateElementProperties, onOpenStyleDialog }: TablePropertiesProps) {
  const properties = element.properties || {};
  const {
    tableTitle = 'Table Title',
    tableHeaders = ['Header 1', 'Header 2', 'Header 3'],
    tableData = [
      ['Data 1', 'Data 2', 'Data 3'],
      ['Data 4', 'Data 5', 'Data 6'],
      ['Data 7', 'Data 8', 'Data 9'],
    ],
    numRows = tableData.length,
    numColumns = tableHeaders.length,
    showTableBorder = true,
    cellBackground = '#ffffff',
  } = properties;

  // Function to update headers
  const updateHeader = (index: number, value: string) => {
    const newHeaders = [...tableHeaders];
    newHeaders[index] = value;
    updateElementProperties(element.id, { tableHeaders: newHeaders });
  };

  // Function to update cell data
  const updateCell = (rowIndex: number, colIndex: number, value: string) => {
    const newData = [...tableData];
    if (!newData[rowIndex]) {
      newData[rowIndex] = Array(numColumns).fill('');
    }
    newData[rowIndex][colIndex] = value;
    updateElementProperties(element.id, { tableData: newData });
  };

  // Function to add a row
  const addRow = () => {
    const newData = [...tableData];
    const newRow = Array(numColumns).fill('New data');
    newData.push(newRow);
    updateElementProperties(element.id, { 
      tableData: newData,
      numRows: newData.length
    });
  };

  // Function to remove a row
  const removeRow = () => {
    if (tableData.length <= 1) return;
    const newData = [...tableData];
    newData.pop();
    updateElementProperties(element.id, { 
      tableData: newData,
      numRows: newData.length
    });
  };

  // Function to add a column
  const addColumn = () => {
    const newHeaders = [...tableHeaders, `Header ${numColumns + 1}`];
    const newData = tableData.map(row => [...row, 'New data']);
    updateElementProperties(element.id, { 
      tableHeaders: newHeaders,
      tableData: newData,
      numColumns: newHeaders.length
    });
  };

  // Function to remove a column
  const removeColumn = () => {
    if (tableHeaders.length <= 1) return;
    const newHeaders = [...tableHeaders];
    newHeaders.pop();
    const newData = tableData.map(row => {
      const newRow = [...row];
      newRow.pop();
      return newRow;
    });
    updateElementProperties(element.id, { 
      tableHeaders: newHeaders,
      tableData: newData,
      numColumns: newHeaders.length
    });
  };

  // Function to update cell background color
  const updateCellBackground = (color: string) => {
    updateElementProperties(element.id, { cellBackground: color });
  };

  return (
    <div className="p-4 space-y-4">
      <div>
        <Label htmlFor="tableTitle">Table Title</Label>
        <Input
          id="tableTitle"
          value={tableTitle}
          onChange={(e) => updateElementProperties(element.id, { tableTitle: e.target.value })}
        />
      </div>

      <Separator />
      
      <TableHeadersEditor
        tableHeaders={tableHeaders}
        onUpdateHeader={updateHeader}
        onAddColumn={addColumn}
        onRemoveColumn={removeColumn}
      />

      <Separator />

      <TableDataEditor
        tableData={tableData}
        numColumns={numColumns}
        onUpdateCell={updateCell}
        onAddRow={addRow}
        onRemoveRow={removeRow}
      />

      <Separator />

      <TableCellColorEditor 
        cellBackground={cellBackground}
        onColorChange={updateCellBackground}
      />

      <Separator />

      <TableOptions
        showTableBorder={showTableBorder}
        onBorderToggle={(checked) => updateElementProperties(element.id, { showTableBorder: checked })}
        onOpenStyleDialog={onOpenStyleDialog || (() => {})}
      />
    </div>
  );
}
