import React, { useState, ChangeEvent, FormEvent } from 'react';
import {
  Container,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Box,
  CardMedia,
  CardContent,
  Card,
  SelectChangeEvent, // Import this for handling select events
} from '@mui/material';
import Navbar from '../components/Navbar'; // Assuming you have a Navbar component

interface ReservationData {
  date: string;
  startTime: string;
  endTime: string;
  reservationType: string;
}

function ReservationUser() {
  const [reservationData, setReservationData] = useState<ReservationData>({
    date: '',
    startTime: '',
    endTime: '',
    reservationType: 'Event Hall', // Default set to 'Event Hall'
  });

  // Change handler for TextFields
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name as keyof ReservationData;
    const value = event.target.value;
    setReservationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Change handler for the Select component
  const handleSelectChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof ReservationData;
    const value = event.target.value;
    setReservationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here you would typically send the reservationData to the backend
    console.log(reservationData);
  };

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
  <Card sx={{ minWidth: 275, maxWidth: 500, mb: 2 }}>
    <CardContent sx={{ p: 2 }}>
      <Typography variant="h5" component="div" gutterBottom sx={{ textAlign: 'center', mb: 2 }}>
        36 Lee drive, H8B 3M6
      </Typography>
      <CardMedia
        component="img"
        image="https://accescondos.org/app/uploads/2016/09/fc6_persp_principale.jpg"
        alt="Event Hall"
        sx={{ maxWidth: '100%', height: 'auto', mb: 2 }}
      />
      <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={{ '& .MuiFormControl-root': { mb: 1 } }}>
        {/* Add the inline styles to each FormControl or TextField */}
        <FormControl fullWidth margin="normal" sx={{ mb: 2 }}>
          <TextField
            name="date"
            label="Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={reservationData.date}
            onChange={handleInputChange}
            sx={{ mb: 1 }}
          />
        </FormControl>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <FormControl fullWidth margin="normal" sx={{ width: '48%' }}>
            <TextField
              name="startTime"
              label="From"
              type="time"
              InputLabelProps={{ shrink: true }}
              value={reservationData.startTime}
              onChange={handleInputChange}
              sx={{ mb: 1 }}
            />
          </FormControl>
          <FormControl fullWidth margin="normal" sx={{ width: '48%' }}>
            <TextField
              name="endTime"
              label="To"
              type="time"
              InputLabelProps={{ shrink: true }}
              value={reservationData.endTime}
              onChange={handleInputChange}
              sx={{ mb: 1 }}
            />
          </FormControl>
        </Box>
        <FormControl fullWidth margin="normal" sx={{ mb: 2 }}>
          <InputLabel id="reservation-type-label" sx={{ background: '#fff', paddingRight: '5px' }}>Reservation Type</InputLabel>
          <Select
            labelId="reservation-type-label"
            name="reservationType"
            label="Reservation Type"
            value={reservationData.reservationType}
            onChange={handleSelectChange}
            sx={{ mb: 1 }}
          >
            <MenuItem value="Event Hall">Event Hall</MenuItem>
            <MenuItem value="Terrace">Terrace</MenuItem>
            <MenuItem value="Parking">Parking</MenuItem>
            <MenuItem value="BBQ Area">BBQ Area</MenuItem>
            <MenuItem value="Pool Area">Pool Area</MenuItem>
            <MenuItem value="Private Room">Private Room</MenuItem>
            <MenuItem value="Gym">Gym</MenuItem>
            
            {/* Add other reservation types as MenuItems here */}
          </Select>
        </FormControl>
        <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
          Rules:
          <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
            <li>Occupancy Limit: Maximum 50 guests allowed.</li>
            <li>Noise Control: Adhere to quiet hours from 11 pm onwards..</li>
            {/* Include other rules here */}
          </ul>
        </Typography>
        <Box textAlign="center" sx={{ mt: 2 }}>
          <Button variant="contained" type="submit" sx={{ mt: 1 }}>
            Submit
          </Button>
        </Box>
      </Box>
    </CardContent>
  </Card>
</Container>

    </>
  );
}

export default ReservationUser;
