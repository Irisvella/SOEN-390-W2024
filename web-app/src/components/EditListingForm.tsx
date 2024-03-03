import React, { useState, useEffect } from "react";
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
import Navbar from "./Navbar";
import { Img } from "@chakra-ui/react";

const EditListingForm = ({ propertyId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [Address, setAddress] = useState("");
  const [PostalCode, setPostalCode] = useState("");
  const [TotalUnit, setTotalUnit] = useState("");
  const [ParkingSpaces, setParkingSpaces] = useState("");
  const [Amenities, setAmenities] = useState("");
  const [Description, setDescription] = useState("");

  useEffect(() => {
    if (propertyId) {
      setIsEditing(true);
      // Placeholder for fetching property details by ID
      // You'll need to implement or call the actual function to fetch data
    }
  }, [propertyId]);

  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
        address: Address, // Make sure this matches the backend's expected key
        postalCode: PostalCode,
        totalUnit: TotalUnit,
        parkingSpaces: ParkingSpaces,
        amenities: Amenities,
        description: Description,
    };

    try {
        const response = await fetch('http://localhost:3000/dashboard/listings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error('Failed to submit property data');
        }

        // On successful submission, trigger refresh in DashboardCompany
        localStorage.setItem('refreshListings', 'true');
        // Navigate back to the DashboardCompany after submission
        // navigate('/path-to-dashboard-company'); // Make sure you define `navigate`
    } catch (error) {
        console.error("Submission failed", error);
    }
};








  return (
    <>
      <Navbar />
      <Paper sx={{ p: 2, m: 10, backgroundColor: (theme) => theme.palette.mode === "dark" ? "#1A2027" : "#F0F0F0", }}>
        <form onSubmit={handleSubmit}>
          {/* The rest of your form fields go here */}
          
          <Grid container direction="column" padding={5}>
            {/* Form content remains unchanged */}

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
                {/* Form fields */}
                <Stack spacing={2} direction="column" sx={{ marginBottom: 6 }}>
                  <FormControl
                    variant="outlined"
                    component="fieldset"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <label
                        htmlFor="Address"
                        style={{ marginRight: "8px", width: "auto" }}
                      >
                        Address:
                      </label>
                      <Input
                        id="Address"
                        value={Address}
                        onChange={(e) => setAddress(e.target.value)}
                        fullWidth
                        sx={{
                          borderWidth: "1px",
                          borderStyle: "solid",
                          borderRadius: "4px",
                          "& .MuiInputBase-input": {
                            borderColor: "primary.main",
                          },
                        }}
                      />
                    </Box>
                  </FormControl>
                  <FormControl
                    variant="outlined"
                    component="fieldset"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <label
                        htmlFor="PostalCode"
                        style={{ marginRight: "8px", width: "auto" }}
                      >
                        Postal Code:
                      </label>
                      <Input
                        id="PostalCode"
                        value={PostalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        sx={{
                          borderWidth: "1px",
                          borderStyle: "solid",
                          borderRadius: "4px",
                          "& .MuiInputBase-input": {
                            borderColor: "primary.main",
                          },
                        }}
                      />
                    </Box>
                  </FormControl>
                </Stack>

                <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                  <FormControl>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <label
                        htmlFor="TotalUnit"
                        style={{ marginRight: "8px", width: "auto" }}
                      >
                        Total Unit
                      </label>

                      <Input
                        id="TotalUnit"
                        value={TotalUnit}
                        onChange={(e) => setTotalUnit(e.target.value)}
                        fullWidth
                        sx={{
                          borderWidth: "1px",
                          borderStyle: "solid",
                          borderRadius: "4px",
                          "& .MuiInputBase-input": {
                            borderColor: "primary.main",
                          },
                        }}
                      />
                    </Box>
                  </FormControl>
                  <FormControl
                    variant="outlined"
                    component="fieldset"
                    sx={{ display: "flex", alignItems: "center", gap: 2 }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <label
                        htmlFor="ParkingSpaces"
                        style={{ marginRight: "8px", width: "auto" }}
                      >
                        Parking Spaces:
                      </label>
                      <Input
                        id="ParkingSpaces"
                        value={ParkingSpaces}
                        onChange={(e) => setParkingSpaces(e.target.value)}
                        fullWidth
                        sx={{
                          borderWidth: "1px",
                          borderStyle: "solid",
                          borderRadius: "4px",
                          "& .MuiInputBase-input": {
                            borderColor: "primary.main",
                          },
                        }}
                      />
                    </Box>
                  </FormControl>
                </Stack>
              </Grid>
            </Grid>

            <Grid container spacing={2} marginBottom={5}>
              <FormControl fullWidth required>
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                  <label
                    htmlFor="amenities"
                    style={{ marginTop: "8px", alignSelf: "flex-start" }}
                  >
                    Amenities:
                  </label>
                  <TextareaAutosize
                    id="Amenities"
                    minRows={3}
                    style={{
                      width: "100%", // Adjust width as necessary to fill space
                      borderColor: "#c4c4c4",
                      borderWidth: "1px",
                      borderStyle: "solid",
                      borderRadius: "4px",
                      padding: "8px",
                      resize: "vertical", // Allows vertical resizing, remove or adjust as needed
                    }}
                    value={Amenities} // Ensure you update this for the correct variable
                    onChange={(e) => setAmenities(e.target.value)} // And the correct handler
                  />
                </Box>
              </FormControl>
            </Grid>
            <Grid container spacing={2}>
              <FormControl fullWidth required>
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                  <label
                    htmlFor="Description"
                    style={{ marginTop: "8px", alignSelf: "flex-start" }}
                  >
                    Description:
                  </label>
                  <TextareaAutosize
                    id="Description"
                    minRows={3}
                    style={{
                      width: "100%", // Adjust width as necessary to fill space
                      borderColor: "#c4c4c4",
                      borderWidth: "1px",
                      borderStyle: "solid",
                      borderRadius: "4px",
                      padding: "8px",
                      resize: "vertical", // Allows vertical resizing, remove or adjust as needed
                    }}
                    value={Description} // Ensure you update this for the correct variable
                    onChange={(e) => setDescription(e.target.value)} // And the correct handler
                    aria-label="amenities"
                  />
                </Box>
              </FormControl>
            </Grid>
          </Grid>

          
          <Grid container direction="column" padding={5}>
            {/* Simplified for brevity */}
            <Button type="submit" variant="contained" color="primary">
              {isEditing ? "Save Changes" : "Submit"}
            </Button>
          </Grid>
        </form>
      </Paper>
    </>
  );
};

export default EditListingForm;
