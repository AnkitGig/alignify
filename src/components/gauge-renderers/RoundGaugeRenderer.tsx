
import React from 'react';
import { GaugeRendererProps } from './types';

export function RoundGaugeRenderer({
  value, min, max, target, showTarget, showNeedle, showLabels,
  units, primaryColor, secondaryColor, percentage, targetPercentage
}: GaugeRendererProps) {
  
  return (
    <div className="relative w-full max-w-[200px] aspect-square">
      {/* Outer circle */}
      <div className="absolute inset-0 rounded-full border-8" style={{ borderColor: secondaryColor }}></div>
      
      {/* Progress arc */}
      <div 
        className="absolute inset-0 rounded-full border-8"
        style={{ 
          borderColor: primaryColor,
          clipPath: `path('M 100 100 L 100 0 A 100 100 0 ${percentage * 3.6 > 180 ? 1 : 0} 1 ${100 + 100 * Math.sin(percentage * 3.6 * Math.PI / 180)} ${100 - 100 * Math.cos(percentage * 3.6 * Math.PI / 180)} Z')`,
        }}
      ></div>
      
      {/* Center area with value */}
      <div className="absolute inset-[20%] bg-white rounded-full flex items-center justify-center shadow-inner">
        <div className="text-center">
          <div className="text-2xl font-bold" style={{ color: primaryColor }}>{value}{units}</div>
          {showTarget && (
            <div className="text-xs text-gray-500">Target: {target}{units}</div>
          )}
        </div>
      </div>
      
      {/* Gauge labels */}
      {showLabels && (
        <>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 text-xs font-medium">{max}{units}</div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 text-xs font-medium">{min}{units}</div>
          <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 text-xs font-medium">
            {Math.floor((max - min) * 0.75 + min)}{units}
          </div>
          <div className="absolute right-0 top-1/2 translate-x-1 -translate-y-1/2 text-xs font-medium">
            {Math.floor((max - min) * 0.25 + min)}{units}
          </div>
        </>
      )}
      
      {/* Needle (only showing on certain styles) */}
      {showNeedle && (
        <div 
          className="absolute w-[2px] h-[40%] bg-gray-800 origin-bottom"
          style={{
            bottom: '50%',
            left: '50%',
            transform: `translateX(-50%) rotate(${(percentage * 3.6) - 180}deg)`
          }}
        >
          <div className="absolute w-3 h-3 rounded-full bg-gray-800 top-0 -left-1.5"></div>
        </div>
      )}
    </div>
  );
}
