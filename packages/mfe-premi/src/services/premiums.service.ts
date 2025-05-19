import axios from 'axios';
import { PremiumRowData } from '../types/PremiumTypes';

// Base API URL - should come from environment variables in a real app
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://api.example.com';

/**
 * Fetch premiums data from the API
 * @returns Promise with premium data array
 */
export const fetchPremiumsData = async (): Promise<PremiumRowData[]> => {
  try {
    // In a real application, this would be an API call
    // For demo purposes, we'll return mock data
    return getMockPremiumData();
    
    // Real API call would look like this:
    // const response = await axios.get(`${API_BASE_URL}/premiums`);
    // return response.data;
  } catch (error) {
    console.error('Error fetching premiums data:', error);
    throw error;
  }
};

/**
 * Update a premium data record
 * @param id Record ID
 * @param data Updated data
 * @returns Promise with updated record
 */
export const updatePremiumData = async (id: string, data: Partial<PremiumRowData>): Promise<PremiumRowData> => {
  try {
    // In a real application, this would be an API call
    console.log(`Updating premium record ${id} with data:`, data);
    
    // Real API call would look like this:
    // const response = await axios.put(`${API_BASE_URL}/premiums/${id}`, data);
    // return response.data;
    
    // Mock response for demo
    return {
      id: id,
      compagnia: data.compagnia || "Unknown",
      comparto: data.comparto || "Unknown",
      anno: data.anno || 2021,
      pezzi: data.pezzi || 0,
      premi: data.premi || 0,
      gwp: data.gwp || 0,
      ru: data.ru || 0,
      re: data.re || 0,
      altriOneri: data.altriOneri || 0,
      gpe: data.gpe || 0,
      premioMedio: data.premioMedio || 0
    };
  } catch (error) {
    console.error(`Error updating premium record ${id}:`, error);
    throw error;
  }
};

/**
 * Generate mock premium data for development
 * @returns Array of mock premium data
 */
const getMockPremiumData = (): PremiumRowData[] => {
  const companies = ['IT150', 'MOD', 'MTPL'];
  const departments = ['MOD', 'MTPL'];
  const years = [2021, 2022, 2023, 2024];
  const data: PremiumRowData[] = [];

  let id = 1;
  
  // Generate standard year-based data
  companies.forEach(company => {
    departments.forEach(department => {
      years.forEach(year => {
        data.push({
          id: id.toString(),
          compagnia: company,
          comparto: department,
          anno: year,
          pezzi: Math.floor(Math.random() * 1000),
          premi: Math.floor(Math.random() * 100000) / 100,
          gwp: Math.floor(Math.random() * 100000) / 100,
          ru: Math.floor(Math.random() * 10000) / 100,
          re: Math.floor(Math.random() * 10000) / 100,
          altriOneri: Math.floor(Math.random() * 5000) / 100,
          gpe: Math.floor(Math.random() * 100000) / 100,
          premioMedio: Math.floor(Math.random() * 1000) / 100
        });
        id++;
      });
    });
  });

  return data;
};

/**
 * Export premium data to different formats
 * @param data Premium data to export
 * @param format Export format (csv, excel, etc)
 * @returns Promise resolving when export is complete
 */
export const exportPremiumData = async (data: PremiumRowData[], format: string): Promise<void> => {
  try {
    // In a real application, this would call an API endpoint or use a library to generate exports
    console.log(`Exporting data in ${format} format`);
    
    // Mock implementation for demo purposes
    switch (format) {
      case 'csv':
        // Convert to CSV and download
        const csvContent = convertToCSV(data);
        downloadFile(csvContent, 'premiums-data.csv', 'text/csv');
        break;
      case 'excel':
        // In a real app, use a library like xlsx to generate Excel files
        console.log('Excel export would happen here');
        break;
      default:
        console.warn(`Unsupported export format: ${format}`);
    }
  } catch (error) {
    console.error('Error exporting premium data:', error);
    throw error;
  }
};

/**
 * Convert data to CSV format
 * @param data Array of objects to convert
 * @returns CSV string
 */
const convertToCSV = (data: any[]): string => {
  if (data.length === 0) return '';
  
  const headers = Object.keys(data[0]);
  const csvRows = [];
  
  // Add headers
  csvRows.push(headers.join(','));
  
  // Add rows
  for (const row of data) {
    const values = headers.map(header => {
      const val = row[header];
      // Handle strings with commas by wrapping in quotes
      return typeof val === 'string' && val.includes(',') ? `"${val}"` : val;
    });
    csvRows.push(values.join(','));
  }
  
  return csvRows.join('\n');
};

/**
 * Helper to trigger a file download in the browser
 * @param content File content
 * @param fileName File name
 * @param contentType Content MIME type
 */
const downloadFile = (content: string, fileName: string, contentType: string): void => {
  const a = document.createElement('a');
  const file = new Blob([content], {type: contentType});
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(a.href);
};