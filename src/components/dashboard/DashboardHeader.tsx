import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { ProfileManager } from '@/components/profile/ProfileManager';
import logo from '../../assets/imgs/logo.png'; // Adjust the path as necessary

export function DashboardHeader() {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="bg-white border-b border-gray-200" style={{ backgroundColor: "#0B0121" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
              <div className="flex items-center gap-3">
           
           <img src={logo} alt="Logo" />
          </div>
          </div>
          
          <div className="flex items-center gap-4">
            <ProfileManager />
            <Button
              variant="outline"
              onClick={handleSignOut}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
