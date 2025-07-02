import { ElementType, Element } from '@/types/wireframe';

export function getDefaultSizeForType(type: ElementType): { width: number; height: number } {
  switch (type) {
    case 'header':
      return { width: 800, height: 80 };
    case 'button':
      return { width: 120, height: 40 };
    case 'filter':
      return { width: 200, height: 40 };
    case 'kpi':
      return { width: 200, height: 120 };
    case 'column-chart':
    case 'bar-chart':
    case 'line-chart':
    case 'area-chart':
    case 'combo-chart':
    case 'pie-chart':
    case 'heatmap':
    case 'quadrant-chart':
    case 'scatter-plot':
    case 'waterfall':
    case 'treemap':
    case 'histogram':
      return { width: 400, height: 300 };
    case 'simple-table':
      return { width: 500, height: 300 };
    case 'image':
      return { width: 200, height: 200 };
    case 'textbox':
      return { width: 300, height: 100 };
    case 'shapes':
      return { width: 100, height: 100 };
    default:
      return { width: 200, height: 100 };
  }
}

export function getDefaultPropertiesForType(type: ElementType): Element['properties'] {
  switch (type) {
    case 'header':
      return {
        title: 'Header Title',
        variant: 'default',
        backgroundColor: '#ffffff',
        textColor: '#000000',
        showLogo: true,
        showNavigation: true,
        navigationItems: ['Home', 'About', 'Contact']
      };
    case 'button':
      return {
        buttonText: 'Button',
        buttonVariant: 'default',
        buttonSize: 'md',
        backgroundColor: '#3B82F6',
        textColor: '#FFFFFF'
      };
    case 'filter':
      return {
        filterTitle: 'Filter',
        filterVariant: 'dropdown',
        filterValues: ['Option 1', 'Option 2', 'Option 3'],
        filterAlignment: 'left',
        filterDataSource: 'manual',
        filterDataColumn: '',
        filterQuery: '',
        allowMultiSelect: false,
        enableSearch: false,
        searchPlaceholder: 'Search filters...',
        enableDependentFilters: false,
        parentFilterId: '',
        dependencyRule: '',
        enableCustomLogic: false,
        customFilterLogic: '',
        filterPerformance: 'standard',
        autoRefresh: false,
        refreshInterval: 30,
        showApplyButton: false,
        showClearAll: false,
        showFilterCount: false,
        showSelectAll: false,
        showSuggestions: false,
        dateFormat: 'DD/MM/YYYY',
        showCalendarIcon: true,
        sliderMin: 0,
        sliderMax: 100,
        sliderStep: 1,
        showSliderValues: true,
      };
    case 'kpi':
      return {
        kpiVariant: 'basic',
        kpiTitle: 'KPI Title',
        kpiValue: '1,234',
        kpiPreviousValue: '1,000',
        kpiChangePercentage: '+23.4%',
        kpiAlignment: 'center',
        showKpiTitle: true,
        showPreviousValue: true,
        showChangePercentage: true
      };
    case 'column-chart':
      return {
        chartTitle: 'Column Chart',
        chartVariant: 'default',
        showTitle: true,
        showLabels: true,
        showValues: true,
        showGridLines: true,
        barColor: '#3B82F6',
        chartData: [
          { category: 'Jan', value: 400 },
          { category: 'Feb', value: 300 },
          { category: 'Mar', value: 200 },
          { category: 'Apr', value: 278 },
          { category: 'May', value: 189 }
        ]
      };
    case 'bar-chart':
      return {
        chartTitle: 'Bar Chart',
        chartVariant: 'bar',
        showTitle: true,
        showLabels: true,
        showValues: true,
        showGridLines: true,
        barColor: '#3B82F6',
        chartData: [
          { category: 'Category A', value: 400 },
          { category: 'Category B', value: 300 },
          { category: 'Category C', value: 200 },
          { category: 'Category D', value: 278 },
          { category: 'Category E', value: 189 }
        ]
      };
    case 'line-chart':
      return {
        chartTitle: 'Line Chart',
        chartVariant: 'basic-line',
        showTitle: true,
        showLabels: true,
        showValues: true,
        showGridLines: true,
        lineColor: '#3B82F6',
        lineStyle: 'solid',
        lineWidth: 2,
        showMarkers: true,
        chartData: [
          { category: 'Jan', value: 400 },
          { category: 'Feb', value: 300 },
          { category: 'Mar', value: 200 },
          { category: 'Apr', value: 278 },
          { category: 'May', value: 189 }
        ]
      };
    case 'combo-chart':
      return {
        chartTitle: 'Combo Chart',
        chartVariant: 'basic-combo',
        showTitle: true,
        showLabels: true,
        showValues: true,
        showGridLines: true,
        barColor: '#3B82F6',
        lineColor: '#EF4444',
        chartData: [
          { category: 'Jan', value: 400, line: 240 },
          { category: 'Feb', value: 300, line: 139 },
          { category: 'Mar', value: 200, line: 980 },
          { category: 'Apr', value: 278, line: 390 },
          { category: 'May', value: 189, line: 480 }
        ]
      };
    case 'pie-chart':
      return {
        pieChartTitle: 'Pie Chart',
        pieChartVariant: 'default',
        showTitle: true,
        showPieLabels: true,
        showPieLegend: true,
        pieChartData: [
          { name: 'Category A', value: 400, color: '#0088FE' },
          { name: 'Category B', value: 300, color: '#00C49F' },
          { name: 'Category C', value: 300, color: '#FFBB28' },
          { name: 'Category D', value: 200, color: '#FF8042' }
        ]
      };
    case 'heatmap':
      return {
        heatmapTitle: 'Heatmap',
        heatmapStyle: 'default',
        showTitle: true,
        heatmapRows: 5,
        heatmapColumns: 7,
        heatmapPrimaryColor: '#3B82F6',
        heatmapSecondaryColor: '#E5E7EB',
        showDataLabels: true,
        heatmapData: Array.from({ length: 35 }, (_, i) => ({
          label: `Day ${i + 1}`,
          value: Math.floor(Math.random() * 100)
        }))
      };
    case 'quadrant-chart':
      return {
        quadrantTitle: 'Quadrant Chart',
        quadrantStyle: 'default',
        showTitle: true,
        quadrantPrimaryColor: '#3B82F6',
        quadrantSecondaryColor: '#E5E7EB',
        xAxisLabel: 'X Axis',
        yAxisLabel: 'Y Axis',
        quadrantData: [
          { name: 'Item 1', x: 30, y: 40 },
          { name: 'Item 2', x: 60, y: 70 },
          { name: 'Item 3', x: 20, y: 80 },
          { name: 'Item 4', x: 80, y: 30 }
        ]
      };
    case 'scatter-plot':
      return {
        scatterPlotTitle: 'Scatter Plot',
        scatterPlotStyle: 'default',
        showTitle: true,
        scatterPlotPrimaryColor: '#3B82F6',
        scatterPlotSecondaryColor: '#E5E7EB',
        scatterXAxisLabel: 'X Axis',
        scatterYAxisLabel: 'Y Axis',
        scatterPlotData: [
          { name: 'Point 1', x: 30, y: 40 },
          { name: 'Point 2', x: 60, y: 70 },
          { name: 'Point 3', x: 20, y: 80 },
          { name: 'Point 4', x: 80, y: 30 }
        ]
      };
    case 'waterfall':
      return {
        waterfallTitle: 'Waterfall Chart',
        waterfallVariant: 'basic-waterfall',
        showTitle: true,
        showLabels: true,
        showValues: true,
        waterfallPrimaryColor: '#3B82F6',
        waterfallSecondaryColor: '#EF4444',
        waterfallTotalColor: '#10B981',
        waterfallData: [
          { category: 'Starting Value', value: 100 },
          { category: 'Increase 1', value: 20 },
          { category: 'Decrease 1', value: -10 },
          { category: 'Increase 2', value: 15 },
          { category: 'Total', value: 125, isTotal: true }
        ]
      };
    case 'treemap':
      return {
        treemapTitle: 'Treemap Chart',
        treemapVariant: 'default',
        showTitle: true,
        showLabels: true,
        showValues: true,
        treemapPrimaryColor: '#4F46E5',
        treemapData: [
          { name: 'Category A', value: 400, color: '#4F46E5' },
          { name: 'Category B', value: 300, color: '#7C3AED' },
          { name: 'Category C', value: 200, color: '#059669' },
          { name: 'Category D', value: 150, color: '#DC2626' },
          { name: 'Category E', value: 100, color: '#EA580C' }
        ]
      };
    case 'histogram':
      return {
        histogramTitle: 'Histogram Chart',
        histogramVariant: 'default',
        showTitle: true,
        showLabels: true,
        showValues: true,
        showGridLines: true,
        histogramPrimaryColor: '#4F46E5',
        binCount: 8,
        histogramData: [
          { range: '0-10', frequency: 5 },
          { range: '10-20', frequency: 8 },
          { range: '20-30', frequency: 12 },
          { range: '30-40', frequency: 15 },
          { range: '40-50', frequency: 10 },
          { range: '50-60', frequency: 7 },
          { range: '60-70', frequency: 4 },
          { range: '70-80', frequency: 2 }
        ]
      };
    case 'simple-table':
      return {
        tableTitle: 'Data Table',
        showTitle: true,
        numRows: 5,
        numColumns: 4,
        showTableBorder: true,
        headerBackground: '#F3F4F6',
        headerTextColor: '#374151',
        cellBackground: '#FFFFFF',
        cellTextColor: '#374151',
        tableHeaders: ['Header 1', 'Header 2', 'Header 3', 'Header 4'],
        tableData: [
          ['Row 1 Col 1', 'Row 1 Col 2', 'Row 1 Col 3', 'Row 1 Col 4'],
          ['Row 2 Col 1', 'Row 2 Col 2', 'Row 2 Col 3', 'Row 2 Col 4'],
          ['Row 3 Col 1', 'Row 3 Col 2', 'Row 3 Col 3', 'Row 3 Col 4'],
          ['Row 4 Col 1', 'Row 4 Col 2', 'Row 4 Col 3', 'Row 4 Col 4'],
          ['Row 5 Col 1', 'Row 5 Col 2', 'Row 5 Col 3', 'Row 5 Col 4']
        ]
      };
    case 'image':
      return {
        imageUrl: '/placeholder.svg',
        imageAlt: 'Placeholder image',
        imageFit: 'contain',
        hasBorder: false,
        hasShadow: false
      };
    case 'textbox':
      return {
        textboxContent: 'Enter your text here...',
        textboxTitle: 'Text Box',
        showTextboxTitle: true,
        textAlignment: 'left',
        fontSize: 'md',
        fontWeight: 'normal',
        fontFamily: 'inter',
        backgroundColor: 'transparent',
        textColor: '#000000'
      };
    case 'shapes':
      return {
        shapeVariant: 'rectangle',
        shapeColor: '#3B82F6',
        shapeWidth: 100,
        shapeHeight: 100,
        showTitle: false,
        title: 'Shape'
      };
    default:
      return {};
  }
}
