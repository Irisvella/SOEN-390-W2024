import React, { ChangeEvent, useState, FormEvent } from 'react';
import { Container, CssBaseline, Box, Avatar, Typography, TextField, Button ,Grid} from "@mui/material";
import FitbitIcon from '@mui/icons-material/Fitbit';
import Navbar from '../Navbar'; // Adjust the import path accordingly
import bgImage from '../../bg2.jpg'; // Adjust the import path accordingly
import "../../App.css"; // Adjust the import path accordingly

interface FormData {
  fname: string;
  lname: string;
  email: string;
  password: string;
  confirmPassword: string;
  profilePicture: File | null;
}

const SignUp = () => {
  const [step, setStep] = useState<number>(1);
  const [fileName, setFileName] = useState('');
  const [formData, setFormData] = useState<FormData>({
    fname: '',
    lname:'',
    email: '',
    password: '',
    confirmPassword: '',
    profilePicture: null,
  });
  const buttonStyles = {
    color: 'salmon', // Button text color when not hovered
    backgroundColor: 'transparent',
    border: '1px solid salmon', // Button background color when not hovered
    borderColor: 'salmon', // Button border color when not hovered
    '&:hover': {
      backgroundColor: 'salmon', // Button background color on hover
      borderColor: 'salmon', // Button border color on hover
      color: '#fff', // Button text color on hover
    },
    // Add other styles if necessary
  };
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Check if e.target.files is not null and has at least one file
    if (e.target.files && e.target.files.length > 0) {
      setFormData({
        ...formData,
        profilePicture: e.target.files[0],
      });
    }
};

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Implement your submission logic here
    console.log(formData);
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => step > 1 && setStep(step - 1);

  return (
    <>
      <Navbar />
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
        <Container maxWidth="sm">
          <CssBaseline />
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
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' , marginTop:'0px'}}>
            <Avatar sx={{ bgcolor: "salmon", marginBottom:'-17px'}}>
              <FitbitIcon />
            </Avatar>
            <Typography variant="h5" component="h1" sx={{ marginLeft: '10px', marginBottom:'-17px'}}>SignUp</Typography>
          </Box>
            <Box component="form" sx={{ mt: 0, width: '100%' }} onSubmit={handleSubmit}>
              {step === 1 && (
                <>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="fname"
                    value={formData.fname}
                    onChange={handleChange}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lname"
                    value={formData.lname}
                    onChange={handleChange}
                    margin="normal"
                  />
                  <Grid container justifyContent="flex-end">
                    <Button onClick={() => setStep(2)} variant="contained" sx={{ ...buttonStyles,mt: 0, mb: 0 }}>
                      Next
                    </Button>
                  </Grid>
                </>
              )}
              {step === 2 && (
                <>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    margin="normal"
                  />
                  <Grid container spacing={20}>
                    <Grid item xs={6}>
                      <Button onClick={() => setStep(1)} variant="contained" sx={{ ...buttonStyles,mt: 0, mb: 0 }}>
                        Back
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button onClick={() => setStep(3)} variant="contained" sx={{ ...buttonStyles,mt: 0, mb: 0 }}>
                        Next
                      </Button>
                    </Grid>
                  </Grid>
                </>
              )}
              {step === 3 && (
  <>
    <Box sx={{ mt: 2, width: '100%' }}>
      <label htmlFor="profilePicture" style={{ display: 'block', marginTop: '1rem',marginLeft: '0.5rem',fontSize:'1rem' }}>
        Upload Profile Picture 
        <input
          type="file"
          id="profilePicture"
          name="profilePicture"
          onChange={handleFileChange}
          style={{ display: 'block', marginTop: '1rem' }} // Add margin-top here
        />
      </label>
      {fileName && (
        <Typography variant="caption" sx={{ ...buttonStyles,display: 'block', marginTop: '0.5rem' }}>
          {fileName}
        </Typography>
      )}
    </Box>
    <Grid container spacing={11}>
      <Grid item xs={6}>
        <Button onClick={() => setStep(2)} variant="contained" sx={{...buttonStyles, mt: 3, mb: 2 ,ml:1}}>
          Back
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button type="submit" variant="contained" sx={{...buttonStyles, mt: 3, mb: 2,mr:0 }}>
          Register
        </Button>
      </Grid>
    </Grid>
  </>
)}

            </Box>
          </Box>
        </Container>
      </div>
    </>
  );
};

export default SignUp;
