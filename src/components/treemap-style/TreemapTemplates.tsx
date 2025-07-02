
import React from 'react';
import { TreemapStyleTemplate } from './TreemapStyleTemplate';

interface TreemapTemplatesProps {
  selectedTemplate: string;
  onSelectTemplate: (templateId: string) => void;
}

export function TreemapTemplates({ selectedTemplate, onSelectTemplate }: TreemapTemplatesProps) {
  const templates = [
    {
      id: 'default',
      title: 'Default Treemap',
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
          <TreemapStyleTemplate
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
