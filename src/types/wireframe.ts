export type ElementType = 
  'header' | 'button' | 'filter' | 'kpi' | 'column-chart' | 'bar-chart' | 'line-chart' | 
  'area-chart' | 'combo-chart' | 'pie-chart' |
  'simple-table' | 'hierarchy-table' | 'treemap' | 'heatmap' |
  'image' | 'textbox' | 'histogram' | 'scatter-plot' |
  'waterfall' | 'shapes' | 'quadrant-chart';

export type FilterVariant = 
  'dropdown' | 'checkbox' | 'radio' | 'date' | 'daterange' | 'slider' | 'search';

export type KpiVariant =
  'basic' | 'area' | 'indicator' | 'comparison';

export type ButtonVariant =
  'default' | 'primary' | 'secondary' | 'outline' | 'ghost';

export type ButtonSize =
  'sm' | 'md' | 'lg';

export type HeaderVariant =
  'default' | 'with-metrics' | 'with-description' | 'centered-navigation-purple' | 
  'navigation-top' | 'double-logo-purple' | 'dark-navigation' | 'gradient' | 
  'minimal' | 'colorful-banner' | 'title-metrics' | 'navigation-buttons' | 
  'minimal-title' | 'simple-header';

export type ShapeVariant =
  'triangle' | 'rectangle' | 'circle' | 'oval';

export type ChartVariant =
  'bar' | 'dropdown-bar' | 'kpi-bar' | 'multi-bar' | 'stacked-bar' |
  'basic-area' | 'kpi-area' | 'multi-area' | 'stacked-area' |
  'default' | 'grouped' | 'stacked' | 'gradient' |
  'basic-combo' | 'kpi-combo' | 'advanced-combo' | 'multi-line-combo' |
  'basic-line' | 'multi-line' | 'stepped-line' | 'curved-line';

export type PieChartVariant =
  'default' | 'with-legend' | 'with-buttons' | 'with-kpis';

export type GaugeVariant =
  'default' | 'digital' | 'speed' | 'round' | 'gradient';

export type HeatmapVariant =
  'default' | 'with-buttons' | 'with-kpis';

export type QuadrantVariant =
  'default' | 'with-labels' | 'with-data';

export type ScatterPlotVariant =
  'default' | 'with-trend' | 'with-correlation';

export type GeomapVariant =
  'world' | 'usa' | 'europe' | 'asia';

export type WaterfallVariant =
  'basic-waterfall' | 'with-buttons' | 'with-kpis';

export type TreemapVariant =
  'default' | 'with-buttons' | 'with-kpis';

export type DonutChartVariant =
  'default' | 'with-legend' | 'with-buttons' | 'with-kpis';

export type HistogramVariant =
  'default' | 'with-buttons' | 'with-kpis';

export type FunnelChartVariant =
  'default' | 'with-buttons' | 'with-kpis';

export interface Element {
  id: string;
  type: ElementType;
  position: { x: number; y: number };
  size: { width: number; height: number };
  content?: string;
  screenId: string;
  properties?: {
    backgroundColor?: string;
    textColor?: string;
    title?: string;
    showLogo?: boolean;
    showNavigation?: boolean;
    navigationItems?: string[];
    variant?: HeaderVariant | string;
    description?: string;
    logoUrl?: string;
    secondaryLogoUrl?: string;
    showMetrics?: boolean;
    metrics?: Array<{title: string, value: string}>;
    // Header Add-ons properties
    showSecondaryLogo?: boolean;
    showCustomText?: boolean;
    enableStylize?: boolean;
    stylizeOption?: 'horizontal' | 'vertical' | 'centered';
    headerDropdowns?: Array<{title: string, values: string[], editText?: string}>;
    // New header properties for icons and text
    showIcon?: boolean;
    textContent?: string;
    showHighlightedText?: boolean;
    
    // Enhanced Header Properties
    showNavigationButtons?: boolean;
    navigationButtons?: Array<{title: string, active?: boolean}>;
    showDoubleLogos?: boolean;
    titleAlignment?: 'left' | 'center' | 'right';
    titleSize?: 'sm' | 'md' | 'lg' | 'xl';
    titleWeight?: 'normal' | 'medium' | 'semibold' | 'bold';
    
    // Filter properties
    filterTitle?: string;
    filterVariant?: FilterVariant;
    filterValues?: string[];
    filterAlignment?: 'left' | 'center' | 'right';
    // KPI properties
    kpiVariant?: KpiVariant;
    kpiTitle?: string;
    kpiValue?: string;
    kpiPreviousValue?: string;
    kpiChangePercentage?: string;
    kpiAlignment?: 'left' | 'center' | 'right';
    showKpiTitle?: boolean;
    showPreviousValue?: boolean;
    showChangePercentage?: boolean;
    indicatorColor?: string;
    // Button properties
    buttonText?: string;
    buttonVariant?: ButtonVariant;
    buttonSize?: ButtonSize;
    buttonIcon?: boolean;
    // Textbox properties
    textboxContent?: string;
    textboxTitle?: string;
    showTextboxTitle?: boolean;
    textAlignment?: 'left' | 'center' | 'right' | 'justify';
    fontSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    fontWeight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
    fontFamily?: 'inter' | 'roboto' | 'open-sans' | 'lato' | 'montserrat' | 'poppins' | 'source-sans' | 'nunito' | 'raleway' | 'merriweather' | 'playfair' | 'crimson';
    lineHeight?: 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose';
    letterSpacing?: 'tighter' | 'tight' | 'normal' | 'wide' | 'wider' | 'widest';
    backgroundOpacity?: number;
    showBorder?: boolean;
    borderColor?: string;
    borderWidth?: string;
    borderStyle?: 'solid' | 'dashed' | 'dotted';
    borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
    padding?: number;
    showShadow?: boolean;
    shadowSize?: 'sm' | 'md' | 'lg' | 'xl';
    textDecoration?: 'none' | 'underline' | 'line-through' | 'overline';
    textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
    // Image properties
    imageUrl?: string;
    imageAlt?: string;
    imageFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
    hasBorder?: boolean;
    hasShadow?: boolean;
    // Shape properties
    shapeVariant?: ShapeVariant;
    shapeColor?: string;
    shapeWidth?: number;
    shapeHeight?: number;
    showTitle?: boolean;
    // Chart properties
    chartVariant?: ChartVariant;
    chartTitle?: string;
    chartHeight?: number;
    chartData?: Array<{
      category: string; 
      value: number;
      line?: number;
      secondary?: number;
      tertiary?: number;
    }>;
    chartButtons?: Array<{title: string, alignment: string}>;
    chartKpis?: Array<{title: string, value: string, change?: string}>;
    barColor?: string;
    lineColor?: string;
    secondaryBarColor?: string;
    tertiaryBarColor?: string;
    showLegend?: boolean;
    showGridLines?: boolean;
    showLabels?: boolean;
    showValues?: boolean;
    // Combo Chart specific properties
    chartBackground?: string;
    plotBackground?: string;
    enableAnimation?: boolean;
    animationDuration?: number;
    customTooltip?: boolean;
    tooltipFormat?: string;
    labelPosition?: 'top' | 'middle' | 'bottom' | 'inside' | 'outside' | 'left' | 'right';
    enableZoom?: boolean;
    enablePan?: boolean;
    enableExport?: boolean;
    exportFormats?: 'png' | 'jpg' | 'svg' | 'pdf';
    colorPalettes?: Array<{
      id: string;
      name: string;
      colors: string[];
    }>;
    // Line Chart specific properties
    lineStyle?: 'solid' | 'dashed' | 'dotted';
    lineWidth?: number;
    showMarkers?: boolean;
    markerStyle?: 'circle' | 'square' | 'triangle' | 'diamond';
    markerSize?: number;
    curveType?: 'linear' | 'monotone' | 'basis' | 'step';
    // Pie Chart properties
    pieChartVariant?: PieChartVariant;
    pieChartTitle?: string;
    pieChartData?: Array<{name: string, value: number, color?: string}>;
    pieChartButtons?: Array<{title: string, alignment: string}>;
    pieChartKpis?: Array<{title: string, value: string, change?: string}>;
    pieColors?: string[];
    showPieLabels?: boolean;
    showPieLegend?: boolean;
    pieInnerRadius?: number;
    pieOuterRadius?: number;
    showPercentages?: boolean;
    // Donut Chart properties
    donutChartVariant?: DonutChartVariant;
    donutChartTitle?: string;
    donutChartData?: Array<{name: string, value: number, color?: string}>;
    donutChartButtons?: Array<{title: string, alignment: string}>;
    donutChartKpis?: Array<{title: string, value: string, change?: string}>;
    donutColors?: string[];
    showDonutLabels?: boolean;
    showDonutLegend?: boolean;
    donutInnerRadius?: number;
    donutOuterRadius?: number;
    showDonutPercentages?: boolean;
    // Table properties
    tableTitle?: string;
    tableHeaders?: string[];
    tableData?: string[][];
    numRows?: number;
    numColumns?: number;
    showTableBorder?: boolean;
    headerBackground?: string;
    headerTextColor?: string;
    cellBackground?: string;
    cellTextColor?: string;
    alternateRowColor?: boolean;
    alternateRowBackground?: string;
    // Gauge Chart properties
    gaugeStyle?: GaugeVariant | string;
    gaugeValue?: number;
    gaugeMin?: number;
    gaugeMax?: number;
    gaugeMaxDisplay?: number;
    gaugeTarget?: number;
    gaugeUnits?: string;
    showGaugeNeedle?: boolean;
    showGaugeTarget?: boolean;
    showGaugeLabels?: boolean;
    gaugePrimaryColor?: string;
    gaugeSecondaryColor?: string;
    // Heatmap properties
    heatmapStyle?: HeatmapVariant | string;
    heatmapTitle?: string;
    heatmapData?: Array<{label: string, value: number}>;
    heatmapRows?: number;
    heatmapColumns?: number;
    heatmapPrimaryColor?: string;
    heatmapSecondaryColor?: string;
    heatmapOrientation?: 'horizontal' | 'vertical';
    showDataLabels?: boolean;
    showLegends?: boolean;
    heatmapButtons?: Array<{title: string, alignment: string}>;
    heatmapKpis?: Array<{title: string, value: string, change?: string}>;
    // Quadrant Chart properties
    quadrantStyle?: QuadrantVariant | string;
    quadrantTitle?: string;
    quadrantData?: Array<{name: string, x: number, y: number}>;
    quadrantPrimaryColor?: string;
    quadrantSecondaryColor?: string;
    xAxisLabel?: string;
    yAxisLabel?: string;
    quadrantLabels?: Array<{label: string, position: string}>;
    // Scatter Plot properties
    scatterPlotStyle?: ScatterPlotVariant | string;
    scatterPlotTitle?: string;
    scatterPlotData?: Array<{name: string, x: number, y: number, size?: number}>;
    scatterPlotPrimaryColor?: string;
    scatterPlotSecondaryColor?: string;
    scatterXAxisLabel?: string;
    scatterYAxisLabel?: string;
    showTrendLine?: boolean;
    showCorrelation?: boolean;
    correlationValue?: number;
    // Geomap properties
    geomapStyle?: GeomapVariant | string;
    geomapTitle?: string;
    geomapData?: Array<{region: string, value: number, coordinates?: [number, number]}>;
    geomapPrimaryColor?: string;
    geomapSecondaryColor?: string;
    geomapRegion?: 'world' | 'usa' | 'europe' | 'asia';
    showTooltips?: boolean;
    showZoomControls?: boolean;
    mapProjection?: 'mercator' | 'natural-earth' | 'equal-earth';
    // Waterfall properties
    waterfallVariant?: WaterfallVariant;
    waterfallTitle?: string;
    waterfallData?: Array<{category: string, value: number, isTotal?: boolean}>;
    waterfallPrimaryColor?: string;
    waterfallSecondaryColor?: string;
    waterfallTotalColor?: string;
    waterfallButtons?: Array<{title: string, alignment: string}>;
    waterfallKpis?: Array<{title: string, value: string, change?: string}>;
    // Treemap properties
    treemapVariant?: TreemapVariant;
    treemapTitle?: string;
    treemapData?: Array<{name: string, value: number, color?: string}>;
    treemapPrimaryColor?: string;
    treemapSecondaryColor?: string;
    treemapButtons?: Array<{title: string, alignment: string}>;
    treemapKpis?: Array<{title: string, value: string, change?: string}>;
    // Histogram properties
    histogramVariant?: HistogramVariant;
    histogramTitle?: string;
    histogramData?: Array<{range: string, frequency: number}>;
    histogramPrimaryColor?: string;
    histogramSecondaryColor?: string;
    histogramButtons?: Array<{title: string, alignment: string}>;
    histogramKpis?: Array<{title: string, value: string, change?: string}>;
    binCount?: number;
    // Funnel Chart properties
    funnelChartVariant?: FunnelChartVariant;
    funnelChartTitle?: string;
    funnelChartData?: Array<{name: string, value: number, color?: string}>;
    funnelPrimaryColor?: string;
    funnelSecondaryColor?: string;
    funnelButtons?: Array<{title: string, alignment: string}>;
    funnelKpis?: Array<{title: string, value: string, change?: string}>;
    funnelDropdowns?: Array<{title: string, values: string[], editText?: string}>;
    funnelTexts?: Array<{title: string, content: string}>;
    
    // Add-ons - consolidated under one section
    showButtons?: boolean;
    showDropdowns?: boolean;
    showKpis?: boolean;
    showText?: boolean;
    
    // Enhanced Filter properties for data customization  
    filterDataSource?: 'manual' | 'csv' | 'json' | 'database';
    filterDataColumn?: string;
    filterQuery?: string;
    allowMultiSelect?: boolean;
    enableSearch?: boolean;
    searchPlaceholder?: string;
    enableDependentFilters?: boolean;
    parentFilterId?: string;
    dependencyRule?: string;
    enableCustomLogic?: boolean;
    customFilterLogic?: string;
    filterPerformance?: 'standard' | 'debounced' | 'lazy' | 'virtual';
    autoRefresh?: boolean;
    refreshInterval?: number;
    showApplyButton?: boolean;
    showClearAll?: boolean;
    showFilterCount?: boolean;
    
    // Additional filter variant-specific properties
    showSelectAll?: boolean;
    showSuggestions?: boolean;
    dateFormat?: string;
    showCalendarIcon?: boolean;
    sliderMin?: number;
    sliderMax?: number;
    sliderStep?: number;
    showSliderValues?: boolean;
  };
}

export interface Screen {
  id: string;
  name: string;
  isActive: boolean;
}

export interface Template {
  id: string;
  name: string;
  screens: Screen[];
  elements: Element[];
  createdAt: number;
  updatedAt: number;
}

export interface WireframeState {
  screens: Screen[];
  elements: Element[];
  selectedElementId: string | null;
  templates: Template[];
  activeTemplateId: string | null;
  showProperties: boolean;
  
  // Actions
  addElement: (type: ElementType, position: { x: number; y: number }) => void;
  updateElement: (id: string, updates: Partial<Element>) => void;
  removeElement: (id: string) => void;
  selectElement: (id: string | null) => void;
  saveTemplate: (name: string) => void;
  loadTemplate: (id: string) => void;
  createNewTemplate: () => void;
  deleteTemplate: (id: string) => void;
  toggleProperties: () => void;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
  updateLogoImage: (id: string, logoUrl: string) => void;
  updateImage: (id: string, imageUrl: string) => void;
  
  // Screen actions
  addScreen: () => void;
  switchScreen: (id: string) => void;
  renameScreen: (id: string, name: string) => void;
  deleteScreen: (id: string) => void;
}

export interface ChartDataPoint {
  category: string;
  value: number;
  line?: number;
  secondary?: number;
  tertiary?: number;
}
