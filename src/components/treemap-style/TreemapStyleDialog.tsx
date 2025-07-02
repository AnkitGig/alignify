
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useWireframe } from '@/hooks/useWireframe';
import { TreemapTemplates } from './TreemapTemplates';

interface TreemapStyleDialogProps {
  elementId: string;
  open: boolean;
  onClose: () => void;
}

export function TreemapStyleDialog({ elementId, open, onClose }: TreemapStyleDialogProps) {
  const { updateElementProperties, elements } = useWireframe();
  const [selectedTemplate, setSelectedTemplate] = useState<string>('default');

  const currentElement = elements.find(el => el.id === elementId);
  
  useEffect(() => {
    if (currentElement && currentElement.properties) {
      const variant = currentElement.properties.treemapVariant;
      if (variant) {
        setSelectedTemplate(variant);
      }
    }
  }, [currentElement]);

  const templateConfigs = {
    'default': {
      treemapVariant: 'default' as const,
      treemapPrimaryColor: '#4F46E5',
      treemapSecondaryColor: '#818CF8',
      showLabels: true,
      showValues: true,
      showButtons: false,
      showKpis: false,
    },
    'with-buttons': {
      treemapVariant: 'with-buttons' as const,
      treemapPrimaryColor: '#059669',
      treemapSecondaryColor: '#34D399',
      showLabels: true,
      showValues: true,
      showButtons: true,
      showKpis: false,
      treemapButtons: [
        { title: 'Title 1', alignment: 'left' },
        { title: 'Title 2', alignment: 'right' }
      ],
    },
    'with-kpis': {
      treemapVariant: 'with-kpis' as const,
      treemapPrimaryColor: '#7C3AED',
      treemapSecondaryColor: '#A78BFA',
      showLabels: true,
      showValues: false,
      showButtons: false,
      showKpis: true,
      treemapKpis: [
        { title: 'Metric 1', value: '1234', change: '12%' },
        { title: 'Metric 2', value: '1234', change: '12%' }
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
          <DialogTitle>Choose Treemap Style</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto py-4">
          <TreemapTemplates 
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
