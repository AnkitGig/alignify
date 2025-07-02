
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useWireframe } from '@/hooks/useWireframe';
import { GeomapTemplates } from './GeomapTemplates';

interface GeomapStyleDialogProps {
  elementId: string;
  open: boolean;
  onClose: () => void;
}

export function GeomapStyleDialog({ elementId, open, onClose }: GeomapStyleDialogProps) {
  const { updateElementProperties } = useWireframe();
  const [selectedTemplate, setSelectedTemplate] = useState<string>('default');

  const applyTemplate = () => {
    const templateConfigs = {
      default: {
        geomapStyle: 'default',
        geomapPrimaryColor: '#3B82F6',
        geomapSecondaryColor: '#EFF6FF',
      },
      choropleth: {
        geomapStyle: 'choropleth',
        geomapPrimaryColor: '#059669',
        geomapSecondaryColor: '#D1FAE5',
      },
      'bubble-map': {
        geomapStyle: 'bubble-map',
        geomapPrimaryColor: '#DC2626',
        geomapSecondaryColor: '#FEE2E2',
      },
      'heat-intensity': {
        geomapStyle: 'heat-intensity',
        geomapPrimaryColor: '#7C3AED',
        geomapSecondaryColor: '#EDE9FE',
      },
    };

    const config = templateConfigs[selectedTemplate as keyof typeof templateConfigs];
    if (config) {
      updateElementProperties(elementId, config);
    }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Choose Geomap Style</DialogTitle>
        </DialogHeader>
        
        <GeomapTemplates 
          selectedTemplate={selectedTemplate}
          onSelectTemplate={setSelectedTemplate}
        />
        
        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={applyTemplate}>
            Apply Style
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
