import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button 
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { brandColors } from '../theme-config';

interface ImportedFileInfoProps {
  file: File | null;
  fallbackName: string;
  fileSize: string;
  status: string;
}

const ImportedFileInfo: React.FC<ImportedFileInfoProps> = ({ 
  file, 
  fallbackName,
  fileSize,
  status
}) => {
  return (
    <Paper sx={{ p: 3, borderRadius: 1 }}>
      <Typography variant="h6" gutterBottom>
        Dati importati
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box component="span" sx={{ 
            display: 'inline-block', 
            width: 24, 
            height: 24, 
            bgcolor: '#e0e0e0', 
            borderRadius: '4px',
            mr: 2 
          }}></Box>
          <Box>
            <Typography variant="body1">
              {file ? file.name : fallbackName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {fileSize} • {status}
            </Typography>
          </Box>
        </Box>
        <CheckCircleOutlineIcon sx={{ color: '#4caf50' }} />
      </Box>
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button 
          variant="outlined" 
          sx={{ 
            color: brandColors.primary,
            borderColor: brandColors.primary
          }}
        >
          SCARICA
        </Button>
      </Box>
    </Paper>
  );
};

export default ImportedFileInfo;