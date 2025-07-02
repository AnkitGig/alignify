
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2 } from 'lucide-react';

interface CollaboratorsListProps {
  collaborators: any[];
  userEmail?: string;
  onRemoveCollaborator: (collaboratorId: string) => Promise<boolean>;
  onUpdateRole: (collaboratorId: string, newRole: string) => Promise<boolean>;
  onRefetch: () => void;
}

export function CollaboratorsList({ 
  collaborators, 
  userEmail, 
  onRemoveCollaborator, 
  onUpdateRole,
  onRefetch 
}: CollaboratorsListProps) {
  const handleRemoveCollaborator = async (collaboratorId: string) => {
    const success = await onRemoveCollaborator(collaboratorId);
    if (success) {
      onRefetch();
    }
  };

  const handleUpdateRole = async (collaboratorId: string, newRole: string) => {
    const success = await onUpdateRole(collaboratorId, newRole);
    if (success) {
      onRefetch();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Collaborators ({collaborators.length + 1})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Project Owner */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                {userEmail?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-medium">{userEmail}</p>
                <p className="text-sm text-gray-600">You</p>
              </div>
            </div>
            <Badge>Owner</Badge>
          </div>

          {/* Collaborators */}
          {collaborators.map((collaborator) => (
            <div key={collaborator.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  {collaborator.profiles?.email?.charAt(0).toUpperCase() || '?'}
                </div>
                <div>
                  <p className="font-medium">
                    {collaborator.profiles?.first_name && collaborator.profiles?.last_name
                      ? `${collaborator.profiles.first_name} ${collaborator.profiles.last_name}`
                      : collaborator.profiles?.email || 'Unknown User'
                    }
                  </p>
                  <p className="text-sm text-gray-600">{collaborator.profiles?.email || 'No email'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Select
                  value={collaborator.role}
                  onValueChange={(value) => handleUpdateRole(collaborator.id, value)}
                >
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="viewer">Viewer</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveCollaborator(collaborator.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}

          {collaborators.length === 0 && (
            <p className="text-gray-500 text-center py-8">
              No collaborators yet. Invite team members to start collaborating!
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
