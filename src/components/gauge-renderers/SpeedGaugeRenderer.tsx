
import React from 'react';
import { GaugeRendererProps } from './types';

export function SpeedGaugeRenderer({
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
          background: secondaryColor,
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
        className="absolute w-[60%] h-[60%] bg-white rounded-full shadow-md"
        style={{
          top: '20%',
          left: '20%'
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
          <div className="absolute bottom-0 left-[5%] text-xs font-medium">{min}{units}</div>
          <div className="absolute bottom-0 right-[5%] text-xs font-medium">{max}{units}</div>
          <div className="absolute bottom-2 left-1/4 -translate-x-1/2 text-xs font-medium">
            {Math.floor((max - min) * 0.25 + min)}{units}
          </div>
          <div className="absolute bottom-2 left-3/4 -translate-x-1/2 text-xs font-medium">
            {Math.floor((max - min) * 0.75 + min)}{units}
          </div>
        </>
      )}
      
      {/* Needle with a thicker design */}
      {showNeedle && (
        <div 
          className="absolute w-[2px] h-[45%] bg-gray-800 origin-bottom bottom-0 left-1/2"
          style={{
            transform: `translateX(-50%) rotate(${(percentage * 1.8) - 90}deg)`
          }}
        >
          <div className="absolute w-3 h-3 rounded-full bg-gray-800 -top-1.5 -left-1.5"></div>
        </div>
      )}
      
      {/* Target indicator */}
      {showTarget && (
        <div 
          className="absolute w-[2px] h-[12%] bg-red-500 origin-bottom bottom-0 left-1/2"
          style={{
            transform: `translateX(-50%) rotate(${(targetPercentage * 1.8) - 90}deg)`
          }}
        >
          <div className="absolute w-2 h-2 rounded-full bg-red-500 -top-1 -left-1"></div>
        </div>
      )}
    </div>
  );
}
