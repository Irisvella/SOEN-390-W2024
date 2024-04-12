// Filename: employeesinfo.jsx
// Author: Sarah Abellard, Samuel Collette
// Description: Component for showing employee info
// Dependencies: React, MUI (Material-UI)
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';
import Navbar from '../components/Navbar';

const EmployeesInfo = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/employeeList', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setEmployees(data.employee_data.map(emp => ({ ...emp, id: emp.user_id }))); 
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const columns = [
    { field: 'user_id', headerName: 'Employee ID', width: 150 },
    { field: 'first_name', headerName: 'First Name', width: 150 },
    { field: 'last_name', headerName: 'Last Name', width: 150 },
    { field: 'role', headerName: 'Role', width: 150 },
    { field: 'phone_number', headerName: 'Phone Number', width: 150 },
  ];

  return (
    <div>
      <Navbar />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 12, mb: 10 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Employees Information
        </Typography>
        <Box sx={{ height: 400, width: '60%' }}>
          <DataGrid
            rows={employees}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </Box>
      </Box>
    </div>
  );
};

export default EmployeesInfo;