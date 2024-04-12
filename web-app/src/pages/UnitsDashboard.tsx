import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UnitsCards, { Unit } from "../components/UnitsCards"
import Navbar from "../components/Navbar";
import { Box, Button } from "@mui/material";

const companyUnits: Unit[] = [];
function UnitsDashboard() {
  const navigate = useNavigate();
  const handleAddProperty = () => {
    // Here you can handle the logic to add a property
    // For example, opening a dialog or redirecting to a form page
    navigate("/dashboard-company");
  };
  const { propertyId } = useParams();
  const [units, setUnits] = useState<Unit[]>([]);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:3000/createEditListing/${propertyId}/units`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (res.ok) {
          const unitsData: Unit[] = await res.json();
          setUnits(unitsData);
        } else {
          console.error("Failed to fetch units");
        }
      } catch (error) {
        console.error("Error fetching units:", error);
      }
    };

    fetchUnits();
    console.log(companyUnits);
  }, [propertyId]);

  return (
    <>
      <Navbar /> {/* Assuming Navbar is imported */}
      <Box sx={{ p: 10 }}>
        <UnitsCards units={units} />
        <Button
          variant="contained"
          color="primary"
          sx={{ mb: 2 }} // Adjust the margin as needed
          onClick={handleAddProperty} // Replace with your actual event handler function
        >
          GO back 
        </Button>
      </Box>
    </>
  );
}

export default UnitsDashboard;
