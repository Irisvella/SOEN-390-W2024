import React from 'react';
import Navbar from '../components/Navbar';
import { createTheme, ThemeProvider, CssBaseline, Typography, Container, TextField, Button, Grid, Paper } from '@mui/material';
import "../App.css";

const defaultTheme = createTheme();

const Contact = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <div className="home-background">
        <Navbar />
        <Container maxWidth="md" sx={{ pt: 8, pb: 6 }}>
          <Typography variant="h4" sx={{ mt: 4, mb: 4, textAlign: 'center', color: 'white' }}>
            Contact Us
          </Typography>
          <Paper elevation={3} sx={{ p: 3, bgcolor: 'white' }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" color="primary" gutterBottom>
                  Get in Touch
                </Typography>
                <form>
                  <TextField
                    required
                    id="name"
                    label="Name"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                  />
                  <TextField
                    required
                    id="email"
                    label="Email"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                  />
                  <TextField
                    id="message"
                    label="Message"
                    multiline
                    rows={4}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                  />
                  <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                    Send Message
                  </Button>
                </form>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" color="primary" gutterBottom>
                  Contact Information
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  EstateFlow Inc.
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  123 Condo Blvd, Suite 500
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  Montreal, QC H1H 1Z1
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  Phone: +1 555-0000
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  Email: contact@estateflow.com
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default Contact;
