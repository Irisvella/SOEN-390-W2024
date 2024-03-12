import React, { useState } from "react";
import {
  CardContent,
  Typography,
  Chip,
  Button,
  Stack,
  Box,
  Container,
  CardMedia,
  Grid,
} from "@mui/material";
import Card from "@mui/joy/Card";
import Navbar from "../components/Navbar";

function RequestManagement() {
  // Assume the request data is loaded from a state or props
  const [requestData, setRequestData] = useState({
    type: "Deficiency in common areas",
    status: "In Progress",
    dateCreated: "05/02/2024",
    description:
      "No more snacks in the common area. We would like to have granola bars restocked and also the fresh fruit.",
    initialResponse:
      "The fresh fruit will not be returning as it was too expensive to keep restocking. However, we have heard your request for the granola bar requests and will try and get those restocked as soon as possible.",
    assignedPersonnel: "Jeremy Robertson",
  });

  // Handlers for the buttons
  const handleUpdate = () => {
    // Implementation for updating the request
  };

  const handleResolve = () => {
    // Implementation for resolving the request
  };

  const handleReject = () => {
    // Implementation for rejecting the request
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
                <Chip label={requestData.status} color="primary" />
              </Grid>
            </Grid>
            <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
              36 Lee drive, H8B 3M6
            </Typography>
            {/* ... rest of the content ... */}
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
                  Your Initial Response: {requestData.initialResponse}
                </Typography>
              </CardContent>

              <CardContent>
                <Typography variant="body2" gutterBottom>
                  Assigned personnel: {requestData.assignedPersonnel}
                </Typography>
              </CardContent>
              <Stack direction="row" spacing={1} mt={2} justifyContent="center">
                <Button variant="contained" onClick={handleUpdate}>
                  Update
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleResolve}
                >
                  Mark as Resolved
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleReject}
                >
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
