import { useState } from "react";
import { Link } from "react-router-dom";
import { Grid, TextField, Button } from "@mui/material";

const CompanySignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [failMessage, setFailMessage] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validateEmail = (email: string) => emailRegex.test(email);
  const phoneRegex = /^\d{10}$/; // Adjust based on required format
  const validatePhone = (phone: string) => phoneRegex.test(phone);
  const passwordsMatch = password === confirmPassword;

  const handleRegister = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setSuccessMessage("");
    setFailMessage("");

    try {
      // Replace 'http://localhost:3000' with actual backend endpoint
      const response = await fetch(
        "http://localhost:3000/signup/management-company",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            companyName,
            email,
            address,
            password,
            phoneNumber: phone,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Signup successful", data);
        setSuccessMessage("Signup successful! You can now login.");
        window.location.href = "/Login";
      } else {
        console.error("Signup failed:", data.message);
        setFailMessage(data.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setFailMessage("An error occurred. Please try again.");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      {successMessage && (
        <div
          style={{ color: "green", textAlign: "center", marginBottom: "10px" }}
        >
          {successMessage}
        </div>
      )}

      {failMessage && (
        <div
          style={{ color: "red", textAlign: "center", marginBottom: "10px" }}
        >
          {failMessage}
        </div>
      )}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name="companyName"
            required
            fullWidth
            id="companyName"
            label="Company Name"
            autoFocus
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            error={!validateEmail(email) && email.length > 0}
            helperText={
              !validateEmail(email) && email.length > 0
                ? "Invalid email format"
                : ""
            }
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="phone"
            label="Phone number"
            name="phone"
            error={!validatePhone(phone) && phone.length > 0}
            helperText={
              !validatePhone(phone) && phone.length > 0
                ? "Invalid phone format"
                : ""
            }
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="address"
            label="Address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            error={!passwordsMatch && confirmPassword.length > 0}
            helperText={
              !passwordsMatch && confirmPassword.length > 0
                ? "Passwords do not match"
                : ""
            }
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Grid>
      </Grid>

      <Button
        fullWidth
        variant="outlined"
        color="warning"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleRegister}
        disabled={
          !validateEmail(email) ||
          !validatePhone(phone) ||
          !passwordsMatch ||
          !password ||
          !confirmPassword ||
          !companyName ||
          !address
        }
      >
        Register
      </Button>
      <Grid container justifyContent="center">
        <Grid item>
          <Link to="/login">Already have an account? Login</Link>
        </Grid>
      </Grid>
    </form>
  );
};

export default CompanySignupForm;
