
import React from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

interface WaterfallVariationSectionProps {
  properties: any;
  onOpenStyleDialog?: () => void;
}

export function WaterfallVariationSection({ properties, onOpenStyleDialog }: WaterfallVariationSectionProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-semibold">Variation</Label>
        <Button
          variant="ghost"
          size="sm"
          onClick={onOpenStyleDialog}
          className="h-8 w-8 p-0"
        >
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
