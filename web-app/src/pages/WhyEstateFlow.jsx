import React from 'react';
import Navbar from '../components/Navbar';
import { createTheme, ThemeProvider, CssBaseline, Box, Typography, Container } from '@mui/material';
import "../App.css";

const defaultTheme = createTheme();

const WhyEstateFlow = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <div className="home-background" style={{ height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <Container maxWidth="md" style={{ overflowY: 'auto', flexGrow: 1 }}>
          <Typography variant="h4" style={{ marginTop: '20px', textAlign: 'center', color: 'white' }}>
            Why Choose EstateFlow?
          </Typography>
          <Box style={{ backgroundColor: 'white', padding: '20px', borderRadius: '4px', marginTop: '20px' }}>
            <Typography variant="h6" color="black">
              Streamlined Property Management
            </Typography>
            <Typography variant="body1" style={{ marginTop: '10px' }}>
              EstateFlow revolutionizes condominium management by offering a centralized dashboard that simplifies property oversight, financial administration, and community interaction. Our platform is designed to save time and reduce the complexity of managing properties.
            </Typography>

            <Typography variant="h6" color="black" style={{ marginTop: '20px' }}>
              User-Friendly Experience
            </Typography>
            <Typography variant="body1" style={{ marginTop: '10px' }}>
              With an intuitive interface and easy profile creation process, EstateFlow is built for every user, regardless of their tech savviness. This ensures a smooth transition from conventional systems to our comprehensive property management tool.
            </Typography>

            <Typography variant="h6" color="black" style={{ marginTop: '20px' }}>
              Real-Time Communications and Updates
            </Typography>
            <Typography variant="body1" style={{ marginTop: '10px' }}>
              Stay informed with real-time updates on property status, financial reports, and community news. Our in-app notifications and automated messaging keep everyone in the loop, fostering a vibrant, well-informed community.
            </Typography>

            <Typography variant="h6" color="black" style={{ marginTop: '20px' }}>
              Comprehensive Features
            </Typography>
            <Typography variant="body1" style={{ marginTop: '10px' }}>
              From reservation systems for amenities to integrated financial tools, EstateFlow handles all aspects of condo management. Our features are designed to be enabled or disabled based on specific needs, making it a flexible solution for any property size.
            </Typography>

            <Typography variant="h6" color="black" style={{ marginTop: '20px' }}>
              Mobile and Cross-Platform Accessibility
            </Typography>
            <Typography variant="body1" style={{ marginTop: '10px' }}>
              Access EstateFlow anytime, anywhere. Our platform is accessible on Android, iOS, Linux, MacOS, and Windows, ensuring you can manage your property from the office, home, or on the go.
            </Typography>

            <Typography variant="h6" color="black" style={{ marginTop: '20px' }}>
              Committed to Security and Privacy
            </Typography>
            <Typography variant="body1" style={{ marginTop: '10px' }}>
              Your security is our top priority. EstateFlow employs advanced security measures to protect your data, adhering to the strictest data protection regulations.
            </Typography>
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default WhyEstateFlow;
