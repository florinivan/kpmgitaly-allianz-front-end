import React, { useEffect, useState } from 'react';
import { loadRemoteComponent } from '../services/remotes.service';
import LoadingSpinner from './LoadingSpinner';

interface RemoteComponentProps {
  remoteName: string;
  moduleName: string;
  [key: string]: any;
}

const RemoteComponent: React.FC<RemoteComponentProps> = ({ 
  remoteName, 
  moduleName,
  ...props 
}) => {
  const [Component, setComponent] = useState<React.ComponentType<any> | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadComponent = async () => {
      try {
        const RemoteComponent = await loadRemoteComponent(remoteName, moduleName);
        if (isMounted) {
          setComponent(() => RemoteComponent);
        }
      } catch (err) {
        console.error(`Failed to load remote component ${remoteName}/${moduleName}:`, err);
        if (isMounted) {
          setError(err instanceof Error ? err : new Error(String(err)));
        }
      }
    };

    loadComponent();

    return () => {
      isMounted = false;
    };
  }, [remoteName, moduleName]);

  if (error) {
    return (
      <div className="remote-component-error">
        <h3>Failed to load component</h3>
        <p>{error.message}</p>
      </div>
    );
  }

  if (!Component) {
    return <LoadingSpinner />;
  }

  return <Component {...props} />;
};

export default RemoteComponent;