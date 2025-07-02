
import React, { useState } from 'react';
import { LineChartStyleTemplate } from './LineChartStyleTemplate';
import { toast } from 'sonner';

interface LineChartTemplatesProps {
  elementId: string;
  onClose: () => void;
}

export function LineChartTemplates({ elementId, onClose }: LineChartTemplatesProps) {
  const [templates, setTemplates] = useState([
    {
      id: 'basic-line',
      name: 'Basic Line',
      preview: 'Simple line chart with single data series',
      properties: {
        chartVariant: 'basic-line',
        chartTitle: 'Title goes here',
        showLegend: true,
        showGridLines: true,
        showLabels: true,
        lineColor: '#3b82f6',
        lineWidth: 2,
        showMarkers: true,
        markerStyle: 'circle',
        curveType: 'monotone',
        chartData: [
          { category: 'Jan 22', value: 30 },
          { category: 'Feb 22', value: 45 },
          { category: 'Mar 22', value: 35 },
          { category: 'Apr 22', value: 50 },
          { category: 'May 22', value: 25 },
          { category: 'Jun 22', value: 60 }
        ]
      }
    },
    {
      id: 'multi-line',
      name: 'Multi-Line',
      preview: 'Multiple data series comparison chart',
      properties: {
        chartVariant: 'multi-line',
        chartTitle: 'Multi-Line Chart',
        showLegend: true,
        showGridLines: true,
        showLabels: true,
        lineColor: '#3b82f6',
        secondaryBarColor: '#10b981',
        tertiaryBarColor: '#f59e0b',
        lineWidth: 2,
        showMarkers: true,
        markerStyle: 'circle',
        curveType: 'monotone',
        chartData: [
          { category: 'Jan 22', value: 30, line: 25, secondary: 20 },
          { category: 'Feb 22', value: 45, line: 35, secondary: 30 },
          { category: 'Mar 22', value: 35, line: 40, secondary: 25 },
          { category: 'Apr 22', value: 50, line: 45, secondary: 35 },
          { category: 'May 22', value: 25, line: 30, secondary: 40 },
          { category: 'Jun 22', value: 60, line: 55, secondary: 45 }
        ]
      }
    },
    {
      id: 'stepped-line',
      name: 'Stepped Line',
      preview: 'Step-style line chart for discrete data',
      properties: {
        chartVariant: 'stepped-line',
        chartTitle: 'Stepped Line Chart',
        showLegend: true,
        showGridLines: true,
        showLabels: true,
        lineColor: '#8b5cf6',
        lineWidth: 3,
        showMarkers: false,
        curveType: 'step',
        chartData: [
          { category: 'Jan 22', value: 30 },
          { category: 'Feb 22', value: 45 },
          { category: 'Mar 22', value: 35 },
          { category: 'Apr 22', value: 50 },
          { category: 'May 22', value: 25 },
          { category: 'Jun 22', value: 60 }
        ]
      }
    },
    {
      id: 'curved-line',
      name: 'Curved Line',
      preview: 'Smooth curved line with enhanced styling',
      properties: {
        chartVariant: 'curved-line',
        chartTitle: 'Curved Line Chart',
        showLegend: true,
        showGridLines: true,
        showLabels: true,
        lineColor: '#ef4444',
        lineWidth: 4,
        showMarkers: true,
        markerStyle: 'circle',
        markerSize: 8,
        curveType: 'basis',
        chartData: [
          { category: 'Jan 22', value: 30 },
          { category: 'Feb 22', value: 45 },
          { category: 'Mar 22', value: 35 },
          { category: 'Apr 22', value: 50 },
          { category: 'May 22', value: 25 },
          { category: 'Jun 22', value: 60 }
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
          <LineChartStyleTemplate
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
