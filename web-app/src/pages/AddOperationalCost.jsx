// Filename: Billing.ts
// Author: Sarah Abellard
// Description: Form to add operational costs to database
// Dependencies: React, MUI (Material-UI)
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Alert from '@mui/material/Alert';

const AddOperationalCost = () => {
  const [operationalCostData, setOperationalCostData] = useState({
    propertyAddress: '',
    amount: '',
    description: '',
    date: ''
  });
  
  const [errors, setErrors] = useState({
    propertyAddress: false,
    amount: false,
    description: false,
    date: false,
    general: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOperationalCostData(prevData => ({
      ...prevData,
      [name]: value
    }));
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: !value,
      general: ''
    }));
  };

  const handleSubmit = async () => {
    const { propertyAddress, amount, description, date } = operationalCostData;
    if (!propertyAddress || !amount || !description || !date) {
      setErrors({
        propertyAddress: !propertyAddress,
        amount: !amount,
        description: !description,
        date: !date,
        general: 'Please fill in all fields.'
      });
      return;
    }

    fetch('https://estate-api-production.up.railway.app/billing/operational-costs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        propertyAddress,
        amount: Number(amount),
        description,
        date: new Date(date).toISOString()
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.message !== "success") {
        setErrors(prevErrors => ({
          ...prevErrors,
          general: data.message || 'Failed to add operational cost'
        }));
      } else {
        setOperationalCostData({
          propertyAddress: '',
          amount: '',
          description: '',
          date: ''
        });
        setErrors({
          propertyAddress: false,
          amount: false,
          description: false,
          date: false,
          general: 'Operational cost added successfully!'
        });
      }
    })
    .catch(error => {
      console.error('Failed to add operational cost:', error);
      setErrors(prevErrors => ({
        ...prevErrors,
        general: 'Failed to add operational cost'
      }));
    });
  };

  return (
    <div>
      <Navbar />
      <Box mt={10} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h6">Add Operational Cost</Typography>
        <Box mt={2} width="80%">
          {errors.general && (
            <Alert severity={errors.general.includes('successfully') ? 'success' : 'error'} sx={{ mb: 2 }}>
              {errors.general}
            </Alert>
          )}
          <FormControl fullWidth variant="outlined" error={errors.propertyAddress}>
            <TextField
              label="Property Address"
              variant="outlined"
              name="propertyAddress"
              value={operationalCostData.propertyAddress}
              onChange={handleChange}
              margin="normal"
            />
            {errors.propertyAddress && <FormHelperText>This field is required.</FormHelperText>}
          </FormControl>
          <FormControl fullWidth variant="outlined" error={errors.amount}>
            <TextField
              label="Amount"
              variant="outlined"
              name="amount"
              type="number"
              value={operationalCostData.amount}
              onChange={handleChange}
              margin="normal"
            />
            {errors.amount && <FormHelperText>Please enter a valid number.</FormHelperText>}
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
            {errors.description && <FormHelperText>This field is required.</FormHelperText>}
          </FormControl>
          <FormControl fullWidth variant="outlined" error={errors.date}>
            <TextField
              label="Due Date"
              type="date"
              variant="outlined"
              name="date"
              value={operationalCostData.date}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              margin="normal"
            />
            {errors.date && <FormHelperText>This field is required.</FormHelperText>}
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 3 }}>
            Submit
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default AddOperationalCost;
