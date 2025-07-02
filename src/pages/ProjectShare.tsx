
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useProjectShare } from '@/hooks/useProjectShare';
import { useCollaboratorActions } from '@/hooks/useCollaboratorActions';
import { InviteCollaboratorForm } from '@/components/project-share/InviteCollaboratorForm';
import { CollaboratorsList } from '@/components/project-share/CollaboratorsList';

export default function ProjectShare() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const { project, collaborators, loading, refetch } = useProjectShare(id);
  const { inviteUser, removeCollaborator, updateCollaboratorRole, isInviting } = useCollaboratorActions();

  const handleInviteUser = async (email: string, role: 'viewer' | 'editor' | 'admin') => {
    if (!id) return false;
    const success = await inviteUser(id, email, role);
    if (success) {
      refetch();
    }
    return success;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Project not found</h2>
          <p className="text-gray-600 mb-4">The project you're looking for doesn't exist or you don't have permission to access it.</p>
          <Button onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-semibold">Share Project</h1>
            <p className="text-sm text-gray-600">{project?.name}</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid gap-6">
          <InviteCollaboratorForm 
            onInvite={handleInviteUser}
            isInviting={isInviting}
          />
          
          <CollaboratorsList
            collaborators={collaborators}
            userEmail={user?.email}
            onRemoveCollaborator={removeCollaborator}
            onUpdateRole={updateCollaboratorRole}
            onRefetch={refetch}
          />
        </div>
      </main>
    </div>
  );
}
