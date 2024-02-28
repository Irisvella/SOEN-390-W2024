
// LoginPage.js
import { SetStateAction, useState } from "react";
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import FitbitIcon from "@mui/icons-material/Fitbit";
import UserLoginForm from "../Authentication/UserLoginForm";
import CompanyLoginForm from "../Authentication/CompanyLoginForm";
import bgImage from '../../bg2.jpg';


const LoginPage = () => {
  const [role, setRole] = useState("");
  


  const handleRoleChange = (event: { target: { value: SetStateAction<string>; }; }) => {

    setRole(event.target.value);
  };
  

  return (
    <>
      <Navbar userName={undefined}/> {/* Render the Navbar component */}
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

         sx={{
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  borderRadius: '8px',
  padding: '0.9rem',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  width: '100%',
  maxWidth: '330px',
  margin: 'auto',
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
          <Avatar sx={{ m: 1, bgcolor: "salmon" }}>
            <FitbitIcon />
          </Avatar>

          <Typography variant="h5">Login</Typography>
          <Box sx={{ mt: 2 }}></Box>
          <div className="form-group">
            <label htmlFor="role">I am a: </label>
            <select name="role" onChange={handleRoleChange}>
              <option value="user">Public User</option>
              <option value="company">Company</option>
            </select>
          </div>

          {role === "company" ? <CompanyLoginForm /> : <UserLoginForm />}

          <Grid container justifyContent={"center"}>
            <Grid item>
              <Link to="/Signup">Don't have an account? Register</Link>
            </Grid>
          </Grid>

        </Box>
      </div>
    </>
  );
};

export default LoginPage;
