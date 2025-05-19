import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  Divider,
  Chip
} from '@mui/material';
import { 
  Home as HomeIcon,
  Lock as LockIcon,
  UploadFile as UploadFileIcon,
  Domain as DomainIcon,
  Description as DescriptionIcon,
  Paid as PaidIcon,
  AccountBalanceWallet as AccountBalanceWalletIcon,
  Gavel as GavelIcon,
  FactCheck as FactCheckIcon,
  InsertChart as InsertChartIcon
} from '@mui/icons-material';
import { WorkflowItem } from '../types/WorkflowItem';
import { fetchWorkflowData } from '../services/workflow.service';
import { useAuth } from '../contexts/AuthContext';
import DashboardActivity from '@kpmg/shared/src/components/DashboardActivity'

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [recentWorkflows, setRecentWorkflows] = useState<WorkflowItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadRecentWorkflows = async () => {
      try {
        // Fetch most recent workflow items for the dashboard
        const data = await fetchWorkflowData();
        // Show only the 5 most recent items
        setRecentWorkflows(data.slice(0, 5));
      } catch (error) {
        console.error('Error loading recent workflows:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRecentWorkflows();
  }, []);

  // Navigate to the workflow control page with filters
  const handleTaskItemClick = (utente: string, modulo: string) => {
    // Encode the parameters and handle empty values as 'all'
    const userParam = utente ? encodeURIComponent(utente) : 'all';
    const moduleParam = modulo ? encodeURIComponent(modulo) : 'all';
    
    navigate(`/workflow-control/${userParam}/${moduleParam}`);
  };
  
  // Dashboard card data
  const dashboardCards = [
    {
      id: 1,
      title: 'Importa file',
      subtitle: '1 import',
      lastUpdate: 'Last update: 05/05/2025',
      by: 'By: Jonh Doe',
      icon: <UploadFileIcon />,
      path: '/import-data', 
      blocked: false,
      status: 'Attivo'
    },
    {
      id: 2,
      title: 'Premi',
      subtitle: '4/7 Completati',
      lastUpdate: 'Last update: 05/05/2025',
      by: 'By: Jonh Doe',
      icon: <PaidIcon />,
      path: '/premiums',
      blocked: false,
      status: 'WIP'
    },
    {
      id: 3,
      title: 'Provvigioni',
      subtitle: 'Completa Premi',
      lastUpdate: 'Last update: -',
      by: 'By: -',
      icon: <DomainIcon />,
      path: '/commissions', 
      blocked: true,
      status: 'Bloccato'
    },
    {
      id: 4,
      title: 'Costi',
      subtitle: 'Completa Premi',
      lastUpdate: 'Last update: -',
      by: 'By: -',
      icon: <AccountBalanceWalletIcon />,
      path: '/costs',
      blocked: true,
      status: 'Bloccato'
    },
    {
      id: 5,
      title: 'Sinistri',
      subtitle: 'Completa Premi',
      lastUpdate: 'Last update: -',
      by: 'By: -',
      icon: <GavelIcon />,
      path: '/accidents',
      blocked: true,
      status: 'Bloccato'
    },
    {
      id: 6,
      title: 'Rappel',
      subtitle: 'Completa Premi',
      lastUpdate: 'Last update: -',
      by: 'By: -',
      icon: <DescriptionIcon />,
      path: '/rappel',
      blocked: true,
      status: 'Bloccato'
    },
    {
      id: 7,
      title: 'Riassicurazioni',
      subtitle: 'Completa Premi',
      lastUpdate: 'Last update: -',
      by: 'By: -',
      icon: <FactCheckIcon />,
      path: '/reinsurance',
      blocked: true,
      status: 'Bloccato'
    },
    {
      id: 8,
      title: 'Consolidamento',
      subtitle: 'Completa Premi',
      lastUpdate: 'Last update: -',
      by: 'By: -',
      icon: <InsertChartIcon />,
      path: '/consolidation',
      blocked: true,
      status: 'Bloccato'
    }
  ];

  // Get current time of day for greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // Get first name from user object
  const firstName = user?.firstName || 'Jonh';

  // Get status chip color and style
  const getStatusChip = (status: string) => {
    switch(status) {
      case 'Attivo':
        return (
          <Chip
            label="Attivo"
            size="small"
            sx={{
              bgcolor: '#e6f7ff',
              color: '#0078d4',
              borderRadius: '4px',
              '& .MuiChip-label': {
                px: 1,
                fontWeight: 500,
                fontSize: '0.75rem'
              }
            }}
          />
        );
      case 'WIP':
        return (
          <Chip
            label="WIP"
            size="small"
            sx={{
              bgcolor: '#fff5e6',
              color: '#ff8c00',
              borderRadius: '4px',
              '& .MuiChip-label': {
                px: 1,
                fontWeight: 500,
                fontSize: '0.75rem'
              }
            }}
          />
        );
      case 'Bloccato':
        return (
          <Chip
            icon={<LockIcon sx={{ fontSize: '14px !important' }} />}
            label="Bloccato"
            size="small"
            sx={{
              bgcolor: '#f0f0f0',
              borderRadius: '4px',
              '& .MuiChip-label': {
                px: 0.5,
                fontWeight: 500,
                fontSize: '0.75rem'
              },
              '& .MuiChip-icon': {
                ml: 0.5,
                mr: 0.5
              }
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ pb: 4, maxWidth: 1376 }}>
      {/* Home section with greeting */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <HomeIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            Home
          </Typography>
        </Box>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 500 }}>
          {`${getGreeting()}, ${firstName}`}
        </Typography>
      </Box>

      {/* Main content layout - Two columns grid */}
      <Grid container spacing={3}>
        {/* Left column - Dashboard cards */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            {dashboardCards.map((card) => (
              <Grid item xs={12} sm={6} key={card.id}>
                <Card 
                  sx={{ 
                    borderRadius: '8px', 
                    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
                    cursor: card.blocked ? 'default' : 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: card.blocked ? 'none' : 'translateY(-2px)',
                      boxShadow: card.blocked ? '0px 2px 8px rgba(0, 0, 0, 0.05)' : '0px 4px 12px rgba(0, 0, 0, 0.08)'
                    }
                  }}
                  onClick={() => {
                    if (!card.blocked) {
                      navigate(`${card.path}`);
                    }
                  }}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ mr: 1, display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                          {card.icon}
                        </Box>
                        <Box>
                          <Typography variant="subtitle1" fontWeight={500}>
                            {card.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {card.subtitle}
                          </Typography>
                        </Box>
                      </Box>
                      <Box>
                        {getStatusChip(card.status)}
                      </Box>
                    </Box>
                    <Divider sx={{ my: 1 }} />
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                        {card.lastUpdate}
                      </Typography>
                      <Typography variant="caption" display="block" color="text.secondary">
                        {card.by}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Right column - Activity section */}
        <Grid item xs={12} md={4}>
          <DashboardActivity limit={4} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;