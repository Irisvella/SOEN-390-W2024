// Filename: UserBills.ts
// Author: Sarah Abellard
// Description: Page for viewing bills associated to a public user
// Dependencies: React, MUI (Material-UI)
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, CircularProgress, Chip } from '@mui/material';
import Navbar from '../components/Navbar';

const UserBills = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBills = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/billing/my-bills', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setBills(data.map(bill => ({
          ...bill,
          id: bill.id,
          payBefore: bill.payBefore.split('T')[0] // Formatting the date for better readability
        })));
      } catch (error) {
        console.error("Failed to fetch bills:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBills();
  }, []);

  const columns = [
    { field: 'propertyAddress', headerName: 'Property Address', width: 200 },
    { field: 'unitNumber', headerName: 'Unit Number', width: 130 },
    { field: 'amount', headerName: 'Amount', width: 130 },
    { field: 'payBefore', headerName: 'Due Date', width: 130 },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => {
        return (
          <Chip
            label={params.value}
            color={params.value === 'paid' ? 'success' : 'error'}
            variant="filled" // Changed from "outlined" to "filled"
          />
        );
      },
    },
  ];

  return (
    <div>
      <Navbar />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 12, mb: 10 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          My Bills
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <Box sx={{ height: 400, width: '60%' }}>
            <DataGrid
              rows={bills}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
            />
          </Box>
        )}
      </Box>
    </div>
  );
};

export default UserBills;
