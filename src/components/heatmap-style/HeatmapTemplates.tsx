
import React from 'react';

// These are the template displays that will be used in the HeatmapStyleDialog
export const heatmapTemplateDisplays = [
  {
    id: 'default',
    name: 'Default',
    primaryColor: '#3B82F6',
    secondaryColor: '#EFF6FF',
    display: (
      <div className="border rounded-md p-4 bg-white">
        <div className="text-sm font-medium mb-2">Title goes here</div>
        <div className="grid grid-cols-5 gap-1">
          {Array.from({ length: 25 }, (_, i) => (
            <div 
              key={i} 
              className="w-4 h-4 rounded-sm"
              style={{ 
                backgroundColor: i % 3 === 0 ? '#3B82F6' : i % 3 === 1 ? '#93C5FD' : '#EFF6FF'
              }}
            />
          ))}
        </div>
      </div>
    )
  },
  {
    id: 'kpis-heatmap',
    name: 'KPIs-Heatmap',
    primaryColor: '#9b87f5',
    secondaryColor: '#F1F0FB',
    display: (
      <div className="border rounded-md p-4 bg-white">
        <div className="text-sm font-medium mb-2">Title goes here</div>
        <div className="space-y-2">
          <div className="flex gap-1">
            <div className="flex-1 text-xs text-center py-1">Metric 1</div>
            <div className="flex-1 text-xs text-center py-1">12%</div>
          </div>
          <div className="grid grid-cols-5 gap-1">
            {Array.from({ length: 10 }, (_, i) => (
              <div 
                key={i} 
                className="w-4 h-4 rounded-sm"
                style={{ 
                  backgroundColor: i % 3 === 0 ? '#9b87f5' : i % 3 === 1 ? '#D6BCFA' : '#F1F0FB'
                }}
              />
            ))}
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'intensity-heatmap',
    name: 'Intensity Heatmap',
    primaryColor: '#EF4444',
    secondaryColor: '#FEF2F2',
    display: (
      <div className="border rounded-md p-4 bg-white">
        <div className="text-sm font-medium mb-2">Title goes here</div>
        <div className="grid grid-cols-5 gap-1">
          {Array.from({ length: 25 }, (_, i) => {
            const intensity = Math.random();
            return (
              <div 
                key={i} 
                className="w-4 h-4 rounded-sm"
                style={{ 
                  backgroundColor: intensity > 0.7 ? '#EF4444' : 
                                 intensity > 0.4 ? '#F87171' : 
                                 intensity > 0.2 ? '#FCA5A5' : '#FEF2F2'
                }}
              />
            );
          })}
        </div>
      </div>
    )
  },
  {
    id: 'gradient-heatmap',
    name: 'Gradient Heatmap',
    primaryColor: '#10B981',
    secondaryColor: '#ECFDF5',
    display: (
      <div className="border rounded-md p-4 bg-white">
        <div className="text-sm font-medium mb-2">Title goes here</div>
        <div className="grid grid-cols-5 gap-1">
          {Array.from({ length: 25 }, (_, i) => (
            <div 
              key={i} 
              className="w-4 h-4 rounded-sm"
              style={{ 
                background: `linear-gradient(45deg, ${i % 4 === 0 ? '#10B981' : i % 4 === 1 ? '#34D399' : i % 4 === 2 ? '#6EE7B7' : '#ECFDF5'}, ${i % 3 === 0 ? '#059669' : '#D1FAE5'})`
              }}
            />
          ))}
        </div>
      </div>
    )
  }
];
