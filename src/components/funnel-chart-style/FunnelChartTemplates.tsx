
import React from 'react';
import type { FunnelChartVariant } from '@/types/wireframe';
import { FunnelChartStyleTemplate } from './FunnelChartStyleTemplate';

interface FunnelChartTemplatesProps {
  selectedTemplate: FunnelChartVariant;
  onSelectTemplate: (template: FunnelChartVariant) => void;
}

export function FunnelChartTemplates({ selectedTemplate, onSelectTemplate }: FunnelChartTemplatesProps) {
  const templates = [
    {
      id: 'default' as FunnelChartVariant,
      name: 'Default',
      data: [
        { name: 'Awareness', value: 1000, color: '#8884d8' },
        { name: 'Interest', value: 800, color: '#82ca9d' },
        { name: 'Consideration', value: 600, color: '#ffc658' },
        { name: 'Intent', value: 400, color: '#ff7c7c' },
        { name: 'Purchase', value: 200, color: '#8dd1e1' }
      ]
    },
    {
      id: 'with-buttons' as FunnelChartVariant,
      name: 'With Buttons',
      data: [
        { name: 'Visitors', value: 10000, color: '#3b82f6' },
        { name: 'Leads', value: 5000, color: '#10b981' },
        { name: 'Qualified', value: 2000, color: '#f59e0b' },
        { name: 'Customers', value: 500, color: '#ef4444' }
      ]
    },
    {
      id: 'with-kpis' as FunnelChartVariant,
      name: 'With KPIs',
      data: [
        { name: 'Impressions', value: 50000, color: '#8b5cf6' },
        { name: 'Clicks', value: 5000, color: '#06b6d4' },
        { name: 'Conversions', value: 500, color: '#84cc16' },
        { name: 'Sales', value: 100, color: '#f97316' }
      ]
    }
  ];

  return (
    <div className="space-y-4">
      {templates.map((template) => (
        <FunnelChartStyleTemplate
          key={template.id}
          template={template}
          isSelected={selectedTemplate === template.id}
          onSelect={() => onSelectTemplate(template.id)}
        />
      ))}
    </div>
  );
}
