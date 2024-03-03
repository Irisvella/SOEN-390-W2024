import {useState, useEffect} from 'react';
import { FormControl, FormLabel, Grid, Input, Select, Button } from '@chakra-ui/react'




function AccountSettings() {

const [userProfile, setUserProfile] = useState(null);
const [userName, setUserName] = useState('');
const [companyName, setCompanyName] = useState('');
const [email, setEmail] = useState('');
const [phoneNumber, setPhoneNumber] = useState('');
const [userRole, setUserRole] = useState('');

useEffect(() => {
  const fetchUserProfile = async () => {
    const token = localStorage.getItem('token'); 
    try {
      const response = await fetch('http://localhost:3000/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setEmail(data.email);
        setUserProfile(data.avatar); 
        setUserName(data.username); 
        setCompanyName(data.companyName);
        setPhoneNumber(data.phone);
      } else {
        console.error('Failed to fetch profile:', data.message);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  fetchUserProfile();
}, []);

const updateProfile = async () => {
  const token = localStorage.getItem('token');
  const payload = {
    //email,
    phoneNumber
  };
  console.log('Sending payload:', payload);
  try {
    const response = await fetch('http://localhost:3000/profile', { 
      method: 'PUT', 
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Failed to update profile');
    }

    console.log('Profile updated successfully');
  } catch (error) {
    console.error('Error updating profile:', error);
  }
};

  return (
    <Grid
      templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
      gap={6}
    >
      <FormControl id="phoneNumber">
        <FormLabel>Phone Number</FormLabel>
        <Input
          focusBorderColor="brand.blue"
          type="tel"
          value= {phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </FormControl>

      <FormControl id="emailAddress">
        <FormLabel>Email Address</FormLabel>
        <Input
          focusBorderColor="brand.blue"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <Button onClick={updateProfile}>Update</Button>
    </Grid>
    
  )
}

export default AccountSettings
