import { WorkflowItem } from  '../types/WorkflowItem';

// Define the filter parameters interface
export interface WorkflowFilters {
  utente?: string;
  modulo?: string;
  startDate?: string;
  endDate?: string;
  stato?: string;
}

// Base API URL - would come from environment config in a real app
const API_BASE_URL = '/api';

/**
 * Fetch workflow data from the API with optional filters
 */
export const fetchWorkflowData = async (filters: WorkflowFilters = {}): Promise<WorkflowItem[]> => {
  try {
    // In a real implementation, you would create query parameters from the filters
    const queryParams = new URLSearchParams();
    
    if (filters.utente) queryParams.append('utente', filters.utente);
    if (filters.modulo) queryParams.append('modulo', filters.modulo);
    if (filters.startDate) queryParams.append('startDate', filters.startDate);
    if (filters.endDate) queryParams.append('endDate', filters.endDate);
    if (filters.stato) queryParams.append('stato', filters.stato);
    
    const queryString = queryParams.toString();
    const url = `${API_BASE_URL}/workflow${queryString ? `?${queryString}` : ''}`;
    
    // In real implementation:
    // const response = await fetch(url);
    // if (!response.ok) throw new Error('Failed to fetch workflow data');
    // return await response.json();
    
    // For this example, we're mocking the data
    return mockFetchWorkflowData(filters);
  } catch (error) {
    console.error('Error fetching workflow data:', error);
    throw error;
  }
};

/**
 * Mock implementation for demonstration purposes
 */
const mockFetchWorkflowData = (filters: WorkflowFilters = {}): Promise<WorkflowItem[]> => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      const mockData: WorkflowItem[] = [
        {
          id: '1',
          utente: 'John Doe',
          modulo: 'Premi',
          azione: 'Caricamento dati in Portafoglio',
          data: '05/05/2025',
          dettaglio: '-',
          stato: 'Completato'
        },
        {
          id: '2',
          utente: 'John Doe',
          modulo: 'Premi',
          azione: 'ADJ Triangoli GWP',
          data: '05/05/2025',
          dettaglio: '-',
          stato: 'Completato'
        },
        {
          id: '3',
          utente: 'John Doe',
          modulo: 'Premi',
          azione: 'Modifica sinottico',
          data: '05/05/2025',
          dettaglio: '-',
          stato: 'Completato'
        },
        {
          id: '4',
          utente: 'John Doe',
          modulo: 'Premi',
          azione: 'ADJ Triangoli UR',
          data: '05/05/2025',
          dettaglio: '-',
          stato: 'Completato'
        },
        {
          id: '5',
          utente: 'Jane Smith',
          modulo: 'Sinistri',
          azione: 'Aggiornamento dati',
          data: '04/05/2025',
          dettaglio: '-',
          stato: 'In corso'
        },
        {
          id: '6',
          utente: 'Mark Johnson',
          modulo: 'Provvigioni',
          azione: 'Calcolo provvigioni',
          data: '03/05/2025',
          dettaglio: '-',
          stato: 'Completato'
        }
      ];
      
      // Apply filters
      let filteredData = [...mockData];
      
      if (filters.utente) {
        filteredData = filteredData.filter(item => 
          item.utente.toLowerCase().includes(filters.utente!.toLowerCase())
        );
      }
      
      if (filters.modulo) {
        filteredData = filteredData.filter(item => 
          item.modulo.toLowerCase() === filters.modulo!.toLowerCase()
        );
      }
      
      if (filters.stato) {
        filteredData = filteredData.filter(item => 
          item.stato.toLowerCase() === filters.stato!.toLowerCase()
        );
      }
      
      resolve(filteredData);
    }, 800); // Simulate network delay
  });
};

/**
 * Get available users for the filter dropdown
 */
export const fetchUsers = async (): Promise<{value: string, label: string}[]> => {
  // In a real implementation, this would be an API call
  return [
    { value: '', label: 'Tutti' },
    { value: 'John Doe', label: 'John Doe' },
    { value: 'Jane Smith', label: 'Jane Smith' },
    { value: 'Mark Johnson', label: 'Mark Johnson' }
  ];
};

/**
 * Get available modules for the filter dropdown
 */
export const fetchModules = async (): Promise<{value: string, label: string}[]> => {
  // In a real implementation, this would be an API call
  return [
    { value: '', label: 'Tutti' },
    { value: 'Premi', label: 'Premi' },
    { value: 'Provvigioni', label: 'Provvigioni' },
    { value: 'Costi', label: 'Costi' },
    { value: 'Sinistri', label: 'Sinistri' },
    { value: 'Rappel', label: 'Rappel' },
    { value: 'Riassicurazioni', label: 'Riassicurazioni' },
    { value: 'Consolidamento', label: 'Consolidamento' }
  ];
};