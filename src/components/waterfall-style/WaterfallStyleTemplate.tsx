
import React from 'react';
import { WaterfallRenderer } from '../element-renderers/WaterfallRenderer';

interface WaterfallStyleTemplateProps {
  variant: 'basic-waterfall' | 'with-buttons' | 'with-kpis';
  isSelected: boolean;
  onClick: () => void;
  title: string;
}

export function WaterfallStyleTemplate({ variant, isSelected, onClick, title }: WaterfallStyleTemplateProps) {
  const getTemplateProperties = () => {
    const baseData = [
      { category: 'Jan', value: 50, isTotal: false },
      { category: 'Feb', value: 80, isTotal: false },
      { category: 'Mar', value: 60, isTotal: false },
      { category: 'Total', value: 190, isTotal: true }
    ];

    const baseProperties = {
      waterfallTitle: 'Title goes here',
      waterfallData: baseData,
      showTitle: true,
      showGridLines: true,
      showLabels: true,
      showXAxis: true,
      showYAxis: true,
      showXAxisLabels: true,
      showYAxisLabels: true,
    };

    switch (variant) {
      case 'basic-waterfall':
        return {
          ...baseProperties,
          waterfallVariant: 'basic-waterfall' as const,
          waterfallPrimaryColor: '#4F46E5',
          waterfallSecondaryColor: '#818CF8',
          waterfallTotalColor: '#10B981',
          showButtons: false,
          showKpis: false,
        };
      case 'with-buttons':
        return {
          ...baseProperties,
          waterfallVariant: 'with-buttons' as const,
          waterfallPrimaryColor: '#059669',
          waterfallSecondaryColor: '#34D399',
          waterfallTotalColor: '#10B981',
          showButtons: true,
          showKpis: false,
          waterfallButtons: [
            { title: 'Title 1', alignment: 'left' },
            { title: 'Title 2', alignment: 'right' }
          ],
        };
      case 'with-kpis':
        return {
          ...baseProperties,
          waterfallVariant: 'with-kpis' as const,
          waterfallPrimaryColor: '#7C3AED',
          waterfallSecondaryColor: '#A78BFA',
          waterfallTotalColor: '#10B981',
          showGridLines: false,
          showButtons: false,
          showKpis: true,
          waterfallKpis: [
            { title: 'Metric 1', value: '1234', change: '12%' },
            { title: 'Metric 2', value: '1234', change: '12%' }
          ],
        };
      default:
        return {
          ...baseProperties,
          waterfallVariant: 'basic-waterfall' as const,
          waterfallPrimaryColor: '#4F46E5',
          waterfallSecondaryColor: '#818CF8',
          waterfallTotalColor: '#10B981',
          showButtons: false,
          showKpis: false,
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
      <div className="h-48 mb-3 overflow-hidden bg-white rounded border">
        <div className="w-full h-full">
          <WaterfallRenderer properties={getTemplateProperties()} />
        </div>
      </div>
      <div className="text-sm font-medium text-gray-700 text-center">{title}</div>
    </div>
  );
}
