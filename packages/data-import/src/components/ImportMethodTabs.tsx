import React from 'react';
import { 
  Paper,
  Tabs,
  Tab
} from '@mui/material';
import { brandColors } from '../theme-config';

interface ImportMethodTabsProps {
  activeTab: number;
  onTabChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const ImportMethodTabs: React.FC<ImportMethodTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <Paper sx={{ mb: 4, borderRadius: 1 }}>
      <Tabs 
        value={activeTab} 
        onChange={onTabChange}
        variant="fullWidth"
        sx={{
          '& .MuiTab-root': {
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '1rem'
          },
          '& .Mui-selected': {
            color: brandColors.primary,
          },
          '& .MuiTabs-indicator': {
            backgroundColor: brandColors.primary,
            height: 3
          }
        }}
      >
        <Tab label="FILE UPLOAD" />
        <Tab label="TABLE INPUT" />
        <Tab label="MANUAL ENTRY" />
      </Tabs>
    </Paper>
  );
};

export default ImportMethodTabs;