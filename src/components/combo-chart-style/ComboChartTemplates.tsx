
import React, { useState } from 'react';
import { ComboChartStyleTemplate } from './ComboChartStyleTemplate';
import { toast } from 'sonner';

interface ComboChartTemplatesProps {
  elementId: string;
  onClose: () => void;
}

export function ComboChartTemplates({ elementId, onClose }: ComboChartTemplatesProps) {
  const [templates, setTemplates] = useState([
    {
      id: 'basic-combo',
      name: 'Basic Combo',
      preview: 'Basic combo chart with bars and line',
      properties: {
        chartVariant: 'basic-combo',
        chartTitle: 'Title goes here',
        showLegend: true,
        showGridLines: true,
        showLabels: true,
        barColor: '#3b82f6',
        lineColor: '#10b981',
        chartData: [
          { category: 'Jan 22', value: 30, line: 25 },
          { category: 'Feb 22', value: 45, line: 35 },
          { category: 'Mar 22', value: 35, line: 40 },
          { category: 'Apr 22', value: 50, line: 45 },
          { category: 'May 22', value: 25, line: 30 },
          { category: 'Jun 22', value: 60, line: 55 }
        ]
      }
    },
    {
      id: 'kpi-combo',
      name: 'KPI Combo',
      preview: 'Combo chart with KPI indicators',
      properties: {
        chartVariant: 'kpi-combo',
        chartTitle: 'KPI-ComboChart',
        showLegend: true,
        showGridLines: true,
        showLabels: true,
        showKpis: true,
        barColor: '#3b82f6',
        lineColor: '#10b981',
        chartData: [
          { category: 'Jan 22', value: 40, line: 30 },
          { category: 'Feb 22', value: 25, line: 45 },
          { category: 'Mar 22', value: 35, line: 25 },
          { category: 'Apr 22', value: 30, line: 55 },
          { category: 'May 22', value: 55, line: 35 },
          { category: 'Jun 22', value: 45, line: 25 }
        ]
      }
    }
  ]);

  const handleDeleteTemplate = (templateId: string) => {
    setTemplates(prevTemplates => prevTemplates.filter(template => template.id !== templateId));
    toast.success('Template deleted');
  };

  return (
    <div>
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between">
        <span className="text-sm text-gray-600 mb-2 sm:mb-0">Available styles</span>
        <span className="text-sm text-blue-600">Default</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template) => (
          <ComboChartStyleTemplate
            key={template.id}
            template={template}
            elementId={elementId}
            onClose={onClose}
            onDelete={handleDeleteTemplate}
          />
        ))}
      </div>
      
      {templates.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          <p>No templates available</p>
        </div>
      )}
    </div>
  );
}
