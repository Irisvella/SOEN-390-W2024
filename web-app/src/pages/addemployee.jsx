import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Box, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const AddEmployee = () => {
  
  // TODO: not hardcodded 
  const companyName = 'CoolCompany';

  const [employeeData, setEmployeeData] = useState({
    email: '',
    employee_id: '',
    company_id: '',
    role: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3000/add-employee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
      <Navbar />
      <Box mt={10} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h5" mb={4}>
          Add Employee
        </Typography>
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
