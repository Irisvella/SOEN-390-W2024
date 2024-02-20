import React from 'react';
import { Container, CssBaseline } from "@mui/material";
import Navbar from '../components/Navbar';
import PropertySlider from './PropertySlider'; // Assuming correct export
import { Property } from './PropertySlider'; // Assuming Property is correctly exported as a type
import "../App.css";

const DashboardUser = () => {
  const userName = "John";
  const properties: Property[] = [
    {
      id: '1',
      imageUrl: 'https://accescondos.org/app/uploads/2016/09/fc6_persp_principale.jpg',
      address: '123 Main St',
      propertyType: 'user',
    },
    {
      id: '2',
      imageUrl: 'https://www.mtlblog.com/media-library/image.jpg?id=26904974&width=1200&height=600&coordinates=0%2C83%2C0%2C83',
      address: '456 Elm St',
      propertyType: 'user',
    },
    {
      id: '3',
      imageUrl: 'https://images.dailyhive.com/20210429115610/apartment-3636437.jpeg',
      address: '789 Pine St',
      propertyType: 'user',
    },
    {
      id: '4',
      imageUrl: 'https://www.placedufresne.com/images/slider/appartement_a_montreal_louer.jpg',
      address: '225 Marc St',
      propertyType: 'user',
    },
    // Add more properties as needed
  ];

  return (
    <>
      <CssBaseline />
      <Navbar userName={userName} />
      <Container component="main" maxWidth="lg" sx={{ mt: 10, mb: 10 }}>
        <PropertySlider properties={properties} />
        {/* Rest of your component */}
      </Container>
    </>
  );
};

export default DashboardUser;
