import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Tooltip, IconButton } from '@mui/material';
import { FilterAlt as FilterIcon } from '@mui/icons-material';

interface PremiumFiltersProps {
  selectedCompany: string;
  selectedDepartment: string;
  companies: string[];
  departments: string[];
  onCompanyChange: (event: SelectChangeEvent) => void;
  onDepartmentChange: (event: SelectChangeEvent) => void;
  onAdvancedFilterClick?: () => void;
}

const PremiumFilters: React.FC<PremiumFiltersProps> = ({
  selectedCompany,
  selectedDepartment,
  companies,
  departments,
  onCompanyChange,
  onDepartmentChange,
  onAdvancedFilterClick
}) => {
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <FormControl size="small" sx={{ minWidth: 200 }}>
        <InputLabel id="company-select-label">Compagnia</InputLabel>
        <Select
          labelId="company-select-label"
          id="company-select"
          value={selectedCompany}
          label="Compagnia"
          onChange={onCompanyChange}
        >
          {companies.map((company) => (
            <MenuItem key={company} value={company}>{company}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 200 }}>
        <InputLabel id="department-select-label">Comparto</InputLabel>
        <Select
          labelId="department-select-label"
          id="department-select"
          value={selectedDepartment}
          label="Comparto"
          onChange={onDepartmentChange}
        >
          {departments.map((dept) => (
            <MenuItem key={dept} value={dept}>{dept}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Tooltip title="Filtri avanzati">
        <IconButton 
          aria-label="advanced filters"
          onClick={onAdvancedFilterClick}
        >
          <FilterIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default PremiumFilters;