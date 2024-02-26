import React from 'react';
import Navbar from '../components/Navbar';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import sampleAddressImage from '../assets/images/sampleproperty.png';
import { Typography } from '@mui/material';

/*sample data*/
const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
      editable: true,
    },
    {
        field: 'role',
        headerName: 'Role',
        width: 150,
        editable: true,
      },
  ];

  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', role: 'Finance'},
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', role: 'Management'},
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', role: 'Events'},
    { id: 4, lastName: 'Stark', firstName: 'Arya', role: 'Finance'},
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', role: 'Events'},
    { id: 6, lastName: 'Melisandre', firstName: 'Sarah', role: 'Events'},
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara',role: 'Management'},
    { id: 8, lastName: 'Frances', firstName: 'Rossini', role: 'Finance'},
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', role: 'Events'},
  ];

  const Employeesinfo = () => {
    return (
      <div>
        <Navbar />
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
          <Grid item xs={12} textAlign="center">
            {/* Image and DataGrid in the middle */}
            <Box mt={10}>
              <img src={sampleAddressImage} alt="Sample Address" style={{ width: '40%', height: 'auto', margin: 'auto' }} />
              <Typography variant="h6" mt={2}>22 forest hill drive</Typography>
              <Box mt={2}>
                <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </div>
    );
  };
  

export default Employeesinfo;
