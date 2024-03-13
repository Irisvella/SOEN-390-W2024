import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, CssBaseline } from "@mui/material";
import Navbar from "../components/Navbar";
import PropertySlider from "./PropertySlider"; // Assuming correct export
import { Property } from "./PropertySlider"; // Assuming Property is correctly exported as a type
import "../App.css";

const DashboardUser = () => {
  const userName = "John";
  const [properties, setProperties] = useState<Property[]>([]);
  const navigate = useNavigate();
  const handleAddProperty = () => {
    // Here you can handle the logic to add a property
    // For example, opening a dialog or redirecting to a form page
    navigate("/CreateRequestPage");
  };
  const userProperties: Property[] = [
    {
      id: "1",
      imageUrl:
        "https://accescondos.org/app/uploads/2016/09/fc6_persp_principale.jpg",
      address: "123 Main St",
      propertyType: "user",
    },
    {
      id: "2",
      imageUrl:
        "https://www.mtlblog.com/media-library/image.jpg?id=26904974&width=1200&height=600&coordinates=0%2C83%2C0%2C83",
      address: "456 Elm St",
      propertyType: "user",
    },
    {
      id: "3",
      imageUrl:
        "https://images.dailyhive.com/20210429115610/apartment-3636437.jpeg",
      address: "789 Pine St",
      propertyType: "user",
    },
    {
      id: "4",
      imageUrl:
        "https://www.placedufresne.com/images/slider/appartement_a_montreal_louer.jpg",
      address: "225 Marc St",
      propertyType: "user",
    },
    // Add more properties as needed
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    const role = localStorage.getItem("role");
    if (role !== 'publicUser'){
      navigate("/dashboard-company")
    }

    const fetchProperties = async () => {
      const res = await fetch("http://localhost:3000/dashboard", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data: Property[] = await res.json();
      setProperties(data);
      console.log(data);
    };
    fetchProperties();
  }, []);

  return (
    <>
      <CssBaseline />
      <Navbar userName={userName} />
      <Container component="main" maxWidth="lg" sx={{ mt: 10, mb: 10 }}>
        <PropertySlider properties={properties} />
       
        {/* Add Property Button */}
        <Button
          variant="contained"
          color="primary"
          sx={{ mb: 2 }} // Adjust the margin as needed
          onClick={handleAddProperty} // Replace with your actual event handler function
        >
          Submit a new request
        </Button>
      </Container>
    </>
  );
};

export default DashboardUser;
