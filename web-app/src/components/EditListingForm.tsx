import { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Grid,
  Input,
  Button,
  Container,
} from "@mui/material";
import { json, useParams } from "react-router-dom";

function EditListingForm() {
  const { propertyId } = useParams(); // You need to determine how you're getting this ID
  const [address, setAddress] = useState("");

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
    const token = localStorage.getItem("token");
    const payload = {
      address, // This is the updated address from your form
    };
    console.log("Sending payload:", payload);
    try {
      const response = await fetch(`http://localhost:3000/createEditListing/${propertyId}`, { // Ensuring propertyId is part of the URL
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
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
      <Container>
        <Grid>
          <FormControl id="address">
            <FormLabel>Address</FormLabel>
            <Input
              type="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </FormControl>

          <Button onClick={updatePropertyDetails}>Update</Button>
        </Grid>
      </Container>
    </>
  );
}

export default EditListingForm;
