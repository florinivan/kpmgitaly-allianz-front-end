import React from 'react';
import { Box, Button } from '@mui/material';
import { brandColors } from '../theme-config';

interface NavigationControlsProps {
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  backLabel?: string;
  hideBack?: boolean;
}

interface PaginationButtonProps {
  direction: 'next' | 'prev';
  onClick?: () => void;
}

// Create the PaginationButton component
const PaginationButton: React.FC<PaginationButtonProps> = ({ direction, onClick }) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        minWidth: 'unset',
        width: 32,
        height: 32,
        p: 0,
        borderRadius: '50%',
        backgroundColor: '#424242'
      }}
    >
      {direction === 'prev' ? '\u003C' : '\u003E'}
    </Button>
  );
};

// Create a type for the NavigationControls component with a PaginationButton property
interface NavigationControlsComponent extends React.FC<NavigationControlsProps> {
  PaginationButton: React.FC<PaginationButtonProps>;
}

// Create the main NavigationControls component
const NavigationControls: NavigationControlsComponent = ({
  onBack,
  onNext,
  nextLabel = 'Next',
  backLabel = 'Back',
  hideBack = false
}) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
      {!hideBack && (
        <Button 
          variant="outlined" 
          onClick={onBack}
          sx={{
            color: '#616161',
            borderColor: '#616161',
            '&:hover': {
              borderColor: '#424242'
            }
          }}
        >
          {backLabel}
        </Button>
      )}
      <Box sx={{ flex: 1 }} /> {/* Spacer */}
      <Button 
        variant="contained" 
        onClick={onNext}
        sx={{
          bgcolor: brandColors.primary,
          '&:hover': {
            bgcolor: brandColors.primaryDark
          }
        }}
      >
        {nextLabel}
      </Button>
    </Box>
  );
};

// Attach PaginationButton as a property of NavigationControls
NavigationControls.PaginationButton = PaginationButton;

export default NavigationControls;