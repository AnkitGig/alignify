
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useProjects } from "@/hooks/useProjects";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { toast } from "sonner";
import { ArrowRight, Loader2, LogOut } from "lucide-react";
import { CanvasElement } from "@/components/CanvasElement";

const TemplateGallery = () => {
  const { user, signOut } = useAuth();
  const { projects, loading, deleteProject } = useProjects();
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id);
        toast.success("Project deleted successfully!");
      } catch (error) {
        console.error("Error deleting project:", error);
        toast.error("Failed to delete project");
      }
    }
  };
  
  // Function to get elements for a specific project
  const getProjectElements = (project: any) => {
    if (!project.elements || !project.screens) return [];
    
    // Get the first screen's ID
    const firstScreenId = project.screens[0]?.id;
    if (!firstScreenId) return [];
    
    // Return elements for the first screen
    return project.elements.filter((element: any) => element.screenId === firstScreenId);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="font-bold text-xl text-blue-600">Alignify</Link>
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</Link>
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
            <Link to="/editor">
              <Button className="gap-2">
                Create New <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Your Project Templates</h1>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            <span className="ml-2 text-lg">Loading projects...</span>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 14l-3-3m0 0l-3 3m3-3v9M9 17H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v4" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">No projects yet</h3>
            <p className="text-gray-500 mb-4">Create your first wireframe project to get started</p>
            <Link to="/editor">
              <Button>Create Project</Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => {
              const projectElements = getProjectElements(project);
              return (
                <Card 
                  key={project.id}
                  className={`hover:shadow-md transition-shadow ${
                    selectedId === project.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedId(project.id)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle>{project.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-white rounded-md border overflow-hidden relative">
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
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-xs text-gray-500">
                      Updated {format(new Date(project.updated_at), 'MMM d, yyyy')}
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(project.id);
                        }}
                      >
                        Delete
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => navigate(`/editor/${project.id}`)}
                      >
                        Edit
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default TemplateGallery;
