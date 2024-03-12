import React, { useState } from "react";
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

function CreateRequestPage() {
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    requestType: "",
    date: "",
    time: "",
    requestReason: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target; // Use name instead of id
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Use name to update the correct key in the state
    }));
  };

  const handleSubmit = async (e) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:3000/createEditListing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, //checking if you are logged in or not
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Listing data submitted successfully");

        setFormData({
          requestType: "",
          date: "",
          time: "",
          requestReason: "",
        });
      } else {
        console.error("Failed to submit listing data");
      }
    } catch (error) {
      console.error("Error submitting listing data:", error);
    }
  };

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
              <Grid  xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel id="request-type-label">Request type</InputLabel>
                  <Select
                    labelId="request-type-label"
                    name="requestType" 
                    label="Request type"
                    value={formData.requestType}
                    onChange={handleChange}
                  >
                    <MenuItem value="maintenance">Maintenance</MenuItem>
                    <MenuItem value="inquiry">Inquiry</MenuItem>
                    
                  </Select>
                </FormControl>
              </Grid>
              <Grid  xs={12} sm={4}>
                <TextField
                 name="date" 
                  label="Date"
                  type="date"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={formData.date}
                  onChange={handleChange}
                />
              </Grid>
              <Grid xs={12} sm={4}>
                <TextField
                 name="time" 
                  label="Time"
                  type="time"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                 value={formData.time}
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
              <Button variant="contained" 
              color="primary"
              onClick={handleSubmit}
              >
                   {isEditing ? "Save Changes" : "Submit"}
              </Button>
            </Box>
          </form>
        </Card>
      </Container>
    </>
  );
}

export default CreateRequestPage;
