import { create } from 'zustand';
import { RemoteModuleConfig, MicrofrontendManifest } from '../types';

interface AppState {
  // Remote modules configuration
  remotes: { [key: string]: RemoteModuleConfig };
  setRemotes: (remotes: { [key: string]: RemoteModuleConfig }) => void;
  addRemote: (key: string, config: RemoteModuleConfig) => void;
  
  // Available routes from all microfrontends
  availableRoutes: Array<{
    path: string;
    component: string;
    exact?: boolean;
    roles?: string[];
    meta?: {
      title?: string;
      icon?: string;
      showInMenu?: boolean;
    };
    source: string; // Which microfrontend this route comes from
  }>;
  setAvailableRoutes: (routes: any[]) => void;
  addRoutes: (routes: any[], source: string) => void;
  
  // Notifications
  notifications: Array<{
    id: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    read: boolean;
    timestamp: Date;
  }>;
  addNotification: (notification: Omit<AppState['notifications'][0], 'id' | 'timestamp' | 'read'>) => void;
  markNotificationAsRead: (id: string) => void;
  clearNotifications: () => void;
  
  // Loading state
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  
  // Error state
  error: string | null;
  setError: (error: string | null) => void;
}

// Create the store
const useAppStore = create<AppState>((set) => ({
  // Remote modules configuration
  remotes: {},
  setRemotes: (remotes) => set({ remotes }),
  addRemote: (key, config) => set((state) => ({
    remotes: { ...state.remotes, [key]: config }
  })),
  
  // Available routes
  availableRoutes: [],
  setAvailableRoutes: (routes) => set({ availableRoutes: routes }),
  addRoutes: (routes, source) => set((state) => ({
    availableRoutes: [
      ...state.availableRoutes,
      ...routes.map(route => ({ ...route, source }))
    ]
  })),
  
  // Notifications
  notifications: [],
  addNotification: (notification) => set((state) => ({
    notifications: [
      {
        id: `notification-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
        timestamp: new Date(),
        read: false,
        ...notification
      },
      ...state.notifications
    ]
  })),
  markNotificationAsRead: (id) => set((state) => ({
    notifications: state.notifications.map((notification) => 
      notification.id === id ? { ...notification, read: true } : notification
    )
  })),
  clearNotifications: () => set({ notifications: [] }),
  
  // Loading state
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
  
  // Error state
  error: null,
  setError: (error) => set({ error })
}));

export default useAppStore;