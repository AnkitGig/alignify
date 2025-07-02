
import React from 'react';
import { Element } from "@/types/wireframe";

interface TextboxRendererProps {
  properties: Element['properties'];
}

export function TextboxRenderer({ properties = {} }: TextboxRendererProps) {
  const textAlignment = properties.textAlignment || 'left';
  const fontSize = properties.fontSize || 'md';
  const fontWeight = properties.fontWeight || 'normal';
  const fontFamily = properties.fontFamily || 'inter';
  const lineHeight = properties.lineHeight || 'normal';
  const letterSpacing = properties.letterSpacing || 'normal';
  const textColor = properties.textColor || '#000000';
  const backgroundColor = properties.backgroundColor || '#ffffff';
  const backgroundOpacity = properties.backgroundOpacity || 100;
  const borderRadius = properties.borderRadius || 'md';
  const padding = properties.padding || 16;
  const textDecoration = properties.textDecoration || 'none';
  const textTransform = properties.textTransform || 'none';
  
  const fontSizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
  };
  
  const fontWeightClasses = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extrabold: 'font-extrabold',
  };

  const fontFamilyClasses = {
    inter: 'font-sans',
    roboto: 'font-sans',
    'open-sans': 'font-sans',
    lato: 'font-sans',
    montserrat: 'font-sans',
    poppins: 'font-sans',
    'source-sans': 'font-sans',
    nunito: 'font-sans',
    raleway: 'font-sans',
    merriweather: 'font-serif',
    playfair: 'font-serif',
    crimson: 'font-serif',
  };

  const lineHeightClasses = {
    tight: 'leading-tight',
    snug: 'leading-snug',
    normal: 'leading-normal',
    relaxed: 'leading-relaxed',
    loose: 'leading-loose',
  };

  const letterSpacingClasses = {
    tighter: 'tracking-tighter',
    tight: 'tracking-tight',
    normal: 'tracking-normal',
    wide: 'tracking-wide',
    wider: 'tracking-wider',
    widest: 'tracking-widest',
  };

  const borderRadiusClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
  };

  const shadowClasses = {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  };

  const textDecorationClasses = {
    none: 'no-underline',
    underline: 'underline',
    'line-through': 'line-through',
    overline: 'overline',
  };

  const textTransformClasses = {
    none: 'normal-case',
    uppercase: 'uppercase',
    lowercase: 'lowercase',
    capitalize: 'capitalize',
  };

  // Convert hex to rgba for background opacity
  const hexToRgba = (hex: string, opacity: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
  };

  const containerStyle = {
    color: textColor,
    backgroundColor: hexToRgba(backgroundColor, backgroundOpacity),
    padding: `${padding}px`,
    textAlign: textAlignment as any,
    textDecoration: textDecoration,
    textTransform: textTransform,
    ...(properties.showBorder && {
      border: `${properties.borderWidth || 1}px ${properties.borderStyle || 'solid'} ${properties.borderColor || '#d1d5db'}`,
    }),
  };

  const textClasses = [
    fontSizeClasses[fontSize as keyof typeof fontSizeClasses],
    fontWeightClasses[fontWeight as keyof typeof fontWeightClasses],
    fontFamilyClasses[fontFamily as keyof typeof fontFamilyClasses],
    lineHeightClasses[lineHeight as keyof typeof lineHeightClasses],
    letterSpacingClasses[letterSpacing as keyof typeof letterSpacingClasses],
    borderRadiusClasses[borderRadius as keyof typeof borderRadiusClasses],
    textDecorationClasses[textDecoration as keyof typeof textDecorationClasses],
    textTransformClasses[textTransform as keyof typeof textTransformClasses],
    properties.showShadow ? shadowClasses[properties.shadowSize as keyof typeof shadowClasses] || 'shadow-md' : '',
  ].filter(Boolean).join(' ');
  
  return (
    <div 
      className={`w-full h-full overflow-auto ${textClasses}`}
      style={containerStyle}
    >
      {properties.showTextboxTitle !== false && properties.textboxTitle && (
        <h3 className="mb-2 font-semibold">
          {properties.textboxTitle}
        </h3>
      )}
      <div>
        {properties.textboxContent || 'Edit text in left pane...'}
      </div>
    </div>
  );
}
