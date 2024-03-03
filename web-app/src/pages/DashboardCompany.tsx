import { Container, CssBaseline, Grid } from "@mui/material";
import Navbar from "../components/Navbar";
import PropertySlider, { Property } from "./PropertySlider";
import Button from "@mui/material/Button";
import "../App.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Assuming you have a similar structure for company properties
// Explicitly define the type for each property in the array
const companyProperties: Property[] = [
  {
    id: "1",
    imageUrl:
      "https://accescondos.org/app/uploads/2016/09/fc6_persp_principale.jpg",
    address: "123 Main St",
    propertyType: "company", // TypeScript should now correctly infer this as 'company' | 'user'
  },
  {
    id: "2",
    imageUrl:
      "https://www.mtlblog.com/media-library/image.jpg?id=26904974&width=1200&height=600&coordinates=0%2C83%2C0%2C83",
    address: "456 Elm St",
    propertyType: "company", // Same here
  },
  {
    id: "3",
    imageUrl:
      "https://images.dailyhive.com/20210429115610/apartment-3636437.jpeg",
    address: "789 Pine St",
    propertyType: "company", // And here
  },
  {
    id: "4",
    imageUrl:
      "https://www.placedufresne.com/images/slider/appartement_a_montreal_louer.jpg",
    address: "225 Marc St",
    propertyType: "company", // And finally here
  },
];
const handleAddProperty = () => {
  // Here you can handle the logic to add a property
  // For example, opening a dialog or redirecting to a form page
  console.log("Add Property button clicked");
};
const DashboardCompany = () => {
  const companyName = "CoolCompany";
  const [properties, setProperties] = useState<Property[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }

    const role = localStorage.getItem("role") ;
    console.log(role);
    if (role !== 'company'){
      navigate("/dashboard-user")
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

    console.log(token);
    console.log(companyProperties);
  }, []);

  return (
    <>
      <CssBaseline />
      <Navbar userName={companyName} />
      <Container component="main" maxWidth="lg" sx={{ mt: 10, mb: 10 }}>
        <PropertySlider properties={properties} />
        {/* Add Property Button */}
        <Button
          variant="contained"
          color="primary"
          sx={{ mb: 2 }} // Adjust the margin as needed
          onClick={handleAddProperty} // Replace with your actual event handler function
        >
          Add Property
        </Button>
        <Grid container spacing={3}>
          {/* Additional company-specific content here */}
        </Grid>
      </Container>
    </>
  );
};

export default DashboardCompany;
