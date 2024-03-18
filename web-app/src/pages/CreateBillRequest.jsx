import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Box, Typography, TextField, Button, Grid } from '@mui/material';

const CreateBillRequest = () => {
  
  const [unitInfo, setUnitInfo] = useState({
    squareFootage: 0,
    parkingSpaces: 0,
  });

  const [unitProperties, setUnitProperties] = useState({
    pricePerSquareFoot: 0,
    pricePerParking: 0,
  });

  const [billData, setBillData] = useState({
    unitId: '',
    propertyAddress: '',
    totalPrice: 0,
    date: '',
  });

  const [showBillInfo, setShowBillInfo] = useState(false);
  const [inputError, setInputError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBillData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleGenerateInfo = async () => {
    if (billData.unitId === '' || billData.propertyAddress === '') {
      setInputError('Please fill in both Unit ID and Property Address.');
      return;
    }

    // Simulate fetching unit info and properties based on unit ID
    // Replace this with your actual fetch logic
    setUnitInfo({
      squareFootage: 1000,
      parkingSpaces: 2,
    });
    setUnitProperties({
      pricePerSquareFoot: 5,
      pricePerParking: 10,
    });
    setShowBillInfo(true);
    setInputError('');
  };

  const handleCalculateTotalPrice = () => {
    const totalPrice = (unitInfo.squareFootage * unitProperties.pricePerSquareFoot) + (unitInfo.parkingSpaces * unitProperties.pricePerParking);
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
      propertyAddress: '',
      totalPrice: 0,
      date: '',
    });
    setShowBillInfo(false);
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
            label="Property Address"
            variant="outlined"
            name="propertyAddress"
            value={billData.propertyAddress}
            onChange={handleChange}
            margin="normal"
          />
          {inputError && (
            <Typography variant="body2" color="error" mb={2}>
              {inputError}
            </Typography>
          )}
          <Button variant="contained" color="primary" onClick={handleGenerateInfo} mt={2}>
            Generate Info
          </Button>
          {showBillInfo && (
            <>
              <Typography variant="h6" mt={2}>
                Unit Square Footage: {unitInfo.squareFootage}
              </Typography>
              <Typography variant="h6">
                Number of Parking Spaces: {unitInfo.parkingSpaces}
              </Typography>
              <Typography variant="h6">
                Price per Square Foot: ${unitProperties.pricePerSquareFoot}
              </Typography>
              <Typography variant="h6">
                Price per Parking Space: ${unitProperties.pricePerParking}
              </Typography>
              <Grid container spacing={2} mt={2}>
                <Grid item>
                  <Button variant="contained" color="primary" onClick={handleCalculateTotalPrice}>
                    Calculate Total Price
                  </Button>
                </Grid>
                <Grid item>
                  <Typography variant="h6">
                    Total Price: ${billData.totalPrice}
                  </Typography>
                </Grid>
              </Grid>
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
            </>
          )}
        </form>
      </Box>
    </div>
  );
};

export default CreateBillRequest;
