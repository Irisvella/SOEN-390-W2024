// Filename: UserLanding.jsx
// Author: Ziyi Wang, Sarah Abellard
// Description: Landing page for the public-user
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

const UserLanding = () => {
  // Define navigation items with associated routes
  const navigationItems = {
    'Owned Condos': '/dashboard-user',
    'View Bills': '/UserBills',
    'My Request': '/UserRequests',
    'My Reservation': '/',
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
                height: 500,
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                padding: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
                <Typography variant="h4" sx={{ mb: 4 }}>
                  Welcome to User Landing!
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <SectionBox title="Owned Condos" route = "/dashboard-user">
                      Owned condos with request handling and financial information
                      <ArrowForwardIosIcon /> 
                    </SectionBox>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <SectionBox title="View Bills" route = "/UserBills">
                      Pay the bills and view your payment history

                      <ArrowForwardIosIcon /> 
                    </SectionBox>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <SectionBox title="My Requests" route = "/UserRequests">
                      To view your existing requests

                      <ArrowForwardIosIcon /> 
                    </SectionBox>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <SectionBox title="My Reservations" route = "">
                      To view your existing reservations

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

export default UserLanding;
