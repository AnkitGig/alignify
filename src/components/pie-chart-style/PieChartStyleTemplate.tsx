
import React from 'react';
import { PieChartRenderer } from '../element-renderers/PieChartRenderer';
import { PieChartVariant } from '@/types/wireframe';

interface PieChartStyleTemplateProps {
  variant: PieChartVariant;
  isSelected: boolean;
  onClick: () => void;
  title: string;
}

export function PieChartStyleTemplate({ variant, isSelected, onClick, title }: PieChartStyleTemplateProps) {
  const getTemplateProperties = () => {
    const baseData = [
      { name: 'Text A', value: 30, color: '#4F46E5' },
      { name: 'Text B', value: 25, color: '#7C3AED' },
      { name: 'Text C', value: 20, color: '#06B6D4' },
      { name: 'Text D', value: 20, color: '#8B5CF6' },
      { name: 'Text E', value: 5, color: '#EC4899' }
    ];

    switch (variant) {
      case 'default':
        return {
          pieChartVariant: variant,
          pieChartTitle: 'Title goes here',
          pieChartData: baseData,
          showTitle: true,
          showPieLegend: false,
          showPieLabels: true,
          showPercentages: true,
          pieInnerRadius: 0,
          pieOuterRadius: 60,
        };
      case 'with-legend':
        return {
          pieChartVariant: variant,
          pieChartTitle: 'Title goes here',
          pieChartData: baseData,
          showTitle: true,
          showPieLegend: true,
          showPieLabels: false,
          showPercentages: false,
          pieInnerRadius: 0,
          pieOuterRadius: 60,
        };
      case 'with-buttons':
        return {
          pieChartVariant: variant,
          pieChartTitle: 'Title goes here',
          pieChartData: baseData,
          showTitle: true,
          showPieLegend: false,
          showPieLabels: false,
          showPercentages: false,
          pieInnerRadius: 0,
          pieOuterRadius: 60,
          pieChartButtons: [
            { title: 'Title 1', alignment: 'left' },
            { title: 'Title 2', alignment: 'right' }
          ],
        };
      case 'with-kpis':
        return {
          pieChartVariant: variant,
          pieChartTitle: 'Title goes here',
          pieChartData: baseData,
          showTitle: true,
          showPieLegend: false,
          showPieLabels: false,
          showPercentages: false,
          pieInnerRadius: 0,
          pieOuterRadius: 50,
          pieChartKpis: [
            { title: 'Metric 1', value: '1234', change: '12%' },
            { title: 'Metric 2', value: '1234', change: '12%' }
          ],
        };
      default:
        return {
          pieChartVariant: 'default',
          pieChartTitle: 'Title goes here',
          pieChartData: baseData,
          showTitle: true,
          showPieLegend: false,
          showPieLabels: true,
          showPercentages: true,
        };
    }
  };

  return (
    <div 
      className={`border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
      }`}
      onClick={onClick}
    >
      <div className="h-48 mb-3">
        <PieChartRenderer properties={getTemplateProperties()} />
      </div>
      <div className="text-sm font-medium text-gray-700">{title}</div>
    </div>
  );
}
