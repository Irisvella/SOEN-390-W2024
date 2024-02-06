import React, { useState } from 'react';
import { Container, CssBaseline, Box, Avatar, Typography } from "@mui/material";
import FitbitIcon from '@mui/icons-material/Fitbit';
import UserSignupForm from '../Authentication/UserSignupForm';
import CompanySignupForm from '../Authentication/CompanySignupForm';
import Navbar from '../Navbar'; 
import bgImage from '../../bg2.jpg'; 
import "../../App.css"; 

const SignUp = () => {
  const [role, setRole] = useState("");

  const handleChangeRole = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(event.target.value);
  };

  return (
    <>
      <Navbar /> {/* Include the Navbar */}
      <div style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Container maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '8px',
              padding: '2rem',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              maxWidth: '300px', // Adjust this value to make the box smaller
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mt: -25,
              mb:-40, // Adjust marginTop to move the box up
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "salmon" }}>
              <FitbitIcon />
            </Avatar>
            <Typography variant="h5">Sign Up</Typography>
            <div className="form-group">
              <label htmlFor="role">I am a:</label>
              <select name="role" onChange={handleChangeRole} className="role-select">
                <option value="user">Public User</option>
                <option value="company">Company</option>
              </select>
            </div>
            {role === "company" ? <CompanySignupForm /> : <UserSignupForm />}
          </Box>
        </Container>
      </div>
    </>
  );
};

export default SignUp;
