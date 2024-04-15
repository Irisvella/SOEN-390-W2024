import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material';

const columns = [
  { field: 'propertyAddress', headerName: 'Property Address', width: 300 },
  { field: 'amount', headerName: 'Amount', width: 150 },
  { field: 'description', headerName: 'Description', width: 300 },
  { field: 'paidOn', headerName: 'Paid On', width: 150 },
];

const OperationalCostsTable = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch('https://estate-api-production.up.railway.app/billing/all-operational-costs', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      setRows(data.map(cost => ({
        id: cost.id,
        propertyAddress: cost.propertyAddress,
        amount: cost.amount, // Ensure amount is properly formatted
        description: cost.description,
        paidOn: cost.paidOn, // Assuming paidOn is the date the operational cost was paid or recorded
      })));
    })
    .catch(error => console.error('Failed to fetch operational costs:', error));
  }, []);

  return (
    <div>
      <Navbar />
      <Box mt={10} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h6">
          Operational Costs
        </Typography>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          checkboxSelection
        />
      </Box>
    </div>
  );
};

export default OperationalCostsTable;
