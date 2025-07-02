import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AuthGuard } from './components/auth/AuthGuard';
import Index from './pages/Index';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Editor from './pages/Editor';
import TemplateGallery from './pages/TemplateGallery';
import ProjectShare from './pages/ProjectShare';
import NotFound from './pages/NotFound';
import ProfileSetup from "@/pages/ProfileSetup";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile-setup" element={
            <AuthGuard>
              <ProfileSetup />
            </AuthGuard>
          } />
          <Route path="/dashboard" element={
            <AuthGuard>
              <Dashboard />
            </AuthGuard>
          } />
          <Route path="/editor/:id" element={
            <AuthGuard>
              <Editor />
            </AuthGuard>
          } />
          <Route path="/templates" element={<TemplateGallery />} />
          <Route path="/project/:id/share" element={
            <AuthGuard>
              <ProjectShare />
            </AuthGuard>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
