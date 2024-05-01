import { useState, ChangeEvent, FormEvent } from "react";
//import { useEffect } from "react";
import {
  SelectChangeEvent,
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


function ReservationUser() {
  const navigate = useNavigate();
  //const { property_id } = useParams();
  const [reservationData, setReservationData] = useState({
    date: "",
    startTime: "",
    endTime: "",
    reservationType: "", // Default should be empty to force a selection
  });

  const { propertyId } = useParams();

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

  //This make sure we enter all fields before being able to reserve 

  const validateForm = () => {
    const { date, startTime, endTime } = reservationData;
    if (!date || !startTime || !endTime) {
      console.log("All fields are required.");
      return false;
    }
    const selectedDate = new Date(`${date}T${startTime}`);
    if (selectedDate < new Date()) {
      console.log("Selected date and time are in the past.");
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
    
    const startTime = new Date(`${reservationData.date}T${reservationData.startTime}`);
    const endTime = new Date(`${reservationData.date}T${reservationData.endTime}`);

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/${propertyId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amenities_id: reservationData.reservationType, // Assuming this maps correctly to an ID
          start_date: startTime.toISOString(),
          end_date: endTime.toISOString(),
        
        }),
      });

      if (response.ok) {
        const reservationDetails = await response.json();
        console.log("Reservation successful!", reservationDetails);
        alert("Reservation successful!");
        navigate("/dashboard"); // Navigate to a confirmation page or dashboard
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
                <InputLabel id="reservation-type-label">Reservation Type</InputLabel>
                <Select
                  labelId="reservation-type-label"
                  name="reservationType"
                  value={reservationData.reservationType}
                  onChange={handleSelectChange}
                  label="Reservation Type"
                >
                  <MenuItem value="spa">Spa</MenuItem>
                  <MenuItem value="skylounge">Sky Lounge</MenuItem>
                  <MenuItem value="gym">Gym</MenuItem>
                  {/* Add other reservation types as MenuItems here */}
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
