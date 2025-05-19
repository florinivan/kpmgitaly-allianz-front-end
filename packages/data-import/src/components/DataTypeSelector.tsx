import React from 'react';
import { 
  Box,
  Typography,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button
} from '@mui/material';
import { brandColors } from '../theme-config';

interface DataTypeSelectorProps {
  dataSourceTypes: string[];
  selectedSource: string;
  onSourceSelect: (source: string) => void;
  onNext: () => void;
}

const DataTypeSelector: React.FC<DataTypeSelectorProps> = ({ 
  dataSourceTypes, 
  selectedSource, 
  onSourceSelect,
  onNext
}) => {
  const handleSourceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSourceSelect(event.target.value);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Tipologia
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Seleziona la tipologia dei dati che vuoi caricare
      </Typography>

      <RadioGroup
        value={selectedSource}
        onChange={handleSourceChange}
      >
        {dataSourceTypes.map((source) => (
          <Paper 
            key={source}
            sx={{
              mb: 2,
              p: 2,
              borderRadius: 1,
              border: `1px solid ${selectedSource === source ? brandColors.primary : '#e0e0e0'}`,
              '&:hover': {
                borderColor: brandColors.primary
              }
            }}
          >
            <FormControlLabel
              value={source}
              control={
                <Radio 
                  sx={{
                    '&.Mui-checked': {
                      color: brandColors.primary
                    }
                  }}
                />
              }
              label={source}
              sx={{
                width: '100%',
                margin: 0,
                '& .MuiFormControlLabel-label': {
                  fontWeight: 500
                }
              }}
            />
          </Paper>
        ))}
      </RadioGroup>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button 
          variant="contained" 
          onClick={onNext}
          sx={{
            bgcolor: brandColors.primary,
            '&:hover': {
              bgcolor: brandColors.primaryDark
            },
            px: 4
          }}
        >
          NEXT
        </Button>
      </Box>
    </Box>
  );
};

export default DataTypeSelector;