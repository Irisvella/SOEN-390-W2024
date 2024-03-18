import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Box, Typography, TextField, Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const AddUnit = () => {
  const [unitData, setUnitData] = useState({
    squareUnits: '',
    parkingSpots: '',
  });

  const [errors, setErrors] = useState({
    squareUnits: false,
    parkingSpots: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUnitData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Validation: Check if input is a number
    if (!isNaN(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: false,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: true,
      }));
    }
  };

  const handleFileChange = (e) => {
    // Handle file change here
    console.log(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if there are any errors before submitting
    if (!errors.squareUnits && !errors.parkingSpots) {
      // Add submit logic here
      console.log('Unit data submitted:', unitData);
      // Optionally, reset the form
      setUnitData({
        squareUnits: '',
        parkingSpots: '',
      });
    } else {
      console.log('Please correct the input errors');
    }
  };

  return (
    <div>
      <Navbar />
      <Box mt={10} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h5" mb={4}>
          Add Unit
        </Typography>

      {/* This doesnt work but will be implemented later*/}
        <form onSubmit={handleSubmit}>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Upload picture
            <input
              type="file"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </Button>
          <TextField
            fullWidth
            label="Number of Square Units"
            variant="outlined"
            name="squareUnits"
            value={unitData.squareUnits}
            onChange={handleChange}
            margin="normal"
            error={errors.squareUnits}
            helperText={errors.squareUnits ? 'Please enter a valid number' : ''}
          />
          <TextField
            fullWidth
            label="Number of Parking Spots"
            variant="outlined"
            name="parkingSpots"
            value={unitData.parkingSpots}
            onChange={handleChange}
            margin="normal"
            error={errors.parkingSpots}
            helperText={errors.parkingSpots ? 'Please enter a valid number' : ''}
          />
          <Button type="submit" variant="contained" color="primary" mt={2}>
            Submit
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default AddUnit;
