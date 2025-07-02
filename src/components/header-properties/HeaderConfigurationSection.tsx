
import React from 'react';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface HeaderConfigurationSectionProps {
  variant?: string;
}

export function HeaderConfigurationSection({ variant }: HeaderConfigurationSectionProps) {
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
        <div className="font-medium text-sm">Template: {getVariantDisplayName()}</div>
        <div className="text-xs text-gray-500">Configure template-specific properties below</div>
      </div>
      <Separator />
    </>
  );
}
