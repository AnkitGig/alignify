
import React from 'react';
import { FunnelChart, Funnel, LabelList, Cell, ResponsiveContainer } from 'recharts';

interface FunnelChartStyleTemplateProps {
  template: {
    id: string;
    name: string;
    data: Array<{ name: string; value: number; color: string }>;
  };
  isSelected: boolean;
  onSelect: () => void;
}

export function FunnelChartStyleTemplate({ template, isSelected, onSelect }: FunnelChartStyleTemplateProps) {
  return (
    <div 
      className={`border rounded-lg p-4 cursor-pointer transition-all ${
        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-medium">{template.name}</h4>
        <div className={`w-4 h-4 rounded-full border-2 ${
          isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
        }`}>
          {isSelected && <div className="w-2 h-2 bg-white rounded-full m-0.5" />}
        </div>
      </div>
      
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <FunnelChart>
            <Funnel
              dataKey="value"
              data={template.data}
              isAnimationActive={false}
            >
              <LabelList 
                position="center" 
                fill="#fff" 
                stroke="none"
                fontSize={10}
                formatter={(value: any, entry: any) => {
                  // Add safety check for entry
                  if (!entry || typeof entry !== 'object') {
                    return '';
                  }
                  return entry.name || '';
                }}
              />
              {template.data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Funnel>
          </FunnelChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
