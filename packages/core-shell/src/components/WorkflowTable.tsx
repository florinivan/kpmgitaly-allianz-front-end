import React from 'react';
import { 
  Box, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Typography
} from '@mui/material';
import { WorkflowItem } from '../types/WorkflowItem';
import { brandColors } from '../theme-config';

interface WorkflowTableProps {
  data: WorkflowItem[];
}

const WorkflowTable: React.FC<WorkflowTableProps> = ({ data }) => {
  // Table headers
  const headers = [
    { id: 'utente', label: 'Utente', sortable: true },
    { id: 'modulo', label: 'Modulo', sortable: false },
    { id: 'azione', label: 'Azione', sortable: false },
    { id: 'data', label: 'Data', sortable: true },
    { id: 'dettaglio', label: 'Dettaglio', sortable: false },
    { id: 'stato', label: 'Stato', sortable: false },
  ];

  return (
    <TableContainer 
      component={Paper} 
      elevation={0}
      sx={{ 
        borderRadius: '8px',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        overflow: 'hidden',
        mb: 4
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="workflow table">
        <TableHead>
          <TableRow sx={{ bgcolor: '#fafafa' }}>
            {headers.map((header) => (
              <TableCell 
                key={header.id}
                sx={{ 
                  fontWeight: 500,
                  color: 'text.secondary',
                  py: 1.5,
                  px: 2
                }}
              >
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    cursor: header.sortable ? 'pointer' : 'default'
                  }}
                >
                  {header.sortable && (
                    <Box 
                      component="span" 
                      sx={{ 
                        mr: 0.5,
                        fontSize: '18px',
                        lineHeight: 1
                      }}
                    >
                      ↕
                    </Box>
                  )}
                  {header.label}
                </Box>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              sx={{ 
                '&:last-child td, &:last-child th': { border: 0 },
                '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.01)' }
              }}
            >
              <TableCell component="th" scope="row" sx={{ py: 1.5, px: 2 }}>
                {row.utente}
              </TableCell>
              <TableCell sx={{ py: 1.5, px: 2 }}>{row.modulo}</TableCell>
              <TableCell sx={{ py: 1.5, px: 2 }}>{row.azione}</TableCell>
              <TableCell sx={{ py: 1.5, px: 2 }}>{row.data}</TableCell>
              <TableCell sx={{ py: 1.5, px: 2 }}>{row.dettaglio}</TableCell>
              <TableCell sx={{ py: 1.5, px: 2 }}>
                <Box 
                  sx={{ 
                    display: 'inline-block',
                    borderRadius: '4px',
                    px: 1,
                    py: 0.5,
                    bgcolor: row.stato === 'Completato' ? '#e6f7ff' : '#fff4e5',
                    color: row.stato === 'Completato' ? '#0078d4' : '#e67700'
                  }}
                >
                  <Typography variant="caption" fontWeight={500}>
                    {row.stato}
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WorkflowTable;