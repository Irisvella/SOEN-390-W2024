import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import { Card } from "@mui/joy";
import Grid from "@mui/joy/Grid";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom"; // Make sure to import useNavigate

function CreateRequestPage() {

  const navigate = useNavigate(); // Initialize useNavigate

 
  const [formData, setFormData] = useState({
    requestType: "",
    date: "",
    time: "",
    requestReason: "",
    createdBy:"",
    
  });

  const handleChange = (e) => {
    const { name, value } = e.target; // Use name instead of id
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Use name to update the correct key in the state
    }));
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:3000/createRequestPage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, //checking if you are logged in or not
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Request data submitted successfully");
        setFormData({
          requestType: "",
          date: "",
          time: "",
          requestReason: "",
          createdBy: "",
        });
      } else {
        const errorResponse = await response.text(); // Or response.json() if the server responds with JSON
        console.error("Failed to submit data", errorResponse);
      }
      
    } catch (error) {
      console.error("Error submitting listing data:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    const role = localStorage.getItem("role");
    if (role !== 'publicUser'){
      navigate("/dashboard-company")
    }
  }, []);
  return (
    <>
      <Navbar />
      <Container sx={{ mt: 10 }}>
        <Card variant="soft">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <CardMedia
              component="img"
              image="https://accescondos.org/app/uploads/2016/09/fc6_persp_principale.jpg"
              alt="Complex"
              sx={{ maxWidth: "50%", maxHeight: "100%" }} // This ensures the image does not exceed its container
            />
          </Box>

          <Typography component="div">
            <Box sx={{ fontSize: 30, m: 1, textAlign: "center" }}>
              36 Lee drive, H8B 3M6
            </Box>
          </Typography>

          <form noValidate autoComplete="off">
            <Grid container spacing={2} alignItems="flex-end">
              <Grid xs={6} sm={3}>
                <FormControl fullWidth>
                  <InputLabel id="request-type-label">Request type</InputLabel>
                  <Select
                    labelId="request-type-label"
                    name="requestType"
                    label="Request type"
                    value={formData.requestType}
                    onChange={handleChange}
                  >
                    <MenuItem value="maintenance">Moving out (Elevator) </MenuItem>
                    <MenuItem value="inquiry">Intercom Changes</MenuItem>
                    <MenuItem value="inquiry">Reporting a violation</MenuItem>
                    <MenuItem value="inquiry">Deficiency in common areas</MenuItem>
                    <MenuItem value="inquiry">Make Reservation</MenuItem>
                    <MenuItem value="inquiry">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid xs={6} sm={3}>
                <TextField
                  name="date"
                  label="Date"
                  type="date"
                  variant="filled"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={formData.date}
                  onChange={handleChange}
                />
              </Grid>
              <Grid xs={6} sm={3}>
                <TextField
                  name="time"
                  label="Time"
                  type="time"
                  variant="filled"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={formData.time}
                  onChange={handleChange}
                />
              </Grid>
              <Grid xs={6} sm={3}>
                <TextField
                  name="createdBy"
                  label="createdBy"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={formData.createdBy}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <TextField
              name="requestReason"
              label="Reason for request"
              multiline
              rows={4}
              fullWidth
              margin="normal"
              value={formData.requestReason}
              onChange={handleChange}
            />
            <Box textAlign="center" mt={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Box>
          </form>
        </Card>
      </Container>
    </>
  );
}

export default CreateRequestPage;
