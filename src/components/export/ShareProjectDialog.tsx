
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, X, Plus } from "lucide-react";
import { toast } from "sonner";

interface ShareProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId?: string;
}

export function ShareProjectDialog({ open, onOpenChange, projectId }: ShareProjectDialogProps) {
  const [restrictAccess, setRestrictAccess] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Can Comment");
  
  const projectLink = `https://app.alignify.ai/shared/${projectId || 'ea1782d-ed9e-4152-aa04'}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(projectLink);
    toast.success("Project link copied to clipboard");
  };

  const handleAddMember = () => {
    if (!inviteEmail.trim()) {
      toast.error("Please enter an email address");
      return;
    }
    
    // Here you would typically call your API to invite the member
    toast.success(`Invitation sent to ${inviteEmail}`);
    setInviteEmail("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>Share Project</DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="text-sm text-gray-600">
            Invite members via link or email and manage access to this project. Only users 
            with Pro license can edit the project. <span className="text-blue-600 cursor-pointer">Learn More</span>
          </div>
          
          <div className="space-y-3">
            <Label className="text-base font-medium">Project Link</Label>
            <div className="flex gap-2">
              <Input 
                value={projectLink}
                readOnly
                className="flex-1"
              />
              <Button variant="outline" onClick={handleCopyLink}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Switch 
                checked={restrictAccess} 
                onCheckedChange={setRestrictAccess}
              />
              <Label className="text-sm">Restrict access to authorized users only</Label>
            </div>
          </div>
          
          <div className="space-y-3">
            <Label className="text-base font-medium">Manage Access</Label>
            <div className="flex gap-2">
              <Input 
                placeholder="Email separated by commas"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="flex-1"
              />
              <Select value={inviteRole} onValueChange={setInviteRole}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Can View">Can View</SelectItem>
                  <SelectItem value="Can Comment">Can Comment</SelectItem>
                  <SelectItem value="Can Edit">Can Edit</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleAddMember}>
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                T
              </div>
              <div className="flex-1">
                <div className="font-medium">techno rizen</div>
                <div className="text-sm text-gray-600">puneet.technorizen@gmail.com</div>
              </div>
              <div className="text-sm text-gray-500">Project Owner</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
