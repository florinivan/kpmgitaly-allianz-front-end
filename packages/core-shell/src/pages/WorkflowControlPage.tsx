import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, CircularProgress } from '@mui/material';
import { History as HistoryIcon } from '@mui/icons-material';
import WorkflowFilters from '../components/WorkflowFilters';
import WorkflowTable from '../components/WorkflowTable';
import { WorkflowItem } from '../types/WorkflowItem';
import { brandColors } from '../theme-config';
import { 
  fetchWorkflowData as fetchWorkflowService, 
  fetchUsers, 
  fetchModules, 
  WorkflowFilters as WorkflowFilterParams 
} from '../services/workflow.service';

interface WorkflowControlPageProps {
  initialFilters?: {
    utente?: string;
    modulo?: string;
  };
}

const WorkflowControlPage: React.FC<WorkflowControlPageProps> = ({ initialFilters }) => {
  // State for filters
  const [filters, setFilters] = useState({
    utente: initialFilters?.utente || '',
    modulo: initialFilters?.modulo || ''
  });
  
  // State for workflow data
  const [workflowData, setWorkflowData] = useState<WorkflowItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for dropdown options
  const [userOptions, setUserOptions] = useState<{value: string, label: string}[]>([]);
  const [moduleOptions, setModuleOptions] = useState<{value: string, label: string}[]>([]);
  const [loadingOptions, setLoadingOptions] = useState<boolean>(true);

  // Function to handle filter changes
  const handleFilterChange = (filterName: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  // Function to refresh data
  const handleRefresh = () => {
    fetchWorkflowData();
  };

  // Function to fetch workflow data from service
  const fetchWorkflowData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Convert UI filters to API filter format
      const apiFilters: WorkflowFilterParams = {
        utente: filters.utente,
        modulo: filters.modulo
      };
      
      // Fetch data from the service
      const data = await fetchWorkflowService(apiFilters);
      setWorkflowData(data);
    } catch (err) {
      setError('Failed to fetch workflow data. Please try again.');
      console.error('Error fetching workflow data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch filter options on component mount
  useEffect(() => {
    const fetchFilterOptions = async () => {
      setLoadingOptions(true);
      try {
        const [users, modules] = await Promise.all([
          fetchUsers(),
          fetchModules()
        ]);
        
        setUserOptions(users);
        setModuleOptions(modules);
      } catch (err) {
        console.error('Error fetching filter options:', err);
      } finally {
        setLoadingOptions(false);
      }
    };
    
    fetchFilterOptions();
  }, []);

  // Fetch data on component mount and when filters change
  useEffect(() => {
    fetchWorkflowData();
  }, [filters]);

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      {/* Header section with title */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <HistoryIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            Workflow control
          </Typography>
        </Box>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 500 }}>
          Workflow control
        </Typography>
      </Box>

      {/* Filters component */}
      <WorkflowFilters 
        filters={filters}
        userOptions={userOptions}
        moduleOptions={moduleOptions}
        loading={loadingOptions}
        onFilterChange={handleFilterChange}
        onRefresh={handleRefresh}
      />

      {/* Table component with loading, error and data states */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress size={40} sx={{ color: brandColors.primary }} />
        </Box>
      ) : error ? (
        <Box sx={{ mt: 4, p: 2, bgcolor: '#fff4f4', borderRadius: '8px', textAlign: 'center' }}>
          <Typography color="error">{error}</Typography>
        </Box>
      ) : workflowData.length === 0 ? (
        <Box sx={{ 
          mt: 4, 
          p: 4, 
          bgcolor: '#fff', 
          borderRadius: '8px', 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '200px',
          border: '1px solid rgba(0, 0, 0, 0.08)'
        }}>
          <HistoryIcon 
            sx={{ 
              fontSize: '48px', 
              color: 'text.secondary',
              mb: 2
            }} 
          />
          <Typography 
            variant="subtitle1" 
            fontWeight={500}
            align="center"
          >
            Nessuna attività
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            align="center"
          >
            Nessun utente ha effettuato azioni
          </Typography>
        </Box>
      ) : (
        <WorkflowTable data={workflowData} />
      )}
    </Container>
  );
};

export default WorkflowControlPage;