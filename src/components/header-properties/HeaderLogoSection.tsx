
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ChevronDown, ChevronUp, Upload, Trash2 } from 'lucide-react';

interface HeaderLogoSectionProps {
  showLogo: boolean;
  logoUrl?: string;
  onLogoToggle: (checked: boolean) => void;
  onLogoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onLogoRemove: () => void;
}

export function HeaderLogoSection({ 
  showLogo, 
  logoUrl, 
  onLogoToggle, 
  onLogoUpload, 
  onLogoRemove 
}: HeaderLogoSectionProps) {
  const [showLogoOptions, setShowLogoOptions] = useState(false);

  return (
    <>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="font-medium text-sm">Logo</div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowLogoOptions(!showLogoOptions)}
            className="h-7 w-7 p-0"
          >
            {showLogoOptions ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="show-logo" className="text-sm">Show logo</Label>
          <Switch 
            id="show-logo"
            checked={showLogo} 
            onCheckedChange={onLogoToggle}
          />
        </div>
        
        {showLogoOptions && showLogo && (
          <div className="space-y-3 pt-2">
            <div>
              <Label className="text-xs text-gray-500 mb-2 block">Upload Logo</Label>
              <div className="flex flex-col space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-center"
                  onClick={() => document.getElementById('logo-upload')?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {logoUrl ? 'Change Logo' : 'Upload Logo'}
                </Button>
                <input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  onChange={onLogoUpload}
                  className="hidden"
                />
                {logoUrl && (
                  <div className="mt-2 p-2 border rounded-md">
                    <img 
                      src={logoUrl} 
                      alt="Logo Preview" 
                      className="h-12 w-auto object-contain mx-auto mb-2"
                    />
                    <Button 
                      variant="destructive" 
                      size="sm"
                      className="w-full"
                      onClick={onLogoRemove}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove Logo
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <Separator />
    </>
  );
}
