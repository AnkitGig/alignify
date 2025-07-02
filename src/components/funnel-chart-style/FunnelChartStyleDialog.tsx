
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useWireframe } from '@/hooks/useWireframe';
import type { FunnelChartVariant } from '@/types/wireframe';
import { FunnelChartTemplates } from './FunnelChartTemplates';
import { X } from 'lucide-react';

interface FunnelChartStyleDialogProps {
  elementId: string;
  open: boolean;
  onClose: () => void;
}

export function FunnelChartStyleDialog({ elementId, open, onClose }: FunnelChartStyleDialogProps) {
  const { updateElementProperties } = useWireframe();
  const [selectedTemplate, setSelectedTemplate] = useState<FunnelChartVariant>('default');

  const handleApplyStyle = () => {
    updateElementProperties(elementId, {
      funnelChartVariant: selectedTemplate
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="text-lg font-semibold">Choose style</DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="flex-1 overflow-auto">
          <div className="mb-4">
            <h3 className="text-sm text-gray-600 mb-3">Available styles</h3>
            <div className="text-sm text-blue-600 mb-4">◉ Default</div>
          </div>

          <FunnelChartTemplates 
            selectedTemplate={selectedTemplate}
            onSelectTemplate={setSelectedTemplate}
          />
        </div>

        <div className="pt-4 border-t">
          <Button 
            onClick={handleApplyStyle}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Apply style
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
