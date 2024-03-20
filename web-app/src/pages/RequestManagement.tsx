import  { useState } from "react";
import {
  CardContent,
  Typography,
  Chip,
  Button,
  Stack,
  TextField,
  Container,
  CardMedia,
  Grid,
} from "@mui/material";
import Card from "@mui/joy/Card";
import Navbar from "../components/Navbar";

function RequestManagement() {
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

  const handleInputChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    setRequestData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Add getStatusChipColor here
  const getStatusChipColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "success";
      case "Cancelled":
        return "error";
        case "In Progress":
            return "primary"; // Updated to handle "In Progress" status
          default:
            return "default"; // Fallback color
        }
  };

  const handleUpdate = () => {
    console.log('Updated data:', requestData);
  };

  const handleResolve = () => {
    setRequestData((prevData) => ({
      ...prevData,
      status: "Completed",
    }));
  };

  const handleReject = () => {
    setRequestData((prevData) => ({
      ...prevData,
      status: "Cancelled",
    }));
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
                  sx={{ width: "100%", height: "auto" }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" color="textSecondary">
                  Type: {requestData.type}
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  Date Created: {requestData.dateCreated}
                </Typography>
                {/* Updated Chip component */}
                <Chip label={requestData.status} color={getStatusChipColor(requestData.status)} />
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
                <TextField
                  fullWidth
                  label="Your Initial Response"
                  variant="outlined"
                  name="initialResponse"
                  value={requestData.initialResponse}
                  onChange={handleInputChange}
                />
              </CardContent>

              <CardContent>
                <TextField
                  fullWidth
                  label="Assigned Personnel"
                  variant="outlined"
                  name="assignedPersonnel"
                  value={requestData.assignedPersonnel}
                  onChange={handleInputChange}
                />
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
