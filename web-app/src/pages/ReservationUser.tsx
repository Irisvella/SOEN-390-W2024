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
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { SelectChangeEvent } from "@mui/material";

function ReservationUser() {
  const navigate = useNavigate();
  const { propertyId } = useParams();
  const [amenities, setAmenities] = useState<any[]>();

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
          // console.log(amenities[1], "amenities");
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
    const amenityId = amenities?.find(
      (a) =>
        a.text_id.toLowerCase() ===
        reservationData.reservationType.toLowerCase()
    )?.id;
    if (!amenityId) {
      alert("Selected amenity is not available.");
      return;
    }

    try {
      console.log(reservationData);
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
        navigate("/dashboard");
      } else {
        alert("Failed to make a reservation. Please try another time slot.");
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
                  <MenuItem value="Spa">Spa</MenuItem>
                  <MenuItem value="Sky Lounge">Sky Lounge</MenuItem>
                  <MenuItem value="gym">Gym</MenuItem>
                </Select>
              </FormControl>
              <Button variant="contained" type="submit" sx={{ mt: 2 }}>
                Submit
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default ReservationUser;
