import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import FitbitIcon from "@mui/icons-material/Fitbit";
import { Button, Menu, MenuItem, IconButton, Avatar } from "@mui/material";
import "../App.css"; // Make sure this path is correct

const Navbar = ({}) => {
  const [userProfile, setUserProfile] = useState(null);
  const [mobile, setMobile] = useState(false);
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [userName, setUserName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      try {
        if (!token) {
          return;
        }
        const response = await fetch("http://localhost:3000/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok) {
          setUserRole(data.role);
          setUserProfile(data.avatar);
          setUserName(data.firstName + " " + data.lastName);
          setCompanyName(data.companyName);
        } else {
          console.error("Failed to fetch profile:", data.message);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    setIsLoggedIn(checkLoggedIn());
  }, [location]); // Re-check login status when location changes

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const checkLoggedIn = () => {
    const token = localStorage.getItem("token");
    return !!token;
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from local storage
    setIsLoggedIn(false); // Update the login status
    navigate("/");
    handleClose();
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Avatar sx={{ m: 1, bgcolor: "salmon" }}>
          <FitbitIcon />
        </Avatar>
        <h6 className="logotext">EstateFlow</h6>
      </div>
      <ul
        className={mobile ? "nav-links-mobile" : "nav-links"}
        onClick={() => setMobile(false)}
      >
        <li>
          <Link to="/" className="nav-link home">
            Home
          </Link>
        </li>
        <li>
          <Link to="/Features" className="nav-link features">
            Features
          </Link>
        </li>
        <li>
          <Link to="/services" className="nav-link services">
            Why EstateFlow
          </Link>
        </li>
        <li>
          <Link to="/skills" className="nav-link pricing">
            Pricing
          </Link>
        </li>
        <li>
          <Link to="/contact" className="nav-link contact">
            Contact
          </Link>
        </li>
      </ul>
      <div className="welcome-message">
        {isLoggedIn ? (
          <p>
            Welcome,  
            {userRole === "publicUser" && (
            " " + userName )}
            {userRole === "company" && (
            " " + companyName )}
          </p>
        ) : (
          <p></p>
        )}
      </div>
      <div className="auth-button">
        {isLoggedIn ? (
          <>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleClick}
              color="inherit"
            >
              <Avatar>{userName ? userName[0] : <FaBars />}</Avatar>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              {userRole === "company" && (
                <>
                  <MenuItem onClick={() => navigate("/dashboard-company")}>
                    Dashboard
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/managementlanding")}>
                    Landing Page
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/profiledash")}>
                    Profile
                  </MenuItem>
                </>
              )}
              {userRole === "publicUser" && (
                <>
                  <MenuItem onClick={() => navigate("/dashboard-user")}>
                    Dashboard
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/profiledash")}>
                    Profile
                  </MenuItem>
                </>
              )}
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <Button
            variant="outlined"
            onClick={() => navigate("/Login")}
            size="Medium"
            sx={{
              ":hover": {
                backgroundColor: "#DFF8F5",
                color: "black",
              },
            }}
          >
            Login
          </Button>
        )}
      </div>
      <button className="mobile-menu-icon" onClick={() => setMobile(!mobile)}>
        {mobile ? <ImCross /> : <FaBars />}
      </button>
    </nav>
  );
};

export default Navbar;
