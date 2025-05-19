import React from 'react';
import { Box } from '@mui/material';
import FileUploader from './FileUploader';

interface FileUploadSectionProps {
  onFileUpload: (file: File) => void;
}

const FileUploadSection: React.FC<FileUploadSectionProps> = ({ onFileUpload }) => {
  return (
    <Box>
      <FileUploader onFileUpload={onFileUpload} />
    </Box>
  );
};

export default FileUploadSection;