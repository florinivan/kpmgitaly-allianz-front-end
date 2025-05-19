import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { brandColors } from '../theme-config';

// Define tab interface
export interface PremiumTabItem {
  id: string;
  label: string;
}

interface PremiumTabsProps {
  tabs: PremiumTabItem[];
  activeTab: string;
  onTabChange: (event: React.SyntheticEvent, newValue: string) => void;
}

const PremiumTabs: React.FC<PremiumTabsProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <Box sx={{ width: '100%', borderBottom: 1, borderColor: 'divider' }}>
      <Tabs 
        value={activeTab} 
        onChange={onTabChange} 
        variant="scrollable"
        scrollButtons="auto"
        aria-label="premium data tabs"
        TabIndicatorProps={{
          style: {
            backgroundColor: '#FF00FF', // Pink indicator as shown in Figma
            height: 3
          }
        }}
        sx={{
          minHeight: '40px',
          '& .MuiTab-root': {
            textTransform: 'uppercase',
            fontWeight: 500,
            fontSize: '0.75rem', // Smaller font size to match Figma
            minHeight: '40px',
            padding: '6px 16px',
            color: '#666',
          },
          '& .Mui-selected': {
            color: '#FF00FF', // Pink text for selected tab
            fontWeight: 600,
          }
        }}
      >
        {tabs.map((tab) => (
          <Tab 
            key={tab.id} 
            label={tab.label} 
            value={tab.id} 
            disableRipple
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default PremiumTabs;