import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  Box,
  CssBaseline,
  Toolbar,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '../contexts/ThemeContext';
import AppHeader from '../components/AppHeader';
import SidebarNavigation from '../components/SidebarNavigation';

const MainLayout: React.FC = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const toggleSidebarExpanded = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  // Width changes based on expanded state
  const drawerWidth = sidebarExpanded ? 240 : 64;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      {/* App Header */}
      <AppHeader 
        onMenuToggle={isMobile ? handleDrawerToggle : toggleSidebarExpanded}
        sidebarExpanded={sidebarExpanded}
      />
      
      {/* Sidebar Navigation */}
      <SidebarNavigation 
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        expanded={sidebarExpanded}
        toggleExpanded={toggleSidebarExpanded}
      />
      
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          backgroundColor: '#f5f8fa',
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Toolbar /> {/* Spacer for AppBar */}
        <Outlet /> {/* Render child routes here */}
      </Box>
    </Box>
  );
};

export default MainLayout;