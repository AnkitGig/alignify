
import React from 'react';
import { Element } from '@/types/wireframe';
import { HeaderStyleDialog } from './header-style/HeaderStyleDialog';
import { BarChartStyleDialog } from './bar-chart-style/BarChartStyleDialog';
import { ColumnChartStyleDialog } from './column-chart-style/ColumnChartStyleDialog';
import { PieChartStyleDialog } from './pie-chart-style/PieChartStyleDialog';
import { ComboChartStyleDialog } from './combo-chart-style/ComboChartStyleDialog';
import { LineChartStyleDialog } from './line-chart-style/LineChartStyleDialog';
import { TableStyleDialog } from './table-style/TableStyleDialog';
import { GaugeStyleDialog } from './GaugeStyleDialog';
import { HeatmapStyleDialog } from './heatmap-style/HeatmapStyleDialog';
import { QuadrantStyleDialog } from './quadrant-style/QuadrantStyleDialog';
import { ScatterPlotStyleDialog } from './scatter-plot-style/ScatterPlotStyleDialog';
import { WaterfallStyleDialog } from './waterfall-style/WaterfallStyleDialog';
import { TreemapStyleDialog } from './treemap-style/TreemapStyleDialog';
import { HistogramStyleDialog } from './histogram-style/HistogramStyleDialog';
import { ImageStyleDialog } from './ImageStyleDialog';
import { ShapeStyleDialog } from './ShapeStyleDialog';
import { FilterStyleDialog } from './FilterStyleDialog';
import { KpiStyleDialog } from './KpiStyleDialog';
import { TextboxStyleDialog } from './TextboxStyleDialog';
import { AreaChartStyleDialog } from './AreaChartStyleDialog';
import { FunnelChartStyleDialog } from './funnel-chart-style/FunnelChartStyleDialog';

interface StyleDialogControllerProps {
  element: Element;
  dialogType: string | null;
  onClose: () => void;
}

export function StyleDialogController({ element, dialogType, onClose }: StyleDialogControllerProps) {
  if (!dialogType) return null;

  const commonProps = {
    elementId: element.id,
    open: true,
    onClose
  };

  switch (dialogType) {
    case 'header':
      return <HeaderStyleDialog {...commonProps} isOpen={true} />;
    case 'bar-chart':
      return <BarChartStyleDialog {...commonProps} />;
    case 'column-chart':
      return <ColumnChartStyleDialog {...commonProps} />;
    case 'pie-chart':
      return <PieChartStyleDialog {...commonProps} />;
    case 'combo-chart':
      return <ComboChartStyleDialog {...commonProps} />;
    case 'line-chart':
      return <LineChartStyleDialog {...commonProps} />;
    case 'table':
      return <TableStyleDialog {...commonProps} />;
    case 'gauge':
      return <GaugeStyleDialog {...commonProps} />;
    case 'heatmap':
      return <HeatmapStyleDialog {...commonProps} />;
    case 'quadrant':
      return <QuadrantStyleDialog {...commonProps} />;
    case 'scatter-plot':
      return <ScatterPlotStyleDialog {...commonProps} />;
    case 'waterfall':
      return <WaterfallStyleDialog {...commonProps} />;
    case 'treemap':
      return <TreemapStyleDialog {...commonProps} />;
    case 'histogram':
      return <HistogramStyleDialog {...commonProps} />;
    case 'image':
      return <ImageStyleDialog {...commonProps} />;
    case 'shapes':
      return <ShapeStyleDialog {...commonProps} isOpen={true} />;
    case 'filter':
      return <FilterStyleDialog {...commonProps} />;
    case 'kpi':
      return <KpiStyleDialog {...commonProps} />;
    case 'textbox':
      return <TextboxStyleDialog {...commonProps} />;
    case 'area-chart':
      return <AreaChartStyleDialog {...commonProps} />;
    case 'funnel-chart':
      return <FunnelChartStyleDialog {...commonProps} />;
    default:
      return null;
  }
}
