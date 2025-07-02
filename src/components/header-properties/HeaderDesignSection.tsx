
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ExternalLink } from 'lucide-react';

interface HeaderDesignSectionProps {
  properties: any;
  onOpenStyleDialog?: () => void;
}

export function HeaderDesignSection({ properties, onOpenStyleDialog }: HeaderDesignSectionProps) {
  return (
    <div className="border-t pt-4">
      <div className="space-y-3">
        <Label className="text-sm font-semibold">Design Customizations</Label>
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-between"
          onClick={onOpenStyleDialog}
        >
          <span className="text-xs">Customize Design</span>
          <ExternalLink className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}
