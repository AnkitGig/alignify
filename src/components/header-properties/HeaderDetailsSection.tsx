
import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Settings } from 'lucide-react';

interface HeaderDetailsSectionProps {
  title: string;
  showLogo: boolean;
  logoUrl?: string;
  variant?: string;
  onTitleChange: (value: string) => void;
  onLogoToggle: (checked: boolean) => void;
  onLogoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onLogoRemove: () => void;
}

export function HeaderDetailsSection({
  title,
  showLogo,
  logoUrl,
  variant,
  onTitleChange,
  onLogoToggle,
  onLogoUpload,
  onLogoRemove
}: HeaderDetailsSectionProps) {
  const supportsLogo = variant !== 'minimal';

  return (
    <>
      <div className="space-y-2">
        <div className="font-medium text-sm flex items-center">
          Details
          <Settings className="h-3 w-3 ml-1 text-gray-400" />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="show-title" className="text-sm">Title</Label>
          <Switch 
            id="show-title"
            checked={title !== ''} 
            onCheckedChange={(checked) => onTitleChange(checked ? 'DASHBOARD TITLE' : '')}
          />
        </div>
        
        {title !== '' && (
          <div className="space-y-2">
            <Label htmlFor="title-text" className="text-sm">Edit Text</Label>
            <Input 
              id="title-text"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              className="h-8"
            />
          </div>
        )}
        
        {supportsLogo && (
          <div className="flex items-center justify-between">
            <Label htmlFor="show-logo" className="text-sm">Primary Logo</Label>
            <Switch 
              id="show-logo"
              checked={showLogo}
              onCheckedChange={onLogoToggle}
            />
          </div>
        )}
        
        {showLogo && supportsLogo && (
          <div className="space-y-2">
            <Button 
              className="w-full h-8" 
              variant="outline" 
              onClick={() => document.getElementById('logo-upload')?.click()}
            >
              {logoUrl ? 'Change Image' : 'Add Image'}
            </Button>
            <input 
              id="logo-upload"
              type="file" 
              onChange={onLogoUpload}
              className="hidden" 
              accept="image/*" 
            />
            {logoUrl && (
              <div className="mt-2 p-2 border rounded-md">
                <img 
                  src={logoUrl} 
                  alt="Logo Preview" 
                  className="h-12 w-auto object-contain mx-auto"
                />
                <Button 
                  className="w-full mt-2" 
                  variant="destructive" 
                  size="sm"
                  onClick={onLogoRemove}
                >
                  Remove
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
      <Separator />
    </>
  );
}
