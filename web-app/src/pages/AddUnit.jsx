import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Box, Typography, TextField, Button } from '@mui/material';

const AddUnit = () => {
  
  // TODO: Get the company name dynamically
  const companyName = 'CoolCompany';

  const [unitData, setUnitData] = useState({
    unitId: '',
    squareUnits: '',
    parkingSpots: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUnitData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    // Add submit logic here
    console.log('Unit data submitted:', unitData);
    // Optionally, reset the form
    setUnitData({
      unitId: '',
      squareUnits: '',
      parkingSpots: '',
    });
  };

  return (
    <div>
      <Navbar />
      <Box mt={10} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h5" mb={4}>
          Add Unit
        </Typography>
        <form>
          <TextField
            fullWidth
            label="Unit ID"
            variant="outlined"
            name="unitId"
            value={unitData.unitId}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Number of Square Units"
            variant="outlined"
            name="squareUnits"
            value={unitData.squareUnits}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Number of Parking Spots"
            variant="outlined"
            name="parkingSpots"
            value={unitData.parkingSpots}
            onChange={handleChange}
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleSubmit} mt={2}>
            Submit
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default AddUnit;
