import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';
import Navbar from '../components/Navbar';

const MyReservations = () => {
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
                const uniqueData = Array.from(new Set(data.map(a => a.amenities_id)))
                    .map(id => {
                        return data.find(a => a.amenities_id === id)
                    });

                setReservations(uniqueData.map(req => ({
                    id: req.amenities_id,  // Ensuring each row has a unique ID
                    amenityName: req.text_id,  // Displaying the name or description of the amenity
                    start_time: req.start_date,  // Adjusting names to match what is expected on the front end
                    end_time: req.end_date
                })));
            } catch (error) {
                console.error("Failed to fetch reservations:", error);
            }
        };

        fetchReservations();
    }, []);

    const columns = [
        { field: 'amenityName', headerName: 'Amenity', width: 250 },
        { field: 'start_time', headerName: 'Start Time', width: 200 },
        { field: 'end_time', headerName: 'End Time', width: 200 },
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

export default MyReservations;
