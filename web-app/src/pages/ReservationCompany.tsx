import React, { useState, useEffect } from 'react';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Typography,
  CardMedia
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Navbar from '../components/Navbar'; // Assuming you have a Navbar component
import { Block } from '@mui/icons-material';

// Define a type for the reservation data
interface Reservation {
  id: number;
  date: string;
  type: string;
  name: string;
  time: string;
}

function ReservationCompany() {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    // Fetch the reservations from your backend and set the state
    setReservations([
      { id: 1, date: '10/4/2024', type: 'Event Hall', name: 'Alex', time: '12:00-2:00 pm' },
      { id: 2, date: '10/4/2024', type: 'Parking', name: 'Doeh', time: '12:00-2:00 pm' },
      { id: 3, date: '10/4/2024', type: 'Terrace', name: 'Robertson', time: '12:00-2:00 pm' },
    ]);
  }, []);

  const handleDelete = (reservationId: number) => {
    console.log(`Deleting reservation with id: ${reservationId}`);
    setReservations(reservations.filter(reservation => reservation.id !== reservationId));
  };

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 9 }}>
       
        <CardMedia
          component="img"
          image="https://accescondos.org/app/uploads/2016/09/fc6_persp_principale.jpg"
          alt="36 Lee drive"
          sx={{ maxWidth: '30%', maxHeight: 90, mb:3,display:'block',marginLeft: 'auto',  marginRight: 'auto' }} // Control the size of the image
        />
        <Typography variant="h5" align="center" gutterBottom>
          36 Lee drive, H8B 3M6
        </Typography>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Reservation Type</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reservations.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.time}</TableCell>
                  <TableCell>
                    <IconButton color="primary" aria-label="edit reservation">
                      <EditIcon />
                    </IconButton>
                    <IconButton color="secondary" aria-label="delete reservation" onClick={() => handleDelete(row.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {/* Empty row for adding a new reservation */}
              <TableRow>
                <TableCell colSpan={4} />
                <TableCell>
                  <IconButton color="primary" aria-label="add reservation">
                    <AddIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Typography textAlign="center" sx={{ mt: 2, mb: 2 }}>
            <Button variant="contained">Done</Button>
          </Typography>
        </Paper>
      </Container>
    </>
  );
}

export default ReservationCompany;
