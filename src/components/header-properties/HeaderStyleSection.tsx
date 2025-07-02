
import React from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ChevronDown } from 'lucide-react';

interface HeaderStyleSectionProps {
  variant?: string;
  onOpenStyleDialog?: () => void;
}

export function HeaderStyleSection({ variant, onOpenStyleDialog }: HeaderStyleSectionProps) {
  const getVariantDisplayName = () => {
    switch (variant) {
      case 'default': return 'Default Style';
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
      default: return 'Default Style';
    }
  };

  return (
    <>
      <div className="space-y-2">
        <Label className="text-sm font-medium">Header Style</Label>
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-between h-8"
          onClick={onOpenStyleDialog}
        >
          {getVariantDisplayName()}
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
        <p className="text-xs text-gray-500">Double-click on the header to change styles</p>
      </div>
      <Separator />
    </>
  );
}
