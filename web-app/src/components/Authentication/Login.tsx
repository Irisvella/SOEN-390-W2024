import React, { useState } from 'react';
import { Container, CssBaseline, Box, Avatar, Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import FitbitIcon from '@mui/icons-material/Fitbit';
import UserLoginForm from '../Authentication/UserLoginForm';
import CompanyLoginForm from '../Authentication/CompanyLoginForm';
import Navbar from '../Navbar'; 
import "../../App.css";
import bgImage from '../../bg2.jpg';

const LoginPage = () => {
  const [role, setRole] = useState("");
  

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(event.target.value);
  };
  

  return (
    <>
      <Navbar /> {/* Render the Navbar component */}
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
        <Box
  className="login-form-container"
  sx={{
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '8px',
    padding: '0.9rem',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '330px', // This will apply to all screen sizes
    width: '100%', // This will apply to all screen sizes
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    mt: {
      xs: 5, // Margin top on xs screens
      sm: 10, // Margin top on sm screens, you can adjust the value as needed
    },
    '@media screen and (max-width: 480px)': {
      maxWidth: '88%', // Override maxWidth for very small screens
      mt: -18, // Adjust marginTop for very small screens
    },
  }}
>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' , marginTop:'20px'}}>
            <Avatar sx={{ bgcolor: "salmon" }}>
              <FitbitIcon />
            </Avatar>
            <Typography variant="h5" component="h1" sx={{ marginLeft: '10px', }}>Login</Typography>
          </Box>

          <Box component="form" sx={{ mt: 0, width: '100%' }}>
            {/* The form fields and buttons go here */}
            <div className="form-group">
  <label htmlFor="role" style={{ marginLeft: '5px' }}>
    Sign In As&nbsp;
    <select name="role" onChange={handleRoleChange} className="role-select">
      <option value="user">Individual</option>
      <option value="company">Company/Business</option>
    </select>
  </label>
</div>

           

            {role === "company" ? <CompanyLoginForm /> : <UserLoginForm />}
            <Grid container justifyContent={"center"}>
  <Grid item>
    <Link to="/Signup" className="link-signup">Don't have an account? Register</Link>
  </Grid>
</Grid>

          </Box>
        </Box>
      </div>
    </>
  );
};

export default LoginPage;
