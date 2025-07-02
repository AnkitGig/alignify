
import React from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area } from 'recharts';
import { Element } from '@/types/wireframe';
import { Button } from '@/components/ui/button';
import { Download, Filter, RefreshCw, MoreHorizontal, ZoomIn, ZoomOut } from 'lucide-react';

interface ComboChartRendererProps {
  properties: Element['properties'];
  onUpdateProperties?: (properties: Partial<Element['properties']>) => void;
}

export function ComboChartRenderer({ properties, onUpdateProperties }: ComboChartRendererProps) {
  const {
    chartTitle = 'Combo Chart',
    chartData = [
      { category: 'Jan 22', value: 30, line: 25, secondary: 20 },
      { category: 'Feb 22', value: 45, line: 35, secondary: 30 },
      { category: 'Mar 22', value: 35, line: 40, secondary: 25 },
      { category: 'Apr 22', value: 50, line: 45, secondary: 35 },
      { category: 'May 22', value: 25, line: 30, secondary: 40 },
      { category: 'Jun 22', value: 60, line: 55, secondary: 45 }
    ],
    barColor = '#3b82f6',
    lineColor = '#10b981',
    secondaryBarColor = '#f59e0b',
    tertiaryBarColor = '#ef4444',
    showLegend = true,
    showGridLines = true,
    showLabels = true,
    chartHeight = 300,
    chartVariant = 'basic-combo',
    showButtons = false,
    chartButtons = [
      { title: 'Export', alignment: 'left' },
      { title: 'Filter', alignment: 'right' }
    ],
    showKpis = false,
    chartKpis = [
      { title: 'Total Sales', value: '$245K', change: '+12%' },
      { title: 'Growth Rate', value: '8.5%', change: '+2.1%' }
    ],
    chartBackground = '#ffffff',
    plotBackground = '#f8fafc',
    enableAnimation = true,
    animationDuration = 1000,
    showDataLabels = false,
    labelPosition = 'top',
    customTooltip = false,
    tooltipFormat = '{name}: {value}',
    enableZoom = false,
    enablePan = false,
    enableExport = false,
    exportFormats = 'png'
  } = properties || {};

  const handleButtonClick = (buttonTitle: string) => {
    console.log(`${buttonTitle} button clicked`);
    
    switch (buttonTitle.toLowerCase()) {
      case 'export':
        if (enableExport) {
          console.log(`Exporting chart as ${exportFormats}...`);
        }
        break;
      case 'filter':
        console.log('Opening filter options...');
        break;
      case 'refresh':
        console.log('Refreshing chart data...');
        break;
      case 'zoom in':
        console.log('Zooming in...');
        break;
      case 'zoom out':
        console.log('Zooming out...');
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
              {customTooltip && tooltipFormat 
                ? tooltipFormat.replace('{name}', entry.name).replace('{value}', entry.value)
                : `${entry.name}: ${entry.value}`
              }
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderDataLabel = (props: any) => {
    if (!showDataLabels) return null;
    
    const { x, y, width, height, value } = props;
    let labelY = y;
    
    switch (labelPosition) {
      case 'top':
        labelY = y - 5;
        break;
      case 'middle':
        labelY = y + height / 2;
        break;
      case 'bottom':
        labelY = y + height + 15;
        break;
      case 'inside':
        labelY = y + height / 2;
        break;
      case 'outside':
        labelY = y - 5;
        break;
    }
    
    return (
      <text 
        x={x + width / 2} 
        y={labelY} 
        fill="#666" 
        textAnchor="middle" 
        fontSize={10}
      >
        {value}
      </text>
    );
  };

  const isAdvancedVariant = chartVariant === 'advanced-combo';
  const isMultiChartVariant = chartVariant === 'multi-line-combo';

  return (
    <div 
      className="w-full h-full border rounded-lg p-4"
      style={{ backgroundColor: chartBackground }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          {chartTitle && (
            <h3 className="text-lg font-semibold text-gray-800">{chartTitle}</h3>
          )}
          {isAdvancedVariant && (
            <p className="text-xs text-gray-500 mt-1">Advanced Interactive Chart</p>
          )}
          {isMultiChartVariant && (
            <p className="text-xs text-gray-500 mt-1">Multi-Series Comparison Chart</p>
          )}
        </div>
        
        {/* Advanced Action Buttons */}
        {(showButtons || isAdvancedVariant) && (
          <div className="flex items-center gap-2">
            {isAdvancedVariant && enableZoom && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleButtonClick('Zoom In')}
                  className="text-xs"
                >
                  <ZoomIn className="h-3 w-3" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleButtonClick('Zoom Out')}
                  className="text-xs"
                >
                  <ZoomOut className="h-3 w-3" />
                </Button>
              </>
            )}
            
            {chartButtons && chartButtons.length > 0 && chartButtons.map((button, index) => {
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
                  className="text-xs"
                >
                  {getIcon(button.title)}
                  <span className="ml-1">{button.title}</span>
                </Button>
              );
            })}
          </div>
        )}
      </div>

      {/* Advanced KPIs Section */}
      {(showKpis || isAdvancedVariant || isMultiChartVariant) && chartKpis && chartKpis.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mb-4">
          {chartKpis.map((kpi, index) => (
            <div key={index} className="bg-gray-50 p-3 rounded-lg border">
              <div className="text-sm text-gray-600">{kpi.title}</div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">{kpi.value}</span>
                {kpi.change && (
                  <span className={`text-xs px-2 py-1 rounded ${
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
        style={{ height: chartHeight, backgroundColor: plotBackground }}
        className="rounded border"
      >
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart 
            data={chartData} 
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            {showGridLines && <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />}
            <XAxis 
              dataKey="category" 
              tick={{ fontSize: 12, fill: '#64748b' }}
              axisLine={showLabels}
              tickLine={showLabels}
              stroke="#94a3b8"
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#64748b' }}
              axisLine={showLabels}
              tickLine={showLabels}
              stroke="#94a3b8"
            />
            
            {customTooltip ? (
              <Tooltip content={<CustomTooltip />} />
            ) : (
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
            )}
            
            {showLegend && (
              <Legend 
                wrapperStyle={{ fontSize: '12px', color: '#64748b' }}
              />
            )}
            
            {/* Primary Bar */}
            <Bar 
              dataKey="value" 
              fill={barColor}
              name="Primary Data"
              radius={[2, 2, 0, 0]}
              animationDuration={enableAnimation ? animationDuration : 0}
              label={showDataLabels ? renderDataLabel : false}
            />
            
            {/* Secondary Bar for Multi-Chart */}
            {isMultiChartVariant && (
              <Bar 
                dataKey="secondary" 
                fill={secondaryBarColor}
                name="Secondary Data"
                radius={[2, 2, 0, 0]}
                animationDuration={enableAnimation ? animationDuration : 0}
                label={showDataLabels ? renderDataLabel : false}
              />
            )}
            
            {/* Tertiary Bar for Multi-Chart */}
            {isMultiChartVariant && chartData.some(d => d.tertiary) && (
              <Bar 
                dataKey="tertiary" 
                fill={tertiaryBarColor}
                name="Tertiary Data"
                radius={[2, 2, 0, 0]}
                animationDuration={enableAnimation ? animationDuration : 0}
                label={showDataLabels ? renderDataLabel : false}
              />
            )}
            
            {/* Primary Line */}
            <Line 
              type="monotone" 
              dataKey="line" 
              stroke={lineColor}
              strokeWidth={isAdvancedVariant ? 3 : 2}
              name="Line Data"
              dot={{ fill: lineColor, strokeWidth: 2, r: isAdvancedVariant ? 5 : 4 }}
              animationDuration={enableAnimation ? animationDuration : 0}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      
      {/* Advanced Features Indicator */}
      {isAdvancedVariant && (
        <div className="mt-3 flex justify-between text-xs text-gray-500">
          <span>Interactive Features: {enableZoom ? 'Zoom' : ''} {enablePan ? 'Pan' : ''} {enableExport ? 'Export' : ''}</span>
          <span>Animation: {enableAnimation ? `${animationDuration}ms` : 'Disabled'}</span>
        </div>
      )}
    </div>
  );
}
