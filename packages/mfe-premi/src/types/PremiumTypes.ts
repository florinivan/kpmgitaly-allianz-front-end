/**
 * Premium data row interface
 */
export interface PremiumRowData {
    id: string;
    compagnia: string;
    comparto: string;
    anno: number | string;  // Can be a year or a numeric string like "1" or "2"
    pezzi: number;
    premi: number;
    gwp: number;  // Gross Written Premium
    ru: number;   // Underwriting Result
    re: number;   // Reinsurance
    altriOneri: number;  // Other costs
    gpe: number;  // Gross Premium Earned
    premioMedio: number;  // Average premium
  }
  
  /**
   * Premium data filter options
   */
  export interface PremiumFilterOptions {
    compagnia?: string;
    comparto?: string;
    anno?: number | string;
    mese?: number;
    chiave?: string;
  }
  
  /**
   * Premium tab definition
   */
  export interface PremiumTabItem {
    id: string;
    label: string;
    description?: string;
  }
  
  /**
   * Export format options
   */
  export enum ExportFormat {
    CSV = 'csv',
    EXCEL = 'excel',
    PDF = 'pdf'
  }
  
  /**
   * Module Federation configuration for premium micro-frontend
   */
  export interface PremiumMfeConfig {
    scope: string;
    url: string;
    routes: PremiumRoute[];
  }
  
  /**
   * Premium route definition
   */
  export interface PremiumRoute {
    path: string;
    component: string;
    title: string;
  }