
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Element } from '@/types/wireframe';
import { Button } from '@/components/ui/button';
import { Download, Filter, RefreshCw, MoreHorizontal } from 'lucide-react';

interface LineChartRendererProps {
  properties: Element['properties'];
  onUpdateProperties?: (properties: Partial<Element['properties']>) => void;
}

export function LineChartRenderer({ properties, onUpdateProperties }: LineChartRendererProps) {
  const {
    chartTitle = 'Line Chart',
    chartData = [
      { category: 'Jan 22', value: 30, line: 25 },
      { category: 'Feb 22', value: 45, line: 35 },
      { category: 'Mar 22', value: 35, line: 40 },
      { category: 'Apr 22', value: 50, line: 45 },
      { category: 'May 22', value: 25, line: 30 },
      { category: 'Jun 22', value: 60, line: 55 }
    ],
    lineColor = '#3b82f6',
    secondaryBarColor = '#10b981',
    tertiaryBarColor = '#f59e0b',
    showLegend = true,
    showGridLines = true,
    showLabels = true,
    chartHeight = 300,
    chartVariant = 'basic-line',
    showButtons = false,
    chartButtons = [
      { title: 'Export', alignment: 'left' },
      { title: 'Filter', alignment: 'right' }
    ],
    showKpis = false,
    chartKpis = [
      { title: 'Total Growth', value: '12.5%', change: '+2.1%' },
      { title: 'Trend Score', value: '8.2', change: '+0.8' }
    ],
    chartBackground = '#ffffff',
    plotBackground = '#f8fafc',
    enableAnimation = true,
    animationDuration = 1000,
    showDataLabels = false,
    lineStyle = 'solid',
    lineWidth = 2,
    showMarkers = true,
    markerStyle = 'circle',
    markerSize = 6,
    curveType = 'monotone'
  } = properties || {};

  const handleButtonClick = (buttonTitle: string) => {
    console.log(`${buttonTitle} button clicked`);
    
    switch (buttonTitle.toLowerCase()) {
      case 'export':
        console.log('Exporting line chart...');
        break;
      case 'filter':
        console.log('Opening filter options...');
        break;
      case 'refresh':
        console.log('Refreshing chart data...');
        break;
      default:
        console.log(`${buttonTitle} action triggered`);
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const getStrokeDasharray = () => {
    switch (lineStyle) {
      case 'dashed':
        return '8 8';
      case 'dotted':
        return '2 2';
      default:
        return '0';
    }
  };

  const isMultiLineVariant = chartVariant === 'multi-line';

  // Calculate available height for chart
  const headerHeight = chartTitle ? 60 : 20;
  const kpiHeight = (showKpis && chartKpis && chartKpis.length > 0) ? 80 : 0;
  const buttonHeight = (showButtons && chartButtons && chartButtons.length > 0) ? 40 : 0;
  const availableHeight = Math.max(200, Math.min(chartHeight, 400) - headerHeight - kpiHeight - buttonHeight);

  return (
    <div 
      className="w-full h-full border rounded-lg p-2 sm:p-4 overflow-hidden flex flex-col"
      style={{ backgroundColor: chartBackground }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2 shrink-0">
        <div className="min-w-0 flex-1">
          {chartTitle && (
            <h3 className="text-sm sm:text-lg font-semibold text-gray-800 truncate">{chartTitle}</h3>
          )}
          {isMultiLineVariant && (
            <p className="text-xs text-gray-500 mt-1">Multi-Series Line Chart</p>
          )}
        </div>
        
        {showButtons && chartButtons && chartButtons.length > 0 && (
          <div className="flex items-center gap-1 sm:gap-2 flex-wrap shrink-0">
            {chartButtons.map((button, index) => {
              const getIcon = (title: string) => {
                switch (title.toLowerCase()) {
                  case 'export':
                    return <Download className="h-3 w-3" />;
                  case 'filter':
                    return <Filter className="h-3 w-3" />;
                  case 'refresh':
                    return <RefreshCw className="h-3 w-3" />;
                  default:
                    return <MoreHorizontal className="h-3 w-3" />;
                }
              };

              return (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleButtonClick(button.title)}
                  className="text-xs p-1 sm:p-2"
                >
                  {getIcon(button.title)}
                  <span className="ml-1 hidden sm:inline">{button.title}</span>
                </Button>
              );
            })}
          </div>
        )}
      </div>

      {showKpis && chartKpis && chartKpis.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mb-2 shrink-0">
          {chartKpis.map((kpi, index) => (
            <div key={index} className="bg-gray-50 p-2 sm:p-3 rounded-lg border">
              <div className="text-xs sm:text-sm text-gray-600 truncate">{kpi.title}</div>
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-lg font-semibold truncate">{kpi.value}</span>
                {kpi.change && (
                  <span className={`text-xs px-1 sm:px-2 py-1 rounded ${
                    kpi.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {kpi.change}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div 
        style={{ 
          height: availableHeight, 
          backgroundColor: plotBackground,
          minHeight: '200px'
        }}
        className="rounded border w-full flex-1"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={chartData} 
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            {showGridLines && <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />}
            <XAxis 
              dataKey="category" 
              tick={{ fontSize: 9, fill: '#64748b' }}
              axisLine={showLabels}
              tickLine={showLabels}
              stroke="#94a3b8"
              interval="preserveStartEnd"
              height={30}
            />
            <YAxis 
              tick={{ fontSize: 9, fill: '#64748b' }}
              axisLine={showLabels}
              tickLine={showLabels}
              stroke="#94a3b8"
              width={35}
            />
            
            <Tooltip content={<CustomTooltip />} />
            
            {showLegend && (
              <Legend 
                wrapperStyle={{ fontSize: '9px', color: '#64748b' }}
                iconSize={8}
              />
            )}
            
            {/* Primary Line */}
            <Line 
              type={curveType as any}
              dataKey="value" 
              stroke={lineColor}
              strokeWidth={lineWidth}
              strokeDasharray={getStrokeDasharray()}
              name="Primary Data"
              dot={showMarkers ? { 
                fill: lineColor, 
                strokeWidth: 2, 
                r: Math.max(3, markerSize - 1)
              } : false}
              animationDuration={enableAnimation ? animationDuration : 0}
            />
            
            {/* Secondary Line for Multi-Line */}
            {isMultiLineVariant && (
              <Line 
                type={curveType as any}
                dataKey="line" 
                stroke={secondaryBarColor}
                strokeWidth={lineWidth}
                strokeDasharray={getStrokeDasharray()}
                name="Secondary Data"
                dot={showMarkers ? { 
                  fill: secondaryBarColor, 
                  strokeWidth: 2, 
                  r: Math.max(3, markerSize - 1)
                } : false}
                animationDuration={enableAnimation ? animationDuration : 0}
              />
            )}
            
            {/* Tertiary Line for Multi-Line */}
            {isMultiLineVariant && chartData.some(d => d.tertiary) && (
              <Line 
                type={curveType as any}
                dataKey="tertiary" 
                stroke={tertiaryBarColor}
                strokeWidth={lineWidth}
                strokeDasharray={getStrokeDasharray()}
                name="Tertiary Data"
                dot={showMarkers ? { 
                  fill: tertiaryBarColor, 
                  strokeWidth: 2, 
                  r: Math.max(3, markerSize - 1)
                } : false}
                animationDuration={enableAnimation ? animationDuration : 0}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
