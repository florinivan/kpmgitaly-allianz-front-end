import React from 'react';
import { 
  Box, 
  TextField, 
  MenuItem, 
  Button, 
  Paper,
  CircularProgress
} from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';
import { brandColors } from '../theme-config';

interface WorkflowFiltersProps {
  filters: {
    utente: string;
    modulo: string;
  };
  userOptions: {value: string, label: string}[];
  moduleOptions: {value: string, label: string}[];
  loading: boolean;
  onFilterChange: (filterName: string, value: string) => void;
  onRefresh: () => void;
}

const WorkflowFilters: React.FC<WorkflowFiltersProps> = ({ 
  filters, 
  userOptions,
  moduleOptions,
  loading,
  onFilterChange,
  onRefresh
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: '8px',
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 2,
        alignItems: { xs: 'stretch', sm: 'center' },
        justifyContent: 'space-between',
        mb: 3,
        border: '1px solid rgba(0, 0, 0, 0.08)'
      }}
    >
      {/* Filters Container */}
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          gap: 2,
          width: { xs: '100%', sm: 'auto' },
          flexGrow: 1
        }}
      >
        {/* User filter */}
        <Box sx={{ minWidth: 200 }}>
          <TextField
            select
            fullWidth
            label="Utente"
            value={filters.utente}
            onChange={(e) => onFilterChange('utente', e.target.value)}
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            disabled={loading}
          >
            {loading ? (
              <MenuItem value="">
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 1 }}>
                  <CircularProgress size={20} />
                </Box>
              </MenuItem>
            ) : (
              userOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))
            )}
          </TextField>
        </Box>

        {/* Module filter */}
        <Box sx={{ minWidth: 200 }}>
          <TextField
            select
            fullWidth
            label="Modulo"
            value={filters.modulo}
            onChange={(e) => onFilterChange('modulo', e.target.value)}
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            disabled={loading}
          >
            {loading ? (
              <MenuItem value="">
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 1 }}>
                  <CircularProgress size={20} />
                </Box>
              </MenuItem>
            ) : (
              moduleOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))
            )}
          </TextField>
        </Box>
      </Box>

      {/* Refresh Button */}
      <Button
        variant="outlined"
        startIcon={<RefreshIcon />}
        onClick={onRefresh}
        disabled={loading}
        sx={{
          minWidth: 120,
          borderColor: brandColors.primary,
          color: brandColors.primary,
          '&:hover': {
            borderColor: brandColors.primaryDark,
            backgroundColor: 'rgba(66, 133, 244, 0.04)',
          }
        }}
      >
        REFRESH
      </Button>
    </Paper>
  );
};

export default WorkflowFilters;