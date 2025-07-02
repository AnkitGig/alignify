
import React, { useState } from 'react';
import { useWireframe, Element } from "@/hooks/useWireframe";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

interface ElementInteractionProps {
  element: Element;
  isSelected: boolean;
  children: React.ReactNode;
  onDoubleClick: (e: React.MouseEvent) => void;
}

export function ElementInteraction({ 
  element, 
  isSelected, 
  children, 
  onDoubleClick 
}: ElementInteractionProps) {
  const { updateElement, selectElement, removeElement } = useWireframe();
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  
  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectElement(element.id);
  };
  
  const handleMouseDownOnElement = (e: React.MouseEvent) => {
    if (isSelected) {
      e.stopPropagation();
      setIsDragging(true);
      
      const startX = e.clientX;
      const startY = e.clientY;
      const startElementX = element.position.x;
      const startElementY = element.position.y;
      
      const handleMouseMove = (moveEvent: MouseEvent) => {
        const dx = moveEvent.clientX - startX;
        const dy = moveEvent.clientY - startY;
        
        updateElement(element.id, {
          position: {
            x: startElementX + dx,
            y: startElementY + dy,
          }
        });
      };
      
      const handleMouseUp = () => {
        setIsDragging(false);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
      
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
  };
  
  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = element.size.width;
    const startHeight = element.size.height;
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      
      const newWidth = Math.max(50, startWidth + dx);
      const newHeight = Math.max(30, startHeight + dy);
      
      updateElement(element.id, {
        size: {
          width: newWidth,
          height: newHeight,
        }
      });
    };
    
    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleDeleteElement = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeElement(element.id);
    toast.success(`${element.type} deleted`);
  };
  
  const handleDelete = (e: React.KeyboardEvent) => {
    // This is handled in the parent component
  };
  
  return (
    <div
      className={`absolute cursor-move ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      style={{
        left: element.position.x,
        top: element.position.y,
        width: element.size.width,
        height: element.size.height,
        backgroundColor: 'white',
        border: '1px solid #e5e7eb',
        boxShadow: isSelected ? '0 0 0 2px rgba(59, 130, 246, 0.3)' : 'none',
        zIndex: isSelected ? 10 : 1,
      }}
      onClick={handleMouseDown}
      onDoubleClick={onDoubleClick}
      onMouseDown={handleMouseDownOnElement}
      onKeyDown={handleDelete}
      tabIndex={0}
    >
      {children}
      
      {isSelected && (
        <>
          {/* Resize handle */}
          <div
            className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 cursor-nwse-resize"
            onMouseDown={handleResizeMouseDown}
          />
          
          {/* Delete button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute -top-8 -right-8 h-6 w-6 p-0 bg-red-500 hover:bg-red-600 text-white rounded-full"
            onClick={handleDeleteElement}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </>
      )}
    </div>
  );
}
