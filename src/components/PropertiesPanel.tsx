
import { Element } from "@/types/wireframe";
import { useWireframe } from "@/hooks/useWireframe";
import { useState, useRef } from "react";
import { ShapeProperties } from "./properties/ShapeProperties";
import { HeaderProperties } from "./properties/HeaderProperties";
import { FilterProperties } from "./properties/FilterProperties";
import { KpiProperties } from "./properties/KpiProperties";
import { ImageProperties } from "./properties/ImageProperties";
import { DefaultProperties } from "./properties/DefaultProperties";
import { TextboxProperties } from "./properties/TextboxProperties";
import { ButtonProperties } from "./button-properties/ButtonProperties";
import { HeatmapProperties } from "./heatmap-properties/HeatmapProperties";
import { QuadrantProperties } from "./quadrant-properties/QuadrantProperties";
import { ScatterPlotProperties } from "./scatter-plot-properties/ScatterPlotProperties";
import { ColumnChartProperties } from "./column-chart-properties/ColumnChartProperties";
import { PieChartProperties } from "./pie-chart-properties/PieChartProperties";
import { ComboChartProperties } from "./combo-chart-properties/ComboChartProperties";
import { LineChartProperties } from "./line-chart-properties/LineChartProperties";
import { BarChartProperties } from "./bar-chart-properties/BarChartProperties";
import { WaterfallProperties } from "./waterfall-properties/WaterfallProperties";
import { TreemapProperties } from "./treemap-properties/TreemapProperties";
import { HistogramProperties } from "./histogram-properties/HistogramProperties";

interface PropertiesPanelProps {
  onOpenStyleDialog?: () => void;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
}

export function PropertiesPanel({ onOpenStyleDialog, updateElementProperties }: PropertiesPanelProps) {
  const { elements, selectedElementId, showProperties, toggleProperties, updateElement, updateLogoImage, updateImage, updateElementProperties: wireframeUpdateProperties } = useWireframe();
  
  const selectedElement = elements.find(el => el.id === selectedElementId);
  
  if (!selectedElement || !showProperties) {
    return null;
  }

  // Use the wireframe's updateElementProperties if the prop version isn't provided
  const handleUpdateElementProperties = updateElementProperties || wireframeUpdateProperties;
  
  console.log('Selected element type:', selectedElement.type);
  console.log('Selected element properties:', selectedElement.properties);
  
  // Render the appropriate properties component based on the element type
  const renderPropertiesComponent = () => {
    switch (selectedElement.type) {
      case 'button':
        return (
          <ButtonProperties
            element={selectedElement}
            updateElementProperties={handleUpdateElementProperties}
            toggleProperties={toggleProperties}
            onOpenStyleDialog={onOpenStyleDialog}
          />
        );
      case 'shapes':
        return (
          <ShapeProperties
            element={selectedElement}
            updateElementProperties={handleUpdateElementProperties}
            toggleProperties={toggleProperties}
            onOpenStyleDialog={onOpenStyleDialog}
          />
        );
      case 'header':
        return (
          <HeaderProperties
            element={selectedElement}
            updateElementProperties={handleUpdateElementProperties}
            toggleProperties={toggleProperties}
            onOpenStyleDialog={onOpenStyleDialog}
            updateLogoImage={updateLogoImage}
          />
        );
      case 'filter':
        return (
          <FilterProperties
            element={selectedElement}
            updateElementProperties={handleUpdateElementProperties}
            toggleProperties={toggleProperties}
          />
        );
      case 'kpi':
        return (
          <KpiProperties
            element={selectedElement}
            updateElementProperties={handleUpdateElementProperties}
            toggleProperties={toggleProperties}
          />
        );
      case 'image':
        return (
          <ImageProperties
            element={selectedElement}
            updateElementProperties={handleUpdateElementProperties}
            toggleProperties={toggleProperties}
            updateImage={updateImage}
          />
        );
      case 'textbox':
        return (
          <TextboxProperties
            element={selectedElement}
            updateElementProperties={handleUpdateElementProperties}
            toggleProperties={toggleProperties}
            onOpenStyleDialog={onOpenStyleDialog}
          />
        );
      case 'bar-chart':
        return (
          <BarChartProperties
            element={selectedElement}
            updateElementProperties={handleUpdateElementProperties}
            onOpenStyleDialog={onOpenStyleDialog}
          />
        );
      case 'waterfall':
        console.log('Rendering WaterfallProperties for element:', selectedElement.id);
        return (
          <WaterfallProperties
            element={selectedElement}
            updateElementProperties={handleUpdateElementProperties}
            onOpenStyleDialog={onOpenStyleDialog}
          />
        );
      case 'treemap':
        return (
          <TreemapProperties
            element={selectedElement}
            updateElementProperties={handleUpdateElementProperties}
            onOpenStyleDialog={onOpenStyleDialog}
          />
        );
      case 'histogram':
        return (
          <HistogramProperties
            element={selectedElement}
            updateElementProperties={handleUpdateElementProperties}
            onOpenStyleDialog={onOpenStyleDialog}
          />
        );
      case 'heatmap':
        return (
          <HeatmapProperties
            element={selectedElement}
            updateElementProperties={handleUpdateElementProperties}
            onOpenStyleDialog={onOpenStyleDialog}
          />
        );
      case 'quadrant-chart':
        return (
          <QuadrantProperties
            element={selectedElement}
            updateElementProperties={handleUpdateElementProperties}
            onOpenStyleDialog={onOpenStyleDialog}
          />
        );
      case 'scatter-plot':
        return (
          <ScatterPlotProperties
            element={selectedElement}
            updateElementProperties={handleUpdateElementProperties}
            onOpenStyleDialog={onOpenStyleDialog}
          />
        );
      case 'column-chart':
        return (
          <ColumnChartProperties
            element={selectedElement}
            updateElementProperties={handleUpdateElementProperties}
            onOpenStyleDialog={onOpenStyleDialog}
          />
        );
      case 'line-chart':
        return (
          <LineChartProperties
            element={selectedElement}
            updateElementProperties={handleUpdateElementProperties}
            onOpenStyleDialog={onOpenStyleDialog}
          />
        );
      case 'combo-chart':
        return (
          <ComboChartProperties
            element={selectedElement}
            updateElementProperties={handleUpdateElementProperties}
            onOpenStyleDialog={onOpenStyleDialog}
          />
        );
      case 'pie-chart':
        return (
          <PieChartProperties
            element={selectedElement}
            updateElementProperties={handleUpdateElementProperties}
            onOpenStyleDialog={onOpenStyleDialog}
          />
        );
      default:
        return (
          <DefaultProperties
            element={selectedElement}
            toggleProperties={toggleProperties}
            onOpenStyleDialog={onOpenStyleDialog}
          />
        );
    }
  };
  
  return (
    <div className="w-72 border-l bg-white overflow-auto h-full">
      <div className="p-4">
        {renderPropertiesComponent()}
      </div>
    </div>
  );
}
