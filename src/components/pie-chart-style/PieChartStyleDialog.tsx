
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useWireframe } from '@/hooks/useWireframe';
import { PieChartTemplates } from './PieChartTemplates';
import { PieChartVariant } from '@/types/wireframe';

interface PieChartStyleDialogProps {
  elementId: string;
  open: boolean;
  onClose: () => void;
}

export function PieChartStyleDialog({ elementId, open, onClose }: PieChartStyleDialogProps) {
  const { updateElementProperties, elements } = useWireframe();
  const [selectedTemplate, setSelectedTemplate] = useState<string>('default');

  // Get current element to determine initial template
  const currentElement = elements.find(el => el.id === elementId);
  
  useEffect(() => {
    if (currentElement && currentElement.properties) {
      const variant = currentElement.properties.pieChartVariant;
      if (variant) {
        setSelectedTemplate(variant);
      }
    }
  }, [currentElement]);

  const templateConfigs: Record<string, {
    pieChartVariant: PieChartVariant;
    showPieLegend: boolean;
    showPieLabels: boolean;
    showPercentages: boolean;
    pieChartButtons?: Array<{title: string, alignment: string}>;
    pieChartKpis?: Array<{title: string, value: string, change?: string}>;
    pieInnerRadius: number;
    pieOuterRadius: number;
  }> = {
    default: {
      pieChartVariant: 'default',
      showPieLegend: false,
      showPieLabels: true,
      showPercentages: true,
      pieInnerRadius: 0,
      pieOuterRadius: 80,
    },
    'with-legend': {
      pieChartVariant: 'with-legend',
      showPieLegend: true,
      showPieLabels: false,
      showPercentages: false,
      pieInnerRadius: 0,
      pieOuterRadius: 80,
    },
    'with-buttons': {
      pieChartVariant: 'with-buttons',
      showPieLegend: false,
      showPieLabels: false,
      showPercentages: false,
      pieInnerRadius: 0,
      pieOuterRadius: 80,
      pieChartButtons: [
        { title: 'Title 1', alignment: 'left' },
        { title: 'Title 2', alignment: 'right' }
      ],
    },
    'with-kpis': {
      pieChartVariant: 'with-kpis',
      showPieLegend: false,
      showPieLabels: false,
      showPercentages: false,
      pieInnerRadius: 0,
      pieOuterRadius: 80,
      pieChartKpis: [
        { title: 'Metric 1', value: '1234', change: '12%' },
        { title: 'Metric 2', value: '1234', change: '12%' }
      ],
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
          <DialogTitle>Choose Pie Chart Style</DialogTitle>
        </DialogHeader>
        
        <PieChartTemplates 
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
