
import React from 'react';
import { WaterfallStyleTemplate } from './WaterfallStyleTemplate';

interface WaterfallTemplatesProps {
  selectedTemplate: string;
  onSelectTemplate: (templateId: string) => void;
}

export function WaterfallTemplates({ selectedTemplate, onSelectTemplate }: WaterfallTemplatesProps) {
  const templates = [
    {
      id: 'basic-waterfall',
      title: 'Basic Waterfall',
      variant: 'basic-waterfall' as const,
    },
    {
      id: 'with-buttons',
      title: 'With Buttons',
      variant: 'with-buttons' as const,
    },
    {
      id: 'with-kpis',
      title: 'With KPIs',
      variant: 'with-kpis' as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
      {templates.map((template) => (
        <WaterfallStyleTemplate
          key={template.id}
          variant={template.variant}
          isSelected={selectedTemplate === template.id}
          onClick={() => onSelectTemplate(template.id)}
          title={template.title}
        />
      ))}
    </div>
  );
}
