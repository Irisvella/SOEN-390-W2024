// Filename: UserRequests.jsx
// Author: Sarah Abellard, Samuel Collette
// Description: Component for showing user requests
// Dependencies: React, MUI (Material-UI)
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';
import Navbar from '../components/Navbar';

const UserRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/CreateRequest/my-requests', {
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
        setRequests(data.map(req => ({ ...req, id: req.id }))); 
      } catch (error) {
        console.error("Failed to fetch requests:", error);
      }
    };

    fetchRequests();
  }, []);

  const columns = [
    { field: 'id', headerName: 'Request ID', width: 100 },
    { field: 'title', headerName: 'Title', width: 150 },
    { field: 'description', headerName: 'Description', width: 250 },
    { field: 'requestPriority', headerName: 'Priority', width: 130 },
    { field: 'issuedAt', headerName: 'Issued At', width: 180 },
    { field: 'dateNeeded', headerName: 'Date Needed', width: 180 },
    { field: 'propertyAddress', headerName: 'Property Address', width: 200 },
  ];

  return (
    <div>
      <Navbar />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 12, mb: 10 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          My Requests
        </Typography>
        <Box sx={{ height: '80%', width: '80%' }}>
          <DataGrid
            rows={requests}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </Box>
      </Box>
    </div>
  );
};

export default UserRequests;
