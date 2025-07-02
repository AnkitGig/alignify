
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, X } from "lucide-react";
import { toast } from "sonner";

interface EmbedProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId?: string;
}

export function EmbedProjectDialog({ open, onOpenChange, projectId }: EmbedProjectDialogProps) {
  const embedUrl = `https://app.alignify.ai/embed/${projectId || 'bd893fa9-a8df-43c8-9d4e'}`;
  const embedCode = `<iframe src="${embedUrl}" width="800" height="600" frameborder="0"></iframe>`;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(embedUrl);
    toast.success("Embed URL copied to clipboard");
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(embedCode);
    toast.success("Embed code copied to clipboard");
  };

  const handleUnpublish = () => {
    toast.success("Project unpublished. Embed links will no longer work.");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>Embed Project</DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="space-y-3">
            <Label className="text-base font-medium">Copy URL</Label>
            <div className="flex gap-2">
              <Input 
                value={embedUrl}
                readOnly
                className="flex-1 text-sm"
              />
              <Button variant="outline" onClick={handleCopyUrl}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
            <div className="text-sm text-blue-600 cursor-pointer">
              Learn more?
            </div>
          </div>
          
          <div className="space-y-3">
            <Label className="text-base font-medium">Embed Code</Label>
            <div className="flex gap-2">
              <Input 
                value={embedCode}
                readOnly
                className="flex-1 text-sm"
              />
              <Button variant="outline" onClick={handleCopyCode}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
          </div>
          
          <div className="pt-4">
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={handleUnpublish}
            >
              Unpublish
            </Button>
            <div className="text-sm text-gray-500 text-center mt-2">
              Note: This will break your embed links
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
