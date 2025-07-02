
import React from 'react';
import { TreemapRenderer } from '../element-renderers/TreemapRenderer';

interface TreemapStyleTemplateProps {
  variant: 'default' | 'with-buttons' | 'with-kpis';
  isSelected: boolean;
  onClick: () => void;
  title: string;
}

export function TreemapStyleTemplate({ variant, isSelected, onClick, title }: TreemapStyleTemplateProps) {
  const getTemplateProperties = () => {
    const baseData = [
      { name: 'Category A', value: 400, color: '#4F46E5' },
      { name: 'Category B', value: 300, color: '#7C3AED' },
      { name: 'Category C', value: 200, color: '#059669' },
      { name: 'Category D', value: 150, color: '#DC2626' },
      { name: 'Category E', value: 100, color: '#EA580C' }
    ];

    const baseProperties = {
      treemapTitle: 'Title goes here',
      treemapData: baseData,
      showTitle: true,
      showLabels: true,
      showValues: true,
    };

    switch (variant) {
      case 'default':
        return {
          ...baseProperties,
          treemapVariant: 'default' as const,
          treemapPrimaryColor: '#4F46E5',
          treemapSecondaryColor: '#818CF8',
          showButtons: false,
          showKpis: false,
        };
      case 'with-buttons':
        return {
          ...baseProperties,
          treemapVariant: 'with-buttons' as const,
          treemapPrimaryColor: '#059669',
          treemapSecondaryColor: '#34D399',
          showButtons: true,
          showKpis: false,
          treemapButtons: [
            { title: 'Title 1', alignment: 'left' },
            { title: 'Title 2', alignment: 'right' }
          ],
        };
      case 'with-kpis':
        return {
          ...baseProperties,
          treemapVariant: 'with-kpis' as const,
          treemapPrimaryColor: '#7C3AED',
          treemapSecondaryColor: '#A78BFA',
          showValues: false,
          showButtons: false,
          showKpis: true,
          treemapKpis: [
            { title: 'Metric 1', value: '1234', change: '12%' },
            { title: 'Metric 2', value: '1234', change: '12%' }
          ],
        };
      default:
        return {
          ...baseProperties,
          treemapVariant: 'default' as const,
          treemapPrimaryColor: '#4F46E5',
          treemapSecondaryColor: '#818CF8',
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
          <TreemapRenderer properties={getTemplateProperties()} />
        </div>
      </div>
      <div className="text-sm font-medium text-gray-700 text-center">{title}</div>
    </div>
  );
}
