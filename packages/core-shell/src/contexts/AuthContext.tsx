import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { API_URL, devFeatures } from '../config';

// Define user interface
interface User {
  id: string;
  username: string;
  email: string;
  roles: string[];
  firstName?: string;
  lastName?: string;
}

// Define auth context type
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
  checkAuth: () => Promise<boolean>;
  hasRole: (role: string | string[]) => boolean;
  skipLoginInDev: boolean;
}

// Create auth context with default values
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  token: null,
  login: async () => {},
  logout: () => {},
  isLoading: false,
  error: null,
  checkAuth: async () => false,
  hasRole: () => false,
  skipLoginInDev: false,
});

// Hook to use auth context
export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

// Auth provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const skipLoginInDev = devFeatures.skipLogin;

  // Initialize auth state from localStorage on component mount
  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      try {
        // Check if we should skip login in development mode
        if (skipLoginInDev) {
          console.log('Development mode: Skipping login with mock user');
          setIsAuthenticated(true);
          setUser(devFeatures.mockUser);
          setToken(devFeatures.mockToken);
          // Still store the mock token in localStorage to maintain consistent behavior
          localStorage.setItem('auth_token', devFeatures.mockToken);
        } else {
          await checkAuth();
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  // Check if user is authenticated by validating the token
  const checkAuth = async (): Promise<boolean> => {
    const storedToken = localStorage.getItem('auth_token');
    
    if (!storedToken) {
      setIsAuthenticated(false);
      setUser(null);
      setToken(null);
      return false;
    }

    try {
      // In a real implementation, you would validate the token with your backend
      // For now, let's assume we have a validate token endpoint
      const response = await axios.get(`${API_URL}/auth/validate`, {
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      });

      if (response.status === 200 && response.data.user) {
        setIsAuthenticated(true);
        setUser(response.data.user);
        setToken(storedToken);
        return true;
      } else {
        throw new Error('Invalid token');
      }
    } catch (error) {
      console.error('Token validation failed:', error);
      // Clean up invalid auth data
      localStorage.removeItem('auth_token');
      setIsAuthenticated(false);
      setUser(null);
      setToken(null);
      return false;
    }
  };

  // Login function
  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Skip actual API call if in development mode with skipLogin enabled
      if (skipLoginInDev) {
        // Simulate successful login with mock data
        setIsAuthenticated(true);
        setUser(devFeatures.mockUser);
        setToken(devFeatures.mockToken);
        localStorage.setItem('auth_token', devFeatures.mockToken);
        console.log('Development mode: Auto-login successful with mock user');
        return;
      }

      // Normal login flow for production or when skipLogin is disabled
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      if (response.status === 200 && response.data.token) {
        const { token, user } = response.data;
        
        // Store token in localStorage
        localStorage.setItem('auth_token', token);
        
        // Update state
        setIsAuthenticated(true);
        setUser(user);
        setToken(token);
      } else {
        throw new Error('Login failed');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      setError(error.response?.data?.message || 'Login failed. Please check your credentials.');
      setIsAuthenticated(false);
      setUser(null);
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = (): void => {
    // Remove token from localStorage
    localStorage.removeItem('auth_token');
    
    // Update state
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
  };

  // Check if user has required role(s)
  const hasRole = (role: string | string[]): boolean => {
    if (!user || !user.roles || user.roles.length === 0) {
      return false;
    }

    if (Array.isArray(role)) {
      // Check if user has any of the roles in the array
      return role.some(r => user.roles.includes(r));
    }

    // Check for a single role
    return user.roles.includes(role);
  };

  // Expose context values
  const contextValue: AuthContextType = {
    isAuthenticated,
    user,
    token,
    login,
    logout,
    isLoading,
    error,
    checkAuth,
    hasRole,
    skipLoginInDev,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// For TypeScript default export
export default AuthProvider;