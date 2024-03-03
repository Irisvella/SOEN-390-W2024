
import  { useState } from 'react';
import { TextField, Button, Box, Typography } from "@mui/material";



const CompanyLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [failMessage, setFailMessage] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validateEmail = (email: string) => emailRegex.test(email);

  const handleLogin = async () => {
  
    try {
      // Replace 'http://localhost:3000' with actual backend endpoint
      const response = await fetch('http://localhost:3000/login',  {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role: 'company' }), 
      });
  
      const data = await response.json();
  
      if (response.ok && data.token) {
        localStorage.setItem('token', data.token);
        window.location.href = '/ManagementLanding';
      } else {
        console.error('Login failed:', data.message);
        setFailMessage(data.message || 'An error occurred. Please try again.');}
    } catch (error) {
      console.error('Login error:', error);
      setFailMessage('An error occurred. Please try again.');}

  };
  

  return (

    <Box sx={{ mt: 1 }}>
       {failMessage && (
            <Typography color="error" textAlign="center">
              {failMessage}
            </Typography>
          )}

      <TextField
       className="form-field"
        margin="normal"
        required
        fullWidth
        id="company-email"
        label="Email Address"
        name="email"
        autoFocus
        error={!validateEmail(email) && email.length > 0}
        helperText={!validateEmail(email) && email.length > 0 ? "Invalid email format" : ""}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ marginBottom: '0px' }}
      />

      <TextField
       className="form-field"
        margin="normal"
        required
        fullWidth
        id="company-password"
        name="password"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ marginBottom: '15px' }}
      />


      <Button
        fullWidth
        variant="outlined"
        color="warning"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleLogin}
        disabled={!validateEmail(email) || !password}

      >
        Login
      </Button>

    </Box>
  );
};

export default CompanyLoginForm;
