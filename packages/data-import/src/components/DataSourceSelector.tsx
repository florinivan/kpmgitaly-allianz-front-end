import React from 'react';
import { Grid, Button, Typography } from '@mui/material';
import { DataSourceType } from '../types/DataSourceType';

interface DataSourceSelectorProps {
  onSelect: (type: DataSourceType) => void;
}

const DataSourceSelector: React.FC<DataSourceSelectorProps> = ({ onSelect }) => {
  const sources: DataSourceType[] = [
    'EII', 'SAP BW', 'CRM', 'Excel', 
    'CSV', 'Access', 'Oracle', 'SAS'
  ];

  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Select Data Source Type
        </Typography>
      </Grid>
      {sources.map((source) => (
        <Grid item xs={6} sm={4} key={source}>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => onSelect(source)}
            sx={{ p: 2, textTransform: 'none' }}
          >
            {source}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default DataSourceSelector;