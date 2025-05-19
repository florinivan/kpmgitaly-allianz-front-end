import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { PremiumRowData } from '../types/PremiumTypes';

interface PremiumDataGridProps {
  data: PremiumRowData[];
  isLoading: boolean;
  showCanali?: boolean;
}

const PremiumDataGrid: React.FC<PremiumDataGridProps> = ({ data, isLoading, showCanali = false }) => {
  // Format numbers with Italian notation (dots for thousands, comma for decimals)
  const formatNumber = (value: number | null | undefined) => {
    if (value === null || value === undefined) return '000.000.000';
    return value.toLocaleString('it-IT', { 
      minimumFractionDigits: 3,
      maximumFractionDigits: 3 
    });
  };

  // Group the data by ID, Comparto, and Anno - and add canale if showCanali is true
  const groupedData = useMemo(() => {
    const sortedData = [...data].sort((a, b) => {
      if (a.compagnia !== b.compagnia) return a.compagnia.localeCompare(b.compagnia);
      if (a.comparto !== b.comparto) return a.comparto.localeCompare(b.comparto);
      return Number(a.anno) - Number(b.anno);
    });
  
    const rows: any[] = [];
    let currentGroupKey = '';
    let groupCounter = 1;
  
    sortedData.forEach((item) => {
      const groupKey = `${item.compagnia}-${item.comparto}`;
      
      // Add group row only if new
      if (groupKey !== currentGroupKey) {
        currentGroupKey = groupKey;
        
        // Group row with unique ID
        rows.push({
          id: `group-${groupKey}`,
          isGroup: true,
          compagnia: item.compagnia,
          comparto: item.comparto,
          canale: showCanali ? groupCounter : undefined,
          ...Object.fromEntries(
            Object.keys(item)
              .filter(k => !['id', 'compagnia', 'comparto'].includes(k))
              .map(k => [k, ''])
          )
        });
        
        groupCounter++;
      }
  
      // Data row with original ID preserved
      rows.push({
        ...item,
        id: item.id,
        compagnia: '',
        comparto: '',
        canale: showCanali ? groupCounter - 1 : undefined,
      });
    });
  
    return rows;
  }, [data, showCanali]);

  // Define columns for the premium data grid
  const columns: GridColDef[] = [
    { 
      field: 'compagnia', 
      headerName: 'ID', 
      width: 100,
      renderCell: (params) => params.value ? (
        <Box sx={{ fontWeight: 600, pl: 1 }}>
          {params.value}
        </Box>
      ) : null
    },
    { 
      field: 'comparto', 
      headerName: 'Comparto', 
      width: 120,
      renderCell: (params) => params.value ? (
        <Box sx={{ fontWeight: 600 }}>
          {params.value}
        </Box>
      ) : null
    },
    ...(showCanali ? [{ 
      field: 'canale', 
      headerName: 'Canale', 
      width: 70,
      renderCell: (params: any ) => params.value ? (
        <Box sx={{ fontWeight: 600 }}>
          {params.value}
        </Box>
      ) : null
    }] : []),
    { 
      field: 'anno', 
      headerName: 'Anno', 
      width: 80,
      renderCell: (params) => (
        <Box sx={{ fontWeight: params.row.isGroup ? 600 : 400 }}>
          {params.value}
        </Box>
      )
    },
    { 
      field: 'pezzi', 
      headerName: 'Pezzi', 
      width: 120,
      type: 'number',
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => formatNumber(params.value as number)
    },
    {
      field: 'premioMedioPortafoglio',
      headerName: 'Premio medio di portafoglio',
      width: 180,
      type: 'number',
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => formatNumber(params.row.premioMedio as number)
    },
    { 
      field: 'premi', 
      headerName: 'Premi', 
      width: 120,
      type: 'number',
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => formatNumber(params.value as number)
    },
    { 
      field: 'gwp', 
      headerName: 'GWP', 
      width: 120,
      type: 'number',
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => formatNumber(params.value as number)
    },
    { 
      field: 'ru', 
      headerName: 'RU', 
      width: 120,
      type: 'number',
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => formatNumber(params.value as number)
    },
    { 
      field: 're', 
      headerName: 'RE', 
      width: 120,
      type: 'number',
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => formatNumber(params.value as number)
    },
    { 
      field: 'altriOneri', 
      headerName: 'altri oneri', 
      width: 120,
      type: 'number',
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => formatNumber(params.value as number)
    },
    { 
      field: 'gpe', 
      headerName: 'GPE', 
      width: 120,
      type: 'number',
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => formatNumber(params.value as number)
    },
    { 
      field: 'premioMedio', 
      headerName: 'Premio medio di competenza', 
      width: 220, 
      type: 'number',
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => formatNumber(params.value as number)
    },
  ];

  return (
    <Box sx={{ width: '100%', height: 'calc(100vh - 230px)' }}>
      <DataGrid
        getRowClassName={(params) => 
          params.row.isGroup ? 'group-row' : ''
        }
        rows={groupedData}
        columns={columns}
        loading={isLoading}
        disableRowSelectionOnClick
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        autoHeight={false}
        sx={{
          border: 'none',
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#ffffff',
            color: '#333',
            fontWeight: 500,
            borderBottom: '1px solid #e0e0e0',
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 500,
            textOverflow: 'clip',
            whiteSpace: 'normal',
            lineHeight: 1.2
          },
          '& .MuiDataGrid-cell': {
            fontSize: '0.875rem',
            borderBottom: '1px solid #f0f0f0',
          },
          '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within': {
            outline: 'none',
          },
          '& .group-row': {
            backgroundColor: '#f5f5f5',
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: '#f9f9f9',
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            minHeight: '400px',
          }
        }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 100 },
          },
        }}
        pageSizeOptions={[25, 50, 100]}
      />
    </Box>
  );
};

export default PremiumDataGrid;