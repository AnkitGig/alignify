
import React from 'react';
import { HistogramRenderer } from '../element-renderers/HistogramRenderer';

interface HistogramStyleTemplateProps {
  variant: 'default' | 'with-buttons' | 'with-kpis';
  isSelected: boolean;
  onClick: () => void;
  title: string;
}

export function HistogramStyleTemplate({ variant, isSelected, onClick, title }: HistogramStyleTemplateProps) {
  const getTemplateProperties = () => {
    const baseData = [
      { range: '0-10', frequency: 5 },
      { range: '10-20', frequency: 8 },
      { range: '20-30', frequency: 12 },
      { range: '30-40', frequency: 15 },
      { range: '40-50', frequency: 10 },
      { range: '50-60', frequency: 7 },
      { range: '60-70', frequency: 4 },
      { range: '70-80', frequency: 2 }
    ];

    const baseProperties = {
      histogramTitle: 'Title goes here',
      histogramData: baseData,
      showTitle: true,
      showLabels: true,
      showValues: true,
      showGridLines: true,
    };

    switch (variant) {
      case 'default':
        return {
          ...baseProperties,
          histogramVariant: 'default' as const,
          histogramPrimaryColor: '#4F46E5',
          showButtons: false,
          showKpis: false,
        };
      case 'with-buttons':
        return {
          ...baseProperties,
          histogramVariant: 'with-buttons' as const,
          histogramPrimaryColor: '#059669',
          showButtons: true,
          showKpis: false,
          histogramButtons: [
            { title: 'Filter', alignment: 'left' },
            { title: 'Export', alignment: 'right' }
          ],
        };
      case 'with-kpis':
        return {
          ...baseProperties,
          histogramVariant: 'with-kpis' as const,
          histogramPrimaryColor: '#7C3AED',
          showButtons: false,
          showKpis: true,
          histogramKpis: [
            { title: 'Mean', value: '45.2', change: '+5.2%' },
            { title: 'Std Dev', value: '12.8', change: '-2.1%' }
          ],
        };
      default:
        return {
          ...baseProperties,
          histogramVariant: 'default' as const,
          histogramPrimaryColor: '#4F46E5',
          showButtons: false,
          showKpis: false,
        };
    }
  };

  return (
    <div 
      className={`border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md w-full ${
        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
      }`}
      onClick={onClick}
    >
      <div className="h-48 mb-3 overflow-hidden bg-white rounded border">
        <div className="w-full h-full">
          <HistogramRenderer properties={getTemplateProperties()} />
        </div>
      </div>
      <div className="text-sm font-medium text-gray-700 text-center">{title}</div>
    </div>
  );
}
