
import React from 'react';
import { GaugeRendererProps } from './types';

export function DigitalGaugeRenderer({
  value, min, max, target, showTarget, showLabels,
  units, primaryColor, percentage
}: GaugeRendererProps) {
  
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="w-full max-w-[220px] bg-white rounded-md border p-4 shadow-sm">
        <div className="text-2xl font-bold text-center mb-2" style={{ color: primaryColor }}>
          {value}{units}
        </div>
        
        {/* Progress bar */}
        <div className="w-full h-2 bg-gray-100 rounded-full mb-1">
          <div 
            className="h-2 rounded-full" 
            style={{ 
              width: `${percentage}%`,
              backgroundColor: primaryColor
            }}
          ></div>
        </div>
        
        {/* Labels */}
        {showLabels && (
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{min}{units}</span>
            <span>{max}{units}</span>
          </div>
        )}
        
        {/* Target indicator */}
        {showTarget && (
          <div className="flex justify-between mt-2">
            <span className="text-xs text-gray-500">Target</span>
            <span className="text-xs font-medium">{target}{units}</span>
          </div>
        )}
      </div>
    </div>
  );
}
