
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ExternalLink } from 'lucide-react';

interface HeaderVariationSectionProps {
  properties: any;
  onOpenStyleDialog?: () => void;
}

export function HeaderVariationSection({ properties, onOpenStyleDialog }: HeaderVariationSectionProps) {
  const getVariantDisplayName = (variant: string) => {
    switch (variant) {
      case 'default': return 'Default';
      case 'with-description': return 'With Description';
      case 'with-metrics': return 'With Metrics';
      case 'centered-navigation-purple': return 'Centered Navigation (Purple)';
      case 'navigation-top': return 'Top Navigation';
      case 'double-logo-purple': return 'Double Logo (Purple)';
      case 'dark-navigation': return 'Dark Navigation';
      case 'gradient': return 'Gradient';
      case 'minimal': return 'Minimal';
      case 'colorful-banner': return 'Colorful Banner';
      case 'title-metrics': return 'Title with Metrics';
      default: return 'Default';
    }
  };

  return (
    <div className="border-t pt-4">
      <div className="space-y-3">
        <Label className="text-sm font-semibold">Variation</Label>
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-between"
          onClick={onOpenStyleDialog}
        >
          <span className="text-xs">{getVariantDisplayName(properties.variant || 'default')}</span>
          <ExternalLink className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}
