import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, CssBaseline } from "@mui/material";
import Navbar from "../components/Navbar";
import PropertySlider from "./PropertySlider"; // Assuming correct export
import { Property } from "./PropertySlider"; // Assuming Property is correctly exported as a type
import "../App.css";

const DashboardUser = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    const role = localStorage.getItem("role");
    if (role !== "publicUser") {
      navigate("/dashboard-company");
    }

    const fetchProperties = async () => {
      const res = await fetch("https://estate-api-production.up.railway.app/dashboard", {
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

  // const handleCreateRequest = () => {
  //   navigate("/CreateRequest");
  // };

  return (
    <>
      <CssBaseline />
      <Navbar />
      <Container component="main" maxWidth="lg" sx={{ mt: 10, mb: 10 }}>
        <PropertySlider properties={properties} />
        {/* Rest of your component */}
        {/* <Button
          variant="contained"
          color="primary"
          onClick={handleCreateRequest}
        >
          Create A Request
        </Button> */}
      </Container>
    </>
  );
};

export default DashboardUser;
