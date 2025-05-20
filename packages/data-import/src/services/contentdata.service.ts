import { ContentDataItem } from  '../types/ContentDataItem';

// Define the filter parameters interface
export interface ContentDataFilters {
  filename?: string;
  weight?: string;
  status?: string;
}

// Base API URL - would come from environment config in a real app
const API_BASE_URL = '/api';

/**
 * Fetch workflow data from the API with optional filters
 */
export const fetchContentData = async (filters: ContentDataFilters = {}): Promise<ContentDataItem[]> => {
  try {
    // In a real implementation, you would create query parameters from the filters
    const queryParams = new URLSearchParams();
    
    if (filters.filename) queryParams.append('filename', filters.filename);
    if (filters.weight) queryParams.append('weight', filters.weight);
    if (filters.status) queryParams.append('status', filters.status);
    
    const queryString = queryParams.toString();
    const url = `${API_BASE_URL}/workflow${queryString ? `?${queryString}` : ''}`;
    
    // In real implementation:
    // const response = await fetch(url);
    // if (!response.ok) throw new Error('Failed to fetch workflow data');
    // return await response.json();
    
    // For this example, we're mocking the data
    return mockFetchContentData(filters);
  } catch (error) {
    console.error('Error fetching ContentData data:', error);
    throw error;
  }
};

/**
 * Mock implementation for demonstration purposes
 */
const mockFetchContentData = (filters: ContentDataFilters = {}): Promise<ContentDataItem[]> => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      const mockData: ContentDataItem[] = [
        {
          id: '1',
          filename: 'document_file_name.pdf',
          weight: '100kb',
          status: 'Complete',
        },
        {
          id: '2',
          filename: 'document_file_name.pdf',
          weight: '100kb',
          status: 'Complete',
        }
      ];
      
      // Apply filters
      let filteredData = [...mockData];
      
      if (filters.filename) {
        filteredData = filteredData.filter(item => 
          item.filename.toLowerCase().includes(filters.filename!.toLowerCase())
        );
      }
      
      if (filters.weight) {
        filteredData = filteredData.filter(item => 
          item.weight.toLowerCase() === filters.weight!.toLowerCase()
        );
      }
      
      if (filters.status) {
        filteredData = filteredData.filter(item => 
          item.status.toLowerCase() === filters.status!.toLowerCase()
        );
      }
      
      resolve(filteredData);
    }, 800); // Simulate network delay
  });
};