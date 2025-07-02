
import React from 'react';
import { PieChartStyleTemplate } from './PieChartStyleTemplate';

interface PieChartTemplatesProps {
  selectedTemplate: string;
  onSelectTemplate: (templateId: string) => void;
}

export function PieChartTemplates({ selectedTemplate, onSelectTemplate }: PieChartTemplatesProps) {
  const templates = [
    {
      id: 'default',
      title: 'Default',
      variant: 'default' as const,
    },
    {
      id: 'with-legend',
      title: 'With Legend',
      variant: 'with-legend' as const,
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
    <div className="grid grid-cols-2 gap-4">
      {templates.map((template) => (
        <PieChartStyleTemplate
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
