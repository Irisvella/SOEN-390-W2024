import { useState, useEffect } from 'react';
import { FormControl, FormLabel, Grid, Input, Button } from '@chakra-ui/react';





function EditListingForm() {
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [totalUnit, setTotalUnit] = useState('');
  const [parkingSpaces, setParkingSpaces] = useState('');
  



  useEffect(() => {
    const fetchPropertyDetails = async () => {
     
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`http://localhost:3000/createEditListing/?propertyId=${property.id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const propertyDetails = await response.json();
        if (response.ok) {
          // Assuming you have the state setup to hold the fetched data
          setAddress(propertyDetails.address);
          setPostalCode(propertyDetails.postalCode); // And so on for other fields
        } else {
          console.error('Failed to fetch property details:', propertyDetails.message);
        }
      } catch (error) {
        console.error('Error fetching property details:', error);
      }
    };
  
    fetchPropertyDetails();
  }, []);
  




  const updateProfile = async () => {
    const token = localStorage.getItem('token');
    const payload = {
      address,
      // Include other state variables in your payload as needed
    };
    console.log('Sending payload:', payload);
    try {
      const response = await fetch('http://localhost:3000/createEditListing', {
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
    <>
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        gap={6}
      >
        <FormControl id="address">
          <FormLabel>Property.address</FormLabel>
          <Input
            focusBorderColor="brand.blue"
            type="text" // Changed from 'address' to 'text'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </FormControl>
        <FormControl id="postalCode">
          <FormLabel>Postal Code</FormLabel> {/* Updated label */}
          <Input
            focusBorderColor="brand.blue"
            type="tel"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </FormControl>
        <FormControl id="totalUnit">
          <FormLabel>totalUnit</FormLabel> {/* Updated label */}
          <Input
            focusBorderColor="brand.blue"
            type="text"
            value={totalUnit}
            onChange={(e) => setTotalUnit(e.target.value)}
          />
        </FormControl>

        <FormControl id="totalUnit">
          <FormLabel>totalUnit</FormLabel> {/* Updated label */}
          <Input
            focusBorderColor="brand.blue"
            type="text"
            value={totalUnit}
            onChange={(e) => setTotalUnit(e.target.value)}
          />
        </FormControl>

        <FormControl id="parkingSpaces">
          <FormLabel>Postal Code</FormLabel> {/* Updated label */}
          <Input
            focusBorderColor="brand.blue"
            type="text"
            value={parkingSpaces}
            onChange={(e) => setParkingSpaces(e.target.value)}
          />
        </FormControl>
        {/* Include other form controls for totalUnit, parkingSpaces, amenities, and description */}
        <Button onClick={updateProfile}>Update</Button>
      </Grid>
    </>
  );
}

export default EditListingForm;
