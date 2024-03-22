import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';





const AddOperationalCost = () => {
  const [operationalCostData, setOperationalCostData] = useState({
    propertyAddress: '',
    amount: '',
    description: '',
    date: null, // Add date field to state
  });
  

  const [errors, setErrors] = useState({
    propertyAddress: false,
    amount: false,
    description: false,
    propertyNotFound: false, // New state for property not found error
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOperationalCostData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value ? false : true,
      propertyNotFound: false, // Reset property not found error when input changes
    }));
  };

  const handleDateChange = (date) => {
    setOperationalCostData((prevData) => ({
      ...prevData,
      date: date,
    }));
  };
  

  const handleSubmit = () => {
    if (!operationalCostData.propertyAddress || !operationalCostData.amount || !operationalCostData.description) {
      setErrors({
        propertyAddress: !operationalCostData.propertyAddress,
        amount: !operationalCostData.amount,
        description: !operationalCostData.description,
        propertyNotFound: false, // Reset property not found error if other errors are present
      });
      return;
    }
    if (isNaN(operationalCostData.amount)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        amount: true,
        propertyNotFound: false, // Reset property not found error if other errors are present
      }));
      return;
    }
    // Check if the property exists (You need to implement this logic)
    const propertyExists = checkPropertyExists(operationalCostData.propertyAddress); // Implement this function
    if (!propertyExists) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        propertyNotFound: true,
      }));
      return;
    }
    // Add your submit logic here
    console.log('Operational cost data submitted:', operationalCostData);
    // Optionally, reset the form
    setOperationalCostData({
      propertyAddress: '',
      amount: '',
      description: '',
    });
    setErrors({
      propertyAddress: false,
      amount: false,
      description: false,
      propertyNotFound: false,
    });
  };

  const checkPropertyExists = (propertyAddress) => {
    // You need to implement the logic to check if the property exists based on the given property address
    // This can be an API call or checking in a local database
    // For now, let's assume the property always exists
    return true;
  };

  return (
    <div>
      <Navbar />
      <Box mt={10} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h6">
          Add Operational Cost
        </Typography>
        <Box mt={2} width="80%">
          <FormControl fullWidth variant="outlined" error={errors.propertyAddress}>
            <TextField
              label="Property Address"
              variant="outlined"
              name="propertyAddress"
              value={operationalCostData.propertyAddress}
              onChange={handleChange}
              margin="normal"
            />
            {errors.propertyAddress && <FormHelperText>This field is required</FormHelperText>}
          </FormControl>
          <FormControl fullWidth variant="outlined" error={errors.amount}>
            <TextField
              label="Amount"
              variant="outlined"
              name="amount"
              value={operationalCostData.amount}
              onChange={handleChange}
              margin="normal"
            />
            {errors.amount && <FormHelperText>Please enter a valid number</FormHelperText>}
          </FormControl>
          <FormControl fullWidth variant="outlined" error={errors.description}>
            <TextField
              label="Description"
              variant="outlined"
              name="description"
              value={operationalCostData.description}
              onChange={handleChange}
              margin="normal"
            />
            {errors.description && <FormHelperText>This field is required</FormHelperText>}
          </FormControl>
          {errors.propertyNotFound && (
            <Typography variant="body2" color="error">
              Property not found. Please check the address.
            </Typography>
          )}
        <FormControl fullWidth variant="outlined" margin="normal" error={errors.date}>
        <TextField
          label="Due Date"
          type="date"
          variant="outlined"
          name="date"
          value={operationalCostData.date}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        {errors.date && <FormHelperText>This field is required</FormHelperText>}
      </FormControl>




          <Button variant="contained" color="primary" onClick={handleSubmit} mt={2}>
            Submit
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default AddOperationalCost;

