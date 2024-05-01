import React from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline, Typography, Container, Card, CardContent, Button, Grid } from '@mui/material';
import "../App.css";

const defaultTheme = createTheme();

const pricingPlans = [
  {
    title: "Basic",
    price: "$59",
    features: [
      "All Basic Features",
      "Advanced Analytics",
      "Priority Support",
      "Up to 20 Users"
    ],
    buttonText: "Book A Demo",
    buttonVariant: "contained"
  },
  {
    title: "Enterprise",
    price: "Custom",
    features: [
      "All Pro Features",
      "Dedicated Account Manager",
      "Custom Integrations",
      "Unlimited Users"
    ],
    buttonText: "Contact Us",
    buttonVariant: "contained",
    buttonColor: "secondary"
  }
];

const PricingCard = ({ plan }) => {
  const navigate = useNavigate();  // Hook for navigating programmatically

  const handleButtonClick = () => {
    navigate("/Contact");  // Navigate to the contact page
  };

  return (
    <Card raised sx={{ minWidth: 275, m: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">{plan.title}</Typography>
        <Typography variant="h4" sx={{ mb: 2 }}>{plan.price}</Typography>
        {plan.features.map((feature, index) => (
          <Typography key={index}>{feature}</Typography>
        ))}
        <Button
          variant={plan.buttonVariant}
          color={plan.buttonColor || 'primary'}
          sx={{ mt: 2 }}
          onClick={handleButtonClick}  // Add click handler to button
        >
          {plan.buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};

const Pricing = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <div className="home-background">
        <Navbar />
        <Container maxWidth="md" sx={{ py: 8 }}>
          <Typography variant="h3" sx={{ mb: 4, textAlign: 'center', color: 'white' }}>
            Pricing Plans
          </Typography>
          <Grid container justifyContent="center" alignItems="stretch">
            {pricingPlans.map((plan, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <PricingCard plan={plan} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default Pricing;
