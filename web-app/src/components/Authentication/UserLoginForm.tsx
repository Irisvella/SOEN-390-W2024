// UserLoginForm.js
import  { useState } from 'react';
import { TextField, Button, Box } from "@mui/material";
import "../../App.css";

const UserLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Implement user login logic here
  };

  return (
    <Box sx={{ mt: 0 }}>
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
        sx={{ marginBottom: '0px' }}
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
        sx={{ marginBottom: '15px' }}
      />

<Button
  fullWidth
  variant="outlined"
  color="warning"
  sx={{
    mt: 0, 
    mb: 0,
    borderColor: 'salmon', // Default border color
    '&:hover': {
      backgroundColor: 'salmon', // Fill the button with salmon color on hover
      color: '#fff', // Change text color to white on hover
      borderColor: 'salmon', // Maintain salmon border on hover
    }
  }}
  onClick={handleLogin}
>
  Login
</Button>

    </Box>
  );
};

export default UserLoginForm;
