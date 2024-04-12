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
      <Container sx={{ mt: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              36 Lee drive, H8B 3M6
            </Typography>
            <CardMedia
              component="img"
              image="https://accescondos.org/app/uploads/2016/09/fc6_persp_principale.jpg"
              alt="Event Hall"
              sx={{ maxWidth: "100%", height: "auto" }}
            />
            <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
              {/* TextFields use handleInputChange */}
              <FormControl fullWidth margin="normal">
                <TextField
                  name="date"
                  label="Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={reservationData.date}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField
                  name="startTime"
                  label="From"
                  type="time"
                  InputLabelProps={{ shrink: true }}
                  value={reservationData.startTime}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField
                  name="endTime"
                  label="To"
                  type="time"
                  InputLabelProps={{ shrink: true }}
                  value={reservationData.endTime}
                  onChange={handleInputChange}
                />
              </FormControl>
              {/* Select uses handleSelectChange */}
              <FormControl fullWidth margin="normal">
                <InputLabel id="reservation-type-label">Reservation Type</InputLabel>
                <Select
                  labelId="reservation-type-label"
                  name="reservationType"
                  label="Reservation Type"
                  value={reservationData.reservationType}
                  onChange={handleSelectChange}
                >
                  <MenuItem value="Event Hall">Event Hall</MenuItem>
                  {/* Add other reservation types as MenuItems here */}
                </Select>
              </FormControl>
              {/* Rules and other information can be displayed as below */}
              <Typography variant="subtitle1" sx={{ mt: 2 }}>
                Rules:
                <ul>
                  <li>Occupancy Limit: Maximum 50 guests allowed.</li>
                  <li>Noise Control: Adhere to quiet hours from [insert start time] to [insert end time].</li>
                  {/* Include other rules here */}
                </ul>
              </Typography>
              <Box textAlign="center" sx={{ mt: 2 }}>
                <Button variant="contained" type="submit">
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
