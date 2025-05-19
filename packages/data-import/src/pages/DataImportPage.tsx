import React, { useState } from 'react';
import { 
  Box, 
  Typography,
  Stepper,
  Step,
  StepLabel,
  Alert,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { brandColors } from '../theme-config';
import { DataSourceType } from '../types/DataSourceType';

// Import components
import ImportMethodTabs from '../components/ImportMethodTabs';
import DataTypeSelector from '../components/DataTypeSelector';
import FileUploadSection from '../components/FileUploadSection';
import ImportedFileInfo from '../components/ImportedFileInfo';
import NavigationControls from '../components/NavigationControls';

// Step labels
const steps = ['1', '2', '3'];

const DataImportPage: React.FC = () => {
  // State
  const [activeStep, setActiveStep] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [selectedSource, setSelectedSource] = useState<string>('Actual SAP BW');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);

  // Handle tab changes
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // Handle source selection
  const handleSourceSelect = (source: string) => {
    setSelectedSource(source);
  };

  // Handle navigation between steps
  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  
  // Handle file upload
  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    setUploadSuccess(true);
  };

  // Handle close success alert
  const handleCloseSuccess = () => {
    setUploadSuccess(false);
  };

  // List of data source types
  const dataSourceTypes = [
    'Actual SAP BW',
    'Technical dashboard',
    'PTF data EII',
    'Altri oneri',
    'Riepilogo AT',
    'GWP/GPE No model'
  ];

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Typography variant="h5" component="h1" sx={{ mb: 4, fontWeight: 500 }}>
        Importa dati
      </Typography>

      {/* Import method tabs */}
      <ImportMethodTabs activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Stepper */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ width: '50%' }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel 
                sx={{
                  '& .MuiStepLabel-iconContainer': {
                    '& .MuiStepIcon-root': {
                      color: activeStep >= Number(label) - 1 ? brandColors.primary : '#bdbdbd',
                      width: 36,
                      height: 36
                    }
                  }
                }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      {/* Success notification */}
      {uploadSuccess && (
        <Alert 
          severity="success"
          sx={{ 
            mb: 3,
            display: 'flex',
            alignItems: 'center',
            bgcolor: '#e8f5e9',
            '& .MuiAlert-icon': {
              color: '#4caf50'
            }
          }}
          icon={<CheckCircleOutlineIcon fontSize="inherit" />}
          action={
            <IconButton size="small" onClick={handleCloseSuccess}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        >
          File_name caricato con successo
        </Alert>
      )}

      {/* Step 1: Select data type */}
      {activeStep === 0 && (
        <DataTypeSelector 
          dataSourceTypes={dataSourceTypes}
          selectedSource={selectedSource}
          onSourceSelect={handleSourceSelect}
          onNext={handleNext}
        />
      )}

      {/* Step 2: File Upload */}
      {activeStep === 1 && (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ width: '60%' }}>
              <FileUploadSection onFileUpload={handleFileUpload} />
            </Box>

            <Box sx={{ width: '35%' }}>
              <ImportedFileInfo 
                file={uploadedFile} 
                fallbackName="document_file_name.pdf"
                fileSize="100kb"
                status="Complete"
              />
            </Box>
          </Box>

          <NavigationControls 
            onBack={handleBack}
            onNext={handleNext}
            nextLabel="Next"
            backLabel="Back"
          />
        </Box>
      )}

      {/* Step 3: Confirmation */}
      {activeStep === 2 && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Confirm Import
          </Typography>
          <Typography variant="body1">Source Type: {selectedSource}</Typography>
          <Typography variant="body1">File Name: {uploadedFile?.name || 'document_file_name.pdf'}</Typography>
          
          <NavigationControls 
            onBack={handleBack}
            onNext={() => console.log('Import completed')}
            nextLabel="Complete"
            backLabel="Back"
          />
        </Box>
      )}
    </Box>
  );
};

export default DataImportPage;