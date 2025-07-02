
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useWireframe } from '@/hooks/useWireframe';
import { HistogramTemplates } from './HistogramTemplates';

interface HistogramStyleDialogProps {
  elementId: string;
  open: boolean;
  onClose: () => void;
}

export function HistogramStyleDialog({ elementId, open, onClose }: HistogramStyleDialogProps) {
  const { updateElementProperties, elements } = useWireframe();
  const [selectedTemplate, setSelectedTemplate] = useState<string>('default');

  const currentElement = elements.find(el => el.id === elementId);
  
  useEffect(() => {
    if (currentElement && currentElement.properties) {
      const variant = currentElement.properties.histogramVariant;
      if (variant) {
        setSelectedTemplate(variant);
      }
    }
  }, [currentElement]);

  const templateConfigs = {
    'default': {
      histogramVariant: 'default' as const,
      histogramPrimaryColor: '#4F46E5',
      showLabels: true,
      showValues: true,
      showButtons: false,
      showKpis: false,
      showGridLines: true,
    },
    'with-buttons': {
      histogramVariant: 'with-buttons' as const,
      histogramPrimaryColor: '#059669',
      showLabels: true,
      showValues: true,
      showButtons: true,
      showKpis: false,
      showGridLines: true,
      histogramButtons: [
        { title: 'Filter', alignment: 'left' },
        { title: 'Export', alignment: 'right' }
      ],
    },
    'with-kpis': {
      histogramVariant: 'with-kpis' as const,
      histogramPrimaryColor: '#7C3AED',
      showLabels: true,
      showValues: true,
      showButtons: false,
      showKpis: true,
      showGridLines: true,
      histogramKpis: [
        { title: 'Mean', value: '45.2', change: '+5.2%' },
        { title: 'Std Dev', value: '12.8', change: '-2.1%' }
      ],
    },
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    const config = templateConfigs[templateId as keyof typeof templateConfigs];
    if (config) {
      updateElementProperties(elementId, config);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-[90vw] max-h-[90vh] flex flex-col overflow-hidden">
        <DialogHeader className="flex-shrink-0 pb-4 border-b">
          <DialogTitle>Choose Histogram Style</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto py-4">
          <HistogramTemplates 
            selectedTemplate={selectedTemplate}
            onSelectTemplate={handleTemplateSelect}
          />
        </div>
        
        <div className="flex justify-end space-x-2 pt-4 border-t flex-shrink-0">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
