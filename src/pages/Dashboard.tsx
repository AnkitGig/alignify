
import { useState } from 'react';
import { useProjects } from '@/hooks/useProjects';
import { Loader2 } from 'lucide-react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { CreateProjectDialog } from '@/components/dashboard/CreateProjectDialog';
import { EmptyProjectsState } from '@/components/dashboard/EmptyProjectsState';
import { ProjectGrid } from '@/components/dashboard/ProjectGrid';

export default function Dashboard() {
  const { projects, loading } = useProjects();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Your Projects</h1>
            <p className="text-gray-600 mt-2">Create and manage your wireframe projects</p>
          </div>
          
          <CreateProjectDialog 
            isOpen={isCreateDialogOpen} 
            onOpenChange={setIsCreateDialogOpen} 
          />
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            <span className="ml-2 text-lg">Loading projects...</span>
          </div>
        ) : projects.length === 0 ? (
          <EmptyProjectsState onCreateProject={() => setIsCreateDialogOpen(true)} />
        ) : (
          <ProjectGrid projects={projects} />
        )}
      </main>
    </div>
  );
}
