
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Button } from '@/components/ui/button';

interface PieChartRendererProps {
  properties?: any;
}

export function PieChartRenderer({ properties }: PieChartRendererProps) {
  const chartData = properties?.pieChartData || [
    { name: 'Text A', value: 30, color: '#4F46E5' },
    { name: 'Text B', value: 25, color: '#7C3AED' },
    { name: 'Text C', value: 20, color: '#06B6D4' },
    { name: 'Text D', value: 20, color: '#8B5CF6' },
    { name: 'Text E', value: 5, color: '#EC4899' }
  ];

  const variant = properties?.pieChartVariant || 'default';
  const title = properties?.pieChartTitle || 'Title goes here';
  const showTitle = properties?.showTitle !== false;
  const showLegend = properties?.showPieLegend !== false;
  const showLabels = properties?.showPieLabels !== false;
  const showPercentages = properties?.showPercentages !== false;
  const buttons = properties?.pieChartButtons || [];
  const kpis = properties?.pieChartKpis || [];
  const innerRadius = properties?.pieInnerRadius || 0;
  const outerRadius = properties?.pieOuterRadius || 80;

  const defaultColors = ['#4F46E5', '#7C3AED', '#06B6D4', '#8B5CF6', '#EC4899'];
  const pieColors = properties?.pieColors || defaultColors;

  const renderCustomLabel = (entry: any) => {
    if (!showLabels) return '';
    const percent = ((entry.value / chartData.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(0);
    if (showPercentages && entry.name) {
      return `${entry.name} (${percent}%)`;
    } else if (showPercentages) {
      return `${percent}%`;
    } else {
      return entry.name;
    }
  };

  const renderButtons = () => {
    if (!buttons.length) return null;
    
    return (
      <div className="flex gap-2 mt-4">
        {buttons.map((button: any, index: number) => (
          <Button 
            key={index} 
            variant="outline" 
            size="sm"
            className="text-xs"
          >
            {button.title}
          </Button>
        ))}
      </div>
    );
  };

  const renderKpis = () => {
    if (!kpis.length) return null;
    
    return (
      <div className="flex gap-4 mt-4">
        {kpis.map((kpi: any, index: number) => (
          <div key={index} className="text-center">
            <div className="text-xs text-gray-500">{kpi.title}</div>
            <div className="text-sm font-semibold">{kpi.value}</div>
            {kpi.change && (
              <div className="text-xs text-green-600">{kpi.change}</div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full h-full p-4 bg-white border border-gray-200 rounded-lg">
      {showTitle && (
        <div className="text-sm font-semibold mb-4 text-gray-800">{title}</div>
      )}
      
      {variant === 'with-buttons' && renderButtons()}
      
      <div className="flex-1 min-h-0" style={{ height: 'calc(100% - 60px)' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomLabel}
              outerRadius={outerRadius}
              innerRadius={innerRadius}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color || pieColors[index % pieColors.length]} 
                />
              ))}
            </Pie>
            
            {showLegend && variant === 'with-legend' && (
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value) => <span className="text-xs">{value}</span>}
              />
            )}
            
            <Tooltip 
              formatter={(value: any) => [value, '']}
              labelFormatter={(label) => label}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                fontSize: '12px'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      {variant === 'with-kpis' && renderKpis()}
    </div>
  );
}
