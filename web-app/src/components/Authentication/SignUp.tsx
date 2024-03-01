// SignUpPage.js
import  { SetStateAction, useState } from 'react';
import { Container, CssBaseline, Box, Avatar, Typography } from "@mui/material";
import FitbitIcon from '@mui/icons-material/Fitbit';
import UserSignupForm from '../Authentication/UserSignupForm';
import CompanySignupForm from '../Authentication/CompanySignupForm';

const SignUp = () => {
  const [role, setRole] = useState("");

  const handleChangeRole = (event: { target: { value: SetStateAction<string>; }; }) => {
    setRole(event.target.value);
  };

  return (
    <>
      <Container maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            mt: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 2, bgcolor: "salmon" }}>
            <FitbitIcon />
          </Avatar>
          
          <Typography variant="h5">EstateFlow</Typography>
          <Box sx={{ mt: 2 }}></Box>
          <div className="form-group">
            <label htmlFor="role">I am a: </label>
            <select name="role" onChange={handleChangeRole}>
              <option value="user">Public User</option>
              <option value="company">Company</option>
            </select>
          </div>
          <Box sx={{ mt: 3 }}></Box>
          {role === "company" ? <CompanySignupForm /> : <UserSignupForm />}
        </Box>
      </Container>
    </>
  );
};

export default SignUp;
