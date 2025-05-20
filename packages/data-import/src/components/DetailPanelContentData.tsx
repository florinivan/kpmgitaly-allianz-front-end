// components/DetailPanelContentData.tsx
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
import { ContentDataItem } from '../types/ContentDataItem';
import { fetchContentData } from '../services/contentdata.service';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface DetailPanelContentDataProps {
  limit?: number;
  onItemClick: (utente: string, modulo: string) => void;
}

const DetailPanelContentData: React.FC<DetailPanelContentDataProps> = ({
  limit = 4, 
  onItemClick
}) => {
    const [contentdata, setContentdata] = useState<ContentDataItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
  
    useEffect(() => {
      const loadRecentContentData = async () => {
        try {
          const data = await fetchContentData();
          setContentdata(data.slice(0, limit));
        } catch (error) {
          console.error('Error loading recent ContentData:', error);
        } finally {
          setLoading(false);
        }
      };
  
      loadRecentContentData();
    }, [limit]);

  const formatContentData = (contentdata: ContentDataItem) => {
    const { filename, weight, status } = contentdata;
    return `${filename}`;
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress size={24} sx={{ color: brandColors.primary }} />
      </Box>
    );
  }

  if (contentdata.length === 0) {
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
      {contentdata.map((content, index) => (
        <React.Fragment key={content.id}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              py: 1.5,
              cursor: 'pointer'
            }}
            onClick={() => onItemClick(content.filename, content.weight)}
          >
            {/* Avatar upload rimane fisso */}
            <Avatar
              sx={{
                width: 36,
                height: 36,
                bgcolor: 'transparent',
                color: '#1d49e3'
              }}
            >
              <UploadFileIcon fontSize="small" />
            </Avatar>

            {/* Box centrale flessibile */}
            <Box sx={{ flex: 1, mx: 2 }}>
              <Typography variant="body2">
                {formatContentData(content)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {content.weight} – {content.status}
              </Typography>
            </Box>

            {/* Avatar di successo */}
            <Avatar
              sx={{
                width: 36,
                height: 36,
                bgcolor: 'transparent',
                color: '#4caf50'
              }}
            >
              <CheckCircleIcon fontSize="small" />
            </Avatar>
          </Box>

          {index < contentdata.length - 1 && (
            <Divider sx={{ my: 0.5 }} />
          )}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default DetailPanelContentData;
