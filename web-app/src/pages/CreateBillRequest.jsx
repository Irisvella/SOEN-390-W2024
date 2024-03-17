import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const CreateBillRequest = () => {
  
  // TODO: Fetch unit properties and unit info
  const [unitProperties, setUnitProperties] = useState({
    pricePerSquareFoot: 0,
    pricePerParking: 0,
  });
  
  const [unitInfo, setUnitInfo] = useState({
    squareFootage: 0,
    parkingSpaces: 0,
  });

  useEffect(() => {
    // Fetch unit properties and unit info based on unit id
    // Example fetchUnitData(unitId)
    // Update unitProperties and unitInfo states accordingly
  }, []); // Run once on component mount

  const [billData, setBillData] = useState({
    unitId: '',
    priceOfSquareFootage: 0,
    priceOfParking: 0,
    totalPrice: 0,
    date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBillData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCalculateTotalPrice = () => {
    const totalPrice = (billData.priceOfSquareFootage * unitInfo.squareFootage) + (billData.priceOfParking * unitInfo.parkingSpaces);
    setBillData((prevData) => ({
      ...prevData,
      totalPrice: totalPrice,
    }));
  };

  const handleSubmit = async () => {
    // Add your submit logic here
    console.log('Bill data submitted:', billData);
    // Optionally, reset the form
    setBillData({
      unitId: '',
      priceOfSquareFootage: 0,
      priceOfParking: 0,
      totalPrice: 0,
      date: '',
    });
  };

  return (
    <div>
      <Navbar userName="Your Company" />
      <Box mt={10} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h5" mb={4}>
          Create Bill Request
        </Typography>
        <form>
          <TextField
            fullWidth
            label="Unit ID"
            variant="outlined"
            name="unitId"
            value={billData.unitId}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Price of Square Footage"
            variant="outlined"
            name="priceOfSquareFootage"
            value={billData.priceOfSquareFootage}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Price of Parking"
            variant="outlined"
            name="priceOfParking"
            value={billData.priceOfParking}
            onChange={handleChange}
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleCalculateTotalPrice} mt={2}>
            Calculate Total Price
          </Button>
          <Typography variant="h6" mt={2}>
            Total Price: ${billData.totalPrice}
          </Typography>
          <TextField
            fullWidth
            label="Date"
            type="date"
            variant="outlined"
            name="date"
            value={billData.date}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button variant="contained" color="primary" onClick={handleSubmit} mt={2}>
            Submit
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default CreateBillRequest;
