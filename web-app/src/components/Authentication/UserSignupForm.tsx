import { useState } from "react";
import { Link } from "react-router-dom";
import { Grid, TextField, Button } from "@mui/material";


const UserSignupForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
 
  const handleRegister = async () => {
    if (!email || !password || !username || !phone || !confirmPassword) {
      alert("Please fill the required fields");
      return;
    }
  
    try {
      // Replace 'http://localhost:3000' with actual backend endpoint
      const response = await fetch('http://localhost:3000/signup/public-user',  {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // need to fix role param
        body: JSON.stringify({ username, email, password, phone}), 
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Signup successful', data);
    
        window.location.href = '/Login';
      } else {
        console.error('Signup failed:', data.message);
        alert(data.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <form onSubmit={handleRegister}>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          name="username"
          required
          fullWidth
          id="username"
          label="Username"
          autoFocus
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          aria-required
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

      <label htmlFor="upload-photo">
        <input
          style={{ display: 'none', backgroundColor:'#FA8072' } }
          id="upload-photo"
          name="upload-photo"
          type="file"
        />
        <Button color="info" variant="outlined" component="span">
          Upload profile picture
        </Button>
      </label>
      
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

export default UserSignupForm;
