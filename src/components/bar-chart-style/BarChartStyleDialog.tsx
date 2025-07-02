
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useWireframe } from '@/hooks/useWireframe';
import { BarChartTemplates } from './BarChartTemplates';
import { ChartVariant } from '@/types/wireframe';

interface BarChartStyleDialogProps {
  elementId: string;
  open: boolean;
  onClose: () => void;
}

export function BarChartStyleDialog({ elementId, open, onClose }: BarChartStyleDialogProps) {
  const { updateElementProperties, elements } = useWireframe();
  const [selectedTemplate, setSelectedTemplate] = useState<string>('bar');

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
    tertiaryBarColor: string;
    showLegend: boolean;
    showGridLines: boolean;
    showKpis?: boolean;
    showButtons?: boolean;
  }> = {
    bar: {
      chartVariant: 'bar',
      barColor: '#4F46E5',
      secondaryBarColor: '#818CF8',
      tertiaryBarColor: '#C7D2FE',
      showLegend: false,
      showGridLines: true,
    },
    'dropdown-bar': {
      chartVariant: 'dropdown-bar',
      barColor: '#4F46E5',
      secondaryBarColor: '#818CF8',
      tertiaryBarColor: '#C7D2FE',
      showLegend: false,
      showGridLines: true,
      showButtons: true,
    },
    'kpi-bar': {
      chartVariant: 'kpi-bar',
      barColor: '#4F46E5',
      secondaryBarColor: '#818CF8',
      tertiaryBarColor: '#C7D2FE',
      showLegend: true,
      showGridLines: true,
      showKpis: true,
    },
    'multi-bar': {
      chartVariant: 'multi-bar',
      barColor: '#10B981',
      secondaryBarColor: '#34D399',
      tertiaryBarColor: '#6EE7B7',
      showLegend: true,
      showGridLines: true,
    },
    'stacked-bar': {
      chartVariant: 'stacked-bar',
      barColor: '#F59E0B',
      secondaryBarColor: '#FBBF24',
      tertiaryBarColor: '#FCD34D',
      showLegend: true,
      showGridLines: false,
    },
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
          <DialogTitle>Choose style</DialogTitle>
        </DialogHeader>
        
        <BarChartTemplates 
          selectedTemplate={selectedTemplate}
          onSelectTemplate={handleTemplateSelect}
        />
        
        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onClose} className="bg-indigo-600 hover:bg-indigo-700 text-white">
            Apply style
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
