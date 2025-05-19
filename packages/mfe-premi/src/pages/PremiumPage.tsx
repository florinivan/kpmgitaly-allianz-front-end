import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  SelectChangeEvent, 
  IconButton, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Grid
} from '@mui/material';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import FilterListIcon from '@mui/icons-material/FilterList';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TuneIcon from '@mui/icons-material/Tune';

// Import components
import PremiumTabs from '../components/PremiumTabs';
import PremiumExportButton from '../components/PremiumExportButton';
import PremiumDataGrid from '../components/PremiumDataGrid';

// Import store and services
import { usePremiumsStore } from '../store/premiumsStore';
import { fetchPremiumsData, exportPremiumData } from '../services/premiums.service';
import { ExportFormat, PremiumTabItem } from '../types/PremiumTypes';
import { brandColors } from '../theme-config';

// Define the tabs for the premium page - matching the Figma tabs
const premiumTabs: PremiumTabItem[] = [
  { id: 'riepilogo', label: 'RIEPILOGO' },
  { id: 'portafoglio', label: 'PORTAFOGLIO' },
  { id: 'triangoli-gwp', label: 'TRIANGOLI GWP' },
  { id: 'sinottico', label: 'SINOTTICO' },
  { id: 'triangoli-ur', label: 'TRIANGOLI UR' },
  { id: 'proxy', label: 'PROXY' },
  { id: 'apertura', label: 'APERTURA' },
  { id: 'modello-caricamento', label: 'MODELLO CARICAMENTO' },
];

/**
 * Main Premium Page Component (Updated to match Figma)
 */
const PremiumPage: React.FC = () => {
  // Local UI state
  const [activeTab, setActiveTab] = useState('riepilogo');
  const [showCanali, setShowCanali] = useState(false);
  const [selectedMetrica, setSelectedMetrica] = useState<string>('Tutte');
  const [selectedCompany, setSelectedCompany] = useState<string>('Tutti');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('Tutti');
  const [selectedYear, setSelectedYear] = useState<string>('Tutti');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Use our zustand store for premium data
  const { 
    premiumData, 
    setPremiumData, 
    setFilters, 
    setActiveTab: storeSetActiveTab,
    isLoading,
    setLoading: setStoreLoading,
    error,
    setError
  } = usePremiumsStore();

  // Load data on component mount
  useEffect(() => {
    const loadPremiumData = async () => {
      setStoreLoading(true);
      try {
        // Fetch premium data from our service
        const data = await fetchPremiumsData();
        setPremiumData(data);
      } catch (error) {
        console.error('Error loading premium data:', error);
        setError(error instanceof Error ? error : new Error('Unknown error occurred'));
      } finally {
        setStoreLoading(false);
      }
    };

    loadPremiumData();
  }, [setPremiumData, setStoreLoading, setError]);

  // Tab change handler
  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
    storeSetActiveTab(newValue);
  };

  // Filter change handlers
  const handleMetricaChange = (event: SelectChangeEvent) => {
    setSelectedMetrica(event.target.value);
  };

  const handleCompanyChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setSelectedCompany(value);
    setFilters({ compagnia: value === 'Tutti' ? undefined : value });
  };

  const handleDepartmentChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setSelectedDepartment(value);
    setFilters({ comparto: value === 'Tutti' ? undefined : value });
  };

  const handleYearChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setSelectedYear(value);
    setFilters({ anno: value === 'Tutti' ? undefined : value });
  };

  // Toggle advanced filter panel
  const toggleFilterPanel = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  // Toggle canali switch
  const toggleCanali = () => {
    setShowCanali(!showCanali);
  };

  // Export handler
  const handleExportOption = (option: string) => {
    // Filter data based on current selections
    const filteredData = premiumData.filter(row => 
      (selectedCompany === 'Tutti' || row.compagnia === selectedCompany) &&
      (selectedDepartment === 'Tutti' || row.comparto === selectedDepartment) &&
      (selectedYear === 'Tutti' || row.anno.toString() === selectedYear)
    );
    
    // Call export function with filtered data
    exportPremiumData(filteredData, option === 'vista-riepilogo' ? ExportFormat.CSV : ExportFormat.EXCEL);
  };

  // Filter data based on selections
  const filteredData = premiumData.filter(row => 
    (selectedCompany === 'Tutti' || row.compagnia === selectedCompany) &&
    (selectedDepartment === 'Tutti' || row.comparto === selectedDepartment) &&
    (selectedYear === 'Tutti' || row.anno.toString() === selectedYear)
  );

  // Get unique values for dropdowns
  const companies = ['Tutti', ...new Set(premiumData.map(item => item.compagnia))];
  const departments = ['Tutti', ...new Set(premiumData.map(item => item.comparto))];
  const years = ['Tutti', ...new Set(premiumData.map(item => item.anno.toString()))].sort();

  return (
    <Box sx={{ 
      maxWidth: '100%', 
      overflow: 'hidden', 
      p: 2,
      backgroundColor: '#fff',
      height: '100vh'
    }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 1,
        borderBottom: '1px solid #eaeaea',
        pb: 1
      }}>
        <Typography variant="body1" component="h1" sx={{ fontWeight: 500 }}>
          Premi
        </Typography>
        <Typography variant="caption" color="textSecondary">
          Last saved 10:05 05/05/2025
        </Typography>
      </Box>

      {/* Tabs navigation */}
      <PremiumTabs
        tabs={premiumTabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {/* Canali toggle and export button row */}
      <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
        <Grid item xs={6}>
          {/* Mostra canali toggle */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" component="label" sx={{ mr: 1 }}>
              {showCanali ? 'Mostra canali:' : 'Mostra canali:'}
            </Typography>
            <Box
              sx={{
                width: 40,
                height: 20,
                backgroundColor: showCanali ? brandColors.primary : '#e0e0e0',
                borderRadius: 10,
                position: 'relative',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
              }}
              onClick={toggleCanali}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: 2,
                  left: showCanali ? 22 : 2,
                  width: 16,
                  height: 16,
                  backgroundColor: '#fff',
                  borderRadius: '50%',
                  transition: 'left 0.3s',
                }}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <PremiumExportButton onExportOption={handleExportOption} />
        </Grid>
      </Grid>

      {/* Header row with company and filters */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 1,
        mt: 2,
        borderBottom: '1px solid #eaeaea',
        pb: 1
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1" sx={{ mr: 1, fontWeight: 500 }}>Compagnia</Typography>
          <IconButton size="small">
            <KeyboardArrowDownIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Filter button */}
        <IconButton onClick={toggleFilterPanel}>
          <TuneIcon />
        </IconButton>
      </Box>

      {/* Advanced filter panel - visible when isFilterOpen is true */}
      {isFilterOpen && (
        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          p: 2, 
          backgroundColor: '#f9f9f9', 
          borderRadius: 1,
          mb: 2,
          boxShadow: '0px 2px 4px rgba(0,0,0,0.05)'
        }}>
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel id="company-id-label">ID compagnia</InputLabel>
            <Select
              labelId="company-id-label"
              id="company-select"
              value={selectedCompany}
              label="ID compagnia"
              onChange={handleCompanyChange}
              IconComponent={KeyboardArrowDownIcon}
            >
              {companies.map(company => (
                <MenuItem key={company} value={company}>{company}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel id="department-label">Comparto</InputLabel>
            <Select
              labelId="department-label"
              id="department-select"
              value={selectedDepartment}
              label="Comparto"
              onChange={handleDepartmentChange}
              IconComponent={KeyboardArrowDownIcon}
            >
              {departments.map(dept => (
                <MenuItem key={dept} value={dept}>{dept}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel id="year-label">Anno</InputLabel>
            <Select
              labelId="year-label"
              id="year-select"
              value={selectedYear}
              label="Anno"
              onChange={handleYearChange}
              IconComponent={KeyboardArrowDownIcon}
            >
              {years.map(year => (
                <MenuItem key={year} value={year}>{year}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}

      {/* Data Grid */}
      <PremiumDataGrid
        data={filteredData}
        isLoading={isLoading}
        showCanali={showCanali}
      />
      
      {/* Error display */}
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          Si è verificato un errore: {error.message}
        </Typography>
      )}
    </Box>
  );
};

export default PremiumPage;