
import '../../index.css';
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
  
} from "@mui/material";
import FitbitIcon from '@mui/icons-material/Fitbit';
import { useState } from "react";
import { Link } from "react-router-dom";
/***Diclaimer . I'm using material Ui for look . Therefore few things might seem different but it is the same
 * For input , it is the same as TextField . So if you need any attribute you can find it inside textfield
 * form is kept the same way 
 */




const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Process form data here (e.g., send it to a server)
  };

  const handleRegister = async () => {};

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
         

          <div className="form-group">
              <label htmlFor="role">I am a: </label>
              <select name="role" >
                <option value="condoOwner">Public User</option>
                <option value="company">Company</option>
              </select>
            </div>
            <Box sx={{ mt: 3 }}>

            <form onSubmit={handleSubmit}>
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
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login">Already have an account? Login</Link>
              </Grid>
            </Grid>

            </form>

          </Box>
        </Box>
      </Container>
    </>
  );
};

export default SignUp;