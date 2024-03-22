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
import Navbar from "../Navbar";

const LoginPage = () => {
  const [role, setRole] = useState("");

  const handleRoleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setRole(event.target.value);
  };

  return (
    <>
      <Container maxWidth="xs">
        <CssBaseline />
        <Navbar />
        <Box
          sx={{
            mt: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "salmon" }}>
            <FitbitIcon />
          </Avatar>

          <Typography variant="h5">Login</Typography>
          <Box sx={{ mt: 2 }}></Box>
          <div className="form-group">
            <label htmlFor="role">I am a: </label>
            <select id="role" name="role" onChange={handleRoleChange}>
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
      </Container>
    </>
  );
};

export default LoginPage;
