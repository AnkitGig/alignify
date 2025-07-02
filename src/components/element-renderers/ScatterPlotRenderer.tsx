
import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, ReferenceLine } from 'recharts';

interface ScatterPlotRendererProps {
  properties?: {
    scatterPlotStyle?: string;
    scatterPlotTitle?: string;
    scatterPlotData?: Array<{name: string, x: number, y: number, size?: number}>;
    scatterPlotPrimaryColor?: string;
    scatterPlotSecondaryColor?: string;
    showGridLines?: boolean;
    showLabels?: boolean;
    scatterXAxisLabel?: string;
    scatterYAxisLabel?: string;
    showTrendLine?: boolean;
    showCorrelation?: boolean;
    correlationValue?: number;
  };
}

export function ScatterPlotRenderer({ properties = {} }: ScatterPlotRendererProps) {
  const {
    scatterPlotStyle = 'default',
    scatterPlotTitle = 'Scatter Plot',
    scatterPlotData = [
      { name: 'A', x: 20, y: 30, size: 10 },
      { name: 'B', x: 40, y: 50, size: 15 },
      { name: 'C', x: 60, y: 25, size: 8 },
      { name: 'D', x: 80, y: 70, size: 12 },
      { name: 'E', x: 35, y: 45, size: 18 }
    ],
    scatterPlotPrimaryColor = '#3B82F6',
    scatterPlotSecondaryColor = '#93C5FD',
    showGridLines = true,
    showLabels = true,
    scatterXAxisLabel = 'X Axis',
    scatterYAxisLabel = 'Y Axis',
    showTrendLine = false,
    showCorrelation = false,
    correlationValue = 0.75
  } = properties;

  const renderScatterPlot = () => {
    switch (scatterPlotStyle) {
      case 'correlation-analysis':
        return (
          <div className="w-full h-full p-4 bg-white border rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-center">{scatterPlotTitle}</h3>
            {showCorrelation && (
              <div className="text-center mb-2 text-sm text-gray-600">
                Correlation: {correlationValue?.toFixed(2) || '0.75'}
              </div>
            )}
            <ResponsiveContainer width="100%" height="80%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={showGridLines ? '#e0e0e0' : 'transparent'} />
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  label={showLabels ? { value: scatterXAxisLabel, position: 'insideBottom', offset: -10 } : undefined}
                />
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  label={showLabels ? { value: scatterYAxisLabel, angle: -90, position: 'insideLeft' } : undefined}
                />
                <Tooltip formatter={(value, name) => [value, name]} />
                {showTrendLine && (
                  <ReferenceLine 
                    segment={[{x: 20, y: 25}, {x: 80, y: 75}]} 
                    stroke="#10b981" 
                    strokeDasharray="3 3" 
                  />
                )}
                <Scatter data={scatterPlotData} fill="#10b981" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        );
      
      case 'performance-comparison':
        return (
          <div className="w-full h-full p-4 bg-white border rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-center">{scatterPlotTitle}</h3>
            <ResponsiveContainer width="100%" height="80%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={showGridLines ? '#e0e0e0' : 'transparent'} />
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  label={showLabels ? { value: 'Performance Score', position: 'insideBottom', offset: -10 } : undefined}
                />
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  label={showLabels ? { value: 'Satisfaction Rating', angle: -90, position: 'insideLeft' } : undefined}
                />
                <Tooltip formatter={(value, name) => [value, name]} />
                <Scatter data={scatterPlotData} fill="#f59e0b" />
              </ScatterChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
              <div className="text-center p-1 bg-amber-50 rounded text-amber-700">High Performance</div>
              <div className="text-center p-1 bg-amber-50 rounded text-amber-700">High Satisfaction</div>
            </div>
          </div>
        );
      
      case 'trend-analysis':
        return (
          <div className="w-full h-full p-4 bg-white border rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-center">{scatterPlotTitle}</h3>
            <ResponsiveContainer width="100%" height="80%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={showGridLines ? '#e0e0e0' : 'transparent'} />
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  label={showLabels ? { value: 'Time Period', position: 'insideBottom', offset: -10 } : undefined}
                />
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  label={showLabels ? { value: 'Value', angle: -90, position: 'insideLeft' } : undefined}
                />
                <Tooltip formatter={(value, name) => [value, name]} />
                <ReferenceLine 
                  segment={[{x: 20, y: 30}, {x: 80, y: 60}]} 
                  stroke="#ef4444" 
                  strokeDasharray="2 2" 
                />
                <Scatter data={scatterPlotData} fill="#ef4444" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        );
      
      default:
        return (
          <div className="w-full h-full p-4 bg-white border rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-center">{scatterPlotTitle}</h3>
            <ResponsiveContainer width="100%" height="80%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={showGridLines ? '#e0e0e0' : 'transparent'} />
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  label={showLabels ? { value: scatterXAxisLabel, position: 'insideBottom', offset: -10 } : undefined}
                />
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  label={showLabels ? { value: scatterYAxisLabel, angle: -90, position: 'insideLeft' } : undefined}
                />
                <Tooltip formatter={(value, name) => [value, name]} />
                <Scatter data={scatterPlotData} fill={scatterPlotPrimaryColor} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        );
    }
  };

  return renderScatterPlot();
}
