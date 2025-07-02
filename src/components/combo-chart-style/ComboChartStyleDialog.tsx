
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ComboChartTemplates } from './ComboChartTemplates';
import { X } from 'lucide-react';

interface ComboChartStyleDialogProps {
  elementId: string;
  open: boolean;
  onClose: () => void;
}

export function ComboChartStyleDialog({ elementId, open, onClose }: ComboChartStyleDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] overflow-y-auto p-4 md:p-6">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="text-lg font-semibold">Choose style</DialogTitle>
          <button
            onClick={onClose}
            className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </DialogHeader>
        
        <ComboChartTemplates elementId={elementId} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}
