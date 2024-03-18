import { useState } from 'react';
import { Container, Typography, Chip, Button, Stack, CardMedia, Grid, TextField } from '@mui/material';
import { Card, CardContent } from '@mui/joy'; // Import Card and CardContent from @mui/joy
import Navbar from '../components/Navbar';


function RequestManagement() {
  const [requestData, setRequestData] = useState({
    type: 'Deficiency in common areas',
    status: 'In Progress',
    dateCreated: '05/02/2024',
    description: 'No more snacks in the common area. We would like to have granola bars restocked and also the fresh fruit.',
    initialResponse: 'The fresh fruit will not be returning as it was too expensive to keep restocking. However, we have heard your request for the granola bar requests and will try and get those restocked as soon as possible.',
    assignedPersonnel: 'Jeremy Robertson',
  });

  // Function to determine the chip color based on request status
  const getColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'success';
      case 'Canceled':
        return 'error';
      case 'In Progress':
        return 'primary'; // 'primary' is typically blue by default, but you might want to customize this
      default:
        return 'default';
    }
  };

  // Function to handle changes in the initial response
  const handleInitialResponseChange = (event: { target: { value: any; }; }) => {
    setRequestData({ ...requestData, initialResponse: event.target.value });
  };

  // Function to handle changes in the assigned personnel
  const handleAssignedPersonnelChange = (event: { target: { value: any; }; }) => {
    setRequestData({ ...requestData, assignedPersonnel: event.target.value });
  };

// Function to handle the "Update" action
  function handleUpdate() {
    // Assuming you would have some mechanism to save these changes,
    // for now, we'll just log the updated request data
    console.log("Updated Request:", requestData);
    // Here you would typically send a request to your backend to update the request in the database
  }

// Function to handle the "Resolve" action
const handleResolve = () => {
  // Set the request status to "Completed"
  setRequestData({ ...requestData, status: "Completed" });
  // Here you would typically send a request to your backend to update the request status in the database
};

// Function to handle the "Reject" action
const handleReject = () => {
  // Set the request status to "Canceled"
  setRequestData({ ...requestData, status: "Canceled" });
  // Here you would typically send a request to your backend to update the request status in the database
};


  return (
    <>
      <Navbar />
      <Container sx={{ mt: 10 }}>
        <Card>
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <CardMedia
                  component="img"
                  image="https://accescondos.org/app/uploads/2016/09/fc6_persp_principale.jpg"
                  alt="Complex"
                  sx={{ width: "100%", height: "auto" }} // This ensures the image scales responsively
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" color="textSecondary">
                  Type: {requestData.type}
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  Date Created: {requestData.dateCreated}
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  Created by: fatoumata
                </Typography>
                <Chip
                  label={requestData.status}
                  // Use the getColor function to dynamically set the color
                  color={getColor(requestData.status)}
                />
              </Grid>
            </Grid>
            <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
              36 Lee drive, H8B 3M6
            </Typography>
          </CardContent>

          <Card variant="soft">
            <div>
              <CardContent>
                <Typography variant="body2" gutterBottom>
                  Description: {requestData.description}
                </Typography>
              </CardContent>

              <CardContent>
                <Typography variant="body2" gutterBottom>
                  Your Initial Response:
                  <TextField
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={requestData.initialResponse}
                    onChange={handleInitialResponseChange}
                  />
                </Typography>
              </CardContent>

              <CardContent>
                <Typography variant="body2" gutterBottom>
                  Assigned personnel:
                  <TextField
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={requestData.assignedPersonnel}
                    onChange={handleAssignedPersonnelChange}
                  />
                </Typography>
              </CardContent>
              <Stack direction="row" spacing={1} mt={2} justifyContent="center">
                <Button variant="contained" onClick={handleUpdate}>
                  Update
                </Button>
                <Button variant="contained" color="success" onClick={handleResolve}>
                  Mark as Resolved
                </Button>
                <Button variant="contained" color="error" onClick={handleReject}>
                  Reject Request
                </Button>
              </Stack>
            </div>
          </Card>
        </Card>
      </Container>
    </>
  );
}

export default RequestManagement;
