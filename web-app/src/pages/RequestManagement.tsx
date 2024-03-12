import React, { useState } from "react";
import {
  Button,
  FormControl,
  TextareaAutosize,
  Grid,
  Input,
  Paper,
  Stack,
  Typography,
  Box,
} from "@mui/material";

import { Img } from "@chakra-ui/react";

const RequestManagement = ({ propertyId }) => {
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
   
      <Paper sx={{ p: 2, m: 10, backgroundColor: (theme) => theme.palette.mode === "dark" ? "#1A2027" : "#F0F0F0", }}>
        <form>
          <Grid container direction="column" padding={5}>
            <Grid item xs container direction="row" spacing={2}>
              <Grid item xs marginBottom={5}>
                <Box>
                  <Typography variant="h5" padding={2}>
                    Edit Listing
                  </Typography>
                  <Img alt="complex" src="https://accescondos.org/app/uploads/2016/09/fc6_persp_principale.jpg" />
                </Box>
              </Grid>

              <Grid item xs marginTop={10}>
                <Stack spacing={2} direction="column" sx={{ marginBottom: 6 }}>
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
                  {/* Postal Code */}
                  <FormControl variant="outlined" component="fieldset">
                    <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                      <label htmlFor="postalCode" style={{ marginRight: "8px", width: "auto" }}>
                        Postal Code:
                      </label>
                      <Input
                        id="postalCode"
                        value={formData.postalCode}
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
              </Grid>
            </Grid>

            {/* Amenities */}
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

            <Grid container direction="column" padding={5}>
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
};

export default RequestManagement;
