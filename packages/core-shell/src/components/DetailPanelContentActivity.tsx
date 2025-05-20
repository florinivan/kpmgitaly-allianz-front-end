// components/DetailPanelContentActivity.tsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Divider,
  CircularProgress
} from '@mui/material';
import { Checklist as ChecklistIcon } from '@mui/icons-material';
import { brandColors } from '../theme-config';
import { WorkflowItem } from '../types/WorkflowItem';
import { fetchWorkflowData } from '../services/workflow.service';

interface DetailPanelContentActivityProps {
  limit?: number;
  onItemClick: (utente: string, modulo: string) => void;
}

const DetailPanelContentActivity: React.FC<DetailPanelContentActivityProps> = ({
  limit = 4, 
  onItemClick
}) => {
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

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map(w => w[0])
      .join('')
      .toUpperCase();

  const formatActivityMessage = (activity: WorkflowItem) => {
    const { azione, modulo } = activity;
    if (azione.includes('Caricamento')) return `Hai importato Actual SAP BW`;
    if (azione.includes('ADJ') && azione.includes('GWP'))
      return `Hai modificato ^ADJ in Triangoli GWP`;
    if (azione.includes('sinottico')) return `Hai scaricato il Sinottico`;
    if (azione.includes('ADJ') && azione.includes('UR'))
      return `Hai modificato ^ADJ in Triangoli UR`;
    return `Hai eseguito ${azione} in ${modulo}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString.split('/').reverse().join('-'));
    return `10:45 ${date.getDate()} Maggio`;
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress size={24} sx={{ color: brandColors.primary }} />
      </Box>
    );
  }

  if (activities.length === 0) {
    return (
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
    );
  }

  return (
    <Box>
      {activities.map((activity, index) => (
        <React.Fragment key={activity.id}>
          <Box
            sx={{ display: 'flex', py: 1.5, cursor: 'pointer' }}
            onClick={() => onItemClick(activity.utente, activity.modulo)}
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
  );
};

export default DetailPanelContentActivity;
