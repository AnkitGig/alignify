
import React from 'react';
import { TableHeader as ShadcnTableHeader, TableRow, TableHead } from "../ui/table";
import { TableCellEditor } from "../table-properties/TableCellEditor";
import { EditCellPosition } from './TableCellEditingEngine';

interface TableHeaderProps {
  headers: string[];
  headerBackground: string;
  headerTextColor: string;
  showTableBorder: boolean;
  isEditable: boolean;
  showControls: boolean;
  editCell: EditCellPosition | null;
  onHeaderClick: (index: number) => void;
  onSaveHeader: (index: number, value: string) => void;
  renderRowControls?: () => React.ReactNode;
}

export function TableHeaderComponent({
  headers,
  headerBackground,
  headerTextColor,
  showTableBorder,
  isEditable,
  showControls,
  editCell,
  onHeaderClick,
  onSaveHeader,
  renderRowControls
}: TableHeaderProps) {
  return (
    <ShadcnTableHeader style={{ backgroundColor: headerBackground }}>
      <TableRow className="hover:bg-transparent">
        {isEditable && showControls && (
          <TableHead 
            className="w-10 p-0"
            style={{ 
              borderBottom: showTableBorder ? '1px solid #e5e7eb' : 'none',
              borderRight: showTableBorder ? '1px solid #e5e7eb' : 'none'
            }}
          ></TableHead>
        )}
        
        {headers.map((header, index) => (
          <TableHead 
            key={index} 
            style={{ 
              color: headerTextColor,
              borderBottom: showTableBorder ? '1px solid #e5e7eb' : 'none',
              borderRight: showTableBorder && index < headers.length - 1 ? '1px solid #e5e7eb' : 'none',
              position: 'relative',
              cursor: isEditable ? 'pointer' : 'default'
            }}
            onClick={() => onHeaderClick(index)}
          >
            {editCell && editCell.row === -1 && editCell.col === index ? (
              <TableCellEditor 
                value={header} 
                onSave={(value) => onSaveHeader(index, value)}
                textColor={headerTextColor}
                backgroundColor={headerBackground}
              />
            ) : (
              header
            )}
          </TableHead>
        ))}
      </TableRow>
    </ShadcnTableHeader>
  );
}
