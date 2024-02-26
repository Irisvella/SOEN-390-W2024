import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Box, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const AddEmployee = () => {
  const [employeeData, setEmployeeData] = useState({
    firstName: '',
    lastName: '',
    role: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Implement logic to submit the employee data (e.g., send to the backend)
    console.log('Employee data submitted:', employeeData);
    // Reset the form
    setEmployeeData({
      firstName: '',
      lastName: '',
      role: '',
    });
  };

  return (
    <div>
      <Navbar />
      <Box mt={10} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h5" mb={4}>
          Add Employee
        </Typography>
        <form>
          <TextField
            fullWidth
            label="First Name"
            variant="outlined"
            name="firstName"
            value={employeeData.firstName}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Last Name"
            variant="outlined"
            name="lastName"
            value={employeeData.lastName}
            onChange={handleChange}
            margin="normal"
          />
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              label="Role"
              name="role"
              value={employeeData.role}
              onChange={handleChange}
            >
              <MenuItem value="management">Management</MenuItem>
              <MenuItem value="operations">Operations</MenuItem>
              <MenuItem value="finance">Finance</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleSubmit} mt={2}>
            Submit
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default AddEmployee;
