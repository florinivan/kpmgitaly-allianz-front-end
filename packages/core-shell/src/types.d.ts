export interface MicrofrontendManifest {
    name: string;
    version: string;
    exposedModules: {
      [key: string]: string;
    };
    routes: MicrofrontendRoute[];
    dependencies?: {
      [key: string]: string;
    };
  }
  
  export interface MicrofrontendRoute {
    path: string;
    component: string; // Nome del componente esposto
    exact?: boolean;
    roles?: string[]; // Ruoli richiesti per accedere alla route
    meta?: {
      title?: string;
      icon?: string;
      showInMenu?: boolean;
    };
    children?: MicrofrontendRoute[];
  }
  
  export interface RemoteModuleConfig {
    url: string;
    scope: string;
    manifest?: MicrofrontendManifest;
    module?: any;
  }
  
  // Declaration for global webpack module federation
  declare global {
    interface Window {
      [key: string]: any;
    }
    
    const __webpack_share_scopes__: {
      default: any;
    };
  }