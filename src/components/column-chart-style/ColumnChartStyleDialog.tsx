
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useWireframe } from '@/hooks/useWireframe';
import { ColumnChartTemplates } from './ColumnChartTemplates';
import { ChartVariant } from '@/types/wireframe';

interface ColumnChartStyleDialogProps {
  elementId: string;
  open: boolean;
  onClose: () => void;
}

export function ColumnChartStyleDialog({ elementId, open, onClose }: ColumnChartStyleDialogProps) {
  const { updateElementProperties, elements } = useWireframe();
  const [selectedTemplate, setSelectedTemplate] = useState<string>('default');

  // Get current element to determine initial template
  const currentElement = elements.find(el => el.id === elementId);
  
  useEffect(() => {
    if (currentElement && currentElement.properties) {
      const variant = currentElement.properties.chartVariant;
      if (variant) {
        setSelectedTemplate(variant);
      }
    }
  }, [currentElement]);

  const templateConfigs: Record<string, {
    chartVariant: ChartVariant;
    barColor: string;
    secondaryBarColor: string;
    showLegend: boolean;
    showGridLines: boolean;
    tertiaryBarColor?: string;
  }> = {
    default: {
      chartVariant: 'default',
      barColor: '#3B82F6',
      secondaryBarColor: '#818CF8',
      showLegend: true,
      showGridLines: true,
    },
    grouped: {
      chartVariant: 'grouped',
      barColor: '#10B981',
      secondaryBarColor: '#34D399',
      showLegend: true,
      showGridLines: true,
    },
    stacked: {
      chartVariant: 'stacked',
      barColor: '#F59E0B',
      secondaryBarColor: '#FBBF24',
      tertiaryBarColor: '#FCD34D',
      showLegend: true,
      showGridLines: false,
    },
    gradient: {
      chartVariant: 'gradient',
      barColor: '#8B5CF6',
      secondaryBarColor: '#A78BFA',
      showLegend: false,
      showGridLines: true,
    },
  };

  const applyTemplate = () => {
    const config = templateConfigs[selectedTemplate];
    if (config) {
      updateElementProperties(elementId, config);
    }
    onClose();
  };

  // Apply template immediately when selected (for preview)
  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    const config = templateConfigs[templateId];
    if (config) {
      updateElementProperties(elementId, config);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Choose Column Chart Style</DialogTitle>
        </DialogHeader>
        
        <ColumnChartTemplates 
          selectedTemplate={selectedTemplate}
          onSelectTemplate={handleTemplateSelect}
        />
        
        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
