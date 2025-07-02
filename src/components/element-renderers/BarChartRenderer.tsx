
import React from 'react';
import { Element } from "@/types/wireframe";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface BarChartRendererProps {
  properties: Element['properties'];
}

export function BarChartRenderer({ properties = {} }: BarChartRendererProps) {
  const chartTitle = properties.chartTitle || 'Title goes here';
  const chartHeight = properties.chartHeight || 300;
  const showLegend = properties.showLegend !== false;
  const showGridLines = properties.showGridLines !== false;
  const showLabels = properties.showLabels !== false;
  const barColor = properties.barColor || '#4F46E5';
  const secondaryBarColor = properties.secondaryBarColor || '#818CF8';
  const tertiaryBarColor = properties.tertiaryBarColor || '#C7D2FE';
  const chartVariant = properties.chartVariant || 'bar';
  const showKpis = properties.showKpis || false;
  const showButtons = properties.showButtons || false;
  const chartButtons = properties.chartButtons || [];
  const chartKpis = properties.chartKpis || [];

  // Sample data - in a real app this would come from props
  const defaultData = [
    { name: 'Jan', value: 400, value2: 240, value3: 140 },
    { name: 'Feb', value: 300, value2: 139, value3: 190 },
    { name: 'Mar', value: 200, value2: 980, value3: 290 },
    { name: 'Apr', value: 278, value2: 390, value3: 340 },
    { name: 'May', value: 189, value2: 480, value3: 420 },
  ];

  const data = properties.chartData || defaultData;

  const renderBars = () => {
    switch (chartVariant) {
      case 'multi-bar':
        return (
          <>
            <Bar dataKey="value" fill={barColor} name="Series 1" />
            <Bar dataKey="value2" fill={secondaryBarColor} name="Series 2" />
            <Bar dataKey="value3" fill={tertiaryBarColor} name="Series 3" />
          </>
        );
      case 'stacked-bar':
        return (
          <>
            <Bar dataKey="value" stackId="a" fill={barColor} name="Series 1" />
            <Bar dataKey="value2" stackId="a" fill={secondaryBarColor} name="Series 2" />
            <Bar dataKey="value3" stackId="a" fill={tertiaryBarColor} name="Series 3" />
          </>
        );
      default:
        return <Bar dataKey="value" fill={barColor} name="Value" />;
    }
  };

  const getButtonAlignment = (alignment: string) => {
    switch (alignment) {
      case 'center':
        return 'justify-center';
      case 'right':
        return 'justify-end';
      default:
        return 'justify-start';
    }
  };

  const defaultKpis = [
    { title: 'Total', value: '1,234', change: '+12%' },
    { title: 'Average', value: '567', change: '+8%' },
    { title: 'Growth', value: '+12%', change: '+3%' }
  ];

  const kpisToShow = chartKpis.length > 0 ? chartKpis : defaultKpis;

  return (
    <div className="w-full h-full p-3 flex flex-col">
      {/* Header section with title and optional buttons */}
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm font-medium">{chartTitle}</div>
        {showButtons && chartButtons.length > 0 && (
          <div className={`flex gap-2 ${getButtonAlignment(chartButtons[0]?.alignment || 'right')}`}>
            {chartButtons.map((button: any, index: number) => (
              <button 
                key={index}
                className="px-2 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200 transition-colors"
              >
                {button.title || 'Button'}
              </button>
            ))}
          </div>
        )}
        {showButtons && chartButtons.length === 0 && (
          <div className="flex gap-2">
            <button className="px-2 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200">
              Filter
            </button>
            <button className="px-2 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200">
              Export
            </button>
          </div>
        )}
      </div>

      {/* KPI section */}
      {showKpis && (
        <div className="flex gap-4 mb-3 p-2 bg-gray-50 rounded">
          {kpisToShow.slice(0, 3).map((kpi: any, index: number) => (
            <div key={index} className="text-center flex-1">
              <div className="text-lg font-bold" style={{ 
                color: index === 0 ? barColor : index === 1 ? secondaryBarColor : '#059669' 
              }}>
                {kpi.value}
              </div>
              <div className="text-xs text-gray-600">{kpi.title}</div>
              {kpi.change && (
                <div className={`text-xs ${kpi.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {kpi.change}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Chart section */}
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            {showGridLines && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip />
            {showLegend && <Legend />}
            {renderBars()}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
