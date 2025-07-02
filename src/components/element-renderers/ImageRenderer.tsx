
import React from 'react';
import { Element } from "@/types/wireframe";

interface ImageRendererProps {
  properties: Element['properties'];
}

export function ImageRenderer({ properties = {} }: ImageRendererProps) {
  // Define shadow classes based on properties
  const shadowClasses = properties.hasShadow 
    ? {
        sm: 'shadow-sm',
        md: 'shadow-md', 
        lg: 'shadow-lg',
        xl: 'shadow-xl',
      }[properties.shadowSize || 'md'] || 'shadow-md'
    : '';
    
  // Define border radius classes
  const radiusClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  }[properties.borderRadius || 'md'] || 'rounded-md';
  
  // Define object-fit style
  const objectFitClass = {
    contain: 'object-contain',
    cover: 'object-cover',
    fill: 'object-fill',
    none: 'object-none',
    'scale-down': 'object-scale-down',
  }[properties.imageFit || 'contain'] || 'object-contain';
  
  return (
    <div className="w-full h-full flex items-center justify-center p-2">
      {properties.imageUrl ? (
        <img 
          src={properties.imageUrl}
          alt={properties.imageAlt || 'Image'}
          className={`w-full h-full ${objectFitClass} ${radiusClasses} ${shadowClasses} ${
            properties.hasBorder ? 'border' : ''
          }`}
          style={properties.hasBorder ? { borderColor: properties.borderColor } : {}}
        />
      ) : (
        <div className="w-full h-full border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-gray-400">
          Image Placeholder
        </div>
      )}
    </div>
  );
}
