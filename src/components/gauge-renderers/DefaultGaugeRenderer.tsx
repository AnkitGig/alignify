
import React from 'react';
import { GaugeRendererProps } from './types';

export function DefaultGaugeRenderer({ 
  value, min, max, target, showTarget, showNeedle, showLabels, 
  units, primaryColor, secondaryColor, percentage, targetPercentage 
}: GaugeRendererProps) {
  
  return (
    <div className="relative w-full max-w-[200px] aspect-[2/1]">
      {/* Background semi-circle */}
      <div 
        className="absolute w-full h-full"
        style={{
          clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 0)',
          background: `conic-gradient(${secondaryColor} 0%, ${secondaryColor} 100%)`,
          borderRadius: '100% 100% 0 0'
        }}
      ></div>
      
      {/* Colored semi-circle based on value */}
      <div 
        className="absolute w-full h-full"
        style={{
          clipPath: `polygon(0 100%, 50% 100%, 50% 0, 0 0)`,
          background: `conic-gradient(${primaryColor} 0%, ${primaryColor} ${percentage}%, transparent ${percentage}%)`,
          borderRadius: '100% 100% 0 0',
          transform: 'rotate(-90deg)',
          transformOrigin: 'right bottom'
        }}
      ></div>
      
      {/* Center white circle */}
      <div 
        className="absolute w-[70%] h-[70%] bg-white rounded-full"
        style={{
          top: '15%',
          left: '15%'
        }}
      >
        {/* Value display */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-xl font-bold">{value}{units}</div>
          {showTarget && (
            <div className="text-xs text-gray-500">Target: {target}{units}</div>
          )}
        </div>
      </div>
      
      {/* Gauge labels */}
      {showLabels && (
        <>
          <div className="absolute bottom-0 left-[5%] text-xs text-gray-500">{min}{units}</div>
          <div className="absolute bottom-0 right-[5%] text-xs text-gray-500">{max}{units}</div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs text-gray-500">
            {Math.floor((max - min) / 2 + min)}{units}
          </div>
        </>
      )}
      
      {/* Target indicator */}
      {showTarget && (
        <div 
          className="absolute w-[2px] h-[15%] bg-red-500 origin-bottom bottom-0 left-1/2"
          style={{
            transform: `translateX(-50%) rotate(${(targetPercentage * 1.8) - 90}deg)`
          }}
        >
          <div className="absolute w-1.5 h-1.5 rounded-full bg-red-500 -top-1 -left-[3px]"></div>
        </div>
      )}
      
      {/* Needle */}
      {showNeedle && (
        <div 
          className="absolute w-[1px] h-[40%] bg-black origin-bottom bottom-0 left-1/2"
          style={{
            transform: `translateX(-50%) rotate(${(percentage * 1.8) - 90}deg)`
          }}
        >
          <div className="absolute w-2 h-2 rounded-full bg-black -top-1 -left-1"></div>
        </div>
      )}
    </div>
  );
}
