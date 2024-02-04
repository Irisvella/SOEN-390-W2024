import React from 'react';
import { AppBar, Box, Container, CssBaseline, Toolbar, Typography, IconButton, Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const ProfileDash = () => {
  // Assuming username can be fetched or passed as props
  const username = "User"; // Placeholder username

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <AppBar position="static" color="primary" elevation={0} sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
          <Toolbar sx={{ flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <Typography variant="h6" color="inherit" noWrap>
              EstateFlow
            </Typography>
            <IconButton sx={{ p: 0 }}>
              <Avatar sx={{ bgcolor: "salmon" }}><AccountCircleIcon /></Avatar>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            mt: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h4" gutterBottom>
            Welcome, {username}
          </Typography>
          <Typography variant="h6">
            This is your dashboard
          </Typography>
          {/* Additional user info and actions can be added here */}
        </Box>
      </Container>
    </>
  );
};

export default ProfileDash;
