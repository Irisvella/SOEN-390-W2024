// PropertySlider.tsx

import React, { ComponentPropsWithoutRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import "../App.css";
import { useNavigate } from 'react-router-dom';



// Define the type for each property item
interface Property {
  imageUrl: string;
  address: string;
  id: string;
  isSpecial?: boolean;
  propertyType: "user" | "company";
}
// Define the type for the props expected by PropertySlider
interface PropertySliderProps {
  properties: Property[];
}

// Define the type for arrow props by extending the existing button props
type ArrowProps = ComponentPropsWithoutRef<"div">;

// Custom Next Arrow
const NextArrow: React.FC<ArrowProps> = ({ className, style, onClick }) => {
  return (
    <div
      className={`${className} custom-slick-next`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <ArrowForwardIosIcon
        style={{ color: "rgba(250, 128, 114, 0.8)", fontSize: "2rem" }}
      />
    </div>
  );
};

// Custom Prev Arrow
const PrevArrow: React.FC<ArrowProps> = ({ className, style, onClick }) => {
  return (
    <div
      className={`${className} custom-slick-prev`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <ArrowBackIosIcon
        style={{ color: "rgba(250, 128, 114, 0.8)", fontSize: "2rem" }}
      />
    </div>
  );
};

const PropertySlider: React.FC<PropertySliderProps> = ({ properties }) => {
  console.log(properties);
  const navigate = useNavigate();
  
 
 
  const settings = {
    dots: properties.length > 1, // Only show dots if there are more than one slide
    infinite: properties.length > 1, // Only enable infinite mode if there are more than one slide
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: properties.length > 1, // Only enable center mode if there are more than one slide
    centerPadding: properties.length > 1 ? "15%" : "0%", // Adjust center padding based on the number of slides
    nextArrow: properties.length > 1 ? <NextArrow /> : <></>, // Hide navigation arrows if only one slide
    prevArrow: properties.length > 1 ? <PrevArrow /> : <></>, // Hide navigation arrows if only one slide
    // ...other settings you might need
  };
  const renderSlideContent = (property: Property) => {
  
   
    // Special slide for adding a new property or other company-specific slides
    if (property.isSpecial && property.propertyType === "company") {
      // Render a special company slide
    } else if (property.propertyType === "company") {
      // Render a regular company slide with company-specific buttons
      return (
        <div key={property.id} className="property-slide">
          <img src={property.imageUrl} alt={property.address} />
          <div className="property-details">
            <h3>{property.address}</h3>
            <div className="property-actions">
              <Button variant="outlined">Visit Employee List</Button>
              <Button variant="outlined">Requests</Button>
              <Button variant="outlined"
               onClick={() => navigate(`/EditListing/${property.id}`)}>Edit</Button>
            </div>
          </div>
        </div>
      );
    } else {
      // Render a regular user slide with user-specific buttons
      return (
        <div key={property.id} className="property-slide">
          <img src={property.imageUrl} alt={property.address} />
          <div className="property-details">
            <h3>{property.address}</h3>
            <div className="property-actions">
              <Button variant="outlined">View Requests</Button>
              <Button variant="outlined">Make Request</Button>
              <Button variant="outlined">Financial Information</Button>
            </div>
          </div>
        </div>
      );
    }
  };

  return <Slider {...settings}>{properties.map(renderSlideContent)}</Slider>;
};

export type { Property, PropertySliderProps };
export default PropertySlider;
