
import { Element } from "@/hooks/useWireframe";

interface KpiDisplayProps {
  element: Element;
}

export function KpiDisplay({ element }: KpiDisplayProps) {
  const properties = element.properties || {};
  const kpiVariant = properties.kpiVariant || 'basic';
  const title = properties.kpiTitle || 'Metric';
  const value = properties.kpiValue || '25.2K';
  const previousValue = properties.kpiPreviousValue || '11.6K';
  const changePercentage = properties.kpiChangePercentage || '+10%';
  const alignment = properties.kpiAlignment || 'left';
  const showTitle = properties.showKpiTitle !== false;
  const showPrevious = properties.showPreviousValue !== false;
  const showChange = properties.showChangePercentage !== false;
  const indicatorColor = properties.indicatorColor || '#8B5CF6';
  const backgroundColor = properties.backgroundColor || '#ffffff';
  const textColor = properties.textColor || '#000000';

  const getTextAlign = () => {
    switch (alignment) {
      case 'left': return 'text-left';
      case 'center': return 'text-center';
      case 'right': return 'text-right';
      default: return 'text-left';
    }
  };

  const getChangeColor = () => {
    if (changePercentage.startsWith('+')) {
      return 'text-green-500';
    } else if (changePercentage.startsWith('-')) {
      return 'text-red-500';
    } else {
      return 'text-gray-500';
    }
  };

  const renderBasicKpi = () => (
    <div className={`p-4 ${getTextAlign()}`} style={{ backgroundColor, color: textColor }}>
      {showTitle && <div className="text-sm text-gray-500 mb-1">{title}</div>}
      <div className="text-2xl font-bold mb-1">{value}</div>
      <div className="flex text-sm items-center gap-2">
        {showPrevious && <span className="text-gray-500">vs prev {previousValue}</span>}
        {showChange && <span className={getChangeColor()}>{changePercentage}</span>}
      </div>
    </div>
  );

  const renderAreaKpi = () => (
    <div className={`p-4 ${getTextAlign()}`} style={{ backgroundColor, color: textColor }}>
      <div className="flex flex-col">
        <div className="mb-1">
          <span className="text-sm text-gray-500">Text</span>
        </div>
        <div className="text-2xl font-bold mb-1">{value}</div>
        <div className="text-xs text-gray-500">
          vs prev = {previousValue} | % Change
        </div>
        <div className="mt-2 h-8 relative">
          <svg viewBox="0 0 100 20" className="w-full h-full">
            <path
              d="M0,20 L10,15 L20,18 L30,10 L40,12 L50,5 L60,8 L70,3 L80,6 L90,1 L100,4 L100,20 L0,20 Z"
              fill={indicatorColor + "40"}
              stroke={indicatorColor}
              strokeWidth="1"
            />
          </svg>
          <div className="absolute bottom-0 left-0 text-xs">Q1</div>
          <div className="absolute bottom-0 left-1/4 text-xs">Q2</div>
          <div className="absolute bottom-0 left-2/4 text-xs">Q3</div>
          <div className="absolute bottom-0 left-3/4 text-xs">Q4</div>
        </div>
      </div>
    </div>
  );
  
  const renderIndicatorKpi = () => (
    <div className={`p-4 ${getTextAlign()}`} style={{ backgroundColor, color: textColor }}>
      {showTitle && <div className="text-sm text-gray-500 mb-1">{title}</div>}
      <div className="text-2xl font-bold mb-1">{value}</div>
      {showPrevious && showChange && (
        <div className="flex items-center gap-1">
          <span className="text-sm text-gray-500">vs prev {previousValue}</span>
          <span className={`text-sm ${getChangeColor()}`}>({changePercentage})</span>
        </div>
      )}
      <div className="mt-2 h-1 bg-gray-200 w-full rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full" 
          style={{ 
            width: '70%', 
            backgroundColor: indicatorColor 
          }}
        ></div>
      </div>
    </div>
  );

  const renderComparisonKpi = () => (
    <div className="p-4 flex" style={{ backgroundColor, color: textColor }}>
      <div className="flex-1">
        <div className="text-lg font-bold">{title}</div>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-xs">Current</div>
      </div>
      <div className="flex-1">
        <div className="text-lg opacity-0">.</div>
        <div className="text-2xl">{previousValue}</div>
        <div className="text-xs">vs prev</div>
      </div>
      <div className="flex-1">
        <div className="text-lg opacity-0">.</div>
        <div className={`text-xl ${getChangeColor()}`}>{changePercentage}</div>
        <div className="text-xs">% change</div>
      </div>
    </div>
  );

  switch (kpiVariant) {
    case 'area':
      return renderAreaKpi();
    case 'indicator':
      return renderIndicatorKpi();
    case 'comparison':
      return renderComparisonKpi();
    default:
      return renderBasicKpi();
  }
}
