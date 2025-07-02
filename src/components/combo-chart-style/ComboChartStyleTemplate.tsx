
import React from 'react';
import { useWireframe } from '@/hooks/useWireframe';
import { ComboChartRenderer } from '../element-renderers/ComboChartRenderer';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TemplateData {
  id: string;
  name: string;
  preview: string;
  properties: any;
}

interface ComboChartStyleTemplateProps {
  template: TemplateData;
  elementId: string;
  onClose: () => void;
  onDelete?: (templateId: string) => void;
}

export function ComboChartStyleTemplate({ 
  template, 
  elementId, 
  onClose,
  onDelete 
}: ComboChartStyleTemplateProps) {
  const { updateElementProperties } = useWireframe();

  const handleApplyTemplate = () => {
    updateElementProperties(elementId, template.properties);
    onClose();
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(template.id);
    }
  };

  return (
    <div className="relative">
      <div 
        className="border border-gray-200 rounded-lg p-3 md:p-4 cursor-pointer hover:border-blue-300 hover:shadow-md transition-all"
        onClick={handleApplyTemplate}
      >
        {/* Delete button */}
        {onDelete && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 h-6 w-6 p-0 hover:bg-red-100 hover:text-red-600 z-10"
            onClick={handleDelete}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        
        <div className="mb-3">
          <h4 className="font-medium text-sm">{template.name}</h4>
          <p className="text-xs text-gray-500 mt-1">{template.preview}</p>
        </div>
        
        <div className="h-24 sm:h-32 bg-gray-50 rounded border">
          <ComboChartRenderer 
            properties={{
              ...template.properties,
              chartHeight: 96
            }}
          />
        </div>
      </div>
    </div>
  );
}
