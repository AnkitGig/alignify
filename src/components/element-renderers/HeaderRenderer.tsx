import React from 'react';
import { Element } from "@/types/wireframe";

interface HeaderRendererProps {
  properties: Element['properties'];
}

export function HeaderRenderer({ properties = {} }: HeaderRendererProps) {
  const variant = properties.variant || 'default';
  const navigationItems = properties.navigationItems || ['Navigation 1', 'Navigation 2', 'Navigation 3'];
  const navigationButtons = properties.navigationButtons || [
    { title: 'Navigation 1', active: true },
    { title: 'Navigation 2', active: false },
    { title: 'Navigation 3', active: false }
  ];
  const showNavigationButtons = properties.showNavigationButtons;
  const showDoubleLogos = properties.showDoubleLogos;
  const titleAlignment = properties.titleAlignment || 'left';
  const titleSize = properties.titleSize || 'md';
  const titleWeight = properties.titleWeight || 'bold';
  
  // Determine styles based on variant
  let containerStyles = "w-full h-full flex items-center";
  let contentLayout = "";
  
  switch(variant) {
    case 'centered-navigation-purple':
      containerStyles += " bg-[#9b87f5] p-4 flex-col justify-center text-white";
      contentLayout = "flex flex-col items-center";
      break;
    case 'navigation-buttons':
      containerStyles += " p-4";
      contentLayout = "flex items-center justify-between w-full";
      break;
    case 'minimal-title':
      containerStyles += " p-4";
      contentLayout = "flex items-center";
      break;
    case 'with-description':
      containerStyles += " p-4";
      contentLayout = "flex items-center justify-between w-full";
      break;
    case 'with-metrics':
      containerStyles += " p-4";
      contentLayout = "flex items-center justify-between w-full";
      break;
    case 'simple-header':
      containerStyles += " p-4";
      contentLayout = "flex items-center";
      break;
    default: 
      containerStyles += " p-4";
      contentLayout = "flex items-center";
  }
  
  // Get title styles based on properties
  const getTitleStyles = () => {
    let styles = "font-bold";
    
    // Size mapping
    const sizeMap = {
      'sm': 'text-sm',
      'md': 'text-lg',
      'lg': 'text-xl',
      'xl': 'text-2xl'
    };
    
    // Weight mapping
    const weightMap = {
      'normal': 'font-normal',
      'medium': 'font-medium',
      'semibold': 'font-semibold',
      'bold': 'font-bold'
    };
    
    // Alignment mapping
    const alignmentMap = {
      'left': 'text-left',
      'center': 'text-center',
      'right': 'text-right'
    };
    
    styles = `${sizeMap[titleSize]} ${weightMap[titleWeight]} ${alignmentMap[titleAlignment]}`;
    
    return styles;
  };

  const renderLogo = (logoUrl?: string, altText = "Logo") => {
    if (logoUrl) {
      return (
        <img 
          src={logoUrl} 
          alt={altText} 
          className="h-full max-h-12 object-contain"
        />
      );
    }
    return (
      <div className="h-10 w-10 bg-gray-200 text-gray-400 flex items-center justify-center text-xs">
        Logo
      </div>
    );
  };

  const renderNavigationButtons = () => {
    if (!showNavigationButtons) return null;
    
    return (
      <div className="flex space-x-2">
        {navigationButtons.map((button, index) => (
          <button 
            key={index} 
            className={`px-3 py-1 rounded text-sm ${
              button.active ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {button.title}
          </button>
        ))}
      </div>
    );
  };
  
  return (
    <div 
      className={containerStyles}
      style={{
        backgroundColor: properties.backgroundColor || undefined,
        color: properties.textColor || undefined,
      }}
    >
      {variant === 'centered-navigation-purple' ? (
        <div className="flex flex-col items-center">
          {properties.title && (
            <div className={getTitleStyles() + " mb-2"}>{properties.title}</div>
          )}
          
          <div className="flex justify-center space-x-6">
            {navigationItems.slice(0, 3).map((item, index) => (
              <div key={index} className="text-sm">{item}</div>
            ))}
          </div>
        </div>
      ) : variant === 'double-logo-purple' ? (
        <div className="flex items-center justify-between w-full">
          {showDoubleLogos ? (
            <>
              <div className="mr-3">
                {renderLogo(properties.logoUrl, "Primary Logo")}
              </div>
              
              <div className={getTitleStyles()}>{properties.title || 'DASHBOARD TITLE'}</div>
              
              <div className="ml-3">
                {renderLogo(properties.secondaryLogoUrl, "Secondary Logo")}
              </div>
            </>
          ) : (
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                {properties.showLogo && (
                  <div className="mr-3">
                    {renderLogo(properties.logoUrl)}
                  </div>
                )}
                <div className={getTitleStyles()}>{properties.title || 'DASHBOARD TITLE'}</div>
              </div>
              {renderNavigationButtons()}
            </div>
          )}
        </div>
      ) : variant === 'navigation-buttons' || showNavigationButtons ? (
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            {properties.showLogo && (
              <div className="mr-3">
                {renderLogo(properties.logoUrl)}
              </div>
            )}
            
            <div className={getTitleStyles()}>{properties.title || 'DASHBOARD TITLE'}</div>
          </div>
          
          {renderNavigationButtons()}
        </div>
      ) : variant === 'minimal-title' ? (
        <div className="flex items-center">
          {properties.showLogo && (
            <div className="mr-3">
              {renderLogo(properties.logoUrl)}
            </div>
          )}
          
          <div className={getTitleStyles() + " flex items-center"}>
            {properties.showIcon && <span className="mr-2">📊</span>}
            {properties.title || 'DASHBOARD TITLE'}
          </div>
        </div>
      ) : variant === 'with-description' ? (
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            {properties.showLogo && (
              <div className="mr-3">
                {renderLogo(properties.logoUrl)}
              </div>
            )}
            
            <div>
              <div className={getTitleStyles()}>{properties.title || 'DASHBOARD TITLE'}</div>
              {properties.description && (
                <div className="text-sm text-gray-600 mt-1">{properties.description}</div>
              )}
            </div>
          </div>
          
          <div className="bg-blue-600 text-white text-sm px-3 py-1 rounded">
            Data Last Updated on | 1st Jan 2024
          </div>
        </div>
      ) : variant === 'with-metrics' ? (
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            {properties.showLogo && (
              <div className="mr-3">
                {renderLogo(properties.logoUrl)}
              </div>
            )}
            
            <div className={getTitleStyles()}>{properties.title || 'DASHBOARD TITLE'}</div>
          </div>
          
          <div className="flex space-x-6">
            {properties.metrics?.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-sm text-gray-500">{metric.title}</div>
                <div className="font-bold">{metric.value}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={contentLayout}>
          <div className="flex items-center">
            {properties.showLogo && (
              <div className="mr-3">
                {renderLogo(properties.logoUrl)}
              </div>
            )}
            
            <div className={getTitleStyles()}>{properties.title || 'DASHBOARD TITLE'}</div>
          </div>
        </div>
      )}
    </div>
  );
}
