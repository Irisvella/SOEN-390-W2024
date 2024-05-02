// Filename: myReservations.jsx
// Author: Fatoumata 
// Description: displaying and making reservation for facilities 
// Dependencies: React, MUI (Material-UI)

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Box,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Alert,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { SelectChangeEvent } from "@mui/material";

function ReservationUser() {
  const navigate = useNavigate();
  const { propertyId } = useParams();
  const [amenities, setAmenities] = useState<any[]>([]);
  const [areAmenitiesAvailable, setAreAmenitiesAvailable] = useState(true); // New state to track amenity availability
  const [reservationData, setReservationData] = useState({
    date: "",
    startTime: "",
    endTime: "",
    reservationType: "",
  });

  useEffect(() => {
    const fetchAmenities = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const response = await fetch(
          `http://localhost:3000/makeReservation/${propertyId}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.ok) {
          const data = await response.json(); 
          setAmenities(data);
          console.log(data);
          setAreAmenitiesAvailable(data.length > 0); // Check if amenities are available
        } else {
          console.error("Failed to fetch amenities");
        }
      } catch (error) {
        console.error("Error fetching amenities:", error);
      }
    };

    fetchAmenities();
  }, [navigate, propertyId]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setReservationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setReservationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  //making sure form is filled before submission and we can not book in the past
  const validateForm = () => {
    const { date, startTime, endTime } = reservationData;
    if (!date || !startTime || !endTime) {
      alert("All fields are required.");
      return false;
    }
    const selectedDate = new Date(`${date}T${startTime}Z`);
    if (selectedDate < new Date()) {
      alert("Selected date and time are in the past.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) {
      alert("Please fill all fields correctly.");
      return;
    }

    const startTime = new Date(
      `${reservationData.date}T${reservationData.startTime}Z`
    );
    const endTime = new Date(
      `${reservationData.date}T${reservationData.endTime}Z`
    );
    
    
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    // Assuming amenities_id is correctly set to the amenity the user selected
    // Find the amenity ID based on the reservation type selected
  const amenityId = amenities?.find(
    a => a.text_id.toLowerCase() === reservationData.reservationType.toLowerCase()
  )?.id;

  if (!amenityId) {
    alert("Selected amenity is not available.");
    return;
  }


    try {
     
      if (!amenities) {
        return;
      }
      console.log(amenities);
      console.log(reservationData);
      // console.log(reservationType);
      const amenity = amenities.filter((a) =>
        a.description.startsWith(reservationData.reservationType)
      );
      console.log(amenity, "random string");
      const response = await fetch(
        `http://localhost:3000/makeReservation/${propertyId}/newReservation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          //This needs to be changed
          body: JSON.stringify({
            amenities_id: amenityId,
            start_date: startTime.toISOString(),
            end_date: endTime.toISOString(),
          }),
        }
      );
      console.log(response);
      if (response.ok) {
        const reservationDetails = await response.json();
        console.log("Reservation successful!", reservationDetails);
        alert("Reservation successful!");
        navigate("/MyReservations");
      } else {
        const errorResponse = await response.json();
        alert(`Failed to make a reservation: ${errorResponse.message}`);
      }
    } catch (error) {
      console.error("Error making a reservation:", error);
      alert("An error occurred while trying to make a reservation.");
    }
  };

  return (
    <>
      <Navbar />
      <Container
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card sx={{ minWidth: 275, maxWidth: 500, mb: 2 }}>
          <CardContent sx={{ p: 2 }}>
            <Typography
              variant="h5"
              component="div"
              gutterBottom
              sx={{ textAlign: "center", mb: 2 }}
            >
              Make a Reservation
            </Typography>
            <CardMedia
              component="img"
              image="https://accescondos.org/app/uploads/2016/09/fc6_persp_principale.jpg"
              alt="Reservation Type"
              sx={{ maxWidth: "100%", height: "auto", mb: 2 }}
            />
             {areAmenitiesAvailable ? (
            <Box
              component="form"
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
              sx={{ "& .MuiFormControl-root": { mb: 1 } }}
            >
              <FormControl fullWidth margin="normal" sx={{ mb: 2 }}>
                <TextField
                  name="date"
                  label="Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={reservationData.date}
                  onChange={handleChange}
                />
              </FormControl>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <FormControl fullWidth margin="normal" sx={{ width: "48%" }}>
                  <TextField
                    name="startTime"
                    label="From"
                    type="time"
                    InputLabelProps={{ shrink: true }}
                    value={reservationData.startTime}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl fullWidth margin="normal" sx={{ width: "48%" }}>
                  <TextField
                    name="endTime"
                    label="To"
                    type="time"
                    InputLabelProps={{ shrink: true }}
                    value={reservationData.endTime}
                    onChange={handleChange}
                  />
                </FormControl>
              </Box>
              <FormControl fullWidth margin="normal" sx={{ mb: 2 }}>
                <InputLabel id="reservation-type-label">
                  Reservation Type
                </InputLabel>
                <Select
                    labelId="reservation-type-label"
                    name="reservationType"
                    value={reservationData.reservationType}
                    onChange={handleSelectChange}
                    label="Reservation Type"
                  >
                    {amenities && amenities.map((amenity) => (
      <MenuItem key={amenity.id} value={amenity.text_id}>
        {amenity.text_id} {/* Assuming `text_id` is what you want to show */}
      </MenuItem>
    ))}
                  </Select>
              </FormControl>
              <Button variant="contained" type="submit" sx={{ mt: 2 }}>
                Submit
              </Button>
              </Box>
            ) : (
              <Alert severity="info">No amenities available for this property.</Alert>
            )}
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default ReservationUser;
