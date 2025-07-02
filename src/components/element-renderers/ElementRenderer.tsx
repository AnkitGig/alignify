
import React from "react";
import { Element } from "@/types/wireframe";
import { ButtonRenderer } from "./ButtonRenderer";
import { TextboxRenderer } from "./TextboxRenderer";
import { HeaderRenderer } from "./HeaderRenderer";
import { ImageRenderer } from "./ImageRenderer";
import { ShapeDisplay } from "../ShapeDisplay";
import { FilterDisplay } from "../FilterDisplay";
import { KpiDisplay } from "../KpiDisplay";
import { ChartRenderer } from "./ChartRenderer";
import { BarChartRenderer } from "./BarChartRenderer";
import { ComboChartRenderer } from "./ComboChartRenderer";
import { LineChartRenderer } from "./LineChartRenderer";
import { PieChartRenderer } from "./PieChartRenderer";
import { HeatmapRenderer } from "./HeatmapRenderer";
import { QuadrantChartRenderer } from "./QuadrantChartRenderer";
import { ScatterPlotRenderer } from "./ScatterPlotRenderer";
import { WaterfallRenderer } from "./WaterfallRenderer";
import { TreemapRenderer } from "./TreemapRenderer";
import { HistogramRenderer } from "./HistogramRenderer";
import { DefaultRenderer } from "./DefaultRenderer";

interface ElementRendererProps {
  element: Element;
  isEditable?: boolean;
}

export function ElementRenderer({ element, isEditable = false }: ElementRendererProps) {
  const { type, properties = {} } = element;

  switch (type) {
    case 'button':
      return <ButtonRenderer properties={properties} />;
    case 'textbox':
      return <TextboxRenderer properties={properties} />;
    case 'header':
      return <HeaderRenderer properties={properties} />;
    case 'image':
      return <ImageRenderer properties={properties} />;
    case 'shapes':
      return <ShapeDisplay element={element} />;
    case 'filter':
      return <FilterDisplay element={element} />;
    case 'kpi':
      return <KpiDisplay element={element} />;
    case 'column-chart':
      return <ChartRenderer properties={properties} type="column-chart" />;
    case 'bar-chart':
      return <BarChartRenderer properties={properties} />;
    case 'combo-chart':
      return <ComboChartRenderer properties={properties} />;
    case 'line-chart':
      return <LineChartRenderer properties={properties} />;
    case 'pie-chart':
      return <PieChartRenderer properties={properties} />;
    case 'heatmap':
      return <HeatmapRenderer properties={properties} />;
    case 'quadrant-chart':
      return <QuadrantChartRenderer properties={properties} />;
    case 'scatter-plot':
      return <ScatterPlotRenderer properties={properties} />;
    case 'waterfall':
      return <WaterfallRenderer properties={properties} />;
    case 'treemap':
      return <TreemapRenderer properties={properties} />;
    case 'histogram':
      return <HistogramRenderer properties={properties} />;
    default:
      return <DefaultRenderer type={type} element={element} isEditable={isEditable} />;
  }
}
