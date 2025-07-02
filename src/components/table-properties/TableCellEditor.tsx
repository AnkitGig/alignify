
import React, { useState, useEffect, useRef } from 'react';

interface TableCellEditorProps {
  value: string;
  onSave: (value: string) => void;
  textColor: string;
  backgroundColor: string;
}

export function TableCellEditor({ 
  value, 
  onSave, 
  textColor, 
  backgroundColor 
}: TableCellEditorProps) {
  const [text, setText] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Focus input when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, []);

  // Handle save on Enter or blur
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSave(text);
    } else if (e.key === 'Escape') {
      onSave(value); // Restore original value
    }
  };

  return (
    <input
      ref={inputRef}
      type="text"
      value={text}
      onChange={(e) => setText(e.target.value)}
      onBlur={() => onSave(text)}
      onKeyDown={handleKeyDown}
      className="w-full h-full p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
      style={{ 
        color: textColor, 
        backgroundColor: backgroundColor 
      }}
    />
  );
}
