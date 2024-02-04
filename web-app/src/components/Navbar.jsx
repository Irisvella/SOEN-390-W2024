import React, { useState } from "react";
import "../index.css";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import FitbitIcon from '@mui/icons-material/Fitbit'; // Correctly imported
import Avatar from "@mui/material/Avatar"; // Corrected import path
import { Button } from "@mui/material";
const Navbar = () => {
  const [Mobile, setMobile] = useState(false);

  return (
    <>
      <nav className='navbar'>
        {/* Proper use of Avatar with FitbitIcon */}
        <div className="logo">
        <Avatar sx={{ m: 3, bgcolor: "salmon" }}>
          <FitbitIcon />
        </Avatar>
        <h3 className='logotext'>EstateFlow</h3>
        </div>
        <ul className={Mobile ? "nav-links-mobile" : "nav-links"} onClick={() => setMobile(false)}>
          <Link to='/' className='home'>
            <li>Home</li>
          </Link>
          <Link to='/Features' className='Features'>
            <li>Features</li>
          </Link>
          <Link to='/services' className='services'>
            <li>Why EstateFlow</li>
          </Link>
          <Link to='/skills' className='Pricing'>
            <li>Pricing</li>
          </Link>
          <Link to='/contact' className='contact'>
            <li>Contact</li>
          </Link>
        </ul>
        <div className="Login">
          <Button
         variant="outlined"
         href="/Login"
         size="large"
         
         >
        Login
      </Button>
      </div>
       
        
        <div>
       
    
      </div>
        <button className='mobile-menu-icon' onClick={() => setMobile(!Mobile)}>
          {Mobile ? <ImCross /> : <FaBars />}
        </button>
      </nav>
    </>
  );
};

export default Navbar;
