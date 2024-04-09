import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import Navbar from '../components/Navbar';
import AspectRatio from '@mui/joy/AspectRatio';

function UnitsDashboard() {
  const navigate = useNavigate();
  const { propertyId } = useParams();
  const [totalUnits, setTotalUnits] = useState(0);

  useEffect(() => {
    const fetchTotalUnits = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`http://localhost:3000/createEditListing/${propertyId}/units`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const propertyData = await response.json();
          if (propertyData.totalUnit) {
            setTotalUnits(propertyData.totalUnit);
          }
        } else {
          console.error('Failed to fetch property details');
        }
      } catch (error) {
        console.error('Error fetching property details:', error);
      }
    };

    fetchTotalUnits();
  }, [propertyId]);

  return (
    <>
      <Navbar />
      <Box sx={{ p: 10 }}>
        {[...Array(totalUnits)].map((_, index) => (
          <Card key={index} sx={{ mb: 2, width: 320 }}>
            <AspectRatio minHeight="120px" maxHeight="200px">
              <img
                src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286"
                alt=""
                loading="lazy"
              />
            </AspectRatio>
            <CardContent>
              <Typography>Unit {index + 1}</Typography>
              {/* Placeholder content for square feet */}
              <Typography>{/* Add square feet content here */}</Typography>
              <Button
                variant="outlined"
                onClick={() => {/* Handle edit functionality */}}
              >
                Edit
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </>
  );
}

export default UnitsDashboard;
