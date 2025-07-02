
import React, { useState, useRef } from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from 'sonner';

interface HeaderDoubleLogoSectionProps {
  showDoubleLogos: boolean;
  primaryLogoUrl?: string;
  secondaryLogoUrl?: string;
  variant?: string;
  onDoubleLogosToggle: (checked: boolean) => void;
  onPrimaryLogoUpload: (logoUrl: string) => void;
  onSecondaryLogoUpload: (logoUrl: string) => void;
  onPrimaryLogoRemove: () => void;
  onSecondaryLogoRemove: () => void;
}

export function HeaderDoubleLogoSection({
  showDoubleLogos,
  primaryLogoUrl,
  secondaryLogoUrl,
  variant,
  onDoubleLogosToggle,
  onPrimaryLogoUpload,
  onSecondaryLogoUpload,
  onPrimaryLogoRemove,
  onSecondaryLogoRemove
}: HeaderDoubleLogoSectionProps) {
  const [showLogoOptions, setShowLogoOptions] = useState(false);
  const primaryFileInputRef = useRef<HTMLInputElement>(null);
  const secondaryFileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'primary' | 'secondary') => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const base64String = event.target.result.toString();
        if (type === 'primary') {
          onPrimaryLogoUpload(base64String);
        } else {
          onSecondaryLogoUpload(base64String);
        }
        toast.success(`${type} logo updated successfully!`);
      }
    };
    reader.readAsDataURL(file);
  };

  const supportsDoubleLogos = variant === 'double-logo-purple' || variant === 'default';

  if (!supportsDoubleLogos) return null;

  return (
    <>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="font-medium text-sm">Double Logos</div>
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
          <Label htmlFor="show-double-logos" className="text-sm">Show double logos</Label>
          <Switch 
            id="show-double-logos"
            checked={showDoubleLogos} 
            onCheckedChange={onDoubleLogosToggle}
          />
        </div>
        
        {showLogoOptions && showDoubleLogos && (
          <div className="space-y-4 pt-2">
            {/* Primary Logo */}
            <div className="space-y-2">
              <Label className="text-xs text-gray-500">Primary Logo (Left)</Label>
              <Button 
                className="w-full" 
                variant="outline" 
                onClick={() => primaryFileInputRef.current?.click()}
              >
                {primaryLogoUrl ? 'Change Primary Logo' : 'Add Primary Logo'}
              </Button>
              <input 
                type="file" 
                ref={primaryFileInputRef} 
                onChange={(e) => handleFileChange(e, 'primary')}
                className="hidden" 
                accept="image/*" 
              />
              {primaryLogoUrl && (
                <div className="mt-2 p-2 border rounded-md">
                  <img 
                    src={primaryLogoUrl} 
                    alt="Primary Logo Preview" 
                    className="h-12 w-auto object-contain mx-auto"
                  />
                  <Button 
                    className="w-full mt-2" 
                    variant="destructive" 
                    size="sm"
                    onClick={onPrimaryLogoRemove}
                  >
                    Remove Primary Logo
                  </Button>
                </div>
              )}
            </div>

            {/* Secondary Logo */}
            <div className="space-y-2">
              <Label className="text-xs text-gray-500">Secondary Logo (Right)</Label>
              <Button 
                className="w-full" 
                variant="outline" 
                onClick={() => secondaryFileInputRef.current?.click()}
              >
                {secondaryLogoUrl ? 'Change Secondary Logo' : 'Add Secondary Logo'}
              </Button>
              <input 
                type="file" 
                ref={secondaryFileInputRef} 
                onChange={(e) => handleFileChange(e, 'secondary')}
                className="hidden" 
                accept="image/*" 
              />
              {secondaryLogoUrl && (
                <div className="mt-2 p-2 border rounded-md">
                  <img 
                    src={secondaryLogoUrl} 
                    alt="Secondary Logo Preview" 
                    className="h-12 w-auto object-contain mx-auto"
                  />
                  <Button 
                    className="w-full mt-2" 
                    variant="destructive" 
                    size="sm"
                    onClick={onSecondaryLogoRemove}
                  >
                    Remove Secondary Logo
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <Separator />
    </>
  );
}
