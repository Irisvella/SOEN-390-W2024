// UserForm.js
import { useState } from "react";
import { Link } from "react-router-dom";
import { Grid, TextField, Button } from "@mui/material";

const CompanySignupForm = () => {
  // You can include useState hooks here if needed for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [compagnyName, setCompagnyName] = useState("");
  const [address, setAddress] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Process form data here (e.g., send it to a server)
  };
  const handleRegister = async () => {};

  return (
    <form onSubmit={handleSubmit}>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          name="compagnyName"
          required
          fullWidth
          id="compagnyName"
          label="Company Name"
          autoFocus
          value={compagnyName}
          onChange={(e) => setCompagnyName(e.target.value)}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          id="phone"
          label="Phone number"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
      <TextField
          required
          fullWidth
          id="address"
          label="Address"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

     
      </Grid>

      
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        </Grid>
        <Grid item xs={12}>
        <TextField
          required
          fullWidth
          name="confirmPassword"
          label="confirmPassword"
          type="confirmPassword"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </Grid>
      
    </Grid>
    



    <Button
      fullWidth
      variant="outlined" 
      color="warning"
      sx={{ mt: 3, mb: 2 }}
      onClick={handleRegister}
       
    >
      Register
    </Button>
    <Grid container justifyContent="center">
      <Grid item>
        <Link to="/login">Already have an account? Login</Link>
      </Grid>
    </Grid>

    </form>
  );
};

export default CompanySignupForm;
