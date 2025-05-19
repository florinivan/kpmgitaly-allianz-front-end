import React from 'react';
import { Button, Menu, MenuItem, Box, styled, Divider } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

interface PremiumExportButtonProps {
  onExportOption: (option: string) => void;
}

// Custom styled components for export menu items
const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  fontSize: '0.75rem',
  padding: '8px 16px',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  }
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: '4px',
    marginTop: '4px',
    minWidth: '200px',
    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
  }
}));

const PremiumExportButton: React.FC<PremiumExportButtonProps> = ({ onExportOption }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  
  const handleExportClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExportOptionClick = (option: string) => {
    onExportOption(option);
    handleClose();
  };

  return (
    <Box>
      <Button
        variant="outlined"
        startIcon={<FileDownloadOutlinedIcon fontSize="small" />}
        endIcon={<KeyboardArrowDownIcon fontSize="small" />}
        onClick={handleExportClick}
        aria-label="export options"
        aria-haspopup="true"
        sx={{
          color: '#4285F4',
          borderColor: '#4285F4',
          textTransform: 'uppercase',
          fontSize: '0.75rem',
          fontWeight: 500,
          padding: '4px 12px',
          height: '32px',
          '&:hover': { 
            backgroundColor: 'rgba(66, 133, 244, 0.04)',
            borderColor: '#4285F4'
          }
        }}
      >
        ESPORTA
      </Button>
      
      <StyledMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {/* Premium Menu Options */}
        <StyledMenuItem onClick={() => handleExportOptionClick('pezzi')}>
          Pezzi
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleExportOptionClick('premio-medio-di-port')}>
          Premio medio di port...
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleExportOptionClick('premi')}>
          Premi
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleExportOptionClick('gwp')}>
          GWP
        </StyledMenuItem>
        <Divider />
        <StyledMenuItem onClick={() => handleExportOptionClick('reset')}>
          RESET
        </StyledMenuItem>
        <Divider />
        <StyledMenuItem onClick={() => handleExportOptionClick('vista-riepilogo')}>
          Esporta vista riepilogo
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleExportOptionClick('riepilogo-at')}>
          Esporta Riepilogo AT
        </StyledMenuItem>
      </StyledMenu>
    </Box>
  );
};

export default PremiumExportButton;