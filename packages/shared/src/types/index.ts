// Remote module types
export interface MicrofrontendManifest {
    name: string;
    version: string;
    routes?: Array<{
      path: string;
      component: React.ComponentType<any>;
      roles?: string[];
    }>;
    [key: string]: any;
  }
  
  export interface RemoteModuleConfig {
    url: string;
    scope: string;
    module: string;
    manifest?: MicrofrontendManifest;
  }
  
  // Extend Window interface for remote modules
  declare global {
    interface Window {
      [key: string]: any;
      __webpack_share_scopes__?: {
        default: any;
      };
      __webpack_init_sharing__?: (scope: string) => void;
    }
  }
  
  // Re-export WorkflowItem
  export * from './WorkflowItem';