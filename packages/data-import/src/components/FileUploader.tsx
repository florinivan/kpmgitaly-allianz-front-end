import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { brandColors } from '../theme-config';

interface FileUploaderProps {
  onFileUpload: (file: File) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileUpload }) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) onFileUpload(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileUpload(file);
  };

  return (
    <Box
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      sx={{
        border: `2px dashed ${isDragging ? brandColors.primary : '#ccc'}`,
        borderRadius: 2,
        p: 4,
        textAlign: 'center',
        mt: 2,
        backgroundColor: isDragging ? 'rgba(66, 133, 244, 0.04)' : 'transparent',
        transition: 'all 0.2s ease-in-out'
      }}
    >
      <CloudUploadIcon 
        fontSize="large" 
        sx={{ 
          color: isDragging ? brandColors.primary : 'action.active',
          fontSize: '48px'
        }} 
      />
      <Typography variant="body1" sx={{ mt: 1 }}>
        Drag & drop file here or
      </Typography>
      <Button
        variant="contained"
        component="label"
        sx={{ 
          mt: 2,
          bgcolor: brandColors.primary,
          '&:hover': {
            bgcolor: brandColors.primaryDark
          }
        }}
      >
        Browse Files
        <input
          type="file"
          hidden
          onChange={handleFileSelect}
        />
      </Button>
    </Box>
  );
};

export default FileUploader;