import React from 'react';
import { Element } from "@/types/wireframe";

interface ChartRendererProps {
  properties: Element['properties'];
  type: 'bar-chart' | 'column-chart';
}

export function ChartRenderer({ properties = {}, type }: ChartRendererProps) {
  const chartVariant = properties.chartVariant || 'default';
  const barColor = properties.barColor || '#4F46E5';
  const secondaryBarColor = properties.secondaryBarColor || '#818CF8';
  const tertiaryBarColor = properties.tertiaryBarColor || '#C7D2FE';
  const chartTitle = properties.chartTitle || 'Chart Title';
  const showLegend = properties.showLegend !== false;
  const showTitle = properties.showTitle !== false;
  const chartData = properties.chartData || [
    { category: 'Jan', value: 65 },
    { category: 'Feb', value: 78 },
    { category: 'Mar', value: 52 },
    { category: 'Apr', value: 84 },
    { category: 'May', value: 71 },
    { category: 'Jun', value: 93 }
  ];
  
  const chartButtons = properties.chartButtons || [];
  const chartKpis = properties.chartKpis || [];
  
  // Normalize values for display
  const maxValue = Math.max(...chartData.map((item: any) => item.value));
  const normalizedData = chartData.map((item: any) => ({
    ...item,
    normalizedValue: (item.value / maxValue) * 100
  }));
  
  // Render chart based on type and variant
  const renderChart = () => {
    if (type === 'column-chart') {
      switch (chartVariant) {
        case 'grouped':
          return (
            <div className="h-32 flex items-end justify-center space-x-3">
              {normalizedData.map((item: any, index: number) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="flex space-x-1 items-end">
                    <div 
                      className="w-6 rounded-sm transition-all" 
                      style={{ 
                        height: `${item.normalizedValue * 0.8}px`,
                        backgroundColor: barColor,
                        minHeight: '8px'
                      }}
                    ></div>
                    <div 
                      className="w-6 rounded-sm transition-all" 
                      style={{ 
                        height: `${(item.normalizedValue * 0.6)}px`,
                        backgroundColor: secondaryBarColor,
                        minHeight: '6px'
                      }}
                    ></div>
                  </div>
                  <div className="text-xs mt-1 text-gray-600">{item.category}</div>
                </div>
              ))}
            </div>
          );
        
        case 'stacked':
          return (
            <div className="h-32 flex items-end justify-center space-x-2">
              {normalizedData.map((item: any, index: number) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-8 flex flex-col">
                    <div 
                      className="w-8 rounded-t-sm transition-all" 
                      style={{ 
                        height: `${item.normalizedValue * 0.3}px`,
                        backgroundColor: tertiaryBarColor,
                        minHeight: '4px'
                      }}
                    ></div>
                    <div 
                      className="w-8 transition-all" 
                      style={{ 
                        height: `${item.normalizedValue * 0.3}px`,
                        backgroundColor: secondaryBarColor,
                        minHeight: '4px'
                      }}
                    ></div>
                    <div 
                      className="w-8 rounded-b-sm transition-all" 
                      style={{ 
                        height: `${item.normalizedValue * 0.4}px`,
                        backgroundColor: barColor,
                        minHeight: '6px'
                      }}
                    ></div>
                  </div>
                  <div className="text-xs mt-1 text-gray-600">{item.category}</div>
                </div>
              ))}
            </div>
          );
        
        case 'gradient':
          return (
            <div className="h-32 flex items-end justify-center space-x-2">
              {normalizedData.map((item: any, index: number) => (
                <div key={index} className="flex flex-col items-center">
                  <div 
                    className="w-8 rounded-sm transition-all bg-gradient-to-t" 
                    style={{ 
                      height: `${item.normalizedValue}px`,
                      background: `linear-gradient(to top, ${barColor}, ${secondaryBarColor})`,
                      minHeight: '8px'
                    }}
                  ></div>
                  <div className="text-xs mt-1 text-gray-600">{item.category}</div>
                </div>
              ))}
            </div>
          );
        
        default: // Standard column chart
          return (
            <div className="h-32 flex items-end justify-center space-x-2">
              {normalizedData.map((item: any, index: number) => (
                <div key={index} className="flex flex-col items-center">
                  <div 
                    className="w-8 rounded-sm transition-all" 
                    style={{ 
                      height: `${item.normalizedValue}px`,
                      backgroundColor: barColor,
                      minHeight: '8px'
                    }}
                  ></div>
                  <div className="text-xs mt-1 text-gray-600">{item.category}</div>
                </div>
              ))}
            </div>
          );
      }
    }
    
    // Bar chart rendering (existing logic)
    return (
      <div className="flex flex-col">
        {normalizedData.map((item: any, index: number) => (
          <div key={index} className="flex items-center space-x-2 mb-1">
            <div className="text-xs text-gray-500 w-12">{item.category}</div>
            <div 
              className="bg-indigo-600 h-4 rounded transition-all" 
              style={{ 
                width: `${item.normalizedValue}%`,
                backgroundColor: barColor
              }}
            ></div>
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div className="w-full h-full p-3 overflow-auto">
      {/* Add-ons at the top */}
      {(properties.showButtons !== false && chartButtons.length > 0) && (
        <div className="flex justify-between items-center mb-2">
          <div className="flex space-x-2">
            {chartButtons.map((button: any, index: number) => (
              <button
                key={index}
                className="text-xs px-2 py-1 bg-gray-100 rounded border hover:bg-gray-200"
              >
                {button.title}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* KPIs */}
      {(properties.showKpis !== false && chartKpis.length > 0) && (
        <div className="flex flex-wrap gap-4 mb-3">
          {chartKpis.map((kpi: any, index: number) => (
            <div key={index} className="text-xs">
              <div className="text-gray-500">{kpi.title}</div>
              <div className="font-semibold">
                {kpi.value} 
                {kpi.change && (
                  <span className="text-green-600 ml-1">{kpi.change}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {showTitle && <div className="text-sm font-medium mb-2">{chartTitle}</div>}
      
      {showLegend && chartVariant !== 'default' && (
        <div className="flex items-center mb-2 text-xs">
          <div className="flex items-center mr-3">
            <span className="mr-1" style={{ color: barColor }}>●</span> Series 1
          </div>
          {chartVariant === 'grouped' || chartVariant === 'stacked' ? (
            <div className="flex items-center mr-3">
              <span className="mr-1" style={{ color: secondaryBarColor }}>●</span> Series 2
            </div>
          ) : null}
          {chartVariant === 'stacked' && (
            <div className="flex items-center mr-3">
              <span className="mr-1" style={{ color: tertiaryBarColor }}>●</span> Series 3
            </div>
          )}
        </div>
      )}
      
      {renderChart()}
    </div>
  );
}
