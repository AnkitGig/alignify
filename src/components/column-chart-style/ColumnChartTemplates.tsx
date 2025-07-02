
import React from 'react';
import { ColumnChartStyleTemplate } from './ColumnChartStyleTemplate';

interface ColumnChartTemplatesProps {
  selectedTemplate: string;
  onSelectTemplate: (templateId: string) => void;
}

export function ColumnChartTemplates({ selectedTemplate, onSelectTemplate }: ColumnChartTemplatesProps) {
  const templates = [
    {
      id: 'default',
      name: 'Standard',
      primaryColor: '#3B82F6',
      secondaryColor: '#818CF8',
      display: (
        <div className="h-16 flex items-end justify-center space-x-1">
          <div className="w-8 h-12 bg-blue-500 rounded-sm"></div>
          <div className="w-8 h-8 bg-blue-500 rounded-sm"></div>
          <div className="w-8 h-10 bg-blue-500 rounded-sm"></div>
          <div className="w-8 h-14 bg-blue-500 rounded-sm"></div>
        </div>
      ),
    },
    {
      id: 'grouped',
      name: 'Grouped',
      primaryColor: '#10B981',
      secondaryColor: '#34D399',
      display: (
        <div className="h-16 flex items-end justify-center space-x-2">
          <div className="flex space-x-0.5">
            <div className="w-3 h-12 bg-emerald-500 rounded-sm"></div>
            <div className="w-3 h-8 bg-emerald-400 rounded-sm"></div>
          </div>
          <div className="flex space-x-0.5">
            <div className="w-3 h-10 bg-emerald-500 rounded-sm"></div>
            <div className="w-3 h-14 bg-emerald-400 rounded-sm"></div>
          </div>
        </div>
      ),
    },
    {
      id: 'stacked',
      name: 'Stacked',
      primaryColor: '#F59E0B',
      secondaryColor: '#FBBF24',
      display: (
        <div className="h-16 flex items-end justify-center space-x-1">
          <div className="w-8 flex flex-col">
            <div className="w-8 h-6 bg-amber-300 rounded-t-sm"></div>
            <div className="w-8 h-6 bg-amber-500 rounded-b-sm"></div>
          </div>
          <div className="w-8 flex flex-col">
            <div className="w-8 h-4 bg-amber-300 rounded-t-sm"></div>
            <div className="w-8 h-4 bg-amber-500 rounded-b-sm"></div>
          </div>
          <div className="w-8 flex flex-col">
            <div className="w-8 h-5 bg-amber-300 rounded-t-sm"></div>
            <div className="w-8 h-5 bg-amber-500 rounded-b-sm"></div>
          </div>
        </div>
      ),
    },
    {
      id: 'gradient',
      name: 'Gradient',
      primaryColor: '#8B5CF6',
      secondaryColor: '#A78BFA',
      display: (
        <div className="h-16 flex items-end justify-center space-x-1">
          <div className="w-8 h-12 bg-gradient-to-t from-purple-600 to-purple-400 rounded-sm"></div>
          <div className="w-8 h-8 bg-gradient-to-t from-purple-600 to-purple-400 rounded-sm"></div>
          <div className="w-8 h-10 bg-gradient-to-t from-purple-600 to-purple-400 rounded-sm"></div>
          <div className="w-8 h-14 bg-gradient-to-t from-purple-600 to-purple-400 rounded-sm"></div>
        </div>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {templates.map((template) => (
        <ColumnChartStyleTemplate
          key={template.id}
          template={template}
          isSelected={selectedTemplate === template.id}
          onSelect={onSelectTemplate}
        />
      ))}
    </div>
  );
}
