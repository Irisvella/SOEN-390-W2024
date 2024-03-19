import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material';

const columns = [
  { field: 'propertyAddress', headerName: 'Property Address', width: 200 },
  { field: 'amount', headerName: 'Amount', width: 150, editable: true },
  { field: 'description', headerName: 'Description', width: 300 },
];

const initialRows = [
  { id: 1, propertyAddress: '123 Main St', amount: 100, description: 'Operational cost 1' },
  { id: 2, propertyAddress: '456 Elm St', amount: 150, description: 'Operational cost 2' },
  { id: 3, propertyAddress: '789 Oak St', amount: 120, description: 'Operational cost 3' },
];

const OperationalCostsTable = () => {
  const [rows, setRows] = useState(initialRows);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleCellClick = (params) => {
    setSelectedRow(params.row);
  };

  return (
    <div>

      <Box mt={10} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h6">
          Operational Costs
        </Typography>
        <Box mt={2} width="80%">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            checkboxSelection
            onCellClick={handleCellClick}
            onSelectionModelChange={(newSelection) => setSelectedRow(rows.find(row => row.id === newSelection.selectionModel[0]))}
          />
        </Box>
      </Box>
    </div>
  );
};

export default OperationalCostsTable;
