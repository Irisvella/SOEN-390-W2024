import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Navbar from "../components/Navbar";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";

export default function UnitsDashboard() {
  const navigate = useNavigate();
  const handleAddProperty = () => {
    // Here you can handle the logic to add a property
    // For example, opening a dialog or redirecting to a form page
    navigate("/AddUnit");
  };

  return (
    <>
      <Navbar />
      <Box sx={{ p: 10 }}>
        <Card sx={{ width: 320 }} >
          <AspectRatio minHeight="120px" maxHeight="200px">
            <img
              src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286"
              srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
              loading="lazy"
              alt=""
            />
          </AspectRatio>
          <CardContent orientation="horizontal">
            <div>
              <Typography level="title-lg">Unit 124</Typography>
              <Typography level="body-sm"> 2 parking spaces </Typography>
              <Typography level="body-sm"> 1000 square feet</Typography>
              <Typography level="body-xs">Owner: Fatou Barry</Typography>
            </div>
            <Button
              variant="soft"
              size="md"
              color="primary"
              aria-label="Explore Bahamas Islands"
              sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}
            >
              Edit
            </Button>
          </CardContent>
        </Card>

        {/* <Button
        variant="solid"
        startDecorator={<Add />}
        color="primary"
        sx={{ mb: 2 , mt:10}} // Adjust the margin as needed
        onClick={handleAddProperty} // Replace with your actual event handler function
      >
        Add unit
      </Button> */}
      </Box>
     
      
    </>
  );
}
