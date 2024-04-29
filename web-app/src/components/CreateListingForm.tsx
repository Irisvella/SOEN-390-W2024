import { useState } from "react";
import {
  Button,
  FormControl,
  TextareaAutosize,
  Grid,
  Paper,
  Stack,
  Typography,
  Box,
  FormGroup,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

import Navbar from "./Navbar";
import { Img } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Input } from "@mui/joy";
import React from "react";

const CreateListingForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    address: "",
    postalCode: "",
    totalUnit: "",
    parkingSpaces: "",
    amenities: "",
    description: "",
    parkingFee: "",
    pricePerSquareFoot: "",
    lockerFee: "",
  });
  const [state, setState] = React.useState({
    spa: false,
    skylounge: false,
    gym: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const target = event.target as HTMLTextAreaElement | HTMLInputElement;
    const { id, value } = target;
    const isCheckbox = target.type === 'checkbox';
  
    if (isCheckbox) {
      // Cast the target to HTMLInputElement to access 'checked'
      const checked = (target as HTMLInputElement).checked;
      setState(prevState => ({
        ...prevState,
        [id]: checked
      }));
    } else {
      // Handle all other inputs including textarea
      setFormData(prevData => ({
        ...prevData,
        [id]: value
      }));
    }
  
    // Numeric fields list
    const numericFields = [
      "totalUnit",
      "parkingSpaces",
      "parkingFee",
      "pricePerSquareFoot",
      "lockerFee",
    ];

    // Check if the current field requires numeric input
    if (numericFields.includes(id)) {
      // Allow changes if the value is either empty, a number, possibly with a negative sign, or a decimal point
      if (value === "" || /^-?\d*\.?\d*$/.test(value)) {
        // regex allows numbers, decimal points, and negative values
        setFormData((prevData) => ({
          ...prevData,
          [id]: value,
        }));
      }
    } else {
      // For non-numeric fields, update normally
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault(); // Prevent default form submission behavior
    navigate("/dashboard-company");
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
        // Reset form
        setFormData({
          address: "",
          postalCode: "",
          totalUnit: "",
          parkingSpaces: "",
          amenities: "",
          description: "",
          parkingFee: "",
          pricePerSquareFoot: "",
          lockerFee: "",
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
      <Paper
        sx={{
          p: 2,
          m: 10,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#F0F0F0",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container direction="column" padding={5}>
            <Grid item xs container direction="row" spacing={2}>
              <Grid item xs marginBottom={5}>
                <Box>
                  <Typography variant="h5" padding={2}>
                    Edit Listing
                  </Typography>
                  <Img
                    alt="complex"
                    src="https://accescondos.org/app/uploads/2016/09/fc6_persp_principale.jpg"
                  />
                </Box>
              </Grid>

              <Grid item xs marginTop={10}>
                <Stack spacing={2} direction="column" sx={{ marginBottom: 6 }}>
                  {/* Existing Fields */}
                  <FormControl variant="outlined" component="fieldset">
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <label
                        htmlFor="address"
                        style={{ marginRight: "8px", width: "auto" }}
                      >
                        Address:
                      </label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={handleChange}
                        sx={{
                          "--Input-radius": "0px",
                          borderBottom: "2px solid",
                          borderColor: "neutral.outlinedBorder",
                          "&:hover": {
                            borderColor: "neutral.outlinedHoverBorder",
                          },
                          "&::before": {
                            border: "1px solid var(--Input-focusedHighlight)",
                            transform: "scaleX(0)",
                            left: 0,
                            right: 0,
                            bottom: "-2px",
                            top: "unset",
                            transition:
                              "transform .15s cubic-bezier(0.1,0.9,0.2,1)",
                            borderRadius: 0,
                          },
                          "&:focus-within::before": {
                            transform: "scaleX(1)",
                          },
                        }}
                        fullWidth
                      />
                    </Box>
                  </FormControl>
                  <FormControl variant="outlined" component="fieldset">
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <label
                        htmlFor="postalCode"
                        style={{ marginRight: "8px", width: "auto" }}
                      >
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
                </Stack>

                <Stack spacing={2} direction="row" sx={{ marginBottom: 6 }}>
                  <FormControl>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <label
                        htmlFor="totalUnit"
                        style={{ marginRight: "8px", width: "auto" }}
                      >
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
                  <FormControl variant="outlined" component="fieldset">
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <label
                        htmlFor="parkingSpaces"
                        style={{ marginRight: "8px", width: "auto" }}
                      >
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
                {/* New Fields */}

                <Stack spacing={2} direction="row" sx={{ marginBottom: 6 }}>
                  <FormControl>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <label
                        htmlFor="parkingFee"
                        style={{ marginRight: "8px", width: "auto" }}
                      >
                        Parking Fee:
                      </label>
                      <Input
                        id="parkingFee"
                        variant="soft"
                        value={formData.parkingFee}
                        onChange={handleChange}
                        fullWidth
                      />
                    </Box>
                  </FormControl>
                  <FormControl>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <label
                        htmlFor="pricePerSquareFoot"
                        style={{ marginRight: "8px", width: "auto" }}
                      >
                        Price Per Square Foot:
                      </label>
                      <Input
                        id="pricePerSquareFoot"
                        variant="soft"
                        value={formData.pricePerSquareFoot}
                        onChange={handleChange}
                        fullWidth
                      />
                    </Box>
                  </FormControl>
                  <FormControl>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <label
                        htmlFor="lockerFee"
                        style={{ marginRight: "8px", width: "auto" }}
                      >
                        Locker Fee:
                      </label>
                      <Input
                        id="lockerFee"
                        variant="soft"
                        value={formData.lockerFee}
                        onChange={handleChange}
                      />
                    </Box>
                  </FormControl>
                </Stack>
              </Grid>
            </Grid>

            {/* Existing Fields */}
            <Grid container spacing={2} marginBottom={5}>
            <Grid container spacing={2}>
                      Facilities
              {/* New checkbox group added below */}
              <FormControl
                sx={{ m: 3 }}
                component="fieldset"
                variant="standard"
              >
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.spa}
                        onChange={handleChange}
                        name="spa"
                        id="spa"
                      />
                    }
                    label="Spa"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.skylounge}
                        onChange={handleChange}
                        name="skylounge"
                        id="skylounge"
                      />
                    }
                    label="Sky Lounge"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.gym}
                        onChange={handleChange}
                        name="gym"
                        id="gym"
                      />
                    }
                    label="Gym"
                  />
                </FormGroup>
              </FormControl>
            </Grid>
            </Grid>
            <Grid container spacing={2}>
              <FormControl fullWidth required>
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                  <label
                    htmlFor="description"
                    style={{ marginTop: "8px", alignSelf: "flex-start" }}
                  >
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
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </>
  );
};

export default CreateListingForm;
