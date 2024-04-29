import React from 'react';
import Navbar from '../components/Navbar';
import { createTheme, ThemeProvider, CssBaseline, Box, Typography, Container, Grid } from '@mui/material';
import "../App.css";

const defaultTheme = createTheme({
  typography: {
    allVariants: {
      fontWeight: 'bold' // This will make the font of all text elements thicker
    }
  }
});

const FeatureBox = ({ title, description, icon }) => (
  <Box sx={{
    padding: 2,
    border: '2px solid orange',
    borderRadius: '4px',
    backgroundColor: 'white', // Set the background to white
    flexGrow: 1,
    margin: 1,
    boxShadow: '0 4px 6px rgba(128, 128, 128, 0.6)',
    '&:hover': {
      boxShadow: '0 6px 8px rgba(128, 128, 128, 0.8)',
      borderColor: 'darkorange',
    },
    transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    height: '100%',
  }}>
    <Typography variant="h6" component="div" sx={{ mt: 1 }}>
      {title}
    </Typography>
    {icon}
    <Typography variant="body1" component="div" sx={{ my: 2 }}>
      {description}
    </Typography>
  </Box>
);

const Features = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <div className="home-background">
        <Navbar />
        <Container maxWidth="lg" sx={{ pt: 8 }}>
          <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', color: 'white' }}>
            Our Features
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <FeatureBox
                title="Property Dashboard"
                description="Overview of all property details, status updates, and more."
                
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FeatureBox
                title="Financial System Integration"
                description="Manage billing, expenses, and financial reports efficiently."
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FeatureBox
                title="Reservation System"
                description="Book facilities and services with an easy-to-use interface."
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FeatureBox
                title="Request Management"
                description="Handle and track maintenance and service requests."
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FeatureBox
                title="Profile Management"
                description="Manage user profiles and access control."
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FeatureBox
                title="Community Engagement"
                description="Engage with the community through forums and notifications."
              />
            </Grid>
          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default Features;
