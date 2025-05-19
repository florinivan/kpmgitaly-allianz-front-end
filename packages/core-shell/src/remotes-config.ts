import { RemoteModuleConfig } from './types';

// Define all available remote modules
export const remoteModulesConfig: { [key: string]: RemoteModuleConfig } = {
  data_import: {
    url: 'http://localhost:3001/remoteEntry.js',
    scope: 'data_import',
    module: './DataImportPage'
  }
};

export default remoteModulesConfig;