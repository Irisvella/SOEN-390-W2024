import React, { useEffect, useState } from 'react';
import { Container, CssBaseline, Button } from "@mui/material";
import Navbar from '../components/Navbar';
import PropertySlider from './PropertySlider';
import "../App.css";
import { useNavigate } from 'react-router-dom';
// Remove this import if EditListingForm is not directly used within this component
// import EditListingForm from '../components/EditListingForm';

interface Property {
  id: string;
  imageUrl: string;
  address: string;
  propertyType: 'user' | 'company';
}

const DashboardCompany = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const navigate = useNavigate();
  const companyName = "CoolCompany";

  const fetchProperties = async () => {
    try {
      const response = await fetch('http://localhost:3000/dashboard/listings');
      if (!response.ok) {
        throw new Error('Failed to fetch properties');
      }
      const listings = await response.json();
      const transformedListings = listings.map(listing => ({
        id: listing.id.toString(),
        imageUrl: listing.image_url,
        address: listing.address,
        propertyType: 'company',
      }));
      setProperties(transformedListings);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  useEffect(() => {
    const refreshListings = localStorage.getItem('refreshListings');
    if (refreshListings === 'true') {
      fetchProperties();
      localStorage.removeItem('refreshListings'); // Reset the trigger
    }
  }, [/* dependencies */]);
  
  const handleAddProperty = () => {
    navigate('/CreateListingPage'); // Adjust according to your routing setup
  };

  return (
    <>
      <CssBaseline />
      <Navbar userName={companyName} />
      <Container component="main" maxWidth="lg" sx={{ mt: 10, mb: 10 }}>
        <PropertySlider properties={properties} />
        <Button
          variant="contained"
          color="primary"
          sx={{ mb: 2 }}
          onClick={handleAddProperty}
        >
          Add Property
        </Button>
        {/* If EditListingForm should be displayed as part of DashboardCompany, include it here correctly. */}
        {/* <EditListingForm onListingCreated={fetchProperties} /> */}
      </Container>
    </>
  );
};

export default DashboardCompany;
