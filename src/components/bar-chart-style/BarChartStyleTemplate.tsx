
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface BarChartStyleTemplateProps {
  template: {
    id: string;
    name: string;
    description: string;
    display: React.ReactNode;
  };
  isSelected: boolean;
  onSelect: (templateId: string) => void;
}

export function BarChartStyleTemplate({ template, isSelected, onSelect }: BarChartStyleTemplateProps) {
  return (
    <div 
      className={`border rounded-lg p-4 cursor-pointer transition-all ${
        isSelected 
          ? 'border-indigo-500 bg-indigo-50' 
          : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={() => onSelect(template.id)}
    >
      <div className="flex items-center space-x-3 mb-3">
        <RadioGroup value={isSelected ? template.id : ''} className="flex items-center">
          <RadioGroupItem value={template.id} id={template.id} />
        </RadioGroup>
        <Label htmlFor={template.id} className="cursor-pointer font-medium">
          {template.name}
        </Label>
      </div>
      
      <div className="mb-3">
        {template.display}
      </div>
      
      <p className="text-xs text-gray-500">{template.description}</p>
    </div>
  );
}
