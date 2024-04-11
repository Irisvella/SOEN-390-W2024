import { useState, useEffect } from "react";
import { FormControl, Grid, Button, Container, CardMedia } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { Box, Card, Input, Typography } from "@mui/joy";

function EditListingForm() {
  const { propertyId } = useParams(); // You need to determine how you're getting this ID
  const [address, setAddress] = useState("");
  const [totalUnit, setTotalUnit] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const fetchPropertyDetails = async () => {
      const token = localStorage.getItem("token");

      try {
        if (!propertyId) return;
        const response = await fetch(
          `http://localhost:3000/createEditListing/${propertyId}`,
          {
            //http://localhost:3000/property/${propertyId}
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          setAddress(data.address); // Assuming you're only fetching the address for editing
          setTotalUnit(data.totalUnit);
        } else {
          console.error("Failed to fetch property details:", data.message);
        }
      } catch (error) {
        console.error("Error fetching property details:", error);
      }
    };

    fetchPropertyDetails();
  }, [propertyId]); // Adding propertyId as a dependency);

  const updatePropertyDetails = async () => {
    navigate("/dashboard-company");
    const token = localStorage.getItem("token");
    const payload = {
      address,          // This is the updated address from your form
      totalUnit,
    };
    console.log("Sending payload:", payload);
    try {
      const response = await fetch(
        `http://localhost:3000/createEditListing/${propertyId}`,
        {
          // Ensuring propertyId is part of the URL
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update property details");
      }

      console.log("Property updated successfully");
    } catch (error) {
      console.error("Error updating property:", error);
    }
  };

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 10 }}>
        <Card variant="soft" sx={( { p: 10 })}>
         
            <CardMedia
              component="img"
              image="https://accescondos.org/app/uploads/2016/09/fc6_persp_principale.jpg"
              alt="Complex"
              sx={{ maxWidth: "50%", maxHeight: "100%" }} // This ensures the image does not exceed its container
            />
            <Typography>
            <Box sx={{ fontSize: 30, m: 1 }}>
              36 Lee drive, H8B 3M6
            </Box>
          </Typography>
          

          <form noValidate autoComplete="off">
            <Grid container spacing={2} alignItems="flex-end">
              <Grid xs={6} sm={3}>
                <FormControl id="address">
                  <label
                    htmlFor="address"
                    style={{ marginTop: "8px", width: "auto" }}
                  >
                    Address:
                  </label>
                  <Input
                    variant="outlined"
                    type="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </FormControl>
              </Grid>
              
              <Grid xs={6} sm={3}>
                <FormControl id="totalUnit">
                  <label
                    htmlFor="totalUnit"
                    style={{ marginTop: "8px", width: "auto", marginLeft:"10px" }}
                  >
                    totalUnit
                  </label>
                  <Input
                    variant="outlined"
                    type="totalUnit"
                    value={totalUnit}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid  sx={{ paddingTop: 2 }  } >
            <Button variant="contained" onClick={updatePropertyDetails}>
              Update
            </Button>
            </Grid>
          </form>
        </Card>
      </Container>
    </>
  );
}

export default EditListingForm;
