// Application configuration file

// Environment detection
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';

// API configuration
export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

// Development features
export const devFeatures = {
  // When true, bypasses the login screen in development mode with mock credentials
  skipLogin: isDevelopment && process.env.REACT_APP_SKIP_LOGIN === 'true',
  
  // Mock user for development when skipLogin is enabled
  mockUser: {
    id: 'dev-user-123',
    username: 'developer',
    email: 'dev@example.com',
    firstName: 'Dev',
    lastName: 'User',
    roles: ['admin', 'user']
  },
  
  // Mock auth token for development
  mockToken: 'mock-jwt-token-for-development'
};

// Feature flags
export const features = {
  enableNotifications: true,
  enableDarkMode: true,
  enableMicrofrontends: true
};

export default {
  isDevelopment,
  isProduction,
  API_URL,
  devFeatures,
  features
};