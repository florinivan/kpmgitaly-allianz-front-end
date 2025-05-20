import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper
} from '@mui/material';
import { brandColors } from '../theme-config';

interface DetailPanelProps {
  limit?: number;
  title?: string;
  action_label?: string;
  children: React.ReactNode;
}

const DetailPanel: React.FC<DetailPanelProps> = ({ 
  title = 'Activity', 
  action_label = 'VEDI TUTTE',
  children
}) => {
  const navigate = useNavigate();

  const handleSeeAllClick = () => {
    navigate('/workflow-control');
  };

  return (
    <Paper
      sx={{
        p: 2,
        bgcolor: '#f9f9ff',
        borderRadius: '8px',
        height: '100%'
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="subtitle1" fontWeight={500}>
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: brandColors.primary,
            fontWeight: 500,
            cursor: 'pointer'
          }}
          onClick={handleSeeAllClick}
        >
          {action_label}
        </Typography>
      </Box>
      {/* Import Dashboard Content */}
      { children }
    </Paper>
  );
};

export default DetailPanel;