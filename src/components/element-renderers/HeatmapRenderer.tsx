
import React from 'react';
import { Element } from "@/types/wireframe";

interface HeatmapRendererProps {
  properties: Element['properties'];
}

export function HeatmapRenderer({ properties }: HeatmapRendererProps) {
  const {
    heatmapTitle = 'Title goes here',
    showTitle = true,
    textAlignment = 'left',
    heatmapData = [
      { label: 'Data A', value: 86 },
      { label: 'Data B', value: 56 },
      { label: 'Data C', value: 21 },
      { label: 'Data D', value: 18 },
      { label: 'Data E', value: 67 }
    ],
    heatmapRows = 5,
    heatmapColumns = 5,
    heatmapStyle = 'default',
    heatmapPrimaryColor = '#3B82F6',
    heatmapSecondaryColor = '#EFF6FF',
    showDataLabels = true,
    showButtons = false,
    showKpis = false,
    heatmapButtons = [],
    heatmapKpis = []
  } = properties || {};

  // Generate heatmap data grid
  const generateHeatmapGrid = () => {
    const grid = [];
    const totalCells = heatmapRows * heatmapColumns;
    
    for (let i = 0; i < totalCells; i++) {
      const dataIndex = i % heatmapData.length;
      const value = heatmapData[dataIndex]?.value || 0;
      const intensity = Math.min(value / 100, 1);
      
      let backgroundColor;
      if (heatmapStyle === 'kpis-heatmap') {
        backgroundColor = intensity > 0.7 ? '#9b87f5' : intensity > 0.4 ? '#D6BCFA' : '#F1F0FB';
      } else if (heatmapStyle === 'intensity-heatmap') {
        backgroundColor = intensity > 0.7 ? '#EF4444' : intensity > 0.4 ? '#F87171' : intensity > 0.2 ? '#FCA5A5' : '#FEF2F2';
      } else if (heatmapStyle === 'gradient-heatmap') {
        backgroundColor = intensity > 0.7 ? '#10B981' : intensity > 0.4 ? '#34D399' : intensity > 0.2 ? '#6EE7B7' : '#ECFDF5';
      } else {
        backgroundColor = intensity > 0.7 ? heatmapPrimaryColor : intensity > 0.4 ? '#93C5FD' : heatmapSecondaryColor;
      }
      
      grid.push({
        id: i,
        value,
        backgroundColor,
        label: heatmapData[dataIndex]?.label || `Cell ${i + 1}`
      });
    }
    
    return grid;
  };

  const heatmapGrid = generateHeatmapGrid();

  return (
    <div className="w-full h-full p-4 bg-white">
      {showTitle && (
        <div className={`text-sm font-medium mb-3 text-${textAlignment}`}>
          {heatmapTitle}
        </div>
      )}
      
      {/* KPIs Section */}
      {showKpis && heatmapKpis.length > 0 && (
        <div className="mb-3 space-y-1">
          {heatmapKpis.map((kpi: any, index: number) => (
            <div key={index} className="flex gap-2 text-xs">
              <span className="font-medium">{kpi.title}:</span>
              <span>{kpi.value}</span>
              {kpi.change && <span className="text-green-600">{kpi.change}</span>}
            </div>
          ))}
        </div>
      )}
      
      {/* Buttons Section */}
      {showButtons && heatmapButtons.length > 0 && (
        <div className="mb-3 flex gap-2 flex-wrap">
          {heatmapButtons.map((button: any, index: number) => (
            <button 
              key={index}
              className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded border"
            >
              {button.title}
            </button>
          ))}
        </div>
      )}
      
      {/* Heatmap Grid */}
      <div 
        className="grid gap-1 flex-1"
        style={{ 
          gridTemplateColumns: `repeat(${heatmapColumns}, 1fr)`,
          gridTemplateRows: `repeat(${heatmapRows}, 1fr)`
        }}
      >
        {heatmapGrid.map((cell) => (
          <div
            key={cell.id}
            className="relative border border-gray-200 rounded-sm flex items-center justify-center text-xs"
            style={{ 
              backgroundColor: cell.backgroundColor,
              minHeight: '20px'
            }}
            title={`${cell.label}: ${cell.value}`}
          >
            {showDataLabels && (
              <span className="text-white font-medium" style={{ 
                textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
                fontSize: '10px'
              }}>
                {cell.value}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
