
import React, { useState } from "react";
import { styled } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Input from '@mui/joy/Input';

import Navbar from "../components/Navbar";
import { Box, Button, FormControl, Grid, Paper, Stack, TextareaAutosize, Typography } from "@mui/material";
import { Img } from "@chakra-ui/react";

const Item = styled(Sheet)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.background.level1 : "#fff",
  ...theme.typography["body-sm"],
  padding: theme.spacing(1),
  textAlign: "center",
  borderRadius: 4,
  color: theme.vars.palette.text.secondary,
}));

export default function RequestManagement() {

  const [isEditing, setIsEditing] = useState(false);
 
  const [formData, setFormData] = useState({
    address: '',
    postalCode: '',
    totalUnit: '',
    parkingSpaces: '',
    amenities: '',
    description: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
   
    const token = localStorage.getItem('token');
    try {

      const response = await fetch('http://localhost:3000/createEditListing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,//checking if you are logged in or not 
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Listing data submitted successfully');
        
        setFormData({
          address: '',
          postalCode: '',
          totalUnit: '',
          parkingSpaces: '',
          amenities: '',
          description: '',
        });
      } else {
        console.error('Failed to submit listing data');
      }
    } catch (error) {
      console.error('Error submitting listing data:', error);
    }
  };



  return (
    <>
      <Navbar />
      <Paper
        sx={{
          p: 2,
          m: 10,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#F0F0F0",
        }}
      >
        <form>
        <Grid container spacing={2} >
          <Grid item xs={4}>
            <Item>
              <Box>
                <Typography variant="h5" padding={2}>
                  Edit Listing
                </Typography>
                <Img
                  alt="complex"
                  src="https://accescondos.org/app/uploads/2016/09/fc6_persp_principale.jpg"
                />
              </Box>
            </Item>
          </Grid>
          <Grid item xs={8} >
            <Item>
            <Stack spacing={2} direction="column" sx={{ marginBottom: 6 }} padding={4}>
                  {/* Address */}
                  <FormControl variant="outlined" component="fieldset">
                    <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                      <label htmlFor="address" style={{ marginRight: "8px", width: "auto" }}>
                        Address:
                      </label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={handleChange}
                        fullWidth
                      />



                    </Box>
                  </FormControl>
          
                  {/* Total Unit */}
                  <FormControl>
                    <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                      <label htmlFor="totalUnit" style={{ marginRight: "8px", width: "auto" }}>
                        Total Unit:
                      </label>
                      <Input
                        id="totalUnit"
                        value={formData.totalUnit}
                        onChange={handleChange}
                        fullWidth
                      />
                    </Box>
                  </FormControl>
                  {/* Parking Spaces */}
                  <FormControl variant="outlined" component="fieldset">
                    <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                      <label htmlFor="parkingSpaces" style={{ marginRight: "8px", width: "auto" }}>
                        Parking Spaces:
                      </label>
                      <Input
                        id="parkingSpaces"
                        value={formData.parkingSpaces}
                        onChange={handleChange}
                        fullWidth
                      />
                    </Box>
                  </FormControl>
                </Stack> 
              </Item>
          </Grid>
        
            <Grid container spacing={2} marginBottom={5}>
              <FormControl fullWidth required>
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                  <label htmlFor="amenities" style={{ marginTop: "8px", alignSelf: "flex-start" }}>
                    Amenities:
                  </label>
                  <TextareaAutosize
                    id="amenities"
                    minRows={3}
                    style={{ width: "100%" }}
                    value={formData.amenities}
                    onChange={handleChange}
                  />
                </Box>
              </FormControl>
            </Grid>
            {/* Description */}
            <Grid container spacing={2}>
              <FormControl fullWidth required>
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                  <label htmlFor="description" style={{ marginTop: "8px", alignSelf: "flex-start" }}>
                    Description:
                  </label>
                  <TextareaAutosize
                    id="description"
                    minRows={3}
                    style={{ width: "100%" }}
                    value={formData.description}
                    onChange={handleChange}
                  />
                </Box>
              </FormControl>
            </Grid>

            <Grid container  padding={5}>
              <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              onClick={handleSubmit}
              >
                {isEditing ? "Save Changes" : "Submit"}
                
              </Button>
            </Grid>
      
        
        </Grid>
        </form>
      </Paper>
    </>
  );
}
