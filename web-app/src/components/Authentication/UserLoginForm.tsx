import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
const UserLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
  
    try {
      // Replace 'http://localhost:3000' with actual backend endpoint
      const response = await fetch('http://localhost:3000/login',  {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // need to fix role param
        body: JSON.stringify({ email, password, role: 'publicUser' }), 
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Login successful', data);
        // Store the token in localStorage or context for future requests ??
        // localStorage.setItem('token', data.token);
        window.location.href = '/ProfileDash';
      } else {
        console.error('Login failed:', data.message);
        alert(data.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred. Please try again.');
    }
  };
  

  return (
    <Box sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoFocus
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        margin="normal"
        required
        fullWidth
        id="password"
        name="password"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        fullWidth
        variant="outlined"
        color="warning"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleLogin}
      >
        Login
      </Button>
    </Box>
  );
};

export default UserLoginForm;
