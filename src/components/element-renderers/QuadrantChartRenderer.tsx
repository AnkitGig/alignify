
import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from 'recharts';

interface QuadrantChartRendererProps {
  properties?: {
    quadrantStyle?: string;
    quadrantTitle?: string;
    quadrantData?: Array<{name: string, x: number, y: number}>;
    quadrantPrimaryColor?: string;
    quadrantSecondaryColor?: string;
    showGridLines?: boolean;
    showLabels?: boolean;
    xAxisLabel?: string;
    yAxisLabel?: string;
    quadrantLabels?: Array<{label: string, position: string}>;
  };
}

export function QuadrantChartRenderer({ properties = {} }: QuadrantChartRendererProps) {
  const {
    quadrantStyle = 'default',
    quadrantTitle = 'Quadrant Chart',
    quadrantData = [
      { name: 'A', x: 2, y: 3 },
      { name: 'B', x: 4, y: 1 },
      { name: 'C', x: 1, y: 4 },
      { name: 'D', x: 3, y: 2 }
    ],
    quadrantPrimaryColor = '#3B82F6',
    quadrantSecondaryColor = '#93C5FD',
    showGridLines = true,
    showLabels = true,
    xAxisLabel = 'X Axis',
    yAxisLabel = 'Y Axis',
    quadrantLabels = [
      { label: 'High Impact, Low Effort', position: 'top-right' },
      { label: 'High Impact, High Effort', position: 'top-left' },
      { label: 'Low Impact, Low Effort', position: 'bottom-right' },
      { label: 'Low Impact, High Effort', position: 'bottom-left' }
    ]
  } = properties;

  const renderQuadrantChart = () => {
    switch (quadrantStyle) {
      case 'priority-matrix':
        return (
          <div className="w-full h-full p-4 bg-white border rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-center">{quadrantTitle}</h3>
            <ResponsiveContainer width="100%" height="80%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={showGridLines ? '#e0e0e0' : 'transparent'} />
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  domain={[0, 5]} 
                  label={showLabels ? { value: xAxisLabel, position: 'insideBottom', offset: -10 } : undefined}
                />
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  domain={[0, 5]} 
                  label={showLabels ? { value: yAxisLabel, angle: -90, position: 'insideLeft' } : undefined}
                />
                <ReferenceLine x={2.5} stroke="#666" strokeDasharray="2 2" />
                <ReferenceLine y={2.5} stroke="#666" strokeDasharray="2 2" />
                <Scatter data={quadrantData} fill={quadrantPrimaryColor} />
              </ScatterChart>
            </ResponsiveContainer>
            {showLabels && (
              <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                {quadrantLabels.map((item, index) => (
                  <div key={index} className="text-center p-1 bg-gray-50 rounded">
                    {item.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      
      case 'risk-assessment':
        return (
          <div className="w-full h-full p-4 bg-white border rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-center">{quadrantTitle}</h3>
            <ResponsiveContainer width="100%" height="80%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={showGridLines ? '#e0e0e0' : 'transparent'} />
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  domain={[0, 5]} 
                  label={showLabels ? { value: 'Probability', position: 'insideBottom', offset: -10 } : undefined}
                />
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  domain={[0, 5]} 
                  label={showLabels ? { value: 'Impact', angle: -90, position: 'insideLeft' } : undefined}
                />
                <ReferenceLine x={2.5} stroke="#ef4444" strokeDasharray="2 2" />
                <ReferenceLine y={2.5} stroke="#ef4444" strokeDasharray="2 2" />
                <Scatter data={quadrantData} fill="#ef4444" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        );
      
      case 'performance-potential':
        return (
          <div className="w-full h-full p-4 bg-white border rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-center">{quadrantTitle}</h3>
            <ResponsiveContainer width="100%" height="80%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={showGridLines ? '#e0e0e0' : 'transparent'} />
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  domain={[0, 5]} 
                  label={showLabels ? { value: 'Performance', position: 'insideBottom', offset: -10 } : undefined}
                />
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  domain={[0, 5]} 
                  label={showLabels ? { value: 'Potential', angle: -90, position: 'insideLeft' } : undefined}
                />
                <ReferenceLine x={2.5} stroke="#10b981" strokeDasharray="2 2" />
                <ReferenceLine y={2.5} stroke="#10b981" strokeDasharray="2 2" />
                <Scatter data={quadrantData} fill="#10b981" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        );
      
      default:
        return (
          <div className="w-full h-full p-4 bg-white border rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-center">{quadrantTitle}</h3>
            <ResponsiveContainer width="100%" height="80%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={showGridLines ? '#e0e0e0' : 'transparent'} />
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  domain={[0, 5]} 
                  label={showLabels ? { value: xAxisLabel, position: 'insideBottom', offset: -10 } : undefined}
                />
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  domain={[0, 5]} 
                  label={showLabels ? { value: yAxisLabel, angle: -90, position: 'insideLeft' } : undefined}
                />
                <ReferenceLine x={2.5} stroke="#666" strokeDasharray="2 2" />
                <ReferenceLine y={2.5} stroke="#666" strokeDasharray="2 2" />
                <Scatter data={quadrantData} fill={quadrantPrimaryColor} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        );
    }
  };

  return renderQuadrantChart();
}
