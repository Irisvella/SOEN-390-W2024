// Filename: ManagementLanding.jsx
// Author: Ziyi Wang
// Description: Landing page for the company
// Dependencies: React, MUI (Material-UI)

import React from 'react';
import Navbar from '../components/Navbar';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Box,
  Typography,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  CardActionArea,

} from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link for navigation
import "../App.css";

const defaultTheme = createTheme({});

const SectionBox = ({ title, children, route }) => (
  
    <Box sx={{
      padding: 2,
      border: '2px solid orange',
      borderRadius: '4px',
      flexGrow: 1,
      margin: 1,
      boxShadow: '0 4px 6px rgba(128, 128, 128, 0.6)',
      '&:hover': {
        boxShadow: '0 6px 8px rgba(128, 128, 128, 0.8)',
        borderColor: 'darkorange',
      },
      transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
    }}>
      <CardActionArea component={Link} to={route} style={{ width: '100%', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom component="div">
        {title}
      </Typography>
      <Divider />
      <Typography variant="body1" component="div" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
        {children}
      </Typography>
      </CardActionArea>
    </Box>
 
);

const ManagementLanding = () => {
  // Define navigation items with associated routes
  const navigationItems = {
    'Property Dashboard': '/dashboard-company',
    'Manage Condo Listing': '/CreateListingPage',
    'Financial System': '/ManagementFinancialOverView',
    'Reservation System': '/reservation-system',
    'Employees': '/Employeesinfo',
    'Requests': '/RequestManagementTable',
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <div className="home-background">
        <Navbar />
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          minHeight: 'calc(100vh - 64px)',
          paddingTop: '80px',
        }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
          }}>
            {/* Navigation Menu */}
            <Box sx={{
              width: 250,
              height: 'fit-content',
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              padding: 2,
              alignSelf: 'start',
            }}>
              <Typography variant="h6" sx={{ my: 2, ml: 1, color: 'orange' }}>
                Navigation
              </Typography>
              <List>
                {Object.entries(navigationItems).map(([text, route]) => (
                  <ListItem button key={text} component={Link} to={route}>
                    <ListItemText primary={text} /> {/* For each element on the Nav menu, direct to the according page*/}
                  </ListItem>
                ))}
              </List>
            </Box>
            {/* Main Content */}
            <Container maxWidth="md">
              <Box sx={{
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                padding: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
                <Typography variant="h4" sx={{ mb: 4 }}>
                  Welcome, Condo Management User!
                </Typography>
                <Grid container spacing={3}>
                  {/* Use SectionBox with a route prop */}
                  <Grid item xs={12} sm={6}>
                    <SectionBox title="Property Dashboard" route = "/dashboard-company">
                      Owned properties with employee list and request management features
                      <ArrowForwardIosIcon /> 
                    </SectionBox>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <SectionBox title="Manage Condo Listing" route = "/CreateListingPage">
                      Here you can manage and access condo-related documents and files
                      <ArrowForwardIosIcon /> 
                    </SectionBox>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <SectionBox title="Financial System" route = "/ManagementFinancialOverView">
                      Overview of financial operations, such as billing, and payments
                      <ArrowForwardIosIcon /> 
                    </SectionBox>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <SectionBox title="Reservation System" route = "">
                      Residents can book amenities and services available in the condo.
                      <ArrowForwardIosIcon /> 
                    </SectionBox>
                  </Grid>
                </Grid>
              </Box>
            </Container>
          </Box>
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default ManagementLanding;
