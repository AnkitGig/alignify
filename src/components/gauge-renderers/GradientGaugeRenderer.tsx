
import React from 'react';
import { GaugeRendererProps } from './types';

export function GradientGaugeRenderer({
  value, min, max, target, showTarget, showNeedle, showLabels,
  units, primaryColor, secondaryColor, percentage, targetPercentage
}: GaugeRendererProps) {
  
  return (
    <div className="relative w-full max-w-[200px] aspect-[2/1]">
      {/* Background semi-circle with gradient */}
      <div 
        className="absolute w-full h-full rounded-t-full overflow-hidden"
        style={{
          clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 0)',
          background: `linear-gradient(to right, ${secondaryColor}22, ${secondaryColor}77)`,
          borderRadius: '100% 100% 0 0'
        }}
      ></div>
      
      {/* Colored semi-circle based on value with gradient */}
      <div 
        className="absolute w-full h-full"
        style={{
          clipPath: `polygon(0 100%, 50% 100%, 50% 0, 0 0)`,
          background: `conic-gradient(${primaryColor} 0%, ${primaryColor} ${percentage}%, transparent ${percentage}%)`,
          borderRadius: '100% 100% 0 0',
          transform: 'rotate(-90deg)',
          transformOrigin: 'right bottom',
          backgroundImage: `linear-gradient(to right, ${primaryColor}, ${primaryColor}bb)`
        }}
      ></div>
      
      {/* Center white circle */}
      <div 
        className="absolute w-[65%] h-[65%] bg-white rounded-full shadow-md"
        style={{
          top: '17.5%',
          left: '17.5%'
        }}
      >
        {/* Value display */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-xl font-bold" style={{ color: primaryColor }}>{value}{units}</div>
          {showTarget && (
            <div className="text-xs" style={{ color: `${primaryColor}99` }}>Target: {target}{units}</div>
          )}
        </div>
      </div>
      
      {/* Gauge labels */}
      {showLabels && (
        <>
          <div className="absolute bottom-0 left-[5%] text-xs" style={{ color: primaryColor }}>{min}{units}</div>
          <div className="absolute bottom-0 right-[5%] text-xs" style={{ color: primaryColor }}>{max}{units}</div>
        </>
      )}
      
      {/* Needle with color matching the gauge */}
      {showNeedle && (
        <div 
          className="absolute w-[2px] h-[45%] origin-bottom bottom-0 left-1/2"
          style={{
            backgroundColor: primaryColor,
            transform: `translateX(-50%) rotate(${(percentage * 1.8) - 90}deg)`
          }}
        >
          <div className="absolute w-3 h-3 rounded-full -top-1.5 -left-1.5" style={{ backgroundColor: primaryColor }}></div>
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
