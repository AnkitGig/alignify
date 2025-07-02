
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell, Legend } from 'recharts';

interface WaterfallRendererProps {
  properties?: {
    waterfallTitle?: string;
    showTitle?: boolean;
    titleAlignment?: string;
    waterfallData?: Array<{category: string, value: number, isTotal?: boolean}>;
    waterfallPrimaryColor?: string;
    waterfallSecondaryColor?: string;
    waterfallTotalColor?: string;
    showGridLines?: boolean;
    showLabels?: boolean;
    showXAxis?: boolean;
    showXAxisTitle?: boolean;
    xAxisTitle?: string;
    xAxisLabelRotation?: number;
    showXAxisLabels?: boolean;
    showYAxis?: boolean;
    showYAxisTitle?: boolean;
    yAxisTitle?: string;
    yAxisMin?: number;
    yAxisMax?: number;
    yAxisStepSize?: number;
    showYAxisLabels?: boolean;
    yAxisLabelFormat?: string;
    columnWidth?: number;
    showLegends?: boolean;
    legendPosition?: string;
    waterfallVariant?: 'basic-waterfall' | 'with-buttons' | 'with-kpis';
    waterfallButtons?: Array<{title: string, alignment: string}>;
    waterfallKpis?: Array<{title: string, value: string, change?: string}>;
    showButtons?: boolean;
    showKpis?: boolean;
  };
}

export function WaterfallRenderer({ properties = {} }: WaterfallRendererProps) {
  console.log('WaterfallRenderer rendering with properties:', properties);
  
  const {
    waterfallTitle = 'Waterfall Chart',
    showTitle = true,
    titleAlignment = 'left',
    waterfallData = [
      { category: 'Jan 22', value: 50, isTotal: false },
      { category: 'Feb 22', value: 130, isTotal: false },
      { category: 'Mar 22', value: 80, isTotal: false },
      { category: 'Apr 22', value: 150, isTotal: false },
      { category: 'May 22', value: 120, isTotal: false },
      { category: 'Total', value: 530, isTotal: true }
    ],
    waterfallPrimaryColor = '#4F46E5',
    waterfallSecondaryColor = '#818CF8',
    waterfallTotalColor = '#10B981',
    showGridLines = true,
    showLabels = true,
    showXAxis = true,
    showXAxisTitle = false,
    xAxisTitle = '',
    xAxisLabelRotation = 0,
    showXAxisLabels = true,
    showYAxis = true,
    showYAxisTitle = false,
    yAxisTitle = '',
    yAxisMin = 0,
    yAxisMax = 600,
    showYAxisLabels = true,
    yAxisLabelFormat = 'number',
    columnWidth = 50,
    showLegends = false,
    legendPosition = 'top-left',
    waterfallVariant = 'basic-waterfall',
    waterfallButtons = [],
    waterfallKpis = [],
    showButtons = false,
    showKpis = false
  } = properties;

  const getBarColor = (entry: any, index: number) => {
    if (entry.isTotal) return waterfallTotalColor;
    return index % 2 === 0 ? waterfallPrimaryColor : waterfallSecondaryColor;
  };

  const barSize = Math.max(20, Math.min(100, columnWidth));

  const formatYAxisLabel = (value: number) => {
    switch (yAxisLabelFormat) {
      case 'currency':
        return `$${value.toLocaleString()}`;
      case 'percentage':
        return `${value}%`;
      case 'decimal':
        return value.toFixed(2);
      default:
        return value.toLocaleString();
    }
  };

  const getTitleAlignment = () => {
    switch (titleAlignment) {
      case 'center': return 'text-center';
      case 'right': return 'text-right';
      default: return 'text-left';
    }
  };

  // Custom tick component for rotated labels
  const CustomXAxisTick = (props: any) => {
    const { x, y, payload } = props;
    return (
      <g transform={`translate(${x},${y})`}>
        <text 
          x={0} 
          y={0} 
          dy={16} 
          textAnchor={xAxisLabelRotation !== 0 ? 'end' : 'middle'}
          fill="#6b7280" 
          fontSize="12"
          transform={`rotate(${xAxisLabelRotation})`}
        >
          {payload.value}
        </text>
      </g>
    );
  };

  return (
    <div className="h-full w-full bg-white border border-gray-200 rounded-lg p-4">
      {showTitle && (
        <h3 className={`text-lg font-semibold text-gray-800 mb-4 ${getTitleAlignment()}`}>
          {waterfallTitle}
        </h3>
      )}
      
      {/* Buttons Section */}
      {(showButtons && waterfallButtons.length > 0) && (
        <div className="flex flex-wrap gap-2 justify-between mb-4">
          {waterfallButtons.map((button, index) => (
            <button
              key={index}
              className={`px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 ${
                button.alignment === 'left' ? 'mr-auto' : 
                button.alignment === 'right' ? 'ml-auto' : 'mx-auto'
              }`}
            >
              {button.title}
            </button>
          ))}
        </div>
      )}

      <div className="flex justify-start">
        <div className="flex-1 relative" style={{ height: '200px', maxWidth: '100%' }}>
          {showYAxisTitle && yAxisTitle && (
            <div className="absolute left-0 top-1/2 transform -rotate-90 -translate-y-1/2 -translate-x-6">
              <span className="text-sm text-gray-600 font-medium">{yAxisTitle}</span>
            </div>
          )}
          
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={waterfallData} 
              margin={{ 
                top: 5, 
                right: 30, 
                left: showYAxisTitle ? 40 : 20, 
                bottom: showXAxisTitle ? 40 : 5 
              }}
            >
              {showGridLines && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />}
              {showXAxis && (
                <XAxis 
                  dataKey="category" 
                  axisLine={false}
                  tickLine={false}
                  tick={showXAxisLabels ? (xAxisLabelRotation !== 0 ? <CustomXAxisTick /> : { fontSize: 12, fill: '#6b7280' }) : false}
                />
              )}
              {showYAxis && (
                <YAxis 
                  domain={[yAxisMin, yAxisMax]}
                  axisLine={false}
                  tickLine={false}
                  tick={showYAxisLabels ? { fontSize: 12, fill: '#6b7280' } : false}
                  tickFormatter={formatYAxisLabel}
                />
              )}
              {showLegends && (
                <Legend 
                  verticalAlign={legendPosition.includes('top') ? 'top' : 'bottom'}
                  align={legendPosition.includes('left') ? 'left' : 'right'}
                  height={36}
                />
              )}
              <Bar 
                dataKey="value" 
                radius={[2, 2, 0, 0]}
                maxBarSize={barSize}
              >
                {waterfallData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry, index)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          
          {showXAxisTitle && xAxisTitle && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-6">
              <span className="text-sm text-gray-600 font-medium">{xAxisTitle}</span>
            </div>
          )}
        </div>
      </div>

      {/* KPIs Section */}
      {(showKpis && waterfallKpis.length > 0) && (
        <div className="flex flex-wrap justify-around mt-4 pt-4 border-t border-gray-200 gap-4">
          {waterfallKpis.map((kpi, index) => (
            <div key={index} className="text-center min-w-0 flex-1">
              <div className="text-sm text-gray-600 truncate">{kpi.title}</div>
              <div className="text-lg font-semibold">{kpi.value}</div>
              {kpi.change && (
                <div className="text-sm text-green-600">{kpi.change}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
