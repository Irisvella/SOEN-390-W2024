
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, Chip } from '@mui/material';
import Navbar from '../components/Navbar';

const myReservations = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/myReservations', {
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
        setReservations(data.map(req => ({
          ...req,
          id: req.id || req.public_user_id,  // Ensure each row has a unique ID
          amenityName: req.amenity?.name || "No amenity"  // Accessing nested amenity name
        }))); 
      } catch (error) {
        console.error("Failed to fetch reservations:", error);
      }
    };
  
    fetchReservations();
  }, []);
  

  const columns = [
    { field: 'amenities_id', headerName: 'Reservation Type', width: 250 },
    { field: 'start_date', headerName: 'start time', width: 500 },
    { field: 'end_date', headerName: 'end time', width: 500 },
    
  ];

  return (
    <div>
      <Navbar />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 12, mb: 10 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          My Reservations
        </Typography>
        <Box sx={{ height: '80%', width: '80%' }}>
          <DataGrid
            rows={reservations}
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

export default myReservations;
