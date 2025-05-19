import React from 'react';
import { Typography, Box, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

interface PremiumHeaderProps {
  month: string;
  key: string;
  onMonthChange: (event: SelectChangeEvent) => void;
  onKeyChange: (event: SelectChangeEvent) => void;
}

const PremiumHeader: React.FC<PremiumHeaderProps> = ({ 
  month, 
  key, 
  onMonthChange, 
  onKeyChange 
}) => {
  return (
    <>
      <Typography variant="h5" component="h1" sx={{ mb: 3, fontWeight: 500 }}>
        Premi
      </Typography>

      {/* Top Filter Bar */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel id="month-select-label">Mese competenza</InputLabel>
            <Select
              labelId="month-select-label"
              id="month-select"
              value={month}
              label="Mese competenza"
              onChange={onMonthChange}
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                <MenuItem key={m} value={m.toString()}>{m}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel id="key-select-label">Chiave</InputLabel>
            <Select
              labelId="key-select-label"
              id="key-select"
              value={key}
              label="Chiave"
              onChange={onKeyChange}
            >
              <MenuItem value="IT0159-168-MTPL">IT0159-168-MTPL</MenuItem>
              <MenuItem value="IT0160-169-MOD">IT0160-169-MOD</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
    </>
  );
};

export default PremiumHeader;