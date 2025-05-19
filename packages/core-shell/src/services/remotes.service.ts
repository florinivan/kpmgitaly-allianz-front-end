import { RemoteModuleConfig, MicrofrontendManifest } from '../types';

// Function to load remote module entry
async function loadRemoteEntry(remoteConfig: RemoteModuleConfig): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    // Check if the remote is already loaded
    if (window[remoteConfig.scope]) {
      console.log(`Remote ${remoteConfig.scope} already loaded`);
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = remoteConfig.url;
    script.onerror = (error) => {
      console.error(`Failed to load remote entry for ${remoteConfig.scope}:`, error);
      reject(new Error(`Failed to load remote entry for ${remoteConfig.scope}`));
    };
    script.onload = () => {
      console.log(`Remote entry for ${remoteConfig.scope} loaded`);
      resolve();
    };
    document.head.appendChild(script);
  });
}

// Function to initialize a single remote module
async function initializeRemote(remoteConfig: RemoteModuleConfig): Promise<RemoteModuleConfig> {
  if (!window[remoteConfig.scope]) {
    await loadRemoteEntry(remoteConfig);
  }

  // Initialize the container
  await window[remoteConfig.scope].init(__webpack_share_scopes__.default);
  
  try {
    // Get the manifest from the remote if available
    const manifestModule = await window[remoteConfig.scope].get('./manifest');
    if (manifestModule) {
      const manifest: MicrofrontendManifest = manifestModule().default || manifestModule();
      remoteConfig.manifest = manifest;
      console.log(`Loaded manifest for ${remoteConfig.scope}:`, manifest);
    }
  } catch (err) {
    console.warn(`No manifest found for ${remoteConfig.scope}, continuing without it`);
  }

  return remoteConfig;
}

// Main function to initialize all remote modules
export async function initializeRemotes(
  remoteConfigs: { [key: string]: RemoteModuleConfig }
): Promise<{ [key: string]: RemoteModuleConfig }> {
  console.log('Initializing remote modules:', remoteConfigs);

  // Ensure webpack shared scope is initialized
  if (!window.__webpack_share_scopes__?.default) {
    console.log('Initializing webpack share scope');
    // @ts-ignore
    __webpack_init_sharing__?.('default');
  }

  try {
    // Initialize all remotes in parallel
    const initPromises = Object.keys(remoteConfigs).map(async (key) => {
      const config = remoteConfigs[key];
      const initializedConfig = await initializeRemote(config);
      return { key, config: initializedConfig };
    });

    const initializedRemotes = await Promise.all(initPromises);
    
    // Convert back to object format
    const result: { [key: string]: RemoteModuleConfig } = {};
    initializedRemotes.forEach(({ key, config }) => {
      result[key] = config;
    });

    console.log('All remote modules initialized:', result);
    return result;
  } catch (error) {
    console.error('Failed to initialize remote modules:', error);
    throw error;
  }
}

// Load a component from a remote module
export async function loadRemoteComponent(
  remoteName: string, 
  moduleName: string
): Promise<React.ComponentType<any>> {
  if (!window[remoteName]) {
    throw new Error(`Remote ${remoteName} is not initialized`);
  }

  // Get the factory function for the module
  const factory = await window[remoteName].get(moduleName);
  const Module = factory();
  
  // Return the default export which should be the component
  return Module.default || Module;
}

// Load a remote module's routes
export async function loadRemoteRoutes(remoteName: string): Promise<any[]> {
  try {
    const routesModule = await window[remoteName].get('./routes');
    const routes = routesModule().default || routesModule();
    return routes;
  } catch (error) {
    console.error(`Failed to load routes from remote ${remoteName}:`, error);
    return [];
  }
}