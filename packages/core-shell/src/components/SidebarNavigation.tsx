import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Box,
  Toolbar,
  Divider,
  Tooltip,
  useMediaQuery,
  useTheme as useMuiTheme
} from '@mui/material';
import {
  Home as HomeIcon,
  History as HistoryIcon,
  Work as WorkIcon,
  UploadFile as UploadFileIcon,
  Paid as PaidIcon,
  Domain as DomainIcon,
  AccountBalanceWallet as AccountBalanceWalletIcon, 
  Gavel as GavelIcon, 
  Description as DescriptionIcon,
  FactCheck as FactCheckIcon, 
  InsertChart as InsertChartIcon,
  ChevronLeft as ChevronLeftIcon,
} from '@mui/icons-material';
import { brandColors } from '../theme-config';

interface SidebarNavigationProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  expanded: boolean;
  toggleExpanded: () => void;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ 
  mobileOpen, 
  handleDrawerToggle,
  expanded,
  toggleExpanded
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  
  // Width changes based on expanded state
  const drawerWidth = expanded ? 240 : 64;
  
  const menuItems = [
    { 
      path: '/',
      icon: <HomeIcon />,
      text: 'Home'
    },
    { 
      path: '/workflow-control',
      icon: <HistoryIcon />,
      text: 'Workflow control'
    },
    { 
      path: '/control-tower',
      icon: <WorkIcon />,
      text: 'Control tower'
    },
    { 
      path: '/import-data',
      icon: <UploadFileIcon />,
      text: 'Importa dati'
    },
    { 
      path: '/premiums',
      icon: <PaidIcon />,
      text: 'Premi'
    },
    { 
      path: '/commissions',
      icon: <DomainIcon />,
      text: 'Provvigioni'
    },
    { 
      path: '/costs',
      icon: <AccountBalanceWalletIcon />,
      text: 'Costi'
    },
    { 
      path: '/accidents',
      icon: <GavelIcon />,
      text: 'Sinistri'
    },
    { 
        path: '/rappel',
        icon: <DescriptionIcon/>,
        text: 'Rappel'
      },
      { 
        path: '/reinsurance',
        icon: <FactCheckIcon />,
        text: 'Riassicurazioni'
      },
      { 
        path: '/consolidation',
        icon: <InsertChartIcon />,
        text: 'Consolidamento'
      }
  ];

  const drawerContent = (
    <>
      <Toolbar 
        sx={{ 
          backgroundColor: brandColors.primary, 
          color: '#fff',
          minHeight: '64px !important',
          display: 'flex',
          justifyContent: expanded ? 'space-between' : 'center',
          pr: 1
        }}
      >
        {expanded && (
          <Box component="div" sx={{ pl: 2, fontWeight: 600, fontSize: '1.25rem' }}>
            Logo
          </Box>
        )}
        {expanded && (
          <Box 
            component="div" 
            onClick={toggleExpanded}
            sx={{ 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              p: 0.5,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            <ChevronLeftIcon />
          </Box>
        )}
      </Toolbar>
      <Divider />
      <List sx={{ p: 0 }}>
        {menuItems.map((item) => (
          <ListItem 
            key={item.path} 
            disablePadding
            sx={{
              display: 'block',
              mb: 0.5,
            }}
          >
            <Tooltip title={expanded ? '' : item.text} placement="right">
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                  if (mobileOpen) {
                    handleDrawerToggle();
                  }
                }}
                selected={location.pathname === item.path}
                sx={{
                  minHeight: 48,
                  justifyContent: expanded ? 'initial' : 'center',
                  px: 2.5,
                  '&.Mui-selected': {
                    backgroundColor: '#e3f2fd',
                    '&:hover': {
                      backgroundColor: '#d0e8fb',
                    }
                  },
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: expanded ? 3 : 0,
                    justifyContent: 'center',
                    color: location.pathname === item.path ? brandColors.primary : 'inherit'
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {expanded && (
                  <ListItemText 
                    primary={item.text} 
                    sx={{ 
                      opacity: 1,
                      '& .MuiListItemText-primary': {
                        fontWeight: location.pathname === item.path ? 500 : 400
                      }
                    }} 
                  />
                )}
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <Box 
      component="nav" 
      sx={{ 
        width: { sm: drawerWidth }, 
        flexShrink: { sm: 0 },
        transition: muiTheme.transitions.create('width', {
          easing: muiTheme.transitions.easing.sharp,
          duration: muiTheme.transitions.duration.enteringScreen,
        }),
      }}
    >
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: isMobile ? '100%' : drawerWidth,
            transition: muiTheme.transitions.create('width', {
              easing: muiTheme.transitions.easing.sharp,
              duration: muiTheme.transitions.duration.enteringScreen,
            }),
          },
        }}
      >
        {drawerContent}
      </Drawer>
      
      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: drawerWidth,
            borderRight: '1px solid rgba(0, 0, 0, 0.08)',
            overflowX: 'hidden',
            transition: muiTheme.transitions.create('width', {
              easing: muiTheme.transitions.easing.sharp,
              duration: muiTheme.transitions.duration.enteringScreen,
            }),
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default SidebarNavigation;