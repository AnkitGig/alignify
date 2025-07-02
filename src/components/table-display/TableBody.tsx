
import React from 'react';
import { TableBody as ShadcnTableBody, TableRow, TableCell } from "../ui/table";
import { TableCellEditor } from "../table-properties/TableCellEditor";
import { EditCellPosition } from './TableCellEditingEngine';

interface TableBodyProps {
  data: string[][];
  cellBackground: string;
  cellTextColor: string;
  showTableBorder: boolean;
  alternateRowColor: boolean;
  alternateRowBackground: string;
  isEditable: boolean;
  showControls: boolean;
  editCell: EditCellPosition | null;
  onCellClick: (rowIndex: number, colIndex: number) => void;
  onSaveCell: (rowIndex: number, colIndex: number, value: string) => void;
  renderRowControls: (rowIndex: number) => React.ReactNode;
}

export function TableBodyComponent({
  data,
  cellBackground,
  cellTextColor,
  showTableBorder,
  alternateRowColor,
  alternateRowBackground,
  isEditable,
  showControls,
  editCell,
  onCellClick,
  onSaveCell,
  renderRowControls
}: TableBodyProps) {
  return (
    <ShadcnTableBody>
      {data.map((row, rowIndex) => (
        <TableRow 
          key={rowIndex} 
          className="hover:bg-transparent relative"
          style={{ 
            backgroundColor: alternateRowColor && rowIndex % 2 === 1 
              ? alternateRowBackground 
              : cellBackground 
          }}
        >
          {isEditable && showControls && (
            <TableCell className="p-0 w-10">
              {renderRowControls(rowIndex)}
            </TableCell>
          )}
          
          {row.map((cell, cellIndex) => (
            <TableCell 
              key={cellIndex} 
              style={{ 
                color: cellTextColor,
                backgroundColor: cellBackground,
                borderBottom: showTableBorder ? '1px solid #e5e7eb' : 'none', 
                borderRight: showTableBorder && cellIndex < row.length - 1 ? '1px solid #e5e7eb' : 'none',
                padding: editCell && editCell.row === rowIndex && editCell.col === cellIndex ? '0' : undefined,
                cursor: isEditable ? 'pointer' : 'default'
              }}
              onClick={() => onCellClick(rowIndex, cellIndex)}
            >
              {editCell && editCell.row === rowIndex && editCell.col === cellIndex ? (
                <TableCellEditor 
                  value={cell} 
                  onSave={(value) => onSaveCell(rowIndex, cellIndex, value)}
                  textColor={cellTextColor}
                  backgroundColor={cellBackground}
                />
              ) : (
                cell
              )}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </ShadcnTableBody>
  );
}
