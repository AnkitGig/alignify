
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useWireframe } from "@/hooks/useWireframe";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { SaveTemplateDialog } from "./SaveTemplateDialog";
import { ExportDialog } from "./export/ExportDialog";
import { Share } from "lucide-react";
import logo from "../assets/imgs/logo.png"; // Adjust the path as necessary
interface NavbarProps {
  onSave?: () => void;
}

export function Navbar({ onSave }: NavbarProps) {
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const { activeTemplateId, createNewTemplate } = useWireframe();
  const { user } = useAuth();
  
  const handleSave = () => {
    if (onSave) {
      onSave();
    } else {
      setSaveDialogOpen(true);
    }
  };
  
  return (
    <div className="h-14 border-b flex items-center justify-between px-4"style={{ backgroundColor: "#0B0121" }}>
      <div className="flex items-center gap-4">
        <Link to="/" className="font-bold text-lg text-white"> <div className="flex items-center gap-3">
              <div className="flex items-center gap-3">
           
           <img src={logo} alt="Logo" />
          </div>
          </div>
          </Link>
        <div className="h-6 w-px bg-white/30" />
        <Link to="/templates" className="text-sm text-white/80 hover:text-white">Templates</Link>
        {!user && (
          <Link to="/auth" className="text-sm text-white/80 hover:text-white">Login</Link>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          onClick={() => setExportDialogOpen(true)}
          className="border-white/30 text-black hover:bg-white/20 hover:text-black bg-white"
        >
          <Share className="w-4 h-4 mr-2" />
          Export
        </Button>
        
        <Button 
          variant="outline" 
          onClick={handleSave}
          className="border-white/30 text-black hover:bg-white/20 hover:text-black bg-white"
        >
          Save
        </Button>
        
        <Button 
          onClick={() => createNewTemplate()}
          className="bg-white hover:bg-white/90 text-black border-none"
        >
          New Template
        </Button>
      </div>
      
      <SaveTemplateDialog 
        open={saveDialogOpen} 
        onOpenChange={setSaveDialogOpen} 
      />
      
      <ExportDialog 
        open={exportDialogOpen} 
        onOpenChange={setExportDialogOpen}
        projectId={activeTemplateId || undefined}
      />
    </div>
  );
}
