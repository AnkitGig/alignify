
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { MoreVertical, Users, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { CanvasElement } from '@/components/CanvasElement';
import { useAuth } from '@/contexts/AuthContext';
import { useProjects } from '@/hooks/useProjects';
import { Project } from '@/hooks/useProjects';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { user } = useAuth();
  const { deleteProject } = useProjects();
  const navigate = useNavigate();

  const handleDeleteProject = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      await deleteProject(id);
    }
  };

  const getProjectRole = (project: Project) => {
    if (project.owner_id === user?.id) return 'Owner';
    return 'Viewer';
  };

  const getProjectElements = (project: Project) => {
    if (!project.elements || !project.screens) return [];
    
    const firstScreenId = project.screens[0]?.id;
    if (!firstScreenId) return [];
    
    return project.elements.filter((element: any) => element.screenId === firstScreenId);
  };

  const projectElements = getProjectElements(project);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="truncate">{project.name}</CardTitle>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant={getProjectRole(project) === 'Owner' ? 'default' : 'secondary'}>
                {getProjectRole(project)}
              </Badge>
              <div className="flex items-center text-xs text-gray-500">
                <Users className="h-3 w-3 mr-1" />
                1
              </div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigate(`/editor/${project.id}`)}>
                Open
              </DropdownMenuItem>
              {project.owner_id === user?.id && (
                <>
                  <DropdownMenuItem onClick={() => navigate(`/project/${project.id}/share`)}>
                    Share
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => handleDeleteProject(project.id)}
                    className="text-red-600"
                  >
                    Delete
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="aspect-video bg-white rounded-md border overflow-hidden mb-3 relative">
          {projectElements.length === 0 ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-500">Empty project</span>
            </div>
          ) : (
            <div className="relative w-full h-full" style={{ transform: "scale(0.33)", transformOrigin: "top left", width: "300%", height: "300%" }}>
              {projectElements.map((element: any) => (
                <CanvasElement
                  key={element.id}
                  element={element}
                  isSelected={false}
                />
              ))}
            </div>
          )}
        </div>
        
        {project.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {project.description}
          </p>
        )}
        <div className="text-xs text-gray-500 flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          Updated {format(new Date(project.updated_at), 'MMM d, yyyy')}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={() => navigate(`/editor/${project.id}`)}
          className="w-full"
        >
          Open Project
        </Button>
      </CardFooter>
    </Card>
  );
}
