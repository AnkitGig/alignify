
import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface HistogramRendererProps {
  properties: any;
}

export function HistogramRenderer({ properties }: HistogramRendererProps) {
  const {
    histogramTitle = 'Histogram Chart',
    histogramData = [
      { range: '0-10', frequency: 5 },
      { range: '10-20', frequency: 8 },
      { range: '20-30', frequency: 12 },
      { range: '30-40', frequency: 15 },
      { range: '40-50', frequency: 10 },
      { range: '50-60', frequency: 7 },
      { range: '60-70', frequency: 4 },
      { range: '70-80', frequency: 2 }
    ],
    histogramPrimaryColor = '#4F46E5',
    showTitle = true,
    showLabels = true,
    showValues = true,
    showButtons = false,
    showKpis = false,
    histogramButtons = [],
    histogramKpis = [],
    backgroundColor = 'transparent',
    textAlignment = 'center',
    showGridLines = true,
    showLegend = false,
    binCount = 8
  } = properties;

  const getTitleAlignment = () => {
    switch (textAlignment) {
      case 'left':
        return 'text-left';
      case 'right':
        return 'text-right';
      case 'center':
      default:
        return 'text-center';
    }
  };

  return (
    <div className="w-full h-full" style={{ backgroundColor }}>
      <div className="p-4">
        {showTitle && (
          <h3 className={`text-lg font-semibold text-gray-800 mb-4 ${getTitleAlignment()}`}>
            {histogramTitle}
          </h3>
        )}
        
        {showButtons && histogramButtons.length > 0 && (
          <div className="flex justify-between mb-4">
            {histogramButtons.map((button, index) => (
              <button
                key={index}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
              >
                {button.title}
              </button>
            ))}
          </div>
        )}
        
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={histogramData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              {showGridLines && <CartesianGrid strokeDasharray="3 3" />}
              <XAxis 
                dataKey="range" 
                tick={{ fontSize: 12 }}
                hide={!showLabels}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                hide={!showLabels}
              />
              <Tooltip 
                formatter={(value: any) => [value, 'Frequency']}
                labelStyle={{ color: '#333' }}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
              />
              {showLegend && <Legend />}
              <Bar 
                dataKey="frequency" 
                fill={histogramPrimaryColor}
                stroke={histogramPrimaryColor}
                strokeWidth={1}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {showKpis && histogramKpis.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mt-4">
            {histogramKpis.map((kpi, index) => (
              <div key={index} className="text-center p-2 bg-gray-50 rounded">
                <div className="text-sm text-gray-600">{kpi.title}</div>
                <div className="text-lg font-bold text-gray-800">{kpi.value}</div>
                <div className="text-sm text-green-600">{kpi.change}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
