
import React from 'react';
import { ResponsiveContainer, Treemap, Cell, Tooltip } from 'recharts';

interface TreemapRendererProps {
  properties: any;
}

export function TreemapRenderer({ properties }: TreemapRendererProps) {
  const {
    treemapTitle = 'Treemap Chart',
    treemapData = [],
    treemapPrimaryColor = '#4F46E5',
    showTitle = true,
    showLabels = true,
    showValues = true,
    showButtons = false,
    showKpis = false,
    treemapButtons = [],
    treemapKpis = [],
    backgroundColor = 'transparent',
    textAlignment = 'center'
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

  const CustomContent = (props: any) => {
    const { root, depth, x, y, width, height, index, colors, name, value } = props;
    
    // Only render content for leaf nodes (depth === 1)
    if (depth !== 1) return null;
    
    // Calculate text size based on cell dimensions
    const cellArea = width * height;
    const baseFontSize = Math.max(10, Math.min(16, Math.sqrt(cellArea) / 8));
    const nameSize = baseFontSize;
    const valueSize = baseFontSize - 2;
    
    // Determine if we should use light or dark text based on background color
    const bgColor = colors[Math.floor(index % colors.length)] || treemapPrimaryColor;
    const textColor = '#FFFFFF'; // Always use white for better contrast
    
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: bgColor,
            stroke: '#fff',
            strokeWidth: 2,
            strokeOpacity: 1,
          }}
        />
        {showLabels && width > 40 && height > 30 && (
          <text
            x={x + width / 2}
            y={y + height / 2 - (showValues ? 6 : 0)}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={textColor}
            fontSize={nameSize}
            fontWeight="600"
            style={{
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              pointerEvents: 'none'
            }}
          >
            {name}
          </text>
        )}
        {showValues && width > 40 && height > 40 && (
          <text
            x={x + width / 2}
            y={y + height / 2 + (showLabels ? 12 : 0)}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={textColor}
            fontSize={valueSize}
            fontWeight="500"
            style={{
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              pointerEvents: 'none'
            }}
          >
            {value}
          </text>
        )}
      </g>
    );
  };

  return (
    <div className="w-full h-full" style={{ backgroundColor }}>
      <div className="p-4">
        {showTitle && (
          <h3 className={`text-lg font-semibold text-gray-800 mb-4 ${getTitleAlignment()}`}>
            {treemapTitle}
          </h3>
        )}
        
        {showButtons && treemapButtons.length > 0 && (
          <div className="flex justify-between mb-4">
            {treemapButtons.map((button, index) => (
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
            <Treemap
              data={treemapData}
              dataKey="value"
              aspectRatio={4/3}
              stroke="#fff"
              fill={treemapPrimaryColor}
              content={<CustomContent colors={treemapData.map(item => item.color || treemapPrimaryColor)} />}
            >
              <Tooltip 
                formatter={(value: any, name: any) => [value, name]}
                labelStyle={{ color: '#333' }}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
              />
            </Treemap>
          </ResponsiveContainer>
        </div>
        
        {showKpis && treemapKpis.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mt-4">
            {treemapKpis.map((kpi, index) => (
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
