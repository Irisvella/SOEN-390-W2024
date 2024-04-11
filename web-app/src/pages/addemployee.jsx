// Filename: addEmployee.jsx
// Author: Sarah Abellard, Samuel Collette, Abisan 
// Description: Component for adding new employees to the system.
// Dependencies: React, MUI (Material-UI)
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Box, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const AddEmployee = () => {
    // State for employee data
  const [employeeData, setEmployeeData] = useState({
    email: '',
    role: '',
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Submit form data
  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:3000/add-employee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(employeeData),
      });

      if (response.ok) {
        console.log('Employee data submitted successfully');
        // Optionally, reset the form
        setEmployeeData({
          email: '',
          employee_id: '',
          company_id: '',
          role: '',
        });
      } else {
        console.error('Failed to submit employee data');
      }
    } catch (error) {
      console.error('Error submitting employee data:', error);
    }
  };

  return (
    <div>
      <Navbar/>
      <Box mt={10} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h5" mb={4}>
          Add Employee
        </Typography>
        {/* Form for adding employee */}
        <form>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            name="email"
            value={employeeData.email}
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
              <MenuItem value="manager">Manager</MenuItem>
              <MenuItem value="operations">Operations</MenuItem>
              <MenuItem value="finance">Finance</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
          {/* Button to submit employee data */}
          <Button variant="contained" color="primary" onClick={handleSubmit} mt={2}>
            Submit
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default AddEmployee;
