import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import FitbitIcon from '@mui/icons-material/Fitbit';
import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";
import "../App.css"; // Make sure this path is correct
const Navbar = ({ userName }) => { // userName prop added here
  const [Mobile, setMobile] = useState(false);
  const location = useLocation();

  // Check if the current path is '/Login'
  const isLoginPage = location.pathname === "/Login";

  return (
    <nav className='navbar'>
      <div className="logo">
        <Avatar sx={{ m: 1, bgcolor: "salmon" }}>
          <FitbitIcon />
        </Avatar>
        <h6 className='logotext'>EstateFlow</h6>
      </div>
      <ul className={Mobile ? "nav-links-mobile" : "nav-links"} onClick={() => setMobile(false)}>
        <li><Link to='/' className='nav-link home'>Home</Link></li>
        <li><Link to='/Features' className='nav-link features'>Features</Link></li>
        <li><Link to='/services' className='nav-link services'>Why EstateFlow</Link></li>
        <li><Link to='/skills' className='nav-link pricing'>Pricing</Link></li>
        <li><Link to='/contact' className='nav-link contact'>Contact</Link></li>
      </ul>
      <div className="login-button">
        <Button
          variant="outlined"
          href="/Login"
          size="Medium"
          sx={{
            ':hover': {
              backgroundColor: '#DFF8F5',
              color: 'black',
            }
          }}
        >
          Login
        </Button>
      </div>
      <button className='mobile-menu-icon' aria-label="menu" onClick={() => setMobile(!Mobile)}>
        {Mobile ? <ImCross /> : <FaBars />}
      </button>
    </nav>
  );
};

export default Navbar;