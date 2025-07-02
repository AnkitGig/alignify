
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Users, Download, Code, X } from "lucide-react";
import { ImageDownloadDialog } from "./ImageDownloadDialog";
import { EmbedProjectDialog } from "./EmbedProjectDialog";

interface ExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId?: string;
}

export function ExportDialog({ open, onOpenChange, projectId }: ExportDialogProps) {
  const navigate = useNavigate();
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [embedDialogOpen, setEmbedDialogOpen] = useState(false);

  const handleFeatureClick = (feature: 'share' | 'image' | 'embed') => {
    onOpenChange(false);
    
    switch (feature) {
      case 'share':
        if (projectId) {
          navigate(`/project/${projectId}/share`);
        } else {
          console.error('No project ID available for sharing');
        }
        break;
      case 'image':
        setImageDialogOpen(true);
        break;
      case 'embed':
        setEmbedDialogOpen(true);
        break;
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle>Export & Share</DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>
          
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start h-12"
              onClick={() => handleFeatureClick('share')}
              disabled={!projectId}
            >
              <Users className="mr-3 h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Invite members</div>
                <div className="text-sm text-gray-500">Share project with team</div>
              </div>
            </Button>
            
            <Button
              variant="outline"
              className="w-full justify-start h-12"
              onClick={() => handleFeatureClick('image')}
            >
              <Download className="mr-3 h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Image Download</div>
                <div className="text-sm text-gray-500">Export as PNG, JPEG or PDF</div>
              </div>
            </Button>
            
            <Button
              variant="outline"
              className="w-full justify-start h-12"
              onClick={() => handleFeatureClick('embed')}
            >
              <Code className="mr-3 h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Embed Project</div>
                <div className="text-sm text-gray-500">Get embed code</div>
              </div>
            </Button>
          </div>
          
          {!projectId && (
            <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded-lg">
              ⚠️ Please save your project first to enable sharing
            </div>
          )}
        </DialogContent>
      </Dialog>

      <ImageDownloadDialog 
        open={imageDialogOpen} 
        onOpenChange={setImageDialogOpen}
      />
      
      <EmbedProjectDialog 
        open={embedDialogOpen} 
        onOpenChange={setEmbedDialogOpen}
        projectId={projectId}
      />
    </>
  );
}
