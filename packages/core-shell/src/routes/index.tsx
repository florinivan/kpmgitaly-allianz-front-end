import React, { useEffect, useState, Suspense, lazy } from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { initializeRemotes, loadRemoteRoutes } from '../services/remotes.service';
import remoteModulesConfig from '../remotes-config';

import LoadingSpinner from '../components/LoadingSpinner';
import RemoteComponent from '../components/RemoteComponent';

// Import local layouts and pages
import MainLayout from '../layouts/MainLayout';
import Dashboard from '../pages/Dashboard';
import NotFound from '../pages/NotFound';
import Login from '../pages/Login';
import WorkflowControlPage from '../pages/WorkflowControlPage';

// Wrapper component for WorkflowControlPage with filters
const WorkflowControlPageWithParams: React.FC = () => {
  const { userFilter, moduleFilter } = useParams<{ userFilter: string, moduleFilter: string }>();
  
  // Decode URL parameters and convert 'all' to empty string
  const initialFilters = {
    utente: userFilter === 'all' ? '' : decodeURIComponent(userFilter || ''),
    modulo: moduleFilter === 'all' ? '' : decodeURIComponent(moduleFilter || '')
  };
  
  return <WorkflowControlPage initialFilters={initialFilters} />;
};

// Protected route wrapper component
const ProtectedRoute: React.FC<{ 
  element: React.ReactNode;
  requiredRoles?: string[];
}> = ({ element, requiredRoles = [] }) => {
  const { isAuthenticated, hasRole, isLoading } = useAuth();

  if (isLoading) {
    return (
      <LoadingSpinner />
    );
  }

  // Check if user is authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has required roles, if any
  if (requiredRoles.length > 0 && !hasRole(requiredRoles)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // User is authenticated and has required roles
  return <>{element}</>;
};

const AppRoutes: React.FC = () => {
  const [remoteRoutes, setRemoteRoutes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { isAuthenticated } = useAuth();

  // Load routes from remote microfrontends
  useEffect(() => {
    const initializeRemoteModules = async () => {
      try {
        // Initialize remote modules
        const initializedRemotes = await initializeRemotes(remoteModulesConfig);
        console.log('Initialized remotes:', initializedRemotes);
        
        // Load routes from remotes if needed
        const loadedRoutes: any[] = [];
        for (const remoteName of Object.keys(initializedRemotes)) {
          try {
            const routes = await loadRemoteRoutes(remoteName);
            loadedRoutes.push(...routes);
          } catch (err) {
            console.warn(`No routes found for remote ${remoteName}`);
          }
        }
        
        setRemoteRoutes(loadedRoutes);
      } catch (error) {
        console.error('Failed to initialize remote modules:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeRemoteModules();
  }, []);

  if (isLoading) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Public route - Login */}
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/" replace /> : <Login />
        } />

        {/* Main application routes - protected */}
        <Route path="/" element={
          <ProtectedRoute element={<MainLayout />} />
        }>
          {/* Dashboard as index route */}
          <Route index element={<Dashboard />} />
          
          {/* Workflow Control Routes - Two ways to access it */}
          {/* Route 1: Direct access without filters */}
          <Route path="workflow-control" element={<WorkflowControlPage />} />
          
          {/* Route 2: Access with user and module filters from params */}
          <Route path="workflow-control/:userFilter/:moduleFilter" element={<WorkflowControlPageWithParams />} />
          
          {/* Remote Data Import Page */}
          <Route 
            path="import-data" 
            element={<RemoteComponent remoteName="data_import" moduleName="./DataImportPage" />} 
          />
          
          {/* Other core routes */}
          <Route path="profile" element={<div>Profile Page</div>} />
          <Route path="settings" element={<div>Settings Page</div>} />
          
          {/* Dynamic routes from microfrontends would be inserted here */}
          {remoteRoutes.map((route, index) => (
            <Route
              key={`remote-route-${index}`}
              path={route.path}
              element={
                <ProtectedRoute
                  element={route.component}
                  requiredRoles={route.roles}
                />
              }
            />
          ))}
          
          {/* Error routes */}
          <Route path="unauthorized" element={<div>You are not authorized to view this page</div>} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;