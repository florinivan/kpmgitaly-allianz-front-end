import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { initializeRemotes } from './services/remotes.service';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './routes';

// Configurazione dei microfrontend remoti
const remoteConfigs = {
  data_import: {
    url: 'http://localhost:3001/remoteEntry.js',
    scope: 'data_import',
  },
  premi_mfe: {
    url: 'http://localhost:3002/remoteEntry.js',
    scope: 'premi_mfe',
  },
};

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

// Inizializza i microfrontend prima di renderizzare l'app
const mount = async () => {
  try {
    // In a real implementation you would uncomment this
    // await initializeRemotes(remoteConfigs);
    
    const rootElement = document.getElementById('root');
    if (!rootElement) throw new Error("Root element not found");
    
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error('Failed to initialize application:', error);
    // Fallback UI per errori di caricamento iniziali
    const rootElement = document.getElementById('root');
    if (rootElement) {
      ReactDOM.createRoot(rootElement).render(
        <div className="error-container">
          <h1>Failed to load application</h1>
          <p>Please try refreshing the page or contact support if the problem persists.</p>
        </div>
      );
    }
  }
};

mount();