import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Avatar,
  Divider,
  CircularProgress,
  Paper
} from '@mui/material';
import { Checklist as ChecklistIcon } from '@mui/icons-material';
import { brandColors } from '../theme-config';
import { WorkflowItem } from '../types/WorkflowItem';
import { fetchWorkflowData } from '../services/workflow.service';

interface DashboardActivityProps {
  limit?: number;
  title?: string;
  action_label?: string;
}

const DashboardActivity: React.FC<DashboardActivityProps> = ({ limit = 4, title = 'Activity', action_label = 'VEDI TUTTE' }) => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState<WorkflowItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadRecentActivities = async () => {
      try {
        const data = await fetchWorkflowData();
        setActivities(data.slice(0, limit));
      } catch (error) {
        console.error('Error loading recent activities:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRecentActivities();
  }, [limit]);

  const handleSeeAllClick = () => {
    navigate('/workflow-control');
  };

  // Get initials for avatar
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  // Format activity message based on action and module
  const formatActivityMessage = (activity: WorkflowItem): string => {
    const { azione, modulo } = activity;
    
    if (azione.includes('Caricamento')) {
      return `Hai importato Actual SAP BW`;
    } else if (azione.includes('ADJ') && azione.includes('GWP')) {
      return `Hai modificato ^ADJ in Triangoli GWP`;
    } else if (azione.includes('sinottico')) {
      return `Hai scaricato il Sinottico`;
    } else if (azione.includes('ADJ') && azione.includes('UR')) {
      return `Hai modificato ^ADJ in Triangoli UR`;
    } else {
      return `Hai eseguito ${azione} in ${modulo}`;
    }
  };

  // Format date in Italian style
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString.split('/').reverse().join('-'));
    return `10:45 ${date.getDate()} Maggio`;
  };

  // Function to navigate to workflow control with filters
  const handleTaskItemClick = (utente: string, modulo: string) => {
    // Encode parameters and navigate using React Router
    const userParam = utente ? encodeURIComponent(utente) : 'all';
    const moduleParam = modulo ? encodeURIComponent(modulo) : 'all';
    
    navigate(`/workflow-control/${userParam}/${moduleParam}`);
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

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress size={24} sx={{ color: brandColors.primary }} />
        </Box>
      ) : activities.length === 0 ? (
        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ChecklistIcon fontSize="small" sx={{ color: 'text.secondary' }} />
            <Typography variant="subtitle2" fontWeight={500}>
              Nessuna attività
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Nessun utente ha effettuato azioni
          </Typography>
        </Box>
      ) : (
        <Box>
          {activities.map((activity, index) => (
            <React.Fragment key={activity.id}>
              <Box 
                sx={{ 
                  display: 'flex', 
                  py: 1.5,
                  cursor: 'pointer'
                }}
                onClick={() => handleTaskItemClick(activity.utente, activity.modulo)}
              >
                <Avatar 
                  sx={{ 
                    width: 36, 
                    height: 36, 
                    bgcolor: '#e0e0e0',
                    color: '#606060',
                    fontSize: '0.9rem',
                    mr: 2
                  }}
                >
                  {getInitials(activity.utente)}
                </Avatar>
                <Box>
                  <Typography variant="body2">
                    {formatActivityMessage(activity)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatDate(activity.data)}
                  </Typography>
                </Box>
              </Box>
              {index < activities.length - 1 && (
                <Divider sx={{ my: 0.5 }} />
              )}
            </React.Fragment>
          ))}
        </Box>
      )}
    </Paper>
  );
};

export default DashboardActivity;