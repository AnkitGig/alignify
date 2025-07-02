
import React from 'react';
import { HistogramStyleTemplate } from './HistogramStyleTemplate';

interface HistogramTemplatesProps {
  selectedTemplate: string;
  onSelectTemplate: (templateId: string) => void;
}

export function HistogramTemplates({ selectedTemplate, onSelectTemplate }: HistogramTemplatesProps) {
  const templates = [
    {
      id: 'default',
      title: 'Default Histogram',
      variant: 'default' as const,
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
    <div className="w-full px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-none">
        {templates.map((template) => (
          <HistogramStyleTemplate
            key={template.id}
            variant={template.variant}
            isSelected={selectedTemplate === template.id}
            onClick={() => onSelectTemplate(template.id)}
            title={template.title}
          />
        ))}
      </div>
    </div>
  );
}
