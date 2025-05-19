import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { PremiumRowData, PremiumFilterOptions } from '../types/PremiumTypes';

interface PremiumsState {
  // Data
  premiumData: PremiumRowData[];
  setPremiumData: (data: PremiumRowData[]) => void;
  
  // Filters
  filters: PremiumFilterOptions;
  setFilters: (filters: PremiumFilterOptions) => void;
  resetFilters: () => void;
  
  // UI state
  activeTab: string;
  setActiveTab: (tab: string) => void;
  
  // Loading state
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  
  // Error state
  error: Error | null;
  setError: (error: Error | null) => void;
  
  // Selected rows
  selectedRows: string[];
  selectRow: (id: string) => void;
  deselectRow: (id: string) => void;
  clearSelection: () => void;
}

/**
 * Create a zustand store for premium data management
 */
export const usePremiumsStore = create<PremiumsState>()(
  devtools(
    (set) => ({
      // Default state
      premiumData: [],
      filters: {},
      activeTab: 'riepilogo',
      isLoading: false,
      error: null,
      selectedRows: [],
      
      // Setters
      setPremiumData: (data) => set({ premiumData: data }),
      
      setFilters: (filters) => set((state) => ({
        filters: { ...state.filters, ...filters }
      })),
      
      resetFilters: () => set({ filters: {} }),
      
      setActiveTab: (tab) => set({ activeTab: tab }),
      
      setLoading: (loading) => set({ isLoading: loading }),
      
      setError: (error) => set({ error }),
      
      selectRow: (id) => set((state) => ({
        selectedRows: [...state.selectedRows, id]
      })),
      
      deselectRow: (id) => set((state) => ({
        selectedRows: state.selectedRows.filter((rowId) => rowId !== id)
      })),
      
      clearSelection: () => set({ selectedRows: [] }),
    }),
    { name: 'premiums-store' }
  )
);